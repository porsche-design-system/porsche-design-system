<ComponentHeading name="Fieldset"></ComponentHeading>

The `p-fieldset` is a grouping component for wrapping contextual associated form elements. Its visible part is an HTML
_legend_ element, which can be seen like a headline for describing the meaning of a form block. You can see some usage
examples on our [form patterns section](patterns/forms/resources).

<TableOfContents></TableOfContents>

## Basic example with label

<Playground :markup="withLabelMarkup" :config="config"></Playground>

---

## Slotted label

<Playground :markup="slottedLabelMarkup" :config="config"></Playground>

---

## Size

<Playground :markup="labelSizeMarkup" :config="config">
  <PlaygroundSelect v-model="labelSize" :values="labelSizes" name="labelSize"></PlaygroundSelect>
</Playground>

---

## Required

If the `p-fieldset` is set to `required="true"`, only the label of the `p-fieldset` gets an asterisk. It is removed from
all wrapped child components, as long as they are Porsche Design System form elements. You should still set required on
the input of the wrapped form elements to ensure accessibility, and the support of screen readers.

<Playground :markup="requiredMarkup" :config="config"></Playground>

---

## State

<Playground :markup="stateMarkup" :config="config">
  <PlaygroundSelect v-model="state" :values="states" name="state"></PlaygroundSelect>
</Playground>

---

## Slotted message

<Playground :markup="slottedMessageMarkup" :config="config">
  <PlaygroundSelect v-model="slottedMessage" :values="slottedMessages" name="state"></PlaygroundSelect>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { FIELDSET_LABEL_SIZES } from './../fieldset/fieldset-utils';
import { FORM_STATES } from '../../utils'; 

@Component
export default class Code extends Vue {
  config = { spacing: 'block', themeable: true }; 
  
  withLabelMarkup =
`<p-fieldset label="Some legend label">
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
</p-fieldset>`;

  slottedLabelMarkup =
`<p-fieldset>
  <span slot="label">Some legend label</span>
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
</p-fieldset>`;

  labelSize = 'small';
  labelSizes = FIELDSET_LABEL_SIZES;
  get labelSizeMarkup() {
    return `<p-fieldset label="Some legend label" label-size=${this.labelSize}>
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
</p-fieldset>`;
  }

  requiredMarkup =
`<p-fieldset label="Some legend label" required="true">
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" required />
  </p-text-field-wrapper>
</p-fieldset>`;

  state = 'error';
  states = FORM_STATES;
  get stateMarkup() {
    const message = this.state === 'error' ? 'Some error message' : 'Some success message';
    const attr = `state="${this.state}" message="${message}"`;
    return `<p-fieldset label="Some legend label" ${attr} class="state-markup">
  <p-text-field-wrapper label="Some label" state="${this.state}">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
  <p-checkbox-wrapper label="Some label" hide-label="false" state="${this.state}">
   <input type="checkbox" name="some-name" />
  </p-checkbox-wrapper>
  <p-checkbox-wrapper label="Some label" hide-label="false" state="${this.state}">
    <input type="checkbox" name="some-name" />
  </p-checkbox-wrapper>
</p-fieldset>`;
  }

  slottedMessage = 'error';
  slottedMessages = FORM_STATES;
  get slottedMessageMarkup() {
    const content = this.slottedMessage === 'error' ? 'Some error message' : 'Some success message';
    return `<p-fieldset label="Some legend label" state=${this.slottedMessage}>
  <p-text-field-wrapper label="Some label" state=${this.slottedMessage}>
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
  <span slot="message">${content}</span>
</p-fieldset>`;
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  .state-markup > * {
    margin-top: $pds-spacing-static-medium;
  }

  :deep(p-checkbox-wrapper) {
    margin-top: $pds-spacing-static-medium;
  }
</style>
