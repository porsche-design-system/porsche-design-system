# Inline Notification

The `p-banner-inline` is a controlled component that provides action-based feedback messages (e.g. after performing a task) or to convey informational and/or critical notification like some site related topics.  
Whenever you want to provide brief, temporary notifications stick to the **Toast component** (work in progress) instead. They are noticeable but do not disrupt the user experience and do not require an action to be taken.

## Basic

<Playground :markup="basic" :config="config"></Playground>


## State

Both, background-color and icon can be controlled via the `state` property.

<Playground :markup="stateDemo" :config="config">
  <select v-model="state">
    <option disabled>Select a state</option>
    <option value="neutral">Neutral</option>
    <option value="success">Success</option>
    <option value="warning">Warning</option>
    <option value="error">Error</option>
  </select>
</Playground>

## Persistent

To make the `p-banner-inline` non-closable by the user, use the `persistent` property.

<Playground :markup="persistent" :config="config"></Playground>

## Event Handling

<Playground :frameworkMarkup="events" :config="config">
  <p-button id="bannerEventsButton">Show BannerInline</p-button>
  <br>
  <br>
  <div id="bannerEventsWrapper" hidden>
    <p-banner-inline heading="Some banner-inline heading" description="Some banner-inline description."></p-banner-inline>
  </div>
</Playground>

## Action Button

A custom interaction, e.g., to retry the previous action like submitting a form, can be provided by setting the optional `actionLabel`, `actionIcon` and `actionLoading` properties.  
The event that is emitted on click is called `action`.

<Playground :frameworkMarkup="actionButton" :config="config">
  <p-banner-inline
    id="bannerAction"
    heading="Some banner-inline heading"
    description="Some banner-inline description."
    action-label="Retry"
    action-icon="reset"
  ></p-banner-inline>
  <br>
  <p-button id="bannerActionButton">Reset</p-button>
</Playground>

## Slotted Content

Rich markup for the `heading` can be applied by using `slot="heading"`.  
Rich markup for the `description` can be used by the unnamed default slot.  

<Playground :markup="slottedContent" :config="config"></Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { getBannerInlineCodeSamples } from '@porsche-design-system/shared';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };
    
    state = 'neutral';
    width = 'basic';

    defaultHeading = 'Some banner-inline heading';
    defaultDescription = 'Some banner-inline description.';
    slottedHeading = 'Some slotted banner-inline heading';
    slottedDescription = 'Some slotted banner-inline description. You can also add inline <a href="https://porsche.com">links</a> to route to another page.';

    basic =
`<p-banner-inline heading="${this.defaultHeading}" description="${this.defaultDescription}">
</p-banner-inline>
<br>
<!-- or alternatively -->
<p-banner-inline heading="${this.defaultHeading}">
  ${this.defaultDescription}
</p-banner-inline>`;
    
    get stateDemo() {
      return `<p-banner-inline heading="${this.defaultHeading}" description="${this.defaultDescription}" state="${this.state}">
</p-banner-inline>`;
    }
    
    persistent =
`<p-banner-inline heading="${this.defaultHeading}" description="${this.defaultDescription}" persistent="true">
</p-banner-inline>`;

    slottedContent =
`<p-banner-inline>
  <span slot="heading">${this.slottedHeading}</span>
  ${this.slottedDescription}
</p-banner-inline>`;

    events = getBannerInlineCodeSamples('example-events');
    actionButton = getBannerInlineCodeSamples('example-action-button');
  
    mounted(): void {
      const buttonEvents = document.querySelector('#bannerEventsButton');
      const bannerEvents = document.querySelector('#bannerEventsWrapper p-banner-inline');
      const { parentElement } = bannerEvents;
      buttonEvents.addEventListener('click', () => (parentElement.hidden = false));
      bannerEvents.addEventListener('dismiss', () => (parentElement.hidden = true));

      const buttonAction = document.querySelector('#bannerActionButton');
      const bannerAction = document.querySelector('#bannerAction');
      buttonAction.addEventListener('click', () => (bannerAction.actionLoading = false));
      bannerAction.addEventListener('action', () => (bannerAction.actionLoading = true));
    }
  }
</script>