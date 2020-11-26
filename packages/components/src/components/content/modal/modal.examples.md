# Modal

A Modal is a temporary overlay to focus the user's attention on one task while interactions with the underlying page are blocked. It is only used as highly disruptive modal notification to present important information until dismissed. Or as Modal Dialog to confirm critical user actions, such as confirming an irreversible choice. It should be used thoughtfully and sparingly.

Modals are flexible in the context and can include other components of the Porsche Design System.

## Basic

`p-modal` is a component which does not work by itself and needs to be controlled from the outside.  
This grants you flexible control over the Modal's behavior especially whether it should stay open after user interaction like submission of a form.

It is crucial to note that `p-modal` is displayed within your DOM hierarchy as an overlay through a high `z-index` value. 
Therefore, you need to ensure any parent elements don't define a `z-index` or have a `transform` style in place. 
Otherwise, the modal might get clipped or overlapped by other elements.

The most important property of `p-modal` is its `open` attribute.  When it is present the Modal will be visible.
  
In order to get notified when the Modal gets closed by clicking the `x` button, the backdrop or by pressing the `Escape` key you need to register an event listener for the `close` event which is emitted by `p-modal`.

```
modal.addEventListener('close', () => {
  modal.removeAttribute('open');
});
```

<Playground :markup="basic"></Playground>

Note that `.footer` is a custom CSS class in order to responsively style the buttons which is achieved with respect to guidelines for [Buttons](#/patterns/buttons).

## Basic Scrollable

If the Modal's content does not fit into the current boundaries the content becomes scrollable.

<Playground :markup="scrollable"></Playground>

## Without Heading

Passing a `heading` to the modal is optional. 

<Playground :markup="withoutHeading"></Playground>

## Without Close Button

It is possible to not render the close button by setting the `disable-close-button` attribute.  
At the same time this also deactivates closing the Modal by pressing `Escape`.  
If you want to disable closing the Modal by clicking the backdrop, you can set the `disable-backdrop-click` attribute.

<Playground :markup="withoutCloseButton"></Playground>

Of course, any combination of the available options is possible.

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    modals = [];
    
    mounted() {
      this.modals = Array.from(document.querySelectorAll('p-modal'));
      
      const buttonsOpen = Array.from(document.querySelectorAll('.playground .demo > p-button'));
      buttonsOpen.forEach((btn, index) => btn.addEventListener('click', () => this.openModal(index)));
      
      this.modals.forEach((modal, index) => {
        modal.addEventListener('close', () => this.closeModal(index));
        const buttons = Array.from(modal.querySelectorAll('p-button'));
        buttons.forEach((btn) => btn.addEventListener('click', () => this.closeModal(index)));
      });
      
      // workaround for iOS 13.x masking modal within example
      document.querySelectorAll('.example').forEach(el => el.style.overflow = 'visible');

      // workaround for iOS 13.x not respecting flex-wrap: wrap; correctly
      // timeout is needed for component to render 
      setTimeout(() => {
        document.getElementById('modal-scrollable').shadowRoot.querySelector('.p-modal').style.alignSelf = 'start'
      }, 1000);
    }
    
    updated() {
      console.log('updated');
      // event handling is registered again on every update since markup is changing and references are lost
      this.registerEvents();
    }
    
    basic =
`<p-button>Open Modal</p-button>
<p-modal heading="Some Heading" open="false">
  <p-text>Some Content</p-text>
  <p-flex class="footer">
    <p-button>Save</p-button>
    <p-button variant="tertiary">Close</p-button>
  </p-flex>
</p-modal>`;
    
    scrollable =
`<p-button>Open Modal</p-button>
<p-modal id="modal-scrollable" heading="Some Heading" open="false">
  <p-text>Some Content</p-text>
  <div style="height: 40vh;"></div>
  <p-text>More Content</p-text>
  <div style="height: 40vh;"></div>
  <p-text>Even More Content</p-text>
  <p-flex class="footer">
    <p-button>Save</p-button>
    <p-button variant="tertiary">Close</p-button>
  </p-flex>
</p-modal>`;
    
    withoutHeading =
`<p-button>Open Modal</p-button>
<p-modal open="false">
  <p-text>Some Content</p-text>
</p-modal>`;
    
    withoutCloseButton =
`<p-button>Open Modal</p-button>
<p-modal heading="Some Heading" disable-close-button open="false">
  <p-text>Some Content</p-text>
</p-modal>`;
    
    openModal(index: number): void {
      this.modals[index].setAttribute('open', 'true');
    }
    
    closeModal(index: number): void {
      this.modals[index].setAttribute('open', 'false');
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  @mixin p-row() {
    flex-direction: row;
    > * {
      width: auto;
      &:not(:last-child) {
        margin-right: $p-spacing-16;
      }
      &:not(:first-child) {
        margin-top: 0;
      }
    }
  } 
  
  @mixin p-col() {
    flex-direction: column;
    > * {
      width: 100%;
      &:not(:first-child) {
        margin-top: $p-spacing-16;
      }
      &:not(:last-child) {
        margin-right: 0;
      }
    }
  }
  
  ::v-deep .footer {
    @include p-col;
    padding: p-px-to-rem(16px) 0 0;
    
    @include p-media-query('s') {
      @include p-row;
      padding: p-px-to-rem(32px) 0 0;
    }
  }
</style>