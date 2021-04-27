# Link

The `<p-link>` component is essential to perform changes in page routes.
It can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.
In case you want the user to execute an action, you should select the [Button](components/button) component instead.


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