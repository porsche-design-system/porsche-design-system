<script setup lang="ts">
import {
  type DrilldownUpdateEventDetail,
  PButton,
  PDrilldown,
  PDrilldownItem,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isDrilldownOpen = ref(false);
const drilldownActiveIdentifier = ref();
const onOpen = (): void => {
  isDrilldownOpen.value = true;
};
const onDismiss = (): void => {
  isDrilldownOpen.value = false;
};
const onUpdate = (e: DrilldownUpdateEventDetail): void => {
  drilldownActiveIdentifier.value = e.activeIdentifier;
};
</script>

<template>
  <nav aria-label="Main">
    <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Drilldown</PButton>
    <PDrilldown
      :open="isDrilldownOpen"
      :active-identifier="drilldownActiveIdentifier"
      @dismiss="onDismiss"
      @update="onUpdate"
    >
      <PDrilldownItem identifier="id-1" label="Some Label">
        <PDrilldownItem identifier="id-1-1" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
        </PDrilldownItem>
        <PDrilldownItem identifier="id-1-2" label="Some Label">
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <a href="#">Some anchor</a>
          <PDrilldownItem identifier="id-1-2-1" label="Some Label">
            <a href="#">Some anchor</a>
            <a href="#">Some anchor</a>
          </PDrilldownItem>
          <a href="#">Some anchor</a>
        </PDrilldownItem>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-2" label="Some Label">
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-3" label="Some Label">
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-4" label="Some Label">
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-5" label="Some Label">
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </PDrilldownItem>
    </PDrilldown>
  </nav>
</template>
