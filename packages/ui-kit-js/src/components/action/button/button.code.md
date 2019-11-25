# Button

The `button` component is essential to perform events for forms or interfaces. They can be used with or without a label (as button icon only).

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

---

## Button with specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `icon` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button icon="phone" :theme="theme">Some label</p-button>
    <p-button :icon-source="require(`@/assets/web/icon-custom-kaixin.svg`)" hide-label="true" :theme="theme">Some label</p-button>
    <br>
    <p-button icon="phone" :theme="theme">Some label</p-button>
    <p-button :icon-source="require(`@/assets/web/icon-custom-kaixin.svg`)" hide-label="true" :theme="theme">Some label</p-button>
  </template>
</Playground>

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

## Remove Button from tab order
With setting the `tabbable` property to `false` you can remove the button from the tab order.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button tabbable="true" :theme="theme">Some label</p-button>
    <p-button hide-label="true" tabbable="false" :theme="theme">Some label</p-button>
  </template>
</Playground>
