---
title: Grid Float
state: complete
---

# @Deprecated
Please use Grid Flex component instead

# UI Kit Core grid manual

## Float grid

The float grid is a typical "mobile first" column grid using 12 columns.

### Basics

The most basic markup contains one row and one column:

```
<div class="row">
	<div class="column column--auto">One column</div>
</div>
```
*Note: you don't explicitly need to use the class `column--auto`, as it is the default.*

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
	<div class="column column--12 column--6-m column--4-l">Usually I'm using 12 cols, but at M it's 6 and L only 4</div>
	<div class="column column--12 column--6-m column--8-l">I use 6 cols at M and 8 cols at L and above</div>
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
<div class="row">
	<div class="column column--8 column--direction-reverse">I should be on the left, but I was reversed</div>
	<div class="column column--4 column--direction-reverse">Yeah, I'm on the left!</div>
</div>
```

There are responsive direction modifier classes, too:

```
column--(direction-type)-xs
column--(direction-type)-s
column--(direction-type)-m
column--(direction-type)-l
column--(direction-type)-xl
```

### Gap classes

*Note: in order to use the gap classes on columns, you need to have the same gap modifier on the row as well.*

#### Normal (default)
```
column--gap-normal
```

#### Small
```
<div class="row row--gap-small">
	<div class="column column--8 column--gap-small">Our gap is smaller than the default one</div>
	<div class="column column--4 column--gap-small">Count me in</div>
</div>
```

#### Zero (none)
```
<div class="row row--gap-zero">
	<div class="column column--8 column--gap-zero">I have no gap at all</div>
	<div class="column column--4 column--gap-zero">Me neither</div>
</div>
```
You can use the following responsive gap modifier classes:

```
column--(gap-type)-xs
column--(gap-type)-s
column--(gap-type)-m
column--(gap-type)-l
column--(gap-type)-xl
```

And for the rows, accordingly:

```
row--(gap-type)-xs
row--(gap-type)-s
row--(gap-type)-m
row--(gap-type)-l
row--(gap-type)-xl
```
