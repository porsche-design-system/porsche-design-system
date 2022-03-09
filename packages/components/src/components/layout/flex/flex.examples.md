# Flex

The Porsche Design System flex layout system is based on standard CSS Flexbox browser behaviour and can be controlled by the properties of the `p-flex` container and `p-flex-item`.
It can be used to quickly layout standard content blocks or components. 
It does not replace the [Grid](components/grid) component which should be used to define basic page structures.

<p-inline-notification heading="Important note" state="error" persistent="true">
  The Flex component is deprecated and might be removed in a future major release, extracted into a separate package or being provided as proprietary implementation for Angular and React.
  The component is categorized as "Layout Component" which has high impact on Cumulative Layout Shift (CLS).
  Therefore we recommend to use native CSS Flex implementation instead to boost performance, <a target="_blank" href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">A Complete Guide to Flexbox</a>.
</p-inline-notification>

<TableOfContents></TableOfContents>

## Flex
Initialize standard Flexbox container to define Flex context.

<Playground :markup="flexInline()"></Playground>

## Inline
Flex inline displays Flex containers in a row.

<Playground :markup="flexInline('true')"></Playground>

## Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="flexInline('{ base: false, l: true }')"></Playground>

---

## Flex direction

Define or change direction of the Flex items to rows or columns and set order.

### Row

<Playground :markup="direction('row')"></Playground>

### Row-reverse

<Playground :markup="direction('row-reverse')"></Playground>

### Column

<Playground :markup="direction('column')"></Playground>

### Column-reverse

<Playground :markup="direction('column-reverse')"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="direction('{ base: \'column\', l: \'row\' }')"></Playground>

---

## Flex wrap

The flex wrap property is used to force Flex items to stay in line independently of the Flex container width, or to flow in multiple lines forced by the Flex container width.

### Nowrap

<Playground :markup="wrap()"></Playground>

### Wrap

<Playground :markup="wrap('wrap')"></Playground>

### Wrap-reverse

<Playground :markup="wrap('wrap-reverse')"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="wrap('{ base: \'wrap\', l: \'nowrap\' }')"></Playground>

---

## Flex justify-content

This property defines the alignment of Flex items on the main axis in conjunction to their siblings.

### Flex-start

<Playground :markup="justifyContent()"></Playground>

### Flex-end

<Playground :markup="justifyContent('flex-end')"></Playground>

### Center

<Playground :markup="justifyContent('center')"></Playground>

### Space-between

<Playground :markup="justifyContent('space-between')"></Playground>

### Space-around

<Playground :markup="justifyContent('space-around')"></Playground>

### Space-evenly

<Playground :markup="justifyContent('space-evenly')"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="justifyContent('{ base: \'flex-start\', l: \'flex-end\' }')"></Playground>

---

## Flex align-items

This property defines the alignment of Flex items on the cross axis in conjunction to their siblings.

### Stretch

<Playground :markup="alignItems()" :config="{height: 'fixed'}"></Playground>

### Flex-start

<Playground :markup="alignItems('flex-start')" :config="{height: 'fixed'}"></Playground>

### Flex-end

<Playground :markup="alignItems('flex-end')" :config="{height: 'fixed'}"></Playground>

### Center

<Playground :markup="alignItems('center')" :config="{height: 'fixed'}"></Playground>

### Baseline

<Playground :markup="alignItems('baseline')" :config="{height: 'fixed'}"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="alignItems('{ base: \'flex-start\', l: \'flex-end\' }')" :config="{height: 'fixed'}"></Playground>

---

## Flex align-content

This aligns Flex items on the cross axis of the Flex container when there is extra space available.
This property has only effect when there is more than one line of Flex items.

### Stretch

<Playground :markup="alignContent()" :config="{height: 'fixed'}"></Playground>

### Flex-start

<Playground :markup="alignContent('flex-start')" :config="{height: 'fixed'}"></Playground>

### Flex-end

<Playground :markup="alignContent('flex-end')" :config="{height: 'fixed'}"></Playground>

### Center

<Playground :markup="alignContent('center')" :config="{height: 'fixed'}"></Playground>

### Space-between

<Playground :markup="alignContent('space-between')" :config="{height: 'fixed'}"></Playground>

### Space-around

<Playground :markup="alignContent('space-around')" :config="{height: 'fixed'}"></Playground>

### Space-evenly

<Playground :markup="alignContent('space-evenly')" :config="{height: 'fixed'}"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="alignContent('{ base: \'flex-start\', l: \'flex-end\' }')" :config="{height: 'fixed'}"></Playground>

---

## Modifier for Flex items (children)

### Flex-item width

The widths of Flex items is normally defined through its contents by default.
But it is also possible to define specific predefined widths.

### Specific

<Playground :markup="widthSpecific" :config="{spacing: 'block-small'}"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="widthWrap"></Playground>

---

## Flex-item offset

Items can have different offsets that work similar like column widths.

### Widths

<Playground :markup="offsetWidths" :config="{spacing: 'block-small'}"></Playground>

### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="offsetReponsive" :config="{spacing: 'block-small'}"></Playground>

---

## Flex-item align-self

You can override the align-items properties of the Flex container for individual Flex items.

### Auto

<Playground :markup="alignSelf()" :config="{height: 'fixed'}"></Playground>

### Stretch

<Playground :markup="alignSelf('stretch', 'flex-start')" :config="{height: 'fixed'}"></Playground>

### Flex-start

<Playground :markup="alignSelf('flex-start')" :config="{height: 'fixed'}"></Playground>

### Flex-end

<Playground :markup="alignSelf('flex-end')" :config="{height: 'fixed'}"></Playground>

### Center

<Playground :markup="alignSelf('center')" :config="{height: 'fixed'}"></Playground>

### Baseline

<Playground :markup="alignSelf('baseline')" :config="{height: 'fixed'}"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="alignSelf('{ base: \'flex-start\', l: \'flex-end\' }')" :config="{height: 'fixed'}"></Playground>

---

## Flex-item grow

Flexbox default behaviours on how the item widths are rendered (stretched) can be overwritten with the following class names.

It handles how to grow an item based on the space that is left to fulfill the parent's width.

### Grow - 0

<Playground :markup="grow()"></Playground>

### Grow - 1

<Playground :markup="grow('1')"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :markup="grow('{ base: 0, l: 1 }')"></Playground>

---

## Flex-item shrink

Flexbox default behaviour on how the item widths are rendered (shrinked) can be overwritten with the following class names.

It handles how to shrink an item based on the space that exceeds the parents width to fulfill it.

### Shrink - 1

<Playground :markup="shrink()"></Playground>

### Shrink - 0

<Playground :markup="shrink('0')"></Playground>

### Responsiveness

The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="shrink('{ base: 0, l: 1 }')"></Playground>

---

## Flex-item shorthand

Setting shorthand properties for Flex grow, shrink and base:

### Initial (grow:0, shrink:1 and base:auto)

<Playground :markup="flexShorthand('initial')"></Playground>

### Auto (grow:1, shrink:1 and base:auto)

<Playground :markup="flexShorthand('auto')"></Playground>

### Equal (grow:1, shrink:1 and base:0)

<Playground :markup="flexShorthand('equal')"></Playground>

### None (grow:0, shrink:0 and base:auto)

<Playground :markup="flexShorthand('none')"></Playground>

### Responsiveness
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l` and `xl`.

<Playground :markup="flexShorthand('{base: \'initial\', l: \'equal\'}')"></Playground>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Code extends Vue {
  flexInline(value: string) {
    const attr = value ? ` inline="${value}"` : '';
    return `<p-flex${attr} class="example-flex">
  <p-flex-item>1</p-flex-item>
  <p-flex-item>2</p-flex-item>
</p-flex>
<p-flex${attr} class="example-flex">
  <p-flex-item>1</p-flex-item>
  <p-flex-item>2</p-flex-item>
</p-flex>`;
  }

  direction(value: string) {
    const attr = value ? ` direction="${value}"` : '';
    return `<p-flex${attr} class="example-flex">
  <p-flex-item>1</p-flex-item>
  <p-flex-item>2</p-flex-item>
  <p-flex-item>3</p-flex-item>
</p-flex>`;
  }

  wrap(value: string) {
    const attr = value ? ` wrap="${value}"` : '';
    return `<p-flex${attr} class="example-flex">
  ${Array.from(Array(9)).map((x, i) => `<p-flex-item>${i+1}</p-flex-item>`).join('\n  ')}
</p-flex>`;
  }
  
  justifyContent(value: string) {
    const attr = value ? ` justify-content="${value}"` : '';
    return `<p-flex${attr} class="example-flex">
  <p-flex-item>1</p-flex-item>
  <p-flex-item>2</p-flex-item>
  <p-flex-item>3</p-flex-item>
</p-flex>`;
  }

  alignItems(value: string) {
    const attr = value ? ` align-items="${value}"` : '';
    return `<p-flex${attr} class="example-flex">
  <p-flex-item>1</p-flex-item>
  <p-flex-item>2</p-flex-item>
  <p-flex-item>3</p-flex-item>
</p-flex>`;
  }

  alignContent(value: string) {
    const attr = value ? ` align-content="${value}"` : '';
    return `<p-flex wrap="wrap"${attr} class="example-flex">
  ${Array.from(Array(9)).map((x, i) => `<p-flex-item>${i+1}</p-flex-item>`).join('\n  ')}
</p-flex>`;
  }
  
  alignSelf(value: string, valueParent?: string) {
    const attr = value ? ` align-self="${value}"` : '';
    const parentAttr = valueParent ? ` align-items="${valueParent}"` : '';
    return `<p-flex${parentAttr} class="example-flex">
  <p-flex-item${value === 'baseline' ? attr : ''}>1</p-flex-item>
  <p-flex-item>2</p-flex-item>
  <p-flex-item${attr}>3</p-flex-item>
  <p-flex-item>4</p-flex-item>
</p-flex>`;
  }
  
  grow(value: string) {
    const attr = value ? ` grow="${value}"` : '';
    return `<p-flex class="example-flex">
  <p-flex-item>1</p-flex-item>
  <p-flex-item${attr}>2</p-flex-item>
</p-flex>`;
  }
  
  shrink(value: string) {
    const attr = value ? ` shrink="${value}"` : '';
    return `<p-flex class="example-flex">
  <p-flex-item${attr} style="width: 80%">1</p-flex-item>
  <p-flex-item style="width: 80%">2</p-flex-item>
</p-flex>`;
  }
  
  flexShorthand(value: string) {
    const attr = value ? ` flex="${value}"` : '';
    return `<p-flex class="example-flex">
  <p-flex-item${attr}>1 - short content</p-flex-item>
  <p-flex-item${attr}>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</p-flex-item>
  <p-flex-item${attr}>3 - short content</p-flex-item>
</p-flex>`;
  }
  
  widthSpecific =
`<p-flex class="example-flex">
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
</p-flex>`;

  widthWrap =
`<p-flex wrap="wrap" class="example-flex">
  <p-flex-item width="{ base: 'half', l: 'one-quarter' }">1</p-flex-item>
  <p-flex-item width="{ base: 'half', l: 'one-quarter' }">2</p-flex-item>
  <p-flex-item width="{ base: 'half', l: 'one-quarter' }">3</p-flex-item>
  <p-flex-item width="{ base: 'half', l: 'one-quarter' }">4</p-flex-item>
</p-flex>`;

  offsetWidths =
`<p-flex class="example-flex">
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
</p-flex>`;

  offsetReponsive =
`<p-flex class="example-flex">
  <p-flex-item offset="{ base: 'none', l: 'one-third' }">Responsive offset</p-flex-item>
</p-flex>`;
}
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  $color-blue-1: lightskyblue;
  $color-blue-2: deepskyblue;
  $color-blue-3: dodgerblue;
  $color-blue-4: royalblue;
  $color-highlight: deeppink;

  ::v-deep .example-flex {
    & > * {
      @include p-text-small;
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