# Textarea

The `p-textarea-wrapper` component is a styling wrapper for the native HTML `<textarea>` form element. Don't use a
Textarea component if you want to allow users to enter shorter responses that are no longer than a single line, such as
a phone number or name. In this case, you should use the Text Field component.

A `label` is a caption which informs the user what information a particular form field is asking for. The
`p-textarea-wrapper` component can be used with or without a label but it's recommended to keep the label visible for
better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label
text for screen readers.

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to
give the user visual cues to fill out the form.

<TableOfContents></TableOfContents>

## Basic example

<Playground :markup="hideLabelMarkup" :config="config">
  <SelectOptions v-model="hideLabel" :values="hideLabels" name="hideLabel"></SelectOptions>
</Playground>

## With description text

A description text can be added to explain the meaning of a specific form field. It's meant to be a textual enhancement
of the label text and is technically connected with the `hide-label` property.

<Playground :markup="withDescriptionText" :config="config"></Playground>

## Required

<Playground :markup="required" :config="config"></Playground>

## Disabled

<Playground :markup="disabled" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable)
anymore and can be missed by screen reader users. They can be confusing for sighted users as well by not pointing out
why these elements are disabled. A good practice when to use the disabled state is during **form submission** to prevent
changes while this process is performed.

## Read only

<Playground :markup="readonly" :config="config"></Playground>

## Counter

If the `maxlength` attribute is present on the `textarea` element, a counter will be displayed in the corner.  
To hide it you can set `showCounter` to `false`.

<p-inline-notification heading="Deprecation hint" state="warning" persistent="true">
  The <code>showCharacterCount</code> property has been deprecated and will be removed with the next major release.<br>
  Please use the <code>showCounter</code> property instead.
</p-inline-notification>

<Playground :markup="counter" :config="config"></Playground>

## Validation states

The `p-textarea-wrapper` component supports the visualisation of inline validation.

<Playground :markup="stateMarkup" :config="config">
  <SelectOptions v-model="state" :values="states" name="state"></SelectOptions>
</Playground>

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore a named slot
can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used
(because a property definition is preferred over a named slot). For named slots only
[phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is
allowed.

<Playground :markup="slots" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

If using **slotted contents** to serve form elements, make sure to provide the right **ARIA attributes** to give screen
reader users the corresponding information:

1. Add a unique ID to the `slot="label"` element
1. Add a unique ID to the `slot="message"` element (if they are created)
1. Add corresponding `aria-labelledby="some-label-id"` to the `textarea` element which points to the `label` ID
1. Add corresponding `aria-describedby="some-description-id some-message-id"` to the `textarea` element which points to
   both, the `description` ID (if set) and the `message` ID when the (error/success) message appears

<script lang="ts">
import Vue from 'vue';  
import Component from 'vue-class-component';
import { FORM_STATES } from '../../utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'block' };

  hideLabel = false;
  hideLabels = [false, true, '{ base: true, l: false }'];
  get hideLabelMarkup() {
    return `<p-textarea-wrapper label="Some label" hide-label="${this.hideLabel}">
  <textarea name="some-name"></textarea>
</p-textarea-wrapper>
<p-textarea-wrapper label="Some label" hide-label="${this.hideLabel}">
  <textarea name="some-name" placeholder="Some placeholder"></textarea>
</p-textarea-wrapper>`;
  }

  withDescriptionText =
`<p-textarea-wrapper label="Some label" description="Some description">
  <textarea name="some-name"></textarea>
</p-textarea-wrapper>`;

  required =
`<p-textarea-wrapper label="Some label">
  <textarea name="some-name" required>Some value</textarea>
</p-textarea-wrapper>`;

  disabled =
`<p-textarea-wrapper label="Some label">
  <textarea name="some-name" disabled>Some value</textarea>
</p-textarea-wrapper>`;

  readonly =
`<p-textarea-wrapper label="Some label">
  <textarea name="some-name" readonly>Some value</textarea>
</p-textarea-wrapper>`;

  counter =
`<p-textarea-wrapper label="Some label">
  <textarea name="some-name" maxlength="200">Some value</textarea>
</p-textarea-wrapper>
<p-textarea-wrapper label="Some label" show-counter="false">
  <textarea name="some-name" maxlength="200">Some value</textarea>
</p-textarea-wrapper>`;

  state = 'error';
  states = FORM_STATES;
  get stateMarkup() {
    const attr = `message="${this.state !== 'none' ? `Some ${this.state} validation message.` : ''}"`;
    return `<p-textarea-wrapper label="Some label" state="${this.state}" ${attr}>
  <textarea aria-invalid="${this.state === 'error'}" name="some-name">Some value</textarea>
</p-textarea-wrapper>`;
    }
    
  slots = `<p-textarea-wrapper state="error">
  <span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <span slot="description" id="some-description-id">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <textarea name="some-name" aria-labelledby="some-label-id" aria-describedby="some-description-id some-message-id"></textarea>
  <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
</p-textarea-wrapper>`;
}
</script>
