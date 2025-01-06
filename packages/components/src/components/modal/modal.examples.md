<ComponentHeading name="Modal"></ComponentHeading>

The `p-modal` is a temporary overlay to focus the user's attention on one task while interactions with the underlying
page are blocked. It is only used as highly disruptive modal notification to present important information until
dismissed. Or as overlay to confirm critical user actions, such as confirming an irreversible choice. It should be used
thoughtfully and sparingly.

It is a controlled component. This grants flexible control over the modal's behavior especially whether it should stay
open after user interaction like submission of a form.

<TableOfContents></TableOfContents>

## Basic

Following **web standards**, the component uses the native `<dialog />` element internally which ensures proper focus
handling including a **focus trap**. In addition, it's rendered on the `#top-layer` which ensures the element to be on
top of the page independent of where `p-modal` is placed in the DOM hierarchy (`z-index` is not relevant anymore and
won't have any effect).

The most important property of `p-modal` is its `open` property. When it's set to `true` the modal will be visible. In
order to get notified when the modal gets closed by clicking the `x` button, the backdrop or by pressing the `Escape`
key you need to register an event listener for the `dismiss` event which is emitted by `p-modal`.

The size of `p-modal` adjusts itself to the content with a predefined **min/max width** which aligns to the
**[Porsche Grid](styles/grid)**.

### Supported named slots:

- `slot="header"`: Renders a header section above the content area.
- `slot`: Shows the content area.
- `slot="footer"`: Shows a **sticky** footer section, flowing under the content area when scrollable.

<Playground :frameworkMarkup="codeSamples" :markup="codeSamples['vanilla-js']" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

To provide a unique **accessible name** for the dialog, it's mandatory to ensure that a meaningful `aria-label` is set
on the `dialog` element **inside** the shadowDOM. This is either done automatically by the component itself if
`slot="header"` is used **or** by using the `aria` property on the `p-modal` component.

## Dismiss Button

It's possible to render the modal without dismiss button. At the same time this also deactivates dismissing the modal by
pressing `Escape`.

<Playground :markup="dismissButtonMarkup" :config="config"></Playground>

## Disable Backdrop Click

It's possible to disable closing the modal by click on the backdrop.

<Playground :markup="disableBackdropClickMarkup" :config="config"></Playground>

## Backdrop

By default, `blur` should be used whenever the modal gets opened by a user interaction, e.g. a click on a button, to
allow the user to fully concentrate on the modal content. While `shading` should be used when the modal gets opened
automatically, e.g. through a "Cookie Consent Dialog", so that the user still knows which page it is.

<Playground :markup="backdropMarkup" :config="config">
  <PlaygroundSelect v-model="backdrop" :values="backdrops" name="backdrop"></PlaygroundSelect>
</Playground>

## Fullscreen

The modal supports a `fullscreen` property. Due to the size of fullscreen on desktop, it is easy to lose context for the
consumer. Furthermore, you lose helpful functionality like backdrop click. This is why fullscreen modals are recommended
for mobile devices only.

<Playground :markup="fullscreenMarkup" :config="config"></Playground>

Of course, any combination of the available options is possible.

## Example: Scrollable modal with sticky footer

If the modal's content does not fit into the current boundaries the content becomes scrollable and the footer area
sticky.

<Playground :markup="exampleScrollableMarkup" :config="config"></Playground>

## Example: Modal with Porsche Grid

The `p-modal` component makes decent changes to the Porsche Grid to give support if used as slotted content. The
following example shows the visualization of the Porsche Grid when used inside the modal component:

<template>
  <div class="playground">
    <div class="demo">
      <p-button type="button" aria="{ 'aria-haspopup': 'dialog' }" :theme="this.$store.getters.storefrontTheme">Open Modal</p-button>
      <p-modal open="false">
        <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
        <ExampleStylesGrid :visualizeGrid="true"/>
        <p-button-group slot="footer">
          <p-button>Accept</p-button>
          <p-button type="button" variant="secondary">Deny</p-button>
        </p-button-group>
      </p-modal>
    </div>
  </div>
</template>

## Example: Modal as alert dialog

The `p-modal` component can be used as an alert dialog. This is a modal dialog that interrupts the user's workflow to
draw attention to an important message and requires a response.

<Playground :markup="exampleAlertDialog" :config="config"></Playground>

## Custom styling

The modal component has some values which can be overwritten by CSS Custom Properties (aka CSS Variables). This might be
useful for e.g. a "Cookie Consent Dialog" to reserve certain space when used with `backdrop: 'shading'` to always have
the Porsche [crest](components/crest) or [wordmark](components/wordmark) visible in the background of the page. Since
the modal is centered within the viewport and shrinks to its content, the custom vertical spacing definition will act
like a safe zone.

In addition, it's possible to make containers or elements (e.g. `div`, `img` etc.) stretch into the padding safe-zone by
adding the <code v-text="stretchClassName"></code> CSS class.

```scss
// the modal comes with predefined margin / safe-zone which needs to be considered when a custom width is defined
--p-modal-width: clamp(276px, 45.25vw + 131px, 1000px);
--p-modal-spacing-top: 200px;
--p-modal-spacing-bottom: 50px;
```

<Playground :markup="customStylingMarkup" :config="config">
  <PlaygroundInput type="text" v-model="cssVariableWidth" name="Width"></PlaygroundInput>
  <PlaygroundInput type="number" v-model="cssVariableSpacingTop" name="Spacing Top (px)"></PlaygroundInput>
  <PlaygroundInput type="number" v-model="cssVariableSpacingBottom" name="Spacing Bottom (px)"></PlaygroundInput>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { cssClassNameStretchToFullModalWidth } from './modal-styles';
import { getModalCodeSamples } from '@porsche-design-system/shared';
import ExampleStylesGrid from '@/pages/patterns/styles/example-grid.vue';

@Component({
  components: {
    ExampleStylesGrid
  },
})
export default class Code extends Vue {
  config = { themeable: true };
  modals = [];
  codeSamples = getModalCodeSamples();

  mounted() {
    this.registerEvents();
  }

  updated() {
    /* event handling is registered again on every update since markup is changing and references are lost */
    this.registerEvents();
  }

  registerEvents() {
    this.modals = this.$el.querySelectorAll('.playground .demo > p-modal');
    this.modals.forEach((modal, index) => modal.addEventListener('dismiss', () => this.closeModal(index)));
    this.$el.querySelectorAll('.playground .demo > p-button').forEach((btn, index) => btn.addEventListener('click', () => this.openModal(index)));
  }

  openModal(index: number): void {
    this.modals[index].open = true;
  }

  closeModal(index: number): void {
    this.modals[index].open = false;
  }

  dismissButtonMarkup =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal dismiss-button="false" open="false" aria="{ 'aria-label': 'Some Label' }">
  <p-text>Some Content</p-text>
</p-modal>`;

  disableBackdropClickMarkup =
      `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
  <p-modal disable-backdrop-click="true" open="false" aria="{ 'aria-label': 'Some Label' }">
    <p-text>Some Content</p-text>
  </p-modal>`;

  backdrops = ['blur', 'shading'];
  backdrop = 'shading';
  get backdropMarkup() { 
    return `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal backdrop="${this.backdrop}" aria="{ 'aria-label': 'Some Label' }" open="false">
  <p-text>Some Content</p-text>
</p-modal>`;
  }

  fullscreenMarkup =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal fullscreen="{ base: true, s: false }" open="false" aria="{ 'aria-label': 'Some Label' }">
  <p-text>Some Content</p-text>
</p-modal>`;

  exampleScrollableMarkup =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal open="false">
  <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
  <p-text>Some Content Begin</p-text>
  <div style="width: 10px; height: 120vh; background: deeppink;"></div>
  <p-text>Some Content End</p-text>
  <p-button-group slot="footer">
    <p-button>Accept</p-button>
    <p-button type="button" variant="secondary">Deny</p-button>
  </p-button-group>
</p-modal>`;

exampleAlertDialog =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal open="false" aria="{ 'role': 'alertdialog' }" disable-backdrop-click="true">
  <p-heading slot="header" size="large" tag="h2">Some important Heading</p-heading>
  <p-text>Some important Content</p-text>
  <p-button-group slot="footer">
    <p-button type="button">Accept</p-button>
    <p-button type="button" variant="secondary">Deny</p-button>
  </p-button-group>
</p-modal>`;

  cssVariableSpacingTop = 200;
  cssVariableSpacingBottom = 50;
  cssVariableWidth = 'clamp(276px, 45.25vw + 131px, 1000px)';

  get stretchClassName(){
    return cssClassNameStretchToFullModalWidth; 
  }

  get customStylingMarkup() {
    return `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal open="false" backdrop="shading" aria="{ 'aria-label': 'Some Label' }" style="--p-modal-width: ${this.cssVariableWidth}; --p-modal-spacing-top: ${this.cssVariableSpacingTop}px; --p-modal-spacing-bottom: ${this.cssVariableSpacingBottom}px;">
  <img src="${require('@/assets/porsche-992-carrera-s.jpg')}" class="${cssClassNameStretchToFullModalWidth}">  
</p-modal>`;
  }
}
</script>
