<script setup lang="ts">
import { PCanvas, PorscheDesignSystemProvider, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider prefix="my-prefix">
    <PCanvas>
      <PText>Content</PText>
      <span />
      <PText>Content</PText>
    </PCanvas>
  </PorscheDesignSystemProvider>
</template>

<style scoped>
  span {
    display: block;
    height: 100dvh;
    background: deeppink;
  }
</style>