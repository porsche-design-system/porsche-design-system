<ComponentHeading name="Display"></ComponentHeading>

`p-display` is used to highlight and specify heading styling and hierarchy in documents.

<Notification heading="Recommendation" state="success">
  Although the component is very sophisticated, it's recommended (if possible) to use the corresponding styles / design tokens of
the "@porsche-design-system/components-{js|angular|react|vue}/styles" sub-package for best performance since way 
less DOM nodes are required to render. Further information can be found <a href="styles/typography">here</a>.
</Notification>

<TableOfContents></TableOfContents>

---

## Size

There are predefined fluid text sizes for the component which should cover most use cases. If a specific text size is
needed, the size can be set to `inherit` to specify the text size from outside.

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

<Playground :markup="colorMarkup" :config="config">
  <SelectOptions v-model="color" :values="colors" name="color"></SelectOptions>
</Playground>

---

## Alignment

<Notification heading="Deprecation hint" state="warning">
  Following alignments have been deprecated and will be removed with the next major release: "left" and "right".
</Notification>

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
import { DISPLAY_COLORS, DISPLAY_SIZES } from './display-utils';
import { TYPOGRAPHY_ALIGNS, TYPOGRAPHY_ALIGNS_DEPRECATED } from '../../utils';

const sentence = 'The quick brown fox jumps over the lazy dog';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  size = 'large';
  sizes = DISPLAY_SIZES;
  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="font-size: 5rem;"' : '';
    return `<p-display tag="h3" size="${this.size}"${style}>${sentence}</p-display>`;
  }
  
  get sizeResponsiveMarkup() {
    return `<p-display tag="h3" size="{ base: 'medium', l: 'large' }">${sentence}</p-display>`;
  }

  get semanticsMarkup() {
    return `<p-display tag="h3">${sentence}</p-display>
<p-display><h3>${sentence}</h3></p-display>`;
  }

  color = 'primary';
  colors = DISPLAY_COLORS;
  get colorMarkup() {
    const style = this.color === 'inherit' ? ' style="color: deeppink;"' : '';
    return `<p-display tag="h3" color="${this.color}"${style}>${sentence}</p-display>`;
  }
  
  align = 'center';
  aligns = TYPOGRAPHY_ALIGNS.map(item => TYPOGRAPHY_ALIGNS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get alignMarkup() {
    return `<p-display tag="h3" align="${this.align}">${sentence}</p-display>`;
  }

  get ellipsisMarkup() {
    return `<p-display tag="h3" ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-display>`;
  }
}
</script>
