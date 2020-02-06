# Text Field

The **Text Field Wrapper** component supports basic input types and is essential for mostly any form.

A `label` is a caption which informs the user what information a particular form field is asking for. The **Text Field Wrapper** component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.  

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.

## Basic example

### With label

<Playground :childElementLayout="{spacing: 'block'}">    
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name"/>
  </p-text-field-wrapper>
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" placeholder="Some placeholder text"/>
  </p-text-field-wrapper>
</Playground>

### Without label

<Playground :childElementLayout="{spacing: 'block'}">    
  <p-text-field-wrapper label="Some label" hide-label="true">
    <input type="text" name="some-name"/>
  </p-text-field-wrapper>
  <p-text-field-wrapper label="Some label" hide-label="true">
    <input type="text" name="some-name" placeholder="Some placeholder text"/>
  </p-text-field-wrapper>
</Playground>

### Responsive

<Playground :childElementLayout="{spacing: 'block'}">    
  <p-text-field-wrapper label="Some label" hide-label="{ base: true, l: false }">
    <input type="text" name="some-name"/>
  </p-text-field-wrapper>
  <p-text-field-wrapper label="Some label" hide-label="{ base: true, l: false }">
    <input type="text" name="some-name" placeholder="Some placeholder text"/>
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

The following types listed in the configurator below are supported. Browser specific UI helpers (e.g. calender dropdown in Chrome) may occur inside the input field which are explicitly not reset by the **Text Field Wrapper** component.
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

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).

<Playground>
  <template>
    <p-text-field-wrapper state="error">
      <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <input type="text" name="some-name" placeholder="Some placeholder"/>
      <span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
    </p-text-field-wrapper>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTextFieldWrapper extends Vue {
    public type: string = 'text';
    public state: string = 'error';
  }
</script>