import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../api.js';

export const useSession = defineStore('session', () => {
  /** [{role: 'user'|'bot', text, partial?: bool, t?: number}] — Talk transcript */
  const turns = ref([]);
  /** All EventBroadcaster events for the active call (Talk debug drawer + Monitor). */
  const events = ref([]);
  /** /api/config snapshot fetched at startup. */
  const config = ref(null);
  /** 'idle' | 'connecting' | 'recording' | 'ended' */
  const status = ref('idle');
  /** Optional error toast text (last failure). */
  const lastError = ref('');

  const defaultsLine = computed(() => {
    if (!config.value) return '';
    const demo = config.value.default_demo || config.value.default_scenario;
    return `${config.value.default_engine} · ${config.value.default_language} · ${demo}`;
  });

  async function loadConfig() {
    if (config.value) return config.value;
    config.value = await api.config();
    return config.value;
  }

  /**
   * Append (or merge into) a transcript bubble.
   * `partial` text from the same role is replaced; finals push a new bubble.
   */
  function pushTurn({ role, text, partial = false }) {
    const last = turns.value[turns.value.length - 1];
    if (partial && last && last.role === role && last.partial) {
      last.text = text;
      return;
    }
    if (!partial && last && last.role === role && last.partial) {
      last.text = text;
      last.partial = false;
      return;
    }
    turns.value.push({ role, text, partial });
  }

  function appendEvent(evt) {
    events.value.push({ ...evt, _ts: Date.now() });
    if (events.value.length > 1000) events.value.splice(0, events.value.length - 1000);
  }

  function reset() {
    turns.value = [];
    events.value = [];
    status.value = 'idle';
    lastError.value = '';
  }

  return {
    turns,
    events,
    config,
    status,
    lastError,
    defaultsLine,
    loadConfig,
    pushTurn,
    appendEvent,
    reset,
  };
});
