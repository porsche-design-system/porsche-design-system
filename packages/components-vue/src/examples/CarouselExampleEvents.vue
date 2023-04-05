<script setup lang="ts">
  import type { CarouselChangeEvent } from '@porsche-design-system/components-vue';
  import { PCarousel, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const lastEventDetail = ref('none');
  const onChange = (e: CustomEvent<CarouselChangeEvent>): string => (lastEventDetail.value = JSON.stringify(e));
</script>

<template>
  <PCarousel :heading="'Some Heading'" @change="onChange">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </PCarousel>
  <PText>Last event detail: {{ lastEventDetail }}</PText>
</template>
