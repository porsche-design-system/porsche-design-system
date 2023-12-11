# Headline

`p-headline` is used to highlight and specify heading styling and hierarchy in documents.

<Notification heading="Deprecation hint" state="error">
  This component is deprecated and will be removed with the next major release.
  Please use <a href="components/heading">p-heading</a> instead.
</Notification>

<TableOfContents></TableOfContents>

---

## Variant

There are predefined fluid text sizes for the component which should cover most use cases. If a specific text size is
needed, the size can be set to `inherit` to specify the text size from outside.

<Playground :markup="variant" :config="config"></Playground>

## Responsive

<Playground :markup="customVariantMarkup" :config="config">
  <PlaygroundSelect v-model="customVariant" :values="customVariants" name="customVariant"></PlaygroundSelect>
</Playground>

---

## Custom tag hierarchy

To provide more contextual HTML semantics you can either pass them with the `tag` property or directly inside a slot.

<Playground :markup="customTagHierarchy" :config="config"></Playground>

---

## Color

Predefined colors associated with its theme are available but also inherit mode can be used to define a custom color.

<Playground :markup="colorMarkup" :config="config">
  <PlaygroundSelect v-model="color" :values="colors" name="color"></PlaygroundSelect>
</Playground>

---

## Alignment

<Notification heading="Deprecation hint" state="warning">
  Following alignments have been deprecated and will be removed with the next major release: "left" and "right".
</Notification>

<Playground :markup="alignMarkup" :config="config">
  <PlaygroundSelect v-model="align" :values="aligns" name="align"></PlaygroundSelect>
</Playground>

---

## Ellipsis mode

This will force any text to never wrap into a new line and in case it's too long for a single line then dots (…) at the
end are used to visualize it.

<Playground :markup="ellipsisMode" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { HEADLINE_COLORS, HEADLINE_VARIANTS } from './headline-utils';
import { TYPOGRAPHY_ALIGNS, TYPOGRAPHY_ALIGNS_DEPRECATED } from '../../utils';

const sentence = 'The quick brown fox jumps over the lazy dog';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  variant = HEADLINE_VARIANTS.map((item) => `<p-headline variant="${item}">${sentence}</p-headline>`).join('\n');

  customVariant = "{ base: 'small', l: 'medium' }";
  customVariants = ["{ base: 'small', l: 'medium' }", 'inherit'];
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

  color = 'default';
  colors = HEADLINE_COLORS;
  get colorMarkup() {
    const style = this.color === 'inherit' ? ' style="color: deeppink;"' : '';
    return `<p-headline variant="headline-3" color="${this.color}"${style}>${sentence}</p-headline>`
  }

  align = 'center';
  aligns = TYPOGRAPHY_ALIGNS.map(item => TYPOGRAPHY_ALIGNS_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get alignMarkup() {
    return `<p-headline variant="headline-3" align="${this.align}">${sentence}</p-headline>`;
  }

  ellipsisMode =
`<p-headline variant="headline-3" ellipsis="true">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p-headline>`;
}
</script>
