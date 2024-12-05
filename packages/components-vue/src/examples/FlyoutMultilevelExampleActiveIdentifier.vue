<script setup lang="ts">
import {
  type FlyoutMultilevelUpdateEventDetail,
  PButton,
  PFlyoutMultilevel,
  PFlyoutMultilevelItem,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isFlyoutMultilevelOpen = ref(false);
const flyoutMultilevelActiveIdentifier = ref<FlyoutMultilevelUpdateEventDetail['activeIdentifier']>('id-2');
const onOpen = (): void => {
  isFlyoutMultilevelOpen.value = true;
};
const onDismiss = (): void => {
  isFlyoutMultilevelOpen.value = false;
};
const onUpdate = (e: FlyoutMultilevelUpdateEventDetail): void => {
  flyoutMultilevelActiveIdentifier.value = e.activeIdentifier;
};
</script>

<template>
  <nav aria-label="Main">
    <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Flyout Multilevel</PButton>
    <PFlyoutMultilevel
      :open="isFlyoutMultilevelOpen"
      :active-identifier="flyoutMultilevelActiveIdentifier"
      @dismiss="onDismiss"
      @update="onUpdate"
    >
      <PFlyoutMultilevelItem identifier="id-1" label="Some Label">
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </PFlyoutMultilevelItem>
      <PFlyoutMultilevelItem identifier="id-2" label="Some Label">
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#" aria-current="page">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </PFlyoutMultilevelItem>
      <PFlyoutMultilevelItem identifier="id-3" label="Some Label">
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </PFlyoutMultilevelItem>
      <PFlyoutMultilevelItem identifier="id-4" label="Some Label">
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </PFlyoutMultilevelItem>
      <PFlyoutMultilevelItem identifier="id-5" label="Some Label">
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </PFlyoutMultilevelItem>
    </PFlyoutMultilevel>
  </nav>
</template>
