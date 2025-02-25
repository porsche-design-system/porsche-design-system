<template>
  <div class="wrapper">
    <h3 class="heading">Moving</h3>
    <div
      :class="{ 'tile tile--moving': true, 'tile--moving--active': isMovingActive }"
      class="tile tile--moving"
      @click="() => (isMovingActive = !isMovingActive)"
    >
      play
    </div>
    <h3 class="heading">Enter / Exit</h3>
    <div
      :class="{ 'tile tile--enter-exit': true, 'tile--enter-exit--active': isEnterExitActive }"
      @click="() => (isEnterExitActive = !isEnterExitActive)"
    >
      play
    </div>
    <h3 class="heading">Show / Hide</h3>
    <div
      :class="{ 'tile tile--show-hide': true, 'tile--show-hide--active': isShowHideActive }"
      @click="() => (isShowHideActive = !isShowHideActive)"
    >
      play
    </div>
    <h3 class="heading">Expand</h3>
    <div
      :class="{ 'tile tile--expand': true, 'tile--expand--active': isExpandActive }"
      @click="() => (isExpandActive = !isExpandActive)"
    >
      play
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ExampleStylesMotion extends Vue {
  isMovingActive = false;
  isEnterExitActive = false;
  isShowHideActive = false;
  isExpandActive = false;
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

      &--active {
        transform: translateX(200px);
      }
    }

    &--enter-exit {
      transform: translateY(0px);
      transition: opacity $pds-motion-duration-moderate $pds-motion-easing-in,
        transform $pds-motion-duration-moderate $pds-motion-easing-in;

      &--active {
        opacity: 0;
        transform: translateY(40%);
        transition: opacity $pds-motion-duration-short $pds-motion-easing-out,
          transform $pds-motion-duration-short $pds-motion-easing-out;
      }
    }

    &--show-hide {
      transition: opacity $pds-motion-duration-long $pds-motion-easing-base;

      &--active {
        opacity: 0;
      }
    }

    &--expand {
      transition: height $pds-motion-duration-short $pds-motion-easing-in;

      &--active {
        height: 200px;
        transition: height $pds-motion-duration-moderate $pds-motion-easing-base;
      }
    }
  }
</style>
