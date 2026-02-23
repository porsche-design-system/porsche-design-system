<script setup lang="ts">
import { type CarouselUpdateEventDetail, PCarousel, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const lastEventDetail = ref('none');
const onUpdate = (e: CustomEvent<CarouselUpdateEventDetail>): void => {
  lastEventDetail.value = JSON.stringify(e.detail);
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
<style scoped>
  p-carousel div {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00b0f4;
    height: 150px;
  }
</style>
