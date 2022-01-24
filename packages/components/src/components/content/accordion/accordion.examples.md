# Accordion

The `p-accordion` is a component that reveals or hides associated sections of content.  
Accordions are flexible in the context and can include other components of the Porsche Design System.

It is a controlled component.
This means it does not contain any internal state, and you got full control over its behavior.

<p-inline-notification heading="Important note" state="warning" persistent="true">
  This component uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver" target="_blank">ResizeObserver</a> API internally which isn't available in all browsers.<br>
  If your browser does not support the ResizeObserver, a fallback is used, which might be not as performant.<br>
  See <a href="https://caniuse.com/resizeobserver" target="_blank">caniuse.com</a> for more details on browser support.  
</p-inline-notification>

<TableOfContents></TableOfContents>

## Basic example

<Playground :frameworkMarkup="codeExample" :config="config" :markup="basic"></Playground>

The accordion width is 100% of the parent container.
We do strongly advise you to not use the full display width, as this will quickly result in a loss of context.
Parent containers with a maximum width of `800px` are recommended.

### Headline Tag

The `tag` property needs to be set in order for the accordion to fit into the outline of the page. If there is no `tag` property provided, it defaults to `h2`.
For instance our example accordions use heading level 3 because they are contained in sections titled with a level 2 heading.

---

## Size

<Playground :markup="sizeMarkup" :config="config">
  <select v-model="size">
    <option disabled>Select size</option>
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="responsive">Responsive</option>
  </select>
</Playground>

---

## Slotted heading
Sometimes it's useful to be able to render markup for `heading`. Therefore, a named slot can be used. Make sure **not** to define
the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).

Please **refrain** from using any other than text content as slotted markup.

<Playground :markup="slottedMarkup" :config="config"></Playground>

---

## Compact

By setting `compact` to `true` you can have a more compact accordion.
It removes the borders and reduces the spacings.

Be aware, that the `size` property will be ignored when `compact` is set to `true`.
We recommend using the property in case you need a side-navigation with an accordion like behavior.

<Playground :markup="compactMarkup" :config="config"></Playground>

---

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getAccordionCodeSamples } from '@porsche-design-system/shared';
  
@Component
export default class Code extends Vue {
  config = { themeable: true };

  codeExample = getAccordionCodeSamples();

  size = 'small';
  content= `<p-text>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </p-text>`;
    
  get basic() {      
    return `<p-accordion heading="Some Heading" tag="h3">
  ${this.content}
</p-accordion>
<p-accordion heading="Some Heading" tag="h3">
  ${this.content}
</p-accordion>`;
    }
  
  get sizeMarkup() {
    const size = this.size  === 'responsive' ? "{ base: 'small', l: 'medium' }": this.size;
    return `<p-accordion heading="Some Heading" tag="h3" size="${size}">
  ${this.content}
</p-accordion>
<p-accordion heading="Some Heading" tag="h3" size="${size}">
  ${this.content}
</p-accordion>`;
    }  

  get slottedMarkup(){
    return `<p-accordion tag="h3">
  <span slot="heading">Some slotted heading</span>
  ${this.content}
</p-accordion>
<p-accordion tag="h3">
  <span slot="heading">Some slotted heading</span>
  ${this.content}
</p-accordion>`;
    }

  get compactMarkup() {      
    return `<div style="max-width: 400px">
  <p-accordion heading="Some Heading" tag="h3" compact="true">
    <p-link-pure href="https://www.porsche.com" icon="none">Some label</p-link-pure>
  </p-accordion>
  <p-accordion heading="Some Heading" tag="h3" compact="true">
    <p-link-pure href="https://www.porsche.com" icon="none">Some label</p-link-pure>
  </p-accordion>
</div>`;
    }
 
  mounted() {
    /* initially update accordion with open attribute in playground */
    this.registerEvents();
  
    /* theme switch needs to register event listeners again */
    const themeTabs = this.$el.querySelectorAll('.playground > p-tabs-bar');
    themeTabs.forEach(tab => tab.addEventListener('tabChange', () => {
      this.registerEvents();
    }));
  }
  
  updated(){
    this.registerEvents();
  }
  
  registerEvents() {
    const accordions = this.$el.querySelectorAll('.playground .demo p-accordion');
    accordions.forEach(accordionEl => accordionEl.addEventListener('accordionChange', (e) => (e.target.open = e.detail.open)));
  }
}
</script>
