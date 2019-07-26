# Text Link

## Introduction
The `<p-text-link>` component is used to show a linkable icon/textlink combination. It should only be used for linking between pages.

### Basic example

<Playground>
  <p-text-link href="https://ui.porsche.com">Some link with default icon</p-text-link>
</Playground>

---

### Sizes

<Playground>
  <template #configurator>
    <select @change="variant = $event.target.value">
      <option disabled>Select a style variant</option>
      <option>copy</option>
      <option>small</option>
      <option>12</option>
      <option>16</option>
      <option>18</option>
      <option>20</option>
      <option>24</option>
      <option>28</option>
      <option>30</option>
      <option>32</option>
      <option>36</option>
      <option>42</option>
      <option>44</option>
      <option>48</option>
      <option>52</option>
      <option>60</option>
      <option>62</option>
      <option>72</option>
      <option>84</option>
      <option selected>60-thin</option>
      <option>62-thin</option>
      <option>72-thin</option>
      <option>84-thin</option>
    </select>
  </template>
  <p-text-link href="https://ui.porsche.com" :variant="variant">Some link with default icon</p-text-link>
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
If another icon needs to be implemented, just replace the default icon with your new icon. Per default, all icons are fetched from the Porsche UI Kit CDN. Just choose an icon name from the `icon` property.
If you need to link to another icon hosted somewhere else, just set the whole icon path to the `icon` prop.

<Playground>
  <p-text-link href="https://ui.porsche.com" icon="delete">Some link with a custom icon</p-text-link>
</Playground>

---

### Usage with a framework specific router
In order to work properly with a framework specific router component it's necessary to render `<p-text-link>` with a `<span>` tag and wrap it with an `<a>` tag created by a framework specific router component.
Additionally it's necessary to add some styling information for the framework specific router link like in the following SCSS code block (SCSS variables are available in the Porsche UI SCSS Utility npm package).

```
a {
  text-decoration: none;
  
  // optional active state, class name depends on framework specific router
  .active {
    color: $p-color-porsche-red
  }
  
  &:focus {
    outline: 1px solid $p-color-state-focus;
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
    public variant: string = '60-thin';
  }
</script>

<style scoped lang="scss">
  @import '~@porscheui/ui-kit-js/src/styles/utility/index';

  a {
    text-decoration: none;
      
    &:focus {
      outline: 1px solid $p-color-state-focus;
      outline-offset: 4px;
    }
  }
</style>