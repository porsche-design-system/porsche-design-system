<template>
  <div>
    <div class="main-nav"></div>
    <div class="p-grid">
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
  export default class GridPorscheCom extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@porsche-design-system/utilities/scss";
@import '../../../styles/grid.scss';

.p-grid {
  @include p-grid(true);
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
  background: rgba(0,0,255,0.25);
}

.teaser {
  height: calc(100vh - 8rem);
  grid-column: main-start / main-end;
  margin-bottom: $p-layout-x-large;
}

.home-stage {
  margin-top: $p-layout-medium;
  grid-column: content-start / content-end;

  // some custom grid
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: $p-grid-gutter;

  @include p-media-query('s') {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: $p-grid-gutter-s;
  }
  @include p-media-query('m') {
    grid-gap: $p-grid-gutter-m;
  }

  & > * {
    border: 1rem solid deeppink;
    height: 20rem;
  }
}

.headline {
  height: 3rem;
  margin-top: $p-layout-xx-large;
  grid-column: content-start / content-end;
}

.car-range {
  margin-top: $p-layout-medium;
  grid-column: main-start / main-end;

  // some custom grid
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: $p-grid-gutter;

  @include p-media-query('s') {
    grid-gap: $p-grid-gutter-s;
  }
  @include p-media-query('m') {
    grid-template-columns: 1fr 1fr;
    grid-gap: $p-grid-gutter-m;
  }

  & > * {
    border: 1rem solid deeppink;
    height: 20rem;
  }
}

.content-info {
  margin-top: $p-layout-xx-large;
  grid-column: main-start / main-end;

  // some custom grid
  display: grid;
  grid-template-columns: 1fr;

  @include p-media-query('m') {
    grid-template-columns: repeat(6, 1fr);
  }

  & > * {
    height: 20rem;

    @include p-media-query('m') {
      grid-row-start: 1;
    }
  }

  & > :nth-of-type(1) {
    border: 1rem solid deeppink;
  }

  & > :nth-of-type(2) {
    background: deeppink;
  }

  @include p-media-query('m') {
    &:nth-of-type(odd) > :first-child {
      grid-column: 1 / 5;
    }

    &:nth-of-type(odd) > :last-child {
      grid-column: 5 / 7;
    }

    &:nth-of-type(even) > :first-child {
      grid-column: 3 / 7;
    }

    &:nth-of-type(even) > :last-child {
      grid-column: 1 / 3;
    }
  }
}

.story {
  margin-top: $p-layout-medium;
  grid-column: main-start / main-end;

  // some custom grid
  display: grid;
  grid-template-rows: auto auto auto;
  grid-gap: .75rem;
  height: 40rem;

  & > * {
    border: 1rem solid deeppink;
  }

  @include p-media-query('xxs', 's') {
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

  @include p-media-query('s', 'm') {
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

  @include p-media-query('m') {
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
