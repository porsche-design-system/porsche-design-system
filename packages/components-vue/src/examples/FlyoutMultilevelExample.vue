<script setup lang="ts">
import {
  PFlyoutMultilevel,
  PFlyoutMultilevelItem,
  PButton,
  type FlyoutMultilevelUpdateEventDetail,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isFlyoutMultilevelOpen = ref(false);
const flyoutMultilevelActiveIdentifier = ref();
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
  <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Flyout Multilevel</PButton>
  <PFlyoutMultilevel
    :open="isFlyoutMultilevelOpen"
    :active-identifier="flyoutMultilevelActiveIdentifier"
    @dismiss="onDismiss"
    @update="onUpdate"
  >
    <PFlyoutMultilevelItem identifier="item-1" label="Some Label">
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutMultilevelItem>
    <PFlyoutMultilevelItem identifier="item-2" label="Some Label">
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutMultilevelItem>
    <PFlyoutMultilevelItem identifier="item-3" label="Some Label">
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutMultilevelItem>
    <PFlyoutMultilevelItem identifier="item-4" label="Some Label">
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutMultilevelItem>
    <PFlyoutMultilevelItem identifier="item-5" label="Some Label">
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutMultilevelItem>
  </PFlyoutMultilevel>
</template>
