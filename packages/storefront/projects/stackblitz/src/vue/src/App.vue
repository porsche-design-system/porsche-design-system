<script setup lang="ts">
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-vue';
import Example from './components/Example.vue';
</script>

<template>
  <PorscheDesignSystemProvider :theme="'auto'">
    <Example />
  </PorscheDesignSystemProvider>
</template>