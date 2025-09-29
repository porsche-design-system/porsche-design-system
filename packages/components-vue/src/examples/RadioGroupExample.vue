<script setup lang="ts">
  import { PButton, PRadioGroup, PRadioGroupOption, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const lastSubmittedData = ref<string>('none');
  const onSubmit = (e: Event) => {
    const formData = new FormData(e.target as HTMLFormElement);
    lastSubmittedData.value = formData.get('options')?.toString() || 'none';
  };
</script>

<template>
  <form @submit.prevent="onSubmit">
    <PRadioGroup :name="'options'" :label="'Some Label'" value="'a'">
      <PRadioGroupOption label="Option A" :value="'a'"></PRadioGroupOption>
      <PRadioGroupOption label="Option B" :value="'b'"></PRadioGroupOption>
      <PRadioGroupOption label="Option C" :value="'c'"></PRadioGroupOption>
      <PRadioGroupOption label="Option D" :value="'d'"></PRadioGroupOption>
      <PRadioGroupOption label="Option E" :value="'e'"></PRadioGroupOption>
      <PRadioGroupOption label="Option F" :value="'f'"></PRadioGroupOption>
    </PRadioGroup>
    <PButton type="submit">Submit</PButton>
    <PButton type="reset">Reset</PButton>
  </form>

  <PText>Last submitted data: {{ lastSubmittedData }}</PText>
</template>
