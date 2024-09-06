<script setup lang="ts">
  import { PCheckbox, PText, type CheckboxUpdateEventDetail } from '@porsche-design-system/components-vue';
  import { computed, ref } from 'vue';

  const value = ref<string | undefined>('');

  const onUpdate = (e: CheckboxUpdateEventDetail) => {
    value.value = e.checked ? e.value : '';
  };

  const debugText = computed(() => {
    return `Value: ${value.value}`;
  });
</script>

<template>
  <PCheckbox :name="'some-name'" :label="'Some Label'" :value="'some-value'" @update="onUpdate" />
  <PText>{{ debugText }}</PText>
</template>
