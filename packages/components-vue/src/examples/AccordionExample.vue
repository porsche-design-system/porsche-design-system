<script setup lang="ts">
import { type AccordionUpdateEventDetail, PAccordion, PHeading, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isOpen1 = ref(false);
const isOpen2 = ref(false);

const onUpdate1 = (e: AccordionUpdateEventDetail): void => {
  isOpen1.value = e.open;
};
const onUpdate2 = (e: AccordionUpdateEventDetail): void => {
  isOpen2.value = e.open;
};

const summary = 'Some summary';
const content =
  'Some details. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et ' +
  'dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';
</script>

<template>
  <PAccordion :open="isOpen1" @update="onUpdate1">
    <PHeading slot="summary" tag="h3" size="small">{{ summary }}</PHeading>
    <PText>{{ content }}</PText>
  </PAccordion>
  <PAccordion :open="isOpen2" @update="onUpdate2">
    <PHeading slot="summary" tag="h3" size="small">{{ summary }}</PHeading>
    <PText>{{ content }}</PText>
  </PAccordion>
</template>
