# Button Icon

## Introduction
All button types can be generated out of the basic button by referencing properties.

### Buttons as button elements
Buttons used as `<button>` elements to trigger actions.

### Basic (default)

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot="slotProps">
    <p-button-icon :theme="slotProps.theme" />
    <p-button-icon :theme="slotProps.theme" disabled="true" />
    <p-button-icon loading="true" :theme="slotProps.theme" />
  </template>
</Playground>

### Ghost

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot="slotProps">
    <p-button-icon variant="ghost" :theme="slotProps.theme" />
    <p-button-icon variant="ghost" :theme="slotProps.theme" disabled="true" />
    <p-button-icon variant="ghost" loading="true" :theme="slotProps.theme" />
  </template>
</Playground>

### Transparent

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot="slotProps">
    <p-button-icon variant="transparent" :theme="slotProps.theme" />
    <p-button-icon variant="transparent" :theme="slotProps.theme" disabled="true" />
    <p-button-icon variant="transparent" loading="true" :theme="slotProps.theme" />
  </template>
</Playground>

---

### Button as link element
Buttons used as link elements (`<a>`), e.g. as a navigation item.

#### Basic (default)
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot="slotProps">
    <p-button-icon href="/lorem/ipsum" :theme="slotProps.theme" />
    <p-button-icon href="#" disabled="true" :theme="slotProps.theme" />
    <p-button-icon href="#" loading="true" :theme="slotProps.theme" />
  </template>
</Playground>

#### Ghost
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot="slotProps">
    <p-button-icon href="/lorem/ipsum" variant="ghost" :theme="slotProps.theme" />
    <p-button-icon href="#" variant="ghost" disabled :theme="slotProps.theme" />
    <p-button-icon href="#" variant="ghost" loading="true" :theme="slotProps.theme" />
  </template>
</Playground>

#### Transparent
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot="slotProps">
    <p-button-icon href="/lorem/ipsum" variant="transparent" :theme="slotProps.theme" />
    <p-button-icon href="#" variant="transparent" disabled :theme="slotProps.theme" />
    <p-button-icon href="#" variant="transparent" loading="true" :theme="slotProps.theme" />
  </template>
</Playground>

---

### Button with specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property.
If you need to link to another icon hosted somewhere else, just set the whole icon path to thge `icon` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot="slotProps">
    <p-button-icon icon="phone" :theme="slotProps.theme" />
  </template>
</Playground>