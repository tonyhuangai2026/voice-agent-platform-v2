/**
 * Voice-server constants. The downstream protocol is now Pipecat's raw
 * PCM WebSocket (no Nova Sonic v2 envelope), so most fields are gone.
 */
export const PIPECAT_WS_URL = process.env.PIPECAT_WS_URL || "ws://127.0.0.1:7860/phone/ws";

// Chime delivers G.711 μ-law 8 kHz mono.
export const CHIME_SAMPLE_RATE = 8000;

// Pipeline expects 16 kHz PCM in, returns 24 kHz PCM out.
export const PIPELINE_INPUT_SAMPLE_RATE = 16000;
export const PIPELINE_OUTPUT_SAMPLE_RATE = 24000;

export const MAX_CALL_DURATION_MS = parseInt(process.env.MAX_CALL_DURATION_MS || "1200000", 10);
