<ComponentHeading name="Divider"></ComponentHeading>

The `p-divider` is used as 'horizontal or vertical rule' and displays a dividing line. The component is self-closing.
Slotted content between the component tags won't be displayed.

<TableOfContents></TableOfContents>

## Horizontal

<Playground :markup="horizontal" :config="config"></Playground>

## Vertical

**Hint:** The component has not an implicit vertical height unless we set a container which provides it or define the
height on the component itself.

<Notification heading="Deprecation hint" state="warning">
  The <code>orientation</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>direction</code> property instead.
</Notification>

<Playground :markup="vertical" :config="config"></Playground>

## Responsive

You can change the divider's direction by using different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :markup="responsive" :config="config"></Playground>

## Colors

<Notification heading="Deprecation hint" state="warning">
 Following colors have been deprecated and will be removed with the next major release:
 "neutral-contrast-high", "neutral-contrast-medium" and "neutral-contrast-low".
</Notification>

Predefined colors associated with its theme are available.

<Playground :markup="colorMarkup" :config="config">
  <SelectOptions v-model="color" :values="colors" name="color"></SelectOptions>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { DIVIDER_COLORS, DIVIDER_COLORS_DEPRECATED } from './divider-utils';

@Component
export default class Code extends Vue {
  config = { themeable: true };    
  
  horizontal = `<p-divider></p-divider>`;

  vertical = 
`<div class="divider-vertical-container-example">
  <p-divider direction="vertical"></p-divider>
</div>`;

  responsive =
`<div class="divider-vertical-responsive-container-example">
  <p-divider direction="{base: 'horizontal', l: 'vertical'}"></p-divider>
</div>`;

  color = 'contrast-low';
  colors = DIVIDER_COLORS.map(item => DIVIDER_COLORS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get colorMarkup(){
    return `<p-divider color="${this.color}"></p-divider>`;
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  :deep(.divider-vertical-container-example) {
    display: flex;
    height: 100px;
  }
  @include pds-media-query-min("l") {
    :deep(.divider-vertical-responsive-container-example) {
      display: flex;
      height: 100px;
    }
  }
</style>
