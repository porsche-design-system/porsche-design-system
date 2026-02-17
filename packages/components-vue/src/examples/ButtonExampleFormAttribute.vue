<script setup lang="ts">
import { PButton, PText, PTextarea } from '@porsche-design-system/components-vue';
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

  <PButton type="submit" form="some-form">Submit</PButton>
  <PButton type="reset" form="some-form">Reset</PButton>

  <PText>Last submitted data: {{ lastSubmittedData }}</PText>
</template>
