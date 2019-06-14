import { Example } from "../../../src/components/example/Example"

# Text Link

## Introduction
The Text-link component is used to show a linkable icon/textlink combination. It should only be used for linking between pages.

### Basic example

<Playground>
  <template v-slot="slotProps">
    <p-text-link href="https://ui.porsche.com" :theme="slotProps.theme">Lorem ipsum dolor</p-text-link>
  </template>
</Playground>

---

### Sizes
All sizes of generic Text component are available. See property table for possible values.

<Playground>
  <template v-slot="slotProps">
    <p-text-link href="https://ui.porsche.com" type="60" :theme="slotProps.theme">Lorem ipsum dolor</p-text-link>
    <p-text-link href="https://ui.porsche.com" type="60-thin" :theme="slotProps.theme">Lorem ipsum dolor</p-text-link>
  </template>
</Playground>

---

### Specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property.
If you need to link to another icon hosted somewhere else, just set the whole icon path to thge `icon` prop.

<Playground>
  <template v-slot="slotProps">
    <p-text-link href="https://ui.porsche.com" type="20" icon="arrow-left-hair" :theme="slotProps.theme">Lorem ipsum dolor</p-text-link>
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