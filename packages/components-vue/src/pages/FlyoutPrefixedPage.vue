<script setup lang="ts">
  import { PFlyout, PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider prefix="my-prefix">
    <PFlyout open="true">Some Content</PFlyout>
  </PorscheDesignSystemProvider>
</template>
