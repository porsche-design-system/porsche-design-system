<script setup lang="ts">
  import { PSpinner } from '@porsche-design-system/components-vue';
</script>

<template>
  <PSpinner class="[--p-spinner-color:deeppink] [--p-spinner-track-color:lightpink]" :aria="{'aria-label': 'Loading page content'}"></PSpinner>
</template>
