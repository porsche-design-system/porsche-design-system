# Flex

## Introduction

The Porsche UI Kit flex layout system is based on standard css flexbox browser behaviour and can be controlled by changing class names/properties on the flex container and flex item. It can be used to quickly layout standard, css-prefixed content blocks or components. It does not replace [Grid](#/components/layout/grid) component which should be used to define basic page structures.

### Flex (default)
Initialize standard flexbox container to define flex context.
If using default property, no extra class/prop declaration is needed due to standard browser behaviour.

<Playground :themeable="false">
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

### Inline
Flex inline displays flex containers in a row.

<Playground :themeable="false">
  <p-flex flow="inline">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex flow="inline">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="false">
  <p-flex flow='{ "base": "block", "l": "inline" }'>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex flow='{ "base": "block", "l": "inline" }'>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

### Flex direction

Define or change direction of the flex items to rows or columns and set order.

#### Row (default)

If using default property, no extra class/prop declaration is needed due to standard browser behaviour.

<Playground :themeable="false">
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Row reverse

<Playground :themeable="false">
  <p-flex direction="row-reverse">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Column

<Playground :themeable="false">
  <p-flex direction="column">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Column reverse

<Playground :themeable="false">
  <p-flex direction="column-reverse">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="false">
  <p-flex direction='{ "base": "column", "l": "row" }'>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

### Flex wrap

The flex wrap property is used to force flex items to stay in line independently of the flex container width, or to flow in multiple lines forced by the flex container width.

#### Nowrap (default)

If using default property, no extra class/prop declaration is needed due to standard browser behaviour.

<Playground :themeable="false">
  <p-flex>
    <p-flex-item v-for="n, index in 9" :key="index">
      <ExampleText>{{ n }}</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Wrap

<Playground :themeable="false">
  <p-flex wrap="wrap">
    <p-flex-item v-for="n, index in 9" :key="index">
      <ExampleText>{{ n }}</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Wrap reverse

<Playground :themeable="false">
  <p-flex wrap="reverse">
    <p-flex-item v-for="n, index in 9" :key="index">
      <ExampleText>{{ n }}</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="false">
  <p-flex wrap="'{ "base": "wrap", "l": "nowrap" }'">
    <p-flex-item v-for="n, index in 9" :key="index">
      <ExampleText>{{ n }}</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

### Flex justify content

This property defines the alignment of flex items on the main axis in conjunction to their siblings.

#### Start (default)

If using default property, no extra class/prop declaration is needed due to standard browser behaviour.

<Playground :themeable="false">
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### End

<Playground :themeable="false">
  <p-flex justify-content="end">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Center

<Playground :themeable="false">
  <p-flex justify-content="center">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Space between

<Playground :themeable="false">
  <p-flex justify-content="space-between">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Space around

<Playground :themeable="false">
  <p-flex justify-content="space-around">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Space evenly

<Playground :themeable="false">
  <p-flex justify-content="space-evenly">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="false">
  <p-flex justify-content='{ "base": "start", "l": "end" }'>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

### Flex align items

This property defines the alignment of flex items on the cross axis in conjunction to their siblings.

#### Stretch (default)

If using default property, no extra class/prop declaration is needed due to standard browser behaviour.

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Start

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex align-items="start">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### End

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex align-items="end">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Center

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex align-items="center">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Baseline

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex align-items="baseline">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex align-items='{ "base": "start", "l": "end" }'>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

### Flex align content

This aligns flex items on the cross axis of the flex container when there is extra space available.
This property has only effect when there is more than one line of flex items.

#### Stretch (default)

If using default property, no extra class/prop declaration is needed due to standard browser behaviour.

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex wrap="wrap">
    <p-flex-item v-for="n, index in 9" :key="index">
      <ExampleText>{{ n }}</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Start

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex wrap="wrap" align-content="start">
    <p-flex-item v-for="n, index in 9" :key="index">
      <ExampleText>{{ n }}</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### End

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex wrap="wrap" align-content="end">
    <p-flex-item v-for="n, index in 9" :key="index">
      <ExampleText>{{ n }}</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Center

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex wrap="wrap" align-content="center">
    <p-flex-item v-for="n, index in 9" :key="index">
      <ExampleText>{{ n }}</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Space between

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex wrap="wrap" align-content="space-between">
    <p-flex-item v-for="n, index in 9" :key="index">
      <ExampleText>{{ n }}</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Space around

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex wrap="wrap" align-content="space-around">
    <p-flex-item v-for="n, index in 9" :key="index">
      <ExampleText>{{ n }}</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex wrap="wrap" align-content='{ "base": "start", "l": "end" }'>
    <p-flex-item v-for="n, index in 9" :key="index">
      <ExampleText>{{ n }}</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

## Modifier for flex items (children)

### Flex item spacing

Use `gap` to apply equal horizontal spacing to all flex items of the container. You have to take care of vertical spacing yourself. This should not be an alternative to the global grid system/component. All values of standard spacing component can be used.

#### Static

<Playground :themeable="false">
  <p-flex gap="16">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Responsive
Responsive spacing have specific predefined values for each breakpoint which make them grow/shrink depending on the viewport width.

<Playground :themeable="false">
  <p-flex gap="b">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

### Flex item width

The widths of flex items is normally defined through its contents by default.
But it is also possible to define specific predefined widths.

#### Specific

<Playground :themeable="false">
  <p-flex>
    <p-flex-item width="one-quarter">
      <ExampleText>one-quarter</ExampleText>
    </p-flex-item>
    <p-flex-item width="one-quarter">
      <ExampleText>one-quarter</ExampleText>
    </p-flex-item>
    <p-flex-item width="one-quarter">
      <ExampleText>one-quarter</ExampleText>
    </p-flex-item>
    <p-flex-item width="one-quarter">
      <ExampleText>one-quarter</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex>
    <p-flex-item width="one-third">
      <ExampleText>one-third</ExampleText>
    </p-flex-item>
    <p-flex-item width="one-third">
      <ExampleText>one-third</ExampleText>
    </p-flex-item>
    <p-flex-item width="one-third">
      <ExampleText>one-third</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex>
    <p-flex-item width="half">
      <ExampleText>half</ExampleText>
    </p-flex-item>
    <p-flex-item width="half">
      <ExampleText>half</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex>
    <p-flex-item width="two-thirds">
      <ExampleText>two-third</ExampleText>
    </p-flex-item>
    <p-flex-item width="one-third">
      <ExampleText>one-third</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex>
    <p-flex-item width="three-quarters">
      <ExampleText>three-quarters</ExampleText>
    </p-flex-item>
    <p-flex-item width="one-quarter">
      <ExampleText>one-quarters</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex>
    <p-flex-item width="full">
      <ExampleText>full</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="false">
  <p-flex wrap>
    <p-flex-item width='{ "base": "half", "l": "one-quarter" }'>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item width='{ "base": "half", "l": "one-quarter" }'>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item width='{ "base": "half", "l": "one-quarter" }'>
      <ExampleText>3</ExampleText>
    </p-flex-item>
    <p-flex-item width='{ "base": "half", "l": "one-quarter" }'>
      <ExampleText>4</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

### Flex item offset

Items can have different offsets that work similar like column widths.

#### Widths

<Playground :themeable="false">
  <p-flex>
    <p-flex-item offset={"one-quarter"} width={"three-quarters"}>
      <ExampleText>Offset: quarter</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex>
    <p-flex-item offset={"one-third"} width={"two-thirds"}>
      <ExampleText>Offset: third</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex>
    <p-flex-item offset={"half"} width={"half"}>
      <ExampleText>Offset: half</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex>
    <p-flex-item offset={"two-thirds"} width={"one-third"}>
      <ExampleText>Offset: 2 thirds</ExampleText>
    </p-flex-item>
  </p-flex>
  <p-flex>
    <p-flex-item offset={"three-quarters"} width={"one-quarter"}>
      <ExampleText>Offset: 3 quarters</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="false">
  <p-flex>
    <p-flex-item offset='{ "base": "none", "l": "one-third" }'>
      <ExampleText>Responsive offset</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

### Flex item align self

You can override the align items properties of the flex container for individual flex items.

#### Auto (default)

If using default property, no extra class/prop declaration is needed due to standard browser behaviour.

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>3</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>4</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Stretch

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex align-items="start">
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item align-self="stretch">
      <ExampleText>3</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>4</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Start

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item align-self="start">
      <ExampleText>3</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>4</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### End

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item align-self="end">
      <ExampleText>3</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>4</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Center

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item align-self="center">
      <ExampleText>3</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>4</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Baseline

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex>
    <p-flex-item align-self="baseline">
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item align-self="baseline">
      <ExampleText>3</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>4</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Responsive
The settings above can also be used on different major breakpoints `xs`, `s`, `m`, `l`, `xl`.

<Playground :themeable="false" childrenHeight="fixed">
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
    <p-flex-item align-self='{ "base": "start", "l": "end" }'>
      <ExampleText>3</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>4</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

### Flex item grow

Flexbox default behaviour on how the item widths are rendered (stretched) can be overwritten with the following class names.

It handles how to grow an item based on the space that is left to fulfill the parents width.

#### Grow - 0 (default)

If using default property, no extra class/prop declaration is needed due to standard browser behaviour.

<Playground :themeable="false">
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item>
      <ExampleText>2</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Grow - 1

<Playground :themeable="false">
  <p-flex>
    <p-flex-item>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item grow="1">
      <ExampleText>2</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

### Flex item shrink

Flexbox default behaviour on how the item widths are rendered (shrinked) can be overwritten with the following class names.

It handles how to shrink an item based on the space that exceeds the parents width to fulfill it.

#### Shrink - 1 (default)

If using default property, no extra class/prop declaration is needed due to standard browser behaviour.

<Playground :themeable="false">
  <p-flex>
    <p-flex-item style={{ width: "80%" }}>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item style={{ width: "80%" }}>
      <ExampleText>2</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Shrink - 0

<Playground :themeable="false">
  <p-flex>
    <p-flex-item shrink="0" style={{ width: "80%" }}>
      <ExampleText>1</ExampleText>
    </p-flex-item>
    <p-flex-item style={{ width: "80%" }}>
      <ExampleText>2</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

---

### Flex item shorthand

Setting shorthand properties for flex grow, shrink and base:

#### Initial (grow:0, shrink:1 and base:auto)

<Playground :themeable="false">
  <p-flex>
    <p-flex-item flex="initial">
      <ExampleText>1 - short content</ExampleText>
    </p-flex-item>
    <p-flex-item flex="initial">
      <ExampleText>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</ExampleText>
    </p-flex-item>
    <p-flex-item flex="initial">
      <ExampleText>3 - short content</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Auto (grow:1, shrink:1 and base:auto)

<Playground :themeable="false">
  <p-flex>
    <p-flex-item flex="auto">
      <ExampleText>1 - short content</ExampleText>
    </p-flex-item>
    <p-flex-item flex="auto">
      <ExampleText>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</ExampleText>
    </p-flex-item>
    <p-flex-item flex="auto">
      <ExampleText>3 - short content</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### Equal (grow:1, shrink:1 and base:0)

<Playground :themeable="false">
  <p-flex>
    <p-flex-item flex="equal">
      <ExampleText>1 - short content</ExampleText>
    </p-flex-item>
    <p-flex-item flex="equal">
      <ExampleText>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</ExampleText>
    </p-flex-item>
    <p-flex-item flex="equal">
      <ExampleText>3 - short content</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>

#### None (grow:0, shrink:0 and base:auto)

<Playground :themeable="false">
  <p-flex>
    <p-flex-item flex="none">
      <ExampleText>1 - short content</ExampleText>
    </p-flex-item>
    <p-flex-item flex="none">
      <ExampleText>2 - large amount of content lorem ipsum dolor sit amet consecutor sibling nira space</ExampleText>
    </p-flex-item>
    <p-flex-item flex="none">
      <ExampleText>3 - short content</ExampleText>
    </p-flex-item>
  </p-flex>
</Playground>