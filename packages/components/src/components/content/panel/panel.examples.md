# Panel

A Panel is a component that reveals or hides associated sections of content.

Panels are flexible in the context and can include other components of the Porsche Design System.

## Basic example

<Playground :markup="basic" :config="config"></Playground>

You can set the `open` property to `true` so that the panel is open by default.
<Playground :markup="basicOpen" :config="config"></Playground>

### Headline Tag

The `tag` needs to be set in order for the panel to fit into the outline of the page. If no `tag` property is provided, it defaults to `h2`.

Our example panels use heading level 3 to fit correctly within the outline of the page; the examples are contained in sections titled with a level 2 heading.

### Event binding

`p-panel` is a component which does not work by itself and needs to be controlled from the outside.  
This grants you flexible control over the `open` state.

In order to get notified when the Panel gets closed by clicking the `headline` you need to register an event listener for the `panelChange` event which is emitted by `p-panel`.

#### Vanilla JS

```js
panel.addEventListener('panelChange', (panelChangeEvent) => {
  const { open } = panelChangeEvent.detail;
  panelChangeEvent.target.setAttribute('open', open);
});
```

#### Angular

```ts
import { Component } from '@angular/core';
import type { PanelChangeEvent }  from '@porsche-design-system/components-angular/lib/types';

@Component({
  selector: 'panel-page',
  template: `<p-panel [open]="isPanelOpen" (panelChange)="handlePanelChange($event)" heading="Some Heading">Some Content</p-panel>`,
})
export class PanelPage {
  isPanelOpen = false;

  handlePanelChange(e: CustomEvent<PanelChangeEvent>) {
    const { open } = e.detail;
    this.isPanelOpen = open;
  }
}
```

#### React

```tsx 
import { useCallback, useState } from 'react';
import { PPanel } from '@porsche-design-system/components-react';
import type { PanelChangeEvent } from '@porsche-design-system/components-react';

const PanelPage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const handlePanelChange = useCallback((e: CustomEvent<PanelChangeEvent>) => {
    const { open } = e.detail;
    setIsOpen(open);
  }, []);

  return <PPanel open={isOpen} onPanelChange={handlePanelChange}>Some label</PPanel>
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
Sometimes it's useful to be able to render markup for `heading`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).

Please **defer** from using any other than text content as slotted markup.

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
      return `<p-panel heading="Some Heading" tag="h3">
  ${this.content}
</p-panel>`;
    }
    
    get basicOpen() {      
      return `<p-panel heading="Some Heading" tag="h3" open="true" >
  ${this.content}
</p-panel>`;
    }
  
    get sizeMarkup() {
      return `<p-panel heading="Some Heading" tag="h3" ${this.size  === 'responsive' ? `size="{ base:'small', l:'medium' }"`: `size="${this.size}"`}>
  ${this.content}
</p-panel>`;
    }  
  
    get weightMarkup() {
      return `<p-panel heading="Some Heading" tag="h3" weight="${this.weight}">
  ${this.content}
</p-panel>`;
    }

    get slottedMarkup(){
      return `<p-panel tag="h3">
  <span slot="heading">Some slotted heading</span>
  ${this.content}
</p-panel>`;
    }
 
    mounted() {
      /* initially update panel with open attribute in playground */
      this.registerEvents();
  
      /* theme switch needs to register event listeners again */
      const themeTabs = this.$el.querySelectorAll('.playground > p-tabs-bar');
      themeTabs.forEach(tabs => tabs.addEventListener('tabChange', (e) => {
        this.registerEvents();
      }));
    }
  
    updated(){
      this.registerEvents();
    }
  
    registerEvents() {
      const panels = this.$el.querySelectorAll('.playground .demo p-panel');
      panels.forEach(panelEl => panelEl.addEventListener('panelChange', this.handlePanelChange));
    }
  
    handlePanelChange =  (e) => {
      const { open } = e.detail;
      e.target.setAttribute('open', open);
    }
  }
</script>
