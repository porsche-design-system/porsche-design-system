# Button Regular

## Introduction
All button types can be generated out of the basic button by implementing additional modifier classes or React proprties.

### Buttons as button elements
Buttons used as `<button>` elements to trigger actions.

### Regular basic (default)

<Playground>
  <template v-slot="slotProps">
    <p-button-regular :theme="slotProps.theme">Click Here!</p-button-regular>
    <p-button-regular :theme="slotProps.theme" disabled="true">Disabled</p-button-regular>
    <p-button-regular :theme="slotProps.theme" loading="true">Loading...</p-button-regular>
  </template>
</Playground>

### Regular ghost

<Playground>
  <template v-slot="slotProps">
    <p-button-regular variant="ghost" :theme="slotProps.theme">Click Here!</p-button-regular>
    <p-button-regular variant="ghost" :theme="slotProps.theme" disabled="true">Disabled</p-button-regular>
    <p-button-regular variant="ghost" loading="true" :theme="slotProps.theme">Loading...</p-button-regular>
  </template>
</Playground>

### Regular highlight

<Playground>
  <template v-slot="slotProps">
    <p-button-regular variant="highlight" :theme="slotProps.theme">Click Here!</p-button-regular>
    <p-button-regular variant="highlight" :theme="slotProps.theme" disabled="true">Disabled</p-button-regular>
    <p-button-regular variant="highlight" loading="true" :theme="slotProps.theme">Loading...</p-button-regular>
  </template>
</Playground>

---

### Button as link element
Buttons used as link elements (`<a>`), e.g. as a navigation item.

#### Regular basic (default)

<Playground>
  <template v-slot="slotProps">
    <p-button-regular href="/lorem/ipsum" :theme="slotProps.theme">Click Here!</p-button-regular>
    <p-button-regular href="#" disabled="true" :theme="slotProps.theme">Disabled</p-button-regular>
    <p-button-regular href="/lorem/ipsum" variant="highlight" loading="true" :theme="slotProps.theme">Loading...</p-button-regular>
  </template>
</Playground>

#### Regular ghost
<Playground>
  <template v-slot="slotProps">
    <p-button-regular href="/lorem/ipsum" variant="ghost" :theme="slotProps.theme">Click Here!</p-button-regular>
    <p-button-regular href="#" variant="ghost" disabled :theme="slotProps.theme">Disabled</p-button-regular>
    <p-button-regular href="#" variant="ghost" loading="true" :theme="slotProps.theme">Loading...</p-button-regular>
  </template>
</Playground>

#### Regular highlight
<Playground>
  <template v-slot="slotProps">
    <p-button-regular href="/lorem/ipsum" variant="highlight" :theme="slotProps.theme">Click Here!</p-button-regular>
    <p-button-regular href="#" variant="highlight" disabled :theme="slotProps.theme">Disabled</p-button-regular>
    <p-button-regular href="#" loading="true" :theme="slotProps.theme">Loading...</p-button-regular>
  </template>
</Playground>

---

### Button regular small
All button types can be rendered in a smaller variant. All properties of the regular button can be set.

<Playground>
  <template v-slot="slotProps">
    <p-button-regular small="true" :theme="slotProps.theme">Click Here!</p-button-regular>
    <p-button-regular small="true" variant="ghost" :theme="slotProps.theme">Click Here!</p-button-regular>
    <p-button-regular small="true" variant="highlight" :theme="slotProps.theme">Click Here!</p-button-regular>
  </template>
</Playground>

---

### Button regular with specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property.
If you need to link to another icon hosted somewhere else, just set the whole icon path to thge `icon` prop.

<Playground>
  <template v-slot="slotProps">
    <p-button-regular icon="phone" :theme="slotProps.theme">Click Here!</p-button-regular>
  </template>
</Playground>

---

### Edge cases

#### Long text
<Playground>
  <template v-slot="slotProps">
    <div style="max-width: 320px">
      <p-button-regular icon="phone" :theme="slotProps.theme">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p-button-regular>
    </div>
  </template>
</Playground>

