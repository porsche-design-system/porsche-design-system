<script setup lang="ts">
import type { CarouselUpdateEventDetail } from '@porsche-design-system/components-vue';
import { PCarousel } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const activeSlideIndex = ref(0);

const getSlideClass = (index: number) => {
  return {
    'is-active': index === activeSlideIndex.value,
    'is-prev': index === activeSlideIndex.value - 1,
    'is-next': index === activeSlideIndex.value + 1,
  };
};

const onCarouselUpdate = (event: CustomEvent<CarouselUpdateEventDetail>) => {
  activeSlideIndex.value = event.detail.activeIndex;
};
</script>

<template>
  <PCarousel
    gradientColor="background-surface"
    :slidesPerPage="3"
    :focusOnCenterSlide="true"
    :trimSpace="false"
    :intl="{
      slideLabel: 'Slide %s von %s',
      prev: 'Vorheriger Slide',
      next: 'Nächster Slide',
      first: 'Zum ersten Slide',
      last: 'Zum letzten Slide',
    }"
    :heading="'Some heading'"
    @update="onCarouselUpdate"
    :style="{ '--p-gradient-color-width': '25%' }"
  >
    <div v-for="(_, i) in Array.from(Array(6))" :key="i" :class="getSlideClass(i)">Slide {{ i + 1 }}</div>
  </PCarousel>
</template>
<style scoped>
  p-carousel div {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00b0f4;
    transition: background 0.3s ease;
    height: 150px;
  }

  .is-active {
    background: #fc4040 !important;
  }

  .is-prev,
  .is-next {
    background: #f7cb47 !important;
  }
</style>
