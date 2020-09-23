# Spinner

Basic animated spinner to visualize loading states, e.g. page loading, form validation, etc.

## Size

There are predefined sizes for the component available which should cover most use cases. 
If a specific size is needed, the size can be set to `inherit` to specify the text size from outside.

<Playground :themeable="true">
  <template #configurator>
    <select @change="size = $event.target.value">
      <option disabled>Select a size</option>
      <option selected>small</option>
      <option>medium</option>
      <option>large</option>
      <option>inherit</option>
    </select>
  </template>
  <template v-slot={theme}>
    <p-spinner :size="size" :style="isInherit" :theme="theme" aria-label="Loading" />
  </template>
</Playground>

### Responsive

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="true">
  <template v-slot={theme}>
    <p-spinner size="{ base: 'small', l: 'medium' }" :theme="theme" aria-label="Loading" />
  </template>
</Playground>

---

## Technical notes

For automated visual regression tests the spinner animation can be disabled by setting a global css variable: 

```
:root {
  --p-animation-duration__spinner: 0s !important;
}
```

<script lang="ts">
  import Vue from 'vue';
import Component from 'vue-class-component';
  
  @Component
  export default class PlaygroundButtonPure extends Vue {
    public size: string = 'small';
    
    public get isInherit() {
      return this.size === 'inherit' ? 'width: 96px; height: 96px;' : undefined;
    }
  }
</script>
