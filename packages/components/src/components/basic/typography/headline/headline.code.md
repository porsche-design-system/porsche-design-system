# Typography

## Headline

**Headline component** to specify headline styling and hierarchy in documents.

## Variant
Variants for predefined headlines and automated responsive sizing to fit into all major breakpoints.
There are multiple predefined styling variants available. Default semantic tag hierarchy equals to headline type (e.g. `headline-1` or `large-title` is compiled to `<h1>` and `headline-3` is compiled to `<h3>`).

<Playground :markup="variant" :config="config"></Playground>

---

## Size
If one of the predefined **variants** doesn't match your layout you could also pass a custom `size` property to have more control of your headline sizes in conjunction with responsive layouts.

**Hint:** You always have to keep an eye on the semantic of your HTML tags. Per default an `h2`-tag is rendered. Regarding of your semantic page structure you need to set a corresponding headline tag via the `tag` property. 

<Playground :markup="sizeMarkup" :config="config">
  <select @change="size = $event.target.value">
    <option disabled>Select a size</option>
    <option>x-small</option>
    <option>small</option>
    <option selected>medium</option>
    <option>large</option>
    <option>x-large</option>
    <option>inherit</option>
  </select>
</Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :markup="responsive" :config="config"></Playground>

---

## Custom tag hierarchy
If a custom tag hierarchy is needed, individual headline tags can be set from `h1` to `h6` either by referencing the corresponding `tag` property or setting the HTML headline tags directly as slots. 

<Playground :markup="customTagHierarchy" :config="config"></Playground>

---

## Color
A predefined default color associated with its theme is available but also inherit mode can be used to define a custom color.

<Playground :markup="colorMarkup" :config="config">
  <select @change="color = $event.target.value">
    <option disabled>Select a color</option>
    <option value="default" selected>Default</option>
    <option value="inherit">Inherit</option>
  </select>
</Playground>

---

## Alignment

<Playground :markup="alignment" :config="config">
  <select @change="align = $event.target.value">
    <option disabled>Select an alignment</option>
    <option value="left">Left</option>
    <option value="center" selected>Center</option>
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
  
  const sentence = 'The quick brown fox jumps over the lazy dog';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };
    
    size = 'medium';
    color = 'default';
    align = 'center';
    
    variant =
`<p-headline variant="large-title">${sentence}</p-headline>
<p-headline variant="headline-1">${sentence}</p-headline>
<p-headline variant="headline-2">${sentence}</p-headline>
<p-headline variant="headline-3">${sentence}</p-headline>
<p-headline variant="headline-4">${sentence}</p-headline>
<p-headline variant="headline-5">${sentence}</p-headline>`;

get sizeMarkup() {
      const style = this.size === 'inherit' ? ' style="font-size: 48px;"' : '';
      return `<p-headline size="${this.size}"${style}>${sentence}</p-headline>`;
    }

    responsive =
`<p-headline size="{ base: 'small', l: 'medium' }">${sentence}</p-headline>`;

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