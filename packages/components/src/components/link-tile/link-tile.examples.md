# Link Tile

The clickable component `p-link-tile` is a navigational item for grouping and separating related data on a page to tease
content and navigate to further information within one container. It is set up to be displayed with an image/icon.

<TableOfContents></TableOfContents>

## Basic

The default `p-link-tile` has an image/icon and a content container that contains a description and a navigational item.

<Playground :markup="basic" :config="config"></Playground>

## Aspect Ratio

## Size

## Weight

## Gradient

By default, the `p-link-tile` takes care of the readability of the description by displaying a gradient. If the gradient
is not necessary for readability, the gradient can be removed by using the supplied boolean property `gradient="false"`.

<Playground :markup="gradient" :config="config"></Playground>

## Compact

A `p-link-tile` can be used without visible label text. It can be removed by the provided boolean property
`compact="true"`. If used without caption, it is mandatory for **accessibility** reasons to provide a descriptive
`label text` for screen readers.

<Playground :markup="compact" :config="config"></Playground>

## Alignment

By default, the content container of the `p-link-tile` is aligned at the bottom. In the `compact` variant the content
container can be positioned at the top of the `p-link-tile` container. For this purpose the property `align="top"` must
be set.

<Playground :markup="align" :config="config"></Playground>

## temp

<Playground :markup="temp" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  basic = `<div class="container">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
  >
    <img src="${require('../../assets/porsche_beach.jpg')}" />
  </p-link-tile>
</div>`;

  gradient = `<div class="container">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
    gradient="false"
  >
    <img src="${require('../../assets/porsche_beach.jpg')}" />
  </p-link-tile>
</div>`;

  compact = `<div class="container">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
    compact="true"
  >
    <img src="${require('../../assets/porsche_beach.jpg')}" />
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
    <img src="${require('../../assets/porsche_beach.jpg')}" />
  </p-link-tile>
</div>`;
  
  temp = `<div class="container">
<p-link-tile
  label="Some label"
  description="Default"
  href="#"
>
  <img src="${require('../../assets/porsche_beach.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Size inherit"
  href="#"
  size="inherit"
>
  <img src="${require('../../assets/porsche_factory.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Size default"
  href="#"
  size="default"
>
  <img src="${require('../../assets/porsche_office.jpg')}" />
</p-link-tile>


<p-link-tile
  label="Some label"
  description="Weight semibold"
  href="#"
  weight="semibold"
>
  <img src="${require('../../assets/surfer.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Aspect ratio 1:1"
  href="#"
  aspect-ratio="1:1"
>
  <img src="${require('../../assets/porsche_beach.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Aspect ratio 3:4"
  href="#"
  aspect-ratio="3:4"
>
  <img src="${require('../../assets/porsche_factory.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Aspect ratio 16:9"
  href="#"
  aspect-ratio="16:9"
>
  <img src="${require('../../assets/porsche_office.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Aspect ratio 9:16"
  href="#"
  aspect-ratio="9:16"
>
  <img src="${require('../../assets/porsche_white_background.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Compact align top"
  href="#"
  align="top"
  compact="true"
>
  <img src="${require('../../assets/surfer.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Gradient false"
  href="#"
  gradient="false"
>
  <img src="${require('../../assets/porsche_beach.jpg')}" />
</p-link-tile>

<p-link-tile
  label="Some label"
  description="Compact"
  href="#"
  compact="true"
>
  <img src="${require('../../assets/porsche_office.jpg')}" />
</p-link-tile>

</div>`
}
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: 22% 22% 22% 22%;
    grid-template-rows: auto;
    grid-template-areas: 'one two three four';
    column-gap: 1.33333%;
    row-gap: 10px;
  }
</style>
