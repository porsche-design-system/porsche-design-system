# Link Tile

The `p-link-tile` is a navigational component that displays a provided image to tease content and navigate to further
information within one container. The component takes its height from the width provided and places the image via
`object-fit cover`.

**Note:** The component does not take care of processing and aligning the image.

<TableOfContents></TableOfContents>

## Basic

An `img`or `picture` tag has to be provided in the slot of the `p-link-tile` component. Additionally, the properties
`href`, `description` and `label` are required. The `description` property is used as a teaser with a more detailed
description of the link and where it leads to. The `label` property is used to describe the anchor.

<Playground :markup="basic"></Playground>

## Aspect Ratio

## Size

## Weight

## Gradient

By default, the `p-link-tile` takes care of the readability of the description by displaying a gradient. If the gradient
is not necessary for readability, the gradient can be removed by using the supplied boolean property `gradient="false"`.

<Playground :markup="gradient"></Playground>

## Compact

A `p-link-tile` can be used without visible label text. It can be removed by the provided boolean property
`compact="true"`. If used without caption, it is mandatory for **accessibility** reasons to provide a descriptive
`label text` for screen readers.

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

  basic = `<div class="container">
  <p-link-tile
    href="https://www.porsche.com"
    label="Some label"
    description="Some Description"
  >
    <img src="${require('../../assets/porsche_beach.jpg')}" alt="Porsche on Beach" />
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
}
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: auto;
    column-gap: 1rem;
    row-gap: 1rem;
  }
</style>
