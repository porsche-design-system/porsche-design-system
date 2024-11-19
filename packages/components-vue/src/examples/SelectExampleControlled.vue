<script setup lang="ts">
import { type SelectUpdateEventDetail, PSelect, PSelectOption, PText } from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const selectedValue = ref<string>('a');

const onUpdate = (e: SelectUpdateEventDetail) => {
  selectedValue.value = e.value;
};

const debugText = computed(() => {
  return `Selected values: ${selectedValue.value}`;
});
</script>

<template>
  <PSelect :name="'options'" :label="'Some Label'" :value="selectedValue" @update="onUpdate">
    <PSelectOption :value="'a'">Option A</PSelectOption>
    <PSelectOption :value="'b'">Option B</PSelectOption>
    <PSelectOption :value="'c'">Option C</PSelectOption>
    <PSelectOption :value="'d'">Option D</PSelectOption>
    <PSelectOption :value="'e'">Option E</PSelectOption>
    <PSelectOption :value="'f'">Option F</PSelectOption>
  </PSelect>

  <PText>{{ debugText }}</PText>
</template>
