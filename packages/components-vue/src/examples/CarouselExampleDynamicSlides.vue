<script setup lang="ts">
import { PButton, PCarousel } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const amountOfSlides = ref(3);

const onAddClick = (): void => {
  amountOfSlides.value = amountOfSlides.value + 1;
};
const onRemoveClick = (): void => {
  amountOfSlides.value = amountOfSlides.value === 0 ? 0 : amountOfSlides.value - 1;
};
</script>

<template>
  <PCarousel :slidesPerPage="2" :heading="'Some Heading'">
    <div v-for="(_, i) in Array.from(Array(amountOfSlides))" :key="i">Slide {{ i + 1 }}</div>
  </PCarousel>

  <PButton type="button" @update="onAddClick">Add slide</PButton>
  <PButton type="button" @update="onRemoveClick">Remove last slide</PButton>
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
