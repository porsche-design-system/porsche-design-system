# Typography
Typography plays an important role for the general brand impression and is indispensable for the use in digital applications, not to say: Typography **is** the interface. Typography enables meaningful information with well structured hierarchy and is therefore one of the most important elements to provide user guidance.

<TableOfContents></TableOfContents>

## Text

**Text component** for predefined copy text sizes which are either fixed or can respond to different viewports.

## Default

The text component is the most flexible way to display text strings on your page.  
Rendering defaults to variant `small` and font weight `regular`.  
The default semantic HTML element renders as a `p` tag, but you can change it to your needs (see chapter "Semantics").

<Playground :markup="basic" :config="config"></Playground>

--- 

## Size

There are predefined default text sizes for the text component which should cover most use cases. 
If a specific text size is needed, the size can be set to `inherit` to specify the text size from outside.

**Hint:** Be aware of that the line-height will be calculated based on the Porsche type-scaling formula automatically. This is the case for predefined text sizes as well as for `inherit` mode.

<Playground :markup="sizeMarkup" :config="config">
  <select v-model="size">
    <option disabled>Select a size</option>
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

<Playground :markup="responsive" :config="config"></Playground>

--- 

## Semantics

To provide more contextual HTML semantics you can either pass them with the `tag` property or directly inside a slot.

<Playground :markup="semantics" :config="config"></Playground>

--- 

## Color
Predefined colors associated with its theme are available but also inherit mode can be used to define a custom color.

<Playground :markup="colorMarkup" :config="config">
  <select v-model="color">
    <option disabled>Select a color</option>
    <option value="brand">Brand</option>
    <option value="default">Default</option>
    <option value="neutral-contrast-high">Neutral Contrast High</option>
    <option value="neutral-contrast-medium">Neutral Contrast Medium</option>
    <option value="neutral-contrast-low">Neutral Contrast Low</option>
    <option value="notification-success">Notification Success</option>
    <option value="notification-warning">Notification Warning</option>
    <option value="notification-error">Notification Error</option>
    <option value="notification-neutral">Notification Neutral</option>
    <option value="inherit">Inherit</option>
  </select>
</Playground>

--- 

## Weight

There are predefined default text weights for copy text. Be aware of using the `thin` variant only with larger text sizes.

<Playground :markup="weightMarkup" :config="config">
  <select v-model="weight">
    <option disabled>Select a weight</option>
    <option value="thin">Thin</option>
    <option value="regular">Regular</option>
    <option value="semibold">Semibold</option>
    <option value="bold">Bold</option>
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
This will force any text to never wrap into a new line and in case it's to long for a single line then dots (…) at the end are used to visualize it.

<Playground :markup="ellipsis" :config="config"></Playground>

---

## Text with a link, button and bold text as children

<Playground :markup="textWithLink" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const sentence = 'The quick brown fox jumps over the lazy dog';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  size = 'medium';
  weight = 'thin';
  color = 'default';
  align = 'center';
  
  basic =
`<p-text>${sentence}</p-text>`;
    
  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="font-size: 48px;"' : '';
    return `<p-text size="${this.size}"${style}>${sentence}</p-text>`;
  }
  
  responsive =
`<p-text size="{ base: 'small', l: 'medium' }">${sentence}</p-text>`;

  semantics =
`<p-text tag="blockquote">${sentence}</p-text>
<p-text><blockquote>${sentence}</blockquote></p-text>`;

  get colorMarkup() {
    const style = this.color === 'inherit' ? ' style="color: deeppink;"' : '';
    return `<p-text color="${this.color}"${style}>${sentence}</p-text>`;
  }
  
  get weightMarkup() {
    return `<p-text size="medium" weight="${this.weight}">${sentence}</p-text>`;
  }
  
  get alignment() {
    return `<p-text align="${this.align}">${sentence}</p-text>`;
  }

  ellipsis =
`<p-text ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-text>`;

  textWithLink =
`<p-text>Lorem ipsum dolor sit amet <a href="https://porsche.com">linked text</a> et <button>button text</button>, <b>bold text</b> & <strong>strong text</strong></p-text>`;
}
</script>