# Radio Button

The **Radio Button Wrapper** component is a styling wrapper for the native HTML input type `radio` form element.

A `label` is a caption which informs the user what information a particular form field is asking for. The **Radio Button Wrapper** component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.  

## Basic examples

<Playground :childElementLayout="{spacing: 'block'}">
  <template #configurator>
    <select v-model="label">
      <option selected value="show">With label</option>
      <option value="hide">Without label</option>
      <option value="responsive">Responsive</option>
    </select>
  </template>
  <template>
    <p-radio-button-wrapper label="Some label" :hide-label="label === 'hide' ? 'true' : label === 'responsive' ? '{ base: true, l: false }' : 'false'">
      <input type="radio" name="some-name-1" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" :hide-label="label === 'hide' ? 'true' : label === 'responsive' ? '{ base: true, l: false }' : 'false'">
      <input type="radio" name="some-name-1" />
    </p-radio-button-wrapper>
  </template>
</Playground>

---

## Disabled

<Playground :childElementLayout="{spacing: 'block'}">    
  <p-radio-button-wrapper label="Some label">
    <input type="radio" name="some-name-4" disabled="true"/>
  </p-radio-button-wrapper>
  <p-radio-button-wrapper label="Some label">
    <input type="radio" name="some-name-4" checked="true" disabled="true"/>
  </p-radio-button-wrapper>
</Playground>

---

## Validation states

The **Radio Button Wrapper** component supports the visualisation of inline validation. The `message` and `radio` is colored and visible/hidden depending on the defined `state`.

<Playground :childElementLayout="{spacing: 'block'}">
  <template #configurator>
    <select v-model="state">
      <option disabled>Select a validation state</option>
      <option value="error">Error</option>
      <option value="success">Success</option>
      <option value="none">None</option>
    </select>
  </template>
  <template>
    <p-radio-button-wrapper label="Some label" :state="state">
      <input type="radio" name="some-name-5" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" :state="state" :message="state !== 'none' ? `Some ${state} validation message.` : ''">
      <input type="radio" name="some-name-5" />
    </p-radio-button-wrapper>
  </template>
</Playground>

---

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).
For named slots only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed.
Please make sure to set the corresponding **aria** attributes. 

<Playground :childElementLayout="{spacing: 'block'}">
  <template>
    <p-radio-button-wrapper state="error">
      <span slot="label" id="some-label-id-1">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <input type="radio" name="some-name-6" aria-labelledby="some-label-id-1" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper state="error">
      <span slot="label" id="some-label-id-2">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <input type="radio" name="some-name-6" aria-labelledby="some-label-id-2" aria-describedby="some-message-id" />
      <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
    </p-radio-button-wrapper>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundRadioButtonWrapper extends Vue {
    public state: string = 'error';
    public label: string = 'show';
  }
</script>
