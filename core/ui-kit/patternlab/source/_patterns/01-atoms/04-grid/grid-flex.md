---
title: Grid Flex
state: inprogress
---

# Overview
The Porsche UI Kit grid system is based upon a standard 12 column responsive grid. It uses css flexbox to 
provide a maximum of flexibility. Breakpoint specific column behaviour (width, offset, alignments, etc.) can easily be set ba adding breakpoint specific classnames. Also decent nestings are supported.

# Usage

## Basic
For basic implementation, it is recommended to use this basic pattern:

```
<div class="flex flex--gap-offset-normal">
	<div class="flex__child flex__child--gap-normal flex__child--6">
    Column 1 with a width of 6 columns out of 12
  </div>
  <div class="flex__child flex__child--gap-normal flex__child--6">
    Column 2 with a width of 6 columns out of 12
  </div>
</div>
```

The classes `flex` and `flex--gap-offset-normal` on the parent and `flex__child` and `flex__child--gap-normal` on the children are mandatory. With `flex__child--(1-12)` it is possible to define column width.


## Offset
In some cases it can be neccessary to indent columns. The grid gives basic indentions bnased on grid sizings:

```
<div class="flex flex--gap-offset-normal">
  <div class="flex__child flex__child--gap-normal flex__child--10 flex__child--offset-1">
    1 column with a width of 10 and an offset left of 1
  </div>
</div>
```
The child column has an offset of 1 column on the left and due to its length of 10 columns an offset of 1 column to the right.


## Direction
In some cases it might be neccessary to define or change direction of the columns. Default is `row`. But `column` is also possible to set the columns vertically underneath each other. Changing optical order can be achieved by setting `reverse`.

```
<div class="flex flex--gap-offset-normal flex--direction-column">
  <div class="flex__child flex__child--gap-normal flex__child--6">
    Column 1 with a width of 6 but vertically aligned
  </div>
  <div class="flex__child flex__child--gap-normal flex__child--6">
    Column 2 with a width of 6 but vertically aligned
  </div>
</div>
```

```
<div class="flex flex--gap-offset-normal flex--direction-row-reverse">
  <div class="flex__child flex__child--gap-normal flex__child--6">
    Column 1 with a width of 6 but displayed in a reverse order
  </div>
  <div class="flex__child flex__child--gap-normal flex__child--6">
    Column 2 with a width of 6 but displayed in a reverse order
  </div>
</div>
```

The class names must be set on the grid parent container:
`flex--direction-row` #(default)
`flex--direction-row-reverse`
`flex--direction-column`
`flex--direction-column-reverse`


##Alignment (for all children)
Native flexbox alignments can also be set by adding specific class names to the grid parent container.

### Main axis (horizontal)

```
<div class="flex flex--gap-offset-normal flex--main-axis-end">
  <div class="flex__child flex__child--gap-normal flex__child--3">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child flex__child--gap-normal flex__child--3">
    Column 2 with a width of 3 aligned to the end of container
  </div>
</div>
```

These alignment values can be set:
`flex--main-axis-start` #(default)
`flex--main-axis-end`
`flex--main-axis-center`
`flex--main-axis-between`
`flex--main-axis-around`
`flex--main-axis-evenly`

### Cross axis (vertical)

```
<div class="flex flex--gap-offset-normal flex--cross-axis-end">
  <div class="flex__child flex__child--gap-normal flex__child--3">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child flex__child--gap-normal flex__child--3">
    Column 2 with a width of 3 aligned to the end of container
  </div>
</div>
```

These alignment values can be set:
`flex--cross-axis-stretch` #(default)
`flex--cross-axis-start`
`flex--cross-axis-end`
`flex--cross-axis-center`
`flex--cross-axis-baseline`


###Align self (for specific children)

```
<div class="flex flex--gap-offset-normal flex--cross-axis-end">
  <div class="flex__child flex__child--gap-normal flex__child--3">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child flex__child--gap-normal flex__child--3">
    Column 2 with a width of 3 aligned to the end of container
  </div>
</div>
```

These alignment values can be set:
`flex__child--align-start` #(default)
`flex__child--align-end`
`flex__child--align-center`
`flex__child--align-stretch`


## Wrapping
The flex-wrap property is a sub-property of the Flexible Box Layout module.
It defines whether the flex items are forced in a single line or can be flowed into multiple lines. If set to multiple lines, it also defines the cross-axis which determines the direction new lines are stacked in.

```
<div class="flex flex--gap-offset-normal flex--wrap">
  <div class="flex__child flex__child--gap-normal flex__child--3">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child flex__child--gap-normal flex__child--3">
    Column 2 with a width of 3 aligned to the end of container
  </div>
</div>
```

These wrapping values can be set:
`flex--nowrap` #(default)
`flex--wrap`
`flex--wrap-reverse`


## Zero gap
!!!!!!!!!!!


## Nesting
Basic nesting of grids is supported. "Basic" because of percentage value of width and gaps which couldn't be calculated for each column width. Here are some examples of "dos" and "don'ts":

### Possible nestings by keeping columns in "the grid"
Only columns with the following widths could be nested:
- total width of 8
- total width of 6
- total width of 4

### Forbidden nestings
Nesting inside columns with the following widths should be prevented, because all children widths won't be in "the grid" anymore:
- total width of 11
- total width of 10
- total width of 9
- total width of 7
- total width of 5
- total width of 3


## Responsive
The grid system is responsive by itself by using percentages for every value (widths, gaps, offsets). But it can also provide breakpoint specific values to fit the needs of certain viewports:

```
<div class="flex flex--gap-offset-normal">
	<div class="flex__child flex__child--gap-normal flex__child--6 flex__child--3-l">
    Column 1 with a width of 6 columns out of 12 (default) and 3 columns (breakpoint "l")
  </div>
  <div class="flex__child flex__child--gap-normal flex__child--6 flex__child--3-l">
    Column 2 with a width of 6 columns out of 12 (default) and 3 columns (breakpoint "l")
  </div>
  <div class="flex__child flex__child--gap-normal flex__child--12 flex__child--6-l">
    Column 3 with a width of 12 columns out of 12 (default) and 6 columns (breakpoint "l")
  </div>
</div>
```

### Available breakpoint classes for defining breakpoint specific behaviour are:

`flex(__child)--(modifier)-xs`
`flex(__child)--(modifier)-s`
`flex(__child)--(modifier)-m`
`flex(__child)--(modifier)-l`
`flex(__child)--(modifier)-xl`

### Following values can be set by using breakpoints:

Column width:
`flex__child--(size)-(breakpoint)`

Column offset:
`flex__child--offset-(size)-(breakpoint)`

Wrapping:
`flex--wrap-(breakpoint)`
`flex--nowrap-(breakpoint)`
`flex--wrap-reverse-(breakpoint)`

Direction (on the parent container):
`flex--direction-column-(breakpoint)`
`flex--direction-column-reverse-(breakpoint)`
`flex--direction-row-(breakpoint)`
`flex--direction-row-reverse-(breakpoint)`

Alignment main axis (horizontal for all children set on the parent container):
`flex--main-axis-start-(breakpoint)`
`flex--main-axis-end-(breakpoint)`
`flex--main-axis-center-(breakpoint)`
`flex--main-axis-between-(breakpoint)`
`flex--main-axis-around-(breakpoint)`
`flex--main-axis-evenly-(breakpoint)`

Alignment cross axis (vertical for all children set on the parent container):
`flex--cross-axis-stretch-(breakpoint)`
`flex--cross-axis-start-(breakpoint)`
`flex--cross-axis-end-(breakpoint)`
`flex--cross-axis-center-(breakpoint)`
`flex--cross-axis-baseline-(breakpoint)`

Align self (for specific children):
`flex__child--align-start-(breakpoint)`
`flex__child--align-end-(breakpoint)`
`flex__child--align-center-(breakpoint)`
`flex__child--align-stretch-(breakpoint)`

Gaps:
`flex--gap-offset-normal-(breakpoint)`
`flex--gap-offset-zero-(breakpoint)`
`flex__child--gap-normal-(breakpoint)`
`flex__child--gap-zero-(breakpoint)`

Grow/shrink (with values "0" and "1"):
`flex__child--grow-(breakpoint)`
`flex__child--shrink-(breakpoint)`
