# Link

The `p-link` component is essential to perform changes in **page routes**.
For an optimal user guidance and dedicated pursuit of business or sales goals, different types of Links (**Primary**, **Secondary**, **Tertiary**) are available for usage.
A Link can be used with or without a label, but it's recommended to keep the **label visible** for better **usability** whenever possible.
When used without a label, it is mandatory for **accessibility** to provide a descriptive label text for screen readers.
In case you want the user to execute an action, you should select the [Button](components/button) component instead.

<TableOfContents></TableOfContents>

## Variants

Choose between predefined styling variants.

### Primary

<Playground :markup="buttons('primary')" :config="config"></Playground>

### Secondary (default)

<Playground :markup="buttons()" :config="config"></Playground>

### Tertiary

<Playground :markup="buttons('tertiary')" :config="config"></Playground>

### Responsive

<Playground :markup="responsive" :config="config"></Playground>

### ARIA attributes and states

Through the `aria` property you have the possibility to provide additional **ARIA** attributes and states to the component.
<Playground :markup="accessibility" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
* Make sure to provide **descriptive**, self explaining **labels** which could be understood without context. If short labels are used like **"OK"** make sure to provide additional textual contents to expose a more descriptive experience to screen reader users. This can be done through **ARIA** with the `aria` property or by using the **slotted** approach where you can set the `aria-label` attribute directly on the anchor tag.
* If implementing the Link with a **hidden label** (`hide-label="true"`), do not omit the label. Providing a **descriptive text** to support **screen reader** users is **mandatory**.
* In general, preventing opening new windows by default with (`target="_blank"`) is a good choice. Let users choose by themselves how to open links. However, if you choose to implement `target="_blank"`, make sure to provide additional information with ARIA label, e.g.: `aria-label="Porsche Taycan model page (opens in new window)"` 

---

## Framework routing (anchor nesting)

To support custom anchor tags (e.g. framework specific routing) you can provide them as a **slotted element** of the component.

<Playground :markup="routing" :config="config"></Playground>

---

## Link with specific icon
If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :markup="icon" :config="config"></Playground>

## Bind events to the Link
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the link.

<Playground :markup="events" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'inline' };
  
  buttons(value: string) {
    const attr = value ? ` variant="${value}"` : '';
    return `<p-link${attr} href="https://www.porsche.com">Some label</p-link>
<p-link${attr} href="https://www.porsche.com" hide-label="true">Some label</p-link>`;
    }

  responsive =
`<p-link variant="primary" href="https://www.porsche.com" hide-label="{ base: true, s: false }">Some label</p-link>
<p-link variant="secondary" href="https://www.porsche.com" hide-label="{ base: true, m: false }">Some label</p-link>
<p-link variant="tertiary" href="https://www.porsche.com" hide-label="{ base: true, l: false }">Some label</p-link>`;

  accessibility = 
`<p-link href="https://www.porsche.com" aria="{ 'aria-label': 'Some more descriptive label' }">Some label</p-link>`;

  routing =
`<p-link>
  <a href="https://www.porsche.com">Some label</a>
</p-link>`;

  icon =
`<p-link href="https://www.porsche.com" icon="phone">Some label</p-link>
<p-link href="https://www.porsche.com" icon-source="${require('./assets/icon-custom-kaixin.svg')}" hide-label="true">Some label</p-link>`;

  events =
`<p-link
  href="https://www.porsche.com"
  onclick="alert('click'); return false;"
  onfocus="console.log('focus')"
  onfocusin="console.log('focusin')"
  onblur="console.log('blur')"
  onfocusout="console.log('focusout')"
>Some label</p-link>`;
}
</script>

<style scoped lang="scss">
  .example-link {
    display: inline-block;
    outline: none;
    text-decoration: none;
  }
</style>