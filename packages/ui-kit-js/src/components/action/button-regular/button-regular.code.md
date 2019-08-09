# Button Regular

## Buttons as button elements
Button Regular or Small used as `<button>` elements to trigger actions.

### Highlight

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular variant="highlight" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular variant="highlight" :theme="theme" disabled="true">Disabled</p-button-regular>
    <p-button-regular variant="highlight" loading="true" :theme="theme">Loading...</p-button-regular>
  </template>
</Playground>

### Basic

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular :theme="theme">Click Here!</p-button-regular>
    <p-button-regular :theme="theme" disabled="true">Disabled</p-button-regular>
    <p-button-regular :theme="theme" loading="true">Loading...</p-button-regular>
  </template>
</Playground>

### Ghost

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular variant="ghost" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular variant="ghost" :theme="theme" disabled="true">Disabled</p-button-regular>
    <p-button-regular variant="ghost" loading="true" :theme="theme">Loading...</p-button-regular>
  </template>
</Playground>


---

## Button as link element
Button Regular or Small used as link element `<a>`, e.g. as a navigation item.

### Highlight
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular href="/lorem/ipsum" variant="highlight" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular href="#" variant="highlight" disabled :theme="theme">Disabled</p-button-regular>
    <p-button-regular href="#" loading="true" :theme="theme">Loading...</p-button-regular>
  </template>
</Playground>

### Basic

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular href="/lorem/ipsum" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular href="#" disabled="true" :theme="theme">Disabled</p-button-regular>
    <p-button-regular href="/lorem/ipsum" variant="highlight" loading="true" :theme="theme">Loading...</p-button-regular>
  </template>
</Playground>

### Ghost
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular href="/lorem/ipsum" variant="ghost" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular href="#" variant="ghost" disabled :theme="theme">Disabled</p-button-regular>
    <p-button-regular href="#" variant="ghost" loading="true" :theme="theme">Loading...</p-button-regular>
  </template>
</Playground>


---

## Button Small
All types of Button Regular can be rendered in a smaller variant. All properties of the Button Regular can be set.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular small="true" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular small="true" variant="ghost" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular small="true" variant="highlight" :theme="theme">Click Here!</p-button-regular>
  </template>
</Playground>

---

## Button Regular with specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `icon` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-regular icon="phone" :theme="theme">Click Here!</p-button-regular>
    <p-button-regular :icon="require(`@/assets/web/icon-custom-kaixin.svg`)" :theme="theme">Click Here!</p-button-regular>
  </template>
</Playground>

---

## Edge cases

### Long text
<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <div style="max-width: 320px">
      <p-button-regular icon="phone" :theme="theme">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p-button-regular>
    </div>
  </template>
</Playground>