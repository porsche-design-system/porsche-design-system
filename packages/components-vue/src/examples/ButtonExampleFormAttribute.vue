<script setup lang="ts">
import { PButton, PButtonGroup, PText, PTextarea } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const lastSubmittedData = ref('none');
const handleSubmit = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  lastSubmittedData.value = (formData.get('some-name') as string) || 'none';
};
</script>

<template>
  <form @submit.prevent="handleSubmit" id="some-form">
    <PTextarea :name="'some-name'" :label="'Some Label'" />
  </form>

  <PButtonGroup>
    <PButton type="submit" form="some-form">Submit</PButton>
    <PButton type="reset" form="some-form">Reset</PButton>
  </PButtonGroup>

  <PText>Last submitted data: {{ lastSubmittedData }}</PText>
</template>
