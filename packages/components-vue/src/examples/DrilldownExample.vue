<script setup lang="ts">
import {
  type DrilldownDismissEventDetail,
  type DrilldownUpdateEventDetail,
  PButton,
  PDrilldown,
  PDrilldownItem,
  PDrilldownLink,
  PText,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isDrilldownOpen = ref(false);
const drilldownActiveIdentifier = ref();
const dismissReason = ref<DrilldownDismissEventDetail['reason'] | undefined>(undefined);
const onOpen = (): void => {
  isDrilldownOpen.value = true;
};
const onDismiss = (e: CustomEvent<DrilldownDismissEventDetail>): void => {
  dismissReason.value = e.detail.reason;
  isDrilldownOpen.value = false;
};
const onUpdate = (e: CustomEvent<DrilldownUpdateEventDetail>): void => {
  drilldownActiveIdentifier.value = e.detail.activeIdentifier;
};
</script>

<template>
  <nav aria-label="Main">
    <PButton type="button" :aria="{ 'aria-haspopup': 'dialog' }" @click="onOpen">Open Drilldown</PButton>
    <PText>Last dismissed via: {{ dismissReason ?? 'not dismissed yet' }}</PText>
    <PDrilldown
      :open="isDrilldownOpen"
      :active-identifier="drilldownActiveIdentifier"
      @dismiss="onDismiss"
      @update="onUpdate"
    >
      <PDrilldownItem identifier="id-1" label="Some Label (1)">
        <PDrilldownItem identifier="id-1-1" label="Some Label (1-1)">
          <PDrilldownLink href="#">Some anchor (1-1)</PDrilldownLink>
          <PDrilldownLink>
            <a href="#">Some anchor (1-1)</a>
          </PDrilldownLink>
        </PDrilldownItem>
        <PDrilldownItem identifier="id-1-2" label="Some Label (1-2)">
          <PDrilldownLink href="#">Some anchor (1-2)</PDrilldownLink>
          <PDrilldownLink href="#">Some anchor (1-2)</PDrilldownLink>
          <PDrilldownLink href="#">Some anchor (1-2)</PDrilldownLink>
          <PDrilldownItem identifier="id-1-2-1" label="Some Label (1-2-1)">
            <PDrilldownLink href="#">Some anchor (1-2-1)</PDrilldownLink>
            <PDrilldownLink href="#">Some anchor (1-2-1)</PDrilldownLink>
          </PDrilldownItem>
          <PDrilldownLink href="#">Some anchor (1-2)</PDrilldownLink>
        </PDrilldownItem>
        <PDrilldownLink href="#">Some anchor (1)</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor (1)</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor (1)</PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-2" label="Some Label (2)">
        <PDrilldownLink href="#">Some anchor (2)</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor (2)</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor (2)</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor (2)</PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-3" label="Some Label (3)">
        <PDrilldownLink href="#">Some anchor (3)</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor (3)</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor (3)</PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-4" label="Some Label (4)">
        <PDrilldownLink href="#">Some anchor (4)</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor (4)</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor (4)</PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-5" label="Some Label (5)">
        <PDrilldownLink href="#">Some anchor (5)</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor (5)</PDrilldownLink>
      </PDrilldownItem>
    </PDrilldown>
  </nav>
</template>
