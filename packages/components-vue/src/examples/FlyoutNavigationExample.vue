<script setup lang="ts">
  import {
    PFlyoutNavigation,
    PFlyoutNavigationItem,
    PButton,
    type FlyoutNavigationUpdateEventDetail,
  } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const isFlyoutNavigationOpen = ref(false);
  const flyoutNavigationActiveIdentifier = ref();
  const onOpen = (): void => {
    isFlyoutNavigationOpen.value = true;
  };
  const onDismiss = (): void => {
    isFlyoutNavigationOpen.value = false;
  };
  const onUpdate = (e: FlyoutNavigationUpdateEventDetail): void => {
    flyoutNavigationActiveIdentifier.value = e.activeIdentifier;
  };
</script>

<template>
  <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Flyout Navigation</PButton>
  <PFlyoutNavigation
    :open="isFlyoutNavigationOpen"
    :active-identifier="flyoutNavigationActiveIdentifier"
    @dismiss="onDismiss"
    @update="onUpdate"
  >
    <PFlyoutNavigationItem identifier="item-1" label="Some Label">
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
    </PFlyoutNavigationItem>
    <PFlyoutNavigationItem identifier="item-2" label="Some Label">
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutNavigationItem>
    <PFlyoutNavigationItem identifier="item-3" label="Some Label">
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutNavigationItem>
    <PFlyoutNavigationItem identifier="item-4" label="Some Label">
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutNavigationItem>
    <PFlyoutNavigationItem identifier="item-5" label="Some Label">
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutNavigationItem>
  </PFlyoutNavigation>
</template>
