import { Example } from "../../../src/components/example/Example"

# Switch

## Introduction

### Unchecked

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-switch name="some-name" value="some-value"></p-switch>
  </template>
</Playground>

### Checked

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-switch name="some-name" value="some-value" checked="true"></p-switch>
  </template>
</Playground>

---

### States

#### Disabled

<Playground :themeable="false">
  <template v-slot="slotProps">
    <p-switch name="some-name" value="some-value" disabled="true"></p-switch>
    <p-switch name="some-name" value="some-value" checked="true" disabled="true"></p-switch>
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