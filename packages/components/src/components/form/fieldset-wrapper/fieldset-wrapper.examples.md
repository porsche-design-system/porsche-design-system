# Fieldset

The **Fieldset** is a grouping component for wrapping contextual associated form elements. 
Its visible part is an HTML *legend* element, which can be seen like a headline for describing the meaning of a form block.
You can see some usage examples on our [form patterns section](patterns/forms/resources).

## Basic example with label

<Playground :markup="withLabel"></Playground>

--- 

## Slotted label

<Playground :markup="slottedLabel"></Playground>

---

## Size

<Playground :markup="sizeMarkup" :config="config">
  <select v-model="size">
    <option disabled>Select a label-size</option>
    <option value="small">small</option>
    <option value="medium">medium</option>
  </select>
</Playground>

--- 

## Required

If the **Fieldset Wrapper** is set to `required="true"`, only the label of the **Fieldset Wrapper** gets an asterisk. 
It is removed from all wrapped child components, as long as they are Porsche Design System form element.
You should still set required on the input of the wrapped form elements to ensure accessibility, and the support of screen readers.

<Playground :markup="required"></Playground>

--- 

## State

<Playground :markup="stateMarkup" :config="config">
  <select v-model="state">
    <option disabled>Select a state</option>
    <option value="error">error</option>
    <option value="success">success</option>
  </select>
</Playground>

--- 

## Slotted message

<Playground :markup="slottedMessage" :config="config">
  <select v-model="slottedMessageState">
    <option disabled>Select a state</option>
    <option value="error">error</option>
    <option value="success">success</option>
  </select>
</Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
 
    size = 'small';
    state = 'error';
    slottedMessageState = 'error';

    withLabel =
`<p-fieldset-wrapper label="Some legend label">
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
</p-fieldset-wrapper>`;

    slottedLabel =
`<p-fieldset-wrapper>
  <span slot="label">Some legend label</span>
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
</p-fieldset-wrapper>`;

   get sizeMarkup() {
    return `<p-fieldset-wrapper label="Some legend label" label-size=${this.size}>
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
</p-fieldset-wrapper>`;
   }

    required =
`<p-fieldset-wrapper label="Some legend label" required="true">
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" required />
  </p-text-field-wrapper>
</p-fieldset-wrapper>`;

   get stateMarkup() {
    const attr = ` state=${this.state} message="${this.state === 'error' ? 'Some error message' : 'Some success message'}" `;
    return `<p-fieldset-wrapper label="Some legend label"${attr} class="state-markup">
  <p-text-field-wrapper label="Some label" state=${this.state}>
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
  <p-checkbox-wrapper label="Some label" hide-label="false" state=${this.state}>
   <input type="checkbox" name="some-name" />
  </p-checkbox-wrapper>
  <p-checkbox-wrapper label="Some label" hide-label="false" state=${this.state}>
    <input type="checkbox" name="some-name" />
  </p-checkbox-wrapper>
</p-fieldset-wrapper>`;
   }

   get slottedMessage() {
    const attr = `${this.slottedMessageState === 'error' ? 'Some error message' : 'Some success message'}`;
    return `<p-fieldset-wrapper label="Some legend label" state=${this.slottedMessageState}>
  <p-text-field-wrapper label="Some label" state=${this.slottedMessageState}>
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
  <span slot="message">${attr}</span>
</p-fieldset-wrapper>`;
   }
  }
</script>

<style>
  .state-markup > * {
    margin-top: .5rem;
  }
</style>