<ComponentHeading name="Checkbox"></ComponentHeading>

The `p-checkbox` component wraps the native HTML input type `checkbox` form element. Checking one box doesn't uncheck
other Checkboxes. By default, Checkboxes are not selected.

A `label` is a caption which informs the user what information a particular form field is asking for. The `p-checkbox`
component can be used with or without a label, but it's recommended to keep the label visible for better accessibility
whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.

<Notification heading="Attention" heading-tag="h2" state="warning">
When the <code>p-checkbox</code> component is used within a form, it utilizes the
<a href="https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals">ElementInternals</a> API, which has limited
browser support. For broader browser compatibility, consider using a
<a href="components/checkbox/examples#controlled">controlled</a> approach instead.
</Notification>

<TableOfContents></TableOfContents>

## Basic example

<Playground :markup="hideLabelMarkup" :config="config">
  <PlaygroundSelect v-model="hideLabel" :values="hideLabels" name="hideLabel"></PlaygroundSelect>
</Playground>

## Indeterminate

Mask the visual appearance of a checkbox which has a state in-between checked and unchecked.  
This is especially useful for a checkbox that is used to set the state of a group of checkboxes at once. However, this
group might have a mixed state. In this case we recommend to use `checked=false` and `indeterminate=true`.

**Note: The `indeterminate` attribute only affects how the checkbox is shown. The current value is hidden from the user,
but the checkbox still keeps it's `checked` state. You can find more details in
[the specification](https://w3.org/TR/html52/sec-forms.html#dom-htmlinputelement-indeterminate).**

<Playground :markup="indeterminate" :config="config"></Playground>

## Required

<Playground :markup="required" :config="config"></Playground>

## Disabled

<Playground :markup="disabled" :config="config"></Playground>

### <A11yIcon></A11yIcon> Accessibility hints

In general, you should **prevent** using the `disabled="true"` state. Disabled elements are not reachable (focusable)
anymore and can be missed by screen reader users. They can be confusing for sighted users as well by not pointing out
why these elements are disabled. A good practice when to use the disabled state is during **form submission** to prevent
changes while this process is performed.

## Loading

<Notification heading="Attention" heading-tag="h3" state="warning">
  The <code>loading</code> prop is experimental and might be removed in a future release.
</Notification>

<Playground :markup="loading" :config="config"></Playground>

## Validation states

The `p-checkbox` component supports the visualisation of inline validation. The `message` and `checkbox` is colored and
visible/hidden depending on the defined `state`.

<Playground :markup="stateMarkup" :config="config">
  <PlaygroundSelect v-model="state" :values="states" name="state"></PlaygroundSelect>
</Playground>

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore, a named slot
can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used
(because a property definition is preferred over a named slot). For named slots only
[phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is
allowed.

<Playground :markup="slots" :config="config"></Playground>

## Form

The `p-checkbox` component is a form-associated custom element that integrates seamlessly with forms. Leveraging the
[ElementInternals](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) API, it functions like a native
checkbox, ensuring compatibility with form behaviors. However, note that browser support for this API is limited. At
present, the component only supports including the checkbox value in the `FormData` object during form submission and
resetting the form. Native form validation features are not yet supported.

<Playground :frameworkMarkup="formExample" :config="{ ...config, withoutDemo: true }">
  <form @submit.prevent="onSubmit">
    <p-checkbox name="some-name" label="Some Label" :theme="theme" value="some-value" checked/>
    <br>
    <PlaygroundButton name="Submit" type="submit"></PlaygroundButton>
    <p-text :theme="theme" style="display: inline-block;">{{ selectedValueForm }}</p-text>
  </form>
</Playground>

## Controlled

In the controlled approach, the `p-checkbox` value is externally managed. While the internal value will be updated
automatically, you can use the `update` event to update the external state.

<Playground :frameworkMarkup="controlledExample" :config="{ ...config, withoutDemo: true }">
<p-checkbox name="some-name" label="Some Label" value="some-value" :theme="theme" @update="updateControlledExample"></p-checkbox>
<br>
<p-text :theme="theme">{{ selectedValueControlled }}</p-text>
</Playground>

<script lang="ts">
import Vue from 'vue';
import {getCheckboxCodeSamples} from "shared/src";
import Component from 'vue-class-component';
import { FORM_STATES } from '../../utils'; 

@Component
export default class Code extends Vue {
  config = { themeable: true, spacing: 'block' };

  get theme(): Theme {
    return this.$store.getters.playgroundTheme;
  }

  hideLabel = false;
  hideLabels = [false, true, '{ base: true, l: false }'];
  get hideLabelMarkup() {
    return `<p-checkbox label="Some label" hide-label="${this.hideLabel}" name="some-name">
</p-checkbox>
<p-checkbox label="Some label" hide-label="${this.hideLabel}" name="some-name" checked>
</p-checkbox>`;
  }

  indeterminate =
`<p-checkbox label="Some label" indeterminate>
</p-checkbox>
<p-checkbox label="Some label" name="some-name" indeterminate checked>
</p-checkbox>`;

  formExample = getCheckboxCodeSamples('default');
  controlledExample = getCheckboxCodeSamples('example-controlled');

  required =
`<p-checkbox label="Some label" name="some-name" required>
</p-checkbox>
<p-checkbox label="Some label" name="some-name" required checked>
</p-checkbox>`;

  disabled =
`<p-checkbox label="Some label" name="some-name" disabled></p-checkbox>
<p-checkbox label="Some label" name="some-name" disabled checked></p-checkbox>`;

  isLoading = true;
  get loading() {
    return `<p-checkbox label="Some label" loading="${this.isLoading}" name="some-name">
</p-checkbox>
<p-checkbox label="Some label" loading="${this.isLoading}" name="some-name" checked>
</p-checkbox>`;
  }


  state = 'error';
  states = FORM_STATES;
  get stateMarkup() {
    const message = this.state !== 'none' ? `Some ${this.state} validation message.` : ''; 
    return `<p-checkbox label="Some label" state="${this.state}" message="${message}" name="some-name">
</p-checkbox>`;
  }

  slots =
`<p-checkbox state="error" name="some-name" aria-labelledby="some-label-id" aria-describedby="some-message-id">
  <span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
  <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
</p-checkbox>`;

  selectedValueForm = 'Last submitted data: ';
  onSubmit(e) {
    const formData = new FormData(e.target);
    this.selectedValueForm = `Last submitted data: ${
      Array.from(formData.entries(), ([_, value]) => value)
        .join('')
    }`;
  }

  selectedValueControlled = 'Selected value: ';
  updateControlledExample(e) {
    this.selectedValueControlled = `Selected value: ${e.detail.checked ? e.detail.value : ''}`;
  }
}
</script>
