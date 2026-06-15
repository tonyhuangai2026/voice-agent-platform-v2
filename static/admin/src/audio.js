// Audio Recorder + Player, extracted from the legacy static/index.html.
//
// Critical browser quirks (learned the hard way):
//   - Don't pin sampleRate when constructing AudioContext. Some desktop
//     browsers reject non-native rates (notably Chrome on macOS at 16 kHz
//     output). Use the default; AudioBufferSourceNode resamples per buffer.
//   - The Player uses one AudioContext for output at OUT_RATE per buffer
//     (typically 24 kHz from Pipecat's pipeline output transport).
//   - Recorder downsamples to 16 kHz Int16 PCM before sending. /ws on the
//     server side configures audio_in_sample_rate=16000.

const IN_RATE = 16000;
const OUT_RATE = 24000;

const WORKLET_CODE = `
class PCMWorklet extends AudioWorkletProcessor {
  constructor(opts) {
    super();
    this.targetRate = opts.processorOptions.targetRate;
    this.ratio = sampleRate / this.targetRate;
    this.acc = 0;
    this.buf = [];
  }
  process(inputs) {
    const ch = inputs[0][0];
    if (!ch) return true;
    for (let i = 0; i < ch.length; i++) {
      this.acc += 1;
      if (this.acc >= this.ratio) {
        this.acc -= this.ratio;
        const s = Math.max(-1, Math.min(1, ch[i]));
        this.buf.push(s < 0 ? s * 0x8000 : s * 0x7fff);
      }
    }
    if (this.buf.length >= 320) {
      const out = new Int16Array(this.buf);
      this.buf = [];
      this.port.postMessage(out.buffer, [out.buffer]);
    }
    return true;
  }
}
registerProcessor("pcm-worklet", PCMWorklet);
`;

/** Records mic audio, downsamples to 16 kHz Int16, exposes a frame stream. */
export class Recorder {
  constructor() {
    this.audioCtx = null;
    this.workletNode = null;
    this.micStream = null;
    this.onFrame = null; // (Int16Array buffer) => void
  }

  async start(onFrame) {
    this.onFrame = onFrame;
    this.micStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    this.audioCtx = new AudioContext();

    if (!this.audioCtx.audioWorklet) {
      // AudioWorklet is widely supported (Chrome 66+, Safari 14.1+, Firefox 76+).
      // If absent we just fail loudly instead of maintaining a ScriptProcessor
      // fallback path that would diverge from the worklet code.
      throw new Error('AudioWorklet not supported in this browser');
    }
    const blob = new Blob([WORKLET_CODE], { type: 'application/javascript' });
    await this.audioCtx.audioWorklet.addModule(URL.createObjectURL(blob));
    const src = this.audioCtx.createMediaStreamSource(this.micStream);
    this.workletNode = new AudioWorkletNode(this.audioCtx, 'pcm-worklet', {
      processorOptions: { targetRate: IN_RATE },
    });
    src.connect(this.workletNode);
    // Keep the graph alive without making the user hear themselves.
    const sink = this.audioCtx.createGain();
    sink.gain.value = 0;
    this.workletNode.connect(sink).connect(this.audioCtx.destination);

    this.workletNode.port.onmessage = (e) => {
      if (this.onFrame) this.onFrame(e.data);
    };
  }

  stop() {
    if (this.workletNode) {
      this.workletNode.disconnect();
      this.workletNode = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach((t) => t.stop());
      this.micStream = null;
    }
    this.onFrame = null;
  }
}

/** Plays back streamed PCM (24 kHz Int16) without pinning context sampleRate. */
export class Player {
  constructor() {
    this.ctx = null;
    this.playhead = 0;
  }

  ensureCtx() {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.playhead = this.ctx.currentTime;
    }
  }

  feed(arrayBufferOrInt16) {
    this.ensureCtx();
    const int16 =
      arrayBufferOrInt16 instanceof Int16Array
        ? arrayBufferOrInt16
        : new Int16Array(arrayBufferOrInt16);
    const f32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) f32[i] = int16[i] / 0x8000;
    const buf = this.ctx.createBuffer(1, f32.length, OUT_RATE);
    buf.copyToChannel(f32, 0);
    const node = this.ctx.createBufferSource();
    node.buffer = buf;
    node.connect(this.ctx.destination);
    const now = this.ctx.currentTime;
    if (this.playhead < now) this.playhead = now;
    node.start(this.playhead);
    this.playhead += buf.duration;
  }

  /** Drop pending playback — used on barge-in. */
  clear() {
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.playhead = 0;
  }
}
