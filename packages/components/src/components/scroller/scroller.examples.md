<ComponentHeading name="Scroller"></ComponentHeading>

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

<Notification heading="Deprecation hint" state="warning">
  The <code>scrollIndicatorPosition</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>alignScrollIndicator</code> property instead.
</Notification>

<Playground :markup="scrollIndicatorSize" :config="config"></Playground>

## Gradient color

The background and gradient has to align with your chosen background.

<Notification heading="Deprecation hint" state="warning">
  The <code>gradientColorScheme</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>gradientColor</code> property instead.
</Notification>

<Playground :markup="gradientColorMarkup" :config="{ ...config, backgroundColor: gradientColor }">
  <SelectOptions v-model="gradientColor" :values="gradientColors" name="gradientColor"></SelectOptions>
</Playground>

## Scroll to position

The `p-scroller` component provides the `scrollToPosition` property. It accepts
`{ scrollPosition: number, isSmooth?: boolean }`.

If `scrollToPosition` is set with `isSmooth: true` the scrolling is animated.

<Playground :frameworkMarkup="codeExample" :config="{ themeable: false }">
  <button id="start" @click="scrollToPosition = '{scrollPosition: 0, isSmooth: true }'">Scroll to start</button>
  <button id="middle" @click="scrollToPosition = '{scrollPosition: 220, isSmooth: true }'">Scroll to middle</button>
  <button id="end" @click="scrollToPosition = '{scrollPosition: 720, isSmooth: true }'">Scroll to end</button>

  <div style="max-width: 400px">
    <p-scroller class="scroller" :scroll-to-position="scrollToPosition" style="white-space: nowrap">
      <p-tag-dismissible>START - some tag content</p-tag-dismissible>
      <p-tag-dismissible>MIDDLE - some tag content</p-tag-dismissible>
      <p-tag-dismissible>END - some tag content</p-tag-dismissible>
    </p-scroller>
    <p-text>{{scrollToPosition}}</p-text>
  </div>
</Playground>

## Scrollbar

The `p-scroller` component may have a scrollbar by setting the `scrollbar` property to `true`.

<Playground :markup="scrollbar" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getScrollerCodeSamples } from '@porsche-design-system/shared';
import type { Theme } from '@/models';
import { GRADIENT_COLORS } from './scroller-utils'; 
  
@Component
export default class Code extends Vue {
  config = { themeable: true };

  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }

  scrollIndicatorPosition = 'top';
  scrollToPosition = '{ scrollPosition: 220 }';

  codeExample = getScrollerCodeSamples();

  basicTagMarkup = `<div style="max-width: 600px">
  <p-scroller>
    <p-tag color="primary">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-info-soft">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-warning-soft">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="primary">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-info-soft">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-warning-soft">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="primary">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-info-soft">
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

  gradientColor = 'background-surface';
  gradientColors = GRADIENT_COLORS;
  get gradientColorMarkup() {
    return `<div style="max-width: 600px">
  <p-scroller gradient-color="${this.gradientColor}" style="white-space: nowrap">
    <p-tag color="primary">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-info-soft">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-warning-soft">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="primary">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-info-soft">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-warning-soft">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="primary">
      <button type="button">Some tag content</button>
    </p-tag>
    <p-tag color="notification-info-soft">
      <button type="button">Some tag content</button>
    </p-tag>
  </p-scroller>
</div>`;
  }
  scrollbar = `<div style="max-width: 600px">
  <p-scroller scrollbar="true">
    <p-text-list>
      <p-text-list-item>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. <br />At vero eos et accusam et justo duo dolores et ea rebum.
      </p-text-list-item>
      <p-text-list-item>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. <br />At vero eos et accusam et justo duo dolores et ea rebum.
        <p-text-list>
          <p-text-list-item>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. <br />At vero eos et accusam et justo duo dolores et ea
            rebum.
          </p-text-list-item>
          <p-text-list-item>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. <br />At vero eos et accusam et justo duo dolores et ea
            rebum.
          </p-text-list-item>
        </p-text-list>
      </p-text-list-item>
    </p-text-list>
  </p-scroller>
</div>`;
}
</script>

<style scoped lang="scss">

  :deep(p-scroller > p-text-list) {
    white-space: nowrap;
  }
  :deep(p-scroller > *) {
    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  .demo > button {
    margin: 0 16px 16px 0;
  }
</style>
