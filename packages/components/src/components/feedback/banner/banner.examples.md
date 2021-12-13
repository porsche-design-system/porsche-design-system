# Notifications

<TableOfContents></TableOfContents>

## Banner
The `p-banner` component provides action-based feedback messages (e.g. after performing a task) or to convey informational and/or critical notification like some site related topics. 

Review the [notification decision tree](components/notifications/decision-tree) to determine which notification component is best for a particular scenario.

## Basic implementation
The `p-banner` component is positioned absolute above the page content by default. For personal adjustments, go to "Custom styling" section.

<Playground :markup="basic" :config="config">
  <select v-model="state">
    <option disabled>Select a state</option>
    <option value="neutral">Neutral</option>
    <option value="warning">Warning</option>
    <option value="error">Error</option>
  </select>
</Playground>

## Persistent
If the **Banner** shouldn't be removable by the user, add `persistent` prop.

<Playground :markup="persistent" :config="config"></Playground>

## Width
The `p-banner` behaves the same as the **ContentWrapper** component and can be adapted to the same widths to match with your layout.

<Playground :markup="markupWidth" :config="config">
  <select v-model="width">
    <option disabled>Select a width</option>
    <option value="basic">Basic</option>
    <option value="extended">Extended</option>
    <option value="fluid">Fluid</option>
  </select>
</Playground>

## Example with user interaction

<p-button type="button" v-on:click="openBanner($event)">Open Banner</p-button>

### <A11yIcon></A11yIcon> Accessibility hints
To support **keyboard navigation**, please take care of correct **focus handling** after closing the Banner with `ESC` or `Enter` key:
The trigger element (e.g. a button) which has opened the Banner must **receive focus state again** after the Banner is closed. This is important to keep focus order consistent.
You can test it out by navigation this example with the keyboard only.

## Custom styling
The `p-banner` component has some values which can be overwritten by CSS Custom Properties (aka CSS Variables):

```scss
// default CSS variables
--p-banner-position-type: fixed;
--p-banner-position-top: p-px-to-rem(56px);
--p-banner-position-bottom: p-px-to-rem(56px);

// overwrite with CSS variables
p-banner {
  --p-banner-position-top: 200px;
}
``` 

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { componentsReady } from '@porsche-design-system/components-js';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };
    
    state = 'neutral';
    width = 'basic';
    
    get basic() {
      return `<p-banner state="${this.state}">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description. You can also add inline <a href="https://porsche.com">links</a> to route to another page.</span>
</p-banner>`
    }
    
    persistent =
`<p-banner persistent="true">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description.</span>
</p-banner>`;

    get markupWidth() {
      return `<p-banner width="${this.width}">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description.</span>
</p-banner>`;
    }
    
    openBanner = (event) => {
      const el = document.createElement('p-banner');
      const currentTarget = event.currentTarget;
      el.innerHTML = `
        <span slot="title">Some banner title</span>
        <span slot="description">Some banner description.</span>
      `;
      document.getElementById('app').append(el);
      el.addEventListener('dismiss', () => {
        currentTarget.focus();
      });
    };
  
    mounted(): void {
      const banners = document.querySelectorAll('p-banner');
      banners.forEach((el) => el.addEventListener("dismiss", () => console.log("dismissed")));

      // scroll to top since banners have autofocus on close button via componentDidLoad
      componentsReady(this.$el).then(() => {
        document.querySelector('html').scrollTop = 0;
      });
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep .demo p-banner {
    --p-banner-position-type: static;
  }
</style>