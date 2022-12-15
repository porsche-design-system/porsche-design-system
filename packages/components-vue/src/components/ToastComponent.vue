<script setup lang="ts">
  import { PToast, useToastManager } from '@porsche-design-system/components-vue';
  import { onMounted } from 'vue';

  const props = withDefaults(defineProps<{ text: string }>(), {
    text: 'Some message',
  });

  const { addMessage } = useToastManager();

  onMounted(() => {
    addMessage({ text: props.text });
  });
</script>

<template>
  <PToast />
</template>
