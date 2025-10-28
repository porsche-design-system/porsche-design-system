<script setup lang="ts">
import { PHeading, PorscheDesignSystemProvider, PSheet, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider prefix="my-prefix">
    <PSheet :open="true" :aria="{ 'aria-label': 'A slightly more detailed label' }">
      <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
      <PText>Some Content</PText>
    </PSheet>
  </PorscheDesignSystemProvider>
</template>
