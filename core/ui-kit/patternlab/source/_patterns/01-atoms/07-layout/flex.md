---
title: Flex Layout
state: inreview
---

# UI Kit Core flex layout manual


## UI / UX guidelines

### Recommendation of use
The grid is a fixed component in the digital Porsche layout. It provides a visual system consisting of a defined number of columns that allow a homogeneous, balanced content placement with standardised horizontal spacings defined by the grid gutter.  

The flexible grid is the central tool to provide a responsive layout by defining a specific number of grid columns for modules or elements for different viewport sizes. Therefore, the grid is a mandatory part of every digital layout process and should always be kept in mind when designing Porsche web experiences.

### Grid layout and behaviour
The number of grid columns differs for the different viewports. Generally, it is based on 12 columns that is dividable by 2, 3, 4 and 6 and therefore allows a high layout flexibility:
  * ≤ 759 px: 6 columns (valid for UI design only, technically 12 columns)
  * ≥ 760 px: 12 columns

Grid gutter:
  * ≤ 759 px: 16 px
  *   760-999 px: 24 px
  * ≥ 1000 px: 36 px
  
Margin column:
  * ≤ 1759 px: 7%
  * ≥ 1760 px: 10%
  
### Main Breakpoints & optimized layout sizes
* The main breakpoints for all Porsche web experiences are: 760 px / 1000 px / 1300 px and 1760 px. They are based on statistical data on browser size usage and binding, especially for general elements like e.g. header or footer.
* Depending on the specific component or module, not each and every breakpoint is necessarily to be used. In case more breakpoints are needed for a specific component, you are free to add more. Please make sure that all additional breakpoints must have a minimum difference of 100 px to the existing main breakpoints.
* Based on the main breakpoints, all Porsche web layouts are to be optimized for the following viewport sizes: 320, 375, 768, 1024, 1366 and 1920 px width.

### Layouting
* Content elements should be placed within the grid, always starting in a column.
* It is possible to place elements outside the grid, e.g. browser-width pictures. This should be a well thought out exception.

## Technical guidelines
The Porsche UI Kit flex layout system is based upon a standard 12 column responsive grid. Its main purpose is to provide a solid and flexible grid system for defining layout areas. But it can also be used to layout complete components which are not using grid specific values. Breakpoint specific behaviour (width, offset, alignments, etc.) can easily be set by adding breakpoint specific classnames. Also decent nestings are supported.

### Basic Grid
For basic grid implementation, it is recommended to use this pattern:

```
<div class="flex flex--gap-shim-grid">
	<div class="flex__child flex__child--gap-grid flex__child--6">
    Column 1 with a width of 6 columns out of 12
  </div>
  <div class="flex__child flex__child--gap-grid flex__child--6">
    Column 2 with a width of 6 columns out of 12
  </div>
</div>
```

The classes `flex` and `flex--gap-shim-grid` on the parent and `flex__child` and `flex__child--gap-grid` on the children are mandatory. With `flex__child--(1-12)` it is possible to define column width.


### Offset
In some cases it can be neccessary to indent columns. The grid gives basic indentions based on grid sizings:

```
<div class="flex flex--gap-shim-grid">
  <div class="flex__child flex__child--gap-grid flex__child--10 flex__child--offset-1">
    1 column with a width of 10 and an offset left of 1
  </div>
</div>
```
The child column has an offset of 1 column on the left and due to its length of 10 columns an offset of 1 column to the right.


### Direction
In some cases it might be neccessary to define or change direction of the columns. Default is `row`. But `column` is also possible to set the columns vertically underneath each other. Changing optical order can be achieved by setting `reverse`.

#### Column
```
<div class="flex flex--gap-shim-grid flex--direction-column">
  <div class="flex__child flex__child--gap-grid flex__child--6">
    Column 1 with a width of 6 but vertically aligned
  </div>
  <div class="flex__child flex__child--gap-grid flex__child--6">
    Column 2 with a width of 6 but vertically aligned
  </div>
</div>
```

#### Row reverse
```
<div class="flex flex--gap-shim-grid flex--direction-row-reverse">
  <div class="flex__child flex__child--gap-grid flex__child--6">
    Column 1 with a width of 6 but displayed in a reverse order
  </div>
  <div class="flex__child flex__child--gap-grid flex__child--6">
    Column 2 with a width of 6 but displayed in a reverse order
  </div>
</div>
```

Class names must be set on the grid parent container:  
`flex--direction-row` #(default)  
`flex--direction-row-reverse`  
`flex--direction-column`  
`flex--direction-column-reverse`  


### Alignment (for all children)
Native flexbox alignments can also be set by adding specific class names to the grid parent container.

#### Main axis (horizontal)

```
<div class="flex flex--gap-shim-grid flex--main-axis-end">
  <div class="flex__child flex__child--gap-grid flex__child--3">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child flex__child--gap-grid flex__child--3">
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

#### Cross axis (vertical)

```
<div class="flex flex--gap-shim-grid flex--cross-axis-end">
  <div class="flex__child flex__child--gap-grid flex__child--3">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child flex__child--gap-grid flex__child--3">
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


#### Align self (for specific children)

```
<div class="flex flex--gap-shim-grid flex--cross-axis-end">
  <div class="flex__child flex__child--gap-grid flex__child--3">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child flex__child--gap-grid flex__child--3">
    Column 2 with a width of 3 aligned to the end of container
  </div>
</div>
```

These alignment values can be set:  
`flex__child--align-start` #(default)  
`flex__child--align-end`  
`flex__child--align-center`  
`flex__child--align-stretch`  


### Wrapping
The flex-wrap property is a sub-property of the flexible box layout module. It defines whether the flex items are forced in a single line or can be flowed into multiple lines. If set to multiple lines, it also defines the cross-axis which determines the direction new lines are stacked in.

```
<div class="flex flex--gap-shim-grid flex--wrap">
  <div class="flex__child flex__child--gap-grid flex__child--3">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child flex__child--gap-grid flex__child--3">
    Column 2 with a width of 3 aligned to the end of container
  </div>
</div>
```

These wrapping values can be set:  
`flex--nowrap` #(default)  
`flex--wrap`  
`flex--wrap-reverse`  


### Zero gap (native flexbox behaviour)
The flex layout module is much more than just defining rough grid layout areas. It's there to build complete layouts on component basis by supporting every css flexbox property which can be set by (responsive) class names. Here are some examples to get rid of the default grid gaps and widths an dive into native flexbox layouting.

#### 2 items side by side
```
<div class="flex">
  <div class="flex__child">
    1st item aligned left
  </div>
  <div class="flex__child">
    2nd item aligned left to item 1
  </div>
</div>
```

#### 2 items with "space-between"
```
<div class="flex flex--main-axis-space-between">
  <div class="flex__child">
    1st item aligned left
  </div>
  <div class="flex__child">
    2nd item aligned right
  </div>
</div>
```

### Nesting
Basic nesting of grids is supported. "Basic" because of percentage value of width and gaps which couldn't be calculated for each column width. Here are some examples of "dos" and "don'ts":

#### Possible nestings by keeping columns in "the grid"
Only columns with the following widths could be nested:
- total width of 8
- total width of 6
- total width of 4

#### Forbidden nestings
Nesting inside columns with the following widths should be prevented, because all children widths won't be in "the grid" anymore:
- total width of 11
- total width of 10
- total width of 9
- total width of 7
- total width of 5
- total width of 3


### Responsive
The grid system is responsive by itself by using percentages for every value (widths, gaps, offsets). But it can also provide breakpoint specific values to fit the needs of certain viewports:

```
<div class="flex flex--gap-shim-grid">
	<div class="flex__child flex__child--gap-grid flex__child--6 flex__child--3-l">
    Column 1 with a width of 6 columns out of 12 (default) and 3 columns (breakpoint "l")
  </div>
  <div class="flex__child flex__child--gap-grid flex__child--6 flex__child--3-l">
    Column 2 with a width of 6 columns out of 12 (default) and 3 columns (breakpoint "l")
  </div>
  <div class="flex__child flex__child--gap-grid flex__child--12 flex__child--6-l">
    Column 3 with a width of 12 columns out of 12 (default) and 6 columns (breakpoint "l")
  </div>
</div>
```

#### Available breakpoint classes for defining breakpoint specific behaviour

`flex(__child)--(modifier)-xs`  
`flex(__child)--(modifier)-s`  
`flex(__child)--(modifier)-m`  
`flex(__child)--(modifier)-l`  
`flex(__child)--(modifier)-xl`  

#### Following values can be set by using breakpoints classes

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

Alignment of main axis (horizontal for all children set on the parent container):  
`flex--main-axis-start-(breakpoint)`  
`flex--main-axis-end-(breakpoint)`  
`flex--main-axis-center-(breakpoint)`  
`flex--main-axis-between-(breakpoint)`  
`flex--main-axis-around-(breakpoint)`  
`flex--main-axis-evenly-(breakpoint)`  

Alignment of cross axis (vertical for all children set on the parent container):  
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
`flex--gap-shim-grid-(breakpoint)`  
`flex--gap-shim-zero-(breakpoint)`  
`flex__child--gap-grid-(breakpoint)`  
`flex__child--gap-zero-(breakpoint)`  

Grow/shrink (values "0" and "1"):  
`flex__child--grow-(breakpoint)`  
`flex__child--shrink-(breakpoint)`  
