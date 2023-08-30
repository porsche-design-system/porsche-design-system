# Pin Code

The `p-pin-code` component ...

<TableOfContents></TableOfContents>

## Basic

<Playground :markup="hideLabelMarkup" :config="config">
  <SelectOptions v-model="hideLabel" :values="hideLabels" name="hideLabel"></SelectOptions>
</Playground>

## With description text

A description text can be added to explain the meaning of the `p-pin-code` component. It's meant to be a textual
enhancement of the label text and is technically connected with the `hide-label` property.

<Playground :markup="withDescriptionText" :config="config"></Playground>

## Length

<Playground :markup="lengthMarkup" :config="config">
  <SelectOptions v-model="length" :values="lengths"></SelectOptions>
</Playground>

## Type

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

## Framework Implementation (within form)

<Playground :frameworkMarkup="formExample" :config="{ ...config, withoutDemo: true }">
<form @submit.prevent="onSubmit" >
  <p-pin-code :theme="theme" label="Some Label" name="pin-code"></p-pin-code>
  <p-button type="submit" style="margin: 1rem 0">Submit</p-button>
</form>
  <p-text :theme="theme">Last submitted data: {{ currentValueForm }}</p-text>
</Playground>

## Framework implementation (controlled)

<Playground :frameworkMarkup="eventHandlingExample" :config="{ ...config, withoutDemo: true }">
  <p-pin-code :theme="theme" label="Some Label" :legth="length" @update="(e) => {
    currentValueControlled = e.detail;
    isComplete = e.target.value.length === length;
  }"></p-pin-code>
  <p-text :theme="theme" style="margin: 1rem 0">Current value: {{currentValueControlled}}</p-text>
  <p-text :theme="theme">Completely filled: {{isComplete}}</p-text>
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

  withDescriptionText = `<p-pin-code label="Some label" description="Some description"></p-pin-code>`

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
    return `<p-pin-code label="Some label" state="${this.state}"  ${attr}></p-pin-code>`;
  }

  disabledMarkup = `<p-pin-code label="Some label" disabled="true"></p-pin-code>`;

  loadingMarkup = `<p-pin-code label="Some label" loading="true"></p-pin-code>`;

  requiredMarkup = `<p-pin-code label="Some label" required="true"></p-pin-code>`;

  length=4;
  currentValueControlled = '';
  isComplete = false;
  eventHandlingExample = getPinCodeCodeSamples('example-controlled');

  currentValueForm = 'none';
  formExample = getPinCodeCodeSamples('default');
  onSubmit(e) {
    const formData = new FormData(e.target);
    this.currentValueForm = Array.from(formData.values()).join() || 'none';
  }



  get theme(): Theme {
    return this.$store.getters.theme;
  }
}
</script>
