<template>
  <DefaultsForm
    segment="phone"
    :page-title="t('phone.title')"
    :page-subtitle="t('phone.subtitle')"
    :alert-text="t('phone.alert')"
    alert-type="warning"
  />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import DefaultsForm from './DefaultsForm.vue';

const { t } = useI18n();
</script>
