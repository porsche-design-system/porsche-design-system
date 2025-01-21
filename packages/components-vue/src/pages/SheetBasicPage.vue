<script setup lang="ts">
import { PHeading, PSheet, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PSheet :open="true" :aria="{ 'aria-label': 'A slightly more detailed label' }">
    <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
    <PText>Some Content</PText>
  </PSheet>
</template>
