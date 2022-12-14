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
