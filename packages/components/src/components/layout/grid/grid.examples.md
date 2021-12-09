# Grid

The `p-grid` provides a visual structuring system for a homogeneous and balanced content placement across all Porsche web experiences and screen sizes. 
The Porsche Design System grid system is based upon a standard 12 column responsive grid.
Its main purpose is to provide a solid and flexible grid system for defining layout areas and page structures.
It is not meant to function as a toolkit for layouting content blocks or components.
For this, the [Flex](components/flex) component is the right choice.

In order to prevent horizontal scrolling and correct alignment it's recommended to use the **Grid** wrapped within [**Content Wrapper**](components/content-wrapper).

<TableOfContents></TableOfContents>

## Grid size

Following example shows a standard grid implementation.  

<Playground :markup="size" :config="config"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="sizeResponsiveness" :config="config"></Playground>

---

## Grid offset

In some cases it can be necessary to indent columns. The grid gives basic indentions based on grid sizings.

<Playground :markup="offset" :config="config"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="offsetResponsiveness" :config="config"></Playground>

---

## Grid direction

In some cases it might be necessary to define or change direction of the columns/rows. The default setting is `row`. But `column` is also possible to set the columns vertically underneath each other. A change of the optical order can be achieved by setting `reverse`.

### Row (default)

<Playground :markup="direction('row')" :config="config"></Playground>

### Row reverse

<Playground :markup="direction('row-reverse')" :config="config"></Playground>

### Column

<Playground :markup="direction('column')" :config="config"></Playground>

### Column-reverse

<Playground :markup="direction('column-reverse')" :config="config"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="direction('{ base: \'column\', m: \'row\' }', '{ base: 12, m: 4 }')" :config="config"></Playground>

---

## Grid gutter

The grid gutter can have the sizes `16`, `24` and `36`.

### Gutter

<Playground :markup="gutter()" :config="config"></Playground>

### Gutter with breakpoint

The gutter sizes can be set on different breakpoints.

<Playground :markup="gutterBreakpoint()" :config="config"></Playground>

---

## Grid wrap

### Wrap (default)

<Playground :markup="wrap('wrap')" :config="config"></Playground>

### Nowrap

<Playground :markup="wrap('nowrap')" :config="config"></Playground>

---

## Grid nesting

Basic nesting of grids is supported. "Basic" because of percentage value of width and gutter which couldn't be calculated for each column width. Here are some examples of "do's" and "don'ts":

<Playground :markup="nesting" :config="config"></Playground>

### Possible nesting by keeping columns in "the grid"

Only columns with the following widths could be nested:

* total width of 8
* total width of 6
* total width of 4

### Forbidden nesting

Nesting inside columns with the following widths should be prevented, because all item widths won't be in "the grid" anymore:

* total width of 11
* total width of 10
* total width of 9
* total width of 7
* total width of 5
* total width of 3

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  
  @Component
  export default class Code extends Vue {
    config = { spacing: 'block-small' };
    
    get size() {
      return `<p-grid class="example-grid">
  <p-grid-item size="12">12</p-grid-item>
</p-grid>
${Array.from(Array(11)).map((x, i) => `<p-grid class="example-grid">
  <p-grid-item size="${i+1}">${i+1}</p-grid-item>
  <p-grid-item size="${11-i}">${11-i}</p-grid-item>
</p-grid>`).join('\n')}`;
    }

    sizeResponsiveness =
`<p-grid class="example-grid">
  <p-grid-item size="{ base: 6, m: 2 }">A</p-grid-item>
  <p-grid-item size="{ base: 6, m: 10 }">B</p-grid-item>
</p-grid>`;

    get offset() {
      return `${Array.from(Array(11)).map((x, i) => `<p-grid class="example-grid">
    <p-grid-item offset="${i+1}" size="${11-i}">${i+1}</p-grid-item>
</p-grid>`).join('\n')}`;
    }
    
    offsetResponsiveness =
`<p-grid class="example-grid">
  <p-grid-item offset="{ base: 6, m: 2 }" size="{ base: 6, m: 10 }">A</p-grid-item>
</p-grid>`;

    direction(value: string, size: string = '4') {
      const attr = value ? ` direction="${value}"` : '';
      const sizeAttr = value ? ` size="${size}"` : '';
      return `<p-grid${attr} class="example-grid">
  <p-grid-item${sizeAttr}>A</p-grid-item>
  <p-grid-item${sizeAttr}>B</p-grid-item>
  <p-grid-item${sizeAttr}>C</p-grid-item>
</p-grid>`;
    }

    gutter() {
      return `<p-grid gutter="16" class="example-grid">
  <p-grid-item size="4">A</p-grid-item>
  <p-grid-item size="4">B</p-grid-item>
  <p-grid-item size="4">C</p-grid-item>
</p-grid>
<p-grid gutter="24" class="example-grid">
  <p-grid-item size="4">D</p-grid-item>
  <p-grid-item size="4">E</p-grid-item>
  <p-grid-item size="4">F</p-grid-item>
</p-grid>
<p-grid gutter="36" class="example-grid">
  <p-grid-item size="4">G</p-grid-item>
  <p-grid-item size="4">H</p-grid-item>
  <p-grid-item size="4">I</p-grid-item>
</p-grid>`; 
    }

    gutterBreakpoint(){
      return `<p-grid gutter="{base: 36, m: 16}" class="example-grid">
    <p-grid-item size="4">A</p-grid-item>
    <p-grid-item size="4">B</p-grid-item>
    <p-grid-item size="4">C</p-grid-item>
  </p-grid>`;
    }

    wrap(value: string) {
      return `<p-grid wrap="${value}" class="example-grid">
  <p-grid-item size="6">A</p-grid-item>
  <p-grid-item size="6">B</p-grid-item>
  <p-grid-item size="6">C</p-grid-item>
  <p-grid-item size="6">D</p-grid-item>
</p-grid>`; 
    }
    
    nesting =
`<p-grid>
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
</p-grid>`;


  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';
  
  ::v-deep .example-grid p-grid-item {
    @include p-text-small;
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