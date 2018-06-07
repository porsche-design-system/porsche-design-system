---
title: Grid Float
state: inprogress
---

# UI Kit Core grid manual (wip)

## Float grid

The float grid is a typical "mobile first" column grid using 12 columns.

### Basics

The most basic markup contains one row and one column:

```
<div class="row">
	<div class="column">One column</div>
</div>
```

To have rows with multiple columns (up to 12), you need to define the colum size using these the column classes:

```
<div class="row">
	<div class="column column--6">I'm using 6 colums out of 12</div>
	<div class="column column--6">Me, too</div>
</div>
```

### Responsive column modifier classes

In the examples above, one row will always use the defined column sizes on all viewports.

To define responsive (breakpoint based) columns, you can use the following modifier classes:

```
<div class="row">
	<div class="column column--12 column--6-m">Usually I'm using 12 cols, but from M and above it's only 6</div>
	<div class="column column--12 column--6-m">I'll do the same</div>
</div>
```

The available classes are:

```
column--(size)-xs
column--(size)-s
column--(size)-m
column--(size)-l
column--(size)-xl
```

### Direction classes

#### Normal (default)
```
column--direction-normal
```

#### Reverse
```
column--direction-reverse
```

### Gap classes

### Normal (default)
```
column--gap-normal
```

#### Small
```
column--gap-small
```

#### Zero (none)
```
column--gap-zero
```

