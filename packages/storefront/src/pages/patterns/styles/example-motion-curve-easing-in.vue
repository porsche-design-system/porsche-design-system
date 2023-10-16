<template>
  <div class="wrapper">
    <p class="y-axis">Progression</p>
    <svg width="300" height="300" viewbox="0 0 300 300">
      <rect x="50" y="50" width="200" height="200" fill="white" />
      <path id="motion-path2" d="M50,250 C50,250 90,50 250,50" class="motion-path" />
      <circle class="ball" r="10">
        <animateMotion
          repeatCount="indefinite"
          :dur="motionDurationVeryLong"
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="spline"
          :keySplines="motionEasingIn"
        >
          <mpath href="#motion-path2" />
        </animateMotion>
      </circle>
    </svg>
    <p class="x-axis">Time</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { motionDurationVeryLong, motionEasingIn } from '@porsche-design-system/components-react/styles';

  @Component
  export default class ExampleStylesMotionCurveEasingIn extends Vue {
    motionDurationVeryLong = motionDurationVeryLong;
    motionEasingIn = motionEasingIn.replace(/.*\((.*)\)/g, '$1');
  }
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @use '@porsche-design-system/components-js/styles' as *;

  // Wrapper
  .wrapper {
    display: grid;
    gap: $pds-spacing-static-small;
    grid-template-columns: 20px auto;
    grid-template-rows: auto 20px;
    padding: $pds-spacing-fluid-medium $pds-spacing-fluid-medium 0 0;
    background: $pds-theme-light-background-base;
  }

  // Typography
  .heading {
    @include pds-heading-small;
    color: $pds-theme-light-primary;
    text-align: center;
    width: 100%;
    margin: 0;
  }

  // Graph
  svg {
    width: 300px;
    height: auto;
    border-left: 1px solid $pds-theme-light-contrast-medium;
    border-bottom: 1px solid $pds-theme-light-contrast-medium;
  }

  .motion-path {
    fill: none;
    stroke-width: 1;
    stroke: #d8d8db;
  }

  // Axis labelling
  .x-axis {
    @include pds-text-xx-small;
    grid-column-start: 2;
    text-align: center;
    align-self: end;
    color: $pds-theme-light-contrast-medium;
    width: 100%;
    margin-top: 0 !important; // overwrite storefront style
  }

  .y-axis {
    @include pds-text-xx-small;
    writing-mode: vertical-rl;
    transform: scale(-1);
    color: $pds-theme-light-contrast-medium;
    align-self: center;
  }

  // Motion
  .ball {
    fill: black;
    stroke: #333;
    stroke-width: 2;
    width: 20px;
    height: 20px;
  }
</style>
