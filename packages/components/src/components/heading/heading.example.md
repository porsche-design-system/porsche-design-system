# Typography

<TableOfContents></TableOfContents>

## Heading

`p-heading` is used to highlight and specify heading styling and hierarchy in documents.

---

## Size

There are predefined fluid text sizes for the component which should cover most use cases. If a specific text size is
needed, the size can be set to `inherit` to specify the text size from outside.

<Playground :markup="sizeMarkup" :config="config">
  <select v-model="size" aria-label="Select size">
    <option disabled>Select size</option>
    <option>small</option>
    <option>medium</option>
    <option>large</option>
    <option>x-large</option>
    <option>xx-large</option>
    <option>xxx-large</option>
    <option>inherit</option>
  </select>
</Playground>

### Responsive

<Playground :markup="sizeResponsiveMarkup" :config="config"></Playground>

---

## Semantics

To provide more contextual HTML semantics you can either pass them with the `tag` property or directly inside a slot.

<Playground :markup="semanticsMarkup" :config="config"></Playground>

---

## Color

Predefined colors associated with its theme are available but also inherit mode can be used to define a custom color.

<Playground :markup="colorMarkup" :config="config">
  <select v-model="color" aria-label="Select color">
    <option disabled>Select color</option>
    <option value="primary">Primary</option>
    <option value="inherit">Inherit</option>
  </select>
</Playground>

---

## Alignment

<Playground :markup="alignmentMarkup" :config="config">
  <select v-model="align" aria-label="Select alignment">
    <option disabled>Select alignment</option>
    <option value="left">Left</option>
    <option value="center">Center</option>
    <option value="right">Right</option>
  </select>
</Playground>

---

## Ellipsis mode

This will force any text to never wrap into a new line and in case it's too long for a single line then dots (…) at the
end are used to visualize it.

<Playground :markup="ellipsisMarkup" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const sentence = 'The quick brown fox jumps over the lazy dog';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  size = 'large';
  color = 'primary';
  align = 'center';
    
  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="font-size: 5rem;"' : '';
    return `<p-heading tag="h3" size="${this.size}"${style}>${sentence}</p-heading>`;
  }
  
  get sizeResponsiveMarkup() {
    return `<p-heading tag="h3" size="{ base: 'medium', l: 'large' }">${sentence}</p-heading>`;
  }

  get semanticsMarkup() {
    return `<p-heading tag="h3">${sentence}</p-heading>
<p-heading><h3>${sentence}</h3></p-heading>`;
  }

  get colorMarkup() {
    const style = this.color === 'inherit' ? ' style="color: deeppink;"' : '';
    return `<p-heading tag="h3" color="${this.color}"${style}>${sentence}</p-heading>`;
  }
  
  get alignmentMarkup() {
    return `<p-heading tag="h3" align="${this.align}">${sentence}</p-heading>`;
  }

  get ellipsisMarkup() {
    return `<p-heading tag="h3" ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-heading>`;
  }
}
</script>
