<script setup lang="ts">
  import type { MultiSelectUpdateEvent } from '@porsche-design-system/components-vue';
  import { PMultiSelect, PMultiSelectOption } from '@porsche-design-system/components-vue';
  import { computed, ref } from 'vue';

  const selectedValues = ref<(string | number)[]>([]);

  const onUpdate = (e: MultiSelectUpdateEvent) => {
    selectedValues.value = e.value;
  };

  const debugText = computed(() => {
    return `Selected values: ${selectedValues.value.join(', ') || 'none'}`;
  });
</script>

<template>
  <PMultiSelect :name="'options'" :label="'Some Label'" :value="selectedValues" @update="onUpdate">
    <PMultiSelectOption :value="'a'">Option A</PMultiSelectOption>
    <PMultiSelectOption :value="'b'">Option B</PMultiSelectOption>
    <PMultiSelectOption :value="'c'">Option C</PMultiSelectOption>
    <PMultiSelectOption :value="'d'">Option D</PMultiSelectOption>
    <PMultiSelectOption :value="'e'">Option E</PMultiSelectOption>
    <PMultiSelectOption :value="'f'">Option F</PMultiSelectOption>
  </PMultiSelect>

  <p>{{ debugText }}</p>
</template>
