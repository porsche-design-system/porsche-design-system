# Link Pure

The `<p-link-pure>` component is essential for performing changes in page routes.
It can be used with or without a label but it's recommend to keep the label visible for better accessibility whenever possible. When used without a label  it's best practice to provide a descriptive label text for screen readers.
In case you want the user to execute an action, you should select the [Button](components/button) or [Button Pure](components/button-pure) component instead.

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

<Playground :markup="sizeMarkup" :config="config">
  <select v-model="size">
    <option disabled>Select a style variant</option>
    <option>x-small</option>
    <option>small</option>
    <option>medium</option>
    <option>large</option>
    <option>x-large</option>
    <option>inherit</option>
  </select>
</Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :markup="sizeResponsive" :config="config"></Playground>

---

## Weight

There are predefined default text weights. Be aware of using the `thin` variant only with larger text sizes.

<Playground :markup="weightMarkup" :config="config">
  <select v-model="weight">
    <option disabled>Select a weight</option>
    <option>thin</option>
    <option>regular</option>
    <option>bold</option>
  </select>
</Playground>

---

## Framework routing (anchor nesting)

To support custom anchor tags (e.g. framework specific routing) you can provide them as a **slotted element** (recommended) of the component.

<Playground :markup="routing" :config="config"></Playground>

---

## Active state

Providing visually differences if a link changes its state can be achieved by setting the `active` property. 

<Playground :markup="activeHref" :config="config"></Playground>

If the active state should not render a clickable anchor tag, just remove the `href` property. 

<Playground :markup="activeWithoutHref" :config="config"></Playground>

---

## Examples how to use with Framework specific router and "active state" support

### Angular

``` 
<p-link-pure [active]="rla.isActive">
  <a routerLink="/path/to/heaven" routerLinkActive #rla="routerLinkActive"></a>
</p-link-pure>
```

### React

``` 
<PLinkPure active={isActive}>
  <Link to="/path/to/heaven">Some label</Link>
</PLinkPure>
```

### VueJs

``` 
<router-link :to="/path/to/heaven" v-slot="{ href, navigate, isActive }">
  <p-link-pure :href="href" @click="navigate" :active="isActive">Some label</p-link-pure>
</router-link>
```

## Link with specific icon

If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :markup="icon" :config="config"></Playground>

---

## Link with custom clickable/focusable area

Sometimes it might be useful to enlarge the clickable/focusable area of a link to fulfill accessibility guidelines.
Therefore a custom padding can be set on the host element.

<Playground :markup="clickableArea" :config="config"></Playground>

---

## Bind events to the link

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the link.

<Playground :markup="events" :config="config"></Playground>

---

## Link Pure with Subline

If you need additional information on your link, we provide a `<p slot="subline" />`.
The size of the *subline* changes according to the size of the *label*. We do not support `size="inherit"` in this pattern so far.

**Note** If you intend to use a `<a>` tag inside of the `<p-link-pure` component, keep in mind that the slot needs to be *outside* of the anchor tag to function properly!

<Playground :markup="subline" :config="config">
  <select v-model="sublineSize">
    <option disabled>Select a size</option>
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
    config = { themeable: true, spacing: 'inline' };
    
    size = 'medium';
    sublineSize = 'small';
    weight = 'thin';
    
    withLabel =
`<p-link-pure href="https://www.porsche.com">Some label</p-link-pure>`;

    withoutLabel =
`<p-link-pure href="https://www.porsche.com" hide-label="true">Some label</p-link-pure>`;

    responsive =
`<p-link-pure href="https://www.porsche.com" hide-label="{ base: true, l: false }">Some label</p-link-pure>`;

    get sizeMarkup() {
      const style =this.size === 'inherit' ? ' style="font-size: 48px;"' : '';
      return `<p-link-pure href="https://www.porsche.com" size="${this.size}"${style}>Some label</p-link-pure>`;
    }
    
    sizeResponsive =
`<p-link-pure href="https://www.porsche.com" size="{ base: 'small', l: 'medium' }">Some label</p-link-pure>`;

    get weightMarkup() {
      return `<p-link-pure href="https://www.porsche.com" size="medium" weight="${this.weight}">Some label</p-link-pure>`;
    }

    routing =
`<p-link-pure>
  <a href="https://www.porsche.com">Some label</a>
</p-link-pure>`;

    activeHref =
`<p-link-pure active="true" href="https://www.porsche.com">Some label</p-link-pure>`;

    activeWithoutHref =
`<p-link-pure active="true">Some label</p-link-pure>`;

    icon =
`<p-link-pure href="https://www.porsche.com" icon="phone">Some label</p-link-pure>
<p-link-pure icon-source="${require('./assets/icon-custom-kaixin.svg')}" hide-label="true" href="https://www.porsche.com">Some label</p-link-pure>`;

    clickableArea =
`<p-link-pure href="https://www.porsche.com" style="padding: 1rem;">Some label</p-link-pure>
<p-link-pure href="https://www.porsche.com" hide-label="true" style="padding: 1rem;">Some label</p-link-pure>
<a href="https://www.porsche.com" class="example-link">
  <p-link-pure style="padding: 1rem;">Some label</p-link-pure>
</a>
<a href="https://www.porsche.com" class="example-link">
  <p-link-pure hide-label="true" style="padding: 1rem;">Some label</p-link-pure>
</a>`;

    events =
`<p-link-pure
  href="https://www.porsche.com"
  onclick="alert('click'); return false;"
  onfocus="console.log('focus')"
  onfocusin="console.log('focusin')"
  onblur="console.log('blur')"
  onfocusout="console.log('focusout')"
>Some label</p-link-pure>`;

    get subline() {
      return `<p-link-pure size="${this.sublineSize}" href="https://www.porsche.com">
  Some label
  <p slot="subline">Some Subline</p>
</p-link-pure>
<p-link-pure size="${this.sublineSize}" weight="semibold">
  <a href="https://www.porsche.com">Some label</a>
  <p slot="subline">Some Subline</p>
</p-link-pure>`;
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .example-link {
    display: inline-block;
    outline: none;
    text-decoration: none;
  }
</style>