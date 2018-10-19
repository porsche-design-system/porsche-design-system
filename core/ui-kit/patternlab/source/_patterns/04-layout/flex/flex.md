---
title: Flex
state: inreview
---

# UI Kit Core flex manual

## Technical guidelines
The Porsche UI Kit flex layout system is based on native css flex behaviours and can be controlled by class names.

### Flex container
#### Initialization of flex context as a block level element

```
<div class="flex">
  <div class="flex__child">
    Column 1
  </div>
  <div class="flex__child">
    Column 2
  </div>
</div>
```

#### Initialization of flex context as an inline level element

```
<div class="flex flex--inline">
  <div class="flex__child">
    Column 1
  </div>
  <div class="flex__child">
    Column 2
  </div>
</div>
```

### Direction
In some cases it might be neccessary to define or change direction of the columns. Default is `row`. But `column` is also possible to set the columns vertically underneath each other. Changing optical order can be achieved by setting `reverse`.

#### Column
```
<div class="flex flex--direction-column">
  <div class="flex__child">
    Column 1 but vertically aligned
  </div>
  <div class="flex__child">
    Column 2 vertically aligned
  </div>
</div>
```

#### Row reverse
```
<div class="flex flex--direction-row-reverse">
  <div class="flex__child">
    Column 1 displayed in a reverse order
  </div>
  <div class="flex__child">
    Column 2 displayed in a reverse order
  </div>
</div>
```

Class names must be set on the flex parent container:  
`flex--direction-row` #(default)  
`flex--direction-row-reverse`  
`flex--direction-column`  
`flex--direction-column-reverse`  


### Alignment (for all children)
Native flexbox alignments can also be set by adding specific class names to the flex parent container.

#### Main axis

```
<div class="flex flex--main-axis-end">
  <div class="flex__child">
    Column 1 aligned to the end of container
  </div>
  <div class="flex__child">
    Column 2 aligned to the end of container
  </div>
</div>
```

These alignment values can be set:  
`flex--main-axis-start` #(default)  
`flex--main-axis-end`  
`flex--main-axis-center`  
`flex--main-axis-space-between`  
`flex--main-axis-space-around`  
`flex--main-axis-space-evenly`  

#### Cross axis

```
<div class="flex flex--cross-axis-end">
  <div class="flex__child">
    Column 1 aligned to the bottom of container
  </div>
  <div class="flex__child">
    Column 2 aligned to the bottom of container
  </div>
</div>
```

These alignment values can be set:  
`flex--cross-axis-stretch` #(default)  
`flex--cross-axis-start`  
`flex--cross-axis-end`  
`flex--cross-axis-center`  
`flex--cross-axis-baseline`  

#### Align content
Note: this property has no effect when there is only one line of flex items.

```
<div class="flex flex--align-content-center">
  <div class="flex__child">
    All columns are centered
  </div>
  <div class="flex__child">
    All columns are centered
  </div>
</div>
```

These alignment values can be set:  
`flex--align-content-stretch` #(default)  
`flex--align-content-start` 
`flex--align-content-end`  
`flex--align-content-center`  
`flex--align-content-space-between`  
`flex--align-content-space-around`  


### Wrapping
The flex-wrap property is a sub-property of the flexible box layout module. It defines whether the flex items are forced in a single line or can be flowed into multiple lines. If set to multiple lines, it also defines the cross-axis which determines the direction new lines are stacked in (the cross axis is the axis perpendicular to the main axis. Its direction depends on the main axis direction).

```
<div class="flex flex--wrap">
  <div class="flex__child">
    Column 1
  </div>
  <div class="flex__child">
    Column 2
  </div>
</div>
```

These wrapping values can be set:  
`flex--nowrap` #(default)  
`flex--wrap`  
`flex--wrap-reverse`  


### Align self (for specific children)

```
<div class="flex">
  <div class="flex__child">
    Column 1
  </div>
  <div class="flex__child flex__child--align-end">
    Column 2 self aligned to the bottom
  </div>
</div>
```

These alignment values can be set:  
`flex__child--align-auto` #(default)  
`flex__child--align-start`  
`flex__child--align-end`  
`flex__child--align-center`  
`flex__child--align-stretch`  
`flex__child--align-baseline`  

### Grow/shrink/auto
Flexbox default behaviour on how the childrens widths are rendered (shrinked, stretched, auto) can be overwritten with the following class names.

```
<div class="flex">
  <div class="flex__child flex__child--grow-1">
    Column 1
  </div>
  <div class="flex__child">
    Column 2
  </div>
</div>
```

These values can be set:  
`flex__child--grow-0` #(default)  
`flex__child--grow-1`  
`flex__child--shrink-1` #(default)  
`flex__child--shrink-0`  
`flex__child--auto`  
`flex__child--none`  


### Responsive
The flex system can provide breakpoint specific values to fit the needs of certain viewports:

#### Available breakpoint classes for defining breakpoint specific behaviour

`flex(__child)--(modifier)-xs`  
`flex(__child)--(modifier)-s`  
`flex(__child)--(modifier)-m`  
`flex(__child)--(modifier)-l`  
`flex(__child)--(modifier)-xl`  

#### Following values can be set by using breakpoints classes

Flex context:
`flex-(breakpoint)`  
`flex--inline-(breakpoint)`  
`flex--none-(breakpoint)`  

Direction (on the parent container):  
`flex--direction-column-(breakpoint)`  
`flex--direction-column-reverse-(breakpoint)`  
`flex--direction-row-(breakpoint)`  
`flex--direction-row-reverse-(breakpoint)`  

Alignment of main axis (for all children set on the parent container):  
`flex--main-axis-start-(breakpoint)`  
`flex--main-axis-end-(breakpoint)`  
`flex--main-axis-center-(breakpoint)`  
`flex--main-axis-space-between-(breakpoint)`  
`flex--main-axis-space-around-(breakpoint)`  
`flex--main-axis-space-evenly-(breakpoint)`  

Alignment of cross axis (for all children set on the parent container):  
`flex--cross-axis-stretch-(breakpoint)`  
`flex--cross-axis-start-(breakpoint)`  
`flex--cross-axis-end-(breakpoint)`  
`flex--cross-axis-center-(breakpoint)`  
`flex--cross-axis-baseline-(breakpoint)`  

Align content (for all children set on the parent container):  
`flex--align-content-stretch-(breakpoint)`  
`flex--align-content-start-(breakpoint)`  
`flex--align-content-end-(breakpoint)`  
`flex--align-content-center-(breakpoint)`  
`flex--align-content-space-between-(breakpoint)`  
`flex--align-content-space-around-(breakpoint)`  

Wrapping:  
`flex--wrap-(breakpoint)`  
`flex--nowrap-(breakpoint)`  
`flex--wrap-reverse-(breakpoint)`  

Align self (for specific children):  
`flex__child--align-auto-(breakpoint)`  
`flex__child--align-start-(breakpoint)`  
`flex__child--align-end-(breakpoint)`  
`flex__child--align-center-(breakpoint)`  
`flex__child--align-stretch-(breakpoint)`  
`flex__child--align-baseline-(breakpoint)`  

Grow/shrink/auto (values "0" and "1"):  
`flex__child--grow-(value)-(breakpoint)`  
`flex__child--shrink-(value)-(breakpoint)`  
`flex__child--auto-(breakpoint)`  
`flex__child--none-(breakpoint)`  
