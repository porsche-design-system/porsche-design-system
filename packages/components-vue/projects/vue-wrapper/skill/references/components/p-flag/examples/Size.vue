<script setup lang="ts">
  import { PFlag, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PText class="text-[48px]" size="inherit">
    <PFlag class="me-static-sm" size="inherit" name="de" :aria="{'aria-label': 'Flag of Germany'}"></PFlag>
    Some text
  </PText>
</template>
