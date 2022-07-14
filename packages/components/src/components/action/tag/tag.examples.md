# Tags

<TableOfContents></TableOfContents>

## Tag

`p-tag` is used to label, categorize, or organize items by using keywords that describe them.

## Color

<Playground :markup="colorMarkup" :config="{ ...config, colorScheme: backgroundColor }">
  <select v-model="backgroundColor" aria-label="Select background color">
    <option disabled>Select background color</option>
    <option value="default">Default</option>
    <option value="surface">Surface</option>
  </select>
</Playground>

## Icon

The `p-tag` can be displayed with an icon. Choose an icon name from the icon property. Per default, all icons are
fetched from the Porsche Design System CDN. If you need to link to another icon hosted somewhere else, just set the
whole icon path to the icon-source property.

<Playground :markup="icon" :config="config"></Playground>

## With slotted button

It is possible to add a `<button>` tag into the `p-tag` component. If you do this, the entire component becomes
clickable and no other content outside the button or link is allowed.

<Playground :markup="buttonMarkup" :config="{ ...config, colorScheme: backgroundColor }">
  <select v-model="backgroundColor" aria-label="Select background color">
    <option disabled>Select background color</option>
    <option value="default">Default</option>
    <option value="surface">Surface</option>
  </select>
</Playground>

### <A11yIcon></A11yIcon> Accessibility hints

Make sure to provide a **descriptive**, self explaining **aria-label** on the slotted button to describe the `onClick()`
action.

<Playground :markup="buttonAccessibility"></Playground>

## With slotted link

It is possible to add `<a>` tag into the `p-tag` component. If you do this, the entire component becomes clickable and
no other content outside the button or link is allowed.

<Playground :markup="linkMarkup" :config="{ ...config, colorScheme: backgroundColor }">
  <select v-model="backgroundColor" aria-label="Select background color">
    <option disabled>Select background color</option>
    <option value="default">Default</option>
    <option value="surface">Surface</option>
  </select>
</Playground>

### <A11yIcon></A11yIcon> Accessibility hints

Make sure to provide a **descriptive**, self explaining **aria-label** on the slotted anchor to describe where it leads
to.

<Playground :markup="linkAccessibility"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import { TAG_COLORS } from './tag-utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'inline' };
  backgroundColor = 'default';

  get colorMarkup(){
    return TAG_COLORS.map((color) => `<p-tag color="${color}">Color ${color}</p-tag>`).join('\n');
  };

  icon = `<p-tag icon="car">Some label</p-tag> 
<p-tag icon-source="${require('../../../assets/icon-custom-kaixin.svg')}">Some label</p-tag>`;

  get buttonMarkup(){
    return TAG_COLORS.map((color, idx) => `<p-tag${idx === 0 ? ' icon="car"' : ''} color="${color}">
  <button type="button">Color ${color}</button>
</p-tag>`).join('\n');
  };

  get linkMarkup(){
    return TAG_COLORS.map((color, idx) => `<p-tag${idx === 0 ? ' icon="car"' : ''} color="${color}">
  <a href="https://www.porsche.com">Color ${color}</a>
</p-tag>`).join('\n');
  };

  buttonAccessibility = `<p-tag icon="car">
  <button type="button" aria-label="More information about used cars">Used cars</button>
</p-tag>`;

  linkAccessibility = `<p-tag icon="car">
  <a href="https://www.porsche.com" aria-label="More information about used cars">Used cars</a>
</p-tag>`;
}
</script>
