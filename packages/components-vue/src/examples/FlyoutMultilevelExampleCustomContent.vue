<script setup lang="ts">
import {
  type FlyoutMultilevelUpdateEventDetail,
  PButton,
  PFlyoutMultilevel,
  PFlyoutMultilevelItem,
  PLinkPure,
  PLinkTile,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isFlyoutMultilevelOpen = ref(false);
const flyoutMultilevelActiveIdentifier = ref<FlyoutMultilevelUpdateEventDetail['activeIdentifier']>('id-1');
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
        <PLinkTile
          href="#"
          label="Some label"
          description="Some Description"
          weight="semi-bold"
          :compact="true"
          :aspectRatio="{ base: '4:3', xs: '16:9', s: '1:1' }"
        >
          <img
            srcset="http://localhost:3002/porsche-963@2x.webp 2x"
            src="http://localhost:3002/porsche-963.webp"
            width="636"
            height="847"
            alt="Porsche 963"
          />
        </PLinkTile>
        <a href="#">Some anchor</a>
        <a href="#" aria-current="page">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </PFlyoutMultilevelItem>
      <PFlyoutMultilevelItem identifier="id-2" label="Some Label">
        <PFlyoutMultilevelItem identifier="id-2-1" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </PFlyoutMultilevelItem>
        <PFlyoutMultilevelItem identifier="id-2-2" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </PFlyoutMultilevelItem>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
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
      <PLinkPure size="medium" href="#" icon="external">Some external anchor</PLinkPure>
    </PFlyoutMultilevel>
  </nav>
</template>

<style lang="scss" scoped>
  @use '@porsche-design-system/components-vue/styles' as *;

  p-link-tile {
    margin-bottom: $pds-spacing-fluid-small;
  }

  p-link-pure {
    margin: 0 calc(#{$pds-spacing-fluid-small} * -1);
    padding: $pds-spacing-fluid-small;
  }
</style>
