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
    <p-button variant="primary" ally-label="Some action description" :theme="theme" />
    <p-button variant="primary" ally-label="Some action description" disabled="true" :theme="theme" />
    <p-button variant="primary" ally-label="Some action description" loading="true" :theme="theme" />
  </template>
</Playground>

#### Secondary (default)

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button :theme="theme">Some label</p-button>
    <p-button disabled="true" :theme="theme">Some label</p-button>
    <p-button loading="true" :theme="theme">Some label</p-button>
    <br>
    <p-button ally-label="Some action description" :theme="theme" />
    <p-button ally-label="Some action description" disabled="true" :theme="theme" />
    <p-button ally-label="Some action description" loading="true" :theme="theme" />
  </template>
</Playground>

#### Tertiary

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button variant="tertiary" :theme="theme">Some label</p-button>
    <p-button variant="tertiary" disabled="true" :theme="theme">Some label</p-button>
    <p-button variant="tertiary" loading="true" :theme="theme">Some label</p-button>
    <br>
    <p-button variant="tertiary" ally-label="Some action description" :theme="theme" />
    <p-button variant="tertiary" ally-label="Some action description" disabled="true" :theme="theme" />
    <p-button variant="tertiary" ally-label="Some action description" loading="true" :theme="theme" />
  </template>
</Playground>

---

## Button Icon with specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `icon` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button icon="phone" ally-label="Some action description" :theme="theme" />
    <p-button :icon="require(`@/assets/web/icon-custom-kaixin.svg`)" ally-label="Some action description" :theme="theme" />
  </template>
</Playground>

## Bind events to the Button Icon
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button
        onclick="alert('click')"
        onfocus="console.log('focus')"
        onfocusin="console.log('focusin')"
        onblur="console.log('blur')"
        onfocusout="console.log('focusout')"
        ally-label="Some action description"
        :theme="theme"
    />
  </template>
</Playground>

## Remove Button Icon from tab order
With setting the `tabbable` property to `false` you can remove the button from the tab order.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button tabbable="true" ally-label="Some action description" :theme="theme" />
    <p-button tabbable="false" ally-label="Some action description" :theme="theme" />
  </template>
</Playground>