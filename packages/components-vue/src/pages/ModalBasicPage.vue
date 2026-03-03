<script setup lang="ts">
import { PHeading, PModal } from '@porsche-design-system/components-vue';
</script>

<template>
  <PModal heading="Heading" :open="true">
    <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
    Some Content
  </PModal>
</template>
