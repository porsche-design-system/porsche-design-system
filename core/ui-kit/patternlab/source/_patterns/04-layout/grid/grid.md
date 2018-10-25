---
title: Grid
state: inreview
---

# UI Kit Core grid manual


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
The Porsche UI Kit grid system is based upon a standard 12 column responsive grid. Its main purpose is to provide a solid and flexible grid system for defining layout areas. Breakpoint specific behaviour (width, offset, etc.) can easily be set by adding breakpoint specific classnames. Also decent nestings are supported.

### Size
For basic grid implementation, it is recommended to use this pattern:

```
<div class="grid">
  <div class="grid__child grid__child--size-6">
    Column 1 with a width of 6 columns out of 12
  </div>
  <div class="grid__child grid__child--size-6">
    Column 2 with a width of 6 columns out of 12
  </div>
</div>
```

The class `grid` on the parent and `grid__child` on the children are mandatory. With `grid__child--size-(1-12)` it is possible to define column widths.


### Offset
In some cases it can be neccessary to indent columns. The grid gives basic indentions based on grid sizings:

```
<div class="grid">
  <div class="grid__child grid__child--size-10 grid__child--offset-1">
    1 column with a width of 10 and an offset left of 1
  </div>
</div>
```
The child column has an offset of 1 column on the left and due to its length of 10 columns an offset of 1 column to the right. With `grid__child--offset-(0-11)` it is possible to define offsets.


### Direction
In some cases it might be neccessary to define or change direction of the columns/rows. Default is `row`. But `column` is also possible to set the columns vertically underneath each other. Changing optical order can be achieved by setting `reverse`.

#### Column
```
<div class="grid grid--direction-column">
  <div class="grid__child grid__child--size-6">
    Column 1 with a width of 6 but vertically aligned
  </div>
  <div class="grid__child grid__child--size-6">
    Column 2 with a width of 6 but vertically aligned
  </div>
</div>
```

#### Row reverse
```
<div class="grid grid--direction-row-reverse">
  <div class="grid__child grid__child--size-6">
    Column 1 with a width of 6 but displayed in a reverse order
  </div>
  <div class="grid__child grid__child--size-6">
    Column 2 with a width of 6 but displayed in a reverse order
  </div>
</div>
```

Class names must be set on the grid parent container:  
`grid--direction-row` #(default)  
`grid--direction-row-reverse`  
`grid--direction-column`  
`grid--direction-column-reverse`  


### Gap
In some cases it might be useful to adapt the gap of the grid. Default is `normal`. But `zero` is also possible to place elements besides each other without spacings.

#### Zero
```
<div class="grid grid--gap-zero">
  <div class="grid__child grid__child--size-6">
    1st item aligned left
  </div>
  <div class="grid__child grid__child--size-6">
    2nd item aligned left to item 1
  </div>
</div>
```

Class names must be set on the grid parent container:  
`grid--gap-normal` #(default)  
`grid--gap-zero`  

### Nesting
Basic nesting of grids is supported. "Basic" because of percentage value of width and gaps which couldn't be calculated for each column width. Here are some examples of "dos" and "don'ts":

#### Possible nesting by keeping columns in "the grid"
Only columns with the following widths could be nested:
- total width of 8
- total width of 6
- total width of 4

#### Forbidden nesting
Nesting inside columns with the following widths should be prevented, because all children widths won't be in "the grid" anymore:
- total width of 11
- total width of 10
- total width of 9
- total width of 7
- total width of 5
- total width of 3


### Responsive
The grid system is fluid/responsive by itself by using percentages for every value (widths, gaps, offsets). But it can also provide breakpoint specific values to fit the needs of certain viewports:

```
<div class="grid">
  <div class="grid__child grid__child--size-6 grid__child--size-3-l">
    Column 1 with a width of 6 columns out of 12 (default) and 3 columns (breakpoint "l")
  </div>
  <div class="grid__child grid__child--size-6 grid__child--size-3-l">
    Column 2 with a width of 6 columns out of 12 (default) and 3 columns (breakpoint "l")
  </div>
  <div class="grid__child grid__child--size-12 grid__child--size-6-l">
    Column 3 with a width of 12 columns out of 12 (default) and 6 columns (breakpoint "l")
  </div>
</div>
```

#### Available breakpoint classes for defining breakpoint specific behaviour

`grid(__child)--(modifier)-xs`  
`grid(__child)--(modifier)-s`  
`grid(__child)--(modifier)-m`  
`grid(__child)--(modifier)-l`  
`grid(__child)--(modifier)-xl`  

#### Following values can be set by using breakpoints classes

Size:  
`grid__child--size-(size)-(breakpoint)`  

Offset:  
`grid__child--offset-(offset)-(breakpoint)`  

Direction:  
`grid--direction-column-(breakpoint)`  
`grid--direction-column-reverse-(breakpoint)`  
`grid--direction-row-(breakpoint)`  
`grid--direction-row-reverse-(breakpoint)`  

Gaps:  
`grid--gap-normal-(breakpoint)`  
`grid--gap-zero-(breakpoint)`  
