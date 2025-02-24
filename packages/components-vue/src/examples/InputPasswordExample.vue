<script setup lang="ts">
import { PInputPassword, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const lastSubmittedData = ref('');
const onSubmit = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  lastSubmittedData.value = formData.get('some-name') as string;
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <PInputPassword :name="'some-name'" :label="'Some Label'" />
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </form>

  <PText>Last submitted data: {{ lastSubmittedData }}</PText>
</template>
