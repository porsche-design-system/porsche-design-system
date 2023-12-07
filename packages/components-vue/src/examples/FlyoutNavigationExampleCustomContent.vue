<script setup lang="ts">
  import {
    PFlyoutNavigation,
    PFlyoutNavigationItem,
    PLinkTile,
    PLinkPure,
    PButton,
    type FlyoutNavigationUpdateEvent,
  } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const isFlyoutNavigationOpen = ref(false);
  const flyoutNavigationActiveIdentifier = ref('item-1');
  const onOpen = (): void => {
    isFlyoutNavigationOpen.value = true;
  };
  const onDismiss = (): void => {
    isFlyoutNavigationOpen.value = false;
  };
  const onUpdate = (e: FlyoutNavigationUpdateEvent): void => {
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
      <PLinkTile
        href="#"
        label="Some label"
        description="Some Description"
        weight="semi-bold"
        compact="true"
        aspectRatio="1:1"
      >
        <img
          srcset="https://porsche-design-system.github.io/porsche-design-system/porsche-963@2x.webp 2x"
          src="https://porsche-design-system.github.io/porsche-design-system/porsche-963.webp"
          width="636"
          height="847"
          alt="Porsche 963"
        />
      </PLinkTile>
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor" aria-current="page">Some anchor</a>
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
    <PLinkPure size="medium" href="#" icon="external">Some external anchor</PLinkPure>
  </PFlyoutNavigation>
</template>

<style lang="scss" scoped>
  @use '@porsche-design-system/components-vue/styles' as *;
  p-link-pure {
    margin: 0 calc($pds-spacing-fluid-small * -1);
    padding: $pds-spacing-fluid-small;
  }
</style>
