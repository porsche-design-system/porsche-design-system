<script setup lang="ts">
import { PButton, PHeading, PModal, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isModalOpen = ref(false);
const onOpen = (): void => {
  isModalOpen.value = true;
};
const onDismiss = (): void => {
  isModalOpen.value = false;
};
</script>

<template>
  <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Modal</PButton>
  <PModal :open="isModalOpen" @dismiss="onDismiss" :aria="{ 'aria-label': 'A slightly more detailed label' }">
    <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
    <PText>Some Content</PText>
    <PButton slot="footer" type="button">Accept</PButton>
    <PButton slot="footer" type="button" :variant="'secondary'">Deny</PButton>
  </PModal>
</template>
