# Text

`p-text` is used to specify paragraph styling in documents.

<Notification heading="Recommendation" state="success">
  Although the component is very sophisticated, it's recommended (if possible) to use the corresponding styles / design tokens of
the "@porsche-design-system/components-{js|angular|react|vue}/styles" sub-package for best performance since way 
less DOM nodes are required to render. Further information can be found <a href="styles/typography">here</a>.
</Notification>

<TableOfContents></TableOfContents>

---

## Size

There are predefined fluid text sizes for the text component which should cover most use cases. If a specific text size
is needed, the size can be set to `inherit` to specify the text size from outside.

<Playground :markup="sizeMarkup" :config="config">
  <SelectOptions v-model="size" :values="sizes" name="size"></SelectOptions>
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

<Notification heading="Deprecation hint" state="warning">
  Following colors have been deprecated and will be removed with the next major release: "brand",
"default", "neutral-contrast-high", "neutral-contrast-medium", "neutral-contrast-low" and "notification-neutral".
</Notification>

<Playground :markup="colorMarkup" :config="config">
  <SelectOptions v-model="color" :values="colors" name="color"></SelectOptions>
</Playground>

---

## Weight

<Notification heading="Deprecation hint" state="warning">
  Following weight definitions have been deprecated and will be removed with the next major release: "thin" 
and "semibold".
</Notification>

<Playground :markup="weightMarkup" :config="config">
  <SelectOptions v-model="weight" :values="weights" name="weight"></SelectOptions>
</Playground>

---

## Alignment

<Playground :markup="alignMarkup" :config="config">
  <SelectOptions v-model="align" :values="aligns" name="align"></SelectOptions>
</Playground>

---

## Ellipsis mode

This will force any text to never wrap into a new line and in case it's too long for a single line then dots (…) at the
end are used to visualize it.

<Playground :markup="ellipsisMarkup" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { TEXT_SIZES } from './text-size';
import { TEXT_WEIGHTS, TEXT_WEIGHTS_DEPRECATED } from './text-weight';
import { TEXT_COLORS, TEXT_COLORS_DEPRECATED } from './text-color';
import { TYPOGRAPHY_ALIGNS, TYPOGRAPHY_ALIGNS_DEPRECATED } from '../../utils'; 

const sentence = 'The quick brown fox jumps over the lazy dog';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  size = 'small';
  sizes = TEXT_SIZES;
  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="font-size: 3rem;"' : '';
    return `<p-text size="${this.size}"${style}>${sentence}</p-text>`;
  }
  
  sizeResponsiveMarkup = `<p-text size="{ base: 'small', l: 'medium' }">${sentence}</p-text>`;

  semanticsMarkup = `<p-text tag="blockquote">${sentence}</p-text>
<p-text><blockquote>${sentence}</blockquote></p-text>`;

  color = 'primary';
  colors = TEXT_COLORS.map(item => TEXT_COLORS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get colorMarkup() {
    const style = this.color === 'inherit' ? ' style="color: deeppink;"' : '';
    return `<p-text color="${this.color}"${style}>${sentence}</p-text>`;
  }
  
  weight = 'bold';
  weights = TEXT_WEIGHTS.map(item => TEXT_WEIGHTS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get weightMarkup() {
    return `<p-text weight="${this.weight}">${sentence}</p-text>`;
  }
  
  align = 'center';
  aligns = TYPOGRAPHY_ALIGNS.map(item => TYPOGRAPHY_ALIGNS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get alignMarkup() {
    return `<p-text align="${this.align}">${sentence}</p-text>`;
  }

  ellipsisMarkup = `<p-text ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-text>`;
}
</script>
