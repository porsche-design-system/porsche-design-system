<script setup lang="ts">
import {
  type DrilldownUpdateEventDetail,
  PButton,
  PButtonTile,
  PDrilldown,
  PDrilldownItem,
  PDrilldownLink,
  PLink,
  PModelSignature,
} from '@porsche-design-system/components-vue';
import { ref } from 'vue';

const isDrilldownOpen = ref(false);
const drilldownActiveIdentifier = ref<DrilldownUpdateEventDetail['activeIdentifier']>('id-1');
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
      <PDrilldownItem identifier="id-1" label="Motorsport">
        <PDrilldownItem identifier="id-1-1" label="718">
          <PModelSignature slot="header" model="718"></PModelSignature>
          <PButtonTile
            slot="button"
            label="Some label"
            description="718"
            weight="semi-bold"
            :compact="true"
            :aspectRatio="{ base: '1/1', s: '9/16' }"
          >
            <img
              srcset="http://localhost:3002/porsche-963@2x.webp 2x"
              src="http://localhost:3002/porsche-963.webp"
              width="636"
              height="847"
              alt="Porsche 963"
            />
          </PButtonTile>
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        </PDrilldownItem>
        <PDrilldownItem identifier="id-1-2" label="911">
          <PModelSignature slot="header" model="911"></PModelSignature>
          <PButtonTile
            slot="button"
            label="Some label"
            description="911"
            weight="semi-bold"
            :compact="true"
            :aspectRatio="{ base: '1/1', s: '9/16' }"
          >
            <img
              srcset="http://localhost:3002/porsche-963@2x.webp 2x"
              src="http://localhost:3002/porsche-963.webp"
              width="636"
              height="847"
              alt="Porsche 963"
            />
          </PButtonTile>
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        </PDrilldownItem>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#" :active="true">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
      </PDrilldownItem>
      <PDrilldownItem identifier="id-2" label="Some Label">
        <PDrilldownItem identifier="id-2-1" label="Some Label">
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        </PDrilldownItem>
        <PDrilldownItem identifier="id-2-2" label="Some Label">
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
          <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        </PDrilldownItem>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
        <PDrilldownLink href="#">Some anchor</PDrilldownLink>
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
      <PLink variant="secondary" href="#" icon="external">Some external anchor</PLink>
    </PDrilldown>
  </nav>
</template>

<style lang="scss" scoped>
  @use '@porsche-design-system/components-vue/scss' as *;

  p-drilldown {
    --p-drilldown-grid-template: repeat(5, auto) minmax(0, 1fr) / auto
  }

  p-drilldown > p-drilldown-item:first-of-type {
    --p-drilldown-grid-template: auto / repeat(2, minmax(0, 1fr));
    --p-drilldown-gap: 0px 16px
  }

  p-button-tile {
    margin-bottom: $pds-spacing-fluid-small;
  }

  p-link {
    align-self: end
  }
</style>
