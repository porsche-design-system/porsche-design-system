# Textarea

## Introduction

### Without value

<Playground>
  <p-textarea name="some-name" label="Some label"></p-textarea>
</Playground>

### With value

<Playground>
  <p-textarea name="some-name" value="Some value" label="Some label"></p-textarea>
</Playground>

---

### States

#### Disabled

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-textarea name="some-name" label="Some label" disabled="true"></p-textarea>
  <p-textarea name="some-name" value="Some value" label="Some label" disabled="true"></p-textarea>
</Playground>

#### Error

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-textarea name="some-name" label="Some label" error="true"></p-textarea>
  <p-textarea name="some-name" value="Some value" label="Some label" error="true"></p-textarea>
</Playground>

#### Disabled + Error

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-textarea name="some-name" label="Some label" disabled="true" error="true"></p-textarea>
  <p-textarea name="some-name" value="Some value" label="Some label" disabled="true" error="true"></p-textarea>
</Playground>

---

### Edge Cases

Visualization of edge cases

#### Long text

<Playground>
  <p-textarea name="some-name" value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." label="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."></p-textarea>
</Playground>
