<script setup lang="ts">
  import type { PinCodeUpdateEvent } from '@porsche-design-system/components-vue';
  import { PPinCode, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const currentValue = ref<>('');
  const isComplete = ref(false);

  const onUpdate = (e: PinCodeUpdateEvent): void => {
    currentValue.value = e.value;
    isComplete.value = e.isComplete;
  };
</script>

<template>
  <PPinCode :label="'Some Label'" length="4" :value="currentValue" @update="onUpdate"></PPinCode>
  <PText>Current value: {{ currentValue }}</PText>
  <PText>Completely filled: {{ isComplete }}</PText>
</template>
