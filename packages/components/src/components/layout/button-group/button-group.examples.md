# Button Group

The `p-button-group` is a component for wrapping multiple buttons and display them in vertical or horizontal groups with corresponding spacing and width. By default buttons are displayed in full-width as a vertical stacked group for mobile viewports (breakpoint XS) and side-by-side in a row for larger viewports.

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