# Text List

Text lists are used to display listed data in form of an unordered or ordered list. A list depends on two parts (like any native HTML list): A list wrapper which defines the type of the list (unordered or ordered) and the list items. Nesting is also provided and follows the same nesting rules like native HTML lists.

## Lists

### Unordered list

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

### Ordered list 

<Playground :themeable="true">
  <template v-slot="{theme}">
    <p-text-list list-type="ordered" :theme="theme">
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
      <p-text-list-item>
        Lorem ipsum dolor sit amet <a href="#">linked text</a> et, <b>bold text</b> &amp; <strong>strong text</strong>
        <p-text-list list-type="ordered" :theme="theme">
          <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
          <p-text-list-item>Lorem ipsum</p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    </p-text-list>
  </template>
</Playground>

---
