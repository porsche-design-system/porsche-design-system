<template>
  <div class="wrapper">
    <div class="gradient-to-top tile">Gradient To Top</div>
    <div class="gradient-to-bottom tile">Gradient To Bottom</div>
    <div class="gradient-to-left tile">Gradient To Left</div>
    <div class="gradient-to-right tile">Gradient To Right</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ExampleStylesGradient extends Vue {}
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @use '@porsche-design-system/components-js/styles' as *;

  // Wrapper
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-gap: $pds-grid-gap;
    padding: $pds-spacing-fluid-medium;
    background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%);
  }

  // Tile
  .tile {
    @include pds-text-small;
    color: $pds-theme-dark-primary;
    border-radius: $pds-border-radius-large;
    padding: $pds-spacing-fluid-medium;
  }

  // Gradient
  .gradient-to-top {
    @include pds-gradient-to-top;
  }

  .gradient-to-bottom {
    @include pds-gradient-to-bottom;
  }

  .gradient-to-left {
    @include pds-gradient-to-left;
  }

  .gradient-to-right {
    @include pds-gradient-to-right;
  }
</style>
