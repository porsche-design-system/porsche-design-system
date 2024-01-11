# Flyout Navigation

The `p-flyout-navigation` component is meant for displaying a multi-level navigation structure in a flyout that overlays
the page content from the start side of the screen. It is a controlled component that gives you flexible control over
its behavior.

<Notification heading="Experimental Component" state="warning">
  Interface of Flyout Navigation might change in the near future. In addition, animation/transition concept will change in the future. Currently, only two navigation levels are supported, but we will offer the support of more levels soon.
</Notification>

<TableOfContents></TableOfContents>

## Basic

The basic concept of the component is to have a button that opens the `p-navigation-flyout` and a basic 2-level
navigation structure. The **1st level** is generated out of custom `p-flyout-navigation-item` components which generates
a list of toggle buttons to navigate the 2nd level. These items can be filled with slotted anchor links as children
which then represent the **2nd level** of the navigation and are styled automatically by the component.

The most important property of p-flyout is its `open` property. When it is set to `true` the flyout will be visible.

In order to get notified when the `p-navigation-flyout` gets closed by clicking the x button, you need to register an
event listener for the dismiss event which is emitted by `p-navigation-flyout`.

<Playground :frameworkMarkup="codeExample" :markup="codeExample['vanilla-js']" :config="config"></Playground>

## Active identifier

The `p-navigation-flyout` can be initialized with an `active-identifier` property. This identifier is used to open the
flyout with the corresponding **2nd level** navigation item expanded. The `active-identifier` must match a value of the
`identifier` property of the `p-flyout-navigation-item` component.

<Playground :frameworkMarkup="codeExampleActiveIdentifier" :markup="codeExampleActiveIdentifier['vanilla-js']" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

Always take care that you expose the current state of the navigation to the user. This can be done by using the
`aria-current="page"` attribute on the corresponding anchor element. And this also causes automatic styling of this
anchor.

## Example with custom content

To give further flexibility, e.g. if you only want to provide a direct link to a page on the **1st level**, you can just
use the `p-link-pure` component. Be aware that you have to adapt the styling of those custom **1st level** items to
match the design of the other 1st level items.

To gain more structure on the **2nd level** we also support out-of-the-box styling of `<h1> to <h6>`, `<p>` and `<a>`
tags. Regarding further individualization of the **2nd level**, you can create your own custom contents and use it as a
child besides the already supported tags.

<Playground :frameworkMarkup="codeExampleCustomContent" :markup="codeExampleCustomContent['vanilla-js']" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 
import { getFlyoutNavigationCodeSamples } from "@porsche-design-system/shared"; 

@Component()
export default class Code extends Vue {
  config = { themeable: true };
  flyoutNavigations = [];
  codeExample = getFlyoutNavigationCodeSamples('default');
  codeExampleActiveIdentifier = getFlyoutNavigationCodeSamples('example-active-identifier'); 
  codeExampleCustomContent = getFlyoutNavigationCodeSamples('example-custom-content');
  
  mounted() {
    this.registerEvents();
  }

  updated() {
    /* event handling is registered again on every update since markup is changing and references are lost */
    this.registerEvents();
  }

  registerEvents() {
    this.flyoutNavigations = document.querySelectorAll('.playground .demo p-flyout-navigation');
    
    const buttonsOpen = document.querySelectorAll('.playground .demo > p-button');
    buttonsOpen.forEach((btn, index) => btn.addEventListener('click', () => this.openFlyout(index)));
    
    this.flyoutNavigations.forEach((flyout, index) => {
      flyout.addEventListener('dismiss', () => this.closeFlyout(index));
      flyout.addEventListener('update', (e) => {
        flyout.activeIdentifier = e.detail.activeIdentifier;
      });
    });
  }
    
  openFlyout(index: number): void {
    this.flyoutNavigations[index].open = true;
  }

  closeFlyout(index: number): void {
    this.flyoutNavigations[index].open = false;
  }
}
</script>
