# Text Field

The **Text Field Wrapper** component supports basic input types and is essential for mostly any form.

A `label` is a caption which informs the user what information a particular form field is asking for. The **Text Field Wrapper** component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.  

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.

## Basic example

<Playground :childElementLayout="{spacing: 'block'}">
  <template #configurator>
    <select v-model="label">
      <option disabled>Select a label mode</option>
      <option selected value="show">With label</option>
      <option value="hide">Without label</option>
      <option value="responsive">Responsive</option>
    </select>
  </template>
  <template>
    <p-text-field-wrapper label="Some label" :hide-label="label === 'hide' ? 'true' : label === 'responsive' ? '{ base: true, l: false }' : 'false'">
      <input type="text" name="some-name"/>
    </p-text-field-wrapper>
    <p-text-field-wrapper label="Some label" :hide-label="label === 'hide' ? 'true' : label === 'responsive' ? '{ base: true, l: false }' : 'false'">
      <input type="text" placeholder="Some placeholder text" name="some-name"/>
    </p-text-field-wrapper>
  </template>
</Playground>

---

## With description text

A description text can be added to explain the meaning of a specific form field. It's meant to be a textual enhancement of the label text and is technically connected with the `hide-label` property.

<Playground>    
  <p-text-field-wrapper label="Some label" description="Some description">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
</Playground>

---

## Disabled

<Playground>    
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" value="Some value" disabled="disabled" />
  </p-text-field-wrapper>
</Playground>

---

## Read only

<Playground>    
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" value="Some value" readonly="readonly" />
  </p-text-field-wrapper>
</Playground>

--- 

## Types

The following types listed in the configurator below are supported. Browser specific UI helpers (e.g. calendar dropdown in Chrome) may occur inside the input field which are explicitly not reset by the **Text Field Wrapper** component.
For better accessibility it's recommended to **not** reset these browser default UI helpers.

### Basic

<Playground>
  <template #configurator>
    <select v-model="type">
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
  </template>
  <template>
    <p-text-field-wrapper label="Some label">
      <input :type="type" name="some-name"/>
    </p-text-field-wrapper>
  </template>
</Playground>

### Password

<Playground>
  <p-text-field-wrapper label="Some label">
    <input type="password" name="some-name" value="some password"/>
  </p-text-field-wrapper>
</Playground>

### Search

<Playground>
  <form action="#" onsubmit="alert('submit'); return false;">
    <p-text-field-wrapper label="Some label">
      <input type="search" name="some-name"/>
    </p-text-field-wrapper>
  </form>
</Playground>

---

## Validation states

The **Text Field Wrapper** component supports the visualisation of inline validation. The `message` and `input` is colored and visible/hidden depending on the defined `state`.

<Playground>
  <template #configurator>
    <select v-model="state">
      <option disabled>Select a validation state</option>
      <option value="error">Error</option>
      <option value="success">Success</option>
      <option value="none">None</option>
    </select>
  </template>
  <template>
    <p-text-field-wrapper label="Some label" :state="state" :message="state !== 'none' ? `Some ${state} validation message.` : ''">
      <input type="text" name="some-name" />
    </p-text-field-wrapper>
  </template>
</Playground>

---

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label`, `description` or `message`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).
For named slots only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed.
Please make sure to set the corresponding **aria** attributes.

<Playground>
  <template>
    <p-text-field-wrapper state="error">
      <span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <span slot="description">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <input type="text" name="some-name" aria-labelledby="some-label-id" aria-describedby="some-message-id"/>
      <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
    </p-text-field-wrapper>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTextFieldWrapper extends Vue {
    public label: string = 'show';
    public type: string = 'text';
    public state: string = 'error';
  }
</script>