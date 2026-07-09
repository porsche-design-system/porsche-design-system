<script setup lang="ts">
import { PToast, useToastManager } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const { addMessage } = useToastManager();
const counter = ref(1);

const onButtonClick = (): void => {
  addMessage({ text: `Some message ${counter.value}`, state: 'success' });
  counter.value = counter.value + 1;
};
</script>

<template>
  <button type="button" @click="onButtonClick">Queue Toast</button>
  <PToast />
</template>
