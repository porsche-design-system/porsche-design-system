# Flex

The Porsche Design System flex layout system is based on standard CSS Flexbox browser behaviour and can be controlled by the properties of the Flex container and Flex item. It can be used to quickly layout standard content blocks or components. It does not replace the [Grid](#/components/layout/grid) component which should be used to define basic page structures.

### Flex
Initialize standard Flexbox container to define Flex context.

<Playground>
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
  </p-flex>
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
  </p-flex>
</Playground>

### Inline
Flex inline displays Flex containers in a row.

<Playground>
  <p-flex inline="true" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
  </p-flex>
  <p-flex inline="true" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
  </p-flex>
</Playground>

### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground>
  <p-flex inline="{ base: false, l: true }" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
  </p-flex>
  <p-flex inline="{ base: false, l: true }" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
  </p-flex>
</Playground>

---

### Flex direction

Define or change direction of the Flex items to rows or columns and set order.

#### Row

<Playground>
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Row-reverse

<Playground>
  <p-flex direction="row-reverse" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Column

<Playground>
  <p-flex direction="column" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Column-reverse

<Playground>
  <p-flex direction="column-reverse" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground>
  <p-flex direction="{ base: 'column', l: 'row' }" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

---

### Flex wrap

The flex wrap property is used to force Flex items to stay in line independently of the Flex container width, or to flow in multiple lines forced by the Flex container width.

#### Nowrap

<Playground>
  <p-flex class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

#### Wrap

<Playground>
  <p-flex wrap="wrap" class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

#### Wrap-reverse

<Playground>
  <p-flex wrap="wrap-reverse" class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground>
  <p-flex wrap="{ base: 'wrap', l: 'nowrap' }" class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

---

### Flex justify-content

This property defines the alignment of Flex items on the main axis in conjunction to their siblings.

#### Flex-start

<Playground>
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Flex-end

<Playground>
  <p-flex justify-content="flex-end" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Center

<Playground>
  <p-flex justify-content="center" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Space-between

<Playground>
  <p-flex justify-content="space-between" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Space-around

<Playground>
  <p-flex justify-content="space-around" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Space-evenly

<Playground>
  <p-flex justify-content="space-evenly" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground>
  <p-flex justify-content="{ base: 'flex-start', l: 'flex-end' }" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

---

### Flex align-items

This property defines the alignment of Flex items on the cross axis in conjunction to their siblings.

#### Stretch

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Flex-start

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex align-items="flex-start" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Flex-end

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex align-items="flex-end" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Center

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex align-items="center" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Baseline

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex align-items="baseline" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex align-items="{ base: 'flex-start', l: 'flex-end' }" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
  </p-flex>
</Playground>

---

### Flex align-content

This aligns Flex items on the cross axis of the Flex container when there is extra space available.
This property has only effect when there is more than one line of Flex items.

#### Stretch

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex wrap="wrap" class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

#### Flex-start

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex wrap="wrap" align-content="flex-start" class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

#### Flex-end

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex wrap="wrap" align-content="flex-end" class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

#### Center

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex wrap="wrap" align-content="center" class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

#### Space-between

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex wrap="wrap" align-content="space-between" class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

#### Space-around

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex wrap="wrap" align-content="space-around" class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

#### Space-evenly

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex wrap="wrap" align-content="space-evenly" class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex wrap="wrap" align-content="{ base: 'flex-start', l: 'flex-end' }" class="example-flex">
    <p-flex-item v-for="n, index in 9" :key="index">{{ n }}</p-flex-item>
  </p-flex>
</Playground>

---

## Modifier for Flex items (children)

### Flex-item width

The widths of Flex items is normally defined through its contents by default.
But it is also possible to define specific predefined widths.

#### Specific

<Playground :childElementLayout="{spacing: 'block-small'}">
  <p-flex class="example-flex">
    <p-flex-item width="one-quarter">one-quarter</p-flex-item>
    <p-flex-item width="one-quarter">one-quarter</p-flex-item>
    <p-flex-item width="one-quarter">one-quarter</p-flex-item>
    <p-flex-item width="one-quarter">one-quarter</p-flex-item>
  </p-flex>
  <p-flex class="example-flex">
    <p-flex-item width="one-third">one-third</p-flex-item>
    <p-flex-item width="one-third">one-third</p-flex-item>
    <p-flex-item width="one-third">one-third</p-flex-item>
  </p-flex>
  <p-flex class="example-flex">
    <p-flex-item width="half">half</p-flex-item>
    <p-flex-item width="half">half</p-flex-item>
  </p-flex>
  <p-flex class="example-flex">
    <p-flex-item width="two-thirds">two-thirds</p-flex-item>
    <p-flex-item width="one-third">one-third</p-flex-item>
  </p-flex>
  <p-flex class="example-flex">
    <p-flex-item width="three-quarters">three-quarters</p-flex-item>
    <p-flex-item width="one-quarter">one-quarter</p-flex-item>
  </p-flex>
  <p-flex class="example-flex">
    <p-flex-item width="full">full</p-flex-item>
  </p-flex>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground>
  <p-flex wrap="wrap" class="example-flex">
    <p-flex-item width="{ base: 'half', l: 'one-quarter' }">1</p-flex-item>
    <p-flex-item width="{ base: 'half', l: 'one-quarter' }">2</p-flex-item>
    <p-flex-item width="{ base: 'half', l: 'one-quarter' }">3</p-flex-item>
    <p-flex-item width="{ base: 'half', l: 'one-quarter' }">4</p-flex-item>
  </p-flex>
</Playground>

---

### Flex-item offset

Items can have different offsets that work similar like column widths.

#### Widths

<Playground :childElementLayout="{spacing: 'block-small'}">
  <p-flex class="example-flex">
    <p-flex-item offset="one-quarter" width="three-quarters">Offset: quarter</p-flex-item>
  </p-flex>
  <p-flex class="example-flex">
    <p-flex-item offset="one-third" width="two-thirds">Offset: third</p-flex-item>
  </p-flex>
  <p-flex class="example-flex">
    <p-flex-item offset="half" width="half">Offset: half</p-flex-item>
  </p-flex>
  <p-flex class="example-flex">
    <p-flex-item offset="two-thirds" width="one-third">Offset: 2 thirds</p-flex-item>
  </p-flex>
  <p-flex class="example-flex">
    <p-flex-item offset="three-quarters" width="one-quarter">Offset: 3 quarters</p-flex-item>
  </p-flex>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground>
  <p-flex class="example-flex">
    <p-flex-item offset="{ base: 'none', l: 'one-third' }">Responsive offset</p-flex-item>
  </p-flex>
</Playground>

---

### Flex-item align-self

You can override the align-items properties of the Flex container for individual Flex items.

#### Auto

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item>3</p-flex-item>
    <p-flex-item>4</p-flex-item>
  </p-flex>
</Playground>

#### Stretch

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex align-items="flex-start" class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item align-self="stretch">3</p-flex-item>
    <p-flex-item>4</p-flex-item>
  </p-flex>
</Playground>

#### Flex-start

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item align-self="flex-start">3</p-flex-item>
    <p-flex-item>4</p-flex-item>
  </p-flex>
</Playground>

#### Flex-end

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item align-self="flex-end">3</p-flex-item>
    <p-flex-item>4</p-flex-item>
  </p-flex>
</Playground>

#### Center

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item align-self="center">3</p-flex-item>
    <p-flex-item>4</p-flex-item>
  </p-flex>
</Playground>

#### Baseline

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex class="example-flex">
    <p-flex-item align-self="baseline">1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item align-self="baseline">3</p-flex-item>
    <p-flex-item>4</p-flex-item>
  </p-flex>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :childElementLayout="{height: 'fixed'}">
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
    <p-flex-item align-self="{ base: 'flex-start', l: 'flex-end' }">3</p-flex-item>
    <p-flex-item>4</p-flex-item>
  </p-flex>
</Playground>

---

### Flex-item grow

Flexbox default behaviours on how the item widths are rendered (stretched) can be overwritten with the following class names.

It handles how to grow an item based on the space that is left to fulfill the parent's width.

#### Grow - 0

<Playground>
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item>2</p-flex-item>
  </p-flex>
</Playground>

#### Grow - 1

<Playground>
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item grow="1">2</p-flex-item>
  </p-flex>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground>
  <p-flex class="example-flex">
    <p-flex-item>1</p-flex-item>
    <p-flex-item grow="{ base: 0, l: 1 }">2</p-flex-item>
  </p-flex>
</Playground>

---

### Flex-item shrink

Flexbox default behaviour on how the item widths are rendered (shrinked) can be overwritten with the following class names.

It handles how to shrink an item based on the space that exceeds the parents width to fulfill it.

#### Shrink - 1

<Playground>
  <p-flex class="example-flex">
    <p-flex-item style="width: 80%">1</p-flex-item>
    <p-flex-item style="width: 80%">2</p-flex-item>
  </p-flex>
</Playground>

#### Shrink - 0

<Playground>
  <p-flex class="example-flex">
    <p-flex-item shrink="0" style="width: 80%">1</p-flex-item>
    <p-flex-item style="width: 80%">2</p-flex-item>
  </p-flex>
</Playground>

#### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground>
  <p-flex class="example-flex">
    <p-flex-item shrink="{ base: 0, l: 1 }" style="width: 80%">1</p-flex-item>
    <p-flex-item style="width: 80%">2</p-flex-item>
  </p-flex>
</Playground>

---

### Flex-item shorthand

Setting shorthand properties for Flex grow, shrink and base:

#### Initial (grow:0, shrink:1 and base:auto)

<Playground>
  <p-flex class="example-flex">
    <p-flex-item flex="initial">1 - short content</p-flex-item>
    <p-flex-item flex="initial">2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p-flex-item>
    <p-flex-item flex="initial">3 - short content</p-flex-item>
  </p-flex>
</Playground>

#### Auto (grow:1, shrink:1 and base:auto)

<Playground>
  <p-flex class="example-flex">
    <p-flex-item flex="auto">1 - short content</p-flex-item>
    <p-flex-item flex="auto">2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p-flex-item>
    <p-flex-item flex="auto">3 - short content</p-flex-item>
  </p-flex>
</Playground>

#### Equal (grow:1, shrink:1 and base:0)

<Playground>
  <p-flex class="example-flex">
    <p-flex-item flex="equal">1 - short content</p-flex-item>
    <p-flex-item flex="equal">2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p-flex-item>
    <p-flex-item flex="equal">3 - short content</p-flex-item>
  </p-flex>
</Playground>

#### None (grow:0, shrink:0 and base:auto)

<Playground>
  <p-flex class="example-flex">
    <p-flex-item flex="none">1 - short content</p-flex-item>
    <p-flex-item flex="none">2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p-flex-item>
    <p-flex-item flex="none">3 - short content</p-flex-item>
  </p-flex>
</Playground>

#### Responsiveness
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground>
  <p-flex class="example-flex">
    <p-flex-item flex="{base: 'initial', l: 'equal'}">1 - short content</p-flex-item>
    <p-flex-item flex="{base: 'initial', l: 'equal'}">2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p-flex-item>
    <p-flex-item flex="{base: 'initial', l: 'equal'}">3 - short content</p-flex-item>
  </p-flex>
</Playground>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/src/scss/index';

  $color-blue-1: lightskyblue;
  $color-blue-2: deepskyblue;
  $color-blue-3: dodgerblue;
  $color-blue-4: royalblue;
  $color-highlight: deeppink;

  .example-flex {
    & > * {
      @include p-text;
      padding: 0 6vw;
      color: $p-color-theme-dark-default;
      text-align: center;

      &:nth-child(1n) {
        background-color: $color-blue-1;
      }

      &:nth-child(2n) {
        background-color: $color-blue-2;
      }

      &:nth-child(3n) {
        background-color: $color-blue-3;
      }

      &:nth-child(4n) {
        background-color: $color-blue-4;
      }

      &[align-self] {
        background-color: $color-highlight;
      }

      &[align-self='baseline']:nth-child(1) {
        margin-top: $p-spacing-24;
      }
    }

    &[align-items] > *:not([align-self='stretch']) {
      &:nth-child(1n) {
        height: 40px;
      }

      &:nth-child(2n) {
        height: 80px;
      }

      &:nth-child(3n) {
        height: 54px;
      }
    }

    &[align-items='baseline'] > :nth-child(2) {
      margin-top: $p-spacing-24;
    }
  }
</style>