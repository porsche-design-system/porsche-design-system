---
title: Flex
state: inreview
---

# UI Kit Core flex manual

## Technical guidelines
The Porsche UI Kit flex layout system is based on native css flex behaviours and can be controlled by class names.

### Direction
In some cases it might be neccessary to define or change direction of the columns. Default is `row`. But `column` is also possible to set the columns vertically underneath each other. Changing optical order can be achieved by setting `reverse`.

#### Column
```
<div class="flex flex--direction-column">
  <div class="flex__child">
    Column 1 with a width of 6 but vertically aligned
  </div>
  <div class="flex__child">
    Column 2 with a width of 6 but vertically aligned
  </div>
</div>
```

#### Row reverse
```
<div class="flex flex--direction-row-reverse">
  <div class="flex__child">
    Column 1 with a width of 6 but displayed in a reverse order
  </div>
  <div class="flex__child">
    Column 2 with a width of 6 but displayed in a reverse order
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

#### Main axis (horizontal)

```
<div class="flex flex--main-axis-end">
  <div class="flex__child">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child">
    Column 2 with a width of 3 aligned to the end of container
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

#### Cross axis (vertical)

```
<div class="flex flex--cross-axis-end">
  <div class="flex__child">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child">
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
<div class="flex flex--cross-axis-end">
  <div class="flex__child">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child">
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
<div class="flex flex--wrap">
  <div class="flex__child">
    Column 1 with a width of 3 aligned to the end of container
  </div>
  <div class="flex__child">
    Column 2 with a width of 3 aligned to the end of container
  </div>
</div>
```

These wrapping values can be set:  
`flex--nowrap` #(default)  
`flex--wrap`  
`flex--wrap-reverse`  


### Responsive
The flex system can provide breakpoint specific values to fit the needs of certain viewports:

#### Available breakpoint classes for defining breakpoint specific behaviour

`flex(__child)--(modifier)-xs`  
`flex(__child)--(modifier)-s`  
`flex(__child)--(modifier)-m`  
`flex(__child)--(modifier)-l`  
`flex(__child)--(modifier)-xl`  

#### Following values can be set by using breakpoints classes

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
`flex--main-axis-space-between-(breakpoint)`  
`flex--main-axis-space-around-(breakpoint)`  
`flex--main-axis-space-evenly-(breakpoint)`  

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

Grow/shrink/auto (values "0" and "1"):  
`flex__child--grow-(breakpoint)`  
`flex__child--shrink-(breakpoint)`  
`flex__child--auto-(breakpoint)`  
