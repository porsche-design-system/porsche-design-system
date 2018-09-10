---
title: Pagination  
state: inprogress
---

# UI Kit Core pagination manual

## Basics
The pagination is used whenever a content (text, images, videos) is split into several pages. It provides information on the existing amount of pages, shows the current page position and allows the user to navigate between the single content pages.

## Related
Component Sheet (all states): 
- https://porsche.invisionapp.com/d/main#/console/15200048/318494277/preview
- https://porsche.invisionapp.com/d/main#/console/15200048/318494276/preview

Implementation in UI Kit:
- https://pcc-portal-e-ct.emea.porsche.biz/static/porsche-ui-kit/core/PUIK-74/?p=viewall-molecules-pagination 

## UI / UX guidelines

### Styling
- The pagination is available for light (standard) and dark (inverted) background.
- It comes in 4 different sizes, containing either 1 item (for 1-page-content), 2 items (for 2-page-content), 5 items (for ≥ 5 pages) and 7 items (for ≥ 7 pages). The 7 item version is recommended to be used for device widths ≥ 480 px.
- The pagination should always be placed centered beneath the related content, keeping a minimum top spacing of 30 px.

### Interaction
- The arrows allow the user to skip to the previous or next page, thus they are interactive by default. When reaching the first or last content page, either the left or right arrow is disabled.
- The current page position is always indicated by a red bottom line. By default, the current page item is not clickable.
- If there are at least 8 pages, an ellipsis (three dots "...") is shown for a dedicated range of pages that are located inbetween the visible pagination numbers. The ellipsis is not clickable.

### Usability
- Each pagination item (arrows, numbers, ellipsis) spans over 40 x 40 px to guarantee a proper touch area also on mobile devices.

## Technical guidelines

### Differences in mobile and Tablet/Desktop viewports
To correctly display the pagination in different viewport sizes, the maximum amount of page links displayed is meant to be reduced for lower resolutions. 
For a correct implementation of the pagination, this amount of links to be displayed should be read from the `counter-reset` attribute defined on its root element.
The counter name being used currently is `maxNumberOfLinks`.
Currently the `maxNumberOfLinks` is either `7` (high res.) or `5` (low res.). Numbers should alsways be odd numbers `>= 5`.
The examples in the patternlab are all meant for `7`. 
See the next paragraph for desired behavior with `5`:
 
### Logical behaviour of pagination items

#### More than 7 items
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
