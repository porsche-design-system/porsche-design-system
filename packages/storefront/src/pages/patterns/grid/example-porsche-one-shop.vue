<template>
  <div>
    <div class="main-nav"></div>
    <div class="p-grid">
      <div class="free-shipping"></div>
      <div class="swipe-gallery"></div>
      <div class="intro"></div>
      <div class="product-gallery"></div>
      <div class="banner"></div>
      <div class="headline"></div>
      <div class="editorial"></div>
      <div class="swipe-gallery"></div>
    </div>
    <div class="main-footer"></div>
  </div>
</template>

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
  background: $p-color-neutral-contrast-medium;
}

.free-shipping {
  margin: $p-layout-small 0;
  height: 1.5rem;
  grid-column: content-start / content-end;
}

.swipe-gallery {
  height: 30rem;
  grid-column: main-start / main-end;
}

.intro {
  margin: $p-layout-x-large 0;
  height: 8rem;
  grid-column: content-start / content-end;
}

.product-gallery {
  height: 40rem;
  grid-column: content-start / content-end;
}

.banner {
  margin-top: $p-layout-x-large;
  height: 40rem;
  grid-column: main-start / main-end;
}

.headline {
  height: 5rem;
  margin-top: $p-layout-x-large;
  grid-column: content-start / content-end;
}

.editorial {
  height: 50rem;
  margin: $p-layout-x-large 0;
  grid-column: content-start / content-end;
}
</style>
