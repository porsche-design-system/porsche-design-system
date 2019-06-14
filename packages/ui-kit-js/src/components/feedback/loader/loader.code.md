import { Example } from "../../../src/components/example/Example"

# Loader

## Introduction
Basic animated loader to visualize loading states, e.g. page loading, form validation, etc. The Loader component sizes are predefined.

### X-small

<Playground>
  <template v-slot="slotProps">
    <p-loader size="x-small" :theme="slotProps.theme" />
  </template>
</Playground>

### Small

<Playground>
  <template v-slot="slotProps">
    <p-loader size="small" :theme="slotProps.theme" />
  </template>
</Playground>

### Medium

<Playground>
  <template v-slot="slotProps">
    <p-loader size="medium" :theme="slotProps.theme" />
  </template>
</Playground>

### Large

<Playground>
  <template v-slot="slotProps">
    <p-loader size="large" :theme="slotProps.theme" />
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