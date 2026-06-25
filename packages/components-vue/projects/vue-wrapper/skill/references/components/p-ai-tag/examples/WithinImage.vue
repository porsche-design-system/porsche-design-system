<script setup lang="ts">
  import { PAiTag } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="relative inline-block rounded-lg overflow-hidden">
    <img src="assets/ai-tag-image.jpg" alt="AI modified image" class="block w-[300px] h-[300px] object-cover" />
    <PAiTag variant="modified" class="absolute bottom-static-sm end-static-sm scheme-dark"></PAiTag>
  </div>
</template>
