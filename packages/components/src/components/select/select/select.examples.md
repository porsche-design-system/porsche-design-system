<ComponentHeading name="Select"></ComponentHeading>

The `p-select` component is a versatile custom form element that enables the selection of a single options. It can be
used [within a form](components/select/examples#form) or in a
[controlled manner](components/select/examples#controlled).

<Notification heading="Attention" heading-tag="h2" state="warning">
When the <code>p-select</code> component is used within a form, it utilizes the
<a href="https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals">ElementInternals</a> API, which has limited
browser support. For broader browser compatibility, consider using a
<a href="components/select/examples#controlled">controlled</a> approach instead.
</Notification>

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

To ensure the user makes a conscious choice, use the initial value `undefined` of the `value` property. If you want to
give the user the choice to deselect the current option, you can provide an option without a value
`<p-select-option></p-select-option>`. If you don't want the user to be able to deselect the current option, but still
want to show a placeholder text you can set the option `disabled` like this
`<p-select-option disabled>Please choose an option</p-select-option>`.

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

## Compact

<Playground :markup="compact" :config="config"></Playground>

---

## Form

The `p-select` component is a form-associated custom element that integrates seamlessly with forms. Leveraging the
[ElementInternals](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) API, it functions similar to a
native select, ensuring compatibility with form behaviors. However, note that browser support for this API is limited.

When used within a form element, it's required to provide a name attribute to the `p-select` component. This attribute
establishes the link between the component and the form, enabling the selected value to be included in the form's data
when it's submitted.

<Notification heading="Attention" heading-tag="h2" state="warning">
<code>p-select</code> does not use a native select internally. As a result, it lacks access to native <code>ValidityState</code>
properties and <code>validationMessage</code>, and it cannot display the native validation popover. This means validation behavior
and error display will need to be implemented separately if required.
</Notification>

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

---

## With optgroups

<Playground :markup="withOptgroups" :config="config"></Playground>

---

## Within table

When a `p-select` is used within the `p-table` component the dropdown will automatically switch to a native popover
behavior. This will prevent the dropdown of the `p-select` from being cut off when it overlaps with the component's
scroll container. The `p-select` will be automatically closed when the user scrolls within the table. Have a look at our
[advanced example page](components/table/examples#advanced-table) of `p-table` component.

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
  <p-select-option value="718">
    <img src="assets/718.png" />
    718
  </p-select-option>
  <p-select-option value="911">
    <img src="assets/911.png" />
    911
  </p-select-option>
  <p-select-option value="taycan">
    <img src="assets/taycan.png" />
    Taycan
  </p-select-option>
  <p-select-option value="macan">
    <img src="assets/macan.png" />
    Macan
  </p-select-option>
  <p-select-option value="cayenne">
    <img src="assets/cayenne.png" />
    Cayenne
  </p-select-option>
  <p-select-option value="panamera">
    <img src="assets/panamera.png" />
    Panamera
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

  withOptgroups = `<p-select name="options" label="Some Label" value="a">
  <p-optgroup label="Some optgroup label 1">
    <p-select-option value="a">Option A</p-select-option>
    <p-select-option value="b">Option B</p-select-option>
    <p-select-option value="c">Option C</p-select-option>
    <p-select-option value="d">Option D</p-select-option>
    <p-select-option value="e">Option E</p-select-option>
    <p-select-option value="f">Option F</p-select-option>
  </p-optgroup>
  <p-optgroup label="Some optgroup label 2">
    <p-select-option value="g">Option G</p-select-option>
    <p-select-option value="h">Option H</p-select-option>
    <p-select-option value="i">Option I</p-select-option>
  </p-optgroup>
</p-select>
  `;

compact = `<p-select name="options" label="Some Label" value="a" compact="true">
  <p-select-option value="a">Option A</p-select-option>
  <p-select-option value="b">Option B</p-select-option>
  <p-select-option value="c">Option C</p-select-option>
  <p-select-option value="d">Option D</p-select-option>
  <p-select-option value="e">Option E</p-select-option>
  <p-select-option value="f">Option F</p-select-option>
</p-select>
  `;
 
  selectedValueControlled = 'Selected value: none';
  updateControlledExample(e) {
  console.log(e);
    this.selectedValueControlled = `Selected value: ${e.target.value || 'none'}`;
  }
}
</script>
