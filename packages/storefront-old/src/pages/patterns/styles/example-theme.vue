<template>
  <div>
    <div class="wrapper wrapper--light">
      <h3 class="heading heading--light">Theme Light</h3>
      <div class="theme-light-primary tile"></div>
      <div class="theme-light-background-base tile"></div>
      <div class="theme-light-background-surface tile"></div>
      <div class="theme-light-background-shading tile"></div>
      <div class="theme-light-background-frosted tile"></div>
      <div class="theme-light-contrast-low tile"></div>
      <div class="theme-light-contrast-medium tile"></div>
      <div class="theme-light-contrast-high tile"></div>
      <div class="theme-light-notification-success tile"></div>
      <div class="theme-light-notification-success-soft tile"></div>
      <div class="theme-light-notification-warning tile"></div>
      <div class="theme-light-notification-warning-soft tile"></div>
      <div class="theme-light-notification-error tile"></div>
      <div class="theme-light-notification-error-soft tile"></div>
      <div class="theme-light-notification-info tile"></div>
      <div class="theme-light-notification-info-soft tile"></div>
      <div class="theme-light-state-hover tile"></div>
      <div class="theme-light-state-active tile"></div>
      <div class="theme-light-state-focus tile"></div>
      <div class="theme-light-state-disabled tile"></div>
    </div>
    <div class="wrapper wrapper--dark">
      <h3 class="heading heading--dark">Theme Dark</h3>
      <div class="theme-dark-primary tile"></div>
      <div class="theme-dark-background-base tile"></div>
      <div class="theme-dark-background-surface tile"></div>
      <div class="theme-dark-background-shading tile"></div>
      <div class="theme-dark-background-frosted tile"></div>
      <div class="theme-dark-contrast-low tile"></div>
      <div class="theme-dark-contrast-medium tile"></div>
      <div class="theme-dark-contrast-high tile"></div>
      <div class="theme-dark-notification-success tile"></div>
      <div class="theme-dark-notification-success-soft tile"></div>
      <div class="theme-dark-notification-warning tile"></div>
      <div class="theme-dark-notification-warning-soft tile"></div>
      <div class="theme-dark-notification-error tile"></div>
      <div class="theme-dark-notification-error-soft tile"></div>
      <div class="theme-dark-notification-info tile"></div>
      <div class="theme-dark-notification-info-soft tile"></div>
      <div class="theme-dark-state-hover tile"></div>
      <div class="theme-dark-state-active tile"></div>
      <div class="theme-dark-state-focus tile"></div>
      <div class="theme-dark-state-disabled tile"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ExampleStylesTheme extends Vue {}
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

  // Tile
  .tile {
    border-radius: $pds-border-radius-small;
    padding: $pds-spacing-fluid-medium;
    border: 1px solid grey;
  }

  // Theme Light
  .theme-light-primary {
    background: $pds-theme-light-primary;
  }
  .theme-light-background-base {
    background: $pds-theme-light-background-base;
  }
  .theme-light-background-surface {
    background: $pds-theme-light-background-surface;
  }
  .theme-light-background-shading {
    background: $pds-theme-light-background-shading;
  }
  .theme-light-background-frosted {
    background: $pds-theme-light-background-frosted;
  }
  .theme-light-contrast-low {
    background: $pds-theme-light-contrast-low;
  }
  .theme-light-contrast-medium {
    background: $pds-theme-light-contrast-medium;
  }
  .theme-light-contrast-high {
    background: $pds-theme-light-contrast-high;
  }
  .theme-light-notification-success {
    background: $pds-theme-light-notification-success;
  }
  .theme-light-notification-success-soft {
    background: $pds-theme-light-notification-success-soft;
  }
  .theme-light-notification-warning {
    background: $pds-theme-light-notification-warning;
  }
  .theme-light-notification-warning-soft {
    background: $pds-theme-light-notification-warning-soft;
  }
  .theme-light-notification-error {
    background: $pds-theme-light-notification-error;
  }
  .theme-light-notification-error-soft {
    background: $pds-theme-light-notification-error-soft;
  }
  .theme-light-notification-info {
    background: $pds-theme-light-notification-info;
  }
  .theme-light-notification-info-soft {
    background: $pds-theme-light-notification-info-soft;
  }
  .theme-light-state-hover {
    background: $pds-theme-light-state-hover;
  }
  .theme-light-state-active {
    background: $pds-theme-light-state-active;
  }
  .theme-light-state-focus {
    background: $pds-theme-light-state-focus;
  }
  .theme-light-state-disabled {
    background: $pds-theme-light-state-disabled;
  }

  // Theme Dark
  .theme-dark-primary {
    background: $pds-theme-dark-primary;
  }
  .theme-dark-background-base {
    background: $pds-theme-dark-background-base;
  }
  .theme-dark-background-surface {
    background: $pds-theme-dark-background-surface;
  }
  .theme-dark-background-shading {
    background: $pds-theme-dark-background-shading;
  }
  .theme-dark-background-frosted {
    background: $pds-theme-dark-background-frosted;
  }
  .theme-dark-contrast-low {
    background: $pds-theme-dark-contrast-low;
  }
  .theme-dark-contrast-medium {
    background: $pds-theme-dark-contrast-medium;
  }
  .theme-dark-contrast-high {
    background: $pds-theme-dark-contrast-high;
  }
  .theme-dark-notification-success {
    background: $pds-theme-dark-notification-success;
  }
  .theme-dark-notification-success-soft {
    background: $pds-theme-dark-notification-success-soft;
  }
  .theme-dark-notification-warning {
    background: $pds-theme-dark-notification-warning;
  }
  .theme-dark-notification-warning-soft {
    background: $pds-theme-dark-notification-warning-soft;
  }
  .theme-dark-notification-error {
    background: $pds-theme-dark-notification-error;
  }
  .theme-dark-notification-error-soft {
    background: $pds-theme-dark-notification-error-soft;
  }
  .theme-dark-notification-info {
    background: $pds-theme-dark-notification-info;
  }
  .theme-dark-notification-info-soft {
    background: $pds-theme-dark-notification-info-soft;
  }
  .theme-dark-state-hover {
    background: $pds-theme-dark-state-hover;
  }
  .theme-dark-state-active {
    background: $pds-theme-dark-state-active;
  }
  .theme-dark-state-focus {
    background: $pds-theme-dark-state-focus;
  }
  .theme-dark-state-disabled {
    background: $pds-theme-dark-state-disabled;
  }
</style>
