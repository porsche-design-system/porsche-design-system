<script setup lang="ts">
  import {
    PFlyoutMultilevel,
    PFlyoutMultilevelItem,
    PorscheDesignSystemProvider,
  } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider prefix="my-prefix">
    <PFlyoutMultilevel open="true">
      <PFlyoutMultilevelItem identifier="item-1" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </PFlyoutMultilevelItem>
      <PFlyoutMultilevelItem identifier="item-2" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </PFlyoutMultilevelItem>
      <PFlyoutMultilevelItem identifier="item-3" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </PFlyoutMultilevelItem>
      <PFlyoutMultilevelItem identifier="item-4" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
      </PFlyoutMultilevelItem>
      <PFlyoutMultilevelItem identifier="item-5" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
      </PFlyoutMultilevelItem>
      <PFlyoutMultilevelItem identifier="item-6" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor" class="scroll-into-view">Some anchor</a>
      </PFlyoutMultilevelItem>
    </PFlyoutMultilevel>
  </PorscheDesignSystemProvider>
</template>
