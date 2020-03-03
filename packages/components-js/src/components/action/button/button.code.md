# Button

The `<p-button>` component is essential for performing form or interaction events.

It can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label,it is best practice to provide a descriptive label text for screen readers.

## Variants

Choose between predefined styling variants.

### Primary

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button variant="primary" :theme="theme">Some label</p-button>
    <p-button variant="primary" disabled="true" :theme="theme">Some label</p-button>
    <p-button variant="primary" loading="true" :theme="theme">Some label</p-button>
    <br>
    <p-button variant="primary" hide-label="true" :theme="theme">Some label</p-button>
    <p-button variant="primary" hide-label="true" disabled="true" :theme="theme">Some label</p-button>
    <p-button variant="primary" hide-label="true" loading="true" :theme="theme">Some label</p-button>
  </template>
</Playground>

### Secondary (default)

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button :theme="theme">Some label</p-button>
    <p-button disabled="true" :theme="theme">Some label</p-button>
    <p-button loading="true" :theme="theme">Some label</p-button>
    <br>
    <p-button hide-label="true" :theme="theme">Some label</p-button>
    <p-button hide-label="true" disabled="true" :theme="theme">Some label</p-button>
    <p-button hide-label="true" loading="true" :theme="theme">Some label</p-button>
  </template>
</Playground>

### Tertiary

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button variant="tertiary" :theme="theme">Some label</p-button>
    <p-button variant="tertiary" disabled="true" :theme="theme">Some label</p-button>
    <p-button variant="tertiary" loading="true" :theme="theme">Some label</p-button>
    <br>
    <p-button variant="tertiary" hide-label="true" :theme="theme">Some label</p-button>
    <p-button variant="tertiary" hide-label="true" disabled="true" :theme="theme">Some label</p-button>
    <p-button variant="tertiary" hide-label="true" loading="true" :theme="theme">Some label</p-button>
  </template>
</Playground>

### Responsive

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button variant="primary" hide-label="{ base: true, s: false }" :theme="theme">Some label</p-button>
    <p-button variant="secondary" hide-label="{ base: true, m: false }" :theme="theme">Some label</p-button>
    <p-button variant="tertiary" hide-label="{ base: true, l: false }" :theme="theme">Some label</p-button>
  </template>
</Playground>

---

## Button with specific icon
If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button icon="delete" :theme="theme">Some label</p-button>
    <p-button :icon-source="require(`./assets/icon-custom-kaixin.svg`)" hide-label="true" :theme="theme">Some label</p-button>
  </template>
</Playground>

---

## Bind events to the Button
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button
        onclick="alert('click')"
        onfocus="console.log('focus')"
        onfocusin="console.log('focusin')"
        onblur="console.log('blur')"
        onfocusout="console.log('focusout')"
        :theme="theme"
    >Some label</p-button>
  </template>
</Playground>

---

## Remove Button from tab order
With setting the `tabbable` property to `false` you can remove the button from the tab order. For technical restrictions it's currently not possible to set an individual `tabindex` attribute.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button tabbable="true" :theme="theme">Some label</p-button>
    <p-button tabbable="false" hide-label="true" :theme="theme">Some label</p-button>
  </template>
</Playground>
