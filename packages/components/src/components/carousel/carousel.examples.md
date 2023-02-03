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
    <p-text :theme="theme">slidesPerPage:</p-text>
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

## Description

Right after the `heading`, an additional `description` can be added either via prop or named slot.

<Playground :markup="description" :config="config"></Playground>

## Rewind

By default, the `p-carousel` cycles by rewinding and fast forwarding from the last slide to the first slide and first
slide to the last slide as demonstrated in previous examples.  
This behavior can be disabled by specifying `rewind="false"` which also disables the prev/next buttons when on the
first/last slide.

<Playground :markup="rewind" :config="config"></Playground>

## Wrap Content

By default, the `p-carousel` takes up the available space which works for all scenarios where its parent has some
padding, e.g., when used within `p-content-wrapper`.  
In case its parent either does not provide some padding or the `p-carousel` really should go edge to edge, you cann use
the `wrapContent` property which internally applies the padding of `p-content-wrapper`.

<Playground :markup="wrapContent" :config="config"></Playground>

<!--
## Post Heading

If you want to place any additional elements between heading and slider, you can use the `post-heading` slot.

<Playground :markup="postHeading" :config="config"></Playground>
-->

## Disable Pagination

The pagination indicators underneath the slides can be removed via `disablePagination`. Also, on a per-breakpoint basis.

<Playground :markup="disablePagination" :config="config">
  <label>
    <p-text :theme="theme">disablePagination:</p-text>
    <select v-model="disablePaginationModel" aria-label="Select disablePagination mode">
      <option disabled>Select disablePagination mode</option>
      <option value="true">true</option>
      <option value="false">false</option>
      <option value="{ base: true, m: false }">{ base: true, m: false }</option>
    </select>
  </label>
</Playground>

## Align Header

The Heading and Description can be aligned via `alignHeader`.

<Playground :markup="alignHeader" :config="config">
  <label>
    <p-text :theme="theme">alignHeader:</p-text>
    <select v-model="alignHeaderModel" aria-label="Select alignHeader mode">
      <option disabled>Select alignHeader mode</option>
      <option value="left">left</option>
      <option value="center">center</option>
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
  <button type="button" @click="amountOfSlides++">Add slide</button>
  <button type="button" @click="amountOfSlides--">Remove last slide</button>
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

  basicHeading = "Some heading";
  basicDescription = "Some description";
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
  <h3 slot="heading">Some slotted heading</h3>
  ${this.getSlides(3)}
</p-carousel>`;

  description = `<p-carousel heading="${this.basicHeading}" description="${this.basicDescription}">
  ${this.getSlides(3)}
</p-carousel>

<p-carousel heading="${this.basicHeading}">
  <p slot="description">Some slotted description</p>
  ${this.getSlides(3)}
</p-carousel>`;

  rewind = `<p-carousel rewind="false" heading="${this.basicHeading}">
  ${this.getSlides(3)}
</p-carousel>`;

  wrapContent = `<p-carousel wrap-content="true" heading="${this.basicHeading}" description="${this.basicDescription}">
  ${this.getSlides(3)}
</p-carousel>`;

//   postHeading = `<p-carousel heading="${this.basicHeading}">
//   <p slot="post-heading">Some slotted content between heading and slider</p>
//   ${this.getSlides(3)}
// </p-carousel>`;

  disablePaginationModel = true;
  get disablePagination() {
    return `<p-carousel disable-pagination="${this.disablePaginationModel}" heading="${this.basicHeading}">
  ${this.getSlides(3)}
</p-carousel>`;
}
  alignHeaderModel = 'left';
  get alignHeader() {
    return `<p-carousel align-header="${this.alignHeaderModel}" heading="${this.basicHeading}" description="${this.basicDescription}">
      ${this.getSlides(3)}
      </p-carousel>`;
  }

  focusBehavior = `<p-carousel heading="${this.basicHeading}">
  ${this.getSlides(4)
    .replace(/Slide 1/, '$& with a <p-link href="#">Link</p-link>')
    .replace(/Slide 2/, '$& with a <p-button type="button">Button</p-button>')
    .replace(/Slide 3/, '$& with a <a href="#">Link</a>')
    .replace(/Slide 4/, '$& with a <button type="button">button</button>')
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
