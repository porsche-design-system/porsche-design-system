# Text list

## Introduction
Text lists are used to display listed data in form of an unordered or ordered list. A list depends on 2 parts (like any native HTML list): A list wrapper which defines the type of the list (unordered or ordered) and the list items. Nesting is also provided and follows the same nesting rules like native HTML lists.

## Lists

### Unordered list (default)

<Playground>
  <template v-slot="slotProps">
    <p-text-list>
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
      <p-text-list-item>
        Lorem ipsum
        <p-text-list>
          <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
          <p-text-list-item>Lorem ipsum</p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    </p-text-list>
  </template>
</Playground>

### Unordered list with different color

<Playground>
  <template v-slot="slotProps">
    <p-text-list color="porsche-red">
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
      <p-text-list-item>
        Lorem ipsum
        <p-text-list color="porsche-red">
          <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
          <p-text-list-item>Lorem ipsum</p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    </p-text-list>
  </template>
</Playground>

### Unordered list with bigger text size

<Playground>
  <template v-slot="slotProps">
    <p-text-list text-type="48">
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
      <p-text-list-item>
        Lorem ipsum
        <p-text-list text-type="48">
          <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
          <p-text-list-item>Lorem ipsum</p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    </p-text-list>
  </template>
</Playground>

---

### Ordered list 

<Playground>
  <template v-slot="slotProps">
    <p-text-list list-type="ordered">
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
      <p-text-list-item>
        Lorem ipsum
        <p-text-list list-type="ordered">
          <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
          <p-text-list-item>Lorem ipsum</p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    </p-text-list>
  </template>
</Playground>

### Ordered list with different color

<Playground>
  <template v-slot="slotProps">
    <p-text-list list-type="ordered" color="porsche-red">
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
      <p-text-list-item>
        Lorem ipsum
        <p-text-list list-type="ordered" color="porsche-red">
          <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
          <p-text-list-item>Lorem ipsum</p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    </p-text-list>
  </template>
</Playground>

### Ordered list with bigger text size

<Playground>
  <template v-slot="slotProps">
    <p-text-list list-type="ordered" text-type="48">
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
      <p-text-list-item>
        Lorem ipsum
        <p-text-list list-type="ordered" text-type="48">
          <p-text-list-item>Second level - Lorem ipsum dolor sit amet</p-text-list-item>
          <p-text-list-item>Lorem ipsum</p-text-list-item>
        </p-text-list>
      </p-text-list-item>
      <p-text-list-item>First level - Lorem ipsum dolor sit amet</p-text-list-item>
    </p-text-list>
  </template>
</Playground>
