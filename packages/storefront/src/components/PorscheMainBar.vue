<template>
  <div class="main-bar">
    <div class="main-bar__notification">
      <p-text theme="dark">
        Aktuell siehst du die Inhalte für deinen Standort: Deutschland
        <button>Standort/Sprache ändern</button>
      </p-text>
      <p-button-pure hide-label="true" icon="close" theme="dark"
        >Close location or language switch notification.</p-button-pure
      >
    </div>
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
    @include pds-grid;
    background: $pds-theme-dark-background-surface;
    padding-top: $pds-spacing-medium;
    padding-bottom: $pds-spacing-medium;

    &__notification {
      grid-column: content-start / content-end;
      display: flex;
      justify-content: space-between;
      gap: $pds-spacing-medium;
    }
  }
</style>
