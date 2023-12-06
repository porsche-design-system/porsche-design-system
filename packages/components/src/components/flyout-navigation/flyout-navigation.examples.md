# Flyout Navigation

The `p-flyout-navigation` component is meant for displaying a multi-level navigation structure in a flyout that overlays
the page content from the left side of the screen. It is a controlled component that gives you flexible control over the
navigation flyout's behavior.

<Notification heading="Experimental Component" state="warning">
  Interface of Flyout Navigation might change in the near future. <br>Currently, only two navigation levels are supported, but we will offer the support of more levels in the future.
</Notification>

<TableOfContents></TableOfContents>

## Basic

The basic concept of the flyout navigation is to have a button that opens the `p-navigation-flyout` and a basic 2-level
navigation structure. The **1st level** is generated out of custom `p-flyout-navigation-item` components which generates
a list of toggle buttons to navigate the 2nd level. These 1st level items can be filled with slotted anchor links as
children which then represent the **2nd level** of the navigation and are styled automatically by the component.

The most important property of p-flyout is its open attribute. When it is present the flyout will be visible.

In order to get notified when the navigation flyout gets closed by clicking the x button, you need to register an event
listener for the dismiss event which is emitted by p-flyout.

<Playground :markup="basicExample" :config="config"></Playground>

## With active identifier

The flyout navigation can be initialized with an `active-identifier` property. This identifier is used to open the
flyout with the corresponding 1st level navigation item expanded. The `active-identifier` is the value of the
`identifier` property of the `p-flyout-navigation-item` component.

<Playground :markup="activeIdentifierExample" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

Always take care that you expose the current state of the navigation to the user. This can be done by using the
`aria-current="page"` attribute on the corresponding anchor element. And this also causes automatic styling of this
anchor.

## Enhanced example with custom content

To give further flexibility, e.g. if you only want to provide a direct link to a page on the 1st level, you can just use
the `p-link-pure` component. Be aware that you have to adapt the styling of those custom 1st level items to match the
design of the other 1st level items.

To gain more structure on the 2nd level we also support out-of-the-box styling of `<h1> to <h6>` tags. Regarding further
individualization of the 2nd level, you can create your own custom contents and use it as a child besides the already
supported `<a>` and tags.

<Playground :markup="enhancedExample" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'; 

@Component()
export default class Code extends Vue {
  config = { themeable: true };
  navigationFlyouts = [];
  
  mounted() {
    this.registerEvents();
  }

  updated() {
    /* event handling is registered again on every update since markup is changing and references are lost */
    this.registerEvents();
  }

  registerEvents() {
    this.navigationFlyouts = document.querySelectorAll('.playground .demo p-flyout-navigation');
    
    const buttonsOpen = document.querySelectorAll('.playground .demo > p-button');
    buttonsOpen.forEach((btn, index) => btn.addEventListener('click', () => this.openFlyout(index)));
    
    this.navigationFlyouts.forEach((flyout, index) => {
      flyout.addEventListener('dismiss', () => this.closeFlyout(index));
    });
  }

basicExample =
`<p-button aria="{ 'aria-haspopup': 'dialog' }">Open Flyout Navigation</p-button>
<p-flyout-navigation>
  <p-flyout-navigation-item identifier="item-1" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-2" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-3" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-4" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-5" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-6" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
</p-flyout-navigation>`;

activeIdentifierExample =
`<p-button aria="{ 'aria-haspopup': 'dialog' }">Open Flyout Navigation</p-button>
<p-flyout-navigation active-identifier="item-2">
  <p-flyout-navigation-item identifier="item-1" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-2" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor" aria-current="page">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-3" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-4" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-5" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-6" label="Some Label">
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
</p-flyout-navigation>`;

enhancedExample =
`<p-button aria="{ 'aria-haspopup': 'dialog' }">Open Flyout Navigation</p-button>
<p-flyout-navigation active-identifier="item-1">
  <p-flyout-navigation-item identifier="item-1" label="Some Label">
    <p-link-tile href="#" label="Some label" description="Some Description" weight="semi-bold" compact="true" aspect-ratio="1:1">
      <img src="${require('@/assets/dummy-image-for-link-tile.jpeg')}" alt="Some Image" />
    </p-link-tile>
    <h3>Some Heading</h3>
    <a href="#">Some anchor</a>
    <a href="#" active="true" aria="{ 'aria-current': 'page'}">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <h3>Some Heading</h3>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-2" label="Some Label">
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-3" label="Some Label">
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-4" label="Some Label">
    <a href="#">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-5" label="Some Label">
    <a href="#">Some anchor</a>
  </p-flyout-navigation-item>
  <p-flyout-navigation-item identifier="item-6" label="Some Label">
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
  </p-flyout-navigation-item>
  <p-link-pure size="medium" href="#" stretched="true" icon="external">Some external anchor</p-link-pure>
</p-flyout-navigation>`;
    
  openFlyout(index: number): void {
    this.navigationFlyouts[index].open = true;
  }

  closeFlyout(index: number): void {
    this.navigationFlyouts[index].open = false;
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  :deep(p-flyout-navigation) {
    > p-link-pure {
      padding: $pds-spacing-fluid-small;
      margin: 0 calc($pds-spacing-fluid-small * -1);
    }
  }
</style>
