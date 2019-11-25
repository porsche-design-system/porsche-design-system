# Link

The `link` component is essential to perform changes in page routes. They can be used with or without a label (as link icon only).


## Variants

Choose between predefined styling variants.

### Primary

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link variant="primary" href="https://www.porsche.com" :theme="theme">Some label</p-link>
    <p-link variant="primary" href="https://www.porsche.com" hide-label="true" :theme="theme">Some label</p-link>
    <p-link variant="primary" href="https://www.porsche.com" hide-label="{ base: true, l: false }" :theme="theme">Some label</p-link>
  </template>
</Playground>

### Secondary (default)

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link href="https://www.porsche.com" :theme="theme">Some label</p-link>
    <p-link href="https://www.porsche.com" hide-label="true" :theme="theme">Some label</p-link>
    <p-link href="https://www.porsche.com" hide-label="{ base: true, l: false }" :theme="theme">Some label</p-link>
  </template>
</Playground>

### Tertiary

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link variant="tertiary" href="https://www.porsche.com" :theme="theme">Some label</p-link>
    <p-link variant="tertiary" href="https://www.porsche.com" hide-label="true" :theme="theme">Some label</p-link>
    <p-link variant="tertiary" href="https://www.porsche.com" hide-label="{ base: true, l: false }" :theme="theme">Some label</p-link>
  </template>
</Playground>

---

## Link wrapped with an anker tag (e.g. for framework routing)

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <a href="https://www.porsche.com" style="outline: none;"><p-link :theme="theme">Some label</p-link></a>
    <a href="https://www.porsche.com" style="outline: none;"><p-link hide-label="true" :theme="theme">Some label</p-link></a>
  </template>
</Playground>

---

## Link with specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `icon` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link href="https://www.porsche.com" icon="phone" :theme="theme">Some label</p-link>
    <p-link href="https://www.porsche.com" :icon-source="require(`@/assets/web/icon-custom-kaixin.svg`)" :theme="theme">Some label</p-link>
    <br>
    <p-link href="https://www.porsche.com" hide-label="true" icon="phone" :theme="theme">Some label</p-link>
    <p-link href="https://www.porsche.com" hide-label="true" :icon-source="require(`@/assets/web/icon-custom-kaixin.svg`)" :theme="theme">Some label</p-link>
  </template>
</Playground>

## Bind events to the Link
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link
        href="https://www.porsche.com"
        onclick="alert('click'); return false;"
        onfocus="console.log('focus')"
        onfocusin="console.log('focusin')"
        onblur="console.log('blur')"
        onfocusout="console.log('focusout')"
        :theme="theme"
   >Some label</p-link>
  </template>
</Playground>

## Remove Link from tab order
With setting the `tabbable` property to `false` you can remove the link from the tab order.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link href="https://www.porsche.com" tabbable="true" :theme="theme">Some label</p-link>
    <p-link href="https://www.porsche.com" tabbable="false" :theme="theme">Some label</p-link>
  </template>
</Playground>
