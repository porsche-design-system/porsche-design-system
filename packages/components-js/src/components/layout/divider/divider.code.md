# Divider

The **Divider component** is used as 'Horizontal Rule' and displays a dividing line.
The default semantic HTML Element is `<hr>` which means the component is self closing. Slotted input between the component tags won't be displayed. 


## Default

The default use of the Divider component is a horizontal, grey line.

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-divider :theme="theme"></p-divider>
  </template>
</Playground>

## Vertical

The standart horizontal line can also be displayed `vertical`.

**Hint:** The component cant know a vertical height unless we set a container which provides it. 

<Playground :themeable="true">
  <template v-slot="{theme}">
  <div class="divider-vertical-container-example">
    <p-divider :theme="theme" orientation="vertical" class="divider-vertical-example"></p-divider>
  </div>
  </template>
</Playground>

## Responsive

You can change the divider orientation by using different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="true">
  <template v-slot="{theme}">
  <div class="divider-vertical-container-example">
    <p-divider :theme="theme" orientation="{base: 'horizontal', l: 'vertical'}" class="divider-vertical-example"></p-divider>
  </div>
  </template>
</Playground>


## Colors

There are three predefined colors `neutral-contrast-high` `neutral-contrast-medium` `neutral-contrast-low`. The default color is set to be `neutral-contrast-low`.

<Playground :themeable="true">
 <template #configurator>
    <select @change="color = $event.target.value">
      <option disabled>Select a Color</option>
      <option selected>neutral-contrast-low</option>
      <option>neutral-contrast-high</option>
      <option>neutral-contrast-medium</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-divider :theme="theme" :color="color"></p-divider>
  </template>
</Playground>

--- 

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTypography extends Vue {
    public color: string = 'default';
  }
</script>
<style scoped lang="scss">
  .divider-vertical-container-example {
    display: flex;
    height: 100px;
  }
  .divider-vertical-example{
    align-self: stretch;
    width: 100%;
  }
</style>