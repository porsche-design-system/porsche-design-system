# Button Group

You can use the following approach to serve the grouped button pattern described in the [design guidelines](#/patterns/buttons#guidelines).
In a standard layout the buttons are placed in a stacked order on mobile up to viewports smaller than **"xs"** and side by side on viewports larger than **"xs"**.

### Responsive row/column behaviour left aligned

<Playground :markup="buttonGroup"></Playground>

### With custom direction breakpoint

<Playground :markup="buttonGroupCustomBreakpoint"></Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
  
    buttonGroup = `<p-button-group>
  <p-button variant="primary">Some label</p-button>
  <p-button variant="secondary">Some label</p-button>
  <p-button variant="tertiary">Some label</p-button>
</p-button-group>`;    

   buttonGroupCustomBreakpoint = `<p-button-group direction="{base: 'column', s: 'row'}">
  <p-button variant="primary">Some label</p-button>
  <p-button variant="secondary">Some label</p-button>
  <p-button variant="tertiary">Some label</p-button>
</p-button-group>`;    
  }
</script>