<template>
  <div class="wrapper">
    <div class="tile">
      <h4 class="heading">Easing Base</h4>
      <div class="graph-wrapper">
        <p class="y-axis">Progression</p>
        <svg width="300" height="300" viewbox="0 0 300 300">
          <rect x="50" y="50" width="200" height="200" fill="white" />
          <path id="motion-path1" d="M50,250 C90,140 210,140 250,50" class="motion-path motion-path1" />
          <circle class="ball" r="10">
            <animateMotion
              repeatCount="indefinite"
              :dur="motionDurationVeryLong"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="spline"
              keySplines="0.25, 0.1, 0.25, 1"
            >
              <mpath href="#motion-path1" />
            </animateMotion>
          </circle>
        </svg>
        <p class="x-axis">Time</p>
      </div>
    </div>
    <div class="tile">
      <h4 class="heading">Easing In</h4>
      <div class="graph-wrapper">
        <p class="y-axis">Progression</p>
        <svg width="300" height="300" viewbox="0 0 300 300">
          <rect x="50" y="50" width="200" height="200" fill="white" />
          <path id="motion-path2" d="M50,250 C50,250 90,50 250,50" class="motion-path motion-path2" />
          <circle class="ball" r="10">
            <animateMotion
              repeatCount="indefinite"
              :dur="motionDurationVeryLong"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="spline"
              keySplines="0,0,0.2,1"
            >
              <mpath href="#motion-path2" />
            </animateMotion>
          </circle>
        </svg>
        <p class="x-axis">Time</p>
      </div>
    </div>
    <div class="tile">
      <h4 class="heading">Easing Out</h4>
      <div class="graph-wrapper">
        <p class="y-axis">Progression</p>
        <svg width="300" height="300" viewbox="0 0 300 300">
          <rect x="50" y="50" width="200" height="200" fill="white" />
          <path id="motion-path3" d="M50,250 C90,250 210,50 250,50" class="motion-path motion-path3" />
          <circle class="ball" r="10">
            <animateMotion
              repeatCount="indefinite"
              :dur="motionDurationVeryLong"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="spline"
              keySplines="0.4,0,0.5,1"
            >
              <mpath href="#motion-path3" />
            </animateMotion>
          </circle>
        </svg>
        <p class="x-axis">Time</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { motionDurationVeryLong } from '@porsche-design-system/components-react/styles';

  @Component
  export default class ExampleStylesMotionCurves extends Vue {
    motionDurationVeryLong = motionDurationVeryLong;
  }
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

  .graph-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
  }

  .motion-path1 {
    stroke: #d8d8db;
  }

  .motion-path2 {
    stroke: #d8d8db;
  }

  .motion-path1 {
    stroke: #d8d8db;
  }

  // Axis labelling
  .x-axis {
    @include pds-text-x-small;
    color: $pds-theme-light-contrast-medium;
    width: 100%;
    text-align: center;
  }

  .y-axis {
    @include pds-text-x-small;
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
