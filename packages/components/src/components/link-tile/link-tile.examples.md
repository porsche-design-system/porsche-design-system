# Link Tile

The `p-link-tile` is a navigational component that displays a provided image to tease content and navigate to further
information within one container. In case you want the user to execute an action, you should select the
[Button Tile](components/button-tile) component instead.

**Note:** The component does not take care of processing and aligning the image.

<TableOfContents></TableOfContents>

## Basic

An `img` or `picture` tag has to be provided in the slot of the `p-link-tile` component.

Additionally, the properties `href`, `description` and `label` are required. The `description` property is used as a
teaser with a more detailed description of the link and where it leads to.

The `label` property is used to describe the anchor.

<Playground :markup="basic" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, placing textual contents above an image can easily lead to **contrast issues**. Though we are providing a
scalable background gradient to reduce the risk of low contrasts between foreground text and background image, there
still can occur issues with color contrast ratios, especially if different aspect ratios for multiple viewport sizes are
used. So, always **check readability** and play around with the `size` and `weight` properties to achieve the best
results.

## ARIA attributes and states

Through the `aria` property you have the possibility to provide additional **ARIA** attributes and states to the
component.

<Playground :markup="accessibility" :config="config"></Playground>

## Aspect Ratio

The component takes its height from the width provided and places the image via CSS `object-fit: cover`. Therefore, you
can change the height by using different aspect ratios.

<Playground :markup="aspectRatioMarkup">
  <SelectOptions v-model="aspectRatio" :values="aspectRatios" name="aspectRatio"></SelectOptions>
</Playground>

## Size

The `size` property changes the font size of the description.

<Playground :markup="sizeMarkup" :config="config">
  <SelectOptions v-model="size" :values="sizes" name="size"></SelectOptions>
</Playground>

## Weight

The `weight` property changes the font weight of the description.

<Notification heading="Deprecation hint" state="warning">
  The <code>semibold</code> value has been deprecated and will be removed with the next major release.<br>
  Please use the <code>semi-bold</code> value instead.
</Notification>

<Playground :markup="weightMarkup" :config="config">
  <SelectOptions v-model="weight" :values="weights" name="weight"></SelectOptions>
</Playground>

## Gradient

By default, the `p-link-tile` takes care of the readability of the description by displaying a gradient. If the
underlying image provides enough contrast, you can choose to disable the gradient by setting `gradient="false"`.

**Note:** When disabling the gradient, it must be ensured that the contrast values are accessibility compliant.

<Playground :markup="gradientMarkup" :config="config">
  <SelectOptions v-model="gradient" :values="gradients" name="gradient"></SelectOptions>
</Playground>

## Background

The `background` property changes the theme of the description and link. If the underlying image is light and provides
enough contrast, you can choose to set `background="light"`. The component is not provided with a bright gradient, so if
the property is set to `background="light"`, the gradient is disabled.

<Playground :markup="backgroundMarkup" :config="config">
  <SelectOptions v-model="background" :values="backgrounds" name="background"></SelectOptions>
</Playground>

## Compact

The `label` property stays mandatory when using `compact`, for **accessibility** reasons.

<Playground :markup="compactMarkup">
  <SelectOptions v-model="compact" :values="compacts" name="compact"></SelectOptions>
</Playground>

## Alignment

It is possible to align the description on top of the component.

**Note:** This is only possible in combination with `compact="true"`

<Playground :markup="alignMarkup">
  <SelectOptions v-model="align" :values="aligns" name="align"></SelectOptions>
</Playground>

## Hyphens

It is possible to overwrite the hyphens style on the host element and use 'soft' hyphens. However, please note that
hyphenation behavior can vary depending on the browser and the language of the text. In some cases, it may be necessary
to set the appropriate lang attribute on your HTML element to ensure that hyphenation works correctly for the desired
language.

<Playground :markup="hyphenMarkup">
  <SelectOptions v-model="hyphen" :values="hyphens" name="hyphens"></SelectOptions>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { LINK_TILE_WEIGHTS } from './link-tile-utils';
import { THEMES, TILE_ALIGNS, TILE_ASPECT_RATIOS, TILE_SIZES } from '../../utils'; 

@Component
export default class Code extends Vue {
  config = { spacing: 'block' };
  imgAttributes = 'width="3000" height="2000" alt="Some alt text"';

  basic = `<p-link-tile
  href="https://www.porsche.com"
  label="Some label"
  description="Some Description"
>
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>
<p-link-tile
  href="https://www.porsche.com"
  label="Some label"
  description="Some Description"
>
  <picture>
    <source media="(min-width:400px)" srcset="${require('@/assets/image-grid.png')}" />
    <img src="${require('@/assets/image-grid-violet.png')}" ${this.imgAttributes} />
  </picture>
</p-link-tile>`;

  accessibility = `<p-link-tile
  href="https://www.porsche.com"
  label="Some label"
  aria="{ 'aria-label': 'Some more descriptive label' }"
  description="Some Description"
>
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>`;

  aspectRatio = '4:3';
  aspectRatios = [...TILE_ASPECT_RATIOS, "{ base: '3:4', s: '1:1', m: '16:9' }"];
  get aspectRatioMarkup() {
    return`<p-link-tile href="#" label="Some Label" description="Some Description" aspect-ratio="${this.aspectRatio}">
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>`}

  size = 'default';
  sizes = [...TILE_SIZES, "{ base: 'inherit', m: 'default' }"];
  get sizeMarkup() {
    return`<p-link-tile href="#" label="Some Label" description="Some Description" size="${this.size}" style="font-size: 40px;">
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>
<p-link-tile href="#" label="Some Label" description="Some Description" size="${this.size}" compact="true" style="font-size: 40px;">
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>`
  }

  weight = 'semi-bold';
  weights = [...LINK_TILE_WEIGHTS.map(item => item === 'semibold' ? item + ' (deprecated)' : item), "{ base: 'semi-bold', m: 'regular' }"];
  get weightMarkup() {
    return`<p-link-tile href="#" label="Some Label" description="Some Description" weight="${this.weight}">
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>
<p-link-tile href="#" label="Some Label" description="Some Description" weight="${this.weight}" compact="true">
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>`
  }

  gradient = false;
  gradients = [false, true];
  get gradientMarkup() { 
  return `<p-link-tile
  href="https://www.porsche.com"
  label="Some label"
  description="Some Description"
  gradient="${this.gradient}"
>
  <img src="${require('@/assets/image-grid-split.png')}" ${this.imgAttributes} />
</p-link-tile>
<p-link-tile
  href="https://www.porsche.com"
  label="Some label"
  description="Some Description"
  compact="true"
  gradient="${this.gradient}"
>
  <img src="${require('@/assets/image-grid-split.png')}" ${this.imgAttributes} />
</p-link-tile>`};

  background = 'light';
  backgrounds = [...THEMES];
  get backgroundMarkup() { 
  return `<p-link-tile
  href="https://www.porsche.com"
  label="Some label"
  description="Some Description"
  background="${this.background}"
>
  <img src="${require('@/assets/image-grid-split-light.png')}" ${this.imgAttributes} />
</p-link-tile>
<p-link-tile
  href="https://www.porsche.com"
  label="Some label"
  description="Some Description"
  compact="true"
  background="${this.background}"
>
  <img src="${require('@/assets/image-grid-split-light.png')}" ${this.imgAttributes} />
</p-link-tile>`};

  compact = false;
  compacts = [false, true, "{ base: true, m: false }"];
  get compactMarkup() {
    return `<p-link-tile
  href="https://www.porsche.com"
  label="Some label"
  description="Some Description"
  compact="${this.compact}"
>
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>`};

  align = 'top';
  aligns = TILE_ALIGNS;
  get alignMarkup() {
    return `<p-link-tile
  href="https://www.porsche.com"
  label="Some label"
  description="Some Description"
  compact="true"
  align="${this.align}"
>
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>`};

  hyphen = 'manual';
  hyphens = ['auto', 'manual', 'none'];
  get hyphenMarkup() {
    return `<p-link-tile
  href="https://www.porsche.com"
  label="Some label"
  description="An extra&shy;ordinarily Porsche"
  compact="true"
  size="inherit" 
  style="${this.hyphen !== 'auto' ? 'hyphens: ' + this.hyphen + '; ' : ''}font-size: 45px;"
>
  <img src="${require('@/assets/image-grid.png')}" ${this.imgAttributes} />
</p-link-tile>`};

}
</script>

<style scoped lang="scss">
  :deep(p-link-tile) {
    max-width: 400px;
  }
</style>
