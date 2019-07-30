# Switch

## Introduction

### Unchecked

<Playground>
  <p-switch name="some-name" value="some-value"></p-switch>
</Playground>

### Checked

<Playground>
  <p-switch name="some-name" value="some-value" checked="true"></p-switch>
</Playground>

---

### States

#### Disabled

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-switch name="some-name" value="some-value" disabled="true"></p-switch>
  <p-switch name="some-name" value="some-value" checked="true" disabled="true"></p-switch>
</Playground>