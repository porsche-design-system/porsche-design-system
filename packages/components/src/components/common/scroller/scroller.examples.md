# Scroller

The `p-scroller` component forces its child nodes to be rendered horizontally next to each other. In case not enough
viewport space is given a clickable scroll indicator is shown and the elements become scrollable.

<TableOfContents></TableOfContents>

## Basic example

The `p-scroller` should always be used with elements that can be focused. As soon as the slotted elements exceed the
viewport / their respective container, scroll indicators are shown.

If the component is accessed by keyboard navigation and an element is focused, scrolling via `arrow right` and
`arrow left` is possible.

<Playground :markup="basicTagMarkup" :config="config"></Playground>

The height of `p-scroller` depends on its content height.

<Playground :markup="basicTagDismissibleMarkup" :config="config"></Playground>

## With not focusable elements

The `p-scroller` accepts any child node. It is not recommended using the component with not focusable elements.

If absolutely necessary the component provides a `isFocusable` property which makes the scroller component focusable and
accessible via keyboard. When the `p-scroller` is focused, scrolling via `arrow right` and `arrow left` is possible.

Keep in mind that the content passed to the `p-scroller` must be within the size definition of the design system and
thus have a minimum height of 24px to ensure visual alignment of the scroll indicators.

The `p-scroller` only takes care of the horizontal alignment. Spacing and custom css properties must be handled by the
consumer e.g. `white-space: nowrap` to avoid linebreaks inside the elements.

<Playground :markup="isFocusable" :config="{themable: false}"></Playground>

## Scroll indicator size

The size of the scroll indicator arrows depends on the `font-size` set onto the `p-scroller` component.

<Playground :markup="scrollIndicatorSize" :config="config"></Playground>

## Scroll indicator position

Per default the scroll indicators are vertically centered. The `scrollIndicatorPosition` property lets you change the
position to top.

<Playground :markup="scrollIndicatorPositionMarkup" :config="config">
  <select v-model="scrollIndicatorPosition" aria-label="Select scroll indicator position">
    <option disabled>Select scroll-indicator-position</option>
    <option value="center">Center</option>
    <option value="top">Top</option>
  </select>
</Playground>

## Gradient color scheme

The background and gradient has to align to your chosen background.

<Playground :markup="gradientMarkup" :config="{ ...config, colorScheme: gradientColorScheme }">
  <select v-model="gradientColorScheme" aria-label="Select color scheme">
    <option disabled>Select gradient-color-scheme</option>
    <option value="default">Default</option>
    <option value="surface">Surface</option>
  </select>
</Playground>

## Scroll to position

The `p-scroller` component provides the `scrollToPosition` property. It accepts
`{ scrollPosition: number, isSmooth?: boolean }`.

If `scrollToPosition` is set with `isSmooth: true` the scrolling is animated.

<Playground :frameworkMarkup="codeExample" :config="{ themable: false }" :markup="frameworkExample"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getScrollerCodeSamples } from '@porsche-design-system/shared';
  
@Component
export default class Code extends Vue {
  config = { themeable: true };

  gradientColorScheme = 'surface';
  scrollIndicatorPosition = 'top';

  codeExample = getScrollerCodeSamples();

  basicTagMarkup = `<div style="max-width: 600px">
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

  basicTagDismissibleMarkup = `<div style="max-width: 600px">
  <p-scroller style="white-space: nowrap">
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
  </p-scroller>
</div>`;
  
  isFocusable = `<div style="max-width: 600px">
  <p-scroller is-focusable="true" style="white-space: nowrap">
    <span style="height: 24px">Some element 1</span>
    <span style="height: 24px">Some element 2</span>
    <span style="height: 24px">Some element 3</span>
    <span style="height: 24px">Some element 4</span>
    <span style="height: 24px">Some element 5</span>
    <span style="height: 24px">Some element 6</span>
    <span style="height: 24px">Some element 7</span>
    <span style="height: 24px">Some element 8</span>
    <span style="height: 24px">Some element 9</span>
    <span style="height: 24px">Some element 10</span>
  </p-scroller>
</div>`;

  scrollIndicatorSize = `<div style="max-width: 600px">
  <p-scroller style="font-size: 24px; white-space: nowrap">
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
  </p-scroller>
</div>`;

  get scrollIndicatorPositionMarkup() { 
    return `<div style="max-width: 600px">
  <p-scroller scroll-indicator-position="${this.scrollIndicatorPosition}" style="white-space: nowrap">
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
  </p-scroller>
</div>`;
  };

  get gradientMarkup() {
    return `<div style="max-width: 600px">
  <p-scroller gradient-color-scheme="${this.gradientColorScheme}" style="white-space: nowrap">
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
    <p-button>Some button</p-button>
  </p-scroller>
</div>`;
  }

  frameworkExample = `<p-button id="start">Scroll to start</p-button>
<p-button id="middle">Scroll to middle</p-button>
<p-button id="end">Scroll to end</p-button>

<div style="max-width: 600px">
  <p-scroller class="scroller" scroll-to-position="{scrollPosition: 290}">
    <span>Start</span>
    <span>Middle</span>
    <span>End</span>
  </p-scroller>
</div>
`
 
  mounted() {
    /* initially update accordion with open attribute in playground */
    this.registerEvents();
  
    /* theme switch needs to register event listeners again */
    const themeTabs = this.$el.querySelectorAll('.playground > p-tabs-bar');
    themeTabs.forEach(tab => tab.addEventListener('tabChange', () => {
      this.registerEvents();
    }));
  }
  
  updated(){
    this.registerEvents();
  }
  
  registerEvents() {
    const scroller = document.querySelector('.scroller');

    const scrollToStart = document.querySelector('#start');
    scrollToStart.addEventListener('click', () => {
      scroller.scrollToPosition = {scrollPosition: 0, isSmooth: true};
    });
  
    const scrollToMiddle = document.querySelector('#middle');
    scrollToMiddle.addEventListener('click',  () => {
      scroller.scrollToPosition = {scrollPosition: 290, isSmooth: true};
    });
  
    const scrollToEnd = document.querySelector('#end');
    scrollToEnd.addEventListener('click',  () => {
      scroller.scrollToPosition = {scrollPosition: 900, isSmooth: true};
    });
  }
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

  .scroller > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 300px;
  }

  .demo > p-button {
    margin: 0 1rem 1rem 0;
  }
</style>
