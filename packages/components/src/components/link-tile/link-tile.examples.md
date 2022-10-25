# Link Tile

The `p-link-tile` is a navigational component that displays a provided image to tease content and navigate to further
information within one container. The component takes its height from the width provided and places the image via
`object-fit cover`.

**Note:** The component does not take care of processing and aligning the image.

<TableOfContents></TableOfContents>

## Basic

An `img` or `picture` tag has to be provided in the slot of the `p-link-tile` component. Additionally, the properties
`href`, `description` and `label` are required. The `description` property is used as a teaser with a more detailed
description of the link and where it leads to. The `label` property is used to describe the anchor.

<Playground :markup="basic"></Playground>

## Aspect Ratio

The height of the component depends on the given aspect ratio.

<Playground :markup="aspectRatioMarkup">
  <label>
    <p-text>Select aspect ratio:</p-text>
    <select v-model="aspectRatio" aria-label="Select aspect ratio">
      <option disabled>Select aspect ratio</option>
      <option value="1:1">1:1</option>
      <option value="3:4">3:4</option>
      <option value="4:3">4:3</option>
      <option value="9:16">9:16</option>
      <option value="16:9">16:9</option>
      <option value="{base: '1:1', xs: '3:4', s: '4:3', m: '9:16', l: '16:9', xl: '1:1' }">responsive</option>
    </select>
  </label>
</Playground>

## Size

The `size` property changes the font size of the description.

<Playground :markup="sizeMarkup">
  <label>
    <p-text>Select font size:</p-text>
    <select v-model="size" aria-label="Select font size">
      <option disabled>Select font size</option>
      <option value="default">default</option>
      <option value="inherit">inherit</option>
      <option value="{base: 'inherit', xs: 'default', s: 'inherit', m: 'default', l: 'inherit', xl: 'default' }">responsive</option>
    </select>
  </label>
</Playground>

## Weight

The `weight` property changes the font weight of the description.

<Playground :markup="weightMarkup">
  <label>
    <p-text>Select font weight:</p-text>
    <select v-model="weight" aria-label="Select font weight">
      <option disabled>Select font weight</option>
      <option value="regular">regular</option>
      <option value="semibold">semibold</option>
      <option value="{base: 'semibold', xs: 'regular', s: 'semibold', m: 'regular', l: 'semibold', xl: 'regular' }">responsive</option>
    </select>
  </label>
</Playground>

## Gradient

By default, the `p-link-tile` takes care of the readability of the description by displaying a gradient. If the gradient
is not necessary for readability, the gradient can be removed by using the supplied boolean property `gradient`.

<Playground :markup="gradient"></Playground>

## Compact

A `p-link-tile` can be used without visible label text. It can be removed by the provided boolean property `compact`. If
used without visible label, it is mandatory for **accessibility** reasons to provide a descriptive label text for screen
readers.

<Playground :markup="compact"></Playground>

## Alignment

By default, the content container of the `p-link-tile` is aligned at the bottom. In the `compact` variant the content
container can be positioned at the top of the `p-link-tile` container. For this purpose the property `align="top"` must
be set.

<Playground :markup="align"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {

  aspectRatio = '4:3';
  size = 'default';
  weight = 'semibold';

  basic = `<div class="grid">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
  >
    <img src="${require('../../assets/porsche_beach.jpg')}" alt="Porsche on Beach" />
  </p-link-tile>
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
  >
    <picture>
      <source media="(min-width:500px)" srcset="${require('../../assets/porsche_factory.jpg')}"/>
      <img src="${require('../../assets/porsche_beach.jpg')}" alt="Porsche on Beach" />
    </picture>
  </p-link-tile>
</div>`;

  gradient = `<div class="container">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
    gradient="false"
  >
    <img src="${require('../../assets/porsche_beach.jpg')}" alt="Porsche on Beach" />
  </p-link-tile>
</div>`;

  compact = `<div class="container">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
    compact="true"
  >
    <img src="${require('../../assets/porsche_beach.jpg')}" alt="Porsche on Beach" />
  </p-link-tile>
</div>`;

  align = `<div class="container">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
    compact="true"
    align="top"
  >
    <img src="${require('../../assets/porsche_beach.jpg')}" alt="Porsche on Beach" />
  </p-link-tile>
</div>`;

  get aspectRatioMarkup() {
    return`<div class="container">
  <p-link-tile href="#" label="Some Label" description="Default" aspect-ratio="${this.aspectRatio}">
    <img src="${require('../../assets/porsche_beach.jpg')}" alt="Beach"/>
  </p-link-tile>
</div>`
  }

  get sizeMarkup() {
    return`<div class="container">
  <p-link-tile href="#" label="Some Label" description="Default" size="${this.size}">
    <img src="${require('../../assets/porsche_beach.jpg')}" alt="Beach"/>
  </p-link-tile>
</div>`
  }

  get weightMarkup() {
    return`<div class="container">
  <p-link-tile href="#" label="Some Label" description="Default" weight="${this.weight}">
    <img src="${require('../../assets/porsche_beach.jpg')}" alt="Beach"/>
  </p-link-tile>
</div>`
  }

}
</script>

<style>

  .container {
    max-width: 400px;
    font-size: 40px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-template-rows: auto;
    column-gap: 1rem;
    row-gap: 1rem;
  }
</style>
