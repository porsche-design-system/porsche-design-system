<ComponentHeading name="Link Tile Model Signature"></ComponentHeading>

The `p-link-tile-model-signature` is a navigational component that displays a provided image to tease content and
provides two `p-link's` to navigate to further information within one container. In addition to the `p-link-tile` it
shows one of the model signatures at the top.

**Note:** The component does not take care of processing and aligning the image.

<TableOfContents></TableOfContents>

## Basic

An `<img/>`, `<picture/>` or `<video/>` tag has to be provided as default slot.

It is required to have two `p-link` components as named slots, `slot="primary"` and `slot="secondary"`.  
The `heading` property is required, too. It is used as a teaser with a more detailed description of where the link leads
to.

#### Supported named slots:

- `slot="header"`: Renders a header section above the content area but underneath the model signature.

<Playground :markup="basic" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, placing textual contents above an image or video can easily lead to **contrast issues**. Though we are
providing a scalable background gradient to reduce the risk of low contrasts between foreground text and background
image, there still can occur issues with color contrast ratios, especially if different aspect ratios for multiple
viewport sizes are used. So, always **check readability** and play around with the `size` and `weight` properties to
achieve the best results.

In case a video background is used, the component checks once during initialization whether **reduced motion** is
enabled in the **operating system settings** and prevents the `<video autoplay loop />` attribute from working to
improve accessibility & UX. In addition, the slotted video should have no audio or is muted by `<video muted />`. Also
keep in mind that long videos or videos in general might increase the page load time. The video content should support
the CTA instead of distracting from it. To support screen reader users it's recommended to define an alternative video
description `<video aria-label="Some video description"" />`.

To provide more contextual HTML semantics you can use the `headingTag` property to change the heading parent from
default `h2` to e.g. `h3`.

## Description

If you want to add additional text like a price tag, use the `description` property.

<Playground :markup="description" :config="config"></Playground>

## Weight

The `weight` property changes the font weight of the heading.

<Playground :markup="weightMarkup" :config="config">
  <PlaygroundSelect v-model="weight" :values="weights" name="weight"></PlaygroundSelect>
</Playground>

## Link Direction

The `link-direction` property defines the direction of the main and cross axis of the links. The default is
`{base: 'row', xs: 'column'}` showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal
row from breakpoint `xs`.

<Playground :markup="linkDirectionMarkup" :config="config">
  <PlaygroundSelect v-model="linkDirection" :values="linkDirections" name="linkDirection"></PlaygroundSelect>
</Playground>

## Aspect Ratio

The component takes its height from the width provided and places the image via CSS `object-fit: cover`. Therefore, you
can change the dimensions by using different aspect ratios.

<Playground :markup="aspectRatioMarkup">
  <PlaygroundSelect v-model="aspectRatio" :values="aspectRatios" name="aspectRatio"></PlaygroundSelect>
</Playground>

## Model

<Playground :markup="modelMarkup">
  <PlaygroundSelect v-model="model" :values="models" name="model"></PlaygroundSelect>
</Playground>

## Hyphens

It is possible to overwrite the hyphens style on the host element and use 'soft' hyphens. However, please note that
hyphenation behavior can vary depending on the browser and the language of the text. In some cases, it may be necessary
to set the appropriate lang attribute on your HTML element to ensure that hyphenation works correctly for the desired
language.

<Playground :markup="hyphenMarkup">
  <PlaygroundSelect v-model="hyphen" :values="hyphens" name="hyphens"></PlaygroundSelect>
</Playground>

## UI behaviour

The component is able to break out of its aspect ratio in case content overflows to be accessibility compliant (see
first row in example).

Additionally, the component is able to align to the highest CSS Grid child independent of the aspect ratio when used in
CSS Grid context (see second row in example).

<Notification heading="Browser Support Limitation" heading-tag="h3" state="warning">
  Currently, Safari is only able to align the height per CSS Grid row as long as the content does not overflow.
</Notification>

<Playground :markup="gridMarkup"></Playground>

## Framework Routing

While the `p-link-tile-model-signature` supports slotted `a` links within its required `p-link` children, clicking
anything besides the two `p-link` elements needs to be handled manually.

<Playground>
  <p-link-tile-model-signature heading="Some heading" aspect-ratio="16:9" @click="onClick">
    <img :src="imgSrc" width="3000" height="2000" alt="Some alt text" />
    <p-link slot="primary"><a href="https://porsche.com/#primary">Primary label</a></p-link>
    <p-link slot="secondary"><a href="https://porsche.com/#secondary">Secondary label</a></p-link>
  </p-link-tile-model-signature>
  <p-text>clicked href: {{clickedHref}}</p-text>
</Playground>

The easiest way to achieve this is to add a `click` event listener on the component itself, call
`event.preventDefault()` once the event handler is invoked and read the `href` value from the target.

```ts
const linkEl = document.querySelector('p-link-tile-model-signature');
linkEl.addEventListener('click', (event) => {
  event.preventDefault();
  const { href } = event.composedPath()[0];
  history.pushState({}, '', href); // or whatever your routing library provides as a hook or service
});
```

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { TILE_WEIGHTS, TILE_ASPECT_RATIOS, TILE_ASPECT_RATIOS_DEPRECATED } from '../../utils'; 
import { MODEL_SIGNATURE_MODELS } from '../model-signature/model-signature-utils'; 
import { GROUP_DIRECTIONS } from '../../styles/group-direction-styles'; 

@Component
export default class Code extends Vue {
  config = { spacing: 'block' };
  imgSrc = require('@/assets/lights.jpg');
  img = `<img src="${this.imgSrc}" alt="Some image description" />`;
  primaryLink = '<p-link slot="primary" href="https://porsche.com/#primary">Primary label</p-link>';
  secondaryLink = '<p-link slot="secondary" href="https://porsche.com/#secondary">Secondary label</p-link>';

  basic = `<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;">
  <p-link-tile-model-signature heading="Some heading">
    <p-tag slot="header" theme="dark" color="background-frosted" compact="true">Some tag</p-tag>
    ${this.img}
    ${this.primaryLink}
    ${this.secondaryLink}
  </p-link-tile-model-signature>
  <p-link-tile-model-signature heading="Some heading">
    <p-tag slot="header" theme="dark" color="background-frosted" compact="true">Some tag</p-tag>
    <video
      poster="https://porsche-design-system.github.io/porsche-design-system/assets/ocean.jpg"
      src="https://porsche-design-system.github.io/porsche-design-system/assets/ocean.mp4"
      loop
      muted
      autoplay
      aria-label="Some video description"
    ></video>
    ${this.primaryLink}
    ${this.secondaryLink}
  </p-link-tile-model-signature>
</div>`;

  weight = 'semi-bold';
  weights = [...TILE_WEIGHTS, "{ base: 'semi-bold', m: 'regular' }"];
  get weightMarkup() {
    return`<p-link-tile-model-signature heading="Some heading" weight="${this.weight}" description="Some description">
  ${this.img}
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>`;
  };

  description = `<p-link-tile-model-signature heading="Some heading" description="Some description">
  ${this.img}
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>`;


  linkDirection = 'column';
  linkDirections = [...GROUP_DIRECTIONS, "{ base: 'row', m: 'column' }"];
  get linkDirectionMarkup() {
    return`<p-link-tile-model-signature heading="Some heading" link-direction="${this.linkDirection}">
  ${this.img}
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>`;
  };

  aspectRatio = '1/1';
  aspectRatios = [...TILE_ASPECT_RATIOS.map(item => TILE_ASPECT_RATIOS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item), "{ base: '3/4', m: '9/16' }"];
  get aspectRatioMarkup() {
    return`<p-link-tile-model-signature heading="Some Heading" aspect-ratio="${this.aspectRatio}">
  ${this.img}
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>`;
  };

  model = 'macan';
  models = MODEL_SIGNATURE_MODELS;
  get modelMarkup() {
    return`<p-link-tile-model-signature heading="Some Heading" model="${this.model}">
  ${this.img}
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>`;
  };

  hyphen = 'manual';
  hyphens = ['auto', 'manual', 'none'];
  get hyphenMarkup() {
    return `<p-link-tile-model-signature
  heading="A very special limited extra&shy;ordinarily Porsche"
  description="Some Description for a very special limited extra&shy;ordinarily Porsche"
  style="${this.hyphen !== 'auto' ? 'hyphens: ' + this.hyphen + '; ' : ''}font-size: 45px;"
>
  ${this.img}
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>`};

 get gridMarkup() {
    return `<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;">
  <p-link-tile-model-signature
    aspect-ratio="4/3"
    heading="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
  >
    <p-tag slot="header" theme="dark" color="background-frosted" compact="true">4/3</p-tag>
    ${this.img}
    ${this.primaryLink}
    ${this.secondaryLink}
  </p-link-tile-model-signature>
  <p-link-tile-model-signature aspect-ratio="4/3" heading="Some description">
    <p-tag slot="header" theme="dark" color="background-frosted" compact="true">4/3</p-tag>
    ${this.img}
    ${this.primaryLink}
    ${this.secondaryLink}
  </p-link-tile-model-signature>
  <p-link-tile-model-signature aspect-ratio="1/1" heading="Some description">
    <p-tag slot="header" theme="dark" color="background-frosted" compact="true">1/1</p-tag>
    ${this.img}
    ${this.primaryLink}
    ${this.secondaryLink}
  </p-link-tile-model-signature>
  <p-link-tile-model-signature aspect-ratio="9/16" heading="Some description">
    <p-tag slot="header" theme="dark" color="background-frosted" compact="true">9/16</p-tag>
    ${this.img}
    ${this.primaryLink}
    ${this.secondaryLink}
  </p-link-tile-model-signature>
  <p-link-tile-model-signature aspect-ratio="1/1" heading="Some description">
    <p-tag slot="header" theme="dark" color="background-frosted" compact="true">1/1</p-tag>
    ${this.img}
    ${this.primaryLink}
    ${this.secondaryLink}
  </p-link-tile-model-signature>
</div>`};

  clickedHref = '';
  onClick(event){
    event.preventDefault();
    const { href } = event.composedPath()[0];
    this.clickedHref = href;
  }
}
</script>

<style scoped lang="scss">
  :deep(.demo > p-link-tile-model-signature) {
    max-width: 400px;
  }
</style>
