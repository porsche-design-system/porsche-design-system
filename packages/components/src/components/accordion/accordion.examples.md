<ComponentHeading name="Accordion"></ComponentHeading>

The `p-accordion` is a component that reveals or hides associated sections of content.  
Accordions are flexible in the context and can include other components of the Porsche Design System.

It is an optionally controlled component. This means it does contain internal state, which allows for out-of-the-box open/close functionality. Using the `open` prop and `update` event also expose full control over its behavior.

<TableOfContents></TableOfContents>

## Basic example

<Notification heading="Deprecation hint" heading-tag="h3" state="warning">
  The <code>accordionChange</code> event has been deprecated and will be removed with the next major release.<br>
  Please use the <code>update</code> event instead.
</Notification>

<Playground :frameworkMarkup="codeExample" :config="config" :markup="basic"></Playground>

The accordion width is 100% of the parent container. We do strongly advise you to not use the full display width, as
this will quickly result in a loss of context. Parent containers with a maximum width of `800px` are recommended.

### <A11yIcon></A11yIcon> Accessibility hints

The `heading-tag` property needs to be set in order for the accordion to fit into the outline of the page. If there is
no `heading-tag` property provided, it defaults to `h2`. For instance some of our example accordions use heading **level
3** because they are contained in sections titled with a **level 2** heading.

---

## Sticky headline

The headline can be made sticky by adding the property `sticky` to the `p-accordion` tag.

### Custom styling

The top value can be overwritten by CSS Custom Properties (aka CSS Variables):

```scss
// default CSS variable
--p-accordion-position-sticky-top: 0;

// overwrite with CSS variable
p-accordion {
  --p-accordion-position-sticky-top: 50px;
}
```

---

## Size

<Playground :markup="sizeMarkup" :config="config">
  <PlaygroundSelect v-model="size" :values="sizes" name="size"></PlaygroundSelect>
</Playground>

---

## Slotted heading

Sometimes it's useful to be able to render markup for `heading`. Therefore, a named slot can be used. Make sure **not**
to define the corresponding property on the host element when a named slot is used (because a property definition is
preferred over a named slot).

Please **refrain** from using any other than text content as slotted markup.

<Playground :markup="slottedMarkup" :config="config"></Playground>

---

## Compact

By setting `compact` to `true` you can have a more compact accordion. It removes the borders and reduces the spacings.

<Playground :markup="compactMarkup" :config="config"></Playground>

---

## Compact with custom clickable/focusable area

Sometimes it might be useful to enlarge the clickable/focusable area to fulfill accessibility guidelines. Therefore a
custom padding can be set on the heading slot element in `compact` variant.

<Playground :markup="clickableAreaMarkup" :config="config"></Playground>

---

<script lang="ts">import Vue from 'vue';
import Component from 'vue-class-component';
import {getAccordionCodeSamples} from '@porsche-design-system/shared';
import {ACCORDION_SIZES} from './accordion-utils'; 
  
@Component
export default class Code extends Vue {
  config = { themeable: true };

  codeExample = getAccordionCodeSamples();

  content= `<p-text>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </p-text>`;
    
  get basic() {      
    return `<p-accordion heading="Some Heading" heading-tag="h3">
  ${this.content}
</p-accordion>
<p-accordion heading="Some Heading" heading-tag="h3">
  ${this.content}
</p-accordion>`;
    }
  
  size = 'small';
  sizes = [...ACCORDION_SIZES, '{ base: \'small\', l: \'medium\' }'];
  get sizeMarkup() {
    return `<p-accordion heading="Some Heading" heading-tag="h3" size="${this.size}">
  ${this.content}
</p-accordion>
<p-accordion heading="Some Heading" heading-tag="h3" size="${this.size}">
  ${this.content}
</p-accordion>`;
  }

  get slottedMarkup(){
    return `<p-accordion heading-tag="h3">
  <span slot="heading">Some slotted heading</span>
  ${this.content}
</p-accordion>
<p-accordion heading-tag="h3">
  <span slot="heading">Some slotted heading</span>
  ${this.content}
</p-accordion>`;
  }

  get compactMarkup(){
    return `<div style="max-width: 400px">
  <p-accordion heading="Some Heading" heading-tag="h3" compact="true">
    <p-link-pure href="https://porsche.com" icon="none">Some label</p-link-pure>
  </p-accordion>
  <p-accordion heading="Some Heading" heading-tag="h3" compact="true">
    <p-link-pure href="https://porsche.com" icon="none">Some label</p-link-pure>
  </p-accordion>
</div>`;
  }

  get clickableAreaMarkup(){
    return `<div style="max-width: 400px">
  <p-accordion heading-tag="h3" compact="true">
    <span slot="heading" style="padding: 1rem;">Some slotted heading</span>
    <p-link-pure href="https://porsche.com" icon="none" style="padding: 1rem;">Some label</p-link-pure>
  </p-accordion>
  <p-accordion heading-tag="h3" compact="true">
    <span slot="heading" style="padding: 1rem;">Some slotted heading</span>
    <p-link-pure href="https://porsche.com" icon="none" style="padding: 1rem;">Some label</p-link-pure>
  </p-accordion>
</div>`;
  }
 
  mounted() {
    /* initially update accordion with open attribute in playground */
    this.registerEvents();
  
    /* theme switch needs to register event listeners again */
    const themeTabs = this.$el.querySelectorAll('.playground > p-tabs-bar');
    themeTabs.forEach(tab => tab.addEventListener('update', () => {
      this.registerEvents();
    }));
  }

  updated(){
    this.registerEvents();
  }
  
  registerEvents() {
    const accordions = this.$el.querySelectorAll('.playground .demo p-accordion');
    accordions.forEach(accordionEl => accordionEl.addEventListener('update', (e) => (e.target.open = e.detail.open)));
  }
}
</script>
