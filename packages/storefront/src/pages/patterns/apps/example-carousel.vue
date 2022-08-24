<template>
  <main>
    <section>
      <h2>Within content-wrapper</h2>

      <div v-html="content.replace(/(<p-carousel)/g, `$1 overflow-visible='true'`)"></div>
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
    slides = Array.from(Array(6))
      .map((_, i) => `<div>Slide ${i + 1}</div>`)
      .join('');
    content = `
<p-carousel class="demo" heading="Einstieg bei Porsche" slides-per-page="{base: 1, s: 2, l: 3}">
  <p-tabs-bar slot="subheading" active-tab-index="0">
    <button>Schüler</button>
    <button>Studierende & Absolventen</button>
    <button>Berufserfahrene</button>
  </p-tabs-bar>

  <div class="card">
    <picture>
      <source media="(max-width: 480px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildungsberufe_Startseite_1920x1440.jpg?rev=5fed4e8b443245df91ca340b9938432e&amp;extension=webp&amp;w=480">
      <source media="(max-width: 760px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildungsberufe_Startseite_1920x1440.jpg?rev=5fed4e8b443245df91ca340b9938432e&amp;extension=webp&amp;w=760">
      <source media="(max-width: 1000px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildungsberufe_Startseite_1920x1440.jpg?rev=5fed4e8b443245df91ca340b9938432e&amp;extension=webp&amp;w=1000">
      <source media="(max-width: 1920px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildungsberufe_Startseite_1920x1440.jpg?rev=5fed4e8b443245df91ca340b9938432e&amp;extension=webp&amp;w=480">
      <source media="(min-width: 1920px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildungsberufe_Startseite_1920x1440.jpg?rev=5fed4e8b443245df91ca340b9938432e&amp;extension=webp&amp;w=480">
      <img src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildungsberufe_Startseite_1920x1440.jpg?rev=5fed4e8b443245df91ca340b9938432e&amp;extension=webp&amp;w=50" height="1440" width="1920" data-test="mediaImage" alt="Rund um die Ausbildung">
    </picture>
    <div class="card__bottom">
      <h3>Unser Ausbildungsangebot</h3>
      <p>Entdecke die vielfältigen Berufsbilder, in denen <nobr>Porsche</nobr> Ausbildungsplätze anbietet.</p>
      <p-link href="#">Mehr erfahren</p-link>
    </div>
  </div>

  <div class="card">
    <picture>
      <source media="(max-width: 480px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildung_Startseite_1920x1440.jpg?rev=8f00b2145fe14f52a608384b504feb3d&amp;extension=webp&amp;w=480">
      <source media="(max-width: 760px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildung_Startseite_1920x1440.jpg?rev=8f00b2145fe14f52a608384b504feb3d&amp;extension=webp&amp;w=760">
      <source media="(max-width: 1000px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildung_Startseite_1920x1440.jpg?rev=8f00b2145fe14f52a608384b504feb3d&amp;extension=webp&amp;w=1000">
      <source media="(max-width: 1920px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildung_Startseite_1920x1440.jpg?rev=8f00b2145fe14f52a608384b504feb3d&amp;extension=webp&amp;w=480">
      <source media="(min-width: 1920px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildung_Startseite_1920x1440.jpg?rev=8f00b2145fe14f52a608384b504feb3d&amp;extension=webp&amp;w=480">
      <img src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/02_Einstieg_Ausbildung_Startseite_1920x1440.jpg?rev=8f00b2145fe14f52a608384b504feb3d&amp;extension=webp&amp;w=50" height="1440" width="1920" data-test="mediaImage" alt="Rund um die Ausbildung">
    </picture>
    <div class="card__bottom">
      <h3>Rund um die Ausbildung</h3>
      <p>Damit du von Anfang an ganz vorne mitfährst. Erfahre, was eine Ausbildung bei <nobr>Porsche</nobr> ausmacht.</p>
      <p-link href="#">Mehr erfahren</p-link>
    </div>
  </div>

  <div class="card">
    <picture>
      <source media="(max-width: 480px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_VR-Brille.jpg?rev=4013e8d07af54e06ae187cdfe25fbc32&amp;extension=webp&amp;w=480">
      <source media="(max-width: 760px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_VR-Brille.jpg?rev=4013e8d07af54e06ae187cdfe25fbc32&amp;extension=webp&amp;w=760">
      <source media="(max-width: 1000px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_VR-Brille.jpg?rev=4013e8d07af54e06ae187cdfe25fbc32&amp;extension=webp&amp;w=1000">
      <source media="(max-width: 1920px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_VR-Brille.jpg?rev=4013e8d07af54e06ae187cdfe25fbc32&amp;extension=webp&amp;w=480">
      <source media="(min-width: 1920px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_VR-Brille.jpg?rev=4013e8d07af54e06ae187cdfe25fbc32&amp;extension=webp&amp;w=480">
      <img src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_VR-Brille.jpg?rev=4013e8d07af54e06ae187cdfe25fbc32&amp;extension=webp&amp;w=50" height="600" width="800" data-test="mediaImage" alt="Duales Studium">
    </picture>
    <div class="card__bottom">
      <h3>Duales Studium</h3>
      <p>Theorie und Praxis im Wechsel: <nobr>Porsche</nobr> bietet in Kooperation mit der DHBW verschiedene Studiengänge an.</p>
      <p-link href="#">Mehr erfahren</p-link>
    </div>
  </div>

  <div class="card">
    <picture>
      <source media="(max-width: 480px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_teaser_Schueler_05_Berufsorientierung.jpg?rev=967edcc48fa7470aa6727c680c85fbb2&amp;extension=webp&amp;w=480">
      <source media="(max-width: 760px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_teaser_Schueler_05_Berufsorientierung.jpg?rev=967edcc48fa7470aa6727c680c85fbb2&amp;extension=webp&amp;w=760">
      <source media="(max-width: 1000px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_teaser_Schueler_05_Berufsorientierung.jpg?rev=967edcc48fa7470aa6727c680c85fbb2&amp;extension=webp&amp;w=1000">
      <source media="(max-width: 1920px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_teaser_Schueler_05_Berufsorientierung.jpg?rev=967edcc48fa7470aa6727c680c85fbb2&amp;extension=webp&amp;w=480">
      <source media="(min-width: 1920px)" srcset="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_teaser_Schueler_05_Berufsorientierung.jpg?rev=967edcc48fa7470aa6727c680c85fbb2&amp;extension=webp&amp;w=480">
      <img src="https://assets-v2.porsche.com/-/media/Project/PCOM/SharedSite/JobsAndCareers/Home/4-3_teaser_Schueler_05_Berufsorientierung.jpg?rev=967edcc48fa7470aa6727c680c85fbb2&amp;extension=webp&amp;w=50" height="600" width="800" data-test="mediaImage" alt="Schülerpraktikum">
    </picture>
    <div class="card__bottom">
      <h3>Schülerpraktikum</h3>
      <p>Du suchst Orientierung bei der Berufswahl? Schau unseren Mitarbeitern über die Schulter und bekomme einen Eindruck von deren Job.</p>
      <p-link href="#">Mehr erfahren</p-link>
    </div>
  </div>
</p-carousel>

<p-carousel heading="Some Heading" slides-per-page="3">
  ${this.slides}
</p-carousel>

<p-carousel slides-per-page="3">
  <h2 slot="heading">Slotted Heading with default styles</h2>
  ${this.slides}
</p-carousel>

<p-carousel heading="Some wrapped Heading" wrap-heading="true" slides-per-page="3">
  ${this.slides}
</p-carousel>

<p-carousel
  heading="Multiline Heading could be quite long especially on smaller screens but how would the carousel be accessible with out one?"
  slides-per-page="3"
>
  ${this.slides}
</p-carousel>

<p-carousel heading="Responsive slides per page" slides-per-page="{base: 3, s: 1, m: 2}">
  ${this.slides}
</p-carousel>

<p-carousel heading="Floating slides per page" slides-per-page="3.3">
  ${this.slides}
</p-carousel>

<p-carousel heading="Disabled pagination" slides-per-page="3" disable-pagination="true">
  ${this.slides}
</p-carousel>

<p-carousel heading="Responsive disabled pagination" slides-per-page="3" disable-pagination="{base: true, s: false, m: true}">
  ${this.slides}
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

    > div:not(.card) {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background: #00b0f4;
      height: 100px;
    }

    .demo {
      background: $pds-theme-light-background-surface;
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: $pds-theme-light-background-base;

      picture {
        display: block;
      }

      img {
        max-width: 100%;
        height: auto;
        vertical-align: middle;
      }

      h3 {
        margin: 0 0 $pds-spacing-small;
      }

      p {
        margin: 0 0 $pds-spacing-medium;
      }

      p-link {
        margin: auto auto 0 0;
      }
    }

    .card__bottom {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: $pds-spacing-large;
      @include pds-text-small;
    }
  }

  h2 {
    margin: 20px 0;
  }
</style>
