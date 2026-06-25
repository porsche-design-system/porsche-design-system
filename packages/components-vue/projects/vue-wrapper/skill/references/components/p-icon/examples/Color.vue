<script setup lang="ts">
  import { PIcon, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PText :style="{'color': 'light-dark(mediumvioletred, deeppink)'}" color="inherit">
    <PIcon class="me-static-sm" color="inherit" name="highway" :aria="{'aria-label': 'Highway icon'}"></PIcon>
    Some text
  </PText>
</template>
