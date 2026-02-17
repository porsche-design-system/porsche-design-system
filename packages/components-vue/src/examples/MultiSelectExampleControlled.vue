<script setup lang="ts">
import {
  type MultiSelectChangeEventDetail,
  PMultiSelect,
  PMultiSelectOption,
  PText,
} from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const selectedValues = ref<string[]>([]);

const onChange = (e: CustomEvent<MultiSelectChangeEventDetail>) => {
  selectedValues.value = e.detail.value;
};

const debugText = computed(() => {
  return `Selected values: ${selectedValues.value.join(', ') || 'none'}`;
});
</script>

<template>
  <PMultiSelect :name="'options'" :label="'Some Label'" :value="selectedValues" @change="onChange">
    <PMultiSelectOption :value="'a'">Option A</PMultiSelectOption>
    <PMultiSelectOption :value="'b'">Option B</PMultiSelectOption>
    <PMultiSelectOption :value="'c'">Option C</PMultiSelectOption>
    <PMultiSelectOption :value="'d'">Option D</PMultiSelectOption>
    <PMultiSelectOption :value="'e'">Option E</PMultiSelectOption>
    <PMultiSelectOption :value="'f'">Option F</PMultiSelectOption>
  </PMultiSelect>

  <PText>{{ debugText }}</PText>
</template>
