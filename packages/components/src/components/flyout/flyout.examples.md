# Flyout

The `p-flyout` component, also known as a drawer, is a controlled component that overlays from the left or right side of
the screen. It is commonly used as a temporary workspace that allows users to complete tasks without navigating to a new
page or as a mobile navigation.

Flyouts are flexible in the context and can include other components of the Porsche Design System.

It is a controlled component. This grants you flexible control over the flyout's behavior especially whether it should
stay open after user interaction like submission of a form.

<Notification heading="Important note" state="warning">
  This component activates a focus trap to keep the focus within while being open.<br>
  This is achieved by detecting the first and last focusable child element after the flyout is opened.<br>
  Further DOM changes like adding or removing DOM nodes can only be detected on the first level, hence direct children of the flyout.
</Notification>

<Notification heading="Recommendation" state="success">
  You should only have a single instance of this component within your application. We recommend rendering it close to the body, e.g., in your App.tsx or app.component.ts. This way you reduce the chance of having issues with its z-index and fixed positioning.
</Notification>

<TableOfContents></TableOfContents>

## Basic

It is crucial to note that `p-flyout` is displayed within your DOM hierarchy as an overlay through a high `z-index`
value. Therefore, you need to ensure any parent elements don't define a `z-index` or have a `transform` style in place.
Otherwise, the flyout might get clipped or overlapped by other elements.

The most important property of `p-flyout` is its `open` attribute. When it is present the flyout will be visible.

In order to get notified when the flyout gets closed by clicking the `x` button, the backdrop or by pressing the
`Escape` key you need to register an event listener for the `dismiss` event which is emitted by `p-flyout`.

The size of `p-flyout` adjusts itself to the content with a predefined min/max width.

<Playground :frameworkMarkup="basicSample" :markup="basicSample['vanilla-js']" :config="config">
  <div class="select-container">
    <SelectOptions v-model="position" :values="positions" name="position"></SelectOptions>
  </div>
</Playground>

## Slotted header/footer/content

The flyout component supports slotted elements for enhanced customization:

Display a sticky `header` at the top of the flyout. When used the dismiss button will be within the header.

Show a sticky `footer` at the bottom of the flyout, flowing under the main content when scrollable or when there is
extra space.

You can use the `sub-footer` slot to display additional information below the footer. This slot is ideal for less
critical content, such as legal information or FAQs, which provides further details to the user. It appears when
scrolling to the end of the flyout or when there is available space to accommodate the content.

Make sure to set the `aria` property with a descriptive `aria-label` value when using slotted heading.

<Playground :frameworkMarkup="codeExampleSlotted" :markup="slottedSample['vanilla-js']" :config="config">
  <div class="select-container">
    <SelectOptions v-model="scrollable" :values="scrollables" name="scrollable"></SelectOptions>
    <SelectOptions v-model="subFooter" :values="subFooters" name="sub-footer"></SelectOptions>
  </div>
</Playground>

## Flyout with slotted Grid

The `p-flyout` component makes decent changes to support the Porsche Design System Grid if used as slotted content. The
following example shows the visualization of the grid if used inside the flyout component:

<template>
  <div class="playground">
    <div class="demo">
      <p-button class="flyout-grid-example" type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Flyout</p-button>
      <p-flyout id="flyout-grid" open="false" aria="{ 'aria-label': 'Sticky Heading' }">
        <div slot="header">
          <p-heading tag="h5" size="large">Sticky Heading</p-heading> 
          <p-text size="small">Sticky header text</p-text>
        </div>
        <ExampleStylesGrid :visualizeGrid="false"/> 
        <div slot="footer"><p-button>Footer Button</p-button></div>
        <div slot="sub-footer">Some Sub Footer Content</div>
      </p-flyout>
    </div>
  </div>
</template>

## Custom styling

The `p-flyout` component has a default of `max-width: 1180px`. This value can be overwritten by CSS Custom Properties
(aka CSS Variables):

```scss
// overwrite with CSS variables
p-flyout {
  --p-flyout-max-width: 200px;
}
```

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
  config = { themeable: true, overflowX: 'visible' };
  flyouts = [];
  codeExample = getFlyoutCodeSamples('default');
  codeExampleSlotted = getFlyoutCodeSamples('example-slotted'); 
  codeExampleSlottedSecondary = getFlyoutCodeSamples('example-slotted-secondary');

  blindtext = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'

  mounted() {
    this.registerEvents();
  }

  updated() {
    /* event handling is registered again on every update since markup is changing and references are lost */
    this.registerEvents();
  }

  registerEvents() {
    this.flyouts = document.querySelectorAll('p-flyout');
    
    const buttonsOpen = document.querySelectorAll('.playground .demo > p-button');
    buttonsOpen.forEach((btn, index) => btn.addEventListener('click', () => this.openFlyout(index)));
    
    this.flyouts.forEach((flyout, index) => {
      flyout.addEventListener('dismiss', () => this.closeFlyout(index));
    });
  }

    position = 'right';
    positions = ['left', 'right'];
    get basicSample() {
      Object.entries(this.codeExample).forEach(([key, value]) => this.codeExample[key] = value.replace(/left|right/, this.position));
      return this.codeExample
    }
    
    scrollable = 'true';
    scrollables = ['true', 'false'];
    subFooter = 'true';
    subFooters = ['true', 'false'];
    get slottedSample() {
      const content = '<div slot="sub-footer">Some Sub Footer Content</div>';
      Object.entries(this.codeExampleSlotted)
            .forEach(([key, value]) => 
                this.codeExampleSlotted[key] = value
                  .replace(/100vh|initial/, this.scrollable === 'true' ? '100vh' : 'initial')
                  .replace(/(\s*<div slot="sub-footer">Some Sub Footer Content<\/div>)?(\s*)(<\/p-flyout>|<\/PFlyout>)/, this.subFooter === 'true' ? `$2\t${content}$2$3` : '$2$3'));
      return this.codeExampleSlotted
    }
    
  openFlyout(index: number): void {
    this.flyouts[index].open = true;
  }

  closeFlyout(index: number): void {
    this.flyouts[index].open = false;
  }

}
</script>

<style lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  .select-container {
    display: flex; 
    column-gap: 16px; 
    flex-wrap: wrap; 
    padding-bottom: 16px
  }
</style>
