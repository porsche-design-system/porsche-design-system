<ComponentHeading name="Carousel"></ComponentHeading>

The `p-carousel` component allows related or similar content to be consumed on a step by step basis with a better
overview than just showing them in a grid or as a list. The reason for this is, that only a certain amount of slides is
visible at the same time.

Therefore, the `p-carousel`'s content has to be divided into multiple parts or slides.  
The amount of slides visible can be specified on a per-breakpoint basis.

<Notification heading="Layout hint" state="warning">
  The component can only be used with the full viewport width. The alignment of its content can be controlled 
  by the <code>width</code> prop, which is in sync with the <b><a href="styles/grid">Porsche Grid</a></b>.<br><br>
  Therefore, the following examples only work in fullscreen after clicking the <strong>Maximize</strong> buttons.
</Notification>

<TableOfContents></TableOfContents>

## Basic

Without any additional configuration, the `p-carousel` displays a single slide simultaneously.

<Playground :markup="basic" :config="config"></Playground>

## Slides per Page

The amount of slides visible at the same time can be specified by setting the `slidesPerPage` property.  
The value can either be a static number, or a breakpoint customizable object.

<Playground :markup="slidesPerPageMarkup" :config="config">
  <PlaygroundSelect v-model="slidesPerPage" :values="slidesPerPages" name="slidesPerPage"></PlaygroundSelect>
</Playground>

## Slides with flexible widths

In case you want to have slides with different widths you can use `slidesPerPage` with a value of `auto`.

<Notification heading="Attention" state="warning">
 It is <strong>crucial</strong> that each slide has explicit dimensions by specifying their width via CSS.
</Notification>

<Playground :markup="slidesPerPageAutoMarkup" :config="config"></Playground>

## Heading

The `heading` of `p-carousel` can be either set via property or by having a named slot. The heading size can be changed
by using the property `headingSize`. If no heading is provided, the `aria` property should be used to provide an
accessibility label e.g. `aria="{ 'aria-label': 'Some heading' }"`.

<Playground :markup="headingSizeMarkup" :config="config">
  <PlaygroundSelect v-model="headingSize" :values="headingSizes" name="headingSize"></PlaygroundSelect>
</Playground>

## Description

Right after the `heading`, an additional `description` can be added either via prop or named slot.

<Playground :markup="description" :config="config"></Playground>

## Controls

Next to `prev/next` buttons, a slot `controls` can be added via named slot.

<Playground :markup="controls" :config="config"></Playground>

## Align Header

The heading and description can be aligned via `alignHeader`.

<Notification heading="Deprecation hint" state="warning">
  Following alignments have been deprecated and will be removed with the next major release: "left".
</Notification>

<Playground :markup="alignHeaderMarkup" :config="config">
  <PlaygroundSelect v-model="alignHeader" :values="alignHeaders" name="alignHeader"></PlaygroundSelect>
</Playground>

## Width

Defines horizontal spacing which is aligned with the [Porsche Grid](styles/grid).

<Playground :markup="widthMarkup" :config="config">
  <PlaygroundSelect v-model="width" :values="widths" name="width"></PlaygroundSelect>
</Playground>

## Wrap Content (deprecated)

<Notification heading="Important note" state="warning">
  This property is deprecated and has no effect anymore. Therefor, it will be removed with the next major release.
</Notification>

## Rewind

By default, the `p-carousel` cycles by rewinding and fast forwarding from the last slide to the first slide and first
slide to the last slide as demonstrated in previous examples.  
This behavior can be disabled by specifying `rewind="false"` which also disables the prev/next buttons when on the
first/last slide.

<Playground :markup="rewind" :config="config"></Playground>

## Remove Pagination

The pagination indicators underneath the slides can be removed via `pagination="false"`.

<Notification heading="Deprecation hint" state="warning">
  The <code>disablePagination</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>pagination</code> property instead.
</Notification>

<Playground :markup="paginationMarkup" :config="config">
  <PlaygroundSelect v-model="pagination" :values="paginations" name="pagination"></PlaygroundSelect>
</Playground>

## Jump to slide (activeSlideIndex)

To control the `p-carousel` from the outside you can specify its `activeSlideIndex` initially but also later.

<Playground :frameworkMarkup="jumpToSlideExamples" :config="{ ...config, withoutDemo: true }">
  <p-carousel :theme="theme" :heading="basicHeading" :active-slide-index="activeSlideIndex" v-html="getSlides(3)" @update="(e) => activeSlideIndex = e.detail.activeIndex" style="margin: 0 0 1rem">
  </p-carousel>
  <button v-for="(_, index) in Array(3)" :key="index" type="button" @click="activeSlideIndex = index" :disabled="activeSlideIndex === index">{{index + 1}}</button>
</Playground>

## Event Handling

Whenever the `p-carousel` slides, the `update` is emitted containing both, the `activeIndex` and `previousIndex`.

<Notification heading="Deprecation hint" state="warning">
  The <code>carouselChange</code> event has been deprecated and will be removed with the next major release.<br>
  Please use the <code>update</code> event instead.
</Notification>

<Playground :frameworkMarkup="eventHandlingExamples" :config="{ ...config, withoutDemo: true }">
  <p-carousel :theme="theme" :heading="basicHeading" v-html="getSlides(3)" @update="(e) => lastEventDetail = e.detail" style="margin: 0 0 1rem">
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

## Focus Behavior

<Playground :markup="focusBehavior" :config="config"></Playground>

## Custom Border Radius

By default, every carousel item gets a predefined border radius of "large" (`12px`). This can be changed via a custom
CSS property (see also [Border Styles](styles/border#styles)).

<Playground :markup="customBorderRadiusMarkup" :config="config">
  <PlaygroundSelect v-model="customBorderRadius" :values="customBorderRadii" name="borderRadius"></PlaygroundSelect>
</Playground>

## Skip Carousel Entries

Through the `skipLinkTarget` property, a skip link for keyboard users can be provided to give the possibility to skip
over all carousel entries. The skip link is only visible when it receives focus from the keyboard.

### <A11yIcon></A11yIcon> Accessibility hints

- The target of the skip link should point to the next heading or element right after the carousel
- Use the `skipLinkTarget` property if you have >5 carousel items

<Playground :markup="skip" :config="config"></Playground>

## Custom styling

The navigation of the `p-carousel`, which includes the prev/next buttons, has a filter property which can be overwritten
by a CSS Custom Property (aka CSS Variable):

```scss
// default CSS variable
--p-carousel-prev-next-filter: none;

// overwrite with CSS variable
p-carousel {
  --p-carousel-prev-next-filter: invert(1);
}
```

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import type { Theme } from '@/models';
import type { CarouselAlignHeader, CarouselHeadingSize, CarouselWidth } from './carousel-utils'; 
import { getCarouselCodeSamples } from '@porsche-design-system/shared';
import { CAROUSEL_ALIGN_HEADERS, CAROUSEL_ALIGN_HEADERS_DEPRECATED, CAROUSEL_WIDTHS  } from './carousel-utils';
import { borderRadius } from '@porsche-design-system/components-js/styles';

@Component
export default class Code extends Vue {
  config = { themeable: true, supportsFullWindow: true };

  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }

  basicHeading = "Some heading";
  basicDescription = "Some description";
  getSlides = (amount = 6, join = '\n  ') => Array.from(Array(amount), (_, i) => `<div>Slide ${i+1}</div>`).join(join);

  basic = `<p-carousel heading="${this.basicHeading}">
  ${this.getSlides(4)}
</p-carousel>`;

  slidesPerPage = 2;
  slidesPerPages = [1, 2, 3, 4, 5, '{ base: 1, s: 2, m: 3 }'];
  get slidesPerPageMarkup() {
    return `<p-carousel slides-per-page="${this.slidesPerPage}" heading="${this.basicHeading}">
  ${this.getSlides()}
</p-carousel>`;
  }

  slidesPerPageAutoMarkup = `<p-carousel slides-per-page="auto" heading="${this.basicHeading}">
  <div style="width: 10vw">Slide 1 <p>(10vw)</p></div>
  <div style="width: 200px">Slide 2 <p>(200px)</p></div>
  <div style="width: 100px">Slide 3 <p>(100px)</p></div>
  <div style="width: 40vw">Slide 4 <p>(40vw)</p></div>
  <div style="width: 150px">Slide 5 <p>(150px)</p></div>
  <div style="width: 50vw">Slide 6 <p>(50vw)</p></div>
</p-carousel>`;

  headingSize: CarouselHeadingSize = 'x-large';
  headingSizes = ['x-large', 'xx-large'];
  get headingSizeMarkup() {
    return `<p-carousel heading="${this.basicHeading}" heading-size="${this.headingSize}">
  ${this.getSlides(3)}
</p-carousel>

<p-carousel heading-size="${this.headingSize}">
  <h3 slot="heading">${this.basicHeading}</h3>
  ${this.getSlides(3)}
</p-carousel>`;
}

  description = `<p-carousel heading="${this.basicHeading}" description="${this.basicDescription}">
  ${this.getSlides(3)}
</p-carousel>

<p-carousel heading="${this.basicHeading}">
  <p slot="description">Some slotted description</p>
  ${this.getSlides(3)}
</p-carousel>`;

  controls = `<p-carousel heading="${this.basicHeading}" description="${this.basicDescription}">
  <div slot="controls">Some slotted controls</div>
  ${this.getSlides(3)}
</p-carousel>`;


  rewind = `<p-carousel rewind="false" heading="${this.basicHeading}">
  ${this.getSlides(3)}
</p-carousel>`;

  pagination = true;
  paginations = [false, true, '{ base: false, m: true }'];
  get paginationMarkup() {
    return `<p-carousel pagination="${this.pagination}" heading="${this.basicHeading}">
  ${this.getSlides(3)}
</p-carousel>`;
}

  alignHeader: CarouselAlignHeader = 'center';
  alignHeaders = CAROUSEL_ALIGN_HEADERS.map(item => CAROUSEL_ALIGN_HEADERS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item)
  get alignHeaderMarkup() {
    return `<p-carousel align-header="${this.alignHeader}" heading="${this.basicHeading}" description="${this.basicDescription}">
  <div slot="controls">Some slotted controls</div>  
  ${this.getSlides(3)}
</p-carousel>`;
}

  width: CarouselWidth = 'basic';
  widths = CAROUSEL_WIDTHS;
  get widthMarkup() {
    return `<p-carousel width="${this.width}" heading="${this.basicHeading}" description="${this.basicDescription}">
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

  activeSlideIndex = 1;
  jumpToSlideExamples = getCarouselCodeSamples('example-jump-to-slide');

  lastEventDetail = 'none';
  eventHandlingExamples = getCarouselCodeSamples('example-events');

  amountOfSlides = 3;
  addRemoveSlidesExamples = getCarouselCodeSamples('example-dynamic-slides');

  internationalization = `<p-carousel intl="{ slideLabel: 'Slide %s von %s', prev: 'Vorheriger Slide', next: 'Nächster Slide', first: 'Zum ersten Slide', last: 'Zum letzten Slide' }" heading="${this.basicHeading}">
  ${this.getSlides(3)}
</p-carousel>
`;

customBorderRadius = 'small';
customBorderRadii = [...Object.keys(borderRadius), 'zero'];
get customBorderRadiusMarkup() {
    return `<p-carousel heading="${this.basicHeading}" style="--p-carousel-border-radius: ${this.customBorderRadius !== 'zero' ? borderRadius[this.customBorderRadius] : 0}">
  ${this.getSlides(4)}
</p-carousel>`
};

skip = `<p-carousel heading="${this.basicHeading}" skip-link-target="components/carousel/examples#target">
  ${this.getSlides(4)}
</p-carousel>
<p-heading id="target" tag="h2" size="x-large">Next Heading</p-heading>`;

};
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  :deep(p-carousel div:not([slot="controls"])) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #00b0f4;
    height: 150px;
  }

  :deep(p-carousel) {
    margin-bottom: $pds-spacing-fluid-medium;
  }
  
  button {
    padding: .5rem 1rem;

    + button { 
      margin: 0 0 0 .5rem;
    }
  }

  :deep(.demo) {
    width: 100%
  }
</style>
