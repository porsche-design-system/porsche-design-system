<template>
  <main>
    <section>
      <h2>Within content-wrapper</h2>

      <div v-html="content"></div>
    </section>

    <section>
      <h2>Without content-wrapper</h2>

      <div v-html="content"></div>
    </section>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component()
  export default class ExampleCarousel extends Vue {
    content = `
<p-carousel heading="Some Heading">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
  <div>Slide 5</div>
  <div>Slide 6</div>
</p-carousel>

<p-carousel>
  <h2 slot="heading">Slotted Heading with default styles</h2>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
  <div>Slide 5</div>
  <div>Slide 6</div>
</p-carousel>

<p-carousel heading="Some wrapped Heading" wrap-heading="true">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
  <div>Slide 5</div>
  <div>Slide 6</div>
</p-carousel>

<p-carousel
  heading="Multiline Heading could be quite long especially on smaller screens but how would the carousel be accessible with out one?"
  slides-per-page="2"
>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
  <div>Slide 5</div>
  <div>Slide 6</div>
</p-carousel>

<p-carousel heading="Responsive slides per page" slides-per-page="{base: 3, s: 1, m: 3}">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
  <div>Slide 5</div>
  <div>Slide 6</div>
</p-carousel>

<p-carousel heading="Some Heading" slides-per-page="1.2">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
  <div>Slide 5</div>
  <div>Slide 6</div>
</p-carousel>

<p-carousel heading="Some Heading" disable-pagination="true">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
  <div>Slide 5</div>
  <div>Slide 6</div>
</p-carousel>`;
  }
</script>

<style lang="scss" scoped>
  @import '~@porsche-design-system/components-js/utilities/scss';

  main {
    @include pds-grid;
    overflow-x: hidden;

    section {
      &:first-of-type {
        grid-area: 1 / content-start / 1 / content-end;
      }

      &:last-of-type {
        grid-area: 2 / grid-start / 2 / grid-end;
      }
    }
  }

  :deep(p-carousel) {
    background: lightsalmon;

    &:not(:last-of-type) {
      border-bottom: 1px solid darkcyan;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background: #00b0f4;
      height: 100px;
    }
  }

  h2 {
    margin: 20px 0;
  }
</style>
