# Fieldset

The **Fieldset** is a grouping component for wrapping contextual associated form elements. 
Its visible part is an HTML *legend* element, which can be seen like a headline for describing the meaning of a form block.
You can see some usage examples on our [form patterns section](/patterns/forms#resources).

## Basic example with label

<Playground :markup="withLabel"></Playground>

--- 

## Without label

<Playground :markup="withoutLabel"></Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    withLabel =
`<p-fieldset-wrapper label="Some legend label">
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
</p-fieldset-wrapper>`;

    withoutLabel =
`<p-fieldset-wrapper>
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
</p-fieldset-wrapper>`;
  }
</script>