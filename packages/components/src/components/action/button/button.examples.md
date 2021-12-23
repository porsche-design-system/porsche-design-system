# Button

The `p-button` component is essential for performing form or **interaction** events. 
For an optimal user guidance and dedicated pursuit of business or sales goals, different types of Buttons (**Primary**, **Secondary**, **Tertiary**) are available for usage. 
A Button can be used with or without a label but it's recommended to keep the **label visible** for better **usability** whenever possible. 
When used without a label, it is mandatory for **accessibility** to provide a descriptive label text for screen readers. 
Whenever you want to provide navigational elements, stick to the [Link](components/link) component instead.

<TableOfContents></TableOfContents>

## Variants

Choose between predefined styling variants.

### Primary

<Playground :markup="primary" :config="config"></Playground>

### Secondary (default)

<Playground :markup="secondary" :config="config"></Playground>

### Tertiary

<Playground :markup="tertiary" :config="config"></Playground>

### Responsive

<Playground :markup="responsive" :config="config"></Playground>

### ARIA attributes and states 

Through the `aria` property you have the possibility to provide additional **ARIA** attributes and states to the component. 
<Playground :markup="accessibility" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
* Make sure to provide **descriptive**, self explaining **labels** which could be understood without context. If short labels are used like **"OK"** make sure to provide additional textual contents through **ARIA** with the `aria` property to expose a more descriptive experience to screen reader users.
* If implementing the Button with a **hidden label** (`hide-label="true"`), do not omit the label. Providing a **descriptive text** to support **screen reader** users is **mandatory**.
* In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable) anymore and can be missed by screen reader users. They can be confusing for sighted users as well by not pointing out why these elements are disabled.

---

## Button with specific icon
If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :markup="icon" :config="config"></Playground>

---

## Bind events to the Button
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the button.

<Playground :markup="events" :config="config"></Playground>

---

## Remove Button from tab order

**NOTICE:** This property is deprecated since v2.8.0 and will be removed in v3.0.0. Please use the `tabindex` attribute (e.g. `tabindex="-1"`).

With setting the `tabbable` property to `false` you can remove the **Button** from the tab order.

<Playground :markup="taborder" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'inline' };
  
  primary = 
`<p-button variant="primary">Some label</p-button>
<p-button variant="primary" disabled>Some label</p-button>
<p-button variant="primary" loading>Some label</p-button>
<br>
<p-button variant="primary" hide-label="true">Some label</p-button>
<p-button variant="primary" hide-label="true" disabled>Some label</p-button>
<p-button variant="primary" hide-label="true" loading>Some label</p-button>`;
  
  secondary = 
`<p-button>Some label</p-button>
<p-button disabled="true">Some label</p-button>
<p-button loading="true">Some label</p-button>
<br>
<p-button hide-label="true">Some label</p-button>
<p-button hide-label="true" disabled>Some label</p-button>
<p-button hide-label="true" loading>Some label</p-button>`;

  tertiary = 
`<p-button variant="tertiary">Some label</p-button>
<p-button variant="tertiary" disabled="true">Some label</p-button>
<p-button variant="tertiary" loading="true">Some label</p-button>
<br>
<p-button variant="tertiary" hide-label="true">Some label</p-button>
<p-button variant="tertiary" hide-label="true" disabled>Some label</p-button>
<p-button variant="tertiary" hide-label="true" loading>Some label</p-button>`;

  responsive =
`<p-button variant="primary" hide-label="{ base: true, s: false }">Some label</p-button>
<p-button variant="secondary" hide-label="{ base: true, m: false }">Some label</p-button>
<p-button variant="tertiary" hide-label="{ base: true, l: false }">Some label</p-button>`;

  accessibility = 
`<p-button aria="{ 'aria-label': 'Some more descriptive label' }">Some label</p-button>`;

  icon =
`<p-button icon="delete">Some label</p-button>
<p-button icon-source="${require('./assets/icon-custom-kaixin.svg')}" hide-label="true">Some label</p-button>`;

  events =
`<p-button
  onclick="alert('click')"
  onfocus="console.log('focus')"
  onfocusin="console.log('focusin')"
  onblur="console.log('blur')"
  onfocusout="console.log('focusout')"
>Some label</p-button>`;
    
  taborder =
`<p-button tabbable="true">Some label</p-button>
<p-button tabbable="false" hide-label="true">Some label</p-button>
<p-button tabindex="-1" hide-label="true">Some label</p-button>
<p-button tabindex="0">Some label</p-button>`;
}
</script>