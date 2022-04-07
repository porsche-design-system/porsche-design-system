# Tags

<TableOfContents></TableOfContents>

## Tag Status

`p-tag-status` is used to label, categorize, or organize items by using keywords that describe them.

## Color

<Playground :markup="colorMarkup" :config="{ ...config, colorScheme: backgroundColorScheme }">
  <select v-model="backgroundColorScheme" aria-label="Select background color">
    <option disabled>Select background color</option>
    <option value="default">Default</option>
    <option value="surface">Surface</option>
  </select>
</Playground>

## Icon

The `p-tag-status` can be displayed with an icon. Choose an icon name from the icon property. Per default, all icons are fetched from the Porsche Design System CDN. If you need to link to another icon hosted somewhere else, just set the whole icon path to the icon-source property.

<Playground :markup="icon" :config="config"></Playground>

## With slotted button

It is possible to add a `<button>` tag into the `p-tag-status` component. If you do this, the entire component becomes
clickable and no other content outside the button or link is allowed.

<Playground :markup="buttonMarkup" :config="{ ...config, colorScheme: backgroundColorScheme }">
  <select v-model="backgroundColorScheme" aria-label="Select background color">
    <option disabled>Select background color</option>
    <option value="default">Default</option>
    <option value="surface">Surface</option>
  </select>
</Playground>

## With slotted link

It is possible to add `<a>` tag into the `p-tag-status` component. If you do this, the entire component becomes
clickable and no other content outside the button or link is allowed.

<Playground :markup="linkMarkup" :config="{ ...config, colorScheme: backgroundColorScheme }">
  <select v-model="backgroundColorScheme" aria-label="Select background color">
    <option disabled>Select background color</option>
    <option value="default">Default</option>
    <option value="surface">Surface</option>
  </select>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import { TAG_STATUS_COLORS } from './tag-status-utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'inline' };
  backgroundColorScheme = 'default';


  get colorMarkup(){
    return TAG_STATUS_COLORS.map((color) => `<p-tag-status color="${color}">Color ${color}</p-tag-status>`).join('\n');
  };

  icon = `<p-tag-status icon="car">Some label</p-tag-status> 
<p-tag-status icon-source="${require('../../../assets/icon-custom-kaixin.svg')}">Some label</p-tag-status>`;

  get buttonMarkup(){
    return TAG_STATUS_COLORS.map((color, idx) => `<p-tag-status${idx === 0 ? ' icon="car"' : ''} color="${color}">
  <button type="button">Color ${color}</button>
</p-tag-status>`).join('\n');
  };

  get linkMarkup(){
    return TAG_STATUS_COLORS.map((color, idx) => `<p-tag-status${idx === 0 ? ' icon="car"' : ''} color="${color}">
  <a href="https://www.porsche.com">Color ${color}</a>
</p-tag-status>`).join('\n');
  };
}
</script>
