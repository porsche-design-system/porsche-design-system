<script setup lang="ts">
import { type CarouselUpdateEventDetail, PButton, PCarousel } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const activeSlideIndex = ref(1);

const onUpdate = (e: CustomEvent<CarouselUpdateEventDetail>): void => {
  activeSlideIndex.value = e.detail.activeIndex;
};
const onButtonClick = (e: MouseEvent): void => {
  activeSlideIndex.value = parseInt((e.target as HTMLButtonElement).innerText) - 1;
};
</script>

<template>
  <PCarousel :heading="'Some Heading'" :activeSlideIndex="activeSlideIndex" @update="onUpdate">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </PCarousel>

  <PButton
    v-for="(_, i) in Array.from(Array(3))"
    :key="i"
    type="button"
    @click="onButtonClick"
    :disabled="activeSlideIndex === i"
  >
    {{ i + 1 }}
  </PButton>
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
