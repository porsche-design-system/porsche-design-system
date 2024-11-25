<template>
  <div>
    <div class="wrapper">
      <h3 class="heading">Display</h3>
      <h4 class="display-large typography">The quick brown fox jumps over the lazy dog</h4>
      <h4 class="display-medium typography">The quick brown fox jumps over the lazy dog</h4>
      <h4 class="display-small typography">The quick brown fox jumps over the lazy dog</h4>
    </div>
    <div class="wrapper">
      <h3 class="heading">Heading</h3>
      <h4 class="heading-xx-large typography">The quick brown fox jumps over the lazy dog</h4>
      <h4 class="heading-x-large typography">The quick brown fox jumps over the lazy dog</h4>
      <h4 class="heading-large typography">The quick brown fox jumps over the lazy dog</h4>
      <h4 class="heading-medium typography">The quick brown fox jumps over the lazy dog</h4>
      <h4 class="heading-small typography">The quick brown fox jumps over the lazy dog</h4>
    </div>
    <div class="wrapper">
      <h3 class="heading">Text</h3>
      <p class="text-x-large typography">The quick brown fox jumps over the lazy dog</p>
      <p class="text-large typography">The quick brown fox jumps over the lazy dog</p>
      <p class="text-medium typography">The quick brown fox jumps over the lazy dog</p>
      <p class="text-small typography">The quick brown fox jumps over the lazy dog</p>
      <p class="text-x-small typography">The quick brown fox jumps over the lazy dog</p>
      <p class="text-xx-small typography">The quick brown fox jumps over the lazy dog</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ExampleStylesTypography extends Vue {}
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @use '@porsche-design-system/components-js/styles' as *;

  // Wrapper
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $pds-grid-gap;
    padding: $pds-spacing-fluid-medium;
  }

  // Typography
  .typography {
    color: $pds-theme-light-primary;
    margin: 0;
  }

  .heading {
    @include pds-heading-medium;
    color: $pds-theme-light-primary;
    margin: 0;
  }

  // Display
  .display-large {
    @include pds-display-large;
  }

  .display-medium {
    @include pds-display-medium;
  }

  .display-small {
    @include pds-display-small;
  }

  // Heading
  .heading-xx-large {
    @include pds-heading-xx-large;
  }

  .heading-x-large {
    @include pds-heading-x-large;
  }

  .heading-large {
    @include pds-heading-large;
  }

  .heading-medium {
    @include pds-heading-medium;
  }

  .heading-small {
    @include pds-heading-small;
  }

  // Text
  .text-x-large {
    @include pds-text-x-large;
  }

  .text-large {
    @include pds-text-large;
  }

  .text-medium {
    @include pds-text-medium;
  }

  .text-small {
    @include pds-text-small;
  }

  .text-x-small {
    @include pds-text-x-small;
  }

  .text-xx-small {
    @include pds-text-xx-small;
  }
</style>
