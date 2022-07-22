<template>
  <div>
    <div class="main-nav">
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
    <div class="main-bar">
      <p-text theme="dark">
        Aktuell siehst du die Inhalte für deinen Standort: Deutschland
        <button>Standort/Sprache ändern</button>
      </p-text>
      <p-button-pure hide-label="true" icon="close" theme="dark"
        >Close location or language switch notification.</p-button-pure
      >
    </div>
    <div class="main-content">
      <div class="teaser">
        <img src="./assets/teaser.jpg" alt="" />
        <div>
          <p-headline variant="large-title" theme="dark">Soul<br />electrified</p-headline>
          <p-text size="medium" theme="dark">Der neue Taycan Cross Turismo</p-text>
          <p-button theme="dark">Entdecke den neuen Taycan</p-button>
        </div>
      </div>
      <div class="car-range">
        <Card
          v-for="(car, page, index) in carRange"
          :key="index"
          :height="{ min: '400px', val: '400px', max: '400px' }"
        >
          <img :src="getImgUrl(car.label)" :alt="car.label" />
          <template #top>
            <img :src="getSvgUrl(car.label)" :alt="car.label" height="24" />
            <p-text theme="dark">{{ car.price }}</p-text>
          </template>
          <template #bottom>
            <p-button-group>
              <p-button theme="dark">{{ car.explore }}</p-button>
              <p-button theme="dark" variant="tertiary">{{ car.configure }}</p-button>
            </p-button-group>
          </template>
        </Card>
      </div>
      <div class="car-compare">
        <Card :shading="false" :height="{ min: '25rem', val: '60vh', max: '40rem' }" fit="contain" position="bottom">
          <img src="./assets/compare.png" alt="" />
          <template #top>
            <p-headline variant="headline-3" tag="h2">Vergleichen alle unsere Modelle</p-headline>
            <p-text
              >Vergleiche alle unsere Modelle Verbrenner, Hybrid und E-Modelle miteinander. Egal ob 718, 911, Taycan,
              Panamera, Macan oder Cayenne.</p-text
            >
            <p-button variant="tertiary">Modellauswahl öffnen</p-button>
          </template>
        </Card>
      </div>
      <div class="accessories">
        <Card :shading="false" :height="{ min: '35rem', val: '35rem', max: '35rem' }" fit="contain" position="bottom">
          <img src="./assets/car-box.png" alt="" />
          <template #top>
            <p-headline variant="headline-3">Immer das richtige Fahrzeugzubehör zur Hand</p-headline>
            <p-button variant="tertiary">Zum Porsche Tequipment Shop</p-button>
          </template>
        </Card>
        <Card :shading="false" :height="{ min: '35rem', val: '35rem', max: '35rem' }" fit="contain" position="bottom">
          <img src="./assets/chrono.png" alt="" />
          <template #top>
            <p-headline variant="headline-3">Finde die Porsche Accessoires zu deinem Traumsportwagen</p-headline>
            <p-button variant="tertiary">Zum Porsche Design Shop</p-button>
          </template>
        </Card>
        <Card :height="{ min: '25rem', val: '50vh', max: '35rem' }">
          <img src="./assets/teaser-ev.png" alt="" />
          <template #top>
            <p-headline theme="dark" variant="headline-3">Porsche E-Performance</p-headline>
            <p-text theme="dark"
              >Entdecke unsere Porsche E-Performance mit unseren Elektro- und Plug-in-Hybrid-Modellen, der 800V und
              unserer durchdachten weltweiten Ladeinfrastruktur.</p-text
            >
            <p-button theme="dark" variant="tertiary">Mehr zu Porsche E-Performance</p-button>
          </template>
        </Card>
      </div>
    </div>
    <div class="main-footer"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Card from '@/components/Card.vue';

  @Component({
    components: {
      Card,
    },
  })
  export default class GridExamplePorscheCom extends Vue {
    public carRange = [
      {
        label: '718',
        price: 'Ab EUR 59.228,00 inkl. MwSt.',
        explore: 'Entdecke alle 718 Modelle',
        configure: 'Konfiguriere deinen 718er',
      },
      {
        label: '911',
        price: 'Ab EUR 113.492,00 inkl. MwSt.',
        explore: 'Entdecke alle 911 Modelle',
        configure: 'Konfiguriere deinen 911er',
      },
      {
        label: 'Taycan',
        price: 'Ab EUR 88.399,00 inkl. MwSt.',
        explore: 'Entdecke alle Taycan Modelle',
        configure: 'Konfiguriere deinen Taycan',
      },
      {
        label: 'Panamera',
        price: 'Ab EUR 98.022,00 inkl. MwSt.',
        explore: 'Entdecke alle Panamera Modelle',
        configure: 'Konfiguriere deinen Panamera',
      },
      {
        label: 'Macan',
        price: 'Ab EUR 65.773,00 inkl. MwSt.',
        explore: 'Entdecke alle Macan Modelle',
        configure: 'Konfiguriere deinen Macan',
      },
      {
        label: 'Cayenne',
        price: 'Ab EUR 82.909,00 inkl. MwSt.',
        explore: 'Entdecke alle Cayenne Modelle',
        configure: 'Konfiguriere deinen Cayenne',
      },
    ];

    getImgUrl(car: string) {
      const images = require.context('./assets/', false, /\.jpg$/);
      return images(`./${car.toLowerCase()}.jpg`);
    }

    getSvgUrl(car: string) {
      const images = require.context('./assets/', false, /\.svg$/);
      return images(`./${car.toLowerCase()}.svg`);
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@porsche-design-system/components-js/utilities/scss';

  .main-nav {
    background: $pds-theme-light-background-base;
    padding: $pds-spacing-medium $pds-grid-safe-zone;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: $pds-grid-max-width;

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

  .main-bar {
    padding: $pds-spacing-medium $pds-grid-safe-zone;
    background: $pds-theme-dark-background-surface;
    display: flex;
    justify-content: space-between;
    gap: $pds-spacing-medium;
    margin: 0 auto;
    max-width: $pds-grid-max-width;
  }

  .main-footer {
    margin-top: $pds-spacing-xx-large;
    height: 40rem;
    background: $pds-theme-dark-background-surface;
  }

  .main-content {
    @include pds-grid;
  }

  .teaser {
    position: relative;
    height: 60vh;
    min-height: 20rem;
    grid-column: grid-start / grid-end;
    margin-bottom: $pds-spacing-x-large;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    div {
      position: absolute;
      bottom: $pds-spacing-large;
      left: $pds-grid-safe-zone;
      display: flex;
      flex-direction: column;
      gap: $pds-spacing-medium;
      align-items: flex-start;
    }
  }

  .car-range {
    margin-top: $pds-spacing-large;
    display: grid;
    grid-template-columns: 1fr;
    grid-column: content-start / content-end;
    grid-gap: $pds-grid-gutter;

    @include pds-media-query-min('m') {
      grid-template-columns: 1fr 1fr;
    }
  }

  .car-compare {
    position: relative;
    margin-top: $pds-spacing-xx-large;
    padding: 0 $pds-grid-safe-zone;
    display: grid;
    grid-template-columns: 1fr;
    grid-column: grid-start / grid-end;
    background: $pds-theme-light-background-surface;
  }

  .accessories {
    margin-top: $pds-spacing-xx-large;
    display: grid;
    grid-template-columns: 1fr;
    grid-column: 3 / -3;
    grid-gap: $pds-grid-gutter;

    @include pds-media-query-min('m') {
      grid-template-columns: 1fr 1fr;

      & > :nth-of-type(1) {
        grid-column: 1 / 2;
        grid-row: 1;
      }

      & > :nth-of-type(2) {
        grid-column: 2 / 3;
        grid-row: 1;
      }

      & > :nth-of-type(3) {
        grid-column: 1 / 3;
        grid-row: 2;
      }
    }
  }
</style>
