# Accordion

A Accordion is a component that reveals or hides associated sections of content.  
Accordions are flexible in the context and can include other components of the Porsche Design System.

## Basic example

<Playground :markup="basic" :config="config"></Playground>

You can set the `open` property to `true` so that the accordion is open by default.
<Playground :markup="basicOpen" :config="config"></Playground>

The accordion width is 100% of the parent container.
We do strongly advise you to not use the full display width, as this will quickly result in a loss of context.
Parent containers with a maximum width of 800px are recommended.

### Headline Tag

The `tag` property needs to be set in order for the accordion to fit into the outline of the page. If there is no `tag` property provided, it defaults to `h2`.
For instance our example accordions use heading level 3 because they are contained in sections titled with a level 2 heading.

### Event binding

`p-accordion` is a component which does not work by itself and needs to be controlled from the outside.  
This grants you flexible control over the `open` state.

In order to get notified when the Accordion gets closed by clicking the `headline` you need to register an event listener for the `accordionChange` event which is emitted by `p-accordion`.

#### Vanilla JS

```js
accordion.addEventListener('accordionChange', (accordionChangeEvent) => {
  const { open } = accordionChangeEvent.detail;
  accordionChangeEvent.target.setAttribute('open', open);
});
```

#### Angular

```ts
import { Component } from '@angular/core';
import type { AccordionChangeEvent }  from '@porsche-design-system/components-angular/lib/types';

@Component({
  selector: 'accordion-page',
  template: `<p-accordion [open]="isAccordionOpen" (accordionChange)="handleAccordionChange($event)" heading="Some Heading">Some Content</p-accordion>`,
})
export class AccordionPage {
  isAccordionOpen = false;

  handleAccordionChange(e: CustomEvent<AccordionChangeEvent>) {
    const { open } = e.detail;
    this.isAccordionOpen = open;
  }
}
```

#### React

```tsx 
import { useCallback, useState } from 'react';
import { PAccordion } from '@porsche-design-system/components-react';
import type { AccordionChangeEvent } from '@porsche-design-system/components-react';

const AccordionPage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const handleAccordionChange = useCallback((e: CustomEvent<AccordionChangeEvent>) => {
    const { open } = e.detail;
    setIsOpen(open);
  }, []);

  return <PAccordion open={isOpen} onAccordionChange={handleAccordionChange}>Some label</PAccordion>
}
```
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

## Weight

<Playground :markup="weightMarkup" :config="config">
  <select v-model="weight">
    <option disabled>Select weight</option>
    <option value="regular">Regular</option>
    <option value="semibold">SemiBold</option>
  </select>
</Playground>

---

## Slotted heading
Sometimes it's useful to be able to render markup for `heading`. Therefore, a named slot can be used. Make sure **not** to define
the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).

Please **refrain** from using any other than text content as slotted markup.

<Playground :markup="slottedMarkup" :config="config"></Playground>

---

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };
  
    weight = 'semibold';
    size = 'small';
    content= '<p-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p-text>';

    get basic() {      
      return `<p-accordion heading="Some Heading" tag="h3">
  ${this.content}
</p-accordion>
<p-accordion heading="Some Heading" tag="h3">
  ${this.content}
</p-accordion>`;
    }
    
    get basicOpen() {      
      return `<p-accordion heading="Some Heading" tag="h3" open="true" >
  ${this.content}
</p-accordion>
<p-accordion heading="Some Heading" tag="h3" >
  ${this.content}
</p-accordion>`;
    }
  
    get sizeMarkup() {
      return `<p-accordion heading="Some Heading" tag="h3" ${this.size  === 'responsive' ? `size="{ base:'small', l:'medium' }"`: `size="${this.size}"`}>
  ${this.content}
</p-accordion>
<p-accordion heading="Some Heading" tag="h3" ${this.size  === 'responsive' ? `size="{ base:'small', l:'medium' }"`: `size="${this.size}"`}>
  ${this.content}
</p-accordion>`;
    }  
  
    get weightMarkup() {
      return `<p-accordion heading="Some Heading" tag="h3" weight="${this.weight}">
  ${this.content}
</p-accordion>
<p-accordion heading="Some Heading" tag="h3" weight="${this.weight}">
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
 
    mounted() {
      /* initially update accordion with open attribute in playground */
      this.registerEvents();
  
      /* theme switch needs to register event listeners again */
      const themeTabs = this.$el.querySelectorAll('.playground > p-tabs-bar');
      themeTabs.forEach(tabs => tabs.addEventListener('tabChange', () => {
        this.registerEvents();
      }));
    }
  
    updated(){
      this.registerEvents();
    }
  
    registerEvents() {
      const accordions = this.$el.querySelectorAll('.playground .demo p-accordion');
      accordions.forEach(accordionEl => accordionEl.addEventListener('accordionChange', this.handleAccordionChange));
    }
  
    handleAccordionChange =  (e) => {
      const { open } = e.detail;
      e.target.setAttribute('open', open);
    }
  }
</script>
