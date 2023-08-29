<script setup lang="ts">
  import { PButton, PPinCode, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const lastSubmittedValue = ref('none');

  const onSubmit = (e): void => {
    lastSubmittedValue.value = e.target.elements['pin-code'].value || 'none';
  };
</script>

<template>
  <form @submit.prevent="onSubmit">
    <PPinCode :label="'Some Label'" name="pin-code"></PPinCode>
    <PButton type="submit">Submit</PButton>
  </form>
  <PText>Last submitted data: {{ lastSubmittedValue }}</PText>
</template>
