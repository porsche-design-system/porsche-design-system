<script setup lang="ts">
  import { PFlyoutNavigation, PFlyoutNavigationItem, PButton } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const isFlyoutNavigationOpen = ref(false);
  const onOpen = (): void => {
    isFlyoutNavigationOpen.value = true;
  };
  const onDismiss = (): void => {
    isFlyoutNavigationOpen.value = false;
  };
</script>

<template>
  <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Flyout Navigation</PButton>
  <PFlyoutNavigation :open="isFlyoutNavigationOpen" @dismiss="onDismiss">
    <PFlyoutNavigationItem identifier="item-1" label="Some Label">
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutNavigationItem>
    <PFlyoutNavigationItem identifier="item-2" label="Some Label">
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutNavigationItem>
    <PFlyoutNavigationItem identifier="item-3" label="Some Label">
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutNavigationItem>
    <PFlyoutNavigationItem identifier="item-4" label="Some Label">
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutNavigationItem>
    <PFlyoutNavigationItem identifier="item-5" label="Some Label">
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutNavigationItem>
    <PFlyoutNavigationItem identifier="item-6" label="Some Label">
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
    </PFlyoutNavigationItem>
  </PFlyoutNavigation>
</template>
