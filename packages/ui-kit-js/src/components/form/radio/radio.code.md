# Radio

## Introduction

### Unchecked

<Playground>
  <p-radio name="some-name" value="some-value">Some label</p-radio>
</Playground>

### Checked

<Playground>
  <p-radio name="some-name" value="some-value" checked="true">Some label</p-radio>
</Playground>

---

### States

#### Disabled

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-radio name="some-name" value="some-value" disabled="true">Unchecked</p-radio>
  <p-radio name="some-name" value="some-value" disabled="true" checked="true">Checked</p-radio>
</Playground>

#### Error

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-radio name="some-name" value="some-value" error="true">Unchecked</p-radio>
  <p-radio name="some-name" value="some-value" error="true" checked="true">Checked</p-radio>
</Playground>

#### Disabled + Error

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-radio name="some-name" value="some-value" disabled="true" error="true">Unchecked</p-radio>
  <p-radio name="some-name" value="some-value" disabled="true" error="true" checked="true">Checked</p-radio>
</Playground>

---

### Variations

#### With icon

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-radio name="some-name" value="some-value">
    Unchecked <p-icon source="porsche-driving-experience"></p-icon> with an icon
  </p-radio>
  <p-radio name="some-name" value="some-value" checked="true">
    Checked <p-icon source="porsche-driving-experience"></p-icon> with an icon
  </p-radio>
  <p-radio name="some-name" value="some-value" disabled="true">
    Disabled <p-icon source="porsche-driving-experience"></p-icon> with an icon
  </p-radio>
  <p-radio name="some-name" value="some-value" error="true">
    Error <p-icon source="porsche-driving-experience"></p-icon> with an icon
  </p-radio>
  <p-radio name="some-name" value="some-value" disabled="true" error="true">
    Disabled with an error and <p-icon source="porsche-driving-experience"></p-icon> an icon
  </p-radio>
</Playground>

#### With text

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-radio name="some-name" value="some-value">
    Unchecked <a href="#" target="_blank">with a link</a>
  </p-radio>
  <p-radio name="some-name" value="some-value" checked="true">
    Checked <a href="#" target="_blank">with a link</a>
  </p-radio>
  <p-radio name="some-name" value="some-value" disabled="true">
    Disabled <a href="#" target="_blank">with a link</a>
  </p-radio>
  <p-radio name="some-name" value="some-value" error="true">
    Error <a href="#" target="_blank">with a link</a>
  </p-radio>
  <p-radio name="some-name" value="some-value" disabled="true" error="true">
    Disabled with an error and <a href="#" target="_blank">a link</a>
  </p-radio>
</Playground>

---

### Edge Cases

Visualization of edge cases

#### Long text

<Playground>
  <div style="max-width: 320px;">
    <p-radio name="some-name" value="some-value">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p-radio>
  </div>
</Playground>
