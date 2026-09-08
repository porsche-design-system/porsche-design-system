<script setup lang="ts">
import { PHeading, PModal, PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider prefix="my-prefix">
    <PModal :open="true">
      <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
      Some Content
    </PModal>
  </PorscheDesignSystemProvider>
</template>
