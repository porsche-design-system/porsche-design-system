<template>
  <div class="main-app">
    <PorscheHeader />
    <PorscheMainBar />

    <div class="teaser">
      <img src="./assets/teaser.jpg" alt="" />
      <div class="teaser__content">
        <p-headline variant="large-title" theme="dark">Soul<br />electrified</p-headline>
        <p-text size="medium" theme="dark">Der neue Taycan Cross Turismo</p-text>
        <p-button theme="dark">Entdecke den neuen Taycan</p-button>
      </div>
    </div>

    <div class="car-range">
      <Card
        :class="{ 'car-range__card': true, [`car-range__card--${car.label.toLowerCase()}`]: true }"
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
        class="car-compare__card"
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
      <Card
        class="accessories__card accessories__card--equipment"
        :shading="false"
        :height="{ min: '35rem', val: '35rem', max: '35rem' }"
        fit="block"
        position="bottom"
      >
        <img src="./assets/car-box.png" alt="" />
        <template #top>
          <p-headline variant="headline-3">Immer das richtige Fahrzeugzubehör zur Hand</p-headline>
          <p-button variant="tertiary">Zum Porsche Tequipment Shop</p-button>
        </template>
      </Card>
      <Card
        class="accessories__card accessories__card--watch"
        :shading="false"
        :height="{ min: '35rem', val: '35rem', max: '35rem' }"
        fit="block"
        position="bottom"
      >
        <img src="./assets/chrono.png" alt="" />
        <template #top>
          <p-headline variant="headline-3">Finde die Porsche Accessoires zu deinem Traumsportwagen</p-headline>
          <p-button variant="tertiary">Zum Porsche Design Shop</p-button>
        </template>
      </Card>
      <Card class="accessories__card accessories__card--electric" :height="{ min: '25rem', val: '50vh', max: '35rem' }">
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

  .car-range {
    @include pds-grid;
    margin-top: calc(#{$pds-grid-gap} * 3);

    &__card {
      grid-column: content-start / content-end;
    }

    @include pds-media-query-min('m') {
      grid-template-areas:
        'l p718   p718   p718   p718   p718   p718   p911     p911     p911     p911     p911     p911     r'
        'l taycan taycan taycan taycan taycan taycan panamera panamera panamera panamera panamera panamera r'
        'l macan  macan  macan  macan  macan  macan  cayenne  cayenne  cayenne  cayenne  cayenne  cayenne  r';

      &__card {
        &--718 {
          grid-area: p718;
        }

        &--911 {
          grid-area: p911;
        }

        &--taycan {
          grid-area: taycan;
        }

        &--panamera {
          grid-area: panamera;
        }

        &--macan {
          grid-area: macan;
        }

        &--cayenne {
          grid-area: cayenne;
        }
      }
    }
  }

  .car-compare {
    @include pds-grid;
    margin-top: calc(#{$pds-grid-gap} * 3);
    background: $pds-theme-light-background-surface;
    padding-top: $pds-spacing-large;
    padding-bottom: $pds-spacing-large;

    &__card {
      grid-column: content-start / content-end;
    }
  }

  .accessories {
    @include pds-grid;
    margin-top: calc(#{$pds-grid-gap} * 3);

    &__card {
      grid-column: 3 / -3;
    }

    @include pds-media-query-min('m') {
      grid-template-areas:
        'l l equipment equipment equipment equipment equipment watch    watch    watch    watch    watch    r r'
        'l l electric  electric  electric  electric  electric  electric electric electric electric electric r r';

      &__card {
        &--equipment {
          grid-area: equipment;
        }

        &--watch {
          grid-area: watch;
        }

        &--electric {
          grid-area: electric;
        }
      }
    }
  }
</style>
