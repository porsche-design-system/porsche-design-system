# Flyout

The `p-flyout` component, also known as a drawer, is a controlled component that overlays from the left or right side of
the screen. It is commonly used as a temporary workspace that allows users to complete tasks without navigating to a new
page or as a mobile navigation.

Flyouts are flexible in the context and can include other components of the Porsche Design System.

It is a controlled component. This grants you flexible control over the flyout's behavior especially whether it should
stay open after user interaction like submission of a form.

<p-inline-notification heading="Important note" state="warning" dismiss-button="false">
  This component activates a focus trap to keep the focus within while being open.<br>
  This is achieved by detecting the first and last focusable child element after the flyout is opened.<br>
  Further DOM changes like adding or removing DOM nodes can only be detected on the first level, hence direct children of the flyout. 
</p-inline-notification>

<p-inline-notification heading="Recommendation" state="success" dismiss-button="false">
  You should only have a single instance of this component within your application. We recommend rendering it close to the body, e.g., in your App.tsx or app.component.ts. This way you reduce the chance of having issues with its z-index and fixed positioning. 
</p-inline-notification>

<TableOfContents></TableOfContents>

## Basic

It is crucial to note that `p-flyout` is displayed within your DOM hierarchy as an overlay through a high `z-index`
value. Therefore, you need to ensure any parent elements don't define a `z-index` or have a `transform` style in place.
Otherwise, the flyout might get clipped or overlapped by other elements.

The most important property of `p-flyout` is its `open` attribute. When it is present the flyout will be visible.

In order to get notified when the flyout gets closed by clicking the `x` button, the backdrop or by pressing the
`Escape` key you need to register an event listener for the `dismiss` event which is emitted by `p-flyout`.

The size of `p-flyout` adjusts itself to the content with a predefined min/max width.

<Playground :markup="widthPositionMarkup" :config="config">
  <SelectOptions v-model="position" :values="positions" name="position"></SelectOptions>
  <SelectOptions v-model="width" :values="widths" name="width"></SelectOptions>
</Playground>

## Slotted header/footer/content

The flyout component supports slotted elements for enhanced customization:

Display a sticky `header` at the top of the flyout. When used the dismiss button will be within the header.

Show a sticky `footer` at the bottom of the flyout, flowing under the main content when scrollable or when there is
extra space.

You can use the `secondary-content` slot to display additional information below the footer. This slot is ideal for less
critical content, such as legal information or FAQs, which provides further details to the user. It appears when
scrolling to the end of the flyout or when there is available space to accommodate the content.

Make sure to set the `aria` property with a descriptive `aria-label` value when using slotted heading.

<Playground :markup="slottedMarkup" :config="config">
  <SelectOptions v-model="scrollable" :values="scrollables" name="scrollable"></SelectOptions>
</Playground>

### Framework Implementations

<Playground :frameworkMarkup="codeExample" :markup="slottedMarkup" :config="config"></Playground>

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

@Component
export default class Code extends Vue {
  config = { themeable: true };
  flyouts = [];
  codeExample = getFlyoutCodeSamples();

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

    width = 'minWidth';
    widths = ['minWidth', 'maxWidth'];
    position = 'right';
    positions = ['left', 'right'];
    get widthPositionMarkup() {
      const content = this.width === 'maxWidth' ? '<div style="max-width: 100%; width: 100vw; height: 500px"><p-text>Some Content in responsive max width</p-text></div>' : '<p-text>Some Content</p-text>';
      
return `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Flyout</p-button>

<p-flyout open="false" position="${this.position}">
  ${content}
</p-flyout>`;
    }

  scrollable = 'true';
  scrollables = ['true', 'false'];
  get slottedMarkup() {
const content = this.scrollable === 'true' ? `<p-text>Some Content</p-text>
  <div style="height: 40vh;"></div>
  <p-text>More Content</p-text>
  <div style="height: 40vh;"></div>
  <p-text>Even More Content</p-text>` : '<p-text>Some Content</p-text>';
return `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Flyout</p-button>
<p-flyout open="false" aria="{ 'aria-label': 'Sticky Heading' }">
  <div slot="header">
    <p-heading tag="h5" size="large">Sticky Heading</p-heading>
    <p-text size="small">Sticky header text</p-text>
  </div>
  ${content}
  <div slot="footer">
    <p-button>Footer Button</p-button>
  </div>
  <p-text slot="secondary-content">Some Secondary Content</p-text>
</p-flyout>`;
  }

  openFlyout(index: number): void {
    this.flyouts[index].open = true;
  }

  closeFlyout(index: number): void {
    this.flyouts[index].open = false;
  }
}
</script>
