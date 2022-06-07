# Segmented Control

The `p-segmented-control` component is...

<TableOfContents></TableOfContents>

## Basic

<Playground :markup="basicMarkup" :config="config"></Playground>

## Initial Value

<Playground :markup="initialValueMarkup" :config="config"></Playground>

## With Labels

<Playground :markup="withLabelsMarkup" :config="config"></Playground>

## With Icons

<Playground :markup="withIconsMarkup" :config="config"></Playground>

## Background Color

<Playground :markup="backgroundColorMarkup" :config="{ ...config, colorScheme: backgroundColor.replace('background-', '') }">
  <select v-model="backgroundColor" aria-label="Select background color">
    <option disabled>Select background color</option>
    <option value="background-default">Background Default</option>
    <option value="background-surface">Background Surface</option>
  </select>
</Playground>

## Event Handling

<Playground :frameworkMarkup="eventHandlingMarkup" :config="config">
  <p-segmented-control v-on:segmentedControlChange="eventHandlingValue = $event.detail.value">
    <p-segmented-control-item value="1">Option 1</p-segmented-control-item>
    <p-segmented-control-item value="2">Option 2</p-segmented-control-item>
    <p-segmented-control-item value="3">Option 3</p-segmented-control-item>
    <p-segmented-control-item value="4">Option 4</p-segmented-control-item>
    <p-segmented-control-item value="5">Option 5</p-segmented-control-item>
  </p-segmented-control>

  <p>Current value: {{eventHandlingValue}}</p>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getSegmentedControlCodeSamples } from '@porsche-design-system/shared';
  
@Component
export default class Code extends Vue {
  config = { themeable: true };
  backgroundColor = 'background-default';

  items = `<p-segmented-control-item value="1">Option 1</p-segmented-control-item>
  <p-segmented-control-item value="2">Option 2</p-segmented-control-item>
  <p-segmented-control-item value="3">Option 3</p-segmented-control-item>
  <p-segmented-control-item value="4" disabled>Option 4</p-segmented-control-item>
  <p-segmented-control-item value="5">Option 5</p-segmented-control-item>`;

  basicMarkup = `<p-segmented-control>
  ${this.items}
</p-segmented-control>`;

  initialValueMarkup = `<p-segmented-control value="2">
  ${this.items}
</p-segmented-control>`;

  withLabelsMarkup = `<p-segmented-control>
  ${this.items.replace(/value="\d"/g, '$& label="Label"')}
</p-segmented-control>`;

  get withIconsMarkup() {
    let i = 0;
    const icons = ['truck', 'car', 'bell', 'garage', require('../../assets/icon-custom-kaixin.svg')]; 
    const items = this.items.replace(/value="\d"/g, (match) => {
      const attr = icons[i].includes('.svg') ? 'icon-source' : 'icon';
      return `${match} ${attr}="${icons[i++]}"`;
    });

    return `<p-segmented-control>
  ${items}
</p-segmented-control>`;
  };

  get backgroundColorMarkup() {
    return `<p-segmented-control background-color="${this.backgroundColor}">
  ${this.items}
</p-segmented-control>`;
  };

  eventHandlingMarkup = getSegmentedControlCodeSamples();
  eventHandlingValue = '';
}
</script>

