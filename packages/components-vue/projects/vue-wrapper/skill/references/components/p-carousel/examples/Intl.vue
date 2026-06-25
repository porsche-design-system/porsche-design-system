<script setup lang="ts">
  import { PCarousel } from '@porsche-design-system/components-vue';
</script>

<template>
  <PCarousel heading="Some heading" :intl="{'slideLabel': 'Slide %s von %s', 'prev': 'Vorheriger Slide', 'next': 'Nchster Slide', 'first': 'Zum ersten Slide', 'last': 'Zum letzten Slide'}">
    <div class="grid place-content-center h-[150px] bg-surface prose-text-sm">
      Slide 1
    </div>
    <div class="grid place-content-center h-[150px] bg-surface prose-text-sm">
      Slide 2
    </div>
    <div class="grid place-content-center h-[150px] bg-surface prose-text-sm">
      Slide 3
    </div>
  </PCarousel>
</template>
