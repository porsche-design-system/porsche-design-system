<script setup lang="ts">
  import type { AccordionUpdateEvent } from '@porsche-design-system/components-vue';
  import { PAccordion, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const isOpen1 = ref(false);
  const isOpen2 = ref(false);

  const onUpdate1 = (e: AccordionUpdateEvent): void => {
    isOpen1.value = e.open;
  };
  const onUpdate2 = (e: AccordionUpdateEvent): void => {
    isOpen2.value = e.open;
  };

  const content =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
    'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';
</script>

<template>
  <PAccordion :heading="'Some Heading'" :tag="'h3'" :open="isOpen1" @update="onUpdate1">
    <PText>{{ content }}</PText>
  </PAccordion>
  <PAccordion :heading="'Some Heading'" :tag="'h3'" :open="isOpen2" @update="onUpdate2">
    <PText>{{ content }}</PText>
  </PAccordion>
</template>
