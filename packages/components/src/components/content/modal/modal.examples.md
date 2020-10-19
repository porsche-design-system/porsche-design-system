# Modal

A Modal is a temporary overlay to focus the user's attention on one task while interactions with the underlying page are blocked. It is only used as highly disruptive modal notification to present important information until dismissed. Or as modal dialog to confirm critical user actions, such as confirming an irreversible choice. It should be used thoughtfully and sparingly.

Modals are flexible in the context and can include other components of the Porsche Design System.

## Basic

`p-modal` is a component which does not work by itself and needs to be controlled from the outside.  
This grants you flexible control over the Modal's behavior especially whether it should stay open after user interaction like submission of a form.

The most important property of `p-modal` is its `open` attribute.  When it is present the Modal will be visible.
  
In order to get notified when the Modal gets closed by clicking the `x` button, the backdrop or by pressing the `Escape` key you need to register an event listener for the `close` event which is emitted by `p-modal`.

```
modal.addEventListener('close', () => {
  modal.removeAttribute('open');
});
```

<Playground>
  <p-button @click="openModal(0)">Open Modal</p-button>
  <p-modal heading="Some Heading" :open="isOpen(0)" v-on:close="closeModal(0)">
    <p-text>Some Content</p-text>
    <p-flex class="footer">
      <p-button @click="closeModal(0)">Save</p-button>
      <p-button variant="tertiary" @click="closeModal(0)">Close</p-button>
    </p-flex>
  </p-modal>
</Playground>

Note that `.footer` is a custom CSS class in order to responsively style the buttons which is achieved with respect to guidelines for [Buttons](#/patterns/buttons).


## Basic Scrollable

If the Modal's content does not fit into the current boundaries the content becomes scrollable.

<Playground>
  <p-button @click="openModal(1)">Open Modal</p-button>
  <p-modal id="modal-scrollable" heading="Some Heading" :open="isOpen(1)" v-on:close="closeModal(1)">
    <p-text>Some Content</p-text>
    <div style="height: 40vh;"></div>
    <p-text>More Content</p-text>
    <div style="height: 40vh;"></div>
    <p-text>Even More Content</p-text>
    <p-flex class="footer">
      <p-button @click="closeModal(1)">Save</p-button>
      <p-button variant="tertiary" @click="closeModal(1)">Close</p-button>
    </p-flex>
  </p-modal>
</Playground>


## Without Heading

Passing a `heading` to the modal is optional. 

<Playground>
  <p-button @click="openModal(2)">Open Modal</p-button>
  <p-modal :open="isOpen(2)" v-on:close="closeModal(2)">
    <p-text>Some Content</p-text>
  </p-modal>
</Playground>

## Without Close Button

It is possible to not render the close button by setting the `disable-close-button` attribute.  
At the same time this also deactivates closing the Modal by pressing `Escape`.  
If you want to disable closing the Modal by clicking the backdrop, you can set the `disable-backdrop-click` attribute.

<Playground>
  <p-button @click="openModal(3)">Open Modal</p-button>
  <p-modal heading="Some Heading" disable-close-button :open="isOpen(3)" v-on:close="closeModal(3)">
    <p-text>Some Content</p-text>
  </p-modal>
</Playground>

Of course, any combination of the available options is possible.

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class PlaygroundModal extends Vue {
    private modalState: {[key: number]: boolean} = {};
    
    private mounted() {
      this.modalState = { ...Array.from(Array(document.querySelectorAll('.playground').length)) };

      // workaround for iOS 13.x masking modal within example
      document.querySelectorAll('.example').forEach(el => el.style.overflow = 'visible');

      // workaround for iOS 13.x not respecting flex-wrap: wrap; correctly
      // timeout is needed for component to render 
      setTimeout(() => {
        document.getElementById('modal-scrollable').shadowRoot.querySelector('.p-modal').style.alignSelf = 'start'
      }, 1000);
    }
    
    public isOpen(index: number): boolean {
      return this.modalState[index];
    }
    
    public openModal(index: number): void {
      this.modalState[index] = true;
    }
    
    public closeModal(index: number): void {
      this.modalState[index] = false;
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
  
  .footer {
    @include p-col;
    padding: p-px-to-rem(16px) 0 0;
    
    @include p-media-query('s') {
      @include p-row;
      padding: p-px-to-rem(32px) 0 0;
    }
  }
</style>