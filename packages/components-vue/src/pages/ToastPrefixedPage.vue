<script setup lang="ts">
  import { default as ToastComponent } from '../components/ToastComponent.vue';
  import { PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider prefix="my-prefix">
    <div class="playground light">
      <ToastComponent />
    </div>
  </PorscheDesignSystemProvider>
</template>
