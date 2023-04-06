# Notifications

<TableOfContents></TableOfContents>

## Banner

The `p-banner` component provides action-based feedback messages (e.g. after performing a task) or to convey
informational and/or critical notification like some site related topics.

Review the [notification decision tree](components/notifications/decision-tree) to determine which notification
component is best for a particular scenario.

<p-inline-notification heading="Attention" state="warning" dismiss-button="false">
  Before v3.0.0 the <strong>p-banner</strong> handled its open state internally. This is no longer the case, since v3.0.0 it is a <strong>controlled</strong> component and has to be opened with the <strong>open property</strong>.
</p-inline-notification>

## Basic implementation

The `p-banner` component is positioned fixed above the page content by default. For personal adjustments, go to " Custom
styling" section.

<p-inline-notification heading="Deprecation hint" state="warning" dismiss-button="false">
  Following state has been deprecated and will be removed with the next major release: "neutral".
</p-inline-notification>

<Playground :markup="stateMarkup" :config="config">
  <SelectOptions v-model="state" :values="states" name="state"></SelectOptions>
</Playground>

### Framework Implementations

<Playground :frameworkMarkup="codeExample" class="auto-height">
  <p-button type="button" @click="isBannerOpen = true">Open Banner</p-button>
</Playground>

<p-banner :open="isBannerOpen" heading="Some Heading" description="Some Description" @dismiss="isBannerOpen =
false"></p-banner>

## Slotted heading and description

Rich content for `heading` and `description` can be provided via named slots.

<p-inline-notification heading="Deprecation hint" state="warning" dismiss-button="false">
  The named <code>slot="title"</code> has been deprecated and will be removed with the next major release.<br>
  Please use <code>slot="heading"</code> or the <code>heading</code> property instead.
</p-inline-notification>

<Playground :markup="slottedHeadingDescription" :config="config"></Playground>

## Without Close/Dismiss Button

If the **Banner** shouldn't be removable by the user, add `dismissButton` prop.

<p-inline-notification heading="Deprecation hint" state="warning" dismiss-button="false">
  The <code>persistent</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>dismissButton</code> property instead.
</p-inline-notification>

<Playground :markup="dismissButton" :config="config"></Playground>

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
import {getBannerCodeSamples} from "shared/src"; 

@Component
export default class Code extends Vue {
  config = { themeable: true };
  codeExample = getBannerCodeSamples();
  
  state = 'info';
  states = BANNER_STATES.map(item => BANNER_STATES_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get stateMarkup() {
    return `<p-banner open="true" state="${this.state}" heading="Some heading" description="Some description"></p-banner>`;
  }

  slottedHeadingDescription = `<p-banner open="true" state="${this.state}">
  <span slot="heading">Some heading with a <a href="https://porsche.com">link</a></span>
  <span slot="description">Some description. You can also add inline <a href="https://porsche.com">links</a> to route to another page.</span>
</p-banner>`;
    
  dismissButton =
`<p-banner open="true" dismiss-button="false">
  <span slot="heading">Some heading</span>
  <span slot="description">Some description.</span>
</p-banner>`;

  get widthMarkup() {
    return `<p-banner open="true" width="${this.width}">
  <span slot="heading">Some heading</span>
  <span slot="description">Some description.</span>
</p-banner>`;
  }

  isBannerOpen = false;

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

  .auto-height :deep(.demo) {
    height: auto;
  }
</style>
