<template>
  <div>
    <div class="main-nav"></div>
    <div class="p-grid">
      <div class="teaser"></div>
      <div class="home-stage"></div>
      <div class="home-stage"></div>
      <div class="home-stage"></div>
      <div class="headline"></div>
      <div class="car-range"></div>
      <div class="car-range"></div>
      <div class="car-range"></div>
      <div class="car-range"></div>
      <div class="car-range"></div>
      <div class="car-range"></div>
      <div class="content-info"></div>
      <div class="content-info"></div>
      <div class="headline"></div>
      <div class="story"></div>
      <div class="headline"></div>
      <div class="home-stage"></div>
      <div class="home-stage"></div>
      <div class="home-stage"></div>
    </div>
    <div class="main-footer"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class GridPorscheCom extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@porsche-design-system/utilities/scss";

.p-grid {
  --p-grid-columns: 1;
  --p-grid-gutter: 1rem;
  --p-grid-safe-zone: 7vw;
  display: grid !important;
  grid-column-gap: var(--p-grid-gutter) !important;
  grid-template-columns:
    [main-start]
      calc(var(--p-grid-safe-zone) - var(--p-grid-gutter))
      [content-start]
        repeat(var(--p-grid-columns), minmax(0, 1fr))
      [content-end]
      calc(var(--p-grid-safe-zone) - var(--p-grid-gutter))
    [main-end] !important;
  max-width: 120rem !important;
  margin: 0 auto !important;
  padding: 0 !important;

  @include p-media-query('xs') {
    --p-grid-columns: 6;
  }

  @include p-media-query('s') {
    --p-grid-gutter: 1.5rem;
  }

  @include p-media-query('m') {
    --p-grid-gutter: 2.25rem;
  }

  @include p-media-query('l') {
    --p-grid-columns: 12;
  }

  @include p-media-query('xl') {
    --p-grid-safe-zone: 10vw;
  }

  @include p-media-query('xxl') {
    --p-grid-safe-zone: 12rem;
  }
}


/* ********* CONSUMER ********* CONSUMER ********* */

.main-nav {
  height: 8rem;
  background: $p-color-neutral-contrast-low;
}

.main-footer {
  margin-top: $p-layout-xx-large;
  height: 40rem;
  background: $p-color-neutral-contrast-low;
}

.p-grid > div {
  background: $p-color-neutral-contrast-medium;
}

.teaser {
  height: calc(100vh - 8rem);
  grid-column: main-start / main-end;
}

.home-stage {
  margin-top: $p-layout-x-large;
  height: 20rem;
  grid-column: content-start / span 1;

  @include p-media-query('xs') {
    grid-column: content-start / span 2;
  }

  @include p-media-query('l') {
    grid-column: content-start / span 4;
  }
}

.home-stage + .home-stage {
  @include p-media-query('xxs', 'xs') {
    margin-top: $p-layout-medium;
  }

  @include p-media-query('xs') {
    grid-column: auto / span 2;
  }

  @include p-media-query('l') {
    grid-column: auto / span 4;
  }
}

.headline {
  height: 3rem;
  margin-top: $p-layout-xx-large;
  grid-column: content-start / content-end;
}

.car-range {
  height: 20rem;
  margin-top: $p-layout-medium;
  grid-column: main-start / main-end;

  @include p-media-query('m') {
    margin-top: $p-layout-large;
    grid-column: main-start / span 4;
  }

  @include p-media-query('l') {
    grid-column: main-start / span 7;
  }
}

.car-range:nth-of-type(odd) {
  @include p-media-query('m') {
    grid-column: span 4 / main-end;
  }

  @include p-media-query('l') {
    grid-column: span 7 / main-end;
  }
}

.content-info {
  height: 20rem;
  margin-top: $p-layout-x-large;
  grid-column: main-start / main-end;
}

.story {
  height: 40rem;
  margin-top: $p-layout-medium;
  grid-column: main-start / main-end;
}

</style>
