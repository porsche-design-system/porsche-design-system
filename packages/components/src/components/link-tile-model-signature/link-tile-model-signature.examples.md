# Link Tile Model Signature

The `p-link-tile-model-signature` is a navigational component that displays a provided image to tease content and
provides two `links` to navigate to further information within one container. In addition to the `p-link-tile` it shows
one of the `model signatures` at the top.

**Note:** The component does not take care of processing and aligning the image.

<TableOfContents></TableOfContents>

## Basic

An `img` or `picture` tag has to be provided in the slot of the `p-link-tile-model-signature` component.

To work properly the `p-link-tile-model-signature` component needs two `p-link` components as named slots,
'slot="primary"' and 'slot="secondary"', which are mandatory. Also the `heading` property is required. It is used as a
teaser with a more detailed description of where the link leads to.

<Playground :markup="basic" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, placing textual contents above an image can easily lead to **contrast issues**. Though we are providing a
scalable background gradient to reduce the risk of low contrasts between foreground text and background image, there
still can occur issues with color contrast ratios, especially if different aspect ratios for multiple viewport sizes are
used. So, always **check readability** and play around with the `weight` property to achieve the best results.

To provide more contextual HTML semantics you can use the `headingTag` property to change the heading parent from
default `h2` to e.g. `h3`.

---

## Description

If your heading needs further explanation or you want to provide additional information like e.g. a price tage, use the
`description` property.

<Playground :markup="description" :config="config"></Playground>

---

## Weight

The `weight` property changes the font weight of the heading.

<Playground :markup="weightMarkup" :config="config">
  <SelectOptions v-model="weight" :values="weights" name="weight"></SelectOptions>
</Playground>

---

## Link Direction

The `link-diretion` property defines the direction of the main and cross axis of the links. The default is "{base:
'row', xs: 'column'}" showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from
breakpoint 'xs'.

<Playground :markup="linkDirectionMarkup" :config="config">
  <SelectOptions v-model="linkDirection" :values="linkDirections" name="linkDirection"></SelectOptions>
</Playground>

---

## Aspect Ratio

The component takes its height from the width provided and places the image via CSS `object-fit: cover`. Therefore, you
can change the height by using different aspect ratios.

<Playground :markup="aspectRatioMarkup">
  <SelectOptions v-model="aspectRatio" :values="aspectRatios" name="aspectRatio"></SelectOptions>
</Playground>

---

## Model

<Playground :markup="modelMarkup">
  <SelectOptions v-model="model" :values="models" name="model"></SelectOptions>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {LINK_TILE_ASPECT_RATIOS, LINK_TILE_WEIGHTS_WITHOUT_DEPRECATED} from '../link-tile/link-tile-utils'; 
import { MODEL_SIGNATURE_MODELS } from '../model-signature/model-signature-utils'; 
import {LINK_BUTTON_GROUP_DIRECTIONS} from "../../styles/link-button-group-direction-styles"; 

@Component
export default class Code extends Vue {
  config = { spacing: 'block' };
  imgAttributes = 'width="3000" height="2000" alt="Some alt text"';
  primaryLink = '<p-link slot="primary" href="https://www.porsche.com">Primary label</p-link>';
  secondaryLink = '<p-link slot="secondary" href="https://www.porsche.com">Secondary label</p-link>';

  basic = `<p-link-tile-model-signature
  heading="Some heading"
>
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>
<p-link-tile-model-signature
  heading="Some heading"
>
  <picture>
    <source media="(min-width:400px)" srcset="${require('@/assets/image-grid.png')}" />
    <img src="${require('@/assets/image-grid-violet.png')}" ${this.imgAttributes} />
  </picture>
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>`;

  weight = 'semi-bold';
  weights = [...LINK_TILE_WEIGHTS_WITHOUT_DEPRECATED, "{ base: 'semi-bold', m: 'regular' }"];
  get weightMarkup() {
    return`<p-link-tile-model-signature
  heading="Some heading"
  weight="${this.weight}"
>
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>
<p-link-tile-model-signature
  heading="Some heading"
  weight="${this.weight}"
  description="Some description"
>
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>`
  };

  description = `<p-link-tile-model-signature
  heading="Some heading"
  description="Some description"
>
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>`;


  linkDirection = 'row';
  linkDirections = [...LINK_BUTTON_GROUP_DIRECTIONS, "{ base: 'row', m: 'column' }"];
  get linkDirectionMarkup() {
    return`<p-link-tile-model-signature
  heading="Some heading"
  link-direction="${this.linkDirection}"
>
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile-model-signature>`
  };

  aspectRatio = '9:16';
  aspectRatios = [...LINK_TILE_ASPECT_RATIOS, "{ base: '3:4', s: '1:1', m: '16:9' }"];
  get aspectRatioMarkup() {
    return`<p-link-tile-model-signature 
heading="Some Heading"
aspect-ratio="${this.aspectRatio}">
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile>`
  };

  model = '911';
  models = [...MODEL_SIGNATURE_MODELS, "{ base: '3:4', s: '1:1', m: '16:9' }"];
  get modelMarkup() {
    return`<p-link-tile-model-signature 
heading="Some Heading"
model="${this.model}">
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
  ${this.primaryLink}
  ${this.secondaryLink}
</p-link-tile>`
  };
}
</script>

<style scoped lang="scss">
  :deep(p-link-tile-model-signature) {
    max-width: 400px;
  }
</style>
