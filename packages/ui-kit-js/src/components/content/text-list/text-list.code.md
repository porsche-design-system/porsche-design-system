# Text List

Text lists are used to display listed data in form of an unordered or ordered list. A list depends on two parts (like any native HTML list): A list wrapper which defines the type of the list (unordered or ordered) and the list items. Nesting is also provided and follows the same nesting rules like native HTML lists.

## Type

### Unordered

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text-list :theme="theme">
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
      <p-text-list-item>
        Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong text</strong>
        <p-text-list :theme="theme">
          <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
          <p-text-list-item>Lorem ipsum</p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    </p-text-list>
  </template>
</Playground>

### Ordered 

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text-list :theme="theme" list-type="ordered">
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
      <p-text-list-item>
        Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong text</strong>
        <p-text-list :theme="theme" list-type="ordered">
          <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
          <p-text-list-item>Lorem ipsum</p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    </p-text-list>
  </template>
</Playground>

---

## Color
Predefined colors associated with its theme are available but also inherit mode can be used to define a custom color.

<Playground :themeable="true">
  <template #configurator>
    <select @change="color = $event.target.value">
      <option disabled>Select a color</option>
      <option value="default" selected>Default</option>
      <option value="neutral-1">Neutral 1</option>
      <option value="neutral-2">Neutral 2</option>
      <option value="neutral-3">Neutral 3</option>
      <option value="inherit">Inherit</option>
    </select>
  </template>
  <template v-slot="{theme}">
    <p-text-list :theme="theme" :color="color" :style="isInheritColor">
      <p-text-list-item>Some list item</p-text-list-item>
      <p-text-list-item>Some list item</p-text-list-item>
      <p-text-list-item>Some list item</p-text-list-item>
    </p-text-list>
  </template>
</Playground>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundTypography extends Vue {
    public color: string = 'default';
    
    public get isInheritColor() {
      return this.color === 'inherit' ? 'color: deeppink' : undefined;
    }
  }
</script>
