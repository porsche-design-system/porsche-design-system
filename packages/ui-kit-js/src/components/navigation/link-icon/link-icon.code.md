# Link Icon

Used as link element `<a>`, e.g. as a navigation item.

### Variant

Choose between predefined styling variants. Additionally predefined attributes like `target`, `download` or `rel` can be set and behave like they would do natively on an HTML link element.

#### Default
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-icon href="https://ui.porsche.com/" ally-label="Some link target description" :theme="theme" />
  </template>
</Playground>

#### Ghost
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-icon href="https://ui.porsche.com/" ally-label="Some link target description" :theme="theme" variant="ghost" />
  </template>
</Playground>

---

## Link Icon with specific icon

If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `icon` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-icon href="https://ui.porsche.com/" icon="phone" ally-label="Some link target description" :theme="theme" />
    <p-link-icon href="https://ui.porsche.com/" :icon="require(`@/assets/web/icon-custom-kaixin.svg`)" ally-label="Some link target description" :theme="theme" />
  </template>
</Playground>

## Bind events to the Link Icon
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the link.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-icon
        onclick="alert('click')"
        onfocus="console.log('focus')"
        onfocusin="console.log('focusin')"
        onblur="console.log('blur')"
        onfocusout="console.log('focusout')"
        ally-label="Some link target description"
        :theme="theme"
    />
  </template>
</Playground>

## Remove Link Icon from tab order
With setting the `tabbable` property to `false` you can remove the button from the tab order.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-icon tabbable="true" ally-label="Some link target description" :theme="theme" />
    <p-link-icon tabbable="false" ally-label="Some link target description" :theme="theme" />
  </template>
</Playground>