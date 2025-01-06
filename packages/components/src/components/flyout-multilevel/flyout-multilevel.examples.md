<ComponentHeading name="Flyout Multilevel"></ComponentHeading>

The `p-flyout-multilevel` component is meant for displaying an infinite multilevel structure in a flyout that overlays
the page content from the start side of the screen. It is a controlled component that gives you flexible control over
its behavior.

<TableOfContents></TableOfContents>

## Basic

The basic concept of the component is to have a button that opens the `p-flyout-multilevel` with an infinite multilevel
structure. The levels are generated out of `p-flyout-multilevel-item` which generates a list of toggle buttons to
navigate to a deeper level. These items can be filled with slotted `<a/>` as children which are styled automatically by
the component, another `p-flyout-multilevel-item` or other components like e.g. `p-link-tile`.

The visibility of `p-flyout-multilevel` can be controlled by its `open` property.

It's **obligatory** that each `p-flyout-multilevel-item` has a unique `identifier` defined.

Since it's a controlled component it's necessary to register an event listener for the `dismiss` and `update` event in
order to get notified when `p-flyout-multilevel` needs to be closed or navigated to another hierarchy level.

<Playground :frameworkMarkup="codeExample" :markup="codeExample['vanilla-js']" :config="config"></Playground>

## Active identifier

The `p-flyout-multilevel` can be initialized with an `active-identifier` property. This identifier is used to open the
flyout with the corresponding deeply nested `p-flyout-multilevel-item` expanded. The `active-identifier` **must** match
a value of the `identifier` property of the `p-flyout-multilevel-item` component.

<Playground :frameworkMarkup="codeExampleActiveIdentifier" :markup="codeExampleActiveIdentifier['vanilla-js']" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

When the `p-flyout-multilevel` is used as navigation element then it's necessary to wrap the element and the button
which opens it within the landmark `<nav />`. In addition, take care that you expose the current navigation state to the
user. This can be done by using `<a aria-current="page">…</a>`.

## Example with custom content

To give further flexibility, e.g. if you only want to provide a direct link to a page on the **1st level**, you can just
use the `p-link-pure` component.

Regarding further individualization, you can use components like e.g. `p-link-tile` and others or create your own custom
contents and use it as a child.

<Playground :frameworkMarkup="codeExampleCustomContent" :markup="codeExampleCustomContent['vanilla-js']" :config="config"></Playground>

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
import { getFlyoutMultilevelCodeSamples } from "@porsche-design-system/shared"; 

@Component()
export default class Code extends Vue {
  config = { themeable: true };
  flyoutMultilevels = [];
  codeExample = getFlyoutMultilevelCodeSamples('default');
  codeExampleActiveIdentifier = getFlyoutMultilevelCodeSamples('example-active-identifier'); 
  codeExampleCustomContent = getFlyoutMultilevelCodeSamples('example-custom-content');
  
  mounted() {
    this.registerEvents();
  }

  updated() {
    /* event handling is registered again on every update since markup is changing and references are lost */
    this.registerEvents();
  }

  registerEvents() {
    this.flyoutMultilevels = document.querySelectorAll('.playground .demo p-flyout-multilevel');
    
    const buttonsOpen = document.querySelectorAll('.playground .demo > nav > p-button');
    buttonsOpen.forEach((btn, index) => btn.addEventListener('click', () => this.openFlyout(index)));
    
    this.flyoutMultilevels.forEach((flyout, index) => {
      flyout.addEventListener('dismiss', () => this.closeFlyout(index));
      flyout.addEventListener('update', (e) => {
        flyout.activeIdentifier = e.detail.activeIdentifier;
      });
    });
  }
    
  openFlyout(index: number): void {
    this.flyoutMultilevels[index].open = true;
  }

  closeFlyout(index: number): void {
    this.flyoutMultilevels[index].open = false;
  }
}
</script>
