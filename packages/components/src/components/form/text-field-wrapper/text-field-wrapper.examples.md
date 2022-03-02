# Text Field

The `p-text-field-wrapper` component is a styling wrapper for the native HTML input types and is essential for mostly any form.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-text-field-wrapper` component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.  

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.

<TableOfContents></TableOfContents>

## Basic example

<Playground :markup="basic" :config="config">
  <select v-model="label" aria-label="Select label mode">
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

If the `maxLength` attribute is present onn the `input type="text"` element, a counter will be displayed.

<Playground :markup="counter" :config="config"></Playground>

## Types

The following types listed in the configurator below are supported. Browser specific UI helpers (e.g. calendar dropdown in Chrome) may occur inside the input field which are explicitly not reset by the `p-text-field-wrapper` component.
For better accessibility it's recommended to **not** reset these browser default UI helpers.

### Basic

<Playground :markup="typesBasic" :config="config">
  <select v-model="type" aria-label="Select input type">
    <option disabled>Select a type</option>
    <option value="text">Text</option>
    <option value="number">Number</option>
    <option value="email">Email</option>
    <option value="tel">Tel</option>
    <option value="search">Search</option>
    <option value="url">Url</option>
    <option value="date">Date</option>
    <option value="time">Time</option>
    <option value="month">Month</option>
    <option value="week">Week</option>
  </select>
</Playground>

### Number

Inputs with type number can display a unit (e.g. €, EUR, km/h, etc.) with a **maximum** of five characters.
A description of the used unit should be provided to ensure accessibility.

<Playground :markup="typesNumber" :config="config">
  <select v-model="unitPosition" aria-label="Select unit position">
    <option disabled>Select a unit position</option>
    <option value="prefix">Prefix</option>
    <option value="suffix">Suffix</option>    
  </select>
</Playground>

### Password

<Playground :markup="typesPassword" :config="config"></Playground>

### Search

<Playground :markup="typesSearch" :config="config"></Playground>

## Validation states

The `p-text-field-wrapper` component supports the visualisation of inline validation. The `message` and `input` is colored and visible/hidden depending on the defined `state`.

<Playground :markup="validationStates" :config="config">
  <select v-model="state" aria-label="Select validation state">
    <option disabled>Select a validation state</option>
    <option value="error">Error</option>
    <option value="success">Success</option>
    <option value="none">None</option>
  </select>
</Playground>

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label`, `description` or `message`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).
For named slots only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed.

<Playground :markup="slots" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints
If using **slotted contents** to serve form elements, make sure to provide the right **ARIA attributes** to give screen reader users the corresponding information:
1. Add a unique ID to the `slot="label"` element
1. Add a unique ID to the `slot="message"` element (if they are created)
1. Add corresponding `aria-labelledby="some-label-id"` to the `input` element which points to the `label` ID
1. Add corresponding `aria-describedby="some-description-id some-message-id"` to the `input` element which points to both, the `description` ID (if set) and the `message` ID when the (error/success) message appears 

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  config = { spacing: 'block' };

  label = 'show';
  type = 'text';
  state = 'error';
  unitPosition = 'prefix';

  get basic() {
    const labelAttr = ` hide-label="${this.label === 'hide' ? 'true' : this.label === 'responsive' ? '{ base: true, l: false }' : 'false'}"`;
    return `<p-text-field-wrapper label="Some label"${labelAttr}>
  <input type="text" name="some-name" />
</p-text-field-wrapper>
<p-text-field-wrapper label="Some label"${labelAttr}>
  <input type="text" placeholder="Some placeholder" name="some-name" />
</p-text-field-wrapper>`;
  }
  
  withDescriptionText =
`<p-text-field-wrapper label="Some label" description="Some description">
  <input type="text" name="some-name" />
</p-text-field-wrapper>`;

  required =
`<p-text-field-wrapper label="Some label">
  <input type="text" name="some-name" value="Some value" required />
</p-text-field-wrapper>`;

  disabled =
`<p-text-field-wrapper label="Some label">
  <input type="text" name="some-name" value="Some value" disabled />
</p-text-field-wrapper>`;

  readonly =
`<p-text-field-wrapper label="Some label">
  <input type="text" name="some-name" value="Some value" readonly />
</p-text-field-wrapper>`;

  counter =
`<p-text-field-wrapper label="Some label">
  <input type="text" name="some-name" value="Some value" maxlength="20" />
</p-text-field-wrapper>`;

  get typesBasic() {
    return `<p-text-field-wrapper label="Some label">
  <input type="${this.type}" name="some-name" />
</p-text-field-wrapper>`;
  }

  get typesNumber() {
    return `<p-text-field-wrapper label="Some label" description="The price in Euro" unit="EUR" unit-position="${this.unitPosition}">
  <input type="number" name="some-name" value="500" />
</p-text-field-wrapper>`;
  }
  
  typesPassword =
`<p-text-field-wrapper label="Some label">
  <input type="password" name="some-name" value="some password" />
</p-text-field-wrapper>`;

  typesSearch =
`<form action="#" onsubmit="alert('submit'); return false;">
  <p-text-field-wrapper label="Some label">
    <input type="search" name="some-name" />
  </p-text-field-wrapper>
</form>`;

  get validationStates() {
    const attr = `message="${this.state !== 'none' ? `Some ${this.state} validation message.` : ''}"`;
    return `<p-text-field-wrapper label="Some label" state="${this.state}" ${attr}>
  <input type="text" name="some-name" />
</p-text-field-wrapper>`;
    }
    
  slots =
`<p-text-field-wrapper state="error">
  <span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <span slot="description" id="some-description-id">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <input type="text" name="some-name" aria-labelledby="some-label-id" aria-describedby="some-description-id some-message-id" />
  <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
</p-text-field-wrapper>`;
}
</script>