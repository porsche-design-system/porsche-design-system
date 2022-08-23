# Scroller

The `p-scroller` component forces its child nodes to be rendered horizontally next to each other. In case not enough
viewport space is given a clickable scroll indicator is shown and the elements become scrollable.

<TableOfContents></TableOfContents>

## Basic example

The `p-scroller` should always be used with elements that can be focused. As soon as the slotted elements exceed the
viewport / their respective container, scroll indicators are shown.

If the component is accessed by keyboard navigation and an element is focused, scrolling via `arrow right` and
`arrow left` is possible.

<Playground :markup="basicMarkup" :config="config"></Playground>

## With not focusable elements

The `p-scroller` accepts any child node. It is not recommended using the component with not focusable elements.

If absolutely necessary the component provides a `isFocusable` property which makes the scroller component focusable and
accessible via keyboard. When the `p-scroller` is focused, scrolling via `arrow right` and `arrow left` is possible.

Keep in mind that the content passed to the `p-scroller` must be within the size definition of the design system and
thus have a minimum height of 24px to ensure visual alignment of the scroll indicators.

The `p-scroller` only takes care of the horizontal alignment. Spacing and custom css properties must be handled by the
consumer.

<Playground :markup="isFocusable" :config="config"></Playground>

## Scroll indicator size

The size of the scroll indicator arrows depends on the `font-size` set onto the `p-scroller` component.

## Scroll indicator position

Per default the scroll indicators are vertically centered. The `scrollIndicatorPosition` property lets you change the
position to top.

## Gradient color scheme

The background and gradient has to align to your chosen background.

## Scroll API

The `p-scroller` component provides the `scrollToPosition` property. This operates as a scroll API and can be used to
set the initial scroll position or enable `onClick` scrolling.

`scrollToPosition` accepts `{ scrollPosition: number, isSmooth?: boolean }`.  
If `scrollToPosition` is set with `isSmooth: true` the scrolling is animated.  
`scrollToPosition` has to be accessed as property and can´t be set as attribute onto the `p-scroller` component

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
  
  isFocusable = `<div style="max-width: 600px">
  <p-scroller is-focusable="true">
    <span style="white-space: nowrap; height: 24px;">Some element 1</span>
    <span style="white-space: nowrap; height: 24px;">Some element 2</span>
    <span style="white-space: nowrap; height: 24px;">Some element 3</span>
    <span style="white-space: nowrap; height: 24px;">Some element 4</span>
    <span style="white-space: nowrap; height: 24px;">Some element 5</span>
    <span style="white-space: nowrap; height: 24px;">Some element 6</span>
    <span style="white-space: nowrap; height: 24px;">Some element 7</span>
    <span style="white-space: nowrap; height: 24px;">Some element 8</span>
    <span style="white-space: nowrap; height: 24px;">Some element 9</span>
    <span style="white-space: nowrap; height: 24px;">Some element 10</span>
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
  }
</style>
