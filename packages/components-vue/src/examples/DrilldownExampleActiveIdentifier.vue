<script setup lang="ts">
import {
  type DrilldownUpdateEventDetail,
  PButton,
  PDrilldown,
  PDrilldownItem,
  PDrilldownLink,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isDrilldownOpen = ref(false);
const drilldownActiveIdentifier = ref<DrilldownUpdateEventDetail['activeIdentifier']>('id-2');
const onOpen = (): void => {
  isDrilldownOpen.value = true;
};
const onDismiss = (): void => {
  isDrilldownOpen.value = false;
};
const onUpdate = (e: CustomEvent<DrilldownUpdateEventDetail>): void => {
  drilldownActiveIdentifier.value = e.detail.activeIdentifier;
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
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-2" label="Some Label">
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#" :active="true">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-3" label="Some Label">
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-4" label="Some Label">
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-5" label="Some Label">
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
      </PDrilldownItem>
    </PDrilldown>
  </nav>
</template>
