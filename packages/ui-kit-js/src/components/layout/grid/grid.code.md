# Grid

## Introduction

The Porsche UI Kit grid system is based upon a standard 12 column responsive grid. Its main purpose is to provide a solid and flexible grid system for defining layout areas and page structures. It is not ment to function as a toolkit for layouting content blocks or components. Therefore the [Flex](#/layout/flex) component is the right choice.

### Grid standard

For standard grid implementation, it is recommended to use this pattern. The class `grid` on the parent and `grid__child` on the children are mandatory. With `grid__child--size-(1-12)` it is possible to define column widths.

<Playground :childElementLayout="{spacing: 'block-small'}">
  <p-grid>
    <p-grid-child size="12">
      <ExampleText>12</ExampleText>
    </p-grid-child>
  </p-grid>
  <p-grid v-for="n, index in 11" :key="index">
    <p-grid-child :size="n">
      <ExampleText>{{ n }}</ExampleText>
    </p-grid-child>
    <p-grid-child :size="12 - n">
      <ExampleText>{{ 12 - n }}</ExampleText>
    </p-grid-child>
  </p-grid>
</Playground>

---

### Grid offset

In some cases it can be neccessary to indent columns. The grid gives basic indentions based on grid sizings. The child column has an offset of 1 column on the left and due to its length of 10 columns an offset of 1 column to the right. With `grid__child--offset-(0-11)` it is possible to define offsets.

<Playground :childElementLayout="{spacing: 'block-small'}">
  <p-grid v-for="n, index in 11" :key="index">
    <p-grid-child :offset="n" :size="12 - n">
      <ExampleText>{{ n }}</ExampleText>
    </p-grid-child>
  </p-grid>
</Playground>

---

### Grid direction

In some cases it might be neccessary to define or change direction of the columns/rows. Default is `row`. But `column` is also possible to set the columns vertically underneath each other. Changing optical order can be achieved by setting `reverse`.

#### Row (default)

<Playground>
  <p-grid direction="row">
    <p-grid-child size="4">
      <ExampleText>1</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>2</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>3</ExampleText>
    </p-grid-child>
  </p-grid>
</Playground>

#### Row reverse

<Playground>
  <p-grid direction="row-reverse">
    <p-grid-child size="4">
      <ExampleText>1</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>2</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>3</ExampleText>
    </p-grid-child>
  </p-grid>
</Playground>

#### Column

<Playground>
  <p-grid direction="column">
    <p-grid-child size="4">
      <ExampleText>1</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>2</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>3</ExampleText>
    </p-grid-child>
  </p-grid>
</Playground>

#### Column reverse

<Playground>
  <p-grid direction="column-reverse">
    <p-grid-child size="4">
      <ExampleText>1</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>2</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>3</ExampleText>
    </p-grid-child>
  </p-grid>
</Playground>

---

### Grid gap

In some cases it might be useful to adapt the gap of the grid. Default is `normal`. But `zero` is also possible to place elements besides each other without spacings.

#### Normal (default)

<Playground>
  <p-grid gap="normal">
    <p-grid-child size="4">
      <ExampleText>1</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>2</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>3</ExampleText>
    </p-grid-child>
  </p-grid>
</Playground>

#### Zero

<Playground>
  <p-grid gap="zero">
    <p-grid-child size="4">
      <ExampleText>1</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>2</ExampleText>
    </p-grid-child>
    <p-grid-child size="4">
      <ExampleText>3</ExampleText>
    </p-grid-child>
  </p-grid>
</Playground>

---

### Grid nesting

Basic nesting of grids is supported. "Basic" because of percentage value of width and gaps which couldn't be calculated for each column width. Here are some examples of "dos" and "don'ts":

<Playground>
  <p-grid>
    <p-grid-child size="6">
      <p-grid>
        <p-grid-child size="6">
          <ExampleText>1</ExampleText>
        </p-grid-child>
        <p-grid-child size="6">
          <ExampleText>2</ExampleText>
        </p-grid-child>
      </p-grid>
    </p-grid-child>
    <p-grid-child size="6">
      <p-grid>
        <p-grid-child size="4">
          <ExampleText>1</ExampleText>
        </p-grid-child>
        <p-grid-child size="8">
          <ExampleText>2</ExampleText>
        </p-grid-child>
      </p-grid>
    </p-grid-child>
  </p-grid>
</Playground>

#### Possible nesting by keeping columns in "the grid"

Only columns with the following widths could be nested:

* total width of 8
* total width of 6
* total width of 4

#### Forbidden nesting

Nesting inside columns with the following widths should be prevented, because all children widths won't be in "the grid" anymore:

* total width of 11
* total width of 10
* total width of 9
* total width of 7
* total width of 5
* total width of 3

---

### Grid responsive

The grid system is fluid/responsive by itself by using percentages for every value (widths, gaps, offsets). But it can also provide breakpoint specific values to fit the needs of certain viewports:

<Playground>
  <p-grid gap='{"base": "normal", "s": "zero", "m": "normal"}'>
    <p-grid-child size='{"base": 12, "m": 4, "l": 3}' offset='{"base": 0, "m": 2, "l": 0}'>
      <ExampleText>
        Column 1<br>
        xxs -- size: 12<br>
        s -- gap: zero<br>
        m -- gap: normal, size: 4, offset: 2<br>
        l -- size: 3, offset: 0
      </ExampleText>
    </p-grid-child>
    <p-grid-child size='{"base": 12, "s": 6, "m": 4, "l": 3}' offset='{"base": 0, "s": 3, "m": 0}'>
      <ExampleText>
        Column 2<br>
        xxs -- size: 12<br>
        s -- gap: zero, size: 6, offset: 3<br>
        m -- gap: normal, size: 4, offset: 0<br>
        l -- size: 3
      </ExampleText>
    </p-grid-child>
    <p-grid-child size='{"base": 12, "s": 6, "l": 3}'>
      <ExampleText>
        Column 3<br>
        xxs -- size: 12<br>
        s -- gap: zero, size: 6<br>
        m -- gap: normal<br>
        l -- size: 3
      </ExampleText>
    </p-grid-child>
    <p-grid-child size='{"base": 12, "s": 6, "l": 3}'>
      <ExampleText>
        Column 4<br>
        xxs -- size: 12<br>
        s -- gap: zero, size: 6<br>
        m -- gap: normal<br>
        l -- size: 3
      </ExampleText>
    </p-grid-child>
  </p-grid>
</Playground>

**Possible class names on the grid parent container (where {p} is the prefix and {bp} the breakpoint value):**
* `{p}-grid--direction-{direction}-{bp}` => direction of columns
* `{p}-grid--gap-{gap}-{bp}` => use of gaps between columns
* `{p}-grid__child--size-{size}-{bp}` => size based on amount of columns
* `{p}-grid__child--size-{offset}-{bp}` => offset based on amount of columns
