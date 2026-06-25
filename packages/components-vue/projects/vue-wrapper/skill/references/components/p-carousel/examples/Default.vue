<script setup lang="ts">
  import { PCarousel } from '@porsche-design-system/components-vue';
</script>

<template>
  <PCarousel heading="Some heading" :trimSpace="true" :pagination="true" :rewind="true">
    <div class="grid place-content-center h-[150px] bg-surface prose-text-sm">
      Slide 1
    </div>
    <div class="grid place-content-center h-[150px] bg-surface prose-text-sm">
      Slide 2
    </div>
    <div class="grid place-content-center h-[150px] bg-surface prose-text-sm">
      Slide 3
    </div>
    <div class="grid place-content-center h-[150px] bg-surface prose-text-sm">
      Slide 4
    </div>
  </PCarousel>
</template>
