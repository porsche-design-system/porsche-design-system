# Button

The `<p-button>` component is essential for performing form or interaction events.

It can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label,it is best practice to provide a descriptive label text for screen readers.

## Variants

Choose between predefined styling variants.

### Primary

<Playground2 :markup="primary" :config="{ themeable: true, spacing: 'inline' }"></Playground2>

### Secondary

<Playground2 :markup="secondary" :config="{ themeable: true, spacing: 'inline' }"></Playground2>

### Size

<Playground2 :markup="sizeMarkup" :config="{ themeable: true }">
  <template #configurator>
    <select @change="size = $event.target.value">
      <option disabled>Select a size</option>
      <option>x-small</option>
      <option>small</option>
      <option selected>medium</option>
      <option>large</option>
      <option>x-large</option>
      <option>inherit</option>
    </select>
  </template>
</Playground2>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Playground extends Vue {
    primary = 
`<p-button variant="primary">Some label</p-button>
<p-button variant="primary" disabled>Some label</p-button>
<p-button variant="primary" loading>Some label</p-button>
<br>
<p-button variant="primary" hide-label="true">Some label</p-button>
<p-button variant="primary" hide-label="true" disabled>Some label</p-button>
<p-button variant="primary" hide-label="true" loading>Some label</p-button>`;
  
    secondary = 
`<p-button variant="secondary">Some label</p-button>
<p-button variant="secondary" disabled>Some label</p-button>
<p-button variant="secondary" loading>Some label</p-button>`;

    size = 'medium';
    get sizeMarkup() {
      const style = this.size === 'inherit' ? ' style="font-size: 48px;"' : '';
      return `<p-button-pure size="${this.size}"${style}>Some label</p-button-pure>`;
    }
  }
</script>