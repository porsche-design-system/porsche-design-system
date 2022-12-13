<script setup lang="ts">
  import { PToast, useToastManager } from '@porsche-design-system/components-vue';
  import { onMounted } from 'vue';

  const { addMessage } = useToastManager();

  onMounted(() => {
    addMessage({ text: 'some message' });
  });
</script>

<template>
  <PToast />
</template>
