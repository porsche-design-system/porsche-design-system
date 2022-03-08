# Marque

The `p-marque` gives the Porsche brand a distinctive look, sets it apart from others within the overall external image and represents the quality of the product. 

<TableOfContents></TableOfContents>

## Variants

### Marque with registered trademark (®)
In web applications for the United States and/or Canada as well as with international purpose *including* United States and/or Canada, the Porsche marque must always be used with the ®. The ® is optimized to match the respective crest size.

<Playground :markup="marqueWithTM"></Playground>

### Marque without registered trademark (®)
This variant is to be used whenever the United States and/or Canada are not part of the web application's target markets.
<Playground :markup="marqueWithoutTM"></Playground>

## Link

The Porsche marque will be rendered as `<a>`-tag as soon as an `href` is provided.

<Playground :markup="marqueWithTMAndLink"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
If the Marque is used with a link, make sure to add a descriptive label to inform screen reader users what the link stands for. This can be done through **ARIA** with the `aria` property.

## Bind events to the link

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the custom element.

<Playground :markup="eventsMarkup"></Playground>

---

## Size

By default, the sizing is responsive, but can be changed to a static size when needed.

<Playground :markup="sizeMarkup">
  <select v-model="size" aria-label="Select size">
    <option disabled>Select size</option>
    <option value="responsive">Responsive</option>
    <option value="small">Small</option>
    <option value="medium">Medium</option>
  </select>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  size = 'small';

  marqueWithTM = `<p-marque></p-marque>`;
  marqueWithTMAndLink = `<p-marque href="https://www.porsche.com" aria="{ 'aria-label': 'Porsche Homepage' }"></p-marque>`;
  marqueWithoutTM = `<p-marque trademark="false"></p-marque>`;

  get sizeMarkup() {
    return `<p-marque size="${this.size}"></p-marque>`;
  }

  eventsMarkup =
`<p-marque
  href="https://www.porsche.com"
  onclick="alert('click'); return false;"
  onfocus="console.log('focus')"
  onfocusin="console.log('focusin')"
  onblur="console.log('blur')"
  onfocusout="console.log('focusout')"
></p-marque>`;
}
</script>
