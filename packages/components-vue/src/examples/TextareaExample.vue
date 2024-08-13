<script setup lang="ts">
  import { PTextarea, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const lastSubmittedData = ref('');
  const onSubmit = (e: Event) => {
    const formData = new FormData(e.target as HTMLFormElement);
    lastSubmittedData.value = formData.get('some-name') as string;
  };
</script>

<template>
  <form @submit.prevent="onSubmit">
    <PTextarea :name="'some-name'" :label="'Some Label'" />
    <button type="submit">Submit</button>
  </form>

  <PText>Last submitted data: {{ lastSubmittedData }}</PText>
</template>
