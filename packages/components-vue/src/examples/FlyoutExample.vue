<script setup lang="ts">
import { PButton, PFlyout, PHeading, PText } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isFlyoutOpen = ref(false);
const onOpen = (): void => {
  isFlyoutOpen.value = true;
};
const onDismiss = (): void => {
  isFlyoutOpen.value = false;
};
</script>

<template>
  <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Flyout</PButton>
  <PFlyout :open="isFlyoutOpen" :position="'end'" @dismiss="onDismiss">
    <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
    <PText>Some Content</PText>
    <PButton slot="footer" type="button">Proceed</PButton>
    <PButton slot="footer" type="button" variant="secondary">Cancel</PButton>
    <PText slot="sub-footer">Some additional Sub-Footer</PText>
  </PFlyout>
</template>
