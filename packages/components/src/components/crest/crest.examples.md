# Crest

The `p-crest` gives the Porsche brand a distinctive look, sets it apart from others within the overall external image
and represents the quality of the product.

<Notification heading="Usage hint" state="error">
  This component shall only be used on viewports below 480px (breakpoint "S"). Otherwise, <a href="components/wordmark">p-wordmark</a> has to be used.
</Notification>

<TableOfContents></TableOfContents>

## Basic example

<Playground :markup="basicMarkup"></Playground>

## Link

The Porsche Crest will be rendered as `<a>`-tag as soon as an `href` is provided.

<Playground :markup="linkMarkup"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

If `p-crest` is used with a link, make sure to add a descriptive label to inform screen reader users what the link
stands for. This can be done through **ARIA** with the `aria` property.

## Bind events to the link

You can use native `click`, `focus`, `focusin`, `blur` and `focusout` events on the custom element.

<Playground :markup="eventsMarkup"></Playground>

---

## Custom clickable/focusable area

Sometimes it might be useful to enlarge the clickable/focusable area of the Porsche Crest. Therefore, a custom padding
can be set on the host element.

<Playground :markup="clickableAreaMarkup"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  basicMarkup = `<p-crest></p-crest>`;
  linkMarkup = `<p-crest href="https://www.porsche.com" aria="{ 'aria-label': 'Porsche Homepage' }"></p-crest>`;

  eventsMarkup =
`<p-crest
  href="https://www.porsche.com"
  onclick="alert('click'); return false;"
  onfocus="console.log('focus')"
  onfocusin="console.log('focusin')"
  onblur="console.log('blur')"
  onfocusout="console.log('focusout')"
></p-crest>`;

  clickableAreaMarkup = `<p-crest href="https://www.porsche.com" aria="{ 'aria-label': 'Porsche Homepage' }" style="padding: 16px"></p-crest>`;
}
</script>
