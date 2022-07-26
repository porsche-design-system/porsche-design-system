<template>
  <div class="main-bar">
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

  @Component
  export default class PorscheMainBar extends Vue {}
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';

  .main-bar {
    background: $pds-theme-dark-background-surface;
    display: flex;
    justify-content: space-between;
    gap: $pds-spacing-medium;
    margin: 0 auto;
    max-width: $pds-grid-max-width;
    padding: $pds-spacing-medium $pds-grid-safe-zone-base;

    @include pds-media-query-min('xl') {
      padding: $pds-spacing-medium $pds-grid-safe-zone-xl;
    }
  }
</style>
