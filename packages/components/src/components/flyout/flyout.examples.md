<ComponentHeading name="Flyout"></ComponentHeading>

The `p-flyout` is a overlay from the left or right side of the screen. It is commonly used as a temporary workspace that
allows users to complete tasks without navigating to a new page or as a mobile navigation.

It is a controlled component. This grants flexible control over the flyout's behavior especially whether it should stay
open after user interaction like submission of a form.

<Notification heading="Scroll-lock" heading-tag="h2" state="warning">
  This component sets <code>overflow: hidden</code> on the body when opened in order to prevent background scrolling.<br> 
  This doesn't work completely reliable under iOS but is the most stable solution.<br>
  Feel free to address this issue in an Open Source PR, if you can provide a better solution. <b><a href="https://github.com/porsche-design-system/porsche-design-system/blob/main/packages/components/src/utils/setScrollLock.ts">Current implementation</a></b>
</Notification>

<TableOfContents></TableOfContents>

## Basic

Following **web standards**, the component uses the native `<dialog />` element internally which ensures proper focus
handling including a **focus trap**. In addition, it's rendered on the `#top-layer` which ensures the element to be on
top of the page independent of where `p-flyout` is placed in the DOM hierarchy (`z-index` is not relevant anymore and
won't have any effect).

The most important property of `p-flyout` is its `open` property. When it's set to `true` the flyout will be visible. In
order to get notified when the flyout gets closed by clicking the `x` button, the backdrop or by pressing the `Escape`
key you need to register an event listener for the `dismiss` event which is emitted by `p-flyout`.

The size of `p-flyout` adjusts itself to the content with a predefined **min/max width**.

#### Supported named slots:

- `slot="header"`: Renders a **sticky** header section above the content area.
- `slot`: Shows the content area.
- `slot="footer"`: Shows a **sticky** footer section, flowing under the content area when scrollable.
- `slot="sub-footer"`: Shows a sub-footer section to display additional information below the footer. This slot is ideal
  for less critical content, such as legal information or FAQs, which provides further details to the user. It appears
  when scrolling to the end of the flyout or when there is available space to accommodate the content.

<PlaygroundConfigurator :component="'p-flyout'" :code-samples="codeSamples"></PlaygroundConfigurator>

### <A11yIcon></A11yIcon> Accessibility hints

To provide a unique accessible name for the dialog, it's mandatory to set a meaningful label with the `aria` property.

## Disable Backdrop Click

It's possible to disable closing the flyout by click on the backdrop.

<Playground :markup="disableBackdropClickMarkup" :config="config"></Playground>

## Position

<Playground :markup="positionMarkup" :config="config">
  <PlaygroundSelect v-model="position" :values="positions" name="position"></PlaygroundSelect>
</Playground>

## Example: Scrollable footer with sticky footer and sub footer

If the flyout's content does not fit into the current boundaries the content becomes scrollable and the footer area
sticky.

<Playground :markup="exampleScrollableMarkup" :config="config"></Playground>

## Example: Sticky content with Custom CSS Property (Experimental)

In order to display some sticky element within the flyout content you can use the experimental `--p-flyout-sticky-top`
CSS custom property to account for the height of the header.

<Playground :markup="exampleCssVariableMarkup" :config="config"></Playground>

## Example: Flyout with Porsche Grid

The `p-flyout` component makes decent changes to the Porsche Grid to give support if used as slotted content. The
following example shows the visualization of the Porsche Grid when used inside the flyout component:

<template>
  <div class="playground">
    <div class="demo">
      <p-button type="button" aria="{ 'aria-haspopup': 'dialog' }" :theme="this.$store.getters.storefrontTheme">Open Flyout</p-button>
      <p-flyout open="false" aria="{ 'aria-label': 'Some Heading' }">
        <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
        <ExampleStylesGrid :visualizeGrid="true"/>
        <p-button-group slot="footer">
          <p-button>Proceed</p-button>
          <p-button type="button" variant="secondary">Cancel</p-button>
        </p-button-group>
        <p-text slot="sub-footer">Some additional Sub-Footer</p-text>
      </p-flyout>
    </div>
  </div>
</template>

## Custom styling

The flyout component has some values which can be overwritten by CSS Custom Properties (aka CSS Variables).

```scss
--p-flyout-width: 80vw;
--p-flyout-max-width: 1000px;
```

<Playground :markup="customStylingMarkup" :config="config">
  <PlaygroundInput type="text" v-model="cssVariableWidth" name="Width"></PlaygroundInput>
  <PlaygroundInput type="text" v-model="cssVariableMaxWidth" name="MaxWidth"></PlaygroundInput>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import { getFlyoutCodeSamples } from "@porsche-design-system/shared";  
import ExampleStylesGrid from '@/pages/patterns/styles/example-grid.vue';

@Component({
  components: {
    ExampleStylesGrid
  },
})
export default class Code extends Vue {
  config = { themeable: true };
  flyouts = [];
  codeSamples = getFlyoutCodeSamples();

  mounted() {
    this.registerEvents();
  }

  updated() {
    /* event handling is registered again on every update since markup is changing and references are lost */
    this.registerEvents();
  }

  registerEvents() {
    this.flyouts = this.$el.querySelectorAll('.playground .demo > p-flyout');
    this.flyouts.forEach((flyout, index) => flyout.addEventListener('dismiss', () => this.closeFlyout(index)));
    this.$el.querySelectorAll('.playground .demo > p-button').forEach((btn, index) => btn.addEventListener('click', () => this.openFlyout(index)));
  }

  openFlyout(index: number): void {
    this.flyouts[index].open = true;
  }

  closeFlyout(index: number): void {
    this.flyouts[index].open = false;
  }

  disableBackdropClickMarkup =
      `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Flyout</p-button>
  <p-flyout disable-backdrop-click="true" open="false" aria="{ 'aria-label': 'Some Heading' }">
    <p-text>Some Content</p-text>
  </p-flyout>`;

  positions = ['start', 'end'];
  position = 'end';
  get positionMarkup() { 
    return `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Flyout</p-button>
<p-flyout position="${this.position}" aria="{ 'aria-label': 'Some Heading' }" open="false">
  <p-text>Some Content</p-text>
</p-flyout>`;
  }

  exampleScrollableMarkup =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Flyout</p-button>
<p-flyout open="false" aria="{ 'aria-label': 'Some Heading' }">
  <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
  <p-text>Some Content Begin</p-text>
  <div style="width: 10px; height: 120vh; background: deeppink;"></div>
  <p-text>Some Content End</p-text>
  <p-button-group slot="footer">
    <p-button type="button">Proceed</p-button>
    <p-button type="button" variant="secondary">Cancel</p-button>
  </p-button-group>
  <p-text slot="sub-footer">Some additional Sub-Footer</p-text>
</p-flyout>`;

  exampleCssVariableMarkup = 
  `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Flyout</p-button>
<p-flyout>
  <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
  <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px; align-items: flex-start">
    <div
      style="
        position: sticky;
        top: calc(var(--p-flyout-sticky-top, 0) + 16px);
        padding: 16px;
        background: rgba(255, 0, 0, 0.1);
      "
    >
      Some sticky element within content relying on --p-flyout-sticky-top
    </div>
    <div>
      <p-text>Some Content Begin</p-text>
      <div style="width: 10px; height: 120vh; background: deeppink;"></div>
      <p-text>Some Content End</p-text>
    </div>  
  </div>
</p-flyout>`;

  cssVariableWidth = '80vw';
  cssVariableMaxWidth = '1000px';

  get customStylingMarkup() {
    return `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Flyout</p-button>
<p-flyout open="false" aria="{ 'aria-label': 'Some Heading' }" style="--p-flyout-width: ${this.cssVariableWidth}; --p-flyout-max-width: ${this.cssVariableMaxWidth};">
  <p-text>Some content</p-text>
</p-flyout>`;
  }
}
</script>
