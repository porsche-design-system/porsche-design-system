# Inline Notification

The `p-inline-notification` is a controlled component that provides action-based feedback messages (e.g. after
performing a task) or to convey informational and/or critical notification like some site related topics.

Review the [notification decision tree](patterns/notifications/decision-tree) to determine which notification component
is best for a particular scenario.

<TableOfContents></TableOfContents>

## Basic

<Playground :markup="basic" :config="config"></Playground>

## State

<Notification heading="Deprecation hint" state="warning">
  Following state has been deprecated and will be removed with the next major release: "neutral".
</Notification>

<Playground :markup="stateMarkup" :config="config">
  <SelectOptions v-model="state" :values="states" name="state"></SelectOptions>
</Playground>

## Without Close/Dismiss Button

To make the `p-inline-notification` non-closable by the user, use the `dismissButton` property.

<Notification heading="Deprecation hint" state="warning">
  The <code>persistent</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>dismissButton</code> property instead.
</Notification>

<Playground :markup="dismissButton" :config="config"></Playground>

## Event Handling

### Close Button

The custom event that is emitted on close button click is called `dismiss`.  
It can be used to remove the component.

<Playground :frameworkMarkup="events" :config="config">
  <PlaygroundButton id="bannerEventsButton" name="Show Inline Notification"></PlaygroundButton>
  <br>
  <br>
  <div id="bannerEventsWrapper" hidden>
    <p-inline-notification :heading="defaultHeading" :description="defaultDescription"></p-inline-notification>
  </div>
</Playground>

### Action Button

A custom interaction, e.g., to retry the previous action like submitting a form, can be provided by setting the optional
`actionLabel`, `actionIcon` and `actionLoading` properties.  
The custom event that is emitted on action button click is called `action`.

<Playground :frameworkMarkup="actionButton" :config="config">
  <p-inline-notification
    id="bannerAction"
    :heading="defaultHeading"
    :description="defaultDescription"
    action-label="Retry"
    action-icon="reset"
  ></p-inline-notification>
  <br>
  <PlaygroundButton id="bannerActionButton" name="Reset `actionLoading`"></PlaygroundButton>
</Playground>

## Slotted Content

Rich markup for the `heading` can be applied by using `slot="heading"`.  
Rich markup for the `description` can be used by the unnamed default slot.

<Playground :markup="slottedContent" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getInlineNotificationCodeSamples } from '@porsche-design-system/shared';
import { INLINE_NOTIFICATION_STATES } from './inline-notification-utils';
import { BANNER_STATES_DEPRECATED } from '../banner/banner-utils';

@Component
export default class Code extends Vue {
  config = { themeable: true };

  defaultHeading = 'Some heading';
  defaultDescription = 'Some description.';
  slottedHeading = 'Some slotted heading';
  slottedDescription = 'Some slotted description. You can also add inline <a href="https://porsche.com">links</a> to route to another page.';

  basic =
`<p-inline-notification heading="${this.defaultHeading}" description="${this.defaultDescription}">
</p-inline-notification>
<br>
<!-- or alternatively -->
<p-inline-notification heading="${this.defaultHeading}">
  ${this.defaultDescription}
</p-inline-notification>`;

  state = 'info';
  states = INLINE_NOTIFICATION_STATES.map(item => BANNER_STATES_DEPRECATED.includes(item) ? item + ' (deprecated)' : item);
  get stateMarkup() {
    return `<p-inline-notification heading="${this.defaultHeading}" description="${this.defaultDescription}" state="${this.state}">
</p-inline-notification>`;
  }

  dismissButton =
`<p-inline-notification heading="${this.defaultHeading}" description="${this.defaultDescription}" dismiss-button="false">
</p-inline-notification>`;

  slottedContent =
`<p-inline-notification>
  <span slot="heading">${this.slottedHeading}</span>
  ${this.slottedDescription}
</p-inline-notification>`;

  events = getInlineNotificationCodeSamples('example-events');
  actionButton = getInlineNotificationCodeSamples('example-action-button');

  mounted(): void {
    const buttonEvents = document.querySelector('#bannerEventsButton');
    const bannerEvents = document.querySelector('#bannerEventsWrapper p-inline-notification');
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
