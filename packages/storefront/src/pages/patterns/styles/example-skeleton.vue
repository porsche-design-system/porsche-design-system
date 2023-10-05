<template>
  <div>
    <div class="wrapper">
      <h3 class="heading">Skeletons Square</h3>
      <div class="skeleton-square skeleton-square--small"></div>
      <div class="skeleton-square skeleton-square--medium"></div>
    </div>

    <div class="wrapper">
      <h3 class="heading">Skeletons Heading/Text</h3>
      <div class="skeleton-text skeleton-text--small"></div>
      <div class="skeleton-text skeleton-text--medium"></div>
      <div class="skeleton-text skeleton-text--large"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class ExampleStylesSkeleton extends Vue {}
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

  // Skeletons
  .skeleton-square {
    height: 100px;
    width: 100px;

    &--small {
      @include pds-skeleton('small');
    }
    &--medium {
      @include pds-skeleton('medium');
    }
  }

  .skeleton-text {
    @include pds-skeleton('small');
    height: $pds-font-line-height;
    width: 100px;

    &--small {
      font-size: $pds-font-size-text-small;
    }
    &--medium {
      font-size: $pds-font-size-text-medium;
    }
    &--large {
      font-size: $pds-font-size-text-large;
    }
  }
</style>
