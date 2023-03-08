# Link Tile Model Signature

The `p-link-tile-model-signature` is a navigational component that displays a provided image to tease content and
provides two `links` to navigate to further information within one container. In addition to the `p-link-tile` it shows
one of the `model signatures` at the top.

**Note:** The component does not take care of processing and aligning the image.

<TableOfContents></TableOfContents>

## Basic

An `img` or `picture` tag has to be provided in the slot of the `p-link-tile-model-signature` component.

Additionally, the properties `description`, `primaryLinkProps` and `secondaryLinkProps`, which contain the `label`,
`href` and other `anchor props`, are required. The `description` property is used as a teaser with a more detailed
description of the link and where it leads to.

<Playground :markup="basic" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, placing textual contents above an image can easily lead to **contrast issues**. Though we are providing a
scalable background gradient to reduce the risk of low contrasts between foreground text and background image, there
still can occur issues with color contrast ratios, especially if different aspect ratios for multiple viewport sizes are
used. So, always **check readability** and play around with the `weight` property to achieve the best results.

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
import { LINK_TILE_ASPECT_RATIOS } from '../link-tile/link-tile-utils'; 
import { MODEL_SIGNATURE_MODELS } from '../model-signature/model-signature-utils'; 

@Component
export default class Code extends Vue {
  config = { spacing: 'block' };
  imgAttributes = 'width="3000" height="2000" alt="Some alt text"';

  basic = `<p-link-tile-model-signature
  description="Some description"
  primary-link-props="{ 'label': 'Primary label', 'href': 'https://www.porsche.com' }"
  secondary-link-props="{ 'label': 'Secondary label', 'href': 'https://www.porsche.com' }"
>
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile-model-signature>
<p-link-tile-model-signature
  description="Some description"
  sub-description="Some sub description"
  primary-link-props="{ 'label': 'Primary label', 'href': 'https://www.porsche.com' }"
  secondary-link-props="{ 'label': 'Secondary label', 'href': 'https://www.porsche.com' }"
>
  <picture>
    <source media="(min-width:400px)" srcset="${require('@/assets/image-grid.png')}" />
    <img src="${require('@/assets/image-grid-violet.png')}" ${this.imgAttributes} />
  </picture>
</p-link-tile-model-signature>`;

  aspectRatio = '4:3';
  aspectRatios = [...LINK_TILE_ASPECT_RATIOS, "{ base: '3:4', s: '1:1', m: '16:9' }"];
  get aspectRatioMarkup() {
    return`<p-link-tile-model-signature 
description="Some Description" 
primary-link-props="{ 'label': 'Primary label', 'href': 'https://www.porsche.com' }" 
secondary-link-props="{ 'label': 'Secondary label', 'href': 'https://www.porsche.com' }" 
aspect-ratio="${this.aspectRatio}">
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>`}

  model = '911';
  models = [...MODEL_SIGNATURE_MODELS, "{ base: '3:4', s: '1:1', m: '16:9' }"];
  get modelMarkup() {
    return`<p-link-tile-model-signature 
description="Some Description" 
primary-link-props="{ 'label': 'Primary label', 'href': 'https://www.porsche.com' }" 
secondary-link-props="{ 'label': 'Secondary label', 'href': 'https://www.porsche.com' }" 
model="${this.model}">
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>`}
}
</script>

<style scoped lang="scss">
  :deep(p-link-tile-model-signature) {
    max-width: 400px;
  }
</style>
