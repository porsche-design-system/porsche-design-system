---
title: Icon
state: inprogress
---

# UI Kit Core icon manual

## UI / UX guidelines

__TBD__


## Technical guidelines
UI-Kit Core is using a SVG icon sprite system to present an object visually. 
Every project using UI-Kit Core must generate and implement their SVG icon sprite by itself regarding to their technical und visual needs.

### Building the icon sprite
The icon sprite must be build through out a set of SVG icons. The whole set of icons can be found here:  
`~@porsche/ui-kit-core/src/base/icon/*.svg`  
Reducing the file size of the icon sprite can be done by picking just the icons which are needed inside the application.

This can be done manually or even better with help of a frontend build system, e.g. https://github.com/jkphl/svg-sprite.  
 
The generated icon sprite should look like this:  
``` 
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="icon-arrow-down-hair" viewBox="0 0 32 32">
    <title>icon_arrow-down-hair</title>
    <path d="M4 15v-3l12 9.5 12-9.5v3l-12 9.5z"/>
  </symbol>
  <symbol id="icon-arrow-down-thin" viewBox="0 0 32 32">
    <title>icon_arrow-down-thin</title>
    <path d="M4 15v-4.5l12 9.5 12-9.5v4.5l-12 9.5z"/>
  </symbol>
  <symbol id="icon-arrow-down" viewBox="0 0 32 32">
    <title>icon_arrow-down</title>
    <path d="M4 15v-8l12 9.5 12-9.5v8l-12 9.5z"/>
  </symbol>
  ...
</svg>

``` 

For screen reader accessibility, provide a context-rich title for the SVG using `<title>` element.

### Implementing icons
Implementing a specific icon must be done like this:  
``` 
<svg class="icon" role="img" title="arrow down">
  <use xlink:href="/path-to-icon-sprite/svg-sprite.svg#icon-arrow-down"/>
</svg>
``` 

### Sizes
There are pre-defined icon sizes which can be set by adding one of the following classes:  
``` 
<svg class="icon icon--medium" role="img" title="arrow down">
  <use xlink:href="/path-to-icon-sprite/svg-sprite.svg#icon-arrow-down"/>
</svg>
``` 

Available sizes:  
`icon--x-small` => 18px  
`icon--small` => 24px  
`icon--medium` => 30px  
`icon--large` => 42px  
`icon--x-large` => 60px  

### Colors
All icons are rendered in black per default. Changing the icon to a  different color can be done by adding individual color definitions in the CSS code:  
``` 
.some-color-class {
  color: $color-palette-white;
}

<svg class="icon some-color-class" role="img" title="arrow down">
  <use xlink:href="/path-to-icon-sprite/svg-sprite.svg#icon-arrow-down"/>
</svg>
``` 
