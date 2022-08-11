<template>
  <main>
    <section>
      <h2>Within content-wrapper</h2>

      <p-carousel heading="Some Heading">
        <div>slide 1</div>
        <div>slide 2</div>
        <div>slide 3</div>
        <div>slide 4</div>
        <div>slide 5</div>
        <div>slide 6</div>
      </p-carousel>

      <p-carousel
        heading="Multiline Heading could be quite long especially on smaller screens but how would the carousel be accessible with out one?"
        slides-per-page="2"
      >
        <div>slide 1</div>
        <div>slide 2</div>
        <div>slide 3</div>
        <div>slide 4</div>
        <div>slide 5</div>
        <div>slide 6</div>
      </p-carousel>

      <p-carousel slides-per-page="{base: 3, s: 1, m: 3}">
        <div>slide 1</div>
        <div>slide 2</div>
        <div>slide 3</div>
        <div>slide 4</div>
        <div>slide 5</div>
        <div>slide 6</div>
      </p-carousel>
    </section>

    <section>
      <h2>Without content-wrapper</h2>

      <p-carousel heading="Some Heading">
        <div>slide 1</div>
        <div>slide 2</div>
        <div>slide 3</div>
        <div>slide 4</div>
        <div>slide 5</div>
        <div>slide 6</div>
      </p-carousel>

      <p-carousel
        heading="Multiline Heading could be quite long especially on smaller screens but how would the carousel be accessible with out one?"
        slides-per-page="2"
      >
        <div>slide 1</div>
        <div>slide 2</div>
        <div>slide 3</div>
        <div>slide 4</div>
        <div>slide 5</div>
        <div>slide 6</div>
      </p-carousel>

      <p-carousel slides-per-page="{base: 3, s: 1, m: 3}">
        <div>slide 1</div>
        <div>slide 2</div>
        <div>slide 3</div>
        <div>slide 4</div>
        <div>slide 5</div>
        <div>slide 6</div>
      </p-carousel>
    </section>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component()
  export default class ExampleCarousel extends Vue {}
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

  p-carousel {
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
