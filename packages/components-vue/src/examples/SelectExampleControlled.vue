<script setup lang="ts">
import { PSelect, PSelectOption, PText, type SelectChangeEventDetail } from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const selectedValue = ref<string>('a');

const onChange = (e: CustomEvent<SelectChangeEventDetail>) => {
  selectedValue.value = e.detail.value;
};

const debugText = computed(() => {
  return `Selected values: ${selectedValue.value}`;
});
</script>

<template>
  <PSelect :name="'options'" :label="'Some Label'" :value="selectedValue" @change="onChange">
    <PSelectOption :value="'a'">Option A</PSelectOption>
    <PSelectOption :value="'b'">Option B</PSelectOption>
    <PSelectOption :value="'c'">Option C</PSelectOption>
    <PSelectOption :value="'d'">Option D</PSelectOption>
    <PSelectOption :value="'e'">Option E</PSelectOption>
    <PSelectOption :value="'f'">Option F</PSelectOption>
  </PSelect>

  <PText>{{ debugText }}</PText>
</template>
