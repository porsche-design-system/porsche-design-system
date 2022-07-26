<template>
  <div class="main-app">
    <PorscheHeader />
    <PorscheMainBar />
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
        <Card
          :shading="false"
          :height="{ min: '25rem', val: '60vh', max: '40rem' }"
          variant="seamless"
          fit="block"
          position="bottom"
        >
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
        <Card :shading="false" :height="{ min: '35rem', val: '35rem', max: '35rem' }" fit="block" position="bottom">
          <img src="./assets/car-box.png" alt="" />
          <template #top>
            <p-headline variant="headline-3">Immer das richtige Fahrzeugzubehör zur Hand</p-headline>
            <p-button variant="tertiary">Zum Porsche Tequipment Shop</p-button>
          </template>
        </Card>
        <Card :shading="false" :height="{ min: '35rem', val: '35rem', max: '35rem' }" fit="block" position="bottom">
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
    <PorscheFooter />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Card from '@/components/Card.vue';
  import PorscheHeader from '@/components/PorscheHeader.vue';
  import PorscheMainBar from '@/components/PorscheMainBar.vue';
  import PorscheFooter from '@/components/PorscheFooter.vue';

  @Component({
    components: {
      Card,
      PorscheHeader,
      PorscheMainBar,
      PorscheFooter,
    },
  })
  export default class ExamplePorscheCom extends Vue {
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

    getImgUrl(car: string): string {
      const images = require.context('./assets/', false, /\.jpg$/);
      return images(`./${car.toLowerCase()}.jpg`);
    }

    getSvgUrl(car: string): string {
      const images = require.context('./assets/', false, /\.svg$/);
      return images(`./${car.toLowerCase()}.svg`);
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@porsche-design-system/components-js/utilities/scss';

  .main-app {
    min-width: 20rem;
  }

  .main-content {
    @include pds-grid;
  }

  .teaser {
    position: relative;
    height: 60vh;
    min-height: 20rem;
    max-height: 40rem;
    grid-column: grid-start / grid-end;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    div {
      position: absolute;
      bottom: $pds-spacing-large;
      left: $pds-grid-safe-zone-base;
      display: flex;
      flex-direction: column;
      gap: $pds-spacing-medium;
      align-items: flex-start;

      @include pds-media-query-min('xl') {
        left: $pds-grid-safe-zone-xl;
      }
    }
  }

  .car-range {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-column: content-start / content-end;
    grid-gap: $pds-grid-gap;

    @include pds-media-query-min('m') {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .car-compare {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-column: grid-start / grid-end;
    background: $pds-theme-light-background-surface;
    padding: $pds-spacing-large $pds-grid-safe-zone-base;

    @include pds-media-query-min('xl') {
      padding: $pds-spacing-xx-large $pds-grid-safe-zone-xl;
    }
  }

  .accessories {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-column: 3 / -3;
    grid-gap: $pds-grid-gap;

    @include pds-media-query-min('m') {
      grid-template-columns: repeat(2, minmax(0, 1fr));

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
