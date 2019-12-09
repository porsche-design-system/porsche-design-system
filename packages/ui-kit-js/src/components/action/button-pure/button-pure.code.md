# Button Pure

## Introduction

The `<p-button-pure>` component is essential to perform events for interactions.

It can be used with or without a label but it's recommend to keep the label visible for better accessibility whenever possible. 
When used without a label, then it's best practice to provide a descriptive label text for screen readers.

## Basic example

### With label

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-button-pure>Some label</p-button-pure>
  <p-button-pure disabled="disabled">Some label</p-button-pure>
  <p-button-pure loading="true">Some label</p-button-pure>
</Playground>

### Without label

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-button-pure hide-label="true">Some label</p-button-pure>
  <p-button-pure hide-label="true" disabled="disabled">Some label</p-button-pure>
  <p-button-pure hide-label="true" loading="true">Some label</p-button-pure>
</Playground>

### Responsive

<Playground>
  <p-button-pure hide-label="{ base: true, l: false }">Some label</p-button-pure>
</Playground>

---

## Size

There are predefined text sizes for the component which should cover most use cases. 
If a specific text size is needed, the size can be set to `inherit` to specify the text size from outside.

<Playground>
  <template #configurator>
    <select @change="size = $event.target.value">
      <option disabled>Select a style variant</option>
      <option>x-small</option>
      <option>small</option>
      <option selected>medium</option>
      <option>large</option>
      <option>x-large</option>
      <option>inherit</option>
    </select>
  </template>
  <p-button-pure :size="size" :style="isInherit">Some label</p-button-pure>
</Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground>
  <p-button-pure size="{ base: 'small', l: 'medium' }">Some label</p-button-pure>
</Playground>

---

## Weight

There are predefined default text weights. Be aware of using the `thin` variant only with larger text sizes.

<Playground>
  <template #configurator>
    <select @change="weight = $event.target.value">
      <option disabled>Select a weight</option>
      <option selected>thin</option>
      <option>regular</option>
      <option>bold</option>
    </select>
  </template>
  <p-button-pure size="medium" :weight="weight">Some label</p-button-pure>
</Playground>

---

## Color

The default text color is Porsche Black. But also predefined or inherited colors can be set.

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-button-pure color="porsche-black">Porsche Black</p-button-pure>
  <p-button-pure color="porsche-light" style="background: black;">Porsche Light</p-button-pure>
  <p-button-pure color="inherit" style="color: deeppink;">Inherited custom color</p-button-pure>
</Playground>

---

## Button with specific icon
If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground>
  <p-button-pure icon="delete">Some label</p-button-pure>
  <br>
  <p-button-pure :icon-source="require(`@/assets/web/icon-custom-kaixin.svg`)" hide-label="true">Some label</p-button-pure>
</Playground>

---

## Bind events to the button

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground>
  <p-button-pure
    onclick="alert('click')"
    onfocus="console.log('focus')"
    onfocusin="console.log('focusin')"
    onblur="console.log('blur')"
    onfocusout="console.log('focusout')"
  >Some label</p-button-pure>
</Playground>

---

## Remove button from tab order

With setting the `tabbable` property to `false` you can remove the button from the tab order. For technical restrictions it's currently not possible to set an individual `tabindex` attribute.

<Playground>
  <p-button-pure tabbable="true">Some label</p-button-pure>
  <br>
  <p-button-pure tabbable="false" hide-label="true">Some label</p-button-pure>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundButtonPure extends Vue {
    public size: string = 'medium';
    public weight: string = 'thin';
    
    public get isInherit() {
      return this.size === 'inherit' ? 'font-size: 48px' : undefined;
    }
  }
</script>
