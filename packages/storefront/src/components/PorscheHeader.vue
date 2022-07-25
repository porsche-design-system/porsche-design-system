<template>
  <div
    :class="{
      'main-nav': true,
      'main-nav--7vw-linear': grid === '7vw-linear',
      'main-nav--improved-linear': grid === 'improved-linear',
      'main-nav--fluid-interpolation': grid === 'fluid-interpolation',
    }"
  >
    <p-marque href="https://www.porsche.com"></p-marque>
    <div class="car-models">
      <button>
        <img
          width="89"
          height="55"
          srcset="
            https://nav.porsche.com/00BC524/series-assets/1366/718.jpg,
            https://nav.porsche.com/00BC524/series-assets/1366/718@2x.jpg 2x
          "
          alt="Porsche 718"
        />
        718
      </button>
      <button>
        <img
          width="92"
          height="55"
          srcset="
            https://nav.porsche.com/00BC524/series-assets/1366/911.jpg,
            https://nav.porsche.com/00BC524/series-assets/1366/911@2x.jpg 2x
          "
          alt="Porsche 911"
        />
        911
      </button>
      <button>
        <img
          width="100"
          height="55"
          srcset="
            https://nav.porsche.com/00BC524/series-assets/1366/taycan.jpg,
            https://nav.porsche.com/00BC524/series-assets/1366/taycan@2x.jpg 2x
          "
          alt="Porsche Taycan"
        />
        Taycan
      </button>
      <button>
        <img
          width="100"
          height="55"
          srcset="
            https://nav.porsche.com/00BC524/series-assets/1366/panamera.jpg,
            https://nav.porsche.com/00BC524/series-assets/1366/panamera@2x.jpg 2x
          "
          alt="Porsche Panamera"
        />
        Panamera
      </button>
      <button>
        <img
          width="98"
          height="55"
          srcset="
            https://nav.porsche.com/00BC524/series-assets/1366/macan.jpg,
            https://nav.porsche.com/00BC524/series-assets/1366/macan@2x.jpg 2x
          "
          alt="Porsche Macan"
        />
        Macan
      </button>
      <button>
        <img
          width="98"
          height="55"
          srcset="
            https://nav.porsche.com/00BC524/series-assets/1366/cayenne.jpg,
            https://nav.porsche.com/00BC524/series-assets/1366/cayenne@2x.jpg 2x
          "
          alt="Porsche Cayenne"
        />
        Cayenne
      </button>
    </div>
    <div class="quick-nav">
      <p-button-pure icon="none">Shop</p-button-pure>
      <p-link-pure icon="none" href="https://www.porsche.com/usa/dealersearch">Dealers</p-link-pure>
      <p-link-pure icon="none" href="https://my.porsche.com/core/us/en_US/home">My Porsche</p-link-pure>
      <p-button-pure hide-label="true" icon="menu-dots-vertical">More</p-button-pure>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class PorscheHeader extends Vue {
    @Prop({ default: '7vw-linear' }) public grid!: '7vw-linear' | 'improved-linear' | 'fluid-interpolation';
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';

  .main-nav {
    background: $pds-theme-light-background-base;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: $pds-grid-max-width;

    &--7vw-linear {
      padding: $pds-spacing-medium $pds-grid-safe-zone;
    }

    &--improved-linear {
      padding: $pds-spacing-medium $pds-grid-safe-zone-improved-linear;
    }

    &--fluid-interpolation {
      padding: $pds-spacing-medium $pds-grid-safe-zone-fluid-interpolation-base;

      @include pds-media-query-min('xl') {
        padding: $pds-spacing-medium $pds-grid-safe-zone-fluid-interpolation-xl;
      }
    }

    .car-models {
      display: none;

      @include pds-media-query-min('l') {
        display: flex;
        gap: $pds-spacing-small;

        button {
          @include pds-focus;
          @include pds-text-small;
          font-size: 0.875rem;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;

          &:hover,
          &:active {
            color: $pds-theme-light-state-hover;
          }
        }
      }
    }

    .quick-nav {
      display: none;

      @include pds-media-query-min('xs') {
        display: flex;
        gap: $pds-spacing-large;
      }
    }
  }
</style>
