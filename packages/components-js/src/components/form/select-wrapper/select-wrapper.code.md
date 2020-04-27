# Select

The **Select Wrapper** component supports the element `<select>`.

A `label` is a caption which informs the user what information a particular form field is asking for. The **Select Wrapper** component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.  

## Basic example

<Playground>
  <template #configurator>
    <select v-model="label">
      <option disabled>Select a label mode</option>
      <option selected value="show">With label</option>
      <option value="hide">Without label</option>
      <option value="responsive">Responsive</option>
    </select>
  </template>
  <template>
    <p-select-wrapper label="Some label" :hide-label="label === 'hide' ? 'true' : label === 'responsive' ? '{ base: true, l: false }' : 'false'">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>
  </template>
</Playground>

---

## Disabled

<Playground>
  <p-select-wrapper label="Some label">
    <select name="some-name" disabled="disabled">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </select>
  </p-select-wrapper>
</Playground>

---

## Custom

<Playground>
  <p-select-wrapper label="Some label" variant="custom">
    <select name="some-name">
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </select>
  </p-select-wrapper>
</Playground>

--- 

## Validation states

The **Select Wrapper** component supports the visualisation of inline validation.

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
    <p-select-wrapper label="Some label" :state="state" :message="state !== 'none' ? `Some ${state} validation message.` : ''">
      <select name="some-name" :aria-invalid="state === 'error'">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>
  </template>
</Playground>

---

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).
For named slots only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed.

<Playground>
  <template>
    <p-select-wrapper state="error">
      <span slot="label">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <select name="some-name" aria-invalid="true">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
      <span slot="message">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
    </p-select-wrapper>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundSelectWrapper extends Vue {
    public label: string = 'show';
    public state: string = 'error';
  }
</script>