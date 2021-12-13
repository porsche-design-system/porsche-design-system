# Fieldset

The `p-fieldset-wrapper` is a grouping component for wrapping contextual associated form elements. 
Its visible part is an HTML *legend* element, which can be seen like a headline for describing the meaning of a form block.
You can see some usage examples on our [form patterns section](patterns/forms/resources).

<TableOfContents></TableOfContents>

## Basic example with label

<Playground :markup="withLabelMarkup"></Playground>

--- 

## Slotted label

<Playground :markup="slottedLabelMarkup"></Playground>

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

If the `p-fieldset-wrapper` is set to `required="true"`, only the label of the `p-fieldset-wraper` gets an asterisk. 
It is removed from all wrapped child components, as long as they are Porsche Design System form elements.
You should still set required on the input of the wrapped form elements to ensure accessibility, and the support of screen readers.

<Playground :markup="requiredMarkup"></Playground>

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

<Playground :markup="slottedMessageMarkup" :config="config">
  <select v-model="slottedMessage">
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
    slottedMessage = 'error';

    withLabelMarkup =
`<p-fieldset-wrapper label="Some legend label">
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
</p-fieldset-wrapper>`;

    slottedLabelMarkup =
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

    requiredMarkup =
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

   get slottedMessageMarkup() {
    const attr = `${this.slottedMessage === 'error' ? 'Some error message' : 'Some success message'}`;
    return `<p-fieldset-wrapper label="Some legend label" state=${this.slottedMessage}>
  <p-text-field-wrapper label="Some label" state=${this.slottedMessage}>
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
