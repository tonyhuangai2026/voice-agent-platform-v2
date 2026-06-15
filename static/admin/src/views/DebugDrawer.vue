<template>
  <div class="debug-root">
    <n-text depth="3" style="font-size: 12px;">
      {{ t('debug.intro') }}
    </n-text>
    <n-divider />
    <div class="evt-list">
      <div
        v-for="(e, i) in events"
        :key="i"
        class="evt-row"
        :class="evtClass(e.type)"
      >
        <span class="ts">{{ fmtTs(e.t) }}s</span>
        <span class="tag">{{ e.type }}</span>
        <span class="body">{{ fmtBody(e) }}</span>
      </div>
      <div v-if="events.length === 0" class="empty">
        <n-text depth="3">{{ t('debug.empty') }}</n-text>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NText, NDivider } from 'naive-ui';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  events: { type: Array, required: true },
});

function evtClass(type) {
  if (!type) return '';
  if (type.startsWith('asr')) return 'evt-asr';
  if (type.startsWith('llm')) return 'evt-llm';
  if (type.startsWith('tts')) return 'evt-tts';
  if (type.includes('speaking')) return 'evt-vad';
  return '';
}

function fmtTs(ts) {
  if (typeof ts !== 'number') return '–';
  return ts.toFixed(2);
}

function fmtBody(e) {
  if (e.text != null && e.text !== '') {
    const s = String(e.text);
    return s.length > 200 ? s.slice(0, 200) + '…' : s;
  }
  if (e.value === true) return t('monitor.eventBody.start');
  if (e.value === false) return t('monitor.eventBody.end');
  if (e.value != null) return String(e.value);
  return t('common.dash');
}
</script>

<style scoped>
.debug-root {
  font-family: var(--vb-font-mono);
}

.evt-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
}

.evt-row {
  display: grid;
  grid-template-columns: 48px 130px 1fr;
  gap: 8px;
  align-items: baseline;
  padding: 2px 0;
}

.ts {
  color: var(--vb-text-tertiary);
}

.tag {
  font-weight: 600;
  color: var(--vb-text-secondary);
}

.body {
  word-break: break-word;
  white-space: pre-wrap;
  color: var(--vb-text);
}

.evt-asr .tag { color: var(--vb-info); }
.evt-llm .tag { color: var(--vb-accent); }
.evt-tts .tag { color: var(--vb-success); }
.evt-vad .tag { color: var(--vb-text-tertiary); }

.empty {
  padding: 24px 0;
  text-align: center;
}
</style>
