# Link Pure

The `p-link-pure` component is essential for performing changes in **page routes**.  
A Link Pure can be used with or without a label, but it's recommended to keep the **label visible** for better **usability** whenever possible.  
When used without a label, it is mandatory for **accessibility** to provide a descriptive label text for screen readers.  
When overriding the `position` style of the `p-link-pure` component, make sure to not use `position: static`, which would make the click area expand to the entire viewport.    
In case you want the user to execute an action, you should select the [Button](components/button) or [Button Pure](components/button-pure) component instead.  

<TableOfContents></TableOfContents>

## Basic example

### With label

<Playground :markup="withLabel" :config="config"></Playground>

### Without label

<Playground :markup="withoutLabel" :config="config"></Playground>

### Responsive

<Playground :markup="responsive" :config="config"></Playground>

### ARIA attributes and states

Through the `aria` property you have the possibility to provide additional **ARIA** attributes and states to the component.
<Playground :markup="accessibility" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
* Make sure to provide **descriptive**, self explaining **labels** which could be understood without context. If short labels are used like **"OK"** make sure to provide additional textual contents to expose a more descriptive experience to screen reader users. This can be done through **ARIA** with the `aria` property or by using the **slotted** approach where you can set the `aria-label` attribute directly on the anchor tag.
* If implementing the Link Pure with a **hidden label** (`hide-label="true"`), do not omit the label. Providing a **descriptive text** to support **screen reader** users is **mandatory**.
* In general, preventing opening new windows by default with (`target="_blank"`) is a good choice. Let users choose by themselves how to open links. However, if you choose to implement `target="_blank"`, make sure to provide additional information with ARIA label, e.g.: `aria-label="Porsche Taycan model page (opens in new window)"`

---

### Without Icon

By choosing `icon="none"` the component is shown without icon.

The variant without icon is only recommended in the context of menus, where it is clearly evident that the component is clickable. If it is required in flowing text,
a native link within the `p-text` component can be used.  
See [text documentation](components/typography/text#text-with-a-link-button-and-bold-text-as-children).

**Caution:** You can't combine  this with the prop `hideLabel`

<Playground :markup="withoutIcon" :config="configInline"></Playground>

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

---

## Examples how to use with Framework specific router and "active state" support

### Angular

```html
<p-link-pure [active]="rla.isActive">
  <a routerLink="/path/to/heaven" routerLinkActive #rla="routerLinkActive"></a>
</p-link-pure>
```

### React

```tsx
<PLinkPure active={isActive}>
  <Link to="/path/to/heaven">Some label</Link>
</PLinkPure>
```

### VueJs

```html
<router-link :to="/path/to/heaven" v-slot="{ href, navigate, isActive }">
  <p-link-pure :href="href" @click="navigate" :active="isActive">Some label</p-link-pure>
</router-link>
```

## Link with specific icon

If another icon needs to be implemented, just replace the default icon with another predefined icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property. If you need to link to another icon hosted somewhere else, just set the whole icon path to the `iconSource` prop.

<Playground :markup="icon" :config="configInline"></Playground>

---

## Alignment

The `label` can be aligned to the `right` (default) or to the `left` of the icon.

<Playground :markup="alignmentMarkup" :config="config">
  <select v-model="alignLabel">
    <option value="left">Left</option>
    <option value="right">Right</option>
    <option value="{ base: 'left', l: 'right' }">Responsive</option>
  </select>
</Playground>

---

## Stretch

The `stretch` property extends the area between icon and label to the maximum available space.
It is recommended to use stretch only on `left` alignment and small viewports, e.g. mobile views.

<Playground :markup="stretchMarkup" :config="config">
  <select v-model="stretch">
    <option value='stretch="true" align-label="left"'>stretch true, align-label left</option>
    <option value='stretch="true" align-label="right"'>stretch true, align-label right</option>
    <option value='stretch="false" align-label="left"'>stretch false, align-label left</option>
    <option value='stretch="false" align-label="right"'>stretch false, align-label right</option>
    <option value='stretch="{ base: true, l: false }" align-label="left"'>Responsive</option>
  </select>
</Playground>

---

## Link Pure with custom clickable/focusable area

Sometimes it might be useful to enlarge the clickable/focusable area of a link to fulfill accessibility guidelines.
Therefore a custom padding can be set on the host element.

<Playground :markup="clickableArea" :config="configInline"></Playground>

---

## Bind events to the link

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the link.

<Playground :markup="events" :config="config"></Playground>

---

## Remove Link Pure from tab order

By setting the `tabindex` attribute to `-1` you can remove the **Link Pure** from the tab order.

<Playground :markup="taborder" :config="config"></Playground>

---

## Link Pure with Subline

If you need additional information on your link, we provide a `<p slot="subline" />`.
The size of the *subline* changes according to the size of the *label*. We do not support `size="inherit"`, `stretch` and `alignLabel`in this pattern so far.

**Note:** If you intend to use a `<a>` tag inside of the `p-link-pure` component, keep in mind that the slot needs to be *outside* of the anchor tag to function properly! Make sure to add an `aria-describedby` attribute to expose the correct accessibility tree.

<Playground :markup="subline" :config="configInline">
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
  config = { themeable: true };
  configInline = { ...this.config, spacing: 'inline' };
  
  size = 'medium';
  sublineSize = 'small';
  weight = 'thin';
  alignLabel = 'left';
  stretch = 'stretch="true" align-label="left"';
  
  withLabel =
`<p-link-pure href="https://www.porsche.com">Some label</p-link-pure>`;

  withoutLabel =
`<p-link-pure href="https://www.porsche.com" hide-label="true">Some label</p-link-pure>`;

  responsive =
`<p-link-pure href="https://www.porsche.com" hide-label="{ base: true, l: false }">Some label</p-link-pure>`;

  accessibility = 
`<p-link-pure href="https://www.porsche.com" aria="{ 'aria-label': 'Some more descriptive label' }">Some label</p-link-pure>`;

  withoutIcon =
`<p-link-pure icon="none" href="https://www.porsche.com">Some label</p-link-pure>
<p-link-pure icon="none" size="small" weight="semibold" href="https://www.porsche.com">
  Some label
  <p slot="subline">Some Subline</p>
</p-link-pure>`;

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
<p-link-pure style="padding: 1rem;">
  <a href="https://www.porsche.com">Some label</a>
</p-link-pure>
<p-link-pure hide-label="true" style="padding: 1rem;">
  <a href="https://www.porsche.com">Some label</a>
</p-link-pure>`;

  get alignmentMarkup() {
    return `<p-link-pure align-label="${this.alignLabel}" href="https://www.porsche.com">Some label</p-link-pure>`;
  };

  get stretchMarkup() {
    return `<p-link-pure ${this.stretch} href="https://www.porsche.com">Some label</p-link-pure>`;
  };

  events =
`<p-link-pure
  href="https://www.porsche.com"
  onclick="alert('click'); return false;"
  onfocus="console.log('focus')"
  onfocusin="console.log('focusin')"
  onblur="console.log('blur')"
  onfocusout="console.log('focusout')"
>Some label</p-link-pure>`;

  taborder =
`<p-link-pure href="https://www.porsche.com">Some label</p-link-pure>
<p-link-pure href="https://www.porsche.com" tabindex="-1">Some label</p-link-pure>
<p-link-pure href="https://www.porsche.com">Some label</p-link-pure>`;


  get subline() {
    return `<p-link-pure size="${this.sublineSize}" href="https://www.porsche.com">
  Some label
  <p slot="subline">Some Subline</p>
</p-link-pure>
<p-link-pure size="${this.sublineSize}" weight="semibold">
  <a href="https://www.porsche.com" aria-describedby="subline">Some label</a>
  <p slot="subline" id="subline">Some Subline</p>
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
