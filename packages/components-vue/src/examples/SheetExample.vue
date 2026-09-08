<script setup lang="ts">
import { PButton, PHeading, PSheet, PText, type SheetDismissEventDetail } from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isSheetOpen = ref(false);
const dismissReason = ref<SheetDismissEventDetail['reason'] | undefined>(undefined);
const onOpen = (): void => {
  isSheetOpen.value = true;
};
const onDismiss = (e: CustomEvent<SheetDismissEventDetail>): void => {
  dismissReason.value = e.detail.reason;
  isSheetOpen.value = false;
};
</script>

<template>
  <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Sheet</PButton>
  <PText>Last dismissed via: {{ dismissReason ?? 'not dismissed yet' }}</PText>
  <PSheet :open="isSheetOpen" @dismiss="onDismiss" :aria="{ 'aria-label': 'A slightly more detailed label' }">
    <PHeading slot="header" size="large" tag="h2">Some Heading</PHeading>
    <PText>Some Content</PText>
  </PSheet>
</template>
