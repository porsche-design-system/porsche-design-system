# Grid

The Porsche Design System grid system is based upon a standard 12 column responsive grid. Its main purpose is to provide a solid and flexible grid system for defining layout areas and page structures. It is not meant to function as a toolkit for layouting content blocks or components. For this, the [Flex](#/components/layout/flex) component is the right choice.

In order to prevent horizontal scrolling and correct alignment it's recommended to use the **Grid** wrapped within [**Content Wrapper**](#/components/layout/content-wrapper).

### Grid size

Following example shows a standard grid implementation.  

<Playground :childElementLayout="{spacing: 'block-small'}">
  <p-grid class="example-grid">
    <p-grid-item size="12">12</p-grid-item>
  </p-grid>
  <p-grid v-for="n, index in 11" :key="index" class="example-grid">
    <p-grid-item :size="n">{{ n }}</p-grid-item>
    <p-grid-item :size="12 - n">{{ 12 - n }}</p-grid-item>
  </p-grid>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground>
  <p-grid class="example-grid">
    <p-grid-item size="{ base: 6, m: 2 }">A</p-grid-item>
    <p-grid-item size="{ base: 6, m: 10 }">B</p-grid-item>
  </p-grid>
</Playground>

---

### Grid offset

In some cases it can be necessary to indent columns. The grid gives basic indentions based on grid sizings.

<Playground :childElementLayout="{spacing: 'block-small'}">
  <p-grid v-for="n, index in 11" :key="index" class="example-grid">
    <p-grid-item :offset="n" :size="12 - n">{{ n }}</p-grid-item>
  </p-grid>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground>
  <p-grid class="example-grid">
    <p-grid-item offset="{ base: 6, m: 2 }" size="{ base: 6, m: 10 }">A</p-grid-item>
  </p-grid>
</Playground>

---

### Grid direction

In some cases it might be necessary to define or change direction of the columns/rows. The default setting is `row`. But `column` is also possible to set the columns vertically underneath each other. A change of the optical order can be achieved by setting `reverse`.

#### Row (default)

<Playground>
  <p-grid direction="row" class="example-grid">
    <p-grid-item size="4">A</p-grid-item>
    <p-grid-item size="4">B</p-grid-item>
    <p-grid-item size="4">C</p-grid-item>
  </p-grid>
</Playground>

#### Row reverse

<Playground>
  <p-grid direction="row-reverse" class="example-grid">
    <p-grid-item size="4">A</p-grid-item>
    <p-grid-item size="4">B</p-grid-item>
    <p-grid-item size="4">C</p-grid-item>
  </p-grid>
</Playground>

#### Column

<Playground>
  <p-grid direction="column" class="example-grid">
    <p-grid-item size="4">A</p-grid-item>
    <p-grid-item size="4">B</p-grid-item>
    <p-grid-item size="4">C</p-grid-item>
  </p-grid>
</Playground>

#### Column-reverse

<Playground>
  <p-grid direction="column-reverse" class="example-grid">
    <p-grid-item size="4">A</p-grid-item>
    <p-grid-item size="4">B</p-grid-item>
    <p-grid-item size="4">C</p-grid-item>
  </p-grid>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground>
  <p-grid direction="{ base: 'column', m: 'row' }" class="example-grid">
    <p-grid-item size="{ base: 12, m: 4 }">A</p-grid-item>
    <p-grid-item size="{ base: 12, m: 4 }">B</p-grid-item>
    <p-grid-item size="{ base: 12, m: 4 }">C</p-grid-item>
  </p-grid>
</Playground>

---

### Grid nesting

Basic nesting of grids is supported. "Basic" because of percentage value of width and gutter which couldn't be calculated for each column width. Here are some examples of "do's" and "don'ts":

<Playground>
  <p-grid>
    <p-grid-item size="6">
      <p-grid class="example-grid">
        <p-grid-item size="6">A</p-grid-item>
        <p-grid-item size="6">B</p-grid-item>
      </p-grid>
    </p-grid-item>
    <p-grid-item size="6">
      <p-grid class="example-grid">
        <p-grid-item size="4">A</p-grid-item>
        <p-grid-item size="8">B</p-grid-item>
      </p-grid>
    </p-grid-item>
  </p-grid>
</Playground>

#### Possible nesting by keeping columns in "the grid"

Only columns with the following widths could be nested:

* total width of 8
* total width of 6
* total width of 4

#### Forbidden nesting

Nesting inside columns with the following widths should be prevented, because all item widths won't be in "the grid" anymore:

* total width of 11
* total width of 10
* total width of 9
* total width of 7
* total width of 5
* total width of 3

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/src/scss/index';
  
  .example-grid p-grid-item {
    @include p-text;
    color: $p-color-theme-dark-default;
    text-align: center;
    background: lightskyblue;
    background-clip: content-box;
    
    &[offset] {
      color: lightskyblue;
      text-indent: calc(-100% - 48px);
    }
  }
</style>