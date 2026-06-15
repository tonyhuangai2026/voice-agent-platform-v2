<template>
  <div>
    <n-page-header style="margin-bottom: 16px;">
      <template #title>{{ t('users.title') }}</template>
      <template #subtitle>{{ t('users.subtitle') }}</template>
      <template #extra>
        <n-space :size="8">
          <n-button @click="load" :loading="loading">
            <template #icon><n-icon :component="Renew" /></template>
            {{ t('common.refresh') }}
          </n-button>
          <n-button type="primary" @click="openCreate">
            <template #icon><n-icon :component="Add" /></template>
            {{ t('users.actions.add') }}
          </n-button>
        </n-space>
      </template>
    </n-page-header>

    <n-card :bordered="true">
      <n-data-table
        :columns="columns"
        :data="users"
        :loading="loading"
        :pagination="{ pageSize: 10 }"
        :row-key="(row) => row.username"
      >
        <template #empty>
          <EmptyState :title="t('users.emptyTitle')" :description="t('users.emptyDesc')">
            <template #icon><n-icon :component="UserMultiple" /></template>
            <n-button type="primary" size="small" @click="openCreate">
              <template #icon><n-icon :component="Add" /></template>
              {{ t('users.actions.add') }}
            </n-button>
          </EmptyState>
        </template>
      </n-data-table>
    </n-card>

    <!-- Create-user modal -->
    <n-modal
      v-model:show="createOpen"
      preset="card"
      :title="t('users.form.titleNew')"
      style="width: 480px; max-width: 92vw;"
      :mask-closable="false"
    >
      <n-form label-placement="top">
        <n-form-item :label="t('users.form.username')">
          <n-input v-model:value="createForm.username" placeholder="jdoe" />
        </n-form-item>
        <n-text
          depth="3"
          style="display: block; font-size: 12px; margin: -8px 0 12px;"
        >
          {{ t('users.form.usernameHint') }}
        </n-text>

        <n-form-item :label="t('users.form.password')">
          <n-input
            v-model:value="createForm.password"
            type="password"
            show-password-on="click"
            :placeholder="t('users.form.passwordPlaceholder')"
          />
        </n-form-item>

        <n-form-item :label="t('users.form.role')">
          <n-select v-model:value="createForm.role" :options="roleOptions" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="createOpen = false">{{ t('common.cancel') }}</n-button>
          <n-button
            type="primary"
            :loading="saving"
            :disabled="!createValid"
            @click="doCreate"
          >
            {{ t('common.create') }}
          </n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- Reset-password modal -->
    <n-modal
      v-model:show="pwOpen"
      preset="card"
      :title="t('users.form.titleResetPw', { username: pwTarget })"
      style="width: 440px; max-width: 92vw;"
      :mask-closable="false"
    >
      <n-form label-placement="top">
        <n-form-item :label="t('users.form.newPassword')">
          <n-input
            v-model:value="pwValue"
            type="password"
            show-password-on="click"
            :placeholder="t('users.form.passwordPlaceholder')"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="pwOpen = false">{{ t('common.cancel') }}</n-button>
          <n-button
            type="primary"
            :loading="saving"
            :disabled="!pwValue"
            @click="doResetPassword"
          >
            {{ t('common.save') }}
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { computed, h, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  NPageHeader,
  NCard,
  NSpace,
  NButton,
  NDataTable,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NModal,
  NSelect,
  NTag,
  NText,
  useDialog,
  useMessage,
} from 'naive-ui';
import {
  Renew,
  Add,
  Password,
  UserMultiple,
  TrashCan,
  UserFollow,
  Locked,
} from '@vicons/carbon';
import { api } from '../api.js';
import EmptyState from '../components/ui/EmptyState.vue';

const { t } = useI18n();
const message = useMessage();
const dialog = useDialog();

const users = ref([]);
const loading = ref(false);
const saving = ref(false);

// Create-user modal state.
const createOpen = ref(false);
const createForm = reactive({ username: '', password: '', role: 'user' });

// Reset-password modal state (separate from create so the username field is
// fixed and only a new password is collected).
const pwOpen = ref(false);
const pwTarget = ref('');
const pwValue = ref('');

// Mirror user_store.USERNAME validation client-side so obvious mistakes are
// caught before the round-trip (server still re-validates).
const USERNAME_RE = /^[A-Za-z0-9._-]{2,64}$/;

const roleOptions = computed(() => [
  { label: t('users.roles.user'), value: 'user' },
  { label: t('users.roles.admin'), value: 'admin' },
]);

const createValid = computed(
  () => USERNAME_RE.test(createForm.username) && !!createForm.password,
);

function roleLabel(role) {
  return role === 'admin' ? t('users.roles.admin') : t('users.roles.user');
}

function fmtCreated(secs) {
  const ts = Number(secs);
  if (!Number.isFinite(ts) || ts <= 0) return t('common.dash');
  return new Date(ts * 1000).toLocaleString();
}

const columns = computed(() => [
  {
    title: t('users.columns.username'),
    key: 'username',
    render: (row) =>
      h(
        'span',
        { style: 'font-weight:600;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;' },
        row.username,
      ),
  },
  {
    title: t('users.columns.role'),
    key: 'role',
    width: 120,
    render: (row) =>
      h(
        NTag,
        { size: 'small', type: row.role === 'admin' ? 'warning' : 'info', bordered: false },
        () => roleLabel(row.role),
      ),
  },
  {
    title: t('users.columns.status'),
    key: 'disabled',
    width: 110,
    render: (row) =>
      h(
        NTag,
        { size: 'small', type: row.disabled ? 'default' : 'success', bordered: false },
        () => (row.disabled ? t('users.status.disabled') : t('users.status.active')),
      ),
  },
  {
    title: t('users.columns.createdAt'),
    key: 'created_at',
    width: 200,
    render: (row) =>
      h('span', { style: 'font-size:12px;color:var(--vb-text-tertiary);' }, fmtCreated(row.created_at)),
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 300,
    render: (row) =>
      h(NSpace, { size: 6 }, () => [
        // Toggle role between user <-> admin.
        h(
          NButton,
          { size: 'small', onClick: () => toggleRole(row) },
          {
            icon: () => h(NIcon, null, { default: () => h(UserMultiple) }),
            default: () =>
              row.role === 'admin' ? t('users.actions.makeUser') : t('users.actions.makeAdmin'),
          },
        ),
        // Reset password.
        h(
          NButton,
          { size: 'small', onClick: () => openResetPassword(row) },
          {
            icon: () => h(NIcon, null, { default: () => h(Password) }),
            default: () => t('users.actions.resetPw'),
          },
        ),
        // Enable / disable.
        h(
          NButton,
          {
            size: 'small',
            type: row.disabled ? 'success' : 'warning',
            secondary: true,
            onClick: () => toggleDisabled(row),
          },
          {
            icon: () => h(NIcon, null, { default: () => h(row.disabled ? UserFollow : Locked) }),
            default: () => (row.disabled ? t('users.actions.enable') : t('users.actions.disable')),
          },
        ),
        // Delete.
        h(
          NButton,
          { size: 'small', type: 'error', secondary: true, onClick: () => confirmDelete(row) },
          {
            icon: () => h(NIcon, null, { default: () => h(TrashCan) }),
            default: () => t('common.delete'),
          },
        ),
      ]),
  },
]);

async function load() {
  loading.value = true;
  try {
    const data = await api.users();
    users.value = data.users || [];
  } catch (e) {
    message.error(t('users.messages.loadFailed', { msg: e.message }));
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  createForm.username = '';
  createForm.password = '';
  createForm.role = 'user';
  createOpen.value = true;
}

async function doCreate() {
  saving.value = true;
  try {
    await api.createUser({
      username: createForm.username.trim(),
      password: createForm.password,
      role: createForm.role,
    });
    message.success(t('users.messages.created', { username: createForm.username.trim() }));
    createOpen.value = false;
    await load();
  } catch (e) {
    message.error(t('users.messages.createFailed', { msg: e.message }));
  } finally {
    saving.value = false;
  }
}

async function toggleRole(row) {
  const next = row.role === 'admin' ? 'user' : 'admin';
  try {
    await api.updateUser(row.username, { role: next });
    message.success(t('users.messages.roleChanged', { username: row.username, role: roleLabel(next) }));
    await load();
  } catch (e) {
    message.error(t('users.messages.updateFailed', { msg: e.message }));
  }
}

function openResetPassword(row) {
  pwTarget.value = row.username;
  pwValue.value = '';
  pwOpen.value = true;
}

async function doResetPassword() {
  saving.value = true;
  try {
    await api.updateUser(pwTarget.value, { password: pwValue.value });
    message.success(t('users.messages.pwReset', { username: pwTarget.value }));
    pwOpen.value = false;
  } catch (e) {
    message.error(t('users.messages.updateFailed', { msg: e.message }));
  } finally {
    saving.value = false;
  }
}

async function toggleDisabled(row) {
  const next = !row.disabled;
  try {
    await api.updateUser(row.username, { disabled: next });
    message.success(
      next
        ? t('users.messages.disabled', { username: row.username })
        : t('users.messages.enabled', { username: row.username }),
    );
    await load();
  } catch (e) {
    // 400 — the backend refuses to let an admin disable their own account.
    message.error(t('users.messages.updateFailed', { msg: e.message }));
  }
}

function confirmDelete(row) {
  dialog.warning({
    title: t('users.deleteConfirm.title'),
    content: t('users.deleteConfirm.body', { username: row.username }),
    positiveText: t('common.delete'),
    negativeText: t('common.cancel'),
    onPositiveClick: () => doDelete(row),
  });
}

async function doDelete(row) {
  try {
    await api.deleteUser(row.username);
    message.success(t('users.messages.deleted', { username: row.username }));
    await load();
  } catch (e) {
    // 400 — the backend refuses to let an admin delete their own account.
    message.error(t('users.messages.deleteFailed', { msg: e.message }));
  }
}

onMounted(load);
</script>
