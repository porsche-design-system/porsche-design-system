# Multi Select

The `p-multi-select` component is a versatile custom form element that facilitates the selection of multiple options. It
can be used [within a form](components/multi-select/examples#form) or in a
[controlled manner](components/multi-select/examples#controlled).

<TableOfContents></TableOfContents>

## Basic usage

Many of the properties closely resemble those found in the [select-wrapper](components/select-wrapper/examples) and
other form components (e.g. label, description, state, message, hideLabel, disabled, required & dropdownDirection).

<Playground :markup="basic()" :config="config"></Playground>

## Form

When used within a form element, the `p-multi-select` component creates an underlying native select element to handle
selected options. This is necessary due to the constraints of shadow DOM boundaries. To ensure proper form submission,
it's required to provide a name attribute to the `p-multi-select` component. This attribute establishes the link between
the component and the form, enabling the selected values to be included in the form's data when it's submitted.

<Playground :frameworkMarkup="formExample" :config="{ ...config, withoutDemo: true }">
<form @submit.prevent="onSubmit">
  <p-multi-select name="options" label="Some Label" :theme="theme">
    <p-multi-select-option value="a">Option A</p-multi-select-option>
    <p-multi-select-option value="b">Option B</p-multi-select-option>
    <p-multi-select-option value="c">Option C</p-multi-select-option>
    <p-multi-select-option value="d">Option D</p-multi-select-option>
    <p-multi-select-option value="e">Option E</p-multi-select-option>
    <p-multi-select-option value="f">Option F</p-multi-select-option>
  </p-multi-select>
  <button type="submit" class="my-1">Submit</button>
</form>
  <p-text :theme="theme">{{ selectedValuesForm }}</p-text>
</Playground>

## Controlled

In the controlled approach, the p-multi-select component is externally managed through code. Selected options trigger a
custom update event, allowing external code to respond by synchronizing the component's state and displaying selected
values.

<Playground :frameworkMarkup="controlledExample" :config="{ ...config, withoutDemo: true }">
<p-multi-select label="Some Label" :theme="theme" class="mb-1" @update="updateControlledExample">
  <p-multi-select-option value="a">Option A</p-multi-select-option>
  <p-multi-select-option value="b">Option B</p-multi-select-option>
  <p-multi-select-option value="c">Option C</p-multi-select-option>
  <p-multi-select-option value="d">Option D</p-multi-select-option>
  <p-multi-select-option value="e">Option E</p-multi-select-option>
  <p-multi-select-option value="f">Option F</p-multi-select-option>
</p-multi-select>
<p-text :theme="theme">{{ selectedValuesControlled }}</p-text>
</Playground>

## Set Value

The `p-multi-select` component behaves like regular form elements. It updates its value automatically based on user
choices, but can also be changed manually by using the value property. This property takes an array of strings or
numbers that represent the selected option values.

<Playground :frameworkMarkup="dynamicExample" :config="{ ...config, withoutDemo: true }">
  <label>
    <p-text :theme="theme">Value</p-text>
    <input id="input-value" name="input-value" v-model="valueInput" type="text" placeholder="e.g. 1,2" class="my-1" />
  </label>
  <br />
  <button id="btn-input-value" @click="setMultiSelectValue()">Set Value</button>
  <button id="btn-reset" type="button" @click="valueInput = '', setMultiSelectValue()">Reset value</button>
  
  <p-multi-select name="name" label="Some Label" ref="multiSelect" :theme="theme" v-html="getOptions(amountOfOptions)" @update="(e) => valueInput = e.target.value" style="margin: 1rem 0">
  </p-multi-select> 
<button type="button" @click="amountOfOptions++">Add option</button>
  <button type="button" @click="amountOfOptions--">Remove last option</button>
</Playground>

<script lang="ts">
import Vue from 'vue';
import { ref, onMounted } from 'vue';
import Component from 'vue-class-component'; 
import {getMultiSelectCodeSamples} from "shared/src"; 
import type { Theme } from '@/models';

@Component
export default class Code extends Vue {
  config = { themeable: true, overflowX: 'visible' };

  get theme(): Theme {
    return this.$store.getters.theme;
  }

  $refs!: {
    multiSelect: HTMLElement
  }

  mounted() {
    this.setMultiSelectValue();
  }


  dynamicExample = getMultiSelectCodeSamples('example-dynamic');
  controlledExample = getMultiSelectCodeSamples('example-controlled');
  formExample = getMultiSelectCodeSamples('default');

  basic() {
    return `<p-multi-select name="name" label="Some Label" description="Some description" theme="${this.theme}" required>
  <p-multi-select-option value="a">Option A</p-multi-select-option>
  <p-multi-select-option value="b">Option B</p-multi-select-option>
  <p-multi-select-option value="c">Option C</p-multi-select-option>
  <p-multi-select-option value="d">Option D</p-multi-select-option>
  <p-multi-select-option value="e">Option E</p-multi-select-option>
  <p-multi-select-option value="f">Option F</p-multi-select-option>
</p-multi-select>`;
  }

  selectedValuesForm = 'Last submitted data: none';
  onSubmit(e) {
    const formData = new FormData(e.target);
    this.selectedValuesForm = `Last submitted data: ${
      Array.from(formData.entries())
        .map(([_, value]) => value)
        .join(', ') || 'none'
    }`;
  }
 
  valueInput = '1,2';
  amountOfOptions = 3;
  getOptions = (amount = 3) => Array.from(Array(amount)).map((_, i) => `<p-multi-select-option value="${i + 1}">Option ${i+1}</p-multi-select-option>`).join('\n  ');

  setMultiSelectValue() {
    this.$refs.multiSelect.value = this.valueInput.split(',')
  }
 
  selectedValuesControlled = 'Selected values: none';
  updateControlledExample(e) {
  console.log(e);
    this.selectedValuesControlled = `Selected values: ${e.target.value.join(', ') || 'none'}`;
  }

}
</script>

<style scoped lang="scss">
  .mb-1 {
    margin: 0 0 0.5rem 0;
  }

  .my-1 {
    margin: 0.5rem 0;
  }

  button {
    padding: .5rem 1rem;
    + button { 
      margin: 0 0 0 .5rem;
    }
  }
</style>
