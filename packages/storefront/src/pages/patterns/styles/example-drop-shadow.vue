<template>
  <div class="wrapper">
    <h3 class="heading">Drop Shadow</h3>
    <div class="drop-shadow-low tile">Low</div>
    <div class="drop-shadow-medium tile">Medium</div>
    <div class="drop-shadow-high tile">High</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ExampleStylesDropShadow extends Vue {}
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @use '@porsche-design-system/components-js/styles' as *;

  // Wrapper
  .wrapper {
    display: flex;
    flex-wrap: wrap;
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
    color: $pds-theme-light-primary;
    background: $pds-theme-light-background-surface;
    padding: $pds-spacing-fluid-medium;
    border-radius: $pds-border-radius-large;
  }

  // Drop Shadow
  .drop-shadow-low {
    @include pds-drop-shadow-low;
  }

  .drop-shadow-medium {
    @include pds-drop-shadow-medium;
  }

  .drop-shadow-high {
    @include pds-drop-shadow-high;
  }
</style>
