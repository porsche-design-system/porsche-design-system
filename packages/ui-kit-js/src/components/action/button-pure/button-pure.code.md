# Button Pure

## Introduction
The `<p-button-pure>` component is essential to perform events for interactions.

It can be used with or without a label but it's recommend to keep the label visible for better accessibility whenever possible. 
When used without a label, then it's best practice to provide a descriptive label text for screen readers.

## Basic example

<Playground>
<p-text>
    Hallo <p-button-pure>Hallo</p-button-pure> Welt!
    <br>
    Hallo Hallo Welt!
</p-text>
    <br>
  <p-button-pure>Some label</p-button-pure>
  <br>
  <p-button-pure hide-label="true">Some label</p-button-pure>
</Playground>

### Responsive
<Playground>
  <p-button-pure hide-label="{ base: true, l: false }">Some label</p-button-pure>
</Playground>

---

## Sizes

<Playground>
  <template #configurator>
    <select @change="size = $event.target.value">
      <option disabled>Select a style variant</option>
      <option>x-small</option>
      <option selected>small</option>
      <option>medium</option>
      <option>large</option>
      <option>x-large</option>
    </select>
  </template>
  <p-button-pure :size="size">Some link with default icon</p-button-pure>
</Playground>

---

## Color

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-button-pure color="porsche-black">Porsche Black</p-button-pure>
  <p-button-pure color="porsche-light" style="background: black;">Porsche Light</p-button-pure>
  <p-button-pure color="inherit" style="color: deeppink;">Inherited custom color</p-button-pure>
</Playground>

---

## Specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property.
If you need to link to another icon hosted somewhere else, just set the whole icon path to the `icon` prop.

<Playground>
  <p-text-link icon="delete">Some label</p-text-link>
</Playground>

---

## Bind events to the Button
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground>
  <template v-slot={theme}>
    <p-button-pure
        onclick="alert('click')"
        onfocus="console.log('focus')"
        onfocusin="console.log('focusin')"
        onblur="console.log('blur')"
        onfocusout="console.log('focusout')"
    >Some label</p-button-pure>
  </template>
</Playground>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundButtonPure extends Vue {
    public size: string = 'small';
  }
</script>
