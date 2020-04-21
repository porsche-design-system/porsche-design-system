# Textarea

The **Textarea Wrapper** component represents a multi-line plain-text editing form element.

A `label` is a caption which informs the user what information a particular form field is asking for. The **Textarea Wrapper** component can be used with or without a label but it's recommended to keep the label visible for better accessibility whenever possible. When used without a label, it's best practice to provide a descriptive label text for screen readers.  

While a `placeholder` is optional but recommended to be set whenever bits of example content or hints shall be shown to give the user visual cues to fill out the form.

## Basic example

<Playground :childElementLayout="{spacing: 'block'}">
  <template #configurator>
    <select v-model="label">
      <option disabled>Select a label mode</option>
      <option selected value="show">With label</option>
      <option value="hide">Without label</option>
      <option value="responsive">Responsive</option>
    </select>
  </template>
  <template>
    <p-textarea-wrapper label="Some label" :hide-label="label === 'hide' ? 'true' : label === 'responsive' ? '{ base: true, l: false }' : 'false'">
      <textarea name="some-name"></textarea>
    </p-textarea-wrapper>
    <p-textarea-wrapper label="Some label" :hide-label="label === 'hide' ? 'true' : label === 'responsive' ? '{ base: true, l: false }' : 'false'">
      <textarea name="some-name" placeholder="Some placeholder text"></textarea>
    </p-textarea-wrapper>
  </template>
</Playground>

--- 

## With description text

A description text can be added to explain the meaning of a specific form field. It's meant to be a textual enhancement of the label text and is technically connected with the `hide-label` property.

<Playground>    
  <p-textarea-wrapper label="Some label" description="Some description">
    <textarea name="some-name"></textarea>
  </p-textarea-wrapper>
</Playground>

---

## Disabled

<Playground>    
  <p-textarea-wrapper label="Some label">
    <textarea name="some-name" disabled="disabled">Some value</textarea>
  </p-textarea-wrapper>
</Playground>

---

## Read only

<Playground>    
  <p-textarea-wrapper label="Some label">
    <textarea name="some-name" readonly="readonly">Some value</textarea>
  </p-textarea-wrapper>
</Playground>

---

## Validation states

The **Textarea Wrapper** component supports the visualisation of inline validation. 

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
    <p-textarea-wrapper label="Some label" :state="state" :message="state !== 'none' ? `Some ${state} validation message.` : ''">
      <textarea :aria-invalid="state === 'error'" name="some-name">Some value</textarea>
    </p-textarea-wrapper>
  </template>
</Playground>

---

## Slots

Sometimes it's useful to be able to render markup (e.g. an anchor tag) for `label` or `message`. Therefore a named slot can be used. Make sure **not** to define the corresponding property on the host element when a named slot is used (because a property definition is preferred over a named slot).
For named slots only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed.
Please make sure to set the corresponding **aria** attributes.

<Playground>
  <template>
    <p-textarea-wrapper state="error">
      <span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <span slot="description">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>
      <textarea name="some-name" aria-labelledby="some-label-id" aria-describedby="some-message-id"></textarea>
      <span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>
    </p-textarea-wrapper>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTextareaWrapper extends Vue {
    public label: string = 'show';
    public state: string = 'error';
  }
</script>