# Banner

The `p-banner` component provides action-based feedback messages (e.g. after performing a task) or to convey
informational and/or critical notification like some site related topics.

Review the [notification decision tree](patterns/notifications/decision-tree) to determine which notification component
is best for a particular scenario.

<Notification heading="Attention" state="warning">
  Before v3.0.0 the <strong>p-banner</strong> handled its open state internally. This is no longer the case, since v3.0.0 it is a <strong>controlled</strong> component and has to be opened with the <strong>open property</strong>.
</Notification>

<TableOfContents></TableOfContents>

## Basic

The `p-banner` component is positioned fixed above the page content by default. For personal adjustments, go to "Custom
styling" section.

<Notification heading="Deprecation hint" state="warning">
  Following state has been deprecated and will be removed with the next major release: "neutral".
</Notification>

<Playground :frameworkMarkup="stateMarkup" :config="config">
  <PlaygroundSelect v-model="state" :values="states" name="state"></PlaygroundSelect>
  <br><br>
  <p-button type="button" :theme="theme" @click="isBannerStateOpen = true">Open Banner</p-button>
  <p-banner :theme="theme" :open="isBannerStateOpen" heading="Some Heading" description="Some Description" :state="state"
    @dismiss="isBannerStateOpen = false"></p-banner>
</Playground>

## Slotted heading and description

Rich content for `heading` and `description` can be provided via named slots.

<Notification heading="Deprecation hint" state="warning">
  The named <code>slot="title"</code> has been deprecated and will be removed with the next major release.<br>
  Please use <code>slot="heading"</code> or the <code>heading</code> property instead.
</Notification>

<Playground :markup="slottedHeadingDescriptionMarkup" :config="config">
  <p-button type="button" :theme="theme" @click="isBannerSlottedOpen = true">Open Banner</p-button>
  <p-banner :theme="theme" :open="isBannerSlottedOpen" :state="state" @dismiss="isBannerSlottedOpen = false">
  <span slot="heading">Some heading with a <a href="https://porsche.com">link</a></span> <span slot="description">Some
  description. You can also add inline <a href="https://porsche.com">links</a> to route to another page.</span>
  </p-banner>
</Playground>

## Without Close/Dismiss Button

If the **Banner** shouldn't be removable by the user, add `dismissButton` prop.

<Notification heading="Deprecation hint" state="warning">
  The <code>persistent</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>dismissButton</code> property instead.
</Notification>

<Playground :markup="dismissButtonMarkup" :config="config">
  <p-button type="button" :theme="theme" @click="isBannerDismissBtnOpen = true">Open Banner</p-button>
  <p-banner :theme="theme" :open="isBannerDismissBtnOpen" heading="Some Heading" description="Some Description"
    :state="state" dismiss-button="false"></p-banner>
</Playground>

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
import type { Theme } from '@/models';
import { BANNER_STATES, BANNER_STATES_DEPRECATED } from './banner-utils'; 
import { getBannerCodeSamples } from '@porsche-design-system/shared'; 

@Component
export default class Code extends Vue {
  config = { themeable: true };
  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }

  codeExample = getBannerCodeSamples();

  isBannerStateOpen = false;
  isBannerSlottedOpen = false;
  isBannerDismissBtnOpen = false;

  state = 'info';
  states = BANNER_STATES.map(item => BANNER_STATES_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  
  get stateMarkup() { 
    return Object.entries(getBannerCodeSamples()).reduce((result, [key, markup]) => ({
      ...result,
      [key]: markup
        .replace(/(state:) 'success'/, `$1 '${this.state}'`)
    }), {});
  }

  get slottedHeadingDescriptionMarkup() {
    return `<p-banner open="false" state="${this.state}">
  <span slot="heading">Some heading with a <a href="https://porsche.com">link</a></span>
  <span slot="description">Some description. You can also add inline <a href="https://porsche.com">links</a> to route to another page.</span>
</p-banner>`
};
    
  get dismissButtonMarkup() {
    return `<p-banner open="false" heading="Some Heading" description="Some Description" state="${this.state}" dismiss-button="false"></p-banner>`};

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
