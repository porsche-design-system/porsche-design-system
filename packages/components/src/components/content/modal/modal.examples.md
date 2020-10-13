# Modal

A Modal Dialog is a temporary overlay that takes focus from the page and requires people to interact with it. It’s primarily used for confirming actions, such as asking people to make a choice. It should be used thoughtfully and sparingly.

## Basic

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

<Playground>
  <p-button @click="openModal(1)">Open Modal</p-button>
  <p-modal heading="Some Heading" :open="isOpen(1)" v-on:close="closeModal(1)">
    <p-text>Some Content</p-text>
    <div style="height: 80vh;"></div>
    <p-text>Some More Content</p-text>
    <p-modal-footer>
      <p-button @click="closeModal(1)">Save</p-button>
      <p-button variant="tertiary" @click="closeModal(1)">Close</p-button>
    </p-modal-footer>
  </p-modal>
</Playground>


## Without Heading

<Playground>
  <p-button @click="openModal(2)">Open Modal</p-button>
  <p-modal :open="isOpen(2)" v-on:close="closeModal(2)">
    <p-text>Some Content</p-text>
  </p-modal>
</Playground>

## Without Close Button

<Playground>
  <p-button @click="openModal(3)">Open Modal</p-button>
  <p-modal heading="Some Heading" disable-close-button :open="isOpen(3)" v-on:close="closeModal(3)">
    <p-text>Some Content</p-text>
  </p-modal>
</Playground>

## Without Heading and Close Button

<Playground>
  <p-button @click="openModal(4)">Open Modal</p-button>
  <p-modal disable-close-button :open="isOpen(4)" v-on:close="closeModal(4)">
    <p-text>Some Content</p-text>
  </p-modal>
</Playground>


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