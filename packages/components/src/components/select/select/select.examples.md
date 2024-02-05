<ComponentHeading name="Select"></ComponentHeading>

The `p-select` component is a versatile custom form element that enables the selection of a single options. It can be
used [within a form](components/select/examples#form) or in a
[controlled manner](components/select/examples#controlled).

<TableOfContents></TableOfContents>

## Basic usage

Many of the properties closely resemble those found in the [select-wrapper](components/select-wrapper/examples) and
other form components (e.g. `label`, `description`, `state`, `message`, `hideLabel`, `disabled`, `required` &
`dropdownDirection`).

Options are slotted using the `p-select-option` component. Each option needs to have an assigned value, which can be
passed via an attribute or property and needs to be of type string. Initial selection states can only be achieved using
the value property on the `p-select` component ([More Info](components/select/examples#set-value)). Options don't have a
selected attribute or property. If an option should be visible but not selectable, it can be disabled by using the
`disabled` attribute. If the selection isn't required or should be clearable again, you can use an empty
`p-select-option` as default selection ([More Info](components/select/examples#empty)).

<Playground :markup="basic()" :config="config"></Playground>

---

## Basic example without preselection

If you want to give the user the option to deselect the current option, you can provide an empty
`<p-select-option></p-select-option>`. To ensure the user makes a conscious choice, you can pass in `undefined` as value
to the `value` property of the `p-select`.

<Playground :frameworkMarkup="requiredExample" :config="{ ...config, withoutDemo: true }">
  <PlaygroundCheckbox :checked="isRequiredSelect" name="Required" @change="isRequiredSelect = !isRequiredSelect"></PlaygroundCheckbox>
  <br />
  <PlaygroundCheckbox :checked="hasDeselection" name="Allow deselection" @change="hasDeselection = !hasDeselection"></PlaygroundCheckbox>
  <br /><br />
  <form @submit.prevent="onSubmitRequired">
    <p-select name="options" label="Some Label" :required="isRequiredSelect" :theme="theme">
      <p-select-option v-if="hasDeselection"></p-select-option>
      <p-select-option value="1">Option 1</p-select-option>
      <p-select-option value="2">Option 2</p-select-option>
      <p-select-option value="3">Option 3</p-select-option>
    </p-select>
    <br/>
    <PlaygroundButton name="Submit" type="submit"></PlaygroundButton>
    <p-text :theme="theme" style="display: inline-block;">Last submitted data: {{ lastSubmittedData }}</p-text>
  </form>
</Playground>

---

## Slotted images

In order to show an icon for each option, you can optionally slot an `img` tag within the `p-select-option`. Be aware
that the `p-select-option` can only contain a `#text` and an `img` node.

<Playground :markup="iconsExample" :config="config"></Playground>

---

## Form

When used within a form element, the `p-select` component creates an underlying native select element to handle the
selected value. This is necessary due to the constraints of shadow DOM boundaries. To ensure proper form submission,
it's required to provide a name attribute to the `p-select` component. This attribute establishes the link between the
component and the form, enabling the selected value to be included in the form's data when it's submitted.

<Playground :frameworkMarkup="formExample" :config="{ ...config, withoutDemo: true }">
  <form @submit.prevent="onSubmit">
    <p-select name="options" label="Some Label" value="a" :theme="theme">
      <p-select-option value="a">Option A</p-select-option>
      <p-select-option value="b">Option B</p-select-option>
      <p-select-option value="c">Option C</p-select-option>
      <p-select-option value="d">Option D</p-select-option>
      <p-select-option value="e">Option E</p-select-option>
      <p-select-option value="f">Option F</p-select-option>
    </p-select>
    <br>
    <PlaygroundButton name="Submit" type="submit"></PlaygroundButton>
    <p-text :theme="theme" style="display: inline-block;">{{ selectedValueForm }}</p-text>
  </form>
</Playground>

---

## Controlled

In the controlled approach, the `p-select` component is externally controlled. Selecting an option triggers a custom
update event, allowing you to use the updated value. Internally, the value will be updated automatically but can be
overwritten by passing in a new value.

<Playground :frameworkMarkup="controlledExample" :config="{ ...config, withoutDemo: true }">
<p-select name="options" label="Some Label" value="a" :theme="theme" @update="updateControlledExample">
  <p-select-option value="a">Option A</p-select-option>
  <p-select-option value="b">Option B</p-select-option>
  <p-select-option value="c">Option C</p-select-option>
  <p-select-option value="d">Option D</p-select-option>
  <p-select-option value="e">Option E</p-select-option>
  <p-select-option value="f">Option F</p-select-option>
</p-select>
<br>
<p-text :theme="theme">{{ selectedValueControlled }}</p-text>
</Playground>

---

## Set Value

The `p-select` component behaves like regular form elements. It updates its value automatically based on user choices,
but can also be changed manually by using the value property. This property takes a string that represent the selected
option value.

<Playground :frameworkMarkup="dynamicExample" :config="{ ...config, withoutDemo: true }">
  <PlaygroundInput type="text" placeholder="e.g. 1,2" v-model="valueInput" name="Value"></PlaygroundInput>
  <br>
  <br>
  <PlaygroundButton name="Set Value" @click="setSelectValue()"></PlaygroundButton>
  <PlaygroundButton name="Reset value" @click="valueInput = '', setSelectValue()"></PlaygroundButton>
  <br>
  <br>
  <p-select name="options" label="Some Label" ref="select" :theme="theme" v-html="getOptions(amountOfOptions)" @update="(e) => valueInput = e.target.value">
  </p-select> 
  <br>
  <PlaygroundButton name="Add option" @click="amountOfOptions++"></PlaygroundButton>
  <PlaygroundButton name="Remove last option" @click="amountOfOptions--"></PlaygroundButton>
</Playground>

<script lang="ts">
import Vue from 'vue';
import { ref, onMounted } from 'vue';
import Component from 'vue-class-component'; 
import {getSelectCodeSamples} from "shared/src"; 
import type { Theme } from '@/models';

@Component
export default class Code extends Vue {
  config = { themeable: true, overflowX: 'visible' };

  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }

  $refs!: {
    select: HTMLElement
  }

  mounted() {
    this.setSelectValue();
  }


  formExample = getSelectCodeSamples('default');
  requiredExample = getSelectCodeSamples('example-required');
  dynamicExample = getSelectCodeSamples('example-dynamic');
  controlledExample = getSelectCodeSamples('example-controlled'); 

  basic() {
    return `<p-select name="options" label="Some Label" description="Some description" value="a" required>
  <p-select-option value="a">Option A</p-select-option>
  <p-select-option value="b">Option B</p-select-option>
  <p-select-option value="c">Option C</p-select-option>
  <p-select-option value="d">Option D</p-select-option>
  <p-select-option value="e">Option E</p-select-option>
  <p-select-option value="f">Option F</p-select-option>
</p-select>`;
  }

  iconsExample = `<p-select name="options" label="Some Label" description="Some description" required>
  <p-select-option value="911">
    <img src="${require('@/assets/911.png')}" />
    911
  </p-select-option>
  <p-select-option value="718">
    <img src="${require('@/assets/718.png')}" />
    718
  </p-select-option>
  <p-select-option value="boxster">
    <img src="${require('@/assets/boxster.png')}" />
    Boxster
  </p-select-option>
  <p-select-option value="cayenne">
    <img src="${require('@/assets/cayenne.png')}" />
    Cayenne
  </p-select-option>
  <p-select-option value="macan">
    <img src="${require('@/assets/macan.png')}" />
    Macan
  </p-select-option>
  <p-select-option value="panamera">
    <img src="${require('@/assets/panamera.png')}" />
    Panamera
  </p-select-option>
  <p-select-option value="taycan">
    <img src="${require('@/assets/taycan.png')}" />
    Taycan
  </p-select-option>
  <p-select-option value="cayman">
    <img src="${require('@/assets/cayman.png')}" />
    Cayman
  </p-select-option>
</p-select>`;

  lastSubmittedData = 'None';
  isRequiredSelect = true;
  hasDeselection = false;

  onSubmitRequired(e) {
    const formData = new FormData(e.target);
    this.lastSubmittedData = formData.get('options')?.toString() || 'none';
  };


  selectedValueForm = 'Last submitted data: none';
  onSubmit(e) {
    const formData = new FormData(e.target);
    this.selectedValueForm = `Last submitted data: ${
      Array.from(formData.entries(), ([_, value]) => value)
        .join(', ') || 'none'
    }`;
  }
 
  valueInput = '1';
  amountOfOptions = 3;
  getOptions = (amount = 3) => Array.from(Array(amount), (_, i) => `<p-select-option value="${i + 1}">Option ${i+1}</p-select-option>`).join('\n  ');

  setSelectValue() {
    this.$refs.select.value = this.valueInput
  }
 
  selectedValueControlled = 'Selected value: none';
  updateControlledExample(e) {
  console.log(e);
    this.selectedValueControlled = `Selected value: ${e.target.value || 'none'}`;
  }

}
</script>
