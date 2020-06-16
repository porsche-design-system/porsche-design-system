# Fieldset

The **Fieldset Wrapper** is a grouping component for wrapping contextual associated form elements. 
You can see some usage examples at our [form patterns section](#/patterns/forms#resources).

## Basic example (with form element context)

<Playground>
  <template>
    <p-fieldset-wrapper label="Some label">
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>
    </p-fieldset-wrapper>
  </template>
</Playground>
