# Input

## Introduction

### Without value

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-input name="some-name" label="Some label"></p-input>
  </template>
</Playground>

### With value

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-input name="some-name" value="Some value" label="Some label"></p-input>
  </template>
</Playground>

---

### States

#### Disabled

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-input name="some-name" label="Some label" disabled="true"></p-input>
    <p-input name="some-name" value="Some value" label="Some label" disabled="true"></p-input>
  </template>
</Playground>

#### Error

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-input name="some-name" label="Some label" error="true"></p-input>
    <p-input name="some-name" value="Some value" label="Some label" error="true"></p-input>
  </template>
</Playground>

#### Disabled + Error

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-input name="some-name" label="Some label" disabled="true" error="true"></p-input>
    <p-input name="some-name" value="Some value" label="Some label" disabled="true" error="true"></p-input>
  </template>
</Playground>

---

### Variations

#### Text & Clear Button

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-input name="some-name" label="Some label" icon="close"></p-input>
    <p-input name="some-name" value="Some value" label="Some label" icon="close"></p-input>
    <p-input name="some-name" value="Some value" label="Disabled" icon="close" disabled="true"></p-input>
    <p-input name="some-name" value="Some value" label="Error" icon="close" error="true"></p-input>
    <p-input name="some-name" value="Some value" label="Disabled with an error" icon="close" disabled="true" error="true"></p-input>
  </template>
</Playground>

#### Password

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-input type="password" name="some-name" label="Some label" icon="eye"></p-input>
    <p-input type="password" name="some-name" value="Some value" label="Some label" icon="eye"></p-input>
    <p-input type="password" name="some-name" value="Some value" label="Disabled" icon="eye" disabled="true"></p-input>
    <p-input type="password" name="some-name" value="Some value" label="Error" icon="eye" error="true"></p-input>
    <p-input type="password" name="some-name" value="Some value" label="Disabled with an error" icon="eye" disabled="true" error="true"></p-input>
  </template>
</Playground>

#### Date

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-input type="date" name="some-name" label="Some label" icon="registration"></p-input>
    <p-input type="date" name="some-name" value="Some value" label="Some label" icon="registration"></p-input>
    <p-input type="date" name="some-name" value="Some value" label="Disabled" icon="registration" disabled="true"></p-input>
    <p-input type="date" name="some-name" value="Some value" label="Error" icon="registration" error="true"></p-input>
    <p-input type="date" name="some-name" value="Some value" label="Disabled with an error" icon="registration" disabled="true" error="true"></p-input>
  </template>
</Playground>

#### Time

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-input type="time" name="some-name" label="Some label" icon="timer-pcm"></p-input>
    <p-input type="time" name="some-name" value="Some value" label="Some label" icon="timer-pcm"></p-input>
    <p-input type="time" name="some-name" value="Some value" label="Disabled" icon="timer-pcm" disabled="true"></p-input>
    <p-input type="time" name="some-name" value="Some value" label="Error" icon="timer-pcm" error="true"></p-input>
    <p-input type="time" name="some-name" value="Some value" label="Disabled with an error" icon="timer-pcm" disabled="true" error="true"></p-input>
  </template>
</Playground>

#### Number

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-input type="number" name="some-name" label="Some label"></p-input>
    <p-input type="number" name="some-name" value="123" label="Some label"></p-input>
    <p-input type="number" name="some-name" value="123" label="Disabled" disabled="true"></p-input>
    <p-input type="number" name="some-name" value="123" label="Error" error="true"></p-input>
    <p-input type="number" name="some-name" value="123" label="Disabled with an error" disabled="true" error="true"></p-input>
  </template>
</Playground>

---

### Edge Cases

Visualization of edge cases

#### Long text

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-input name="some-name" value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." label="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."></p-input>
  </template>
</Playground>