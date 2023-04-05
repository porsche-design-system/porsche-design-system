<script setup lang="ts">
  import type { AccordionChangeEvent } from '@porsche-design-system/components-vue';
  import { PAccordion, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const isOpen1 = ref(false);
  const isOpen2 = ref(false);

  const onChange1 = (e: AccordionChangeEvent): void => {
    isOpen1.value = e.open;
  };
  const onChange2 = (e: AccordionChangeEvent): void => {
    isOpen2.value = e.open;
  };

  const content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';
</script>

<template>
  <PAccordion :heading="'Some Heading'" :tag="'h3'" :open="isOpen1" @change="onChange1">
    <PText>{{ content }}</PText>
  </PAccordion>
  <PAccordion :heading="'Some Heading'" :tag="'h3'" :open="isOpen2" @change="onChange2">
    <PText>{{ content }}</PText>
  </PAccordion>
</template>
