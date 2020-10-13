# Modal

A Modal Dialog is a temporary overlay that takes focus from the page and requires people to interact with it. It’s primarily used for confirming actions, such as asking people to make a choice. It should be used thoughtfully and sparingly.

## Basic

`p-modal` is a component which does not work by itself and needs to be controlled from the outside.  
This grants you flexible control over the modal's behavior especially whether it should stay open after user interaction like submission of a form.

The most important property of `p-modal` is its `open` attribute.  When it is present the modal will be visible.
  
In order to get notified when the modal gets closed by clicking the `x` button, the backdrop or by pressing the `Escape` key you need to register an event listener for the `close` event which is emitted by `p-modal`.

```
modal.addEventListener('close', () => {
  modal.removeAttribute('open');
});
```

Nesting `p-modal-footer` within a `p-modal` give you the opportunity to display other components, e.g. action buttons, at the bottom of the modal. This area is positioned absolutely and is not scrollable.

<Playground>
  <p-button @click="openModal(0)">Open Modal</p-button>
  <p-modal heading="Some Heading" :open="isOpen(0)" v-on:close="closeModal(0)">
    <p-text>Some Content</p-text>
    <p-modal-footer>
      <p-button @click="closeModal(0)">Save</p-button>
      <p-button variant="tertiary" @click="closeModal(0)">Close</p-button>
    </p-modal-footer>
  </p-modal>
</Playground>

## Basic Scrollable

If the modal's content doesn't fit into the current boundaries the content becomes scrollable while heading, close button and `p-modal-footer` stay at an absolute position.

<Playground>
  <p-button @click="openModal(1)">Open Modal</p-button>
  <p-modal heading="Some Heading" :open="isOpen(1)" v-on:close="closeModal(1)">
    <p-text>Some Content</p-text>
    <div style="height: 40vh;"></div>
    <p-text>More Content</p-text>
    <div style="height: 40vh;"></div>
    <p-text>Even More Content</p-text>
    <p-modal-footer>
      <p-button @click="closeModal(1)">Save</p-button>
      <p-button variant="tertiary" @click="closeModal(1)">Close</p-button>
    </p-modal-footer>
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
At the same time this also deactivates closing the modal by pressing `Escape`.  
If you want to disable closing the modal by clicking the backdrop, you can set the `disable-backdrop-click` attribute.

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