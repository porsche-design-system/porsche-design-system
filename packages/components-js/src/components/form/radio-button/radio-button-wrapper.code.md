# Radio Button

The **Radio Button Wrapper** component supports input type `radio`.

A `label` is a caption which informs the user what information a particular form field is asking for. The **Radio Button Wrapper** component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.  

## Basic example

### With label

<Playground :childElementLayout="{spacing: 'inline'}">    
  <p-radio-button-wrapper label="Some label">
    <input type="radio" name="some-name-ex-1"/>
  </p-radio-button-wrapper>
  <p-radio-button-wrapper label="Some label">
    <input type="radio" name="some-name-ex-1" checked="checked"/>
  </p-radio-button-wrapper>
</Playground>

### Without label

<Playground :childElementLayout="{spacing: 'inline'}">    
  <p-radio-button-wrapper label="Some label" hide-label="true">
    <input type="radio" name="some-name-ex-2"/>
  </p-radio-button-wrapper>
  <p-radio-button-wrapper label="Some label" hide-label="true">
    <input type="radio" name="some-name-ex-2" checked="checked"/>
  </p-radio-button-wrapper>
</Playground>

### Responsive

<Playground :childElementLayout="{spacing: 'inline'}"> 
  <p-radio-button-wrapper label="Some label" hide-label="{ base: true, l: false }">
    <input type="radio" name="some-name-ex-3"/>
  </p-radio-button-wrapper>
  <p-radio-button-wrapper label="Some label" hide-label="{ base: true, l: false }">
    <input type="radio" name="some-name-ex-3" checked="checked"/>
  </p-radio-button-wrapper>
</Playground>

---

## Disabled

<Playground :childElementLayout="{spacing: 'inline'}">    
  <p-radio-button-wrapper label="Some label">
    <input type="radio" name="some-name-ex-4" disabled="disabled"/>
  </p-radio-button-wrapper>
  <p-radio-button-wrapper label="Some label">
    <input type="radio" name="some-name-ex-4" checked="checked" disabled="disabled"/>
  </p-radio-button-wrapper>
</Playground>

---

## Validation states

The **Radio Button Wrapper** component supports the visualisation of inline validation with the usage of `p-text. The `radio` element is colored and visible/hidden depending on the defined `state`.

<Playground>
  <template #configurator>
    <select v-model="state">
      <option disabled>Select a validation state</option>
      <option value="error">Error</option>
      <option value="none">None</option>
    </select>
  </template>
  <template>
    <p-radio-button-wrapper label="Some label" :state="state">
      <input type="radio" name="some-name-ex-5" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper label="Some label" :state="state" :message="state !== 'none' ? `Some ${state} validation message.` : ''">
      <input type="radio" name="some-name-ex-5" />
    </p-radio-button-wrapper>
  </template>
</Playground>

---

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).

<Playground>
  <template>
    <p-radio-button-wrapper state="error">
      <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <input type="radio" name="some-name-ex-6" />
    </p-radio-button-wrapper>
    <p-radio-button-wrapper state="error">
      <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <input type="radio" name="some-name-ex-6" />
      <span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
    </p-radio-button-wrapper>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundRadioButtonWrapper extends Vue {
    public state: string = 'error';
  }
</script>