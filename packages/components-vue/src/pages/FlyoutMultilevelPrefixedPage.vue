<script setup lang="ts">
  import {
    PFlyoutNavigation,
    PFlyoutNavigationItem,
    PorscheDesignSystemProvider,
  } from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider prefix="my-prefix">
    <PFlyoutNavigation open="true">
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
        <a href="#some-anchor" class="scroll-into-view">Some anchor</a>
      </PFlyoutNavigationItem>
    </PFlyoutNavigation>
  </PorscheDesignSystemProvider>
</template>
