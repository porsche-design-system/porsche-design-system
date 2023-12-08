# Multi Select

The `p-multi-select` component is a versatile custom form element that facilitates the selection of multiple options. It
can be used [within a form](components/multi-select/examples#form) or in a
[controlled manner](components/multi-select/examples#controlled).

<TableOfContents></TableOfContents>

## Basic usage

Many of the properties closely resemble those found in the [select-wrapper](components/select-wrapper/examples) and
other form components (e.g. `label`, `description`, `state`, `message`, `hideLabel`, `disabled`, `required` &
`dropdownDirection`). The `p-multi-select` offers a search field by default. When the user types in a search string, the
options are reduced by matching the options text.

Options are slotted using the `p-multi-select-option` component. Each option needs to have an assigned value, which can
be passed via an attribute or property and needs to be of type string. Initial selection states can only be achieved
using the value property on the `p-multi-select` component ([More Info](components/multi-select/examples#set-value)).
Options don't have a selected attribute or property. If an option should be visible but not selectable, it can be
disabled by using the `disabled` attribute.

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
    <br>
    <PlaygroundButton name="Submit" type="submit"></PlaygroundButton>
    <p-text :theme="theme" style="display: inline-block;">{{ selectedValuesForm }}</p-text>
  </form>
</Playground>

## Controlled

In the controlled approach, the p-multi-select component is externally controlled. Selected options trigger a custom
update event, allowing you to use the updated value. Internally, the value will be updated automatically but can be
overwritten by passing in a new value.

<Playground :frameworkMarkup="controlledExample" :config="{ ...config, withoutDemo: true }">
<p-multi-select name="options" label="Some Label" :theme="theme" @update="updateControlledExample">
  <p-multi-select-option value="a">Option A</p-multi-select-option>
  <p-multi-select-option value="b">Option B</p-multi-select-option>
  <p-multi-select-option value="c">Option C</p-multi-select-option>
  <p-multi-select-option value="d">Option D</p-multi-select-option>
  <p-multi-select-option value="e">Option E</p-multi-select-option>
  <p-multi-select-option value="f">Option F</p-multi-select-option>
</p-multi-select>
<br>
<p-text :theme="theme">{{ selectedValuesControlled }}</p-text>
</Playground>

## Set Value

The `p-multi-select` component behaves like regular form elements. It updates its value automatically based on user
choices, but can also be changed manually by using the value property. This property takes an array of strings that
represent the selected option values.

<Playground :frameworkMarkup="dynamicExample" :config="{ ...config, withoutDemo: true }">
  <label>
    <input id="input-value" name="input-value" aria-label="Value" v-model="valueInput" type="text" placeholder="e.g. 1,2" />
  </label>
  <PlaygroundButton name="Set Value" @click="setMultiSelectValue()"></PlaygroundButton>
  <PlaygroundButton name="Reset value" @click="valueInput = '', setMultiSelectValue()"></PlaygroundButton>
  <br>
  <br>
  <p-multi-select name="options" label="Some Label" ref="multiSelect" :theme="theme" v-html="getOptions(amountOfOptions)" @update="(e) => valueInput = e.target.value">
  </p-multi-select> 
  <br>
  <PlaygroundButton name="Add option" @click="amountOfOptions++"></PlaygroundButton>
  <PlaygroundButton name="Remove last option" @click="amountOfOptions--"></PlaygroundButton>
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
    return this.$store.getters.playgroundTheme;
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
      Array.from(formData.entries(), ([_, value]) => value)
        .join(', ') || 'none'
    }`;
  }
 
  valueInput = '';
  amountOfOptions = 3;
  getOptions = (amount = 3) => Array.from(Array(amount), (_, i) => `<p-multi-select-option value="${i + 1}">Option ${i+1}</p-multi-select-option>`).join('\n  ');

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
