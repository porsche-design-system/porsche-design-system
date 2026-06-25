<script setup lang="ts">
  import { PSpinner } from '@porsche-design-system/components-vue';
</script>

<template>
  <PSpinner :size="{'base': 'sm', 'l': '2xl'}" :aria="{'aria-label': 'Loading page content'}"></PSpinner>
</template>
