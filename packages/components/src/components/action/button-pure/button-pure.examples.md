# Button Pure

The `p-button-pure` component is essential to perform events for **interactions**.  
A Button can be used with or without a label, but it's recommended to keep the **label visible** for better **usability** whenever possible.  
When used without a label, it is mandatory for **accessibility** to provide a descriptive label text for screen readers.  
When overriding the `position` style of the `p-button-pure` component, make sure to not use `position: static`, which would make the click area expand to the entire viewport.     
Whenever you want to provide navigational elements, stick to the [Link](components/link) or [Link Pure](components/link-pure) component instead.  

<TableOfContents></TableOfContents>

## Basic example

### With label

<Playground :markup="withLabel" :config="configInline"></Playground>

### Without label

<Playground :markup="withoutLabel" :config="configInline"></Playground>

### Responsive

<Playground :markup="responsive" :config="config"></Playground>

### ARIA attributes and states

Through the `aria` property you have the possibility to provide additional **ARIA** attributes and states to the component.
<Playground :markup="accessibility" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
* Make sure to provide **descriptive**, self explaining **labels** which could be understood without context. If short labels are used like **"OK"** make sure to provide additional textual contents through **ARIA** with the `aria` property to expose a more descriptive experience to screen reader users.
* If implementing the Button with a **hidden label** (`hide-label="true"`), do not omit the label. Providing a **descriptive text** to support **screen reader** users is **mandatory**.
* In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable) anymore and can be missed by screen reader users. They can be confusing for sighted users as well by not showing why these elements are disabled.

---

### Without Icon

By choosing `icon="none"` the component is shown without icon.

**Caution:** You can't combine  this with the prop `loading="true"` nor the prop `hideLabel`

<Playground :markup="withoutIcon" :config="configInline"></Playground>

---

## Size

There are predefined text sizes for the component which should cover most use cases. 
If a specific text size is needed, the size can be set to `inherit` to specify the text size from outside.

**Hint:** If you are in `hideLabel`-mode, be aware that the box-size of the rendered element will not be the same as the given (font-size) pixel value, 
e.g. setting a font-size of **"44px"** will not generate a box with a **"44px"** width/height but instead a box size generated out of Porsche type-scaling formula which will end in **"52px"** width/height.

<Playground :markup="markupSize" :config="config">
  <select v-model="size" aria-label="Select size">
    <option disabled>Select size</option>
    <option>x-small</option>
    <option>small</option>
    <option>medium</option>
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
  <select v-model="weight" aria-label="Select weight">
    <option disabled>Select weight</option>
    <option>thin</option>
    <option>regular</option>
    <option>bold</option>
  </select>
</Playground>

---

## Active state

Providing visually differences if a button needs to be accentuated, e.g. in hierarchical mobile menus.

<Playground :markup="markupActive" :config="config"></Playground>

---

## Button Pure with specific icon
If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :markup="icon" :config="configInline"></Playground>

---

## Alignment

The `label` can be aligned to the `right` (default) or to the `left` of the icon.

<Playground :markup="markupAlignment" :config="config">
  <select v-model="alignLabel" aria-label="Select alignment">
    <option disabled>Select alignment</option>
    <option value="left">Left</option>
    <option value="right">Right</option>
    <option value="{ base: 'left', l: 'right' }">Responsive</option>
  </select>
</Playground>

---

## Stretch

The `stretch` property extends the area between icon and label to the maximum available space.
It is recommended to use stretch only on `left` alignment and small viewports, e.g. mobile views.

<Playground :markup="markupStretch" :config="config">
  <select v-model="stretch" aria-label="Select stretching and alignment">
    <option disabled>Select stretching and alignment</option>
    <option value='stretch="true" align-label="left"'>stretch true, align-label left</option>
    <option value='stretch="true" align-label="right"'>stretch true, align-label right</option>
    <option value='stretch="false" align-label="left"'>stretch false, align-label left</option>
    <option value='stretch="false" align-label="right"'>stretch false, align-label right</option>
    <option value='stretch="{ base: true, l: false }" align-label="left"'>Responsive</option>
  </select>
</Playground>

---

## Button Pure with custom clickable/focusable area

Sometimes it might be useful to enlarge the clickable/focusable area of a button to fulfill accessibility guidelines.
Therefore a custom padding can be set on the host element.

<Playground :markup="clickableArea" :config="configInline"></Playground>

---

## Bind events to the button

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground :markup="events" :config="config"></Playground>

---

## Remove Button Pure from tab order

**NOTICE:** The property `tabbable` is deprecated since v2.8.0 and will be removed in v3.0.0.

By setting the `tabindex` attribute to `-1` you can remove the **Button Pure** from the tab order.

<Playground :markup="taborder" :config="configInline"></Playground>

---

## Button with Subline

If you need additional information on your button, we provide a `<p slot="subline" />`.
The size of the *subline* changes according to the size of the *label*. We do not support `size="inherit"`, `stretch` and `alignLabel` in this pattern so far.

<Playground :markup="subline" :config="configInline">
  <select v-model="sublineSize" aria-label="Select size">
    <option disabled>Select size</option>
    <option>small</option>
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
  config = { themeable: true };
  configInline = { ...this.config, spacing: 'inline' };

  size = 'medium';
  sublineSize = 'small'; 
  weight = 'thin';
  alignLabel = 'left';
  stretch = 'stretch="true" align-label="left"';

  withoutIcon =
`<p-button-pure icon="none">Some label</p-button-pure>
<p-button-pure icon="none" disabled="true">Some label</p-button-pure>
<p-button-pure icon="none" size="small" weight="semibold">
  Some label
  <p slot="subline">Some Subline</p>
</p-button-pure>`;
    
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

  accessibility = 
`<p-button-pure aria="{ 'aria-label': 'Some more descriptive label' }">Some label</p-button-pure>`;
    
  markupResponsive = 
`<p-button-pure size="{ base: 'small', l: 'medium' }">Some label</p-button-pure>`;

  get markupWeight() {
    return `<p-button-pure size="medium" weight="${this.weight}">Some label</p-button-pure>`;
  }

  markupActive =
`<p-button-pure active="true">Some label</p-link-pure>`;

  icon =
`<p-button-pure icon="delete">Some label</p-button-pure>
<p-button-pure icon-source="${require('./assets/icon-custom-kaixin.svg')}" hide-label="true">Some label</p-button-pure>`;

  get markupAlignment() {
    return `<p-button-pure align-label="${this.alignLabel}">Some label</p-button-pure>`;
  };

  get markupStretch() {
    return `<p-button-pure ${this.stretch}>Some label</p-button-pure>`;
  };

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
`<p-button-pure>Some label</p-button-pure>
<p-button-pure tabindex="-1" hide-label="true">Some label</p-button-pure>
<p-button-pure>Some label</p-button-pure>`;

  get subline() {
    return `<p-button-pure size="${this.sublineSize}">
  Some label
  <p slot="subline">Some Subline</p>
</p-button-pure>
<p-button-pure size="${this.sublineSize}" weight="semibold">
  Some label
  <p slot="subline">Some Subline</p>
</p-button-pure>`;
  }
}
</script>
