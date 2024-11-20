<script setup lang="ts">
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
import { ToastComponent } from '../components';
</script>

<template>
  <div class="visualize-grid">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>

  <PorscheDesignSystemProvider prefix="my-prefix">
    <ToastComponent text="Some message" />
  </PorscheDesignSystemProvider>
</template>
