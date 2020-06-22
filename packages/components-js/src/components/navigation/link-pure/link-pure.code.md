# Link Pure

The `<p-link-pure>` component is essential for performing changes in page routes.

It can be used with or without a label but it's recommend to keep the label visible for better accessibility whenever possible. When used without a label  it's best practice to provide a descriptive label text for screen readers.

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

**Hint:** If you are in `hideLabel`-mode, be aware that the box-size of the rendered element will not be the same as the given (font-size) pixel value, 
e.g. setting a font-size of **"44px"** will not generate a box with a **"44px"** width/height but instead a box size generated out of Porsche type-scaling formula which will end in **"52px"** width/height.

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

## Framework routing (anchor nesting)

To support custom anchor tags (e.g. framework specific routing) you can provide them as a **slotted element** (recommended) of the component or as a wrapper element. If using the latter, take care of the correct styling of the rendered router `<a>` tag like in the example below (in most cases `outline` and `text-decoration` must be set to `none`).

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-pure :theme="theme"><a href="https://www.porsche.com">Some label</a></p-link-pure>
    <a href="https://www.porsche.com" class="example-link"><p-link-pure :theme="theme">Some label</p-link-pure></a>
  </template>
</Playground>

---

## Active state

Providing visually differences if a link changes its state can be achieved by setting the `active` property. 

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
      <p-link-pure active="true" href="https://www.porsche.com" :theme="theme">Some label</p-link-pure>
  </template>
</Playground>

If the active state should not render a clickable anchor tag, just remove the `href` property. 

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
      <p-link-pure active="true" :theme="theme">Some label</p-link-pure>
  </template>
</Playground>

---

## Examples how to use with Framework specific router and "active state" support

### Angular

``` 
# template.html
<p-link-pure [active]="rla.isActive">
  <a routerLink="/path/to/heaven" routerLinkActive #rla="routerLinkActive"></a>
</p-link-pure>

```

If you wrap it with an `<a>`, it's important to reset `text-decoration` and `outline`, since the inner component has no control over the elements that are around it.

``` 
# style.css
.link {
  text-decoration:none;
  outline: none;
}

# template.html
<a routerLink="/path/to/heaven" routerLinkActive #rla="routerLinkActive" class="link">
  <p-link-pure [active]="rla.isActive">Some label</p-link-pure>
</a>

```

### React

Use the spread operator to call props of **PLinkPure**.

``` 
# Component.tsx
<PLinkPure {...{active: true}}>
  <Link to="/path/to/heaven">Some label</Link>
</PLinkPure>

```

If you wrap it with the `<Link>` component of React Router, it's important to reset `text-decoration` and `outline`, since the inner
component has no control over the elements that are around it.  

``` 
# Style.css
.link {
  text-decoration:none;
  outline: none;
}

# Component.tsx
<Link to="/path/to/heaven" className={"link"}>
  <PLinkPure {...{active: true}}>Some label</PLinkPure>
</Link>
```

### VueJs

``` 
<router-link :to="/path/to/heaven" v-slot="{ href, navigate, isActive }">
  <p-link-pure :href="href" @click="navigate" :active="isActive">Some label</p-link-pure>
</router-link>
```

## Link with specific icon

If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-link-pure href="https://www.porsche.com" icon="phone" :theme="theme">Some label</p-link-pure>
    <br>
    <p-link-pure :icon-source="require(`./assets/icon-custom-kaixin.svg`)" hide-label="true" :theme="theme" href="https://www.porsche.com">Some label</p-link-pure>
  </template>
</Playground>

---

## Link with custom clickable/focusable area

Sometimes it might be useful to enlarge the clickable/focusable area of a link to fulfill accessibility guidelines.
Therefore a custom padding can be set on the host element.

<Playground :themeable="true" :childElementLayout="{spacing: 'inline'}">
  <template v-slot={theme}>
    <p-link-pure href="https://www.porsche.com" :theme="theme" style="padding: 1rem;">Some label</p-link-pure>
    <p-link-pure href="https://www.porsche.com" :theme="theme" hide-label="true" style="padding: 1rem;">Some label</p-link-pure>
    <a href="https://www.porsche.com" class="example-link">
      <p-link-pure :theme="theme" style="padding: 1rem;">Some label</p-link-pure>
    </a>
    <a href="https://www.porsche.com" class="example-link">
      <p-link-pure :theme="theme" hide-label="true" style="padding: 1rem;">Some label</p-link-pure>
    </a>
  </template>
</Playground>

---

## Bind events to the link

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the link.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-link-pure
      href="https://www.porsche.com"
      onclick="alert('click'); return false;"
      onfocus="console.log('focus')"
      onfocusin="console.log('focusin')"
      onblur="console.log('blur')"
      onfocusout="console.log('focusout')"
      :theme="theme"
    >Some label</p-link-pure>
  </template>
</Playground>

---

## Link Pure with subline

If you need additional information on your link, we recommend following pattern.

Use `weight="semibold" size="large"` and add `<p-text size="medium">` into the component, to set it as subline. The `color` property has to be `inherit` to get the hover state of the parent element.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-link-pure size="large" weight="semibold" :theme="theme">Some label<p-text color="inherit" size="medium">Subline text</p-text></p-link-pure>
  </template>
</Playground>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundLinkPure extends Vue {
    public size: string = 'medium';
    public weight: string = 'thin';
    
    public get isInherit() {
      return this.size === 'inherit' ? 'font-size: 48px;' : undefined;
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