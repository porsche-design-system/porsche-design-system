# Textarea

The `p-textarea-wrapper` component is a styling wrapper for the native HTML `<textarea>` form element. Don't use a Textarea component if you want to allow users to enter shorter responses that are no longer than a single line, 
such as a phone number or name. In this case, you should use the Text Field component. 

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-textarea-wrapper` component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.  

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.

<TableOfContents></TableOfContents>

## Basic example

<Playground :markup="basic" :config="config">
  <select v-model="label">
    <option disabled>Select a label mode</option>
    <option value="show">With label</option>
    <option value="hide">Without label</option>
    <option value="responsive">Responsive</option>
  </select>
</Playground>

## With description text

A description text can be added to explain the meaning of a specific form field. It's meant to be a textual enhancement of the label text and is technically connected with the `hide-label` property.

<Playground :markup="withDescriptionText" :config="config"></Playground>

## Required

<Playground :markup="required" :config="config"></Playground>

## Disabled

<Playground :markup="disabled" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable) anymore and can be missed by screen reader users.
They can be confusing for sighted users as well by not pointing out why these elements are disabled.
A good practice when to use the disabled state is during **form submission** to prevent changes while this process is performed.

## Read only

<Playground :markup="readonly" :config="config"></Playground>

## Counter

If the `maxLength` attribute is present onn the `textarea` element, a counter will be displayed in the corner. 

<Playground :markup="counter" :config="config"></Playground>

## Validation states

The `p-textarea-wrapper` component supports the visualisation of inline validation. 

<Playground :markup="validationStates" :config="config">
  <select v-model="state">
    <option disabled>Select a validation state</option>
    <option value="error">Error</option>
    <option value="success">Success</option>
    <option value="none">None</option>
  </select>
</Playground>

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).
For named slots only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed.

<Playground :markup="slots" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
If using **slotted contents** to serve form elements, make sure to provide the right **ARIA attributes** to give screen reader users the corresponding information:
1. Add a unique ID to the `slot="label"` element
1. Add a unique ID to the `slot="message"` element (if they are created)
1. Add corresponding `aria-labelledby="some-label-id"` to the `textarea` element which points to the `label` ID
1. Add corresponding `aria-describedby="some-description-id some-message-id"` to the `textarea` element which points to both, the `description` ID (if set) and the `message` ID when the (error/success) message appears

<script lang="ts">
import Vue from 'vue';  
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { spacing: 'block' };

  label = 'show';
  state = 'error';

  get basic() {
    const attr = `hide-label="${this.label === 'hide' ? 'true' : this.label === 'responsive' ? '{ base: true, l: false }' : 'false'}"`;
    return `<p-textarea-wrapper label="Some label" ${attr}>
  <textarea name="some-name"></textarea>
</p-textarea-wrapper>
<p-textarea-wrapper label="Some label" ${attr}>
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
  <textarea name="some-name" maxLength="200">Some value</textarea>
</p-textarea-wrapper>`;

  get validationStates() {
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