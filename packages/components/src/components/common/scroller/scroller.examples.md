# Scroller

The `p-scroller` component forces its child nodes to be rendered horizontally next to each other. In case not enough
viewport space is given a clickable scroll indicator is shown and the elements become scrollable.

<TableOfContents></TableOfContents>

## Basic example

- focus + scrolling

<Playground :markup="basicMarkup" :config="config"></Playground>

## With not focusable elements

- min-height
- no wrap
- isfocusable=true

## Scroll indicator size

## Scroll indicator position

## Gradient color scheme

## Scroll API

- only as prop accessible
- framework examples

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
  
@Component
export default class Code extends Vue {
  config = { themeable: true };

  basicMarkup = `<div style="max-width: 600px">
  <p-scroller>
    <p-tag color="neutral-contrast-high">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-neutral">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-warning">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="neutral-contrast-high">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-neutral">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-warning">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="neutral-contrast-high">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-neutral">
      <button type="button">Some tag content</button>
    </p-tag>
  </p-scroller>
</div>`;
  
  tempMarkup = `<div style="max-width: 600px">
  <p-scroller is-focusable="true">
    <span>Some element 1</span>
    <span>Some element 2</span>
    <span>Some element 3</span>
    <span>Some element 4</span>
    <span>Some element 5</span>
    <span>Some element 6</span>
    <span>Some element 7</span>
    <span>Some element 8</span>
    <span>Some element 9</span>
    <span>Some element 10</span>
  </p-scroller>
</div>`;
}
</script>

<style lang="scss">
  p-scroller > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
  p-scroller > span {
    border: 1px solid deeppink;
    white-space: nowrap; 
    height: 24px;
  }
</style>
