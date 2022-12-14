<template>
  <div class="main-app">
    <div class="type-scale">
      <p-headline ref="largeTitle" variant="large-title"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet.</p-headline
      >
      <p-headline ref="headline1" variant="headline-1"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet.</p-headline
      >
      <p-headline ref="headline2" variant="headline-2"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet.</p-headline
      >
      <p-headline ref="headline3" variant="headline-3"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet.</p-headline
      >
      <p-headline ref="headline4" variant="headline-4"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet.</p-headline
      >
      <p-headline ref="headline5" variant="headline-5"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet.</p-headline
      >
      <p-headline ref="headlineInherit" variant="inherit" style="font-size: 50px"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet.</p-headline
      >

      <p-text ref="textXSmall" size="x-small"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens
        aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.</p-text
      >
      <p-text ref="textSmall" size="small"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens
        aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.</p-text
      >
      <p-text ref="textMedium" size="medium"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens
        aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.</p-text
      >
      <p-text ref="textLarge" size="large"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens
        aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.</p-text
      >
      <p-text ref="textXLarge" size="x-large"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens
        aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.</p-text
      >
      <p-text ref="textInherit" size="inherit" style="font-size: 50px"
        >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
        verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens
        aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.</p-text
      >
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { componentsReady } from '@porsche-design-system/components-js';

  @Component
  export default class ExampleTypeScale extends Vue {
    async mounted(): Promise<void> {
      await componentsReady();
      this.setTypeScaleInfoOnRefs();
      window.addEventListener('resize', this.setTypeScaleInfoOnRefs);
    }

    unmounted() {
      window.removeEventListener('resize', this.setTypeScaleInfoOnRefs);
    }

    private setTypeScaleInfoOnRefs(): void {
      for (const host of Object.values(this.$refs)) {
        const el = (host as HTMLElement).shadowRoot?.firstElementChild as HTMLElement;
        const { fontSize, lineHeight } = window.getComputedStyle(el);

        (host as HTMLElement)?.setAttribute('data-font-size', fontSize);
        (host as HTMLElement)?.setAttribute('data-line-height', lineHeight);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';

  .main-app {
    @include pds-grid;
  }

  .type-scale {
    grid-area: 1 / content-start / 1 / content-end;
    display: grid;
    grid-gap: $pds-grid-gap;

    @include pds-media-query-min('l') {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include pds-media-query-min('xl') {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  p-headline,
  p-text {
    &::before {
      @include pds-text-x-small;
      display: block;
      content: 'p-headline - variant: "' attr(variant) '" | ' attr(data-font-size) '/' attr(data-line-height) '';
      color: deeppink;
    }
  }

  p-text::before {
    content: 'p-text - size: "' attr(size) '" | ' attr(data-font-size) '/' attr(data-line-height) '';
  }
</style>
