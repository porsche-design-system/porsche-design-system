<script setup lang="ts">
import { PButton, PHeading, PSheet, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isSheetOpen = ref(false);
const onOpen = (): void => {
  isSheetOpen.value = true;
};
const onDismiss = (): void => {
  isSheetOpen.value = false;
};
</script>

<template>
  <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Sheet</PButton>
  <PSheet :open="isSheetOpen" @dismiss="onDismiss" :aria="{ 'aria-label': 'A slightly more detailed label' }">
    <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
    <PText>Some Content</PText>
  </PSheet>
</template>
