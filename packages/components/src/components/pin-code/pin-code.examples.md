<ComponentHeading name="Pin Code"></ComponentHeading>

The `p-pin-code` component is optimized for entering sequences of digits. The most common use case is for entering
one-time-passwords (OTP) or pin codes. The input fields allow only one digit at a time. When a digit is entered, the
focus shifts automatically to the next input, until every input is filled.

A few things to note:

- Only digits can be entered.
- Only one digit can be entered per input.
- To overwrite the value of an input, it is not necessary to select or delete the text in the input. If an input is
  focused while typing a digit, the previous value will be overwritten. This is an optimization for quickly editing the
  inputs.
- Pressing `Delete` or `Backspace`: If the focussed input is blank and `Delete`/`Backspace` is pressed the focus
  transfers to the next/previous input, and clears the value of the next/previous input (if any). This avoids the need
  to explicitly `Shift+Tab & Delete`/ `Tab & Backspace`.

<TableOfContents></TableOfContents>

## Basic

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-pin-code`
component can be used with or without a label, but it's recommended to keep the label visible for better accessibility
whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.

<Playground :markup="hideLabelMarkup" :config="config">
  <SelectOptions v-model="hideLabel" :values="hideLabels" name="hideLabel"></SelectOptions>
</Playground>

## With description text

A description text can be added to explain the meaning of the form field. It's meant to be a textual enhancement of the
label text and is technically related to the `hide-label` property.

<Playground :markup="withDescriptionText" :config="config"></Playground>

## Length

By default, the `p-pin-code` component renders four input fields. For longer security codes you can choose to set the
prop `length` to `6`.

<Playground :markup="lengthMarkup" :config="config">
  <SelectOptions v-model="length" :values="lengths"></SelectOptions>
</Playground>

## Type

When collecting private or sensitive information, the entered value might be masked. The security code can be masked by
setting the prop `type` to `password`. Even with `type=password`, the input fields of the `p-pin-code` component allow
digits only.

<Playground :markup="typeMarkup" :config="config">
  <SelectOptions v-model="type" :values="types"></SelectOptions>
</Playground>

## Validation states

The `p-pin-code` component supports the visualisation of inline validation. The `message` is colored and visible/hidden
depending on the defined `state`.

<Playground :markup="stateMarkup" :config="config">
  <SelectOptions v-model="state" :values="states" name="state"></SelectOptions>
</Playground>

## Disabled

<Playground :markup="disabledMarkup" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable)
anymore and can be missed by screen reader users. They can be confusing for sighted users as well by not pointing out
why these elements are disabled. A good practice when to use the disabled state is during **form submission** to prevent
changes while this process is performed.

## Loading

<Playground :markup="loadingMarkup" :config="config"></Playground>

## Required

<Playground :markup="requiredMarkup" :config="config"></Playground>

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label`, `description` or `message`.
Therefore, a named slot can be used. Make sure **not** to define the corresponding property on the host element when a
named slot is used (because a property definition is preferred over a named slot). For named slots only
[phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is
allowed.

<Playground :markup="slots" :config="config"></Playground>

## Framework Implementation (within form)

When used within a form element, the `p-pin-code` component creates a native hidden input in light DOM to process the
`p-pin-code`'s value. This is required due to the constraints of shadow DOM boundaries. To ensure proper submission of
the form, it's required to provide an individual `name` prop to the `p-pin-code` component. The prop will be shared with
the hidden input in light DOM', enabling the `p-pin-code`'s value to be included in the form's data when it is
submitted.

<Playground :frameworkMarkup="formExample" :config="config">
  <form @submit.prevent="onSubmit" >
    <p-pin-code :theme="theme" label="Some Label" name="pin-code"></p-pin-code>
    <p-button :theme="theme" type="submit" style="margin: 1rem 0">Submit</p-button>
  </form>
  <p-text :theme="theme">Last submitted data: {{ submittedValue }}</p-text>
</Playground>

## Framework implementation (controlled)

We do not envision a lot of scenarios where you would need this level of control, however the `p-pin-code` can be used
as a controlled component. This means it does not contain any internal state, and you got full control over its
behavior. Any change of the input's values triggers a custom update event and the value is updated immediately. The prop
`value` is an array of strings synchronized with the input's values.

<Playground :frameworkMarkup="eventHandlingExample" :config="config">
  <p-pin-code :theme="theme" label="Some Label" :value="currentValueControlled" @update="onUpdate"></p-pin-code>
  <p-text :theme="theme" style="margin: 1rem 0">Current value: {{currentValueControlled}}</p-text>
  <p-text :theme="theme">Completely filled: {{isComplete}}</p-text>
</Playground>

## Copy+Paste and autocomplete

By default, only one input can be changed at a time. The `p-pin-code` component also supports copying and pasting a
value and OTP auto-suggestion on mobile.

The `p-pin-code` component performs basic validation of the pasted value:

- If the pasted string is too long the `p-pin-code` attempts to fill in the other inputs.
- If the pasted value contains whitespaces, these will be removed.
- If the value contains other characters than digits, the value can not be pasted.

Try copy+paste `1234` into any of the inputs in the example below.

<Playground :markup="hideLabelMarkup" :config="config">
  <SelectOptions v-model="hideLabel" :values="hideLabels" name="hideLabel"></SelectOptions>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getPinCodeCodeSamples } from '@porsche-design-system/shared';
import { FORM_STATES } from '../../utils';
import { PIN_CODE_LENGTHS } from './pin-code-utils';
import { getAnchorLink } from '@/utils';
 
@Component
export default class Code extends Vue {
  config = { themeable: true };
  eventHandlingUrl = getAnchorLink('event-handling');

  hideLabel = false;
  hideLabels = [false, true, '{ base: true, l: false }'];
  get hideLabelMarkup() {
    return `<p-pin-code label="Some label" hide-label="${this.hideLabel}"></p-pin-code>`;
  }

  withDescriptionText = `<p-pin-code label="Some label" description="Some description"></p-pin-code>`;

  length = 4;
  lengths = PIN_CODE_LENGTHS;
  get lengthMarkup() {
    return `<p-pin-code label="Some label" length="${this.length}"></p-pin-code>`;
  }

  type = 'number';
  types = ['number', 'password'];
  get typeMarkup() {
    return `<p-pin-code label="Some label" type="${this.type}"></p-pin-code>`;
  }

  state = 'error';
  states = FORM_STATES;
  get stateMarkup() {
    const attr = `message="${this.state !== 'none' ? `Some ${this.state} validation message.` : ''}"`;
    return `<p-pin-code label="Some label" state="${this.state}" ${attr}></p-pin-code>`;
  }

  disabledMarkup = `<p-pin-code label="Some label" disabled="true"></p-pin-code>`;

  loadingMarkup = `<p-pin-code label="Some label" loading="true"></p-pin-code>`;

  requiredMarkup = `<p-pin-code label="Some label" required="true"></p-pin-code>`;

  slots =
`<p-pin-code state="error">
    <span slot="label" id="some-label-id">
      Some label with a <a href="https://designsystem.porsche.com">link</a>.
    </span>
    <span slot="description" id="some-description-id">
      Some description with a <a href="https://designsystem.porsche.com">link</a>.
    </span>
    <span slot="message" id="some-message-id">
      Some error message with a <a href="https://designsystem.porsche.com">link</a>.
    </span>
  </p-pin-code>`;

  currentValueControlled = '';
  isComplete = false;
  onUpdate(e): void {
    this.currentValueControlled = e.detail.value;
    this.isComplete = e.detail.isComplete;
  }
  eventHandlingExample = getPinCodeCodeSamples('example-controlled');

  submittedValue = 'none';
  formExample = getPinCodeCodeSamples('default');
  onSubmit(e) {
    const formData = new FormData(e.target);
    this.submittedValue = Array.from(formData.values()).join() || 'none';
  }

  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }
}
</script>
