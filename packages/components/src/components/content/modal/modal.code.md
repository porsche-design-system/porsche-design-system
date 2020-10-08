# Modal

## Basic

<Playground>
  <p-button @click="openModal(0)">Open Modal</p-button>
  <p-modal subject="Some Subject" :open="isOpen(0)" v-on:close="closeModal(0)">
    <p-text>Some Content</p-text>
    <p-button @click="closeModal(0)">Close</p-button>
  </p-modal>
</Playground>

## Without Subject

<Playground>
  <p-button @click="openModal(1)">Open Modal</p-button>
  <p-modal :open="isOpen(1)" v-on:close="closeModal(1)">
    <p-text>Some Content</p-text>
  </p-modal>
</Playground>

## Without Close Button

<Playground>
  <p-button @click="openModal(2)">Open Modal</p-button>
  <p-modal subject="Some Subject" disable-close-button :open="isOpen(2)" v-on:close="closeModal(2)">
    <p-text>Some Content</p-text>
  </p-modal>
</Playground>

## Without Subject and Close Button

<Playground>
  <p-button @click="openModal(3)">Open Modal</p-button>
  <p-modal disable-close-button :open="isOpen(3)" v-on:close="closeModal(3)">
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