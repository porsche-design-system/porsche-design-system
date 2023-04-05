# Notifications

<TableOfContents></TableOfContents>

## Banner

The `p-banner` component provides action-based feedback messages (e.g. after performing a task) or to convey
informational and/or critical notification like some site related topics.

Review the [notification decision tree](components/notifications/decision-tree) to determine which notification
component is best for a particular scenario.

## Basic implementation

The `p-banner` component is positioned fixed above the page content by default. For personal adjustments, go to " Custom
styling" section.

<p-inline-notification heading="Deprecation hint" state="warning" dismiss-button="false">
  Following state has been deprecated and will be removed with the next major release: "neutral".
</p-inline-notification>

<Playground :markup="stateMarkup" :config="config">
  <SelectOptions v-model="state" :values="states" name="state"></SelectOptions>
</Playground>

## Slotted heading and description

Rich content for `heading` and `description` can be provided via named slots.

<p-inline-notification heading="Deprecation hint" state="warning" dismiss-button="false">
  The named <code>slot="title"</code> has been deprecated and will be removed with the next major release.<br>
  Please use <code>slot="heading"</code> or the <code>heading</code> property instead.
</p-inline-notification>

<Playground :markup="slottedHeadingDescription" :config="config"></Playground>

## Persistent

If the **Banner** shouldn't be removable by the user, add `persistent` prop.

<Playground :markup="persistent" :config="config"></Playground>

## Width

<p-inline-notification heading="Deprecation hint" state="warning" dismiss-button="false">
This property is deprecated and has no effect anymore. Instead, the component is aligned with Porsche Grid "extended" by default.
</p-inline-notification>

## Example with user interaction

<p-button type="button" v-on:click="openBanner($event)">Open Banner</p-button>

### <A11yIcon></A11yIcon> Accessibility hints

To support **keyboard navigation**, please take care of correct **focus handling** after closing the Banner with `ESC`
or `Enter` key: The trigger element (e.g. a button) which has opened the Banner must **receive focus state again** after
the Banner is closed. This is important to keep focus order consistent. You can test it out by navigation this example
with the keyboard only.

## Custom styling

The `p-banner` component has some values which can be overwritten by CSS Custom Properties (aka CSS Variables):

```scss
// default CSS variables
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
import { BANNER_STATES, BANNER_STATES_DEPRECATED } from './banner-utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true };
  
  state = 'info';
  states = BANNER_STATES.map(item => BANNER_STATES_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get stateMarkup() {
    return `<p-banner state="${this.state}" heading="Some heading" description="Some description"></p-banner>`;
  }

  slottedHeadingDescription = `<p-banner state="${this.state}">
  <span slot="heading">Some heading with a <a href="https://porsche.com">link</a></span>
  <span slot="description">Some description. You can also add inline <a href="https://porsche.com">links</a> to route to another page.</span>
</p-banner>`;
    
  persistent =
`<p-banner dismiss-button="false">
  <span slot="heading">Some heading</span>
  <span slot="description">Some description.</span>
</p-banner>`;

  get widthMarkup() {
    return `<p-banner width="${this.width}">
  <span slot="heading">Some heading</span>
  <span slot="description">Some description.</span>
</p-banner>`;
  }

  openBanner = (event) => {
    const el = document.createElement('p-banner');
    const currentTarget = event.currentTarget;
    el.innerHTML = `
      <span slot="heading">Some heading</span>
      <span slot="description">Some description.</span>
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
  :deep(.demo) {
    transform: translate3d(0, 0, 0);
    height: 10rem;
  }
</style>
