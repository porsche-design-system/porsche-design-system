<template>
  <div>
    <div class="wrapper">
      <h3 class="heading">Spacing Fluid (XS - XXL)</h3>
      <div class="spacing-fluid-x-small tile"></div>
      <div class="spacing-fluid-small tile"></div>
      <div class="spacing-fluid-medium tile"></div>
      <div class="spacing-fluid-large tile"></div>
      <div class="spacing-fluid-x-large tile"></div>
      <div class="spacing-fluid-xx-large tile"></div>
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
export default class ExampleStylesSpacing extends Vue {}
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @use '@porsche-design-system/components-js/styles' as *;

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
  }

  // Spacing Fluid
  .spacing-fluid-x-small {
    width: $pds-spacing-fluid-x-small;
    height: $pds-spacing-fluid-x-small;
  }

  .spacing-fluid-small {
    width: $pds-spacing-fluid-small;
    height: $pds-spacing-fluid-small;
  }

  .spacing-fluid-medium {
    width: $pds-spacing-fluid-medium;
    height: $pds-spacing-fluid-medium;
  }

  .spacing-fluid-large {
    width: $pds-spacing-fluid-large;
    height: $pds-spacing-fluid-large;
  }

  .spacing-fluid-x-large {
    width: $pds-spacing-fluid-x-large;
    height: $pds-spacing-fluid-x-large;
  }

  .spacing-fluid-xx-large {
    width: $pds-spacing-fluid-xx-large;
    height: $pds-spacing-fluid-xx-large;
  }

  // Spacing Static
  .spacing-static-x-small {
    width: $pds-spacing-static-x-small;
    height: $pds-spacing-static-x-small;
  }

  .spacing-static-small {
    width: $pds-spacing-static-small;
    height: $pds-spacing-static-small;
  }

  .spacing-static-medium {
    width: $pds-spacing-static-medium;
    height: $pds-spacing-static-medium;
  }

  .spacing-static-large {
    width: $pds-spacing-static-large;
    height: $pds-spacing-static-large;
  }

  .spacing-static-x-large {
    width: $pds-spacing-static-x-large;
    height: $pds-spacing-static-x-large;
  }

  .spacing-static-xx-large {
    width: $pds-spacing-static-xx-large;
    height: $pds-spacing-static-xx-large;
  }
</style>
