<template>
  <div style="transform: translate3d(0, 0, 0)">
    <div v-if="visualizeGrid" class="visualize-grid">
      <span v-for="n in new Array(18)" :key="n" />
    </div>
    <div class="hero-grid">
      <div class="hero-media">
        <span class="info"><b>Full</b> for Background and Media</span>
      </div>
      <div class="hero-header">
        <h1 class="display">Hero Heading</h1>
        <p class="text-large">Subline for the Hero Header in Wide Grid</p>
      </div>
    </div>
    <div class="wide-grid">
      <div class="wide-sidebar">
        <span class="info"><b>Wide Sidebar</b></span>
        <p-accordion heading="Some Heading" tag="h2"></p-accordion>
        <p-accordion heading="Some Heading" tag="h2"></p-accordion>
        <p-accordion heading="Some Heading" tag="h2"></p-accordion>
      </div>
      <div class="wide-content">
        <span class="info"><b>Wide Content</b></span>
      </div>
    </div>
    <div class="extended-content-grid">
      <div class="extended-content-half-left">
        <span class="info"><b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids</span>
      </div>
      <div class="extended-content-half-right">
        <span class="info"><b>Extended Half</b> for Large Teaser Backgrounds, Media, Image Grids</span>
      </div>
    </div>
    <div class="masonry-grid">
      <div class="masonry-custom-1">
        <span class="info"><b>Custom (column desktop: 2-9)</b> for Image Grids</span>
      </div>
      <div class="masonry-custom-2">
        <span class="info"><b>Custom (column desktop: 10-15)</b> for Image Grids</span>
      </div>
      <div class="masonry-custom-3">
        <span class="info"><b>Custom (column desktop: 10-14)</b> for Image Grids</span>
      </div>
    </div>
    <div class="teaser-grid">
      <div class="teaser-media">
        <span class="info"><b>Full</b> for Teaser Backgrounds and Media (Former Basic)</span>
      </div>
      <div class="teaser-content">
        <span class="info"><b>Basic</b> for Content in Teaser</span>
        <h2 class="heading-x-large">Heading in Teaser</h2>
        <p class="text">Subline or Copy Text in Large Teaser</p>
        <p-button variant="secondary">Some label</p-button>
      </div>
    </div>
    <div class="basic-content-grid">
      <div class="basic-content">
        <span class="info"><b>Basic</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-half-left">
        <span class="info"><b>Basic Half</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-half-right">
        <span class="info"><b>Basic Half</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-one-third-left">
        <span class="info"><b>Basic Third</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-one-third-follow">
        <span class="info"><b>Basic Third</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-one-third-follow">
        <span class="info"><b>Basic Third</b> for Content Tiles</span>
        <h3 class="heading">Heading in Tile</h3>
        <p-button variant="secondary">Some label</p-button>
      </div>
      <div class="basic-content-two-thirds-left">
        <span class="info kbBcQV"><b>Basic Two Thirds</b> for Content Tiles</span>
      </div>
      <div class="basic-content-one-third-right">
        <span class="info"><b>Basic One Third</b> for Content Tiles</span>
      </div>
      <div class="basic-content-custom-left">
        <span class="info"><b>Custom (desktop: column 3-7)</b> for Content</span>
      </div>
      <div class="basic-content-custom-right">
        <span class="info"><b>Custom (desktop: column 9-14)</b> for Content</span>
      </div>
    </div>
    <div class="narrow-content-grid">
      <div class="narrow-content">
        <span class="info"><b>Narrow</b> for small Components and Content</span
        ><p-accordion heading="Some Heading" tag="h3"
          ><p class="text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam
            felis, ultricies nec, pellentesque eu. Aenean massa.
          </p></p-accordion
        ><p-accordion heading="Some Heading" tag="h3"
          ><p class="text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Donec quam
            felis, ultricies nec, pellentesque eu. Aenean massa.
          </p></p-accordion
        >
      </div>
      <div class="narrow-content-half-left">
        <span class="info"><b>Narrow</b> Half for small Content Tiles</span>
        <h3 class="heading">Experience</h3>
        <p class="text">
          Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according to
          your wishes.
        </p>
      </div>
      <div class="narrow-content-half-right">
        <span class="info"><b>Narrow</b> Half for small Content Tiles</span>
        <h3 class="heading">Experience</h3>
        <p class="text">
          Goosebumps, adrenaline: experience the fascination of sports cars - with all different facets and according to
          your wishes.
        </p>
      </div>
    </div>
    <div class="hero-carousel">
      <p-carousel heading="Heading Carousel Basic">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
      <p-carousel heading="Heading Carousel Extended" width="extended">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </p-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class ExampleStylesGrid extends Vue {
  @Prop({ default: true }) public visualizeGrid!: boolean;
}
</script>

<style lang="scss" scoped>
  // TODO: we should import from vue, but we need to prepare CI first
  @use '@porsche-design-system/components-js/styles' as *;
  @use 'sass:map';

  // Visualize Grid
  .visualize-grid {
    z-index: 9999999;
    @include pds-grid;
    & {
      position: fixed;
      inset: 0;
      pointer-events: none;
    }

    > span {
      background: rgba(0, 0, 255, 0.1);
      &:first-child,
      &:last-child {
        background: rgba(125, 0, 255, 0.1);
      }

      @include pds-media-query-max('s') {
        &:nth-child(8) {
          background: rgba(125, 0, 255, 0.1);
        }
        &:nth-child(n + 9) {
          display: none;
        }
      }
    }
  }

  // Tile
  @mixin tile($color, $padding: 'medium', $border-radius: true) {
    $color-map: (
      'blue': rgba(0, 0, 255, 0.25),
      'green': rgba(0, 255, 0, 0.25),
      'purple': rgba(255, 0, 255, 0.25),
      'yellow': rgba(255, 255, 0, 0.25),
      'orange': rgba(255, 125, 0, 0.25),
    );
    @if $padding == 'medium' {
      padding: $pds-spacing-fluid-medium;
    } @else if $padding == 'small' {
      padding: $pds-spacing-fluid-small;
    } @else {
      padding: 0;
    }
    @if $border-radius == true {
      border-radius: $pds-border-radius-large;
    }
    background: map.get($color-map, $color);
  }

  // Typography
  .info {
    @include pds-text-x-small;
    display: inline-block;
    vertical-align: top;
    color: $pds-theme-light-primary;
    border-radius: $pds-border-radius-small;
    margin-bottom: $pds-spacing-fluid-small;
    padding: $pds-spacing-static-x-small $pds-spacing-static-small;
    background: $pds-theme-light-state-hover;

    .hero-media &,
    .teaser-media &,
    .narrow-content & {
      margin-inline-start: $pds-spacing-static-small;
      margin-top: $pds-spacing-static-small;
    }
  }

  .display {
    @include pds-display-large;
    color: $pds-theme-light-primary;
    margin: 0;
  }

  .heading {
    @include pds-heading-large;
    color: $pds-theme-light-primary;
    margin: 0;
  }

  .heading-x-large {
    @include pds-heading-x-large;
    color: $pds-theme-light-primary;
    margin: 0;
  }

  .text {
    @include pds-text-small;
    color: $pds-theme-light-primary;
    margin: $pds-spacing-fluid-x-small 0 0;
  }

  .text-large {
    @include pds-text-large;
    color: $pds-theme-light-primary;
    margin: $pds-spacing-fluid-x-small 0 0;
  }

  p-button {
    margin-top: $pds-spacing-fluid-medium;
  }

  // Hero
  .hero-grid {
    @include pds-grid;
    & {
      align-items: end;
    }
  }

  .hero-media {
    @include tile('blue', false, false);
    grid-column: $pds-grid-full-column-start / $pds-grid-full-column-end;
    grid-row: 1;
    height: clamp(300px, 50vh, 500px);
  }

  .hero-header {
    @include tile('green', false, false);
    grid-column: $pds-grid-wide-column-start / $pds-grid-wide-column-end;
    grid-row: 1;
    padding-bottom: $pds-spacing-fluid-medium;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  // Wide Content
  .wide-grid {
    @include pds-grid;
    & {
      margin-top: $pds-spacing-fluid-large;
    }
  }

  .wide-sidebar {
    @include tile('orange');
    grid-column: $pds-grid-wide-column-start / $pds-grid-wide-column-end;

    @include pds-media-query-min('s') {
      grid-column: $pds-grid-wide-column-start / span 5;
    }
  }

  .wide-content {
    @include tile('orange');
    grid-column: $pds-grid-wide-column-start / $pds-grid-wide-column-end;

    @include pds-media-query-min('s') {
      grid-column: span 11 / $pds-grid-wide-column-end;
    }
  }

  // Extended Content
  .extended-content-grid {
    @include pds-grid;
    & {
      margin-top: $pds-spacing-fluid-large;
    }
  }

  .extended-content-half-left {
    @include tile('green');
    grid-column: $pds-grid-extended-column-start / $pds-grid-extended-span-one-half;
  }

  .extended-content-half-right {
    @include tile('green');
    grid-column: $pds-grid-extended-span-one-half / $pds-grid-extended-column-end;
  }

  // Masonry
  .masonry-grid {
    @include pds-grid;
    & {
      margin-top: $pds-grid-gap;
    }
  }

  .masonry-custom-1 {
    @include tile('green');
    grid-column: $pds-grid-extended-column-start / $pds-grid-extended-column-end;
    @include pds-media-query-min('s') {
      grid-column: $pds-grid-extended-column-start / span 8;
      grid-row: span 2;
    }
  }

  .masonry-custom-2 {
    @include tile('green');
    grid-column: $pds-grid-extended-column-start / $pds-grid-extended-span-one-half;
    @include pds-media-query-min('s') {
      grid-column: span 6 / $pds-grid-extended-span-one-half;
    }
  }

  .masonry-custom-3 {
    @include tile('green');
    grid-column: $pds-grid-extended-span-one-half / $pds-grid-extended-column-end;
    @include pds-media-query-min('s') {
      grid-column: span 5 / $pds-grid-extended-span-one-half;
    }
  }

  // Teaser
  .teaser-grid {
    @include pds-grid;
    & {
      margin-top: $pds-spacing-fluid-large;
    }
  }

  .teaser-media {
    @include tile('blue', false, false);
    grid-column: $pds-grid-full-column-start / $pds-grid-full-column-end;
    grid-row: 1;
  }

  .teaser-content {
    @include tile('purple', false, false);
    grid-column: $pds-grid-basic-column-start / $pds-grid-basic-column-end;
    grid-row: 1;
    margin: $pds-spacing-fluid-large 0;
  }

  // Basic Content
  .basic-content-grid {
    @include pds-grid;
    & {
      margin-top: $pds-spacing-fluid-large;
    }
  }

  .basic-content {
    @include tile('purple');
    grid-column: $pds-grid-basic-column-start / $pds-grid-basic-column-end;
  }

  .basic-content-half-left {
    @include tile('purple');
    grid-column: $pds-grid-basic-column-start / $pds-grid-basic-span-one-half;
  }

  .basic-content-half-right {
    @include tile('purple');
    grid-column: $pds-grid-basic-span-one-half / $pds-grid-basic-column-end;
  }

  .basic-content-one-third-left {
    @include tile('purple');
    grid-column: $pds-grid-basic-column-start / $pds-grid-basic-column-end;
    @include pds-media-query-min('s') {
      grid-column: $pds-grid-basic-column-start / $pds-grid-basic-span-one-third;
    }
  }

  .basic-content-one-third-follow {
    @include tile('purple');
    grid-column: $pds-grid-basic-column-start / $pds-grid-basic-column-end;
    @include pds-media-query-min('s') {
      grid-column: $pds-grid-basic-span-one-third;
    }
  }

  .basic-content-one-third-right {
    @include tile('purple');
    grid-column: $pds-grid-basic-column-start / $pds-grid-basic-column-end;
    @include pds-media-query-min('s') {
      grid-column: $pds-grid-basic-span-one-third / $pds-grid-basic-column-end;
    }
  }

  .basic-content-two-thirds-left {
    @include tile('purple');
    grid-column: $pds-grid-basic-column-start / $pds-grid-basic-column-end;
    @include pds-media-query-min('s') {
      grid-column: $pds-grid-basic-column-start / $pds-grid-basic-span-two-thirds;
    }
  }

  .basic-content-custom-left {
    @include tile('purple');
    grid-column: $pds-grid-basic-column-start / $pds-grid-basic-column-end;
    @include pds-media-query-min('s') {
      grid-column: $pds-grid-basic-column-start / span 5;
    }
  }

  .basic-content-custom-right {
    @include tile('purple');
    grid-column: span 6 / $pds-grid-basic-column-end;
  }

  // Narrow Content
  .narrow-content-grid {
    @include pds-grid;
    & {
      margin-top: $pds-spacing-fluid-large;
    }
  }

  .narrow-content {
    @include tile('yellow', false);
    grid-column: $pds-grid-narrow-column-start / $pds-grid-narrow-column-end;
  }

  .narrow-content-half-left {
    @include tile('yellow', 'small');
    grid-column: $pds-grid-narrow-column-start / $pds-grid-narrow-span-one-half;
  }

  .narrow-content-half-right {
    @include tile('yellow', 'small');
    grid-column: $pds-grid-narrow-span-one-half / $pds-grid-narrow-column-end;
  }

  // Carousel
  .hero-carousel {
    margin-top: $pds-spacing-fluid-large;
  }
  p-carousel {
    padding-bottom: $pds-spacing-fluid-large;
  }
  p-carousel div {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00b0f4;
    height: 100px;
    border-radius: $pds-border-radius-small;
    color: $pds-theme-light-primary;
  }
</style>
