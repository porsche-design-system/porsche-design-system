<template>
  <div>
    <div class="wrapper wrapper--light">
      <h3 class="heading">Focus Light (only visible by keyboard navigation)</h3>
      <button class="native-button">Some Button</button>
      <a href="#" class="native-anchor">Some Anchor</a>
      <p class="paragraph">
        Lorem Ipsum
        <a href="#" class="native-anchor">is simply dummy text of the printing</a> and typesetting industry.
      </p>
    </div>
    <div class="wrapper wrapper--dark">
      <h3 class="heading">Focus Dark (only visible by keyboard navigation)</h3>
      <button class="native-button">Some Button</button>
      <a href="#" class="native-anchor">Some Anchor</a>
      <p class="paragraph">
        Lorem Ipsum <a href="#" class="native-anchor">is simply dummy text of the printing</a> and typesetting industry.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ExampleStylesFocus extends Vue {}
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @use '@porsche-design-system/components-js/styles' as *;

  // Wrapper
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: $pds-grid-gap;
    padding: $pds-spacing-fluid-medium;

    &--light {
      background: $pds-theme-light-background-base;
      color: $pds-theme-light-primary;
    }

    &--dark {
      background: $pds-theme-dark-background-base;
      color: $pds-theme-dark-primary;
    }
  }

  // Typography
  .heading {
    @include pds-heading-medium;
    text-align: center;
    width: 100%;
    margin: 0;
  }

  // Paragraph
  .paragraph {
    @include pds-text-small;
    margin: 0;
    max-width: 15rem;
  }

  // Native Button
  .native-button {
    @include pds-text-small;
    @include pds-focus;
  }

  // Native Anchor
  .native-anchor {
    @include pds-text-small;
    @include pds-focus;
    & {
      color: inherit;
    }
  }
</style>
