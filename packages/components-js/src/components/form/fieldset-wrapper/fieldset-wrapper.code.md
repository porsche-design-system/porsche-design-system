# Fieldset

The **Fieldset Wrapper** is a grouping component for wrapping contextual associated form elements. 
His visible part is an HTML *legend* element, which can be seen like a headline for describing the form block.
You can see some usage examples on our [form patterns section](#/patterns/forms#resources).

## Basic example (with form element context)

<Playground>
  <template>
    <p-fieldset-wrapper label="Some legend label">
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>
    </p-fieldset-wrapper>
  </template>
</Playground>
