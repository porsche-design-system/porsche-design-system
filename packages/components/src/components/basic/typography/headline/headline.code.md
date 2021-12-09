# Typography

<TableOfContents></TableOfContents>

## Headline

**Headline component** to specify headline styling and hierarchy in documents.

## Variant
Variants for predefined headlines and automated responsive sizing to fit into all major breakpoints. 
There are multiple predefined styling variants available. 

<Playground :markup="variant" :config="config"></Playground>

### Default Tags
Default rendered semantic tag hierarchy equals to headline variant.

**Note**: You always have to take care of the **semantic structure** of your HTML tags. This is very important for **SEO** and **Accessibility**.
Regarding of your **page structure** you need to set a **corresponding headline tag** via the `tag` property. This means, that a headline can look like an `h1` but doesn't need to be an `h1` in the document (see also section "**Custom tag hierarchy**").

| Headline Variant | Rendered HTML Tag |
| ---------------- | ----------------- |
| `large-title`    | `<h1>`            |
| `headline-1`     | `<h1>`            |
| `headline-2`     | `<h2>`            |
| `headline-3`     | `<h3>`            |
| `headline-4`     | `<h4>`            |
| `headline-5`     | `<h5>`            |

## Custom Variant
If you need more control over sizing and responsiveness, you can use predefined text sizes on different major breakpoints `xs`, `s`, `m`, `l`, `xl` or `inherit` mode.

**Hint:** When using `inherit` you have to take the **[typeScale](components/typography/usage)** values in account.

**Note:** If you choose a custom responsive size, you have to take care of your **semantic tag hierarchy**. It defaults to `h1` for every combination.

<Playground :markup="customVariantMarkup" :config="config">
 <select v-model="customVariant">
    <option disabled>Select an custom variant</option>
    <option value="{ base: 'small', l: 'medium' }">Custom Breakpoints</option>
    <option value="inherit">Inherit</option>
  </select>
</Playground>

---

## Custom tag hierarchy
If a custom tag hierarchy is needed, **individual headline tags** can be set from `h1` to `h6` either by referencing the corresponding `tag` property or setting the HTML headline tags directly as slots. 

<Playground :markup="customTagHierarchy" :config="config"></Playground>

---

## Color
A predefined default color associated with its theme is available but also inherit mode can be used to define a custom color.

<Playground :markup="colorMarkup" :config="config">
  <select v-model="color">
    <option disabled>Select a color</option>
    <option value="default">Default</option>
    <option value="inherit">Inherit</option>
  </select>
</Playground>

---

## Alignment

<Playground :markup="alignment" :config="config">
  <select v-model="align">
    <option disabled>Select an alignment</option>
    <option value="left">Left</option>
    <option value="center">Center</option>
    <option value="right">Right</option>
  </select>
</Playground>

---

## Ellipsis mode
This will force any text to never wrap into a new line and in case it's too long for a single line then dots (…) at the end are used to visualize it.

<Playground :markup="ellipsisMode" :config="config"></Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {HEADLINE_VARIANTS} from './headline-utils';
  
  const sentence = 'The quick brown fox jumps over the lazy dog';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };

    customVariant = "{ base: 'small', l: 'medium' }";
    color = 'default';
    align = 'center';

    variant = HEADLINE_VARIANTS.map((item) => `<p-headline variant="${item}">${sentence}</p-headline>`).join('\n');

    get customVariantMarkup() {
      const style = this.customVariant === 'inherit' ? ' style="font-size: 3.75rem;"' : '';
      return `<p-headline variant="${this.customVariant}"${style}>${sentence}</p-headline>`;
    }

    customTagHierarchy =
`<p-headline variant="headline-1" tag="h3">${sentence}</p-headline>
<p-headline variant="headline-3" tag="h1">${sentence}</p-headline>
<p-headline variant="headline-1">
  <h3>${sentence}</h3>
</p-headline>
<p-headline variant="headline-3">
  <h1>${sentence}</h1>
</p-headline>`;

    get colorMarkup() {
      const style = this.color === 'inherit' ? ' style="color: deeppink;"' : '';
      return `<p-headline variant="headline-3" color="${this.color}"${style}>${sentence}</p-headline>`
    }
 
    get alignment() {
      return `<p-headline variant="headline-3" align="${this.align}">${sentence}</p-headline>`;
    }
    
    ellipsisMode =
`<p-headline variant="headline-3" ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-headline>`;
  }
</script>