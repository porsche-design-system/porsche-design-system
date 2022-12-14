<div class="typography-grid">
  <p-headline variant="large-title"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet.</p-headline
  >
  <p-headline variant="headline-1"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet.</p-headline
  >
  <p-headline variant="headline-2"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet.</p-headline
  >
  <p-headline variant="headline-3"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet.</p-headline
  >
  <p-headline variant="headline-4"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet.</p-headline
  >
  <p-headline variant="headline-5"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet.</p-headline
  >
  <p-headline variant="inherit" style="font-size: 50px"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet.</p-headline
  >
</div>

<div class="typography-grid">
  <p-text size="x-small"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines
    Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer
    verwandelt.</p-text
  >
  <p-text size="small"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines
    Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer
    verwandelt.</p-text
  >
  <p-text size="medium"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines
    Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer
    verwandelt.</p-text
  >
  <p-text size="large"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines
    Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer
    verwandelt.</p-text
  >
  <p-text size="x-large"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines
    Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer
    verwandelt.</p-text
  >
  <p-text size="inherit" style="font-size: 50px"
    >Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens
    verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines
    Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer
    verwandelt.</p-text
  >
</div>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/utilities/scss';

  .typography-grid {
    display: grid;
    grid-gap: 4rem;
    margin: 2rem;
    
    p-headline,
    p-text {
      &::before {
        @include pds-text-x-small;
        display: block;
        content: 'p-headline - variant: "' attr(variant) '"';
        color: deeppink;
      }
    }
  
    p-text::before {
      content: 'p-text - size: "' attr(size) '"';
    }

    @include pds-media-query-min('l') {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include pds-media-query-min('xl') {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
