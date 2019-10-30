# Grid

The Porsche UI Kit grid system is based upon a standard 12 column responsive grid. Its main purpose is to provide a solid and flexible grid system for defining layout areas and page structures. It is not meant to function as a toolkit for layouting content blocks or components. Therefore the [Flex](#/web/components/layout/flex) component is the right choice.

### Grid size

Following example shows a standard grid implementation.  

<Playground :childElementLayout="{spacing: 'block-small'}">
  <p-grid class="example-grid">
    <p-grid-child size="12">12</p-grid-child>
  </p-grid>
  <p-grid v-for="n, index in 11" :key="index" class="example-grid">
    <p-grid-child :size="n">{{ n }}</p-grid-child>
    <p-grid-child :size="12 - n">{{ 12 - n }}</p-grid-child>
  </p-grid>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground>
  <p-grid class="example-grid">
    <p-grid-child size="{ base: 6, m: 2 }">A</p-grid-child>
    <p-grid-child size="{ base: 6, m: 10 }">B</p-grid-child>
  </p-grid>
</Playground>

---

### Grid offset

In some cases it can be necessary to indent columns. The grid gives basic indentions based on grid sizings.

<Playground :childElementLayout="{spacing: 'block-small'}">
  <p-grid v-for="n, index in 11" :key="index" class="example-grid">
    <p-grid-child :offset="n" :size="12 - n">{{ n }}</p-grid-child>
  </p-grid>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground>
  <p-grid class="example-grid">
    <p-grid-child offset="{ base: 6, m: 2 }" size="{ base: 6, m: 10 }">A</p-grid-child>
  </p-grid>
</Playground>

---

### Grid direction

In some cases it might be necessary to define or change direction of the columns/rows. Default is `row`. But `column` is also possible to set the columns vertically underneath each other. A change of the optical order can be achieved by setting `reverse`.

#### Row (default)

<Playground>
  <p-grid direction="row" class="example-grid">
    <p-grid-child size="4">A</p-grid-child>
    <p-grid-child size="4">B</p-grid-child>
    <p-grid-child size="4">C</p-grid-child>
  </p-grid>
</Playground>

#### Row reverse

<Playground>
  <p-grid direction="row-reverse" class="example-grid">
    <p-grid-child size="4">A</p-grid-child>
    <p-grid-child size="4">B</p-grid-child>
    <p-grid-child size="4">C</p-grid-child>
  </p-grid>
</Playground>

#### Column

<Playground>
  <p-grid direction="column" class="example-grid">
    <p-grid-child size="4">A</p-grid-child>
    <p-grid-child size="4">B</p-grid-child>
    <p-grid-child size="4">C</p-grid-child>
  </p-grid>
</Playground>

#### Column reverse

<Playground>
  <p-grid direction="column-reverse" class="example-grid">
    <p-grid-child size="4">A</p-grid-child>
    <p-grid-child size="4">B</p-grid-child>
    <p-grid-child size="4">C</p-grid-child>
  </p-grid>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground>
  <p-grid direction="{ base: 'column', m: 'row' }" class="example-grid">
    <p-grid-child size="{ base: 12, m: 4 }">A</p-grid-child>
    <p-grid-child size="{ base: 12, m: 4 }">B</p-grid-child>
    <p-grid-child size="{ base: 12, m: 4 }">C</p-grid-child>
  </p-grid>
</Playground>

---

### Grid nesting

Basic nesting of grids is supported. "Basic" because of percentage value of width and gutter which couldn't be calculated for each column width. Here are some examples of "do's" and "don'ts":

<Playground>
  <p-grid>
    <p-grid-child size="6">
      <p-grid class="example-grid">
        <p-grid-child size="6">A</p-grid-child>
        <p-grid-child size="6">B</p-grid-child>
      </p-grid>
    </p-grid-child>
    <p-grid-child size="6">
      <p-grid class="example-grid">
        <p-grid-child size="4">A</p-grid-child>
        <p-grid-child size="8">B</p-grid-child>
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

<style scoped lang="scss">
  @import '~@porsche-ui/ui-kit-scss-utils/index';
  
  .example-grid > * {
    @include p-text-copy;
    color: $p-color-porsche-light;
    text-align: center;
    background: lightskyblue;
    background-clip: content-box;
    
    &[offset] {
      color: lightskyblue;
      text-indent: calc(-100% - 48px);
    }
  }
</style>