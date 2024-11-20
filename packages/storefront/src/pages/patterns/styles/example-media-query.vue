<template>
  <div>
    <div class="wrapper">
      <h3 class="heading">Media Query (change viewport to see effect)</h3>
      <p class="media-query-min text">Media Query Min:</p>
      <p class="media-query-max text">Media Query Max:</p>
      <p class="media-query-min-max text">Media Query Min Max:</p>
    </div>
    <div class="wrapper">
      <h3 class="heading">Breakpoint</h3>
      <p class="breakpoint-base text">Breakpoint Base:</p>
      <p class="breakpoint-xs text">Breakpoint XS:</p>
      <p class="breakpoint-s text">Breakpoint S:</p>
      <p class="breakpoint-m text">Breakpoint M:</p>
      <p class="breakpoint-l text">Breakpoint L:</p>
      <p class="breakpoint-xl text">Breakpoint XL:</p>
      <p class="breakpoint-xxl text">Breakpoint XXL:</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ExampleStylesMediaQuery extends Vue {}
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @use '@porsche-design-system/components-js/styles' as *;

  // Wrapper
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: $pds-grid-gap;
    padding: $pds-spacing-fluid-medium;
  }

  // Typography
  .heading {
    @include pds-heading-medium;
    color: $pds-theme-light-primary;
    margin: 0;
  }

  .text {
    @include pds-text-small;
    color: $pds-theme-light-primary;
    margin: 0;
  }

  // MediaQueryMin
  .media-query-min {
    @include pds-media-query-min('base') {
      &::after {
        content: ' Base';
      }
    }
    @include pds-media-query-min('xs') {
      &::after {
        content: ' XS';
      }
    }
    @include pds-media-query-min('s') {
      &::after {
        content: ' S';
      }
    }
    @include pds-media-query-min('m') {
      &::after {
        content: ' M';
      }
    }
    @include pds-media-query-min('l') {
      &::after {
        content: ' L';
      }
    }
    @include pds-media-query-min('xl') {
      &::after {
        content: ' XL';
      }
    }
    @include pds-media-query-min('xxl') {
      &::after {
        content: ' XXL';
      }
    }
  }

  .media-query-max {
    @include pds-media-query-max('xxl') {
      &::after {
        content: ' XXL';
      }
    }
    @include pds-media-query-max('xl') {
      &::after {
        content: ' XL';
      }
    }
    @include pds-media-query-max('l') {
      &::after {
        content: ' L';
      }
    }
    @include pds-media-query-max('m') {
      &::after {
        content: ' M';
      }
    }
    @include pds-media-query-max('s') {
      &::after {
        content: ' S';
      }
    }
    @include pds-media-query-max('xs') {
      &::after {
        content: ' XS';
      }
    }
  }

  .media-query-min-max {
    @include pds-media-query-min-max('base', 'xs') {
      &::after {
        content: ' Base - XS';
      }
    }
    @include pds-media-query-min-max('xs', 's') {
      &::after {
        content: ' XS - S';
      }
    }
    @include pds-media-query-min-max('s', 'm') {
      &::after {
        content: ' S - M';
      }
    }
    @include pds-media-query-min-max('m', 'l') {
      &::after {
        content: ' M - L';
      }
    }
    @include pds-media-query-min-max('l', 'xl') {
      &::after {
        content: ' L - XL';
      }
    }
    @include pds-media-query-min-max('xl', 'xxl') {
      &::after {
        content: ' XL - XXL';
      }
    }
  }

  // Breakpoint
  .breakpoint-base {
    &::after {
      content: ' #{$pds-breakpoint-base}px';
    }
  }
  .breakpoint-xs {
    &::after {
      content: ' #{$pds-breakpoint-xs}px';
    }
  }
  .breakpoint-s {
    &::after {
      content: ' #{$pds-breakpoint-s}px';
    }
  }
  .breakpoint-m {
    &::after {
      content: ' #{$pds-breakpoint-m}px';
    }
  }
  .breakpoint-l {
    &::after {
      content: ' #{$pds-breakpoint-l}px';
    }
  }
  .breakpoint-xl {
    &::after {
      content: ' #{$pds-breakpoint-xl}px';
    }
  }
  .breakpoint-xxl {
    &::after {
      content: ' #{$pds-breakpoint-xxl}px';
    }
  }
</style>
