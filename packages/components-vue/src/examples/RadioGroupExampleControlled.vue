<script setup lang="ts">
import {
  PRadioGroup,
  PRadioGroupOption,
  PText,
  type RadioGroupChangeEventDetail,
} from '@porsche-design-system/components-vue';
import { computed, ref } from 'vue';

const selectedValue = ref<string>('a');

const onChange = (e: CustomEvent<RadioGroupChangeEventDetail>) => {
  const input = e.target as HTMLElement & { value: string };
  selectedValue.value = input.value;
};

const debugText = computed(() => {
  return `Selected values: ${selectedValue.value}`;
});
</script>

<template>
  <PRadioGroup :name="'options'" :label="'Some Label'" :value="selectedValue" @change="onChange">
    <PRadioGroupOption label="Option A" :value="'a'"></PRadioGroupOption>
    <PRadioGroupOption label="Option B" :value="'b'"></PRadioGroupOption>
    <PRadioGroupOption label="Option C" :value="'c'"></PRadioGroupOption>
    <PRadioGroupOption label="Option D" :value="'d'"></PRadioGroupOption>
    <PRadioGroupOption label="Option E" :value="'e'"></PRadioGroupOption>
    <PRadioGroupOption label="Option F" :value="'f'"></PRadioGroupOption>
  </PRadioGroup>

  <PText>{{ debugText }}</PText>
</template>
