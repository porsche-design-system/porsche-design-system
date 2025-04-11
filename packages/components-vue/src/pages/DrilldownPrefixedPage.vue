<script setup lang="ts">
import {
  PDrilldown,
  PDrilldownItem,
  PorscheDesignSystemProvider,
} from '@porsche-design-system/components-vue';
</script>

<template>
  <PorscheDesignSystemProvider prefix="my-prefix">
    <PDrilldown :open="true">
      <PDrilldownItem identifier="item-1" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </PDrilldownItem>
      <PDrilldownItem identifier="item-2" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </PDrilldownItem>
      <PDrilldownItem identifier="item-3" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor">Some anchor</a>
      </PDrilldownItem>
      <PDrilldownItem identifier="item-4" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
      </PDrilldownItem>
      <PDrilldownItem identifier="item-5" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
      </PDrilldownItem>
      <PDrilldownItem identifier="item-6" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
        <a href="#some-anchor" class="scroll-into-view">Some anchor</a>
      </PDrilldownItem>
    </PDrilldown>
  </PorscheDesignSystemProvider>
</template>
