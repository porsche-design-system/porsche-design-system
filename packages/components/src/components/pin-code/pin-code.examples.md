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

## Required

<Playground :markup="requiredMarkup" :config="config"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import type { Theme } from '@/models';
import { FORM_STATES } from '../../utils';
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
  lengths = [4, 6, 8];
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

  disabledMarkup = `<p-pin-code label="Some label" disabled></p-pin-code>`;

  requirededMarkup = `<p-pin-code label="Some label" required></p-pin-code>`;

  get theme(): Theme {
    return this.$store.getters.theme;
  }
}
</script>
