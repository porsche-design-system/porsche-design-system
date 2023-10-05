<template>
  <div class="wrapper">
    <h3 class="heading">Expand</h3>
    <div class="tile" @click="onClick"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class ExampleStylesMotionExpand extends Vue {
    onClick = (e: MouseEvent): void => {
      e.target.classList.toggle('active');
    };
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
    margin: 0;
  }

  // Tile
  .tile {
    color: $pds-theme-light-primary;
    background: $pds-theme-light-background-surface;
    padding: $pds-spacing-fluid-medium;
    border-radius: $pds-border-radius-large;
    cursor: pointer;
    width: 200px;
    height: 40px;
    transition: height;
    transition-duration: $pds-motion-duration-short;
    transition-timing-function: $pds-motion-easing-in;
  }

  .active {
    height: 160px;
    transition: height;
    transition-duration: $pds-motion-duration-moderate;
    transition-timing-function: $pds-motion-easing-base;
  }
</style>
