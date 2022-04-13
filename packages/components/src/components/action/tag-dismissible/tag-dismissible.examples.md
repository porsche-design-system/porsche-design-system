# Tags

<TableOfContents></TableOfContents>

## Tag Dismissible

`p-tag-dismissible` is used in contexts where the user can actively remove a tag. It is often seen in filtering.

## Color

<Playground :markup="colorMarkup" :config="{ ...config, colorScheme: backgroundColor }">
  <select v-model="backgroundColor" aria-label="Select background color">
    <option disabled>Select background color</option>
    <option value="default">Default</option>
    <option value="surface">Surface</option>
  </select>
</Playground>

## Label

<Playground :markup="label" :config="config"></Playground>

## ARIA attributes and states

Through the `aria` property you have the possibility to provide additional **ARIA** attributes to the component.

<Playground :markup="accessibility" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

Ensure that when a `p-tag-dismissible` is removed, the focus is set to the previous or following element and not lost.

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import { TAG_DISMISSIBLE_COLORS } from './tag-dismissible-utils'; 

@Component
export default class Code extends Vue {
  config = { spacing: 'inline' };
  backgroundColor = 'default';

  get colorMarkup(){
    return TAG_DISMISSIBLE_COLORS.map((color) => `<p-tag-dismissible color="${color}">Color ${color}</p-tag-dismissible>`).join('\n');
  };

  label = `<p-tag-dismissible label="Some label">Some content</p-tag-dismissible>`;

  accessibility = `<p-tag-dismissible label="Cars" aria="{ 'aria-label': 'Remove filter used cars' }">Used cars</p-tag-dismissible>`
}
</script>