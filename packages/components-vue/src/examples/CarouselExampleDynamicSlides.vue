<script setup lang="ts">
  import { PCarousel } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const amountOfSlides = ref(3);

  const onAddClick = (): number => (amountOfSlides.value = amountOfSlides.value + 1);
  const onRemoveClick = (): number =>
    (amountOfSlides.value = amountOfSlides.value === 0 ? 0 : amountOfSlides.value - 1);
</script>

<template>
  <PCarousel :slidesPerPage="2" :heading="'Some Heading'">
    <div v-for="(_, i) in Array.from(Array(amountOfSlides))" :key="i">Slide {{ i + 1 }}</div>
  </PCarousel>

  <button :type="'button'" @click="onAddClick">Add slide</button>
  <button :type="'button'" @click="onRemoveClick">Remove last slide</button>
</template>
