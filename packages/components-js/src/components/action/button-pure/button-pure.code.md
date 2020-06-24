# Button Pure

## Introduction

The `<p-button-pure>` component is essential to perform events for interactions.

It can be used with or without a label. When hiding the label make sure to provide a descriptive label text for screen readers.

## Basic example

### With label

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-pure :theme="theme">Some label</p-button-pure>
    <p-button-pure disabled="true" :theme="theme">Some label</p-button-pure>
    <p-button-pure loading="true" :theme="theme">Some label</p-button-pure>
  </template>
</Playground>

### Without label

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-pure hide-label="true" :theme="theme">Some label</p-button-pure>
    <p-button-pure hide-label="true" disabled="true" :theme="theme">Some label</p-button-pure>
    <p-button-pure hide-label="true" loading="true" :theme="theme">Some label</p-button-pure>
  </template>
</Playground>

### Responsive

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-button-pure hide-label="{ base: true, l: false }" :theme="theme">Some label</p-button-pure>
  </template>
</Playground>

---

## Size

There are predefined text sizes for the component which should cover most use cases. 
If a specific text size is needed, the size can be set to `inherit` to specify the text size from outside.

**Hint:** If you are in `hideLabel`-mode, be aware that the box-size of the rendered element will not be the same as the given (font-size) pixel value, 
e.g. setting a font-size of **"44px"** will not generate a box with a **"44px"** width/height but instead a box size generated out of Porsche type-scaling formula which will end in **"52px"** width/height.

<Playground :themeable="true">
  <template #configurator>
    <select @change="size = $event.target.value">
      <option disabled>Select a size</option>
      <option>x-small</option>
      <option>small</option>
      <option selected>medium</option>
      <option>large</option>
      <option>x-large</option>
      <option>inherit</option>
    </select>
  </template>
  <template v-slot={theme}>
    <p-button-pure :size="size" :style="isInherit" :theme="theme">Some label</p-button-pure>
  </template>
</Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-button-pure size="{ base: 'small', l: 'medium' }" :theme="theme">Some label</p-button-pure>
  </template>
</Playground>

---

## Weight

There are predefined default text weights. Be aware of using the `thin` variant only with larger text sizes.

<Playground :themeable="true">
  <template #configurator>
    <select @change="weight = $event.target.value">
      <option disabled>Select a weight</option>
      <option selected>thin</option>
      <option>regular</option>
      <option>bold</option>
    </select>
  </template>
  <template v-slot={theme}>
    <p-button-pure size="medium" :weight="weight" :theme="theme">Some label</p-button-pure>
  </template>
</Playground>

---

## Button with specific icon
If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-button-pure icon="delete" :theme="theme">Some label</p-button-pure>
    <br>
    <p-button-pure :icon-source="require(`./assets/icon-custom-kaixin.svg`)" hide-label="true" :theme="theme">Some label</p-button-pure>
  </template>
</Playground>

---

## Button with custom clickable/focusable area

Sometimes it might be useful to enlarge the clickable/focusable area of a button to fulfill accessibility guidelines.
Therefore a custom padding can be set on the host element.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-button-pure :theme="theme" style="padding: 1rem;">Some label</p-button-pure>
    <p-button-pure :theme="theme" hide-label="true" style="padding: 1rem;">Some label</p-button-pure>
  </template>
</Playground>

---

## Bind events to the button

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-button-pure
      onclick="alert('click')"
      onfocus="console.log('focus')"
      onfocusin="console.log('focusin')"
      onblur="console.log('blur')"
      onfocusout="console.log('focusout')"
      :theme="theme"
    >Some label</p-button-pure>
  </template>
</Playground>

---

## Remove button from tab order

With setting the `tabbable` property to `false` you can remove the button from the tab order. For technical restrictions it's currently not possible to set an individual `tabindex` attribute.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-button-pure tabbable="true" :theme="theme">Some label</p-button-pure>
    <br>
    <p-button-pure tabbable="false" hide-label="true" :theme="theme">Some label</p-button-pure>
  </template>
</Playground>

---

## Button with Subline

If you need additional information on your button, we provide a `<p slot="subline" />`.
The size of the *subline* changes according to the size of the *label*. We do not support `size="inherit"` in this pattern so far.

<Playground :themeable="true">
  <template #configurator>
    <select @change="size = $event.target.value">
      <option disabled>Select a size</option>
      <option selected>small</option>
      <option>medium</option>
      <option>large</option>
      <option>x-large</option>
    </select>
  </template>
  <template v-slot={theme}>
    <p-button-pure :size="size" :theme="theme">
         Some label
         <p slot="subline">Some Subline</p>
      </p-button-pure>
    <p-button-pure :size="size" weight="semibold" :theme="theme">
       Some label
       <p slot="subline">Some Subline</p>
    </p-button-pure>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundButtonPure extends Vue {
    public size: string = 'medium';
    public weight: string = 'thin';
    
    public get isInherit() {
      return this.size === 'inherit' ? 'font-size: 48px;' : undefined;
    }
  }
</script>
