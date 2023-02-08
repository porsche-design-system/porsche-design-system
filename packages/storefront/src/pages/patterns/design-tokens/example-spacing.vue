<template>
  <div>
    <div class="wrapper">
      <h3 class="heading">Spacing Fluid (XS - XL)</h3>
      <div class="spacing-fluid-x-small tile"></div>
      <div class="spacing-fluid-small tile"></div>
      <div class="spacing-fluid-medium tile"></div>
      <div class="spacing-fluid-large tile"></div>
      <div class="spacing-fluid-x-large tile"></div>
    </div>
    <div class="wrapper">
      <h3 class="heading">Spacing Static (XS - XXL)</h3>
      <div class="spacing-static-x-small tile"></div>
      <div class="spacing-static-small tile"></div>
      <div class="spacing-static-medium tile"></div>
      <div class="spacing-static-large tile"></div>
      <div class="spacing-static-x-large tile"></div>
      <div class="spacing-static-xx-large tile"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class ExampleDesignTokensSpacing extends Vue {}
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @import '~@porsche-design-system/components-js/styles/scss';

  // Wrapper
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: $pds-grid-gap;
    padding: $pds-spacing-fluid-medium;
  }

  // Typography
  .heading {
    @include pds-heading-medium;
    color: $pds-theme-light-primary;
    text-align: center;
    width: 100%;
    margin: 0;
  }

  // Tile
  .tile {
    @include pds-text-small;
    background: $pds-theme-light-contrast-low;
    border-radius: $pds-border-radius-small;
    padding: $pds-spacing-fluid-medium;
  }

  // Spacing Fluid
  .spacing-fluid-x-small {
    padding: $pds-spacing-fluid-x-small;
  }

  .spacing-fluid-small {
    padding: $pds-spacing-fluid-small;
  }

  .spacing-fluid-medium {
    padding: $pds-spacing-fluid-medium;
  }

  .spacing-fluid-large {
    padding: $pds-spacing-fluid-large;
  }

  .spacing-fluid-x-large {
    padding: $pds-spacing-fluid-x-large;
  }

  // Spacing Static
  .spacing-static-x-small {
    padding: $pds-spacing-static-x-small;
  }

  .spacing-static-small {
    padding: $pds-spacing-static-small;
  }

  .spacing-static-medium {
    padding: $pds-spacing-static-medium;
  }

  .spacing-static-large {
    padding: $pds-spacing-static-large;
  }

  .spacing-static-x-large {
    padding: $pds-spacing-static-x-large;
  }

  .spacing-static-xx-large {
    padding: $pds-spacing-static-xx-large;
  }
</style>
