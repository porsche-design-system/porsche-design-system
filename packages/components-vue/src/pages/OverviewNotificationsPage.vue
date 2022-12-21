<script setup lang="ts">
  import { PorscheDesignSystemProvider, PModal, PBanner } from '@porsche-design-system/components-vue';
  import { ToastComponent } from '../components';
</script>

<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <div class="playground light" title="should render notifications in correct stacking order">
    <ToastComponent text="The quick brown fox jumps over the lazy dog" />

    <PModal :heading="'The quick brown fox jumps over the lazy dog'" :open="true">Some Content</PModal>

    <PBanner>
      <span slot="title">Default banner component</span>
      <span slot="description">Some slotted banner description</span>
    </PBanner>
  </div>
  <!-- eslint-enable -->
</template>

<style scoped>
  .playground {
    height: 400px;
    padding: 0;
    margin: 0 7vw;
    transform: translateX(0);
    border: 4px solid deeppink;
  }
</style>
