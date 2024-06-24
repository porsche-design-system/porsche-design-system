<script setup lang="ts">
  import {
    PFlyoutMultilevel,
    PFlyoutMultilevelItem,
    PLinkTile,
    PLinkPure,
    PButton,
    type FlyoutMultilevelUpdateEventDetail,
  } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const isFlyoutMultilevelOpen = ref(false);
  const flyoutMultilevelActiveIdentifier = ref('item-1');
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
      <PLinkTile
        href="#"
        label="Some label"
        description="Some Description"
        weight="semi-bold"
        compact="true"
        :aspectRatio="{ base: '4:3', xs: '16:9', s: '1:1' }"
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
    <PLinkPure size="medium" href="#" icon="external">Some external anchor</PLinkPure>
  </PFlyoutMultilevel>
</template>

<style lang="scss" scoped>
  @use '@porsche-design-system/components-vue/styles' as *;

  p-link-pure {
    margin: 0 calc(#{$pds-spacing-fluid-small} * -1);
    padding: $pds-spacing-fluid-small;
  }
</style>
