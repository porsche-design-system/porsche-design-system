# Text

<TableOfContents></TableOfContents>

## Text

`p-text` is used to specify paragraph styling in documents.

---

## Size

There are predefined fluid text sizes for the text component which should cover most use cases. If a specific text size
is needed, the size can be set to `inherit` to specify the text size from outside.

<Playground :markup="sizeMarkup" :config="config">
  <select v-model="size" aria-label="Select size">
    <option disabled>Select size</option>
    <option>x-small</option>
    <option>small</option>
    <option>medium</option>
    <option>large</option>
    <option>x-large</option>
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

<p-inline-notification heading="Deprecation hint" state="warning" persistent="true">
Following colors have been deprecated and will be removed with the next major release: "brand",
"default", "neutral-contrast-high", "neutral-contrast-medium", "neutral-contrast-low" and "notification-neutral".
</p-inline-notification>

<Playground :markup="colorMarkup" :config="config">
  <select v-model="color" aria-label="Select color">
    <option disabled>Select color</option>
    <option value="primary">Primary</option>
    <option value="brand">Brand (deprecated)</option>
    <option value="default">Default (deprecated)</option>
    <option value="contrast-high">Contrast High</option>
    <option value="neutral-contrast-high">Neutral Contrast High (deprecated)</option>
    <option value="contrast-medium">Neutral Contrast Medium</option>
    <option value="neutral-contrast-medium">Neutral Contrast Medium (deprecated)</option>
    <option value="contrast-low">Contrast Low</option>
    <option value="neutral-contrast-low">Neutral Contrast Low (deprecated)</option>
    <option value="notification-success">Notification Success</option>
    <option value="notification-warning">Notification Warning</option>
    <option value="notification-error">Notification Error</option>
    <option value="notification-info">Notification Info</option>
    <option value="notification-neutral">Notification Neutral (deprecated)</option>
    <option value="inherit">Inherit</option>
  </select>
</Playground>

---

## Weight

<p-inline-notification heading="Deprecation hint" state="warning" persistent="true">
Following weight definitions have been deprecated and will be removed with the next major release: "thin" 
and "semibold".
</p-inline-notification>

<Playground :markup="weightMarkup" :config="config">
  <select v-model="weight" aria-label="Select weight">
    <option disabled>Select weight</option>
    <option value="thin">Thin (deprecated)</option>
    <option value="regular">Regular</option>
    <option value="semi-bold">Semi Bold</option>
    <option value="semibold">Semibold (deprecated)</option>
    <option value="bold">Bold</option>
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

This will force any text to never wrap into a new line and in case it's to long for a single line then dots (…) at the
end are used to visualize it.

<Playground :markup="ellipsisMarkup" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const sentence = 'The quick brown fox jumps over the lazy dog';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  size = 'small';
  weight = 'bold';
  color = 'primary';
  align = 'center';
    
  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="font-size: 3rem;"' : '';
    return `<p-text size="${this.size}"${style}>${sentence}</p-text>`;
  }
  
  get sizeResponsiveMarkup() {
    return `<p-text size="{ base: 'small', l: 'medium' }">${sentence}</p-text>`;
  }

  get semanticsMarkup() {
    return `<p-text tag="blockquote">${sentence}</p-text>
<p-text><blockquote>${sentence}</blockquote></p-text>`;
  }

  get colorMarkup() {
    const style = this.color === 'inherit' ? ' style="color: deeppink;"' : '';
    return `<p-text color="${this.color}"${style}>${sentence}</p-text>`;
  }
  
  get weightMarkup() {
    return `<p-text weight="${this.weight}">${sentence}</p-text>`;
  }
  
  get alignmentMarkup() {
    return `<p-text align="${this.align}">${sentence}</p-text>`;
  }

  get ellipsisMarkup() {
    return `<p-text ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-text>`;
  }
}
</script>
