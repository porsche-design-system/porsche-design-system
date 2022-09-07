<template>
  <div class="main-app">
    <PorscheMainNavigation />
    <main>
      <div class="teaser">
        <img src="./assets/teaser.jpg" alt="" />
        <div class="teaser__content">
          <p-headline variant="large-title" theme="dark">Soul<br />electrified</p-headline>
          <p-text size="medium" theme="dark">The new Taycan Cross Turismo</p-text>
          <p-link theme="dark" href="https://www.porsche.com/usa/models/taycan/taycan-models/">Explore the new Taycan</p-link>
        </div>
      </div>
    </main>
    <PorscheFooter />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import PorscheMainNavigation from '@/components/PorscheMainNavigation.vue';
  import PorscheFooter from '@/components/PorscheFooter.vue';

  @Component({
    components: {
      PorscheMainNavigation,
      PorscheFooter,
    },
  })
  export default class KitchenSinkHomepage extends Vue {

  }
</script>

<style lang="scss" scoped>
  @import '~@porsche-design-system/components-js/utilities/scss';

  .teaser {
    @include pds-grid;
    align-items: end;

    img {
      grid-area: 1 / grid-start / 1 / grid-end;
      width: 100%;
      height: 60vh;
      min-height: 25rem;
      max-height: 40rem;
      object-fit: cover;
      object-position: center;
    }

    &__content {
      grid-area: 1 / content-start / 1 / content-end;
      margin-bottom: $pds-spacing-large;
      display: flex;
      flex-direction: column;
      gap: $pds-spacing-medium;
      align-items: flex-start;
    }
  }
</style>
