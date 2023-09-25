<script setup lang="ts">
  import { PButton, PPinCode, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const lastSubmittedValue = ref('none');

  const onSubmit = (e: Event): void => {
    const formData = new FormData(e.target as HTMLFormElement);
    lastSubmittedValue.value = Array.from(formData.values()).join() || 'none';
  };
</script>

<template>
  <form @submit.prevent="onSubmit">
    <PPinCode :label="'Some Label'" name="pin-code"></PPinCode>
    <PButton type="submit">Submit</PButton>
  </form>
  <PText>Last submitted data: {{ lastSubmittedValue }}</PText>
</template>
