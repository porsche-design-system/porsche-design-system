# Switch

## Introduction

### Unchecked

<Playground>
  <template v-slot="slotProps">
    <p-switch name="some-name" value="some-value"></p-switch>
  </template>
</Playground>

### Checked

<Playground>
  <template v-slot="slotProps">
    <p-switch name="some-name" value="some-value" checked="true"></p-switch>
  </template>
</Playground>

---

### States

#### Disabled

<Playground :childElementLayout="{spacing: 'inline'}">
  <template v-slot="slotProps">
    <p-switch name="some-name" value="some-value" disabled="true"></p-switch>
    <p-switch name="some-name" value="some-value" checked="true" disabled="true"></p-switch>
  </template>
</Playground>