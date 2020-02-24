# Radio Button

The **Radio Button Wrapper** component supports input type `radio`.

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
      <input type="radio" name="some-name-1" value="yes" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" :hide-label="label === 'hide' ? 'true' : label === 'responsive' ? '{ base: true, l: false }' : 'false'">
      <input type="radio" name="some-name-1" value="no" />
    </p-radio-button-wrapper>
  </template>
</Playground>

---

## Disabled

<Playground :childElementLayout="{spacing: 'block'}">    
  <p-radio-button-wrapper label="Some label">
    <input type="radio" name="some-name-4" value="yes" disabled="disabled"/>
  </p-radio-button-wrapper>
  <p-radio-button-wrapper label="Some label">
    <input type="radio" name="some-name-4" value="no" checked="checked" disabled="disabled"/>
  </p-radio-button-wrapper>
</Playground>

---

## Validation states

The **Radio Button Wrapper** component supports the visualisation of inline validation with the usage of `p-text`. The `radio` element is colored and visible/hidden depending on the defined `state`.

<Playground :childElementLayout="{spacing: 'block'}">
  <template #configurator>
    <select v-model="state">
      <option disabled>Select a validation state</option>
      <option value="error">Error</option>
      <option value="none">None</option>
    </select>
  </template>
  <template>
    <p-radio-button-wrapper label="Some label" :state="state">
      <input type="radio" name="some-name-5" value="yes" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" :state="state" :message="state !== 'none' ? `Some ${state} validation message.` : ''">
      <input type="radio" name="some-name-5" value="no" />
    </p-radio-button-wrapper>
  </template>
</Playground>

---

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).

<Playground :childElementLayout="{spacing: 'block'}">
  <template>
    <p-radio-button-wrapper state="error">
      <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <input type="radio" name="some-name-6" value="yes" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper state="error">
      <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <input type="radio" name="some-name-6" value="no" />
      <span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
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

<style lang="css">
  p-radio-button-wrapper {
    display: block;
  }
</style>