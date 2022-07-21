<template>
  <div>
    <div class="main-nav"></div>
    <div class="main-content">
      <div class="teaser"></div>
      <div class="home-stage">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="headline"></div>
      <div class="car-range">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="content-info">
        <div></div>
        <div></div>
      </div>
      <div class="content-info">
        <div></div>
        <div></div>
      </div>
      <div class="headline"></div>
      <div class="story">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="headline"></div>
      <div class="home-stage">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="main-footer"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class ExampleGrid extends Vue {}
</script>

<style lang="scss" scoped>
  @import '~@porsche-design-system/components-js/utilities/scss';

  .main-content {
    @include pds-grid;
  }

  // custom styles by consumer
  .main-nav {
    height: 8rem;
    background: $pds-theme-light-contrast-low;
  }

  .main-content {
    & > div {
      background: rgba(0, 0, 255, 0.25);
    }
  }

  .main-footer {
    margin-top: $pds-spacing-xx-large;
    height: 40rem;
    background: $pds-theme-light-contrast-low;
  }

  .teaser {
    height: calc(100vh - 8rem);
    grid-column: grid-start / grid-end;
    margin-bottom: $pds-spacing-x-large;
  }

  .home-stage {
    margin-top: $pds-spacing-large;
    display: grid;
    grid-template-columns: 1fr;
    grid-column: content-start / content-end;
    grid-gap: $pds-grid-gutter;

    @include pds-media-query-min('s') {
      grid-template-columns: 1fr 1fr 1fr;
    }

    & > * {
      border: 1rem solid deeppink;
      height: 20rem;
    }
  }

  .headline {
    height: 6rem;
    margin-top: $pds-spacing-xx-large;
    grid-column: content-start / content-end;
  }

  .car-range {
    margin-top: $pds-spacing-large;
    display: grid;
    grid-template-columns: 1fr;
    grid-column: grid-start / grid-end;
    grid-gap: $pds-grid-gutter;

    @include pds-media-query-min('m') {
      grid-template-columns: 1fr 1fr;
    }

    & > * {
      border: 1rem solid deeppink;
      height: 20rem;
    }
  }

  .content-info {
    margin-top: $pds-spacing-xx-large;
    display: grid;
    grid-template-columns: 1fr;
    grid-column: grid-start / grid-end;

    @include pds-media-query-min('m') {
      grid-template-columns: repeat(14, 1fr);
    }

    & > * {
      @include pds-media-query-min('m') {
        grid-row-start: 1;
        height: 40rem;
      }
    }

    & > :nth-of-type(1) {
      border: 1rem solid deeppink;
      @include pds-media-query-min-max('xxs', 'm') {
        height: 20rem;
      }
    }

    & > :nth-of-type(2) {
      background: deeppink;
      @include pds-media-query-min-max('xxs', 'm') {
        height: 40rem;
      }
    }

    @include pds-media-query-min('m') {
      &:nth-of-type(odd) > :first-child {
        grid-column: 1 / 10;
        border-right: 0;
      }
      &:nth-of-type(odd) > :last-child {
        grid-column: 10 / 15;
      }
      &:nth-of-type(even) > :first-child {
        grid-column: 6 / 15;
        border-left: 0;
      }
      &:nth-of-type(even) > :last-child {
        grid-column: 1 / 6;
      }
    }
  }

  .story {
    margin-top: $pds-spacing-large;
    display: grid;
    grid-template-rows: auto auto auto;
    grid-gap: 0.75rem;
    grid-column: grid-start / grid-end;
    height: 40rem;

    & > * {
      border: 1rem solid deeppink;
    }

    @include pds-media-query-min-max('xxs', 's') {
      grid-template-columns: 1fr 1fr;
      & > :nth-of-type(1) {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
      }
      & > :nth-of-type(2) {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
      }
      & > :nth-of-type(3) {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
      }
      & > :nth-of-type(3) ~ * {
        display: none;
      }
    }

    @include pds-media-query-min-max('s', 'm') {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      & > :nth-of-type(1) {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
      }
      & > :nth-of-type(2) {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
      }
      & > :nth-of-type(3) {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
      }
      & > :nth-of-type(4) {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
      }
      & > :nth-of-type(5) {
        grid-column: 4 / 5;
        grid-row: 1 / 2;
      }
      & > :nth-of-type(6) {
        grid-column: 3 / 5;
        grid-row: 2 / 4;
      }
      & > :nth-of-type(6) ~ * {
        display: none;
      }
    }

    @include pds-media-query-min('m') {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      & > :nth-of-type(1) {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
      }
      & > :nth-of-type(2) {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
      }
      & > :nth-of-type(3) {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
      }
      & > :nth-of-type(4) {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
      }
      & > :nth-of-type(5) {
        grid-column: 4 / 5;
        grid-row: 1 / 2;
      }
      & > :nth-of-type(6) {
        grid-column: 3 / 5;
        grid-row: 2 / 4;
      }
      & > :nth-of-type(7) {
        grid-column: 5 / 7;
        grid-row: 1 / 3;
      }
      & > :nth-of-type(8) {
        grid-column: 5 / 6;
        grid-row: 3 / 4;
      }
      & > :nth-of-type(9) {
        grid-column: 6 / 7;
        grid-row: 3 / 4;
      }
    }
  }
</style>
