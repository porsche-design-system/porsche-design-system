# Text Link

## Introduction
The `<p-text-link>` component is used to show a linkable icon-text-combination. 

### Basic example

<Playground>
  <p-text-link href="https://ui.porsche.com">Some link with default icon</p-text-link>
</Playground>

---

### Sizes

<Playground>
  <template #configurator>
    <select @change="size = $event.target.value">
      <option disabled>Select a style variant</option>
      <option>x-small</option>
      <option selected>small</option>
      <option>medium</option>
      <option>large</option>
      <option>x-large</option>
    </select>
  </template>
  <p-text-link href="https://ui.porsche.com" :size="size">Some link with default icon</p-text-link>
</Playground>

---

### Color

<Playground :childElementLayout="{spacing: 'inline'}">
  <p-text-link href="https://ui.porsche.com" color="porsche-black">Porsche Black</p-text-link>
  <p-text-link href="https://ui.porsche.com" color="porsche-light" style="background: black;">Porsche Light</p-text-link>
  <p-text-link href="https://ui.porsche.com" color="inherit" style="color: deeppink;">Inherited custom color</p-text-link>
</Playground>

---

### Target

<Playground :childElementLayout="{spacing: 'block'}">
  <p-text-link href="https://ui.porsche.com" target="self">Opens the linked document in the <b>same frame</b></p-text-link>
  <p-text-link href="https://ui.porsche.com" target="blank">Opens the linked document in a <b>new window</b> or <b>tab</b></p-text-link>
</Playground>

---

### Specific icon
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche Design System CDN. Just choose an icon name from the `icon` property.
If you need to link to another icon hosted somewhere else, just set the whole icon path to the `icon` prop.

<Playground>
  <p-text-link href="https://ui.porsche.com" icon="delete">Some link with a custom icon</p-text-link>
</Playground>

---

### Usage with a framework specific router
In order to work properly with a framework specific router component it's necessary to render `<p-text-link>` with a `<span>` tag and wrap it with an `<a>` tag created by a framework specific router component.
Additionally it's necessary to add some styling information for the framework specific router link like in the following SCSS code block (SCSS variables are available in the Porsche Design System SCSS Utility npm package).

```
a {
  text-decoration: none;
  
  // optional active state, class name depends on framework specific router
  .active {
    color: $p-color-theme-light-brand
  }
  
  &:focus {
    outline: 1px solid $p-color-theme-light-state-focus;
    outline-offset: 4px;
  }
}
```

<Playground>
  <a href="https://ui.porsche.com">
    <p-text-link tag="span">Some link wrapped by a JS framework specific router link component</p-text-link>
  </a>
</Playground>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTextLink extends Vue {
    public size: string = 'small';
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-ui/ui-kit-scss-utils/index';

  a {
    text-decoration: none;
      
    &:focus {
      outline: 1px solid $p-color-theme-light-state-focus;
      outline-offset: 4px;
    }
  }
</style>