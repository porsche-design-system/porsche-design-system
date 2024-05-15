<script lang="ts" setup>
  import { componentsReady, PModal } from '@porsche-design-system/components-vue';
  import { ToastComponent } from '../components';

  componentsReady().then(() => {
    // focus is flaky on modal VRT so remove it
    if (document.activeElement) {
      document.activeElement.blur();
    }
  });
</script>

<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <div class="playground light" title="should render notifications in correct stacking order">
    <div>
      <ToastComponent text="The quick brown fox jumps over the lazy dog" />

      <PModal :heading="'The quick brown fox jumps over the lazy dog'" :open="true">Some Content</PModal>
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
