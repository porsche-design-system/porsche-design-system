# Button Pure

The `<p-button-pure>` component is essential to perform events for interactions.
It can be used with or without a label. When hiding the label make sure to provide a descriptive label text for screen readers.
Whenever you want to provide navigational elements, stick to the [Link](components/link) or [Link Pure](components/link-pure) component instead.

## Basic example

### With label

<Playground :markup="withLabel" :config="config"></Playground>

### Without label

<Playground :markup="withoutLabel" :config="config"></Playground>

### Responsive

<Playground :markup="responsive" :config="config"></Playground>

---

## Size

There are predefined text sizes for the component which should cover most use cases. 
If a specific text size is needed, the size can be set to `inherit` to specify the text size from outside.

**Hint:** If you are in `hideLabel`-mode, be aware that the box-size of the rendered element will not be the same as the given (font-size) pixel value, 
e.g. setting a font-size of **"44px"** will not generate a box with a **"44px"** width/height but instead a box size generated out of Porsche type-scaling formula which will end in **"52px"** width/height.

<Playground :markup="markupSize" :config="config">
  <select @change="size = $event.target.value">
    <option disabled>Select a size</option>
    <option>x-small</option>
    <option>small</option>
    <option selected>medium</option>
    <option>large</option>
    <option>x-large</option>
    <option>inherit</option>
  </select>
</Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="markupResponsive" :config="config"></Playground>

---

## Weight

There are predefined default text weights. Be aware of using the `thin` variant only with larger text sizes.

<Playground :markup="markupWeight" :config="config">
  <select @change="weight = $event.target.value">
    <option disabled>Select a weight</option>
    <option selected>thin</option>
    <option>regular</option>
    <option>bold</option>
  </select>
</Playground>

---

## Button with specific icon
If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :markup="icon" :config="config"></Playground>

---

## Button with custom clickable/focusable area

Sometimes it might be useful to enlarge the clickable/focusable area of a button to fulfill accessibility guidelines.
Therefore a custom padding can be set on the host element.

<Playground :markup="clickableArea" :config="config"></Playground>

---

## Bind events to the button

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground :markup="events" :config="config"></Playground>

---

## Remove button from tab order

With setting the `tabbable` property to `false` you can remove the button from the tab order. For technical restrictions it's currently not possible to set an individual `tabindex` attribute.

<Playground :markup="taborder" :config="config"></Playground>

---

## Button with Subline

If you need additional information on your button, we provide a `<p slot="subline" />`.
The size of the *subline* changes according to the size of the *label*. We do not support `size="inherit"` in this pattern so far.

<Playground :markup="subline" :config="config">
  <select @change="size = $event.target.value">
    <option disabled>Select a size</option>
    <option selected>small</option>
    <option>medium</option>
    <option>large</option>
    <option>x-large</option>
  </select>
</Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true, spacing: 'inline' };

    size = 'medium';
    weight = 'thin';
    
    withLabel =
`<p-button-pure>Some label</p-button-pure>
<p-button-pure disabled="true">Some label</p-button-pure>
<p-button-pure loading="true">Some label</p-button-pure>`;

    withoutLabel =
`<p-button-pure hide-label="true">Some label</p-button-pure>
<p-button-pure hide-label="true" disabled="true">Some label</p-button-pure>
<p-button-pure hide-label="true" loading="true">Some label</p-button-pure>`;
    
    responsive =
`<p-button-pure hide-label="{ base: true, l: false }">Some label</p-button-pure>`;

    get markupSize() {
      const style = this.size === 'inherit' ? ' style="font-size: 48px;"' : '';
      return `<p-button-pure size="${this.size}"${style}>Some label</p-button-pure>`;
    }
    
    markupResponsive = 
`<p-button-pure size="{ base: 'small', l: 'medium' }">Some label</p-button-pure>`;

    get markupWeight() {
      return `<p-button-pure size="medium" weight="${this.weight}">Some label</p-button-pure>`;
    }

    icon =
`<p-button-pure icon="delete">Some label</p-button-pure>
<p-button-pure icon-source="${require('./assets/icon-custom-kaixin.svg')}" hide-label="true">Some label</p-button-pure>`;
 
    clickableArea =
`<p-button-pure style="padding: 1rem;">Some label</p-button-pure>
<p-button-pure hide-label="true" style="padding: 1rem;">Some label</p-button-pure>`;

    events =
`<p-button-pure
  onclick="alert('click')"
  onfocus="console.log('focus')"
  onfocusin="console.log('focusin')"
  onblur="console.log('blur')"
  onfocusout="console.log('focusout')"
>Some label</p-button-pure>`;

    taborder =
`<p-button-pure tabbable="true">Some label</p-button-pure>
<p-button-pure tabbable="false" hide-label="true">Some label</p-button-pure>`;

    get subline() {
      return `<p-button-pure size="${this.size}">
  Some label
  <p slot="subline">Some Subline</p>
</p-button-pure>
<p-button-pure size="${this.size}" weight="semibold">
  Some label
  <p slot="subline">Some Subline</p>
</p-button-pure>`;
    }
  }
</script>
