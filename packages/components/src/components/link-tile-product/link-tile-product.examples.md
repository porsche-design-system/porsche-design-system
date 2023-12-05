# Link Tile Product

<Notification heading="Experimental Component" state="warning">
  The <code>p-link-tile-product</code> component is experimental and might be changed or removed in a future release.
</Notification>

The `p-link-tile-product` is a navigational component designed to showcase a featured product within a store. it offers
the option to "like" the product, allowing you to easily add it to the users wishlist. Additionally, you can place a
chip at the top to signal special features about the product, such as its novelty or exclusivity.

<Notification heading="Image Aspect Ratio" state="warning">
  The image within the component has a fixed aspect ratio of 8:9. For optimal presentation, it is recommended that the supplied image adheres to the same aspect ratio of 8:9 and includes
a transparent background. </Notification>

<TableOfContents></TableOfContents>

## Basic

An `img` or `picture` element has to be available as a child of the `p-link-tile-product` component.

The `heading` and `price` properties are required and a link must be provided, using either the `href` property or a
[slotted link](components/link-tile-product/examples#framework-routing-anchor-nesting).

<Playground :markup="basic" :config="config"></Playground>

## Like Button

The `likeButton` property can be used to hide the like button. By default, the like button is shown.

<Playground :markup="likeButtonMarkup" :config="config">
  <SelectOptions v-model="likeButton" :values="likeButtons" name="like-button"></SelectOptions>
</Playground>

## Header

If you want to signal special features about the product, such as its novelty or exclusivity, use the `header` slot.
Although you can pass in anything, it is recommended to use the `p-tag` component.

<Playground :markup="header" :config="config"></Playground>

## Info

If you want to add any additional info, use the `info` property.

<Playground :markup="info" :config="config"></Playground>

## Framework routing (anchor nesting)

To support framework routing you can provide the link as a slotted element of the component instead of using the `href`
property. To ensure accessibility, the slotted link must be labeled with both the product name and its price.

<Playground :markup="slottedLink" :config="config"></Playground>

## Framwork Example

<Playground :frameworkMarkup="example" :config="{ ...config, withoutDemo: true }">
    <p-link-tile-product
    :heading="'Some product'"
    :price="'911€'"
    :info="'Some info'"
    :href="'https://www.porsche.com'"
    :liked="liked"
    @likeChange="handleLikeChange"
    :theme="theme"
  >
    <p-tag slot="header" :color="'background-base'">New</p-tag>
    <img :src="imgSrc" alt="Some alt text" />
  </p-link-tile-product>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import {getLinkTileProductCodeSamples} from "shared/src"; 
import type { Theme } from '@/models';

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'block' };
  imgSrc = require('@/assets/weekender.webp');
  img = `<img src="${this.imgSrc}" alt="Some alt text" />`;
  link = `<a href="https://www.porsche.com">Some product, 911€</a>`;
  headerSlot = `<p-tag slot="header" color="background-base">New</p-tag>`;

  liked = false;

  handleLikeChange(e) {
    e.preventDefault();
    this.liked = !e.detail.liked;
  };

  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }


  example = getLinkTileProductCodeSamples();

  basic = `<p-link-tile-product heading="Some product" price="911€" href="https://porsche.com" theme="${this.theme}">
  ${this.img}
</p-link-tile-product>

<p-link-tile-product heading="Some product" price="911€" href="https://porsche.com" theme="${this.theme}">
  <picture>
    <source media="(min-width:400px)" srcset="${this.imgSrc}" />
    ${this.img}
  </picture>
</p-link-tile-product>`;

  likeButton = 'false';
  likeButtons = ['true', 'false'];
  get likeButtonMarkup() {
    return`<p-link-tile-product heading="Some product" price="911€" href="https://porsche.com" ${this.likeButton === 'false' ? 'like-button="false"' : ''} theme="${this.theme}">
  ${this.img}
</p-link-tile-product>`;
  };

  header = `<p-link-tile-product heading="Some product" price="911€" href="https://porsche.com" theme="${this.theme}">
  ${this.headerSlot}
  ${this.img}
</p-link-tile-product>`;

  info = `<p-link-tile-product heading="Some product" price="911€" href="https://porsche.com" info="Some info" theme="${this.theme}">
  ${this.img}
</p-link-tile-product>`;

  slottedLink = `<p-link-tile-product heading="Some product" price="911€" info="Some info" theme="${this.theme}">
  ${this.link}
  ${this.img}
</p-link-tile-product>`;
}
</script>

<style scoped lang="scss">
  :deep(p-link-tile-product) {
    max-width: 400px;
  }
</style>
