<script setup lang="ts">
import { PActionSheet, PHeading, PText, PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider prefix="my-prefix">
    <PActionSheet :open="true" :aria="{ 'aria-label': 'A slightly more detailed label' }">
      <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
      <PText>Some Content</PText>
    </PActionSheet>
  </PorscheDesignSystemProvider>
</template>
