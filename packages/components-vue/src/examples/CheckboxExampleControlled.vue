<script setup lang="ts">
  import { PCheckbox, PText, type CheckboxUpdateEventDetail } from '@porsche-design-system/components-vue';
  import { computed, ref } from 'vue';

  const value = ref<string>('some-value');

  const onUpdate = (e: CheckboxUpdateEventDetail) => {
    console.log(e);
    value.value = e.checked ? e.value : undefined;
  };

  const debugText = computed(() => {
    return `Value: ${value.value}`;
  });
</script>

<template>
  <PCheckbox :name="'some-name'" :label="'Some Label'" checked :value="value" @update="onUpdate" />
  <PText>{{ debugText }}</PText>
</template>
