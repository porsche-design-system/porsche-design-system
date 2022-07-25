<template>
  <div
    :class="{
      'main-bar': true,
      'main-bar--7vw-linear': grid === '7vw-linear',
      'main-bar--improved-linear': grid === 'improved-linear',
      'main-bar--fluid-interpolation': grid === 'fluid-interpolation',
    }"
  >
    <p-text theme="dark">
      Aktuell siehst du die Inhalte für deinen Standort: Deutschland
      <button>Standort/Sprache ändern</button>
    </p-text>
    <p-button-pure hide-label="true" icon="close" theme="dark"
      >Close location or language switch notification.</p-button-pure
    >
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class PorscheMainBar extends Vue {
    @Prop({ default: '7vw-linear' }) public grid!: '7vw-linear' | 'improved-linear' | 'fluid-interpolation';
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';

  .main-bar {
    padding: $pds-spacing-medium $pds-grid-safe-zone;
    background: $pds-theme-dark-background-surface;
    display: flex;
    justify-content: space-between;
    gap: $pds-spacing-medium;
    margin: 0 auto;
    max-width: $pds-grid-max-width;

    &--7vw-linear {
      padding: $pds-spacing-medium $pds-grid-safe-zone;
    }

    &--improved-linear {
      padding: $pds-spacing-medium $pds-grid-safe-zone-improved-linear;
    }

    &--fluid-interpolation {
      padding: $pds-spacing-medium $pds-grid-safe-zone-fluid-interpolation-base;

      @include pds-media-query-min('xl') {
        padding: $pds-spacing-medium $pds-grid-safe-zone-fluid-interpolation-xl;
      }
    }
  }
</style>
