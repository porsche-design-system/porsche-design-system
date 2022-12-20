<script setup lang="ts">
  import { PorscheDesignSystemProvider, PModal, PBanner } from '@porsche-design-system/components-vue';
  import { ToastComponent } from '../components';
</script>

<template>
  <div class="playground light" title="should render notifications in correct stacking order">
    <ToastComponent text="The quick brown fox jumps over the lazy dog" />

    <PModal heading="The quick brown fox jumps over the lazy dog" :open="true">Some Content</PModal>

    <PBanner>
      <span slot="title">Default banner component</span>
      <span slot="description">Some slotted banner description</span>
    </PBanner>

    <PorscheDesignSystemProvider prefix="my-prefix">
      <PBanner>
        <span slot="title">Prefixed banner component</span>
        <span slot="description">Some slotted banner description</span>
      </PBanner>
    </PorscheDesignSystemProvider>
  </div>
</template>

<style scoped>
  .playground {
    height: 400px;
    padding: 0;
    margin: 0 7vw;
    transform: translateX(0);
    border: 4px solid deeppink;
  }

  p-banner:last-child,
  my-prefix-p-banner:last-child {
    --p-banner-position-top: 150px;
  }
</style>
