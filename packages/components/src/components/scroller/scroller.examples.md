# Scroller

The `p-scroller` component forces its child nodes to be rendered horizontally next to each other. In case not enough
viewport space is given a clickable scroll indicator is shown and the elements become scrollable.

<TableOfContents></TableOfContents>

## Basic example

As soon as the slotted element(s) exceed the viewport / their respective container, scroll indicators are shown.

If the `p-scroller` component is accessed by keyboard navigation and is focused, scrolling via `arrow right` and
`arrow left` is possible. If `p-scroller` contains focusable element(s) these can be also accessed by keyboard
navigation.

<Playground :markup="basicTagMarkup" :config="config"></Playground>

The height of `p-scroller` depends on its content height.

Keep in mind that the content passed to the `p-scroller` should be within the size definition of the design system and
thus have a minimum height of 24px to ensure visual alignment of the scroll indicators.

The `p-scroller` only takes care of the horizontal alignment. Spacing and custom css properties must be handled by the
consumer e.g. `white-space: nowrap` to avoid line breaks inside the elements.

<Playground :markup="basicTagDismissibleMarkup" :config="config"></Playground>

## Scroll indicator size

The size of the scroll indicator arrows depends on the `font-size` set onto the `p-scroller` component.

<Playground :markup="scrollIndicatorSize" :config="config"></Playground>

## Gradient color scheme

The background and gradient has to align with your chosen background.

<Playground :markup="gradientMarkup" :config="{ ...config, colorScheme: gradientColorScheme }">
  <label>
    <p-text :theme="theme">Select color scheme:</p-text>
    <select v-model="gradientColorScheme" aria-label="Select color scheme">
      <option disabled>Select gradient-color-scheme</option>
      <option value="default">Default</option>
      <option value="surface">Surface</option>
    </select>
  </label>
</Playground>

## Scroll to position

The `p-scroller` component provides the `scrollToPosition` property. It accepts
`{ scrollPosition: number, isSmooth?: boolean }`.

If `scrollToPosition` is set with `isSmooth: true` the scrolling is animated.

<Playground :frameworkMarkup="codeExample" :config="{ themable: false }">
  <button id="start" @click="scrollToPosition = '{scrollPosition: 0, isSmooth: true }'">Scroll to start</button>
  <button id="middle" @click="scrollToPosition = '{scrollPosition: 220, isSmooth: true }'">Scroll to middle</button>
  <button id="end" @click="scrollToPosition = '{scrollPosition: 720, isSmooth: true }'">Scroll to end</button>

  <div style="max-width: 400px">
    <p-scroller class="scroller" :scroll-to-position="scrollToPosition" style="white-space: nowrap">
      <p-tag-dismissible>START - some tag content</p-tag-dismissible>
      <p-tag-dismissible>MIDDLE - some tag content</p-tag-dismissible>
      <p-tag-dismissible>END - some tag content</p-tag-dismissible>
    </p-scroller>
    <p-text :theme="theme">{{scrollToPosition}}</p-text>
  </div>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getScrollerCodeSamples } from '@porsche-design-system/shared';
import type { Theme } from '@/models';
  
@Component
export default class Code extends Vue {
  config = { themeable: true };

  get theme(): Theme {
    return this.$store.getters.theme;
  }

  gradientColorScheme = 'surface';
  scrollIndicatorPosition = 'top';

  scrollToPosition = '{scrollPosition: 220}';

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

  scrollIndicatorSize = `<div style="max-width: 600px">
  <p-scroller style="font-size: 24px; white-space: nowrap">
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
    <p-tag-dismissible>Some tag content</p-tag-dismissible>
  </p-scroller>
</div>`;

  get gradientMarkup() {
    return `<div style="max-width: 600px">
  <p-scroller gradient-color-scheme="${this.gradientColorScheme}" style="white-space: nowrap">
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
  }
}

</script>

<style scoped lang="scss">
  p-scroller > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }

  .demo > button {
    margin: 0 1rem 1rem 0;
  }
</style>
