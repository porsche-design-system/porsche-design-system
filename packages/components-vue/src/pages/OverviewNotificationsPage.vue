<script setup lang="ts">
  import { PModal, PBanner } from '@porsche-design-system/components-vue';
  import { ToastComponent } from '../components';
</script>

<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <div class="playground light" title="should render notifications in correct stacking order">
    <div>
      <ToastComponent text="The quick brown fox jumps over the lazy dog" />

      <PModal :heading="'The quick brown fox jumps over the lazy dog'" :open="true">Some Content</PModal>

      <PBanner :open="true">
        <span slot="title">Default banner component</span>
        <span slot="description">Some slotted banner description</span>
      </PBanner>
    </div>
  </div>
  <!-- eslint-enable -->
</template>

<style scoped>
  .playground > div {
    height: 300px;
    transform: translateX(0);
    border: 1px solid deeppink;
  }
</style>
