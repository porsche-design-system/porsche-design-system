<script setup lang="ts">
  import { type PinCodeUpdateEventDetail, PPinCode, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const value = ref('');
  const isComplete = ref(false);

  const onUpdate = (e: PinCodeUpdateEventDetail): void => {
    value.value = e.value;
    isComplete.value = e.isComplete;
  };
</script>

<template>
  <PPinCode :label="'Some Label'" :value="value" @update="onUpdate"></PPinCode>
  <PText>Current value: {{ value }}</PText>
  <PText>Completely filled: {{ isComplete }}</PText>
</template>
