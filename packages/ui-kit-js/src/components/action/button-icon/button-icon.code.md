# Button Icon

## Buttons as button elements
Button Icon used as `<button>` element to trigger actions.

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

### Transparent (Icon)

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon variant="transparent" :theme="theme" />
    <p-button-icon variant="transparent" disabled="true" :theme="theme" />
    <p-button-icon variant="transparent" loading="true" :theme="theme" />
  </template>
</Playground>

---

## Button as link element
Button Icon used as link element `<a>`, e.g. as a navigation item.

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

### Transparent (Icon)
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon href="/lorem/ipsum" variant="transparent" :theme="theme" />
    <p-button-icon href="#" variant="transparent" disabled="true" :theme="theme" />
    <p-button-icon href="#" variant="transparent" loading="true" :theme="theme" />
  </template>
</Playground>

---

## Button Icon with specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `icon` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon icon="phone" :theme="theme" />
    <p-button-icon :icon-source="require(`@/assets/web/icon-custom-kaixin.svg`)" :theme="theme" />
  </template>
</Playground>

## Bind events to the Button Icon
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon
        onclick="alert('Button Icon clicked')"
        onfocus="console.log('focus')"
        onfocusin="console.log('focusin')"
        onblur="console.log('blur')"
        onfocusout="console.log('focusout')"
        :theme="theme"
    />
  </template>
</Playground>

## Remove Button Icon from tab order
With setting the `tabbable` property to `false` you can remove the button from the tab order.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-icon tabbable="true" :theme="theme" />
    <p-button-icon tabbable="false" :theme="theme" />
  </template>
</Playground>