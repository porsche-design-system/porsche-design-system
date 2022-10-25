# Link Tile

The `p-link-tile` is a navigational component that displays a provided image to tease content and navigate to further
information within one container.

**Note:** The component does not take care of processing and aligning the image.

<TableOfContents></TableOfContents>

## Basic

An `img` or `picture` tag has to be provided in the slot of the `p-link-tile` component.

Additionally, the properties `href`, `description` and `label` are required. The `description` property is used as a
teaser with a more detailed description of the link and where it leads to.

The `label` property is used to describe the anchor.

<Playground :markup="basic"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
In general, placing textual contents above an image can easily lead to **contrast issues**. 
Though we are providing a scalable background gradient to reduce the risk of low contrasts between foreground text and background image, there still can occur issues with color contrast ratios, especially if different aspect ratios for multiple viewport sizes are used.
So, always **check readability** and play around with the `size` and `weight` properties to achieve the best results. 

---

## Aspect Ratio

The component takes its height from the width provided and places the image via CSS `object-fit: cover`. Therefore, you can
change the height by using different aspect ratios.

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
    <p-text>Select font weight:</p-text>
    <select v-model="weight" aria-label="Select font weight">
      <option disabled>Select font weight</option>
      <option value="regular">regular</option>
      <option value="semibold">semibold</option>
      <option value="{base: 'semibold', xs: 'regular', s: 'semibold', m: 'regular', l: 'semibold', xl: 'regular' }">responsive</option>
    </select>
</Playground>

## Gradient

By default, the `p-link-tile` takes care of the readability of the description by displaying a gradient. If the
underlying image provides enough contrast, you can choose to disable the gradient by setting `gradient="false"`.

**Note:** When disabling the gradient, it must be ensured that the contrast values are accessibility compliant.

<Playground :markup="gradientMarkup">
    <p-text>Select gradient:</p-text>
    <select v-model="gradient" aria-label="Select gradient">
      <option disabled>Select gradient</option>
      <option value="true">true</option>
      <option value="false">false</option>
    </select>
</Playground>

## Compact

The `label` property stays mandatory when using `compact`, for **accessibility** reasons.

<Playground :markup="compactMarkup">
  <p-text>Select compact:</p-text>
  <select v-model="compact" aria-label="Select compact">
    <option disabled>Select compact</option>
    <option value="true">true</option>
    <option value="false">false</option>
  </select>
</Playground>

## Alignment

It is possible to align the description on top of the component.

**Note:** This is only possible in combination with `compact="true"`

<Playground :markup="alignMarkup">
  <p-text>Select align:</p-text>
  <select v-model="align" aria-label="Select align">
    <option disabled>Select align</option>
    <option value="top">top</option>
    <option value="bottom">bottom</option>
  </select>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {

  aspectRatio = '4:3';
  size = 'default';
  weight = 'semibold';
  gradient = 'false';
  compact = 'true';
  align = 'top';

  basic = `<div class="grid">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
  >
    <img src="${require('../../assets/image_grid.png')}" alt="Some alt text" />
  </p-link-tile>
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
  >
    <picture>
      <source media="(min-width:400px)" srcset="${require('../../assets/image_grid.png')}"/>
      <img src="${require('../../assets/image_grid_violet.png')}" alt="Some alt text" />
    </picture>
  </p-link-tile>
</div>`;

  get aspectRatioMarkup() {
    return`<div class="container">
  <p-link-tile href="#" label="Some Label" description="Some Description" aspect-ratio="${this.aspectRatio}">
    <img src="${require('../../assets/image_grid.png')}" alt="Some alt text"/>
  </p-link-tile>
</div>`
  }

  get sizeMarkup() {
    return`<div class="grid">
  <p-link-tile href="#" label="Some Label" description="Some Description" size="${this.size}">
    <img src="${require('../../assets/image_grid.png')}" alt="Some alt text"/>
  </p-link-tile>
  <p-link-tile href="#" label="Some Label" description="Some Description" size="${this.size}" compact="true">
    <img src="${require('../../assets/image_grid.png')}" alt="Some alt text"/>
  </p-link-tile>
</div>`
  }

  get weightMarkup() {
    return`<div class="grid">
  <p-link-tile href="#" label="Some Label" description="Some Description" weight="${this.weight}">
    <img src="${require('../../assets/image_grid.png')}" alt="Some alt text"/>
  </p-link-tile>
  <p-link-tile href="#" label="Some Label" description="Some Description" weight="${this.weight}" compact="true">
    <img src="${require('../../assets/image_grid.png')}" alt="Some alt text"/>
  </p-link-tile>
</div>`
  }

 get gradientMarkup() { 
  return `<div class="grid">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
    gradient="${this.gradient}"
  >
    <img src="${require('../../assets/image_grid_split.png')}" alt="Some alt text" />
  </p-link-tile>
   <p-link-tile
      href="https://www.porsche.com"
      label="Some label"
      description="Some Description"
      compact="true"
      gradient="${this.gradient}"
    >
    <img src="${require('../../assets/image_grid_split.png')}" alt="Some alt text" />
  </p-link-tile>
</div>`};

  get compactMarkup() {
    return `<div class="container">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
    compact="${this.compact}"
  >
    <img src="${require('../../assets/image_grid.png')}" alt="Some alt text" />
  </p-link-tile>
</div>`};

  get alignMarkup() {
    return `<div class="container">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
    compact="true"
    align="${this.align}"
  >
    <img src="${require('../../assets/image_grid.png')}" alt="Some alt text" />
  </p-link-tile>
</div>`};

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
