<script setup lang="ts">
import { PButton, PInputSearch, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const lastSubmittedData = ref('');
const onSubmit = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  lastSubmittedData.value = formData.get('some-name') as string;
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <PInputSearch :name="'some-name'" :label="'Some Label'" :indicator="true" :clear="true" />
    <PButton type="submit">Submit</PButton>
    <PButton type="reset">Reset</PButton>
  </form>

  <PText>Last submitted data: {{ lastSubmittedData }}</PText>
</template>
