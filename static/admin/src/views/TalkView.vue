<template>
  <!-- Top-right action buttons teleported into App.vue's header. -->
  <Teleport to="#page-actions">
    <n-popover trigger="hover">
      <template #trigger>
        <n-button
          quaternary
          circle
          :disabled="turns.length === 0"
          :loading="summarizing"
          @click="summarize"
        >
          <template #icon>
            <n-icon :size="18" :component="SummaryIcon" />
          </template>
        </n-button>
      </template>
      {{ t('talk.actions.summarize') }}
    </n-popover>

    <n-popover trigger="hover">
      <template #trigger>
        <n-button quaternary circle @click="debugOpen = true">
          <template #icon>
            <n-icon :size="18" :component="DebugIcon" />
          </template>
        </n-button>
      </template>
      {{ t('talk.actions.debug') }}
    </n-popover>
  </Teleport>

  <div class="talk-root">
    <!-- Status header -->
    <div class="status-row">
      <div class="status-left">
        <span class="status-dot" :class="`status-dot--${statusTone}`"></span>
        <n-text :depth="status === 'recording' ? 1 : 2" class="status-text">
          {{ statusText }}
        </n-text>
      </div>
      <div class="defaults-line">
        <template v-if="metaChips.length">
          <StatChip
            v-for="chip in metaChips"
            :key="chip.key"
            :tone="chip.tone"
            :dot="false"
          >
            <n-icon :size="13" :component="chip.icon" class="chip-icon" />
            {{ chip.value }}
          </StatChip>
        </template>
        <n-text v-else depth="3" style="font-size: 12px;">
          {{ t('common.loading') }}
        </n-text>
        <n-popover trigger="hover">
          <template #trigger>
            <n-icon :size="15" :component="InfoIcon" class="info-icon" />
          </template>
          <i18n-t keypath="talk.defaultsHint" tag="span">
            <template #adminLink>
              <a href="/admin/" target="_blank">{{ t('talk.defaultsHintAdminLabel') }}</a>
            </template>
          </i18n-t>
        </n-popover>
      </div>
    </div>

    <!-- Big circle button with live recording waveform ring -->
    <div class="circle-wrap">
      <div class="circle-stage">
        <!-- Waveform ring (Web Audio AnalyserNode → canvas), only while recording -->
        <canvas
          ref="waveCanvas"
          class="wave-canvas"
          :class="{ active: status === 'recording' }"
          width="280"
          height="280"
          aria-hidden="true"
        ></canvas>
        <button
          class="circle-btn"
          :class="{ recording: status === 'recording', connecting: status === 'connecting' }"
          :disabled="status === 'connecting'"
          @click="onCircleClick"
        >
          <n-icon class="circle-icon" :size="40" :component="status === 'recording' ? StopIcon : MicIcon" />
          <span class="circle-label">
            {{
              status === 'idle' || status === 'ended'
                ? t('talk.button.start')
                : status === 'connecting'
                  ? t('talk.button.connecting')
                  : t('talk.button.stop')
            }}
          </span>
        </button>
      </div>
    </div>

    <!-- Transcript stream -->
    <div class="transcript-wrap">
      <n-scrollbar ref="scrollRef" style="max-height: 100%;">
        <div class="stream">
          <div
            v-for="(turn, i) in turns"
            :key="i"
            class="msg"
            :class="[turn.role, { partial: turn.partial }]"
          >
            <div class="msg-avatar" :class="turn.role">
              <n-icon :size="16" :component="turn.role === 'user' ? UserIcon : BotIcon" />
            </div>
            <div class="msg-body">
              <div class="msg-meta">
                <span class="msg-who">
                  {{ turn.role === 'user' ? t('talk.bubbles.whoUser') : t('talk.bubbles.whoBot') }}
                </span>
                <span v-if="turnTimes[i]" class="msg-ts">{{ turnTimes[i] }}</span>
                <span v-if="turn.partial" class="msg-state">{{ t('talk.bubbles.partial') }}</span>
              </div>
              <div class="msg-text">
                {{ turn.text }}<span v-if="turn.partial" class="caret">▍</span>
              </div>
            </div>
          </div>
          <div v-if="turns.length === 0" class="empty">
            <n-icon :size="40" :component="MicIcon" class="empty-icon" />
            <n-text depth="3">{{ t('talk.bubbles.empty') }}</n-text>
          </div>
        </div>
      </n-scrollbar>
    </div>
  </div>

  <!-- Debug drawer with full event stream -->
  <n-drawer v-model:show="debugOpen" :width="520" placement="right">
    <n-drawer-content :title="t('talk.drawerTitle')" closable>
      <DebugDrawer :events="events" />
    </n-drawer-content>
  </n-drawer>

  <!-- Summary dialog -->
  <n-modal
    v-model:show="summaryOpen"
    preset="card"
    :title="t('talk.summary.title')"
    style="width: 720px;"
    :mask-closable="true"
  >
    <div v-if="summaryHtml" class="summary-md" v-html="summaryHtml" />
    <n-text v-else depth="3">{{ t('talk.summary.generating') }}</n-text>
  </n-modal>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  NText,
  NButton,
  NPopover,
  NDrawer,
  NDrawerContent,
  NScrollbar,
  NModal,
  NIcon,
  useMessage,
} from 'naive-ui';
import {
  Microphone as MicIcon,
  StopFilledAlt as StopIcon,
  DocumentTasks as SummaryIcon,
  Tools as DebugIcon,
  Information as InfoIcon,
  User as UserIcon,
  Bot as BotIcon,
  Chip as EngineIcon,
  Language as LangIcon,
  Catalog as ScenarioIcon,
} from '@vicons/carbon';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

import { useSession } from '../stores/session.js';
import { Recorder, Player } from '../audio.js';
import { openTalkWs } from '../ws.js';
import { api } from '../api.js';
import DebugDrawer from './DebugDrawer.vue';
import StatChip from '../components/ui/StatChip.vue';

const message = useMessage();
const { t } = useI18n();
const session = useSession();
const { turns, events, status, defaultsLine } = storeToRefs(session);

const debugOpen = ref(false);
const summaryOpen = ref(false);
const summarizing = ref(false);
const summaryHtml = ref('');
const scrollRef = ref(null);
const waveCanvas = ref(null);

let ws = null;
let recorder = null;
let player = null;

const statusText = computed(() => {
  switch (status.value) {
    case 'idle':
    case 'ended':
      return t('talk.status.ready');
    case 'connecting':
      return t('talk.status.connecting');
    case 'recording':
      return t('talk.status.recording');
    default:
      return '';
  }
});

// Semantic tone for the status dot (visual only).
const statusTone = computed(() => {
  switch (status.value) {
    case 'recording':
      return 'recording';
    case 'connecting':
      return 'connecting';
    default:
      return 'idle';
  }
});

// engine / language / scenario meta as StatChips (read-only view of config).
const metaChips = computed(() => {
  const c = session.config;
  if (!c) return [];
  const chips = [];
  if (c.default_engine) {
    chips.push({ key: 'engine', value: c.default_engine, tone: 'info', icon: EngineIcon });
  }
  if (c.default_language) {
    chips.push({ key: 'lang', value: c.default_language, tone: 'default', icon: LangIcon });
  }
  const scenario = c.default_demo || c.default_scenario;
  if (scenario) {
    chips.push({ key: 'scenario', value: scenario, tone: 'accent', icon: ScenarioIcon });
  }
  return chips;
});

// Per-turn arrival timestamps (view-only; the store does not stamp turns).
// Keyed by turn index; filled as new turns appear so the transcript can show a
// clock without touching session.js / the WS handler.
const turnTimes = ref([]);
function fmtClock(d) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
watch(
  () => turns.value.length,
  (len) => {
    while (turnTimes.value.length < len) {
      turnTimes.value.push(fmtClock(new Date()));
    }
    if (len < turnTimes.value.length) turnTimes.value.splice(len);
  },
  { immediate: true },
);

onMounted(async () => {
  try {
    await session.loadConfig();
  } catch (e) {
    message.error(t('talk.errors.loadConfig', { msg: e.message }));
  }
});

onBeforeUnmount(() => {
  stopWaveform();
  cleanup();
});

// ---------------------------------------------------------------------------
// Recording waveform ring (visualization only — does NOT touch audio.js capture).
//
// Prefers reusing the mic MediaStream that audio.js's Recorder already opened
// (exposed as `recorder.micStream`); we attach our own read-only AnalyserNode to
// a fresh AudioContext so we never reconfigure the capture graph. If for any
// reason that stream is unavailable we fall back to an independent read-only
// getUserMedia() purely for the visual, coexisting with the real capture.
// Everything is torn down the moment recording ends.
// ---------------------------------------------------------------------------
let waveCtx = null;
let waveAnalyser = null;
let waveSource = null;
let waveOwnStream = null; // only set when we had to open our own stream
let waveRaf = 0;

async function startWaveform() {
  if (waveCtx) return; // already running
  try {
    let stream = recorder && recorder.micStream;
    if (!stream) {
      // Fallback: independent read-only stream just for the visualization.
      waveOwnStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream = waveOwnStream;
    }
    waveCtx = new AudioContext();
    waveSource = waveCtx.createMediaStreamSource(stream);
    waveAnalyser = waveCtx.createAnalyser();
    waveAnalyser.fftSize = 256;
    waveAnalyser.smoothingTimeConstant = 0.7;
    // Read-only: analyser is NOT connected to destination, so nothing is heard
    // and the real capture graph in audio.js is untouched.
    waveSource.connect(waveAnalyser);
    drawWaveform();
  } catch {
    // Visualization is best-effort; never break recording if it fails.
    stopWaveform();
  }
}

function drawWaveform() {
  const canvas = waveCanvas.value;
  if (!canvas || !waveAnalyser) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const baseR = 104; // just outside the 200px button radius (scaled to canvas)
  const bins = waveAnalyser.frequencyBinCount;
  const freq = new Uint8Array(bins);

  const css = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const render = () => {
    if (!waveAnalyser) return;
    waveAnalyser.getByteFrequencyData(freq);
    ctx.clearRect(0, 0, W, H);

    const primary = css('--vb-primary') || '#0972D3';
    const accent = css('--vb-accent') || '#FF9900';

    // Average level → soft pulsing glow ring.
    let sum = 0;
    for (let i = 0; i < bins; i++) sum += freq[i];
    const level = sum / bins / 255; // 0..1

    ctx.save();
    ctx.globalAlpha = 0.18 + level * 0.32;
    ctx.beginPath();
    ctx.arc(cx, cy, baseR + level * 14, 0, Math.PI * 2);
    ctx.lineWidth = 2 + level * 6;
    ctx.strokeStyle = primary;
    ctx.stroke();
    ctx.restore();

    // Radial bars around the ring driven by the spectrum.
    const barCount = 64;
    for (let i = 0; i < barCount; i++) {
      const v = freq[Math.floor((i / barCount) * bins)] / 255; // 0..1
      const len = 4 + v * 26;
      const ang = (i / barCount) * Math.PI * 2 - Math.PI / 2;
      const r0 = baseR + 4;
      const x0 = cx + Math.cos(ang) * r0;
      const y0 = cy + Math.sin(ang) * r0;
      const x1 = cx + Math.cos(ang) * (r0 + len);
      const y1 = cy + Math.sin(ang) * (r0 + len);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = v > 0.6 ? accent : primary;
      ctx.globalAlpha = 0.35 + v * 0.55;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    waveRaf = requestAnimationFrame(render);
  };
  render();
}

function stopWaveform() {
  if (waveRaf) {
    cancelAnimationFrame(waveRaf);
    waveRaf = 0;
  }
  if (waveSource) {
    try { waveSource.disconnect(); } catch { /* ignore */ }
    waveSource = null;
  }
  waveAnalyser = null;
  if (waveCtx) {
    try { waveCtx.close(); } catch { /* ignore */ }
    waveCtx = null;
  }
  if (waveOwnStream) {
    waveOwnStream.getTracks().forEach((tr) => tr.stop());
    waveOwnStream = null;
  }
  const canvas = waveCanvas.value;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Start/stop the visualization in lock-step with the recording status. This is
// a passive observer of the existing state machine — it never mutates `status`.
watch(status, (s) => {
  if (s === 'recording') startWaveform();
  else stopWaveform();
});

async function onCircleClick() {
  if (status.value === 'recording') {
    cleanup();
    status.value = 'ended';
    return;
  }
  if (status.value === 'connecting') return;
  // start
  session.reset();
  status.value = 'connecting';
  try {
    player = new Player();
    ws = await openTalkWs();
    ws.onopen = async () => {
      try {
        recorder = new Recorder();
        await recorder.start((pcmBuf) => {
          if (ws && ws.readyState === 1) ws.send(pcmBuf);
        });
        status.value = 'recording';
      } catch (e) {
        message.error(t('talk.errors.mic', { msg: e.message }));
        cleanup();
        status.value = 'idle';
      }
    };
    ws.onmessage = (e) => {
      if (typeof e.data === 'string') {
        try {
          handleEvent(JSON.parse(e.data));
        } catch {
          /* ignore */
        }
        return;
      }
      if (player) player.feed(e.data);
    };
    ws.onclose = () => {
      cleanup();
      if (status.value !== 'idle') status.value = 'ended';
    };
    ws.onerror = () => {
      message.error(t('talk.errors.ws'));
      cleanup();
      status.value = 'idle';
    };
  } catch (e) {
    message.error(t('talk.errors.start', { msg: e.message }));
    cleanup();
    status.value = 'idle';
  }
}

function handleEvent(evt) {
  session.appendEvent(evt);
  switch (evt.type) {
    case 'asr_partial':
      session.pushTurn({ role: 'user', text: evt.text || '', partial: true });
      break;
    case 'asr_final':
      session.pushTurn({ role: 'user', text: evt.text || '', partial: false });
      break;
    case 'llm_delta': {
      // Append to last bot bubble (or create one)
      const last = turns.value[turns.value.length - 1];
      if (last && last.role === 'bot' && last.partial) {
        last.text += evt.text || '';
      } else {
        session.pushTurn({ role: 'bot', text: evt.text || '', partial: true });
      }
      break;
    }
    case 'llm_end': {
      const last = turns.value[turns.value.length - 1];
      if (last && last.role === 'bot' && last.partial) {
        if (evt.text) last.text = evt.text;
        last.partial = false;
      }
      break;
    }
    case 'user_speaking':
      // Barge-in: clear queued bot audio
      if (evt.value === true && player) player.clear();
      break;
    default:
      break;
  }
  scrollToBottom();
}

function scrollToBottom() {
  nextTick(() => {
    const sb = scrollRef.value;
    if (sb && sb.scrollTo) sb.scrollTo({ top: 1e9, behavior: 'smooth' });
  });
}

function cleanup() {
  if (recorder) {
    recorder.stop();
    recorder = null;
  }
  if (ws) {
    try {
      if (ws.readyState <= 1) ws.close();
    } catch {
      /* ignore */
    }
    ws = null;
  }
  if (player) {
    player.clear();
    player = null;
  }
}

async function summarize() {
  if (turns.value.length === 0) return;
  summarizing.value = true;
  summaryHtml.value = '';
  summaryOpen.value = true;
  try {
    const turnsForApi = turns.value
      .filter((t) => !t.partial && t.text.trim())
      .map((t) => ({ who: t.role, text: t.text }));
    const lang = session.config?.default_language || 'zh-CN';
    const r = await api.summary({
      turns: turnsForApi,
      lang,
    });
    const md = r.summary || '';
    summaryHtml.value = DOMPurify.sanitize(marked.parse(md));
  } catch (e) {
    // Surface as styled HTML inside the summary modal. The translated string
    // is plain text from the bundle (no markup); only the wrapping <p> + style
    // lives in this template.
    const safeMsg = DOMPurify.sanitize(t('talk.summary.failed', { msg: e.message }));
    summaryHtml.value = `<p style="color: #f55;">${safeMsg}</p>`;
  } finally {
    summarizing.value = false;
  }
}

watch(turns, scrollToBottom, { deep: true });
</script>

<style scoped>
.talk-root {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--vb-space-lg);
  height: 100%;
}

/* --- Status row --- */
.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--vb-space-xs) 0;
  flex-wrap: wrap;
  gap: var(--vb-space-sm);
}

.status-left {
  display: inline-flex;
  align-items: center;
  gap: var(--vb-space-sm);
}

.status-text {
  font-size: 16px;
}

.status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex: none;
  background: var(--vb-text-tertiary);
}

.status-dot--idle {
  background: var(--vb-text-tertiary);
}

.status-dot--connecting {
  background: var(--vb-warning);
  animation: dot-blink 1s ease-in-out infinite;
}

.status-dot--recording {
  background: var(--vb-error);
  box-shadow: 0 0 0 0 rgba(217, 21, 21, 0.4);
  animation: dot-pulse 1.4s ease-out infinite;
}

@keyframes dot-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes dot-pulse {
  0% { box-shadow: 0 0 0 0 rgba(217, 21, 21, 0.4); }
  100% { box-shadow: 0 0 0 8px rgba(217, 21, 21, 0); }
}

.defaults-line {
  display: inline-flex;
  gap: var(--vb-space-sm);
  align-items: center;
  flex-wrap: wrap;
}

.chip-icon {
  margin-right: 4px;
  vertical-align: -2px;
}

.info-icon {
  color: var(--vb-text-tertiary);
  cursor: help;
}

/* --- Big circle button + waveform ring --- */
.circle-wrap {
  display: flex;
  justify-content: center;
  padding: var(--vb-space-lg) 0;
}

.circle-stage {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wave-canvas {
  position: absolute;
  inset: 0;
  width: 280px;
  height: 280px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.wave-canvas.active {
  opacity: 1;
}

.circle-btn {
  position: relative;
  z-index: 1;
  width: 176px;
  height: 176px;
  border-radius: 50%;
  border: 1px solid var(--vb-border);
  background: var(--vb-surface);
  color: var(--vb-primary);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--vb-space-md);
  box-shadow: var(--vb-shadow-card);
  transition: transform 0.15s, box-shadow 0.15s, background 0.2s, color 0.2s, border-color 0.2s;
}

.circle-btn:hover:not(:disabled) {
  transform: scale(1.03);
  box-shadow: var(--vb-shadow-popover);
  border-color: var(--vb-primary);
}

.circle-btn.recording {
  background: var(--vb-primary);
  color: var(--vb-on-primary);
  border-color: var(--vb-primary);
  box-shadow: var(--vb-shadow-popover);
}

.circle-btn.connecting {
  opacity: 0.6;
  cursor: wait;
}

.circle-btn:disabled {
  cursor: not-allowed;
}

.circle-icon {
  line-height: 1;
}

.circle-label {
  font-size: 15px;
}

/* --- Transcript stream --- */
.transcript-wrap {
  flex: 1;
  min-height: 240px;
  border-radius: var(--vb-radius-lg);
  background: var(--vb-surface);
  border: 1px solid var(--vb-border);
  padding: var(--vb-space-md) var(--vb-space-sm);
  overflow: hidden;
}

.stream {
  display: flex;
  flex-direction: column;
  gap: var(--vb-space-lg);
  padding: var(--vb-space-md);
}

.msg {
  display: flex;
  gap: var(--vb-space-md);
  align-items: flex-start;
}

.msg-avatar {
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vb-border);
}

.msg-avatar.user {
  background: var(--vb-primary);
  color: var(--vb-on-primary);
  border-color: var(--vb-primary);
}

.msg-avatar.bot {
  background: var(--vb-surface-alt);
  color: var(--vb-text-secondary);
}

.msg-body {
  flex: 1;
  min-width: 0;
}

.msg-meta {
  display: flex;
  align-items: center;
  gap: var(--vb-space-sm);
  margin-bottom: 2px;
}

.msg-who {
  font-size: 12px;
  font-weight: 600;
  color: var(--vb-text-secondary);
}

.msg-ts {
  font-size: 11px;
  color: var(--vb-text-tertiary);
  font-variant-numeric: tabular-nums;
}

.msg-state {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vb-accent);
  border: 1px solid var(--vb-accent);
  border-radius: var(--vb-radius-sm);
  padding: 0 5px;
  line-height: 1.4;
}

.msg-text {
  font-size: 14px;
  line-height: 1.55;
  color: var(--vb-text);
  word-break: break-word;
  white-space: pre-wrap;
}

.msg.partial .msg-text {
  color: var(--vb-text-secondary);
}

.caret {
  display: inline-block;
  margin-left: 1px;
  color: var(--vb-primary);
  animation: caret-blink 1s step-end infinite;
}

@keyframes caret-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.empty {
  text-align: center;
  padding: var(--vb-space-xxl) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--vb-space-md);
}

.empty-icon {
  color: var(--vb-text-tertiary);
  opacity: 0.5;
}

/* --- Summary markdown --- */
.summary-md :deep(h1),
.summary-md :deep(h2),
.summary-md :deep(h3) {
  margin: 12px 0 8px;
}

.summary-md :deep(p) {
  margin: 8px 0;
  line-height: 1.6;
}

.summary-md :deep(ul),
.summary-md :deep(ol) {
  margin: 8px 0;
  padding-left: 24px;
}

.summary-md :deep(code) {
  background: var(--vb-surface-alt);
  padding: 1px 4px;
  border-radius: var(--vb-radius-sm);
  font-family: var(--vb-font-mono);
}
</style>
