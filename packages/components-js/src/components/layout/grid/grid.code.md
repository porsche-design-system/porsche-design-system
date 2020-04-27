# Grid

The Porsche Design System grid system is based upon a standard 12 column responsive grid. Its main purpose is to provide a solid and flexible grid system for defining layout areas and page structures. It is not meant to function as a toolkit for layouting content blocks or components. For this, the [Flex](#/components/layout/flex) component is the right choice.

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

#### Safe Zone

By applying the `safe-zone` property you can enable the outer grid margins and center the grid.<br>
Keep in mind that this will apply `overflow-x: hidden;` on the grid component in order to prevent horizontal scrolling.<br>
If you want to prevent horizontal scrolling on a grid that goes from edge to edge you should apply this style to your `body` like 
```
body {
    overflow-x: hidden;
}
```

<Playground>
  <p-grid class="example-grid" safe-zone="true">
    <p-grid-item size="{ base: 6, m: 2 }">A</p-grid-item>
    <p-grid-item size="{ base: 6, m: 10 }">B</p-grid-item>
  </p-grid>
</Playground>

##### Scrolling Demo

In this demo you can toggle the overflow behavior of the grid's wrapping component.<br>
<p-button @click="noScroll = !noScroll">Toggle Overflow</p-button><br>
Current style: 
<template v-if="!noScroll">`overflow-y: auto;`</template>
<template v-else>`overflow-y: hidden;`</template>

<Playground>
  <div class="scrolling-demo" v-bind:class="{ 'scrolling-demo--locked': noScroll }">
      <p-grid v-for="n, index in 11" :key="index" class="example-grid" safe-zone="true">
        <p-grid-item :size="n">{{ n }}</p-grid-item>
        <p-grid-item :size="12 - n">{{ 12 - n }}</p-grid-item>
      </p-grid>
  </div>
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

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  @Component
  export default class PlaygroundGrid extends Vue {
    public noScroll = false;
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/scss-utils/index';
  
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
  
  .scrolling-demo {
    height: 200px;
    overflow-y: auto;
    
    &--locked {
        overflow-y: hidden
    }
        
    > * {
        margin-top: $p-spacing-8;
        &:first-child { margin-top: 0 }
    }
  }
</style>