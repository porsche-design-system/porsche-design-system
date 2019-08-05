# Button Icon

## Buttons as button elements
Buttons used as `<button>` elements to trigger actions.

### Basic

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon :theme="theme" />
    <p-button-icon disabled="true" :theme="theme" />
    <p-button-icon loading="true" :theme="theme" />
  </template>
</Playground>

### Ghost

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon variant="ghost" :theme="theme" />
    <p-button-icon variant="ghost" disabled="true" :theme="theme" />
    <p-button-icon variant="ghost" loading="true" :theme="theme" />
  </template>
</Playground>

### Transparent

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon variant="transparent" :theme="theme" />
    <p-button-icon variant="transparent" disabled="true" :theme="theme" />
    <p-button-icon variant="transparent" loading="true" :theme="theme" />
  </template>
</Playground>

---

## Button as link element
Buttons used as link elements `<a>`, e.g. as a navigation item.

### Basic
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon href="/lorem/ipsum" :theme="theme" />
    <p-button-icon href="#" disabled="true" :theme="theme" />
    <p-button-icon href="#" loading="true" :theme="theme" />
  </template>
</Playground>

### Ghost
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon href="/lorem/ipsum" variant="ghost" :theme="theme" />
    <p-button-icon href="#" variant="ghost" disabled="true" :theme="theme" />
    <p-button-icon href="#" variant="ghost" loading="true" :theme="theme" />
  </template>
</Playground>

### Transparent
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon href="/lorem/ipsum" variant="transparent" :theme="theme" />
    <p-button-icon href="#" variant="transparent" disabled="true" :theme="theme" />
    <p-button-icon href="#" variant="transparent" loading="true" :theme="theme" />
  </template>
</Playground>

---

## Button with specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property.
If you need to link to another icon hosted somewhere else, just set the whole icon path to the `icon` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon icon="phone" :theme="theme" />
    <p-button-icon :icon="require(`@/assets/web/icon-custom-kaixin.svg`)" :theme="theme" />
  </template>
</Playground>