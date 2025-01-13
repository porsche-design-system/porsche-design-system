<script setup lang="ts">
import { PButtonPure, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const lastSubmittedData = ref('none');
const handleSubmit = (e: Event) => {
  const formData = Array.from(new FormData(e.target as HTMLFormElement, (e as SubmitEvent).submitter).entries())[0];
  lastSubmittedData.value = formData.join('=') || 'none';
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <PButtonPure name="option" value="A" type="submit">Button A</PButtonPure>
    <PButtonPure name="option" value="B" type="submit">Button B</PButtonPure>
  </form>

  <PText>Last submitted data: {{ lastSubmittedData }}</PText>
</template>
