<ComponentHeading name="Modal"></ComponentHeading>

The `p-modal` is a temporary overlay to focus the user's attention on one task while interactions with the underlying
page are blocked. It is only used as highly disruptive modal notification to present important information until
dismissed. Or as Modal Dialog to confirm critical user actions, such as confirming an irreversible choice. It should be
used thoughtfully and sparingly.

Modals are flexible in the context and can include other components of the Porsche Design System.

It is a controlled component. This grants you flexible control over the modal's behavior especially whether it should
stay open after user interaction like submission of a form.

<Notification heading="Scroll-lock" heading-tag="h2" state="warning">
  This component sets <code>overflow: hidden</code> on the body when opened in order to prevent background scrolling.<br> 
  This doesn't work completely reliable under iOS but is the most stable solution.<br>
  Feel free to address this issue in an Open Source PR, if you can provide a better solution. <b><a href="https://github.com/porsche-design-system/porsche-design-system/blob/main/packages/components/src/utils/setScrollLock.ts">Current implementation</a></b><br> 
</Notification>

<TableOfContents></TableOfContents>

## Basic

Following web standards, the component uses the native `<dialog />` element internally which ensures proper focus
handling including a focus trap. In addition, it's rendered on the `#top-layer` which ensures the element to be on top
of the page independent of where `p-modal` is placed in the DOM hierarchy (`z-index` is not relevant anymore and won't
have any effect).

The most important property of `p-modal` is its `open` property. When it's set to `true` the modal will be visible.

In order to get notified when the modal gets closed by clicking the `x` button, the backdrop or by pressing the `Escape`
key you need to register an event listener for the `dismiss` event which is emitted by `p-modal`.

The size of `p-modal` adjusts itself to the content with a predefined min/max width.

<Notification heading="Deprecation hint" heading-tag="h3" state="warning">
  The <code>close</code> event has been deprecated and will be removed with the next major release.<br>
  Please use the <code>dismiss</code> event instead.
</Notification>

<Playground :frameworkMarkup="codeExampleAccessibility" :markup="widthMarkup" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

To support **keyboard navigation**, please take care of correct **focus handling** after closing the modal with `ESC` or
`Enter` key: The trigger element (e.g. a button) which has opened the modal must **receive focus state again** after the
Modal is closed. This is important to keep focus order consistent. You can test it out by navigation this example with
the keyboard only.  
To announce the correct heading for **screen reader** users, it is mandatory to set the `heading` property or provide a
meaningful heading through **ARIA** with the `aria` property.

## Framework Implementations

<Playground :frameworkMarkup="codeExampleAccessibility" :markup="widthMarkup" :config="config"></Playground>

## Basic Scrollable

If the modal's content does not fit into the current boundaries the content becomes scrollable.

<Playground :markup="scrollable" :config="config"></Playground>

## Slotted heading

Sometimes it's useful to be able to render markup for `heading`. Therefore, a named slot can be used. Make sure **not**
to define the corresponding property on the host element when a named slot is used (because a property definition is
preferred over a named slot).  
Make sure to set the `aria` property with a descriptive `aria-label` value when using slotted heading.

<Playground :markup="slottedHeading" :config="config"></Playground>

## Without Heading

Passing a `heading` to the modal is optional. Make sure to set the `aria` property with a descriptive `aria-label` value
when omitting the heading. Make sure to add proper margin or padding to your content, so that the close button does not
cover up your content.

<Playground :markup="withoutHeading" :config="config"></Playground>

## Without Close/Dismiss Button

It is possible to not render the dismiss button by setting the `dismiss-button="false"` attribute.  
At the same time this also deactivates dismissing the modal by pressing `Escape`.  
If you want to prevent dismissing the modal by clicking the backdrop, you can set the `disable-backdrop-click`
attribute.

<Notification heading="Deprecation hint" heading-tag="h3" state="warning">
  The <code>disableCloseButton</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>dismissButton</code> property instead.
</Notification>

<Playground :markup="withoutDismissButton" :config="config"></Playground>

## Sticky Footer

If you need a footer that is always visible, for example with a call-to-action button, you can use a named
`slot="footer"`.

<Playground :markup="stickyFooter" :config="config"></Playground>

## Full Width Content

It is possible to make containers or elements (e.g. `div`, `img` etc.) stretch into the padding safe-zone by adding the
<code v-text="stretchClassName"></code> class. Make sure to set the `aria` property with a descriptive `aria-label`
value when omitting the heading.

<Playground :markup="fullWidthContent" :config="config"></Playground>

## Backdrop

By default, `blur` should be used whenever the Modal gets opened by a user interaction, e.g. a click on a button, to
allow the user to fully concentrate on the Modal content. While `shading` should be used when the Modal gets opened
automatically, e.g. through a "Cookie Consent Dialog", so that the user still knows which page it is.

<Playground :markup="backdropMarkup" :config="config">
  <PlaygroundSelect v-model="backdrop" :values="backdrops" name="backdrop"></PlaygroundSelect>
</Playground>

## Fullscreen

The Modal supports a `fullscreen` property. Due to the size of fullscreen on desktop, it is easy to lose context for the
consumer. Furthermore, you lose helpful functionality like backdrop click. This is why fullscreen modals are recommended
for mobile devices only.

<Playground :markup="fullscreen" :config="config"></Playground>

Of course, any combination of the available options is possible.

## Custom styling

The Modal component has some values which can be overwritten by CSS Custom Properties (aka CSS Variables). This might be
useful for e.g. a "Cookie Consent Dialog" to reserve certain space when used with `backdrop: 'shading'` to always have
the Porsche [crest](components/crest) or [wordmark](components/wordmark) visible in the background of the page. Since
the Modal is centered within the viewport and shrinks to its content, the custom vertical spacing definition will act
like a safe zone.

```scss
--p-modal-spacing-top: 200px;
--p-modal-spacing-bottom: 50px;
```

<Playground :markup="customStylingMarkup" :config="config">
  <PlaygroundInput type="number" v-model="spacingTop" name="Spacing Top (px)"></PlaygroundInput>
  <PlaygroundInput type="number" v-model="spacingBottom" name="Spacing Bottom (px)"></PlaygroundInput>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { cssClassNameStretchToFullModalWidth } from './modal-styles'; 
import { getModalCodeSamples } from '@porsche-design-system/shared'; 

@Component
export default class Code extends Vue {
  config = { themeable: true };
  modals = [];
  codeExampleAccessibility = getModalCodeSamples();

  mounted() {
    this.registerEvents();
    
    /* workaround for iOS 13.x masking modal within example */
    document.querySelectorAll('.example').forEach(el => el.style.overflow = 'visible');

    /* workaround for iOS 13.x not respecting flex-wrap: wrap; correctly */
    componentsReady(this.$el).then(() => {
      document.getElementById('modal-scrollable').shadowRoot.querySelector('.root').style.alignSelf = 'start'
    });
  }

  updated() {
    /* event handling is registered again on every update since markup is changing and references are lost */
    this.registerEvents();
  }

  registerEvents() {
    this.modals = document.querySelectorAll('p-modal');
    
    const buttonsOpen = document.querySelectorAll('.playground .demo > p-button');
    buttonsOpen.forEach((btn, index) => btn.addEventListener('click', () => this.openModal(index)));
    
    this.modals.forEach((modal, index) => {
      modal.addEventListener('dismiss', () => this.closeModal(index));
      const buttons = modal.querySelectorAll('p-button');
      buttons.forEach((btn) => btn.addEventListener('click', () => this.closeModal(index)));
    });
  }

  get stretchClassName(){
    return cssClassNameStretchToFullModalWidth; 
  }

  width = 'minWidth';
  widths = ['minWidth', 'maxWidth'];
  get widthMarkup() {
    const content = this.width === 'maxWidth' ? '<div style="max-width: 100%; width: 100vw; height: 500px"><p-text>Some Content in responsive max width</p-text></div>' : '<p-text>Some Content</p-text>';
    
    return `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal heading="Some Heading" open="false">
  ${content}
  <p-button-group class="footer">
    <p-button>Save</p-button>
    <p-button type="button" variant="secondary" icon="close">Close</p-button>
  </p-button-group>
</p-modal>`;}

  scrollable =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal id="modal-scrollable" heading="Some Heading" open="false">
  <p-text>Some Content Begin</p-text>
  <div style="width: 10px; height: 120vh; background: deeppink;"></div>
  <p-text>Some Content End</p-text>
  <p-button-group class="footer">
    <p-button>Save</p-button>
    <p-button type="button" variant="secondary" icon="close">Close</p-button>
  </p-button-group>
</p-modal>`;

  slottedHeading = 
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal open="false" aria="{ 'aria-label': 'Some Heading' }">
  <div slot="heading">
    <p-text>Some subtitle</p-text>
    <p-headline tag="h2">Some Heading</p-headline>        
  </div>
  <p-text>Some Content</p-text>
</p-modal>`;

  withoutHeading =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal open="false" aria="{ 'aria-label': 'Some Heading' }">
  <p-text>Some Content</p-text>
</p-modal>`;

  withoutDismissButton =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal heading="Some Heading" dismiss-button="false" open="false">
  <p-text>Some Content</p-text>
</p-modal>`;

  stickyFooter =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal heading="Some Heading" fullscreen="{ base: true, s: false }" open="false">
  <p-text>Some Content Begin</p-text>
  <div style="width: 10px; height: 120vh; background: deeppink;"></div>
  <p-text>Some Content End</p-text>
  <p-text slot="footer">Sticky footer</p-text>
</p-modal>`;

  fullWidthContent =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal open="false" aria="{ 'aria-label': 'Some Heading' }">
  <img src="${require('@/assets/porsche-992-carrera-s.jpg')}" class="${cssClassNameStretchToFullModalWidth}">  
  <p-headline tag="h2" style="padding: 1.5rem 0">Some Heading</p-headline>
  <p-text>Some Content</p-text>
</p-modal>`;

  backdrops = ['blur', 'shading'];
  backdrop = 'shading';
  get backdropMarkup() { 
    return `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal heading="Some Heading" backdrop="${this.backdrop}" open="false">
  <p-text>Some Content</p-text>
</p-modal>`;
  }

  fullscreen =
    `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal heading="Some Heading" fullscreen="{ base: true, s: false }" open="false">
  <p-text>Some Content</p-text>
  <p-button-group class="footer">
    <p-button type="button">Save</p-button>
    <p-button type="button" variant="secondary">Close</p-button>
  </p-button-group>
</p-modal>`;

  spacingTop = 200;
    spacingBottom = 50;

  get customStylingMarkup() {
    return `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal heading="Some Heading" open="false" backdrop="shading" style="--p-modal-spacing-top: ${this.spacingTop}px; --p-modal-spacing-bottom: ${this.spacingBottom}px;">
  <p-text>Some Content</p-text>
</p-modal>`;
  }

  openModal(index: number): void {
    this.modals[index].open = true;
  }

  closeModal(index: number): void {
    this.modals[index].open = false;
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  :deep(.footer) {  
    padding: 2rem 0 0;
  }
</style>
