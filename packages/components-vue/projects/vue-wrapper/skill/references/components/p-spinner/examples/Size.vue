<script setup lang="ts">
  import { PSpinner, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PText class="text-[48px]" size="inherit">
    <PSpinner class="me-static-sm" size="inherit" :aria="{'aria-label': 'Loading page content'}"></PSpinner>
    Some text
  </PText>
</template>
