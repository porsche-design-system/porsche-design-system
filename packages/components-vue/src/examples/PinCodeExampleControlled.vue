<script setup lang="ts">
  import type { PinCodeUpdateEvent } from '@porsche-design-system/components-vue';
  import { PPinCode, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const length = ref(4);
  const currentValue = ref<string[]>([]);
  const isComplete = ref(currentValue.value?.join().length === length.value);

  const onUpdate = (e: PinCodeUpdateEvent): void => {
    currentValue.value = e.value;
    isComplete.value = e.value.join('').length === length.value;
  };
</script>

<template>
  <PPinCode :label="'Some Label'" :length="length" :value="currentValue" @update="onUpdate"></PPinCode>
  <PText>Current value: {{ currentValue }}</PText>
  <PText>Completely filled: {{ isComplete }}</PText>
</template>
