# Divider

The `p-divider` is used as 'horizontal or vertical rule' and displays a dividing line.
The component is self-closing. Slotted content between the component tags won't be displayed. 

<TableOfContents></TableOfContents>

## Horizontal

<Playground :markup="horizontal" :config="config"></Playground>

## Vertical

**Hint:** The component has not an implicit vertical height unless we set a container which provides it or define the height on the component itself.

<Playground :markup="vertical" :config="config"></Playground>

## Responsive

You can change the Divider orientation by using different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :markup="responsive" :config="config"></Playground>

## Colors

Predefined colors associated with its theme are available.

<Playground :markup="colors" :config="config">
  <select v-model="color">
    <option disabled>Select a color</option>
    <option>neutral-contrast-low</option>
    <option>neutral-contrast-medium</option>
    <option>neutral-contrast-high</option>
  </select>
</Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };    
    color = 'neutral-contrast-low';
    
    horizontal = `<p-divider></p-divider>`;

    vertical = 
`<div class="divider-vertical-container-example">
  <p-divider orientation="vertical"></p-divider>
</div>`;

    responsive =
`<div class="divider-vertical-responsive-container-example">
  <p-divider orientation="{base: 'horizontal', l: 'vertical'}"></p-divider>
</div>`;

    get colors(){
      return `<p-divider color="${this.color}"></p-divider>`;
    }
  }
</script>
<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  ::v-deep .divider-vertical-container-example {
    display: flex;
    height: 100px;
  }
  @include p-media-query("l") {
    ::v-deep .divider-vertical-responsive-container-example {
      display: flex;
      height: 100px;
    }
  }
</style>