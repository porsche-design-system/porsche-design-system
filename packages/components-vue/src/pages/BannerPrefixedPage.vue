<script setup lang="ts">
  import { PBanner, PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
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
    <PBanner description="Description" heading="Heading" open="true"></PBanner>
  </PorscheDesignSystemProvider>
</template>
