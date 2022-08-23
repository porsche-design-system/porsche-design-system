# Carousel

The `p-carousel` component allows related or similar content to be consumed on a step by step basis with a better
overview than just showing them in a grid or as a list. The reason for this is, that only a certain amount of slides is
visible at the same time.

Therefore, the `p-carousel`'s content has to be divided into multiple parts or slides.  
The amount of slides visible can be specified on a per-breakpoint basis.

<TableOfContents></TableOfContents>

## Basic

Without any additional configuration, the `p-carousel` displays a single slide simultaneously.

<Playground :markup="basic" :config="config"></Playground>

## Slides per Page

The amount of slides visible at the same time can be specified by setting the `slidesPerPage` property.  
The value can either be a static number, or a breakpoint customizable object.

<Playground :markup="slidesPerPage" :config="config">
  <label>
    slidesPerPage:
    <select v-model="slidesPerPageModel" aria-label="Select slidesPerPage mode">
      <option disabled>Select slidesPerPage mode</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="{ base: 1, s: 2, m: 3 }">{ base: 1, m: 2, l: 3 }</option>
    </select>
  </label>
</Playground>

## Heading

In order to have an accessible `p-carousel`, it is mandatory to have a `heading` either set via property or by having a
named slot.

<Playground :markup="heading" :config="config"></Playground>

## Wrap Heading

By default, the `p-carousel` takes up the available space which works for all scenarios where its parent has some
padding, e.g., when used within `p-content-wrapper`.  
In case its parent either does not provide some padding or the `p-carousel` really should go edge to edge, both the
heading and navigation controls would be positioned right on the edge. Do avoid this, use the `wrapHeading` property
which internally applies the padding of `p-content-wrapper`.

<Playground :markup="wrapHeading" :config="config"></Playground>

## Overflow visible

If you want to see the previous and next slide that are naturally outside the component, you can set
`overflow-visible="true"`.  
But make sure, that your entire page does not become horizontally scrollable by specifying the style
`overflow-x: hidden` somewhere up your DOM hierarchy.

<Playground :markup="overflowVisible" :config="{ ...config, overflowX: 'hidden' }"></Playground>

## Disable Pagination

The pagination indicators underneath the slides can be removed via `disablePagination`. Also, on a per-breakpoint basis.

<Playground :markup="disablePagination" :config="config">
  <label>
    disablePagination:
    <select v-model="disablePaginationModel" aria-label="Select disablePagination mode">
      <option disabled>Select disablePagination mode</option>
      <option value="true">true</option>
      <option value="false">false</option>
      <option value="{ base: true, m: false }">{ base: true, m: false }</option>
    </select>
  </label>
</Playground>

## Focus Behavior

In order to not have focusable elements that are offscreen, the `p-carousel` adds the
<a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert" target="_blank">`inert`</a> attribute on
them.  
For browsers that don't support the `inert` attribute, yet, the component adds a `tabindex="-1"` attribute on `a`,
`button`, `p-button`, `p-button-pure`, `p-link` and `p-link-pure` elements as a fallback

<Playground :markup="focusBehavior" :config="config"></Playground>

## Event Handling

Whenever the `p-carousel` slides, the `carouselChange` is emitted containing both, the `activeIndex` and
`previousIndex`.

<Playground :frameworkMarkup="eventHandlingExamples" :config="{ ...config, withoutDemo: true }">
  <p-carousel :theme="theme" :heading="basicHeading" v-html="getSlides(3)" @carouselChange="(e) => lastEventDetail = e.detail" style="margin: 0 0 1rem">
  </p-carousel>
  <p-text :theme="theme">Last event detail: {{lastEventDetail}}</p-text>
</Playground>

## Add/remove slides

Slides can be added and removed dynamically.

<Playground :frameworkMarkup="addRemoveSlidesExamples" :config="{ ...config, withoutDemo: true }">
  <p-carousel :theme="theme" :heading="basicHeading" slides-per-page="2" v-html="getSlides(amountOfSlides)" style="margin: 0 0 1rem">
  </p-carousel>
  <button type="button" @click="amountOfSlides++">Add Slide</button>
  <button type="button" @click="amountOfSlides--">Remove Slide</button>
</Playground>

## Internationalization (i18n)

Default wordings for screen readers can be overridden or translated by passing an object to the `intl` property.  
It has the following defaults:

```ts
type CarouselInternationalization = {
  prev: 'Previous slide'; // aria-label of prev button
  next: 'Next slide'; // aria-label of next button
  first: 'Go to first slide'; // aria-label of next button when on last slide
  last: 'Go to last slide'; // aria-label of prev button when on first slide
  slideLabel: '%s of %s'; // aria-label of each slide as "1 of 6"
  slide: 'slide'; // aria-roledescription of each slide
};
```

<Playground :markup="internationalization" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import type { Theme } from '@/models';
import { getCarouselCodeSamples } from '@porsche-design-system/shared';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  get theme(): Theme {
    return this.$store.getters.theme;
  }

  basicHeading = "Some Heading";
  getSlides = (amount = 6) => Array.from(Array(amount)).map((_, i) => `<div>Slide ${i+1}</div>`).join('\n  ');

  basic = `<p-carousel heading="${this.basicHeading}">
  ${this.getSlides(4)}
</p-carousel>`;

  slidesPerPageModel = 2;
  get slidesPerPage() {
    return `<p-carousel slides-per-page="${this.slidesPerPageModel}" heading="${this.basicHeading}">
  ${this.getSlides()}
</p-carousel>`;
  }

  heading = `<p-carousel heading="${this.basicHeading}">
  ${this.getSlides(3)}
</p-carousel>

<p-carousel>
  <h3 slot="heading">Some slotted Heading</h3>
  ${this.getSlides(3)}
</p-carousel>`;

  wrapHeading = `<p-carousel wrap-heading="true" heading="${this.basicHeading}">
  ${this.getSlides(3)}
</p-carousel>`;

  overflowVisible = `<p-carousel overflow-visible="true" heading="${this.basicHeading}" style="padding: 0 5vw">
  ${this.getSlides(3)}
</p-carousel>`;

  disablePaginationModel = true;
  get disablePagination() {
    return `<p-carousel disable-pagination="${this.disablePaginationModel}" heading="${this.basicHeading}">
  ${this.getSlides(3)}
</p-carousel>`;
}

  focusBehavior = `<p-carousel heading="${this.basicHeading}">
  ${this.getSlides(4)
    .replace(/Slide 1/, '$& with a <p-link href="#">Link</p-link>')
    .replace(/Slide 2/, '$& with a <p-button>Button</p-button>')
    .replace(/Slide 3/, '$& with a <a href="#">Link</a>')
    .replace(/Slide 4/, '$& with a <button>button</button>')
  }
</p-carousel>`;

  lastEventDetail = 'none';
  eventHandlingExamples = getCarouselCodeSamples('example-events');

  amountOfSlides = 3;
  addRemoveSlidesExamples = getCarouselCodeSamples('example-dynamic-slides');

  internationalization = `<p-carousel intl="{ slideLabel: 'Slide %s von %s', prev: 'Vorheriger Slide', next: 'Nächster Slide', first: 'Zum ersten Slide', last: 'Zum letzten Slide' }" heading="${this.basicHeading}">
  ${this.getSlides(3)}
</p-carousel>
`;
}
</script>

<style scoped lang="scss">
  :deep(p-carousel div) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #00b0f4;
    height: 150px;
  }

  button {
    padding: .5rem 1rem;

    + button { 
      margin: 0 0 0 .5rem;
    }
  }
</style>
