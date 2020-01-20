# Textfield

## Introduction


<Playground>
  <template>
    <p-textfield label="Some label">
      <input type="text" name="some-name" placeholder="Some placeholder text"/>
    </p-textfield>
  </template>
</Playground>


### Textfield with icon
<Playground>
  <template>
    <p-textfield label="Some label" icon="calender">
      <input type="text" name="some-name" placeholder="Some placeholder text"/>
    </p-textfield>
  </template>
</Playground>

### Textfield with error message
<Playground>
  <template>
    <p-textfield label="Some label" status="error" message="Your phone number is not valid.">
      <input type="number" name="some-name" value="01722345678" />
    </p-textfield>
  </template>
</Playground>

### Textfield with success message
<Playground>
  <template>
    <p-textfield label="Some label" status="success" message="Your phone number is valid.">
      <input type="number" name="some-name" value="01722345678" />
    </p-textfield>
  </template>
</Playground>