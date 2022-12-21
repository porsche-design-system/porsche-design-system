<script setup lang="ts">
  import { PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
  import { ToastComponent } from '../components';
</script>

<template>
  <PorscheDesignSystemProvider prefix="my-prefix">
    <div class="playground light">
      <ToastComponent text="Some message" />
    </div>
  </PorscheDesignSystemProvider>
</template>

<style scoped>
  .playground {
    height: 300px;
    padding: 0;
    transform: translateX(0);
    border: 1px solid deeppink;
  }
</style>
