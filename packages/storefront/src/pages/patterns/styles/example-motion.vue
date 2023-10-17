<template>
  <div class="wrapper">
    <h3 class="heading">Moving</h3>
    <div
      :class="{ 'tile tile--moving': true, active: movingIsActive }"
      class="tile tile--moving"
      @click="() => (movingIsActive = !movingIsActive)"
    >
      play
    </div>
    <h3 class="heading">Enter / Exit</h3>
    <div
      :class="{ 'tile tile--enter-exit': true, active: enterExitIsActive }"
      @click="() => (enterExitIsActive = !enterExitIsActive)"
    >
      play
    </div>
    <h3 class="heading">Show / Hide</h3>
    <div
      :class="{ 'tile tile--show-hide': true, active: showHideIsActive }"
      @click="() => (showHideIsActive = !showHideIsActive)"
    >
      play
    </div>
    <h3 class="heading">Expand</h3>
    <div
      :class="{ 'tile tile--expand': true, active: expandIsActive }"
      @click="() => (expandIsActive = !expandIsActive)"
    >
      play
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, { ref } from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class ExampleStylesMotion extends Vue {
    movingIsActive = ref(false);
    enterExitIsActive = ref(false);
    showHideIsActive = ref(false);
    expandIsActive = ref(false);
  }
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @use '@porsche-design-system/components-js/styles' as *;

  // Wrapper
  .wrapper {
    display: flex;
    gap: $pds-grid-gap;
    padding: $pds-spacing-fluid-medium;
    flex-wrap: wrap;
    justify-content: center;
  }

  // Typography
  .heading {
    @include pds-heading-medium;
    color: $pds-theme-light-primary;
    text-align: center;
    width: 100%;
  }

  // Tile
  .tile {
    @include pds-text-small;
    width: 200px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: $pds-theme-light-primary;
    background: $pds-theme-light-background-surface;
    border-radius: $pds-border-radius-large;
    cursor: pointer;

    &--moving {
      transform: translateX(-200px);
      transition: transform $pds-motion-duration-short $pds-motion-easing-base;
    }

    &--moving.active {
      transform: translateX(200px);
    }

    &--enter-exit {
      transform: translateY(0px);
      transition-property: opacity, transform;
      transition-duration: $pds-motion-duration-moderate;
      transition-timing-function: $pds-motion-easing-in;
    }

    &--enter-exit.active {
      opacity: 0;
      transform: translateY(40%);
      transition-property: opacity, transform;
      transition-duration: $pds-motion-duration-short;
      transition-timing-function: $pds-motion-easing-out;
    }

    &--show-hide {
      transition: opacity $pds-motion-duration-long $pds-motion-easing-base;
    }

    &--show-hide.active {
      opacity: 0;
    }

    &--expand {
      transition: height $pds-motion-duration-short $pds-motion-easing-in;
    }

    &--expand.active {
      height: 200px;
      transition: height $pds-motion-duration-moderate $pds-motion-easing-base;
    }
  }
</style>
