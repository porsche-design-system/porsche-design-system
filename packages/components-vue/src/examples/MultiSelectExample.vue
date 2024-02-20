<script setup lang="ts">
  import { PMultiSelect, PMultiSelectOption } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const lastSubmittedData = ref('none');
  const onSubmit = (e: Event) => {
    const formData = new FormData(e.target as HTMLFormElement);
    lastSubmittedData.value = Array.from(formData.values()).join(', ') || 'none';
  };
</script>

<template>
  <form @submit.prevent="onSubmit">
    <PMultiSelect :name="'options'" :label="'Some Label'">
      <PMultiSelectOption :value="'a'">Option A</PMultiSelectOption>
      <PMultiSelectOption :value="'b'">Option B</PMultiSelectOption>
      <PMultiSelectOption :value="'c'">Option C</PMultiSelectOption>
      <PMultiSelectOption :value="'d'">Option D</PMultiSelectOption>
      <PMultiSelectOption :value="'e'">Option E</PMultiSelectOption>
      <PMultiSelectOption :value="'f'">Option F</PMultiSelectOption>
    </PMultiSelect>
    <button type="submit">Submit</button>
  </form>

  <p>Last submitted data: {{ lastSubmittedData }}</p>
</template>
