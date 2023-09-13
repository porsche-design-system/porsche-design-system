# Tag Dismissible

`p-tag-dismissible` is used in contexts where the user can actively remove a tag. It is often seen in filtering.

<TableOfContents></TableOfContents>

## Color

<Notification heading="Important note" state="error">
  The <b>background-default</b> color is deprecated and will be removed with next major release. Please use
  <b>background-base</b> color instead. In case, e.g. <b>color="background-default"</b> is used it will automatically be
  mapped to <b>color="background-surface"</b>.
</Notification>

<Playground :markup="colorMarkup" :config="{ ...config, backgroundColor }">
  <SelectOptions v-model="backgroundColor" :values="backgroundColors" name="backgroundColor"></SelectOptions>
</Playground>

## Label

<Playground :markup="label" :config="config"></Playground>

## ARIA attributes and states

Through the `aria` property you have the possibility to provide additional **ARIA** attributes to the component.
<Playground :markup="accessibility" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

Ensure that when a `p-tag-dismissible` is removed, the focus is set to the previous or next `p-tag-dismissible` or to
another focusable element. This prevents loosing the focus order.

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import { TAG_DISMISSIBLE_COLORS } from './tag-dismissible-utils';
import { GRADIENT_COLORS } from '../scroller/scroller-utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'inline' };

  backgroundColor = 'background-base';
  backgroundColors = GRADIENT_COLORS;

  get colorMarkup(){
    return TAG_DISMISSIBLE_COLORS.map((color) => `<p-tag-dismissible color="${color}">Color ${color}</p-tag-dismissible>`).join('\n');
  };

  label = `<p-tag-dismissible label="Some label">Some content</p-tag-dismissible>`;

  accessibility = `<p-tag-dismissible label="Cars" aria="{ 'aria-label': 'Remove filter used cars' }">Used cars</p-tag-dismissible>`
}
</script>
