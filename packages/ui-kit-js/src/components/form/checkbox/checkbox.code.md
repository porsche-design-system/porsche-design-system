# Checkbox

## Introduction

### Unchecked

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-checkbox name="some-name" value="some-value">Some label</p-checkbox>
  </template>
</Playground>

### Checked

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-checkbox name="some-name" value="some-value" checked="true">Some label</p-checkbox>
  </template>
</Playground>

---

### States

#### Disabled

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-checkbox name="some-name" value="some-value" disabled="true">Unchecked</p-checkbox>
    <p-checkbox name="some-name" value="some-value" disabled="true" checked="true">Checked</p-checkbox>
  </template>
</Playground>

#### Error

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-checkbox name="some-name" value="some-value" error="true">Unchecked</p-checkbox>
    <p-checkbox name="some-name" value="some-value" error="true" checked="true">Checked</p-checkbox>
  </template>
</Playground>

#### Disabled + Error

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-checkbox name="some-name" value="some-value" disabled="true" error="true">Unchecked</p-checkbox>
    <p-checkbox name="some-name" value="some-value" disabled="true" error="true" checked="true">Checked</p-checkbox>
  </template>
</Playground>

---

### Variations

#### With icon

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-checkbox name="some-name" value="some-value">
      Unchecked <p-icon source="porsche-driving-experience"></p-icon> with an icon
    </p-checkbox>
    <p-checkbox name="some-name" value="some-value" checked="true">
      Checked <p-icon source="porsche-driving-experience"></p-icon> with an icon
    </p-checkbox>
    <p-checkbox name="some-name" value="some-value" disabled="true">
      Disabled <p-icon source="porsche-driving-experience"></p-icon> with an icon
    </p-checkbox>
    <p-checkbox name="some-name" value="some-value" error="true">
      Error <p-icon source="porsche-driving-experience"></p-icon> with an icon
    </p-checkbox>
    <p-checkbox name="some-name" value="some-value" disabled="true" error="true">
      Disabled with an error and <p-icon source="porsche-driving-experience"></p-icon> an icon
    </p-checkbox>
  </template>
</Playground>

#### With link

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-checkbox name="some-name" value="some-value">
      Unchecked <a href="#" target="_blank">with a link</a>
    </p-checkbox>
    <p-checkbox name="some-name" value="some-value" checked="true">
      Checked <a href="#" target="_blank">with a link</a>
    </p-checkbox>
    <p-checkbox name="some-name" value="some-value" disabled="true">
      Disabled <a href="#" target="_blank">with a link</a>
    </p-checkbox>
    <p-checkbox name="some-name" value="some-value" error="true">
      Error <a href="#" target="_blank">with a link</a>
    </p-checkbox>
    <p-checkbox name="some-name" value="some-value" disabled="true" error="true">
      Disabled with an error and <a href="#" target="_blank">a link</a>
    </p-checkbox>
  </template>
</Playground>

---

### Edge Cases

Visualization of edge cases

#### Long text

<Playground :themeable="false">
  <template v-slot="slotProps">
    <div style="max-width: 320px;">
      <p-checkbox name="some-name" value="some-value">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p-checkbox>
    </div>
  </template>
</Playground>
