# Modal

The `p-modal` is a temporary overlay to focus the user's attention on one task while interactions with the underlying page are blocked. It is only used as highly disruptive modal notification to present important information until dismissed. Or as Modal Dialog to confirm critical user actions, such as confirming an irreversible choice. It should be used thoughtfully and sparingly.

Modals are flexible in the context and can include other components of the Porsche Design System.

It is a controlled component.
This grants you flexible control over the Modal's behavior especially whether it should stay open after user interaction like submission of a form.

<TableOfContents></TableOfContents>

## Basic

It is crucial to note that `p-modal` is displayed within your DOM hierarchy as an overlay through a high `z-index` value. 
Therefore, you need to ensure any parent elements don't define a `z-index` or have a `transform` style in place. 
Otherwise, the modal might get clipped or overlapped by other elements.

The most important property of `p-modal` is its `open` attribute.  When it is present the Modal will be visible.
  
In order to get notified when the Modal gets closed by clicking the `x` button, the backdrop or by pressing the `Escape` key you need to register an event listener for the `close` event which is emitted by `p-modal`.

The size of `p-modal` adjusts itself to the content with a predefined min/max width.

<Playground :markup="basic">
  <select v-model="width">
    <option disabled>Select a modal width</option>
    <option value="minWidth">min width</option>
    <option value="maxWidth">max width</option>
  </select>
</Playground>

Note that `.footer` is a custom CSS class in order to responsively style the buttons which is achieved with respect to guidelines for [Buttons](components/button/usage).

### <A11yIcon></A11yIcon> Accessibility hints
To support **keyboard navigation**, please take care of correct **focus handling** after closing the Modal with `ESC` or `Enter` key:
The trigger element (e.g. a button) which has opened the Modal must **receive focus state again** after the Modal is closed. This is important to keep focus order consistent.
You can test it out by navigation this example with the keyboard only.    
To announce the correct heading for **screen reader** users, it is mandatory to set the `heading` property or provide a meaningful heading through **ARIA** with the `aria` property.  

### Framework Implementations

<Playground :frameworkMarkup="frameworks"></Playground>

## Basic Scrollable

If the Modal's content does not fit into the current boundaries the content becomes scrollable.

<Playground :markup="scrollable"></Playground>

## Without Heading

Passing a `heading` to the modal is optional.
Make sure to set the `aria` property with a descriptive `aria-label` value when omitting the heading.
Make sure to add proper margin or padding to your content, so that the close button does not cover up your content.

<Playground :markup="withoutHeading"></Playground>

## Without Close Button

It is possible to not render the close button by setting the `disable-close-button` attribute.  
At the same time this also deactivates closing the Modal by pressing `Escape`.  
If you want to disable closing the Modal by clicking the backdrop, you can set the `disable-backdrop-click` attribute.

<Playground :markup="withoutCloseButton"></Playground>

## Full Width Content

It is possible to make containers stretch into the padding safe-zone by adding the `stretch-to-full-modal-width` class.
Make sure to set the `aria` property with a descriptive `aria-label` value when omitting the heading.  
Make sure to omit the `heading` when using the `stretch-to-full-modal-width` class.

<Playground :markup="fullWidthContent"></Playground>

## Fullscreen

The Modal supports a `fullscreen` property.
Due to the size of fullscreen on desktop, it is easy to lose context for the consumer. 
Furthermore, you lose helpful functionality like backdrop click. This is why fullscreen modals are recommended for mobile devices only.

<Playground :markup="fullscreen"></Playground>

Of course, any combination of the available options is possible.

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  modals = [];
  width = 'minWidth';

  frameworks = {
    'vanilla-js': `modal.addEventListener('close', () => {
  modal.open = false;
});`,
    angular: `import { Component } from '@angular/core';

@Component({
  selector: 'modal-page',
  template: \`<p-modal [open]="isModalOpen" (close)="handleModalClose($event)">...</p-modal>\`,
})
export class ModalPage {
  isModalOpen = false;

  handleModalClose(e: CustomEvent<void>) {
    this.isModalOpen = false;
  }
}`,
    react: `import { useCallback, useState } from 'react';
import { PModal } from '@porsche-design-system/components-react';

const ModalPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return <PModal open={isModalOpen} onClose={handleModalClose}>...</PModal>
}`,
  };

  mounted() {
    this.registerEvents();
    
    // workaround for iOS 13.x masking modal within example
    document.querySelectorAll('.example').forEach(el => el.style.overflow = 'visible');

    // workaround for iOS 13.x not respecting flex-wrap: wrap; correctly
    // timeout is needed for component to render 
    setTimeout(() => {
      document.getElementById('modal-scrollable').shadowRoot.querySelector('.root').style.alignSelf = 'start'
    }, 1000);
  }

  updated() {
    // event handling is registered again on every update since markup is changing and references are lost
    this.registerEvents();
  }

  registerEvents() {
    this.modals = Array.from(document.querySelectorAll('p-modal'));
    
    const buttonsOpen = Array.from(document.querySelectorAll('.playground .demo > p-button'));
    buttonsOpen.forEach((btn, index) => btn.addEventListener('click', () => this.openModal(index)));
    
    this.modals.forEach((modal, index) => {
      modal.addEventListener('close', () => this.closeModal(index));
      const buttons = Array.from(modal.querySelectorAll('p-button'));
      buttons.forEach((btn) => btn.addEventListener('click', () => this.closeModal(index)));
    });
  }


  get basic() {
    const content = this.width === 'maxWidth' ? '<div style="max-width: 100%; width: 100vw; height: 500px"><p-text>Some Content in responsive max width</p-text></div>' : '<p-text>Some Content</p-text>';
    
    return `<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal heading="Some Heading" open="false">
  ${content}
  <p-button-group class="footer">
    <p-button>Save</p-button>
    <p-button type="button" variant="tertiary" icon="close">Close</p-button>
  </p-button-group>
</p-modal>`;}
  
  scrollable =
`<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal id="modal-scrollable" heading="Some Heading" open="false">
  <p-text>Some Content</p-text>
  <div style="height: 40vh;"></div>
  <p-text>More Content</p-text>
  <div style="height: 40vh;"></div>
  <p-text>Even More Content</p-text>
  <p-button-group class="footer">
    <p-button>Save</p-button>
    <p-button type="button" variant="tertiary" icon="close">Close</p-button>
  </p-button-group>
</p-modal>`;

  withoutHeading =
`<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal open="false" aria="{'aria-label': 'Some Heading'}">
  <p-text>Some Content</p-text>
</p-modal>`;

  withoutCloseButton =
`<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal heading="Some Heading" disable-close-button open="false">
  <p-text>Some Content</p-text>
</p-modal>`;

  fullWidthContent =
`<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal open="false" aria="{'aria-label': 'Some Heading'}">
  <div class="stretch-to-full-modal-width">
    <div style="width: 100%; height: 200px; background-color: lightskyblue;"></div>
  </div>
  <p-text>Some Content</p-text>
</p-modal>`;

  fullscreen =
`<p-button type="button" aria="{ 'aria-haspopup': 'dialog' }">Open Modal</p-button>
<p-modal heading="Some Heading" open="false" fullscreen="{ base: true, s: false }">
  <p-flex direction="column" class="fullscreen-container">
    <p-flex-item grow="1">
      <p-text>Some Content</p-text>
    </p-flex-item>
    <p-button-group class="footer">
      <p-button>Save</p-button>
      <p-button type="button" variant="tertiary" icon="close">Close</p-button>
    </p-button-group>
  </p-flex>
</p-modal>`;

  openModal(index: number): void {
    this.modals[index].open = true;
  }
  
  closeModal(index: number): void {
    this.modals[index].open = false;
  }
}
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  
  ::v-deep .footer {  
    padding: p-px-to-rem(32px) 0 0;
  }
  ::v-deep .fullscreen-container {
    flex: 1;
  }
</style>
