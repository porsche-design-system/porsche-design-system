<script setup lang="ts">
import { PButton, PSelect, PSelectOption, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const lastSubmittedData = ref<string>('none');
const onSubmit = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  lastSubmittedData.value = formData.get('options')?.toString() || 'none';
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <PSelect :name="'options'" :label="'Some Label'" value="'a'">
      <PSelectOption :value="'a'">Option A</PSelectOption>
      <PSelectOption :value="'b'">Option B</PSelectOption>
      <PSelectOption :value="'c'">Option C</PSelectOption>
      <PSelectOption :value="'d'">Option D</PSelectOption>
      <PSelectOption :value="'e'">Option E</PSelectOption>
      <PSelectOption :value="'f'">Option F</PSelectOption>
    </PSelect>
    <PButton type="submit">Submit</PButton>
    <PButton type="reset">Reset</PButton>
  </form>

  <PText>Last submitted data: {{ lastSubmittedData }}</PText>
</template>
