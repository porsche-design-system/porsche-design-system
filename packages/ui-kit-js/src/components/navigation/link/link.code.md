# Link

The `<p-link>` component is essential to perform changes in page routes.

It can be used with or without a label but it's recommend to keep the label visible for better accessibility whenever possible. When used without a label, then it's best practice to provide a descriptive label text for screen readers.


## Variants

Choose between predefined styling variants.

### Primary

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link variant="primary" href="https://www.porsche.com" :theme="theme">Some label</p-link>
    <p-link variant="primary" href="https://www.porsche.com" hide-label="true" :theme="theme">Some label</p-link>
  </template>
</Playground>

### Secondary (default)

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link href="https://www.porsche.com" :theme="theme">Some label</p-link>
    <p-link href="https://www.porsche.com" hide-label="true" :theme="theme">Some label</p-link>
  </template>
</Playground>

### Tertiary

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link variant="tertiary" href="https://www.porsche.com" :theme="theme">Some label</p-link>
    <p-link variant="tertiary" href="https://www.porsche.com" hide-label="true" :theme="theme">Some label</p-link>
  </template>
</Playground>


### Responsive

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link variant="primary" href="https://www.porsche.com" hide-label="{ base: true, s: false }" :theme="theme">Some label</p-link>
    <p-link variant="secondary" href="https://www.porsche.com" hide-label="{ base: true, m: false }" :theme="theme">Some label</p-link>
    <p-link variant="tertiary" href="https://www.porsche.com" hide-label="{ base: true, l: false }" :theme="theme">Some label</p-link>
  </template>
</Playground>

---

## Link wrapped with an anker tag (e.g. for framework routing)
If the component is used within a JS framework, it might be applied within a framework specific router component. 
In this case the router component must be wrapped around `<p-link>`. Please take care of the correct styling of the rendered router `<a>` tag like in the example below (in most cases `outline` and `text-decoration` must be set to `none`).


<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <a href="https://www.porsche.com" class="example-link">
      <p-link :theme="theme">Some label</p-link>
    </a>
    <a href="https://www.porsche.com" class="example-link">
      <p-link hide-label="true" :theme="theme">Some label</p-link>
    </a>
  </template>
</Playground>

---

## Link with specific icon
If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link href="https://www.porsche.com" icon="phone" :theme="theme">Some label</p-link>
    <p-link href="https://www.porsche.com" :icon-source="require(`@/assets/web/icon-custom-kaixin.svg`)" hide-label="true" :theme="theme">Some label</p-link>
  </template>
</Playground>

## Bind events to the Link
You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the link.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link
        href="https://www.porsche.com"
        onclick="alert('click'); return false;"
        onfocus="console.log('focus')"
        onfocusin="console.log('focusin')"
        onblur="console.log('blur')"
        onfocusout="console.log('focusout')"
        :theme="theme"
    >Some label</p-link>
  </template>
</Playground>

<style scoped lang="scss">
  .example-link {
    display: inline-block;
    outline: none;
    text-decoration: none;
  }
</style>