<template>
  <div>
    <div class="wrapper wrapper--light">
      <h3 class="heading heading--light">Focus Light (only visible by keyboard navigation)</h3>
      <button class="native-button native-button--light">Some Button</button>
      <a href="#" class="native-anchor native-anchor--light">Some Anchor</a>
    </div>
    <div class="wrapper wrapper--dark">
      <h3 class="heading heading--dark">Focus Dark (only visible by keyboard navigation)</h3>
      <button class="native-button native-button--dark">Some Button</button>
      <a href="#" class="native-anchor native-anchor--dark">Some Anchor</a>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class ExampleDesignTokensFocus extends Vue {}
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @import '~@porsche-design-system/components-js/utilities/scss';

  // Wrapper
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: start;
    gap: $pds-grid-gap;
    padding: $pds-spacing-fluid-medium;

    &--light {
      background: $pds-theme-light-background-base;
    }

    &--dark {
      background: $pds-theme-dark-background-base;
    }
  }

  // Typography
  .heading {
    @include pds-heading-medium;
    text-align: center;
    width: 100%;
    margin: 0;

    &--light {
      color: $pds-theme-light-primary;
    }

    &--dark {
      color: $pds-theme-dark-primary;
    }
  }

  // Native Button
  .native-button {
    @include pds-text-small;

    &--light {
      @include pds-focus;
      color: $pds-theme-light-primary;
    }

    &--dark {
      @include pds-focus;
    }
  }

  // Native Anchor
  .native-anchor {
    @include pds-text-small;

    &--light {
      @include pds-focus;
      color: $pds-theme-light-primary;
    }

    &--dark {
      @include pds-focus;
      color: $pds-theme-dark-primary;
    }
  }
</style>
