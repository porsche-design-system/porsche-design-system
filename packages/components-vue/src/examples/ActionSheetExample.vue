<script setup lang="ts">
import { PActionSheet, PButton, PHeading, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isActionSheetOpen = ref(false);
const onOpen = (): void => {
  isActionSheetOpen.value = true;
};
const onDismiss = (): void => {
  isActionSheetOpen.value = false;
};
</script>

<template>
  <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Action Sheet</PButton>
  <PActionSheet :open="isActionSheetOpen" @dismiss="onDismiss" :aria="{ 'aria-label': 'A slightly more detailed label' }">
    <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
    <PText>Some Content</PText>
  </PActionSheet>
</template>
