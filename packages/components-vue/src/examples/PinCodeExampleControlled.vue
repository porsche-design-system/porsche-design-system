<script setup lang="ts">
import { type PinCodeChangeEventDetail, PPinCode, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const value = ref('');
const isComplete = ref(false);

const onUpdate = (e: CustomEvent<PinCodeChangeEventDetail>): void => {
  value.value = e.detail.value;
  isComplete.value = e.detail.isComplete;
};
</script>

<template>
  <PPinCode :label="'Some Label'" :value="value" @update="onUpdate"></PPinCode>
  <PText>Current value: {{ value }}</PText>
  <PText>Completely filled: {{ isComplete }}</PText>
</template>
