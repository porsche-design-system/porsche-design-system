---
title: Pagination  
state: inprogress
---

To correctly display the pagination in different viewport sizes, the maximum amount of page links displayed is meant to be reduced for lower resolutions. 
For a correct implementation of the pagination, this amount of links to be displayed should be read from the `counter-reset` attribute defined on its root element.
The counter name being used currently is `maxNumberOfLinks`.
Currently the `maxNumberOfLinks` is either `7` (high res.) or `5` (low res.). Numbers should alsways be odd numbers `>= 5`.
The examples in the patternlab are all meant for `7`. 
See the next paragraph for desired behavior with `5`:
 

```
{1}[2][3][...][10]
[1]{2}[3][...][10]
[1][2]{3}[...][10]
[1][...]{4}[...][10]
[1][...]{5}[...][10]
[1][...]{6}[...][10]
[1][...]{7}[...][10]
[1][...]{8}[9][10]
[1][...][8]{9}[10]
[1][...][8][9]{10}

``` 
```
{} := current page 
``` 
