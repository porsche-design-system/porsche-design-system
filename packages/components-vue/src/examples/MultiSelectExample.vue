<script setup lang="ts">
import { PButton, PMultiSelect, PMultiSelectOption, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const lastSubmittedData = ref('none');
const onSubmit = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  lastSubmittedData.value = Array.from(formData.values()).join(', ') || 'none';
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <PMultiSelect :name="'options'" :label="'Some Label'" :value="['a']">
      <PMultiSelectOption :value="'a'">Option A</PMultiSelectOption>
      <PMultiSelectOption :value="'b'">Option B</PMultiSelectOption>
      <PMultiSelectOption :value="'c'">Option C</PMultiSelectOption>
      <PMultiSelectOption :value="'d'">Option D</PMultiSelectOption>
      <PMultiSelectOption :value="'e'">Option E</PMultiSelectOption>
      <PMultiSelectOption :value="'f'">Option F</PMultiSelectOption>
    </PMultiSelect>
    <PButton type="submit">Submit</PButton>
    <PButton type="reset">Reset</PButton>
  </form>

  <PText>Last submitted data: {{ lastSubmittedData }}</PText>
</template>
