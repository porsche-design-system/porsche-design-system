import { Example } from "../../../src/components/example/Example"

# Textarea

## Introduction

### Without value

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-textarea name="some-name" label="Some label"></p-textarea>
  </template>
</Playground>

### With value

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-textarea name="some-name" value="Some value" label="Some label"></p-textarea>
  </template>
</Playground>

---

### States

#### Disabled

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-textarea name="some-name" label="Some label" disabled="true"></p-textarea>
    <p-textarea name="some-name" value="Some value" label="Some label" disabled="true"></p-textarea>
  </template>
</Playground>

#### Error

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-textarea name="some-name" label="Some label" error="true"></p-textarea>
    <p-textarea name="some-name" value="Some value" label="Some label" error="true"></p-textarea>
  </template>
</Playground>

#### Disabled + Error

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-textarea name="some-name" label="Some label" disabled="true" error="true"></p-textarea>
    <p-textarea name="some-name" value="Some value" label="Some label" disabled="true" error="true"></p-textarea>
  </template>
</Playground>

---

### Edge Cases

Visualization of edge cases

#### Long text

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-textarea name="some-name" value="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua." label="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."></p-textarea>
  </template>
</Playground>

<script>
  import Playground from '@/components/Playground.vue';

  export default {
    components: {
      Playground
    }
  }
</script>
