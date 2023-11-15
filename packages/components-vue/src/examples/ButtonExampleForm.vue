<script setup lang="ts">
  import { PButton } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const lastSubmittedData = ref('none');
  const handleSubmit = (e: Event) => {
    const formData = Array.from(new FormData(e.target as HTMLFormElement, (e as SubmitEvent).submitter).entries())[0];
    lastSubmittedData.value = formData.join('=') || 'none';
  };
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <PButton name="option" value="A" type="submit">Button A</PButton>
    <PButton name="option" value="B" type="submit">Button B</PButton>
  </form>

  <p>Last submitted data: {{ lastSubmittedData }}</p>
</template>
