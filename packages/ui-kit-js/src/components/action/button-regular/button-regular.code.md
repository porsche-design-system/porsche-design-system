# Button Regular

## Introduction
All button types can be generated out of the basic button by implementing additional modifier classes or React proprties.

### Buttons as button elements
Buttons used as `<button>` elements to trigger actions.

### Regular basic (default)

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular :theme="theme">Click Here!</p-button-regular>
    <p-button-regular :theme="theme" disabled="true">Disabled</p-button-regular>
    <p-button-regular :theme="theme" loading="true">Loading...</p-button-regular>
  </template>
</Playground>

### Regular ghost

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular variant="ghost" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular variant="ghost" :theme="theme" disabled="true">Disabled</p-button-regular>
    <p-button-regular variant="ghost" loading="true" :theme="theme">Loading...</p-button-regular>
  </template>
</Playground>

### Regular highlight

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular variant="highlight" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular variant="highlight" :theme="theme" disabled="true">Disabled</p-button-regular>
    <p-button-regular variant="highlight" loading="true" :theme="theme">Loading...</p-button-regular>
  </template>
</Playground>

---

### Button as link element
Buttons used as link elements (`<a>`), e.g. as a navigation item.

#### Regular basic (default)

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular href="/lorem/ipsum" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular href="#" disabled="true" :theme="theme">Disabled</p-button-regular>
    <p-button-regular href="/lorem/ipsum" variant="highlight" loading="true" :theme="theme">Loading...</p-button-regular>
  </template>
</Playground>

#### Regular ghost
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular href="/lorem/ipsum" variant="ghost" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular href="#" variant="ghost" disabled :theme="theme">Disabled</p-button-regular>
    <p-button-regular href="#" variant="ghost" loading="true" :theme="theme">Loading...</p-button-regular>
  </template>
</Playground>

#### Regular highlight
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular href="/lorem/ipsum" variant="highlight" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular href="#" variant="highlight" disabled :theme="theme">Disabled</p-button-regular>
    <p-button-regular href="#" loading="true" :theme="theme">Loading...</p-button-regular>
  </template>
</Playground>

---

### Button regular small
All button types can be rendered in a smaller variant. All properties of the regular button can be set.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular small="true" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular small="true" variant="ghost" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular small="true" variant="highlight" :theme="theme">Click Here!</p-button-regular>
  </template>
</Playground>

---

### Button regular with specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property.
If you need to link to another icon hosted somewhere else, just set the whole icon path to thge `icon` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular icon="phone" :theme="theme">Click Here!</p-button-regular>
  </template>
</Playground>

---

### Edge cases

#### Long text
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <div style="max-width: 320px">
      <p-button-regular icon="phone" :theme="theme">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p-button-regular>
    </div>
  </template>
</Playground>