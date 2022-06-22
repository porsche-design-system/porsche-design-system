# Segmented Control

The `p-segmented-control` component is similar to the native `select` element while showing all available options right
away.

It even behaves like a `select` where it can be controlled by setting the current value. However, it is not required and
you could purely rely on the change event.

Visually the `p-segmented-control` displays all options in equal size based on its largest option.

<TableOfContents></TableOfContents>

## Basic

Each option needs to be rendered by using a `p-segmented-control-item` child component where the `value` property is
**mandatory** in order to emit a useful change event.

<Playground :markup="basicMarkup" :config="config"></Playground>

## Initial Value

An initial `value` can optionally be set on the parent element, and if desired, also be set upon change event emission
as described in the <a :href="eventHandlingUrl">Event Handling</a> section.

<Playground :markup="initialValueMarkup" :config="config"></Playground>

## With Labels

Additional meta information can be displayed by setting a `label` on each child.

<Playground :markup="withLabelsMarkup" :config="config"></Playground>

## With Icons

An icon can be added via the `icon` or `iconSource` property.

<Playground :markup="withIconsMarkup" :config="config"></Playground>

## Background Color

If used on top of a surface background color, contrast of the buttons can be tweaked by changing the `backgroundColor`
property.

<Playground :markup="backgroundColorMarkup" :config="{ ...config, colorScheme: backgroundColor.replace('background-', '') }">
  <select v-model="backgroundColor" aria-label="Select background color">
    <option disabled>Select background color</option>
    <option value="background-default">Background Default</option>
    <option value="background-surface">Background Surface</option>
  </select>
</Playground>

## Event Handling

Whenever the selected item changes, a `segmentedControlChange` event gets emitted by the `p-segmented-control`.  
Each event instance contains the newly selected value at `event.detail.value`.

<Playground :frameworkMarkup="eventHandlingMarkup" :config="config">
  <p-segmented-control :value="eventHandlingValue" v-on:segmentedControlChange="eventHandlingValue = $event.detail.value">
    <p-segmented-control-item value="1">Option 1</p-segmented-control-item>
    <p-segmented-control-item value="2">Option 2</p-segmented-control-item>
    <p-segmented-control-item value="3">Option 3</p-segmented-control-item>
    <p-segmented-control-item value="4">Option 4</p-segmented-control-item>
    <p-segmented-control-item value="5">Option 5</p-segmented-control-item>
  </p-segmented-control>
  <p-text :theme="theme">Current value: {{eventHandlingValue}}</p-text>
</Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getSegmentedControlCodeSamples } from '@porsche-design-system/shared';
import { getAnchorLink } from '@/utils';
import type { Theme } from '@/models';
  
@Component
export default class Code extends Vue {
  config = { themeable: true };
  backgroundColor = 'background-surface';
  eventHandlingUrl = getAnchorLink('event-handling');

  shirtSizeItems = `<p-segmented-control-item value="xs">XS</p-segmented-control-item>
  <p-segmented-control-item value="s">S</p-segmented-control-item>
  <p-segmented-control-item value="m">M</p-segmented-control-item>
  <p-segmented-control-item value="l">L</p-segmented-control-item>
  <p-segmented-control-item value="xl">XL</p-segmented-control-item>`;

  optionItems = `<p-segmented-control-item value="1">Option 1</p-segmented-control-item>
  <p-segmented-control-item value="2">Option 2</p-segmented-control-item>
  <p-segmented-control-item value="3">Option 3</p-segmented-control-item>
  <p-segmented-control-item value="4" disabled>Option 4</p-segmented-control-item>
  <p-segmented-control-item value="5">Option 5</p-segmented-control-item>`;

  basicMarkup = `<p-segmented-control aria-label="Choose a t-shirt size">
  ${this.shirtSizeItems}
</p-segmented-control>`;

  initialValueMarkup = `<p-segmented-control value="2" aria-label="Choose an option">
  ${this.optionItems}
</p-segmented-control>`;

  withLabelsMarkup = `<p-segmented-control aria-label="Choose an option">
  ${this.optionItems.replace(/value="\d"/g, '$& label="Label"')}
</p-segmented-control>`;

  get withIconsMarkup() {
    let i = 0;
    const icons = ['truck', 'car', 'bell', 'garage', require('../../assets/icon-custom-kaixin.svg')]; 
    const items = this.optionItems.replace(/value="\d"/g, (match) => {
      const attr = icons[i].includes('.svg') ? 'icon-source' : 'icon';
      return `${match} ${attr}="${icons[i++]}"`;
    });

    return `<p-segmented-control aria-label="Choose an option">
  ${items}
</p-segmented-control>`;
  };

  get backgroundColorMarkup() {
    return `<p-segmented-control background-color="${this.backgroundColor}" aria-label="Choose an option">
  ${this.optionItems}
</p-segmented-control>`;
  };

  get theme(): Theme {
    return this.$store.getters.theme;
  }

  eventHandlingMarkup = getSegmentedControlCodeSamples();
  eventHandlingValue = 1;
}
</script>
