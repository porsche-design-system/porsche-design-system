<ComponentHeading name="Button Tile"></ComponentHeading>

The `p-button-tile` is an interactive component that displays a provided image to tease content and performs form or
**interaction** events within one container. Whenever you want to provide navigational elements, stick to the
[Link Tile](components/link-tile) component instead.

**Note:** The component does not take care of processing and aligning the image.

<TableOfContents></TableOfContents>

## Basic

An `img` or `picture` tag has to be provided as default slot.

Additionally, the properties `description` and `label` are required. The `description` property is used as a teaser with
a more detailed description of the button and its action.

The `label` property is used to describe the button.

#### Supported named slots:

- `slot="header"`: Renders a header section above the content area.

<Playground :markup="basic" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, placing textual contents above an image can easily lead to **contrast issues**. Though we are providing a
scalable background gradient to reduce the risk of low contrasts between foreground text and background image, there
still can occur issues with color contrast ratios, especially if different aspect ratios for multiple viewport sizes are
used. So, always **check readability** and play around with the `size` and `weight` properties to achieve the best
results.

## States

<Playground :markup="stateMarkup" :config="config">
  <PlaygroundSelect v-model="state" :values="states" name="state"></PlaygroundSelect>
</Playground>

## Aspect Ratio

The component takes its height from the width provided and places the image via CSS `object-fit: cover`. Therefore, you
can change the height by using different aspect ratios.

<Playground :markup="aspectRatioMarkup">
  <PlaygroundSelect v-model="aspectRatio" :values="aspectRatios" name="aspectRatio"></PlaygroundSelect>
</Playground>

## Size

The `size` property changes the font size of the description.

<Playground :markup="sizeMarkup" :config="config">
  <PlaygroundSelect v-model="size" :values="sizes" name="size"></PlaygroundSelect>
</Playground>

## Weight

The `weight` property changes the font weight of the description.

<Playground :markup="weightMarkup" :config="config">
  <PlaygroundSelect v-model="weight" :values="weights" name="weight"></PlaygroundSelect>
</Playground>

## Gradient

By default, the `p-button-tile` takes care of the readability of the description by displaying a gradient. If the
underlying image provides enough contrast, you can choose to disable the gradient by setting `gradient="false"`.

**Note:** When disabling the gradient, it must be ensured that the contrast values are accessibility compliant.

<Playground :markup="gradientMarkup" :config="config">
  <PlaygroundSelect v-model="gradient" :values="gradients" name="gradient"></PlaygroundSelect>
</Playground>

## Background

The `background` property changes the theme of the description and button. If the underlying image is light and provides
enough contrast, you can choose to set `background="light"`. The component is not provided with a bright gradient, so if
the property is set to `background="light"`, the gradient is disabled.

<Playground :markup="backgroundMarkup" :config="config">
  <PlaygroundSelect v-model="background" :values="backgrounds" name="background"></PlaygroundSelect>
</Playground>

## Compact

The `label` property stays mandatory when using `compact`, for **accessibility** reasons.

<Playground :markup="compactMarkup">
  <PlaygroundSelect v-model="compact" :values="compacts" name="compact"></PlaygroundSelect>
</Playground>

## Alignment

It is possible to align the description on top of the component.

**Note:** This is only possible in combination with `compact="true"`

<Playground :markup="alignMarkup">
  <PlaygroundSelect v-model="align" :values="aligns" name="align"></PlaygroundSelect>
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
  Currently, Safari is able to align the height per CSS Grid row as long as the content does not overflow.
</Notification>

<Playground :markup="gridMarkup"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { THEMES, TILE_ALIGNS, TILE_ASPECT_RATIOS, TILE_ASPECT_RATIOS_DEPRECATED, TILE_SIZES, TILE_SIZES_DEPRECATED, TILE_WEIGHTS } from '../../utils'; 

@Component
export default class Code extends Vue {
  config = { spacing: 'inline' };
  imgAttributes = 'alt="Some alt text"';

  basic = `<p-button-tile
  label="Some label"
  description="Some Description"
>
  <p-tag slot="header" color="background-frosted" compact="true">Some tag</p-tag>
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>`;

  state = 'disabled';
  states = ['disabled', 'loading'];
  get stateMarkup() {
    return`<p-button-tile label="Some Label" description="Some Description" ${this.state}>
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>
<p-button-tile label="Some Label" description="Some Description" size="${this.size}" compact="true" ${this.state}>
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>`}

  aspectRatio = '1/1';
  aspectRatios = [...TILE_ASPECT_RATIOS.map(item => TILE_ASPECT_RATIOS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item), "{ base: '3/4', s: '1/1', m: '16/9' }"];
  get aspectRatioMarkup() {
    return`<p-button-tile label="Some Label" description="Some Description" aspect-ratio="${this.aspectRatio}">
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>`}

  size = 'large';
  sizes = [...TILE_SIZES.map(item => TILE_SIZES_DEPRECATED.includes(item) ? item + ' (deprecated)' : item), "{ base: 'inherit', m: 'medium' }"];
  get sizeMarkup() {
    return`<p-button-tile label="Some Label" description="Some Description" size="${this.size}" style="font-size: 40px;">
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>
<p-button-tile label="Some Label" description="Some Description" size="${this.size}" compact="true" style="font-size: 40px;">
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>`
  }

  weight = 'semi-bold';
  weights = [...TILE_WEIGHTS, "{ base: 'semi-bold', m: 'regular' }"];
  get weightMarkup() {
    return`<p-button-tile label="Some Label" description="Some Description" weight="${this.weight}">
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>
<p-button-tile label="Some Label" description="Some Description" weight="${this.weight}" compact="true">
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>`
  }

  gradient = false;
  gradients = [false, true];
  get gradientMarkup() { 
  return `<p-button-tile
  label="Some label"
  description="Some Description"
  gradient="${this.gradient}"
>
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>
<p-button-tile
  label="Some label"
  description="Some Description"
  compact="true"
  gradient="${this.gradient}"
>
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>`};

  background = 'light';
  backgrounds = [...THEMES];
  get backgroundMarkup() { 
  return `<p-button-tile
  label="Some label"
  description="Some Description"
  background="${this.background}"
>
  <img src="${require('@/assets/image-grid-split-light.png')}" ${this.imgAttributes} />
</p-button-tile>
<p-button-tile
  label="Some label"
  description="Some Description"
  compact="true"
  background="${this.background}"
>
  <img src="${require('@/assets/image-grid-split-light.png')}" ${this.imgAttributes} />
</p-button-tile>`};

  compact = true;
  compacts = [false, true, "{ base: true, m: false }"];
  get compactMarkup() {
    return `<p-button-tile
  label="Some label"
  description="Some Description"
  compact="${this.compact}"
>
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>`};

  align = 'top';
  aligns = TILE_ALIGNS;
  get alignMarkup() {
    return `<p-button-tile
  label="Some label"
  description="Some Description"
  compact="true"
  align="${this.align}"
>
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>`};

  hyphen = 'manual';
  hyphens = ['auto', 'manual', 'none'];
  get hyphenMarkup() {
    return `<p-button-tile
  label="Some label"
  description="An extra&shy;ordinarily Porsche"
  compact="true"
  size="inherit" 
  style="${this.hyphen !== 'auto' ? 'hyphens: ' + this.hyphen + '; ' : ''}font-size: 45px;"
>
  <img src="${require('@/assets/lights.jpg')}" ${this.imgAttributes} />
</p-button-tile>`};

  get gridMarkup() {
    return `<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;">
  <p-button-tile
    aspect-ratio="4/3"
    label="Some Label"
    size="large"
    description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
  >
    <p-tag slot="header" color="background-frosted" compact="true">4/3</p-tag>
    <img
      src="${require('@/assets/lights.jpg')}"
      ${this.imgAttributes}
    />
  </p-button-tile>
  <p-button-tile aspect-ratio="4/3" label="Some Label" description="Some description">
    <p-tag slot="header" color="background-frosted" compact="true">4/3</p-tag>
    <img
      src="${require('@/assets/lights.jpg')}"
      ${this.imgAttributes}
    />
  </p-button-tile>
  <p-button-tile aspect-ratio="1/1" label="Some Label" description="Some description">
    <p-tag slot="header" color="background-frosted" compact="true">1/1</p-tag>
    <img
      src="${require('@/assets/lights.jpg')}"
      ${this.imgAttributes}
    />
  </p-button-tile>
  <p-button-tile aspect-ratio="9/16" label="Some Label" description="Some description">
    <p-tag slot="header" color="background-frosted" compact="true">9/16</p-tag>
    <img
      src="${require('@/assets/lights.jpg')}"
      ${this.imgAttributes}
    />
  </p-button-tile>
  <p-button-tile aspect-ratio="1/1" label="Some Label" description="Some description">
    <p-tag slot="header" color="background-frosted" compact="true">1/1</p-tag>
    <img
      src="${require('@/assets/lights.jpg')}"
      ${this.imgAttributes}
    />
  </p-button-tile>
</div>`};
}

</script>

<style scoped lang="scss">
  :deep(.demo > p-button-tile) {
    max-width: 400px;
  }
</style>
