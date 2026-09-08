<script setup lang="ts">
import { PCanvas, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PCanvas>
    <PText>Content</PText>
    <span />
    <PText>Content</PText>
  </PCanvas>
</template>

<style scoped>
  span {
    display: block;
    height: 100dvh;
    background: deeppink;
  }
</style>