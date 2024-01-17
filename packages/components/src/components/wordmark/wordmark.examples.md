<ComponentHeading name="Wordmark"></ComponentHeading>

The `p-wordmark` gives the Porsche brand a distinctive look, sets it apart from others within the overall external image
and represents the quality of the product.

<TableOfContents></TableOfContents>

## Size

By default, the sizing is fluid, which can be changed to the following values.

<Playground :markup="sizeMarkup" :config="config">
  <PlaygroundSelect v-model="size" :values="sizes" name="size"></PlaygroundSelect>
</Playground>

---

## Link

The `p-wordmark` will be rendered as `<a>`-tag as soon as an `href` is provided.

<Playground :markup="linkMarkup" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

If the `p-wordmark` is used with a link, make sure to add a descriptive label to inform screen reader users what the
link stands for. This can be done through **ARIA** with the `aria` property.

---

## Bind events to the link

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the custom element.

<Playground :markup="eventsMarkup" :config="config"></Playground>

---

## Custom clickable/focusable area

Sometimes it might be useful to enlarge the clickable/focusable area of the `p-wordmark`. Therefore a custom padding can
be set on the host element.

<Playground :markup="clickableAreaMarkup" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { WORDMARK_SIZES } from './wordmark-utils';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  basicMarkup = `<p-wordmark></p-wordmark>`;
  linkMarkup = `<p-wordmark href="https://www.porsche.com" aria="{ 'aria-label': 'Porsche Homepage' }"></p-wordmark>`;

  size = 'small';
  sizes = WORDMARK_SIZES;
  get sizeMarkup() {
    const style = this.size === 'inherit' ? ' style="height: 20px"' : '';
    return `<p-wordmark size="${this.size}"${style}></p-wordmark>`;
  }

  eventsMarkup =
`<p-wordmark
  href="https://www.porsche.com"
  onclick="alert('click'); return false;"
  onfocus="console.log('focus')"
  onfocusin="console.log('focusin')"
  onblur="console.log('blur')"
  onfocusout="console.log('focusout')"
  aria="{ 'aria-label': 'Porsche Homepage' }"
></p-wordmark>`;

  clickableAreaMarkup = `<p-wordmark href="https://www.porsche.com" aria="{ 'aria-label': 'Porsche Homepage' }" style="padding: 1.5rem"></p-wordmark>`;
}
</script>
