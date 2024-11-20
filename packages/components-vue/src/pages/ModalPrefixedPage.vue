<script setup lang="ts">
import { PModal, PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider prefix="my-prefix">
    <PModal heading="Heading" :open="true">Some Content</PModal>
  </PorscheDesignSystemProvider>
</template>
