# Checkbox

The **Checkbox Wrapper** component is a styling wrapper for the native HTML input type `checkbox` form element.

A `label` is a caption which informs the user what information a particular form field is asking for. The **Checkbox Wrapper** component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.  

## Basic example

<Playground :childElementLayout="{spacing: 'block'}">
  <template #configurator>
    <select v-model="label">
      <option selected value="show">With label</option>
      <option value="hide">Without label</option>
      <option value="responsive">Responsive</option>
    </select>
  </template>
  <template>
    <p-checkbox-wrapper label="Some label" :hide-label="label === 'hide' ? 'true' : label === 'responsive' ? '{ base: true, l: false }' : 'false'">
      <input type="checkbox" name="some-name"/>
    </p-checkbox-wrapper>
    <p-checkbox-wrapper label="Some label" :hide-label="label === 'hide' ? 'true' : label === 'responsive' ? '{ base: true, l: false }' : 'false'">
      <input type="checkbox" name="some-name" checked="checked"/>
    </p-checkbox-wrapper>
  </template>
</Playground>

---

## Indeterminate

Mask the visual appearance of a checkbox which has a state in-between checked and unchecked.  
This is especially useful for a checkbox that is used to set the state of a group of checkboxes
at once. However this group might have a mixed state. In this case we recommend to use `checked=false`
and `indeterminate=true`.

**Note: The `indeterminate` attribute can only be set through the DOM node.
There is no HTML attribute to set it. Also it's worth to know, that the `indeterminate` attribute
only affects how the checkbox is shown. The current value is hidden from the user, but the
checkbox still keeps it's `checked` state. You can find more details in [the specification](https://www.w3.org/TR/html52/sec-forms.html#dom-htmlinputelement-indeterminate).**

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-checkbox-wrapper label="Some label">
    <input type="checkbox" name="some-name" class="example-set-to-indeterminate" />
  </p-checkbox-wrapper>
  <p-checkbox-wrapper label="Some label" indeterminate="true">
    <input type="checkbox" name="some-name" class="example-set-to-indeterminate" checked="checked"/>
  </p-checkbox-wrapper>
</Playground>

---

## Disabled

<Playground :childElementLayout="{spacing: 'inline'}">    
  <p-checkbox-wrapper label="Some label">
    <input type="checkbox" name="some-name" disabled="disabled"/>
  </p-checkbox-wrapper>
  <p-checkbox-wrapper label="Some label">
    <input type="checkbox" name="some-name" checked="checked" disabled="disabled"/>
  </p-checkbox-wrapper>
</Playground>

---

## Validation states

The **Checkbox Wrapper** component supports the visualisation of inline validation. The `message` and `checkbox` is colored and visible/hidden depending on the defined `state`.

<Playground>
  <template #configurator>
    <select v-model="state">
      <option disabled>Select a validation state</option>
      <option value="error">Error</option>
      <option value="success">Success</option>
      <option value="none">None</option>
    </select>
  </template>
  <template>
    <p-checkbox-wrapper label="Some label" :state="state" :message="state !== 'none' ? `Some ${state} validation message.` : ''">
      <input type="checkbox" name="some-name" />
    </p-checkbox-wrapper>
  </template>
</Playground>

---

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).
For named slots only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed.
Please make sure to set the corresponding **aria** attributes.

<Playground>
  <template>
    <p-checkbox-wrapper state="error">
      <span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <input type="checkbox" name="some-name" aria-labelledby="some-label-id" aria-describedby="some-message-id" />
      <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
    </p-checkbox-wrapper>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundCheckboxWrapper extends Vue {
    public state: string = 'error';
    public label: string = 'show';
    
    mounted() {
      this.$nextTick(function () {
        const inputs = document.querySelectorAll('.example-set-to-indeterminate');
        inputs.forEach(input => {
          input.indeterminate = true;
        });
      });
    }
  }
</script>