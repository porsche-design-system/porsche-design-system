<script setup lang="ts">
import { PSegmentedControl, PSegmentedControlItem, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const lastSubmittedData = ref<string>('none');
const onSubmit = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement);
  lastSubmittedData.value = formData.get('options')?.toString() || 'none';
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <PSegmentedControl :name="'options'" :value="1">
      <PSegmentedControlItem :value="1">Option 1</PSegmentedControlItem>
      <PSegmentedControlItem :value="2">Option 2</PSegmentedControlItem>
      <PSegmentedControlItem :value="3">Option 3</PSegmentedControlItem>
      <PSegmentedControlItem :value="4">Option 4</PSegmentedControlItem>
      <PSegmentedControlItem :value="5">Option 5</PSegmentedControlItem>
    </PSegmentedControl>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </form>

  <PText>Last submitted data: {{ lastSubmittedData }}</PText>
</template>
