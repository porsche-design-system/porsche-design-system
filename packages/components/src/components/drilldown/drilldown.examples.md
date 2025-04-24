<ComponentHeading name="Drilldown"></ComponentHeading>

The `p-drilldown` component is meant for displaying an infinite multilevel structure in a drilldown menu that overlays
the page content from the start side of the screen. It is a controlled component that gives you flexible control over
its behavior.

<TableOfContents></TableOfContents>

## Basic

The basic concept of the component is to have a button that opens the `p-drilldown` with an infinite multilevel
structure. The levels are generated out of `p-drilldown-item` which generates a list of cascade buttons to navigate to a
deeper level, back buttons and a header section on mobile view. These items can be filled with e.g. `p-drilldown-link`,
another `p-drilldown-item` or any HTML element.

The visibility of `p-drilldown` can be controlled by its `open` property.

It's **obligatory** that each `p-drilldown-item` has a unique `identifier` and `label` defined.

Since it's a controlled component it's necessary to register an event listener for the `dismiss` and `update` event in
order to get notified when `p-drilldown` needs to be closed or navigated to another hierarchy level.

### Supported named slots:

- `slot`: Default slot for the main content.
- `slot="header"`: Shows a custom header section on mobile view.
- `slot="button"`: Shows a custom button to reach a deeper level of the navigation structure.

<Playground :frameworkMarkup="codeExample" :markup="codeExample['vanilla-js']" :config="config"></Playground>

## Active identifier

The `p-drilldown` can be initialized with an `active-identifier` property. This identifier is used to open the drilldown
with the corresponding deeply nested `p-drilldown-item` expanded. The `active-identifier` **must** match a value of the
`identifier` property of the `p-drilldown-item` component.

<Playground :frameworkMarkup="codeExampleActiveIdentifier" :markup="codeExampleActiveIdentifier['vanilla-js']" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

When the `p-drilldown` is used as navigation element then it's necessary to wrap the element and the button which opens
it within the landmark `<nav />`. In addition, take care that you expose the current navigation state to the user. This
can be done by using `<a aria-current="page">…</a>`.

## Example with custom content

To give more flexibility, it's possible to use custom slots `slot="button"` (renders a custom cascade button) and/or
`slot="header"` (renders a custom header on mobile view). It's even possible to customize the layout structure for each
layer individually with CSS variables (`--p-drilldown-grid-template`, `--p-drilldown-gap`).

<Playground :frameworkMarkup="codeExampleCustomContent" :markup="codeExampleCustomContent['vanilla-js']" :config="config"></Playground>

## Custom styling

It's possible to adjust the layout behaviour for each layer (`p-drilldown-item`) individually by a CSS Custom Property
(aka CSS Variable):

```scss
--p-drilldown-grid-template: auto / repeat(2, minmax(0, 1fr));
--p-drilldown-gap: 8px / 16px;
```

## Browser Support

<BrowserSupport
  chrome="120"
  edge="120"
  safari="17.4"
  firefox="129"
  chromeForAndroid="120"
  safariForiOS="17.4" />

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import { getDrilldownCodeSamples } from "@porsche-design-system/shared"; 

@Component()
export default class Code extends Vue {
  config = { themeable: true };
  drilldowns = [];
  codeExample = getDrilldownCodeSamples('default');
  codeExampleActiveIdentifier = getDrilldownCodeSamples('example-active-identifier'); 
  codeExampleCustomContent = getDrilldownCodeSamples('example-custom-content');
  
  mounted() {
    this.registerEvents();
  }

  updated() {
    /* event handling is registered again on every update since markup is changing and references are lost */
    this.registerEvents();
  }

  registerEvents() {
    this.drilldowns = document.querySelectorAll('.playground .demo p-drilldown');
    
    const buttonsOpen = document.querySelectorAll('.playground .demo > nav > p-button');
    buttonsOpen.forEach((btn, index) => btn.addEventListener('click', () => this.openDrilldown(index)));
    
    this.drilldowns.forEach((drilldown, index) => {
      drilldown.addEventListener('dismiss', () => this.closeDrilldown(index));
      drilldown.addEventListener('update', (e) => {
        drilldown.activeIdentifier = e.detail.activeIdentifier;
      });
    });
  }
    
  openDrilldown(index: number): void {
    this.drilldowns[index].open = true;
  }

  closeDrilldown(index: number): void {
    this.drilldowns[index].open = false;
  }
}
</script>
