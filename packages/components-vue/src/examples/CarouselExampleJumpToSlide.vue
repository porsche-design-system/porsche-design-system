<script setup lang="ts">
  import type { CarouselChangeEvent } from '@porsche-design-system/components-vue';
  import { PCarousel } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const activeSlideIndex = ref(1);

  const onChange = (e: CustomEvent<CarouselChangeEvent>): void => (activeSlideIndex.value = e.activeIndex);
  const onButtonClick = (e: MouseEvent) => {
    activeSlideIndex.value = parseInt((e.target as HTMLButtonElement).innerText) - 1;
  };
</script>

<template>
  <PCarousel :heading="'Some Heading'" :activeSlideIndex="activeSlideIndex" @change="onChange">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </PCarousel>

  <button
    v-for="(_, i) in Array.from(Array(3))"
    :key="i"
    :type="'button'"
    @click="onButtonClick"
    :disabled="activeSlideIndex === i"
  >
    {{ i + 1 }}
  </button>
</template>
