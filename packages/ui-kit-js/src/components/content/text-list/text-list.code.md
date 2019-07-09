# Text list

## Introduction
Text lists are used to display listed data in form of a unordered or ordered list.

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
