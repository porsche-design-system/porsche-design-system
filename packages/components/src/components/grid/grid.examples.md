<ComponentHeading name="Grid"></ComponentHeading>

The `p-grid` provides a visual structuring system for a homogeneous and balanced content placement across all Porsche
web experiences and screen sizes. The Porsche Design System grid system is based upon a standard 12 column responsive
grid. Its main purpose is to provide a solid and flexible grid system for defining layout areas and page structures. It
is not meant to function as a toolkit for layout content blocks or components.

<Notification heading="Deprecation hint" state="error">
  This component is deprecated and will be removed with the next major release. 
  In general, please use native <a href="https://css-tricks.com/snippets/css/complete-guide-grid">CSS Grid</a> instead for better performance and more standardized layout technique.
  Additionally, we provide a <a href="styles/grid"><b>Porsche Grid</b></a> utility instead based on CSS Grid covering the specific layout needs for a harmonic appearance across all digital touch-points.
</Notification>

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

In some cases it might be necessary to define or change direction of the columns/rows. The default setting is `row`. But
`column` is also possible to set the columns vertically underneath each other. A change of the optical order can be
achieved by setting `reverse`.

<Playground :markup="directionMarkup" :config="config">
  <SelectOptions v-model="direction" :values="directions" name="direction"></SelectOptions>
</Playground>

---

## Grid gutter

<Notification heading="Deprecation hint" state="warning">
  The gutter property is deprecated and has no effect anymore. Instead, a fluid gutter depending on the viewport width is used.
</Notification>

---

## Grid wrap

### Wrap (default)

<Playground :markup="wrap('wrap')" :config="config"></Playground>

### Nowrap

<Playground :markup="wrap('nowrap')" :config="config"></Playground>

---

## Grid nesting

Basic nesting of grids is supported. "Basic" because of percentage value of width and gutter which couldn't be
calculated for each column width. Here are some examples of "do's" and "don'ts":

<Playground :markup="nesting" :config="config"></Playground>

### Possible nesting by keeping columns in "the grid"

Only columns with the following widths could be nested:

- total width of 8
- total width of 6
- total width of 4

### Forbidden nesting

Nesting inside columns with the following widths should be prevented, because all item widths won't be in "the grid"
anymore:

- total width of 11
- total width of 10
- total width of 9
- total width of 7
- total width of 5
- total width of 3

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { GRID_DIRECTIONS } from './grid/grid-utils'; 

@Component
export default class Code extends Vue {
  config = { spacing: 'block-small' };
  
  direction = 'row';
  directions = [...GRID_DIRECTIONS, "{ base: 'column', m: 'row' }"];
  get directionMarkup() {
    const size = this.direction.includes('base') ? '{ base: 12, m: 4 }' : 4;
    return `<p-grid direction="${this.direction}">
  <p-grid-item size="${size}">A</p-grid-item>
  <p-grid-item size="${size}">B</p-grid-item>
  <p-grid-item size="${size}">C</p-grid-item>
</p-grid>`;
  }
  
  get size() {
    return `<p-grid>
  <p-grid-item size="12">12</p-grid-item>
</p-grid>
${Array.from(Array(11), (_, i) => `<p-grid>
  <p-grid-item size="${i+1}">${i+1}</p-grid-item>
  <p-grid-item size="${11-i}">${11-i}</p-grid-item>
</p-grid>`).join('\n')}`;
  }

  sizeResponsiveness =
`<p-grid>
  <p-grid-item size="{ base: 6, m: 2 }">A</p-grid-item>
  <p-grid-item size="{ base: 6, m: 10 }">B</p-grid-item>
</p-grid>`;

  get offset() {
    return Array.from(Array(11), (_, i) => `<p-grid>
    <p-grid-item offset="${i+1}" size="${11-i}">${i+1}</p-grid-item>
</p-grid>`).join('\n');
  }
    
  offsetResponsiveness =
`<p-grid>
  <p-grid-item offset="{ base: 6, m: 2 }" size="{ base: 6, m: 10 }">A</p-grid-item>
</p-grid>`;

  wrap(value: string) {
    return `<p-grid wrap="${value}">
  <p-grid-item size="6">A</p-grid-item>
  <p-grid-item size="6">B</p-grid-item>
  <p-grid-item size="6">C</p-grid-item>
  <p-grid-item size="6">D</p-grid-item>
</p-grid>`; 
    }
    
  nesting =
`<p-grid>
  <p-grid-item size="6">
    <p-grid>
      <p-grid-item size="6">A</p-grid-item>
      <p-grid-item size="6">B</p-grid-item>
    </p-grid>
  </p-grid-item>
  <p-grid-item size="6">
    <p-grid>
      <p-grid-item size="4">A</p-grid-item>
      <p-grid-item size="8">B</p-grid-item>
    </p-grid>
  </p-grid-item>
</p-grid>`;
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  
  :deep(p-grid-item) {
    @include pds-text-small;
    color: $pds-theme-light-primary;
    text-align: center;
    background: lightskyblue;
    background-clip: content-box;
    
    &[offset] {
      color: lightskyblue;
      text-indent: calc(-100% - 48px);
    }
  }
</style>
