<template>
  <div>
    <n-page-header style="margin-bottom: 16px;">
      <template #title>{{ t('demos.title') }}</template>
      <template #subtitle>{{ t('demos.subtitle') }}</template>
      <template #extra>
        <n-space :size="8">
          <n-button :loading="rescanning" @click="rescan">
            <template #icon><n-icon :component="Renew" /></template>
            {{ t('demos.actions.rescan') }}
          </n-button>
        </n-space>
      </template>
    </n-page-header>

    <n-alert type="info" style="margin-bottom: 16px;">
      <span v-html="t('demos.notice')" />
    </n-alert>

    <n-card :bordered="true">
      <n-data-table
        :columns="columns"
        :data="demos"
        :loading="loading"
        :pagination="{ pageSize: 10 }"
        :row-props="rowProps"
      >
        <template #empty>
          <EmptyState :title="t('demos.emptyTitle')" :description="t('demos.emptyDesc')">
            <template #icon><n-icon :component="Catalog" /></template>
            <n-button size="small" :loading="rescanning" @click="rescan">
              <template #icon><n-icon :component="Renew" /></template>
              {{ t('demos.actions.rescan') }}
            </n-button>
          </EmptyState>
        </template>
      </n-data-table>
    </n-card>

    <n-drawer v-model:show="drawerOpen" :width="640" placement="right">
      <n-drawer-content :title="detail?.label || ''" closable>
        <template v-if="detail">
          <n-descriptions :column="1" bordered size="small" style="margin-bottom: 16px;">
            <n-descriptions-item :label="t('demos.detail.id')">{{ detail.id }}</n-descriptions-item>
            <n-descriptions-item :label="t('demos.detail.mainLang')">{{ detail.lang }}</n-descriptions-item>
            <n-descriptions-item :label="t('demos.detail.kbChars')">{{ formatKbChars(detail.kb_chars) }}</n-descriptions-item>
            <n-descriptions-item :label="t('demos.detail.tags')" v-if="detail.tags?.length">
              <n-space size="small">
                <n-tag v-for="tag in detail.tags" :key="tag" size="small">{{ tag }}</n-tag>
              </n-space>
            </n-descriptions-item>
          </n-descriptions>

          <n-tabs type="line" animated>
            <n-tab-pane name="system" :tab="t('demos.detail.tabs.system')">
              <n-tabs type="segment" size="small">
                <n-tab-pane
                  v-for="(text, lang) in detail.system || {}"
                  :key="lang"
                  :name="lang"
                  :tab="lang"
                >
                  <pre class="text-block">{{ text }}</pre>
                </n-tab-pane>
              </n-tabs>
            </n-tab-pane>
            <n-tab-pane name="greeting" :tab="t('demos.detail.tabs.greeting')">
              <n-tabs type="segment" size="small">
                <n-tab-pane
                  v-for="(text, lang) in detail.greeting || {}"
                  :key="lang"
                  :name="lang"
                  :tab="lang"
                >
                  <pre class="text-block">{{ text }}</pre>
                </n-tab-pane>
              </n-tabs>
            </n-tab-pane>
            <n-tab-pane name="translate" :tab="t('demos.detail.tabs.translate')">
              <n-text depth="3" style="display:block; margin-bottom: 12px; font-size: 12px;">
                <span v-html="t('demos.translate.hint', { id: detail.id })" />
              </n-text>
              <n-space align="center" :size="8" style="margin-bottom: 8px;">
                <n-select
                  v-model:value="translateLang"
                  :options="translateLangOptions"
                  :placeholder="t('demos.translate.selectPlaceholder')"
                  style="width: 280px;"
                  @update:value="onTranslateLangChange"
                />
                <n-button
                  type="primary"
                  :loading="translating"
                  :disabled="!translateLang"
                  @click="runTranslate"
                >
                  {{ t('demos.translate.translateBtn') }}
                </n-button>
              </n-space>

              <n-alert
                v-if="translateLang && translateLangIsMissing"
                type="info"
                :show-icon="true"
                style="margin-bottom: 12px;"
              >
                {{ t('demos.translate.missingHint', { lang: translateLang }) }}
              </n-alert>
              <n-alert
                v-else-if="translateLang && !translateLangIsMissing"
                type="warning"
                :show-icon="true"
                style="margin-bottom: 12px;"
              >
                {{ t('demos.translate.existsHint', { lang: translateLang }) }}
              </n-alert>

              <template v-if="translatedFields.length">
                <n-divider style="margin: 12px 0;" />
                <n-text depth="2" style="display:block; margin-bottom: 8px; font-weight: 600;">
                  {{ t('demos.translate.previewTitle', { lang: translateTargetLang }) }}
                </n-text>
                <n-text depth="3" style="display:block; margin-bottom: 12px; font-size: 12px;">
                  {{ t('demos.translate.previewHint') }}
                </n-text>
                <div v-for="f in translatedFields" :key="f.field" style="margin-bottom: 16px;">
                  <n-text style="display:block; margin-bottom: 4px;">
                    <span class="tool-id">{{ f.field }}</span>
                    <n-text depth="3" style="font-size: 12px;">
                      · {{ t('demos.translate.sourceLabel', { lang: f.source || t('common.placeholderDash') }) }}
                    </n-text>
                  </n-text>
                  <n-input
                    v-model:value="f.text"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 12 }"
                  />
                </div>
                <n-space justify="end" style="margin-top: 16px;">
                  <n-button @click="clearTranslation">{{ t('demos.actions.reset') }}</n-button>
                  <n-button
                    type="primary"
                    :loading="writingBack"
                    @click="confirmWriteBack"
                  >
                    {{ t('demos.translate.writeBackBtn') }}
                  </n-button>
                </n-space>
              </template>
            </n-tab-pane>
            <n-tab-pane name="kb" :tab="t('demos.detail.tabs.kb')">
              <n-text depth="3" style="font-size: 12px;">{{ t('demos.detail.kbHint') }}</n-text>
              <pre class="text-block">{{ formatKbPreview(detail.kb_preview) }}</pre>
            </n-tab-pane>
            <n-tab-pane name="tools" :tab="t('demos.detail.tabs.tools')">
              <n-text depth="3" style="display:block; margin-bottom: 12px; font-size: 12px;">
                <span v-html="t('demos.detail.toolsHint', { id: detail.id })" />
              </n-text>
              <template v-if="availableTools.length === 0">
                <EmptyState :title="t('demos.detail.noTools.header')">
                  <template #icon><n-icon :component="Tools" /></template>
                  <n-text depth="3" style="font-size: 12px; max-width: 360px; display: block;">
                    <span v-html="t('demos.detail.noTools.body')" />
                  </n-text>
                </EmptyState>
              </template>
              <template v-else>
                <n-list bordered>
                  <n-list-item v-for="tool in availableTools" :key="tool.id">
                    <n-checkbox
                      :checked="!!selectedToolMap[tool.id]"
                      @update:checked="(v) => onToggleTool(tool.id, v)"
                    >
                      <span class="tool-id">{{ tool.id }}</span>
                      <n-text v-if="tool.label" depth="2"> · {{ tool.label }}</n-text>
                      <div class="tool-desc">
                        <n-text depth="3" style="font-size: 12px;">
                          {{ tool.description_short || t('common.placeholderDash') }}
                        </n-text>
                      </div>
                      <div v-if="tool.scope?.length" class="tool-scope">
                        <n-tag
                          v-for="s in tool.scope"
                          :key="s"
                          size="tiny"
                          :type="s === 'phone' ? 'warning' : 'info'"
                        >
                          {{ s }}
                        </n-tag>
                      </div>
                    </n-checkbox>
                  </n-list-item>
                </n-list>
                <n-space justify="end" style="margin-top: 16px;">
                  <n-button @click="resetSelectedTools">{{ t('demos.actions.reset') }}</n-button>
                  <n-button
                    type="primary"
                    :loading="savingTools"
                    :disabled="!toolsDirty"
                    @click="saveTools"
                  >
                    {{ t('demos.actions.save') }}
                  </n-button>
                </n-space>
              </template>
            </n-tab-pane>
            <n-tab-pane name="mcp" :tab="t('demos.detail.tabs.mcp')">
              <n-text depth="3" style="display:block; margin-bottom: 12px; font-size: 12px;">
                <span v-html="t('demos.detail.mcpHint', { id: detail.id })" />
              </n-text>
              <template v-if="mcpServerItems.length === 0">
                <EmptyState :title="t('demos.detail.noMcp.header')">
                  <template #icon><n-icon :component="Plug" /></template>
                  <n-text depth="3" style="font-size: 12px; max-width: 360px; display: block;">
                    <span v-html="t('demos.detail.noMcp.body')" />
                  </n-text>
                </EmptyState>
              </template>
              <template v-else>
                <n-list bordered>
                  <n-list-item v-for="srv in mcpServerItems" :key="srv.id">
                    <n-checkbox
                      :checked="!!selectedMcpMap[srv.id]"
                      @update:checked="(v) => onToggleMcp(srv.id, v)"
                    >
                      <span class="tool-id" :class="{ 'mcp-disabled': !srv.enabled }">
                        {{ srv.id }}
                      </span>
                      <n-text v-if="srv.label && srv.label !== srv.id" :depth="srv.enabled ? 2 : 3">
                        · {{ srv.label }}</n-text>
                      <n-tag
                        v-if="!srv.enabled"
                        size="tiny"
                        type="default"
                        style="margin-left: 6px;"
                      >
                        {{ srv.missing ? t('demos.detail.mcpMissingTag') : t('demos.detail.mcpDisabledTag') }}
                      </n-tag>
                    </n-checkbox>
                  </n-list-item>
                </n-list>
                <n-space justify="end" style="margin-top: 16px;">
                  <n-button @click="resetSelectedMcp">{{ t('demos.actions.reset') }}</n-button>
                  <n-button
                    type="primary"
                    :loading="savingMcp"
                    :disabled="!mcpDirty"
                    @click="saveMcp"
                  >
                    {{ t('demos.actions.save') }}
                  </n-button>
                </n-space>
              </template>
            </n-tab-pane>
          </n-tabs>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup>
import { computed, h, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  NPageHeader,
  NCard,
  NAlert,
  NSpace,
  NButton,
  NCheckbox,
  NDataTable,
  NDivider,
  NDrawer,
  NDrawerContent,
  NIcon,
  NInput,
  NList,
  NListItem,
  NSelect,
  NTabs,
  NTabPane,
  NTag,
  NText,
  NDescriptions,
  NDescriptionsItem,
  NTooltip,
  useMessage,
} from 'naive-ui';
import { Renew, Catalog, Tools, Plug } from '@vicons/carbon';
import { api } from '../api.js';
import EmptyState from '../components/ui/EmptyState.vue';

const { t } = useI18n();
const message = useMessage();
const demos = ref([]);
const availableTools = ref([]);
const toolDescById = computed(() => {
  const m = {};
  for (const tool of availableTools.value) m[tool.id] = tool.description_short || '';
  return m;
});
const loading = ref(false);
const rescanning = ref(false);
const drawerOpen = ref(false);
const detail = ref(null);
const selectedToolMap = reactive({});
let selectedToolsSnapshot = {};
const savingTools = ref(false);

// MCP servers tab — mirrors the Tools tab state machine (prime / toggle /
// dirty / reset / save) against the global MCP registry exposed via
// GET /api/admin/options → mcp_servers: [{id, label, enabled}].
const mcpServers = ref([]);
const selectedMcpMap = reactive({});
let selectedMcpSnapshot = {};
const savingMcp = ref(false);

// -- One-click translate (T2) ------------------------------------------------
// Target language the admin wants to generate. Options + present/missing
// annotation come from the detail's present_langs / missing_langs (T1). The
// full LANGUAGES key set in declaration order == present ∪ missing.
const translateLang = ref(null);
const translating = ref(false);
const writingBack = ref(false);
// Holds the editable preview returned by /translate. `field` is the manifest
// localized field (system/greeting/kb_intro/kb_ack), `text` the proofread-able
// translation, `source` the actual lang it was translated from (source_used).
const translatedFields = ref([]);
// The lang the current preview was generated for + whether it already exists on
// disk (any returned field's already_exists is true → write-back needs
// overwrite). Captured at translate time so editing the dropdown afterwards
// doesn't change how we write the pending preview back.
const translateTargetLang = ref(null);
const translateNeedsOverwrite = ref(false);

const presentLangs = computed(() =>
  Array.isArray(detail.value?.present_langs) ? detail.value.present_langs : [],
);
const missingLangs = computed(() =>
  Array.isArray(detail.value?.missing_langs) ? detail.value.missing_langs : [],
);

// Dropdown options = present ∪ missing (the full LANGUAGES set in order),
// each annotated as present / missing. Defensive: if the backend omitted both
// arrays (older detail), fall back to whatever langs the system map shows so
// the control still works rather than crashing.
const translateLangOptions = computed(() => {
  let langs = [...presentLangs.value, ...missingLangs.value];
  if (langs.length === 0) {
    langs = Object.keys(detail.value?.system || {});
  }
  const present = new Set(presentLangs.value);
  return langs.map((code) => ({
    value: code,
    label:
      code +
      ' · ' +
      (present.has(code)
        ? t('demos.translate.optionPresent')
        : t('demos.translate.optionMissing')),
  }));
});

const translateLangIsMissing = computed(() => {
  if (!translateLang.value) return false;
  // Treat as missing unless explicitly present (defensive when present_langs
  // is absent: an unknown lang is best surfaced as "missing → generate").
  return !presentLangs.value.includes(translateLang.value);
});

function onTranslateLangChange() {
  // Switching the target language invalidates any pending preview.
  clearTranslation();
}

function clearTranslation() {
  translatedFields.value = [];
  translateTargetLang.value = null;
  translateNeedsOverwrite.value = false;
}

async function runTranslate() {
  if (!detail.value?.id || !translateLang.value) return;
  translating.value = true;
  try {
    const res = await api.translateDemo(detail.value.id, {
      target_lang: translateLang.value,
    });
    const fields = res?.fields || {};
    const sourceUsed = res?.source_used || {};
    const alreadyExists = res?.already_exists || {};
    translatedFields.value = Object.keys(fields).map((field) => ({
      field,
      text: fields[field],
      source: sourceUsed[field] || null,
    }));
    translateTargetLang.value = res?.target_lang || translateLang.value;
    translateNeedsOverwrite.value = Object.values(alreadyExists).some(Boolean);
    if (translatedFields.value.length === 0) {
      message.warning(t('demos.translate.messages.empty'));
    }
  } catch (e) {
    // 502 = translation/parse failure; 400 = bad lang / no source text.
    if (e.status === 502) {
      message.error(t('demos.translate.messages.translateFailed', { msg: e.message }));
    } else if (e.status === 400) {
      message.error(t('demos.translate.messages.badRequest', { msg: e.message }));
    } else {
      message.error(t('demos.translate.messages.translateFailed', { msg: e.message }));
    }
  } finally {
    translating.value = false;
  }
}

async function confirmWriteBack() {
  if (!detail.value?.id || translatedFields.value.length === 0) return;
  const lang = translateTargetLang.value;
  if (!lang) return;
  // Build localized: { field: { lang: text } } for every previewed field.
  const localized = {};
  for (const f of translatedFields.value) {
    localized[f.field] = { [lang]: f.text };
  }
  const body = { localized };
  // Overwrite only when the target lang already had text on disk for some
  // field (already_exists). Existing-lang-without-overwrite → backend 400.
  if (translateNeedsOverwrite.value) body.overwrite = true;

  writingBack.value = true;
  try {
    await api.patchDemo(detail.value.id, body);
    // Re-fetch detail so present_langs / system / greeting per-lang tabs pick
    // up the newly written language.
    await refreshDetail(detail.value.id);
    await loadDemos();
    message.success(t('demos.translate.messages.writeBackDone', { lang }));
    clearTranslation();
    translateLang.value = null;
  } catch (e) {
    // 400 with overwrite needed: retryable hint. Backend rejects existing lang
    // without overwrite — surface a friendly overwrite-confirm message.
    if (e.status === 400 && !translateNeedsOverwrite.value) {
      message.warning(t('demos.translate.messages.overwriteNeeded', { lang }));
      translateNeedsOverwrite.value = true;
    } else {
      message.error(t('demos.translate.messages.writeBackFailed', { msg: e.message }));
    }
  } finally {
    writingBack.value = false;
  }
}

// Rows shown in the MCP tab = union of (a) servers in the global registry and
// (b) ids this demo already references but which are no longer in the registry
// (deleted/renamed) so the operator can see + uncheck a stale selection. A
// registry row carries enabled from options; a stale row is shown disabled and
// flagged `missing`.
const mcpServerItems = computed(() => {
  const items = mcpServers.value.map((s) => ({
    id: s.id,
    label: s.label || s.id,
    enabled: s.enabled !== false,
    missing: false,
  }));
  const known = new Set(items.map((s) => s.id));
  for (const id of Object.keys(selectedMcpMap)) {
    if (selectedMcpMap[id] && !known.has(id)) {
      items.push({ id, label: id, enabled: false, missing: true });
    }
  }
  return items;
});

// `computed` so column titles re-render when locale flips. The functional
// renders capture `t` from setup scope (Naive re-evaluates them when the
// wrapping `columns.value` reference changes).
const columns = computed(() => [
  { title: t('demos.columns.id'), key: 'id', width: 200 },
  { title: t('demos.columns.label'), key: 'label' },
  {
    title: t('demos.columns.lang'),
    key: 'lang',
    width: 130,
    render: (row) => h(NTag, { size: 'small', type: 'info' }, () => row.lang),
  },
  {
    title: t('demos.columns.kbChars'),
    key: 'kb_chars',
    width: 120,
    render: (row) => formatKbChars(row.kb_chars),
  },
  {
    title: t('demos.columns.tools'),
    key: 'tools',
    width: 220,
    render: (row) => {
      const ids = Array.isArray(row.tools) ? row.tools : [];
      if (ids.length === 0) {
        return h(NText, { depth: 3, style: 'font-size: 12px;' }, () => t('common.placeholderDash'));
      }
      return h(
        NSpace,
        { size: 4, wrap: true },
        () =>
          ids.map((id) =>
            h(
              NTooltip,
              { trigger: 'hover', placement: 'top' },
              {
                trigger: () =>
                  h(
                    NTag,
                    { size: 'small', type: 'success', bordered: false },
                    () => id,
                  ),
                default: () => toolDescById.value[id] || id,
              },
            ),
          ),
      );
    },
  },
]);

function rowProps(row) {
  return {
    style: 'cursor: pointer;',
    onClick: () => openDetail(row.id),
  };
}

function formatKbChars(value) {
  if (value === null || value === undefined) return '0';
  if (typeof value === 'number') return value.toLocaleString();
  if (typeof value === 'object') {
    // per-language KB sizes — sum for the column display, expand in drawer.
    const parts = Object.entries(value)
      .map(([lang, n]) => `${lang}: ${(n || 0).toLocaleString()}`)
      .join(' · ');
    return parts || '0';
  }
  return String(value);
}

function formatKbPreview(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([lang, text]) => `── ${lang} ──\n${text || ''}`)
      .join('\n\n');
  }
  return String(value);
}

async function loadDemos() {
  loading.value = true;
  try {
    const data = await api.demos();
    demos.value = data.demos || [];
  } catch (e) {
    message.error(t('demos.messages.loadFailed', { msg: e.message }));
  } finally {
    loading.value = false;
  }
}

async function loadTools() {
  try {
    const data = await api.adminTools();
    // Backend may return either {tools: [...]} or a bare array; tolerate both.
    const list = Array.isArray(data) ? data : data?.tools || [];
    availableTools.value = list;
  } catch (e) {
    availableTools.value = [];
    message.error(t('demos.messages.toolsLoadFailed', { msg: e.message }));
  }
}

async function loadMcpServers() {
  try {
    const data = await api.options();
    mcpServers.value = Array.isArray(data?.mcp_servers) ? data.mcp_servers : [];
  } catch (e) {
    mcpServers.value = [];
    message.error(t('demos.messages.mcpLoadFailed', { msg: e.message }));
  }
}

async function rescan() {
  rescanning.value = true;
  try {
    const r = await api.rescan();
    demos.value = r.demos || [];
    // Tools registry could in principle have changed (e.g. after a service
    // restart with new code); refresh both sides so the drawer stays honest.
    await loadTools();
    if (drawerOpen.value && detail.value?.id) {
      await refreshDetail(detail.value.id);
    }
    message.success(t('demos.messages.rescanDone', { n: r.count ?? demos.value.length }));
  } catch (e) {
    message.error(t('demos.messages.rescanFailed', { msg: e.message }));
  } finally {
    rescanning.value = false;
  }
}

async function refreshDetail(id) {
  detail.value = await api.demoDetail(id);
  primeSelectedTools(detail.value?.tools || []);
  primeSelectedMcp(detail.value?.mcp_servers || []);
}

function primeSelectedTools(toolIds) {
  // Reset map to exactly the ids set on this demo.
  for (const k of Object.keys(selectedToolMap)) delete selectedToolMap[k];
  for (const id of toolIds) selectedToolMap[id] = true;
  selectedToolsSnapshot = { ...selectedToolMap };
}

function onToggleTool(id, checked) {
  if (checked) selectedToolMap[id] = true;
  else delete selectedToolMap[id];
}

const toolsDirty = computed(() => {
  const cur = Object.keys(selectedToolMap).filter((k) => selectedToolMap[k]).sort();
  const prev = Object.keys(selectedToolsSnapshot)
    .filter((k) => selectedToolsSnapshot[k])
    .sort();
  if (cur.length !== prev.length) return true;
  for (let i = 0; i < cur.length; i++) if (cur[i] !== prev[i]) return true;
  return false;
});

function resetSelectedTools() {
  for (const k of Object.keys(selectedToolMap)) delete selectedToolMap[k];
  for (const k of Object.keys(selectedToolsSnapshot)) {
    if (selectedToolsSnapshot[k]) selectedToolMap[k] = true;
  }
}

async function saveTools() {
  if (!detail.value?.id) return;
  // Preserve the order in which tools appear in the registry so that the
  // resulting manifest is deterministic across saves.
  const order = availableTools.value.map((tool) => tool.id);
  const selected = order.filter((id) => selectedToolMap[id]);
  // Defensive: include any selected ids not present in registry order at the end.
  for (const id of Object.keys(selectedToolMap)) {
    if (selectedToolMap[id] && !selected.includes(id)) selected.push(id);
  }

  savingTools.value = true;
  try {
    const updated = await api.patchDemo(detail.value.id, { tools: selected });
    // Backend may echo back {demo: {...}} or the demo dict directly — tolerate both.
    const next = updated?.demo || updated;
    if (next && typeof next === 'object' && next.id) {
      detail.value = { ...detail.value, ...next };
      primeSelectedTools(next.tools || selected);
    } else {
      // Fallback: re-fetch detail so we show the persisted state.
      await refreshDetail(detail.value.id);
    }
    await loadDemos();
    message.success(t('demos.messages.toolsSaved'));
  } catch (e) {
    message.error(t('demos.messages.saveFailed', { msg: e.message }));
  } finally {
    savingTools.value = false;
  }
}

function primeSelectedMcp(serverIds) {
  for (const k of Object.keys(selectedMcpMap)) delete selectedMcpMap[k];
  for (const id of serverIds) selectedMcpMap[id] = true;
  selectedMcpSnapshot = { ...selectedMcpMap };
}

function onToggleMcp(id, checked) {
  if (checked) selectedMcpMap[id] = true;
  else delete selectedMcpMap[id];
}

const mcpDirty = computed(() => {
  const cur = Object.keys(selectedMcpMap).filter((k) => selectedMcpMap[k]).sort();
  const prev = Object.keys(selectedMcpSnapshot)
    .filter((k) => selectedMcpSnapshot[k])
    .sort();
  if (cur.length !== prev.length) return true;
  for (let i = 0; i < cur.length; i++) if (cur[i] !== prev[i]) return true;
  return false;
});

function resetSelectedMcp() {
  for (const k of Object.keys(selectedMcpMap)) delete selectedMcpMap[k];
  for (const k of Object.keys(selectedMcpSnapshot)) {
    if (selectedMcpSnapshot[k]) selectedMcpMap[k] = true;
  }
}

async function saveMcp() {
  if (!detail.value?.id) return;
  // Deterministic order: registry order first, then any stale-but-selected ids.
  const order = mcpServers.value.map((s) => s.id);
  const selected = order.filter((id) => selectedMcpMap[id]);
  for (const id of Object.keys(selectedMcpMap)) {
    if (selectedMcpMap[id] && !selected.includes(id)) selected.push(id);
  }

  savingMcp.value = true;
  try {
    const updated = await api.patchDemo(detail.value.id, { mcp_servers: selected });
    const next = updated?.demo || updated;
    if (next && typeof next === 'object' && next.id) {
      detail.value = { ...detail.value, ...next };
      primeSelectedMcp(next.mcp_servers || selected);
    } else {
      await refreshDetail(detail.value.id);
    }
    await loadDemos();
    message.success(t('demos.messages.mcpSaved'));
  } catch (e) {
    message.error(t('demos.messages.saveFailed', { msg: e.message }));
  } finally {
    savingMcp.value = false;
  }
}

async function openDetail(id) {
  try {
    // Fresh demo → drop any leftover translate selection / preview.
    translateLang.value = null;
    clearTranslation();
    await refreshDetail(id);
    drawerOpen.value = true;
  } catch (e) {
    message.error(t('demos.messages.detailFailed', { msg: e.message }));
  }
}

onMounted(async () => {
  await Promise.all([loadDemos(), loadTools(), loadMcpServers()]);
});
</script>

<style scoped>
.text-block {
  background: var(--vb-surface-alt);
  border: 1px solid var(--vb-border);
  color: var(--vb-text-secondary);
  padding: var(--vb-space-md);
  border-radius: var(--vb-radius-sm);
  font-size: 12px;
  font-family: var(--vb-font-mono);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 400px;
  overflow-y: auto;
}

code {
  background: var(--vb-surface-alt);
  padding: 1px 4px;
  border-radius: var(--vb-radius-sm);
  font-size: 12px;
}

.tool-id {
  font-weight: 600;
  font-family: var(--vb-font-mono);
}

.tool-desc {
  margin-top: 2px;
  margin-left: 0;
}

.tool-scope {
  margin-top: 4px;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.mcp-disabled {
  opacity: 0.55;
  text-decoration: line-through;
}
</style>
