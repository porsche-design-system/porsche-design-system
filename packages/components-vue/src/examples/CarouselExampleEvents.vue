<script setup lang="ts">
  import { type CarouselUpdateEventDetail, PCarousel, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const lastEventDetail = ref('none');
  const onUpdate = (e: CarouselUpdateEventDetail): void => {
    lastEventDetail.value = JSON.stringify(e);
  };
</script>

<template>
  <PCarousel :heading="'Some Heading'" @update="onUpdate">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </PCarousel>
  <PText>Last event detail: {{ lastEventDetail }}</PText>
</template>
