<script setup lang="ts">
  import { PSelect, PSelectOption } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const lastSubmittedData = ref('none');
  const handleSubmit = (e: Event) => {
    const formData = new FormData(e.target as HTMLFormElement);
    lastSubmittedData.value = formData.get('options')?.toString() || 'none';
  };
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <PSelect :name="'options'" :label="'Some Label'" value="'a'">
      <PSelectOption :value="'a'">Option A</PSelectOption>
      <PSelectOption :value="'b'">Option B</PSelectOption>
      <PSelectOption :value="'c'">Option C</PSelectOption>
      <PSelectOption :value="'d'">Option D</PSelectOption>
      <PSelectOption :value="'e'">Option E</PSelectOption>
      <PSelectOption :value="'f'">Option F</PSelectOption>
    </PSelect>
    <button type="submit">Submit</button>
  </form>

  <p>Last submitted data: {{ lastSubmittedData }}</p>
</template>
