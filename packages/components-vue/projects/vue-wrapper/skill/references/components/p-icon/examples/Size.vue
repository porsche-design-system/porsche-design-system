<script setup lang="ts">
  import { PIcon, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PText class="text-[48px]" size="inherit">
    <PIcon class="me-static-sm" size="inherit" name="highway" :aria="{'aria-label': 'Highway icon'}"></PIcon>
    Some text
  </PText>
</template>
