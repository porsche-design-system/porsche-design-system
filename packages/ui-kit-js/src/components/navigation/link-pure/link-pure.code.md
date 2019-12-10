# Link Pure

## Introduction

The `<p-link-pure>` component is essential to perform changes in page routes.

It can be used with or without a label but it's recommend to keep the label visible for better accessibility whenever possible. When used without a label, then it's best practice to provide a descriptive label text for screen readers.

## Basic example

### With label

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-pure href="https://www.porsche.com" :theme="theme">Some label</p-link-pure>
  </template>
</Playground>

### Without label

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-pure href="https://www.porsche.com" hide-label="true" :theme="theme">Some label</p-link-pure>
  </template>
</Playground>

### Responsive

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-link-pure href="https://www.porsche.com" hide-label="{ base: true, l: false }" :theme="theme">Some label</p-link-pure>
  </template>
</Playground>

---

## Size

There are predefined text sizes for the component which should cover most use cases. 
If a specific text size is needed, the size can be set to `inherit` to specify the text size from outside.

<Playground :themeable="true">
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
  <template v-slot={theme}>
    <p-link-pure href="https://www.porsche.com" :size="size" :style="isInherit" :theme="theme">Some label</p-link-pure>
  </template>
</Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-link-pure href="https://www.porsche.com" size="{ base: 'small', l: 'medium' }" :theme="theme">Some label</p-link-pure>
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
    <p-link-pure href="https://www.porsche.com" size="medium" :weight="weight" :theme="theme">Some label</p-link-pure>
  </template>
</Playground>

---

## Color

Though basic colors are set by the `theme` property, they can be overridden by the `color` property or even inherited from outside to customize coloring on specific needs. 

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-link-pure href="https://www.porsche.com" color="inherit" :theme="theme" style="color: deeppink;">Some label</p-link-pure>
  </template>
</Playground>

---

## Link wrapped with an anker tag (e.g. for framework routing)
If the component is used within a JS framework, it might be applied within a framework specific router component. 
In this case the router component must be wrapped around `<p-link-pure>`. Please take care of the correct styling of the rendered router `<a>` tag like in the example below (in most cases `outline` and `text-decoration` must be set to `none`).


<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <a href="https://www.porsche.com" class="example-link">
      <p-link-pure :theme="theme">Some label</p-link-pure>
    </a><br>
    <a href="https://www.porsche.com" class="example-link">
      <p-link-pure hide-label="true" :theme="theme">Some label</p-link-pure>
    </a>
  </template>
</Playground>

---

## Link with specific icon
If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-link-pure href="https://www.porsche.com" icon="phone" :theme="theme">Some label</p-link-pure>
    <br>
    <p-link-pure :icon-source="require(`@/assets/web/icon-custom-kaixin.svg`)" hide-label="true" :theme="theme" href="https://www.porsche.com">Some label</p-link-pure>
  </template>
</Playground>

---

## Bind events to the link

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the link.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-link-pure
      href="https://www.porsche.com"
      onclick="alert('click')"
      onfocus="console.log('focus')"
      onfocusin="console.log('focusin')"
      onblur="console.log('blur')"
      onfocusout="console.log('focusout')"
      :theme="theme"
    >Some label</p-link-pure>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundLinkPure extends Vue {
    public size: string = 'medium';
    public weight: string = 'thin';
    
    public get isInherit() {
      return this.size === 'inherit' ? 'font-size: 48px' : undefined;
    }
  }
</script>

<style scoped lang="scss">
  .example-link {
    display: inline-block;
    outline: none;
    text-decoration: none;
  }
</style>