# Divider

The **Divider component** is used as 'horizontal or vertical rule' and displays a dividing line.
The component is self closing. Slotted content between the component tags won't be displayed. 


## Horizontal

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-divider :theme="theme"></p-divider>
  </template>
</Playground>

## Vertical

**Hint:** The component has not an implicit vertical height unless we set a container which provides it or define the height on the component itself.

<Playground :themeable="true">
  <template v-slot="{theme}">
  <div class="divider-vertical-container-example">
    <p-divider :theme="theme" orientation="vertical"></p-divider>
  </div>
  </template>
</Playground>

## Responsive

You can change the Divider orientation by using different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="true">
  <template v-slot="{theme}">
  <div class="divider-vertical-responsive-container-example">
    <p-divider :theme="theme" orientation="{base: 'horizontal', l: 'vertical'}"></p-divider>
  </div>
  </template>
</Playground>


## Colors

Predefined colors associated with its theme are available.

<Playground :themeable="true">
 <template #configurator>
    <select v-model="color">
      <option disabled>Select a color</option>
      <option selected>neutral-contrast-low</option>
      <option>neutral-contrast-medium</option>
      <option>neutral-contrast-high</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-divider :theme="theme" :color="color"></p-divider>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundDivider extends Vue {
    public color: string = 'neutral-contrast-low';
  }
</script>
<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/src/scss/index';

  .divider-vertical-container-example {
    display: flex;
    height: 100px;
  }
  @include p-breakpoint("l") {
    .divider-vertical-responsive-container-example {
      display: flex;
      height: 100px;
    }
  }
</style>