# Tags

<TableOfContents></TableOfContents>

## Tag Status

`p-tag-status` is used to label, categorize, or organize items by using keywords that describe them.

## Color

<Playground :markup="color" :config="config"></Playground>


## Icon

The `p-tag-status` can be displayed with an icon. Choose an icon name from the icon property.
Per default, all icons are fetched from the Porsche Design System CDN.
If you need to link to another icon hosted somewhere else, just set the whole icon path to the icon-source property.

<Playground :markup="icon" :config="config"></Playground>

## Button or link

It is possible to add a `<button>` or `<a>` tag into the `p-tag-status`. If you do this, 
the entire component becomes clickable and no other content outside the button or link is allowed.

<Playground :markup="buttonOrLink" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'inline' };

  basicExample = `<p-tag-status>Some label</p-tag-status>`;

  color = `<p-tag-status color="background-surface">Color background-surface</p-tag-status>
<p-tag-status color="default">Color default</p-tag-status>
<p-tag-status color="neutral-contrast-high">Color neutral-contrast-high</p-tag-status>
<p-tag-status color="notification-success">Color notification-success</p-tag-status>
<p-tag-status color="notification-warning">Color notification-warning</p-tag-status>
<p-tag-status color="notification-error">Color notification-error</p-tag-status>`;

  icon = `<p-tag-status icon="car">Some label</p-tag-status> 
<p-tag-status icon-source="${require('../../assets/icon-custom-kaixin.svg')}">Some label</p-tag-status>`;

  buttonOrLink = `<p-tag-status><a href="https://www.porsche.com">Some link</a></p-tag-status>
<p-tag-status icon="car"><a href="https://www.porsche.com">Some link</a></p-tag-status>
<p-tag-status><button type="button">Some button</button></p-tag-status>
<p-tag-status icon="car"><button type="button">Some button</button></p-tag-status>`;
}
</script>