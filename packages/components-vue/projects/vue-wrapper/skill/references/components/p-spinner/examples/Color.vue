<script setup lang="ts">
  import { PSpinner, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PText :style="{'color': 'light-dark(mediumvioletred, deeppink)'}" color="inherit">
    <PSpinner class="me-static-sm" color="inherit" :aria="{'aria-label': 'Loading page content'}"></PSpinner>
    Some text
  </PText>
</template>
