# Modal

## Basic

<Playground>
  <p-button @click="openModal()">Open Modal</p-button>
  <p-modal :open="isOpen" v-on:close="closeModal()">
    <p-text>Some text</p-text>
    <p-button @click="closeModal()">Close</p-button>
  </p-modal>
</Playground>


<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class PlaygroundModal extends Vue {
    public isOpen = false;
    
    public openModal (): void {
      this.isOpen = true;
    }
    
    public closeModal (): void {
      this.isOpen = false;
    }
  }
</script>