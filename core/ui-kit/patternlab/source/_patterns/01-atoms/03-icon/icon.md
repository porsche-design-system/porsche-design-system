---
title: Icon
state: complete
---

# UI Kit Core icon manual

## UI / UX guidelines

__TBD__


## Technical guidelines
Porsche UI-Kit Core is using a SVG icon sprite system to present an object visually. 
Every project using UI-Kit Core must generate and implement their specific SVG icon sprite by itself regarding to their technical und visual needs.

### Building the icon sprite
The icon sprite must be build throughout a set of individual SVG icons. 
The whole set of icons can be found here:  
`~@porsche/ui-kit-core/src/base/icon/*.svg`  

If you do not optimize the SVG icons by yourself, you can also use the optimized icon set:  
`~@porsche/ui-kit-core/src/base/icon/*.min.svg`  

Building the sprite can be done manually or even better with help of a frontend build system, e.g. https://github.com/jkphl/svg-sprite.  

__Hints for optimizations__: 
* Using just the icons which are needed inside the application is recommended. 
* Reducing the file size of the icon sprite can be done by optimizing SVG's with a SVG optimizer which strips out unnecessary SVG code.
* Also activating GZIP compression on the server side can reduce file size up to 50%.
 
Finally the generated icon sprite should look something like this:  
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
For screen reader accessibility, provide a context-rich title for the SVG using the `<title>` element.

### Including the icon sprite
For modern browsers (including Chrome, Firefox, Safari, Edge13), setting a direct link to the SVG file is the best choice (shown in the example beyond). 
If older browsers like IE11 or Edge < 12 need to be supported, an additional polyfill must be included to implement the SVG sprite with AJAX. 
The best choice therefore is `svg4everybody` (https://github.com/jonathantneal/svg4everybody) which is a well tested and widely adopted SVG polyfill.

### Referencing SVG icon from a static sprite asset (recommended)
The SVG sprite is used by serving the icons bundled all together as a static asset. An icon can be referenced by setting a path to the SVG sprite file and adding a hash in combination with the icon ID identifier.  
``` 
<svg class="icon" role="img" title="arrow down">
  <use xlink:href="/path-to-icon-sprite/svg-sprite.svg#icon-arrow-down"/>
</svg>
``` 

### Icon inside an icon wrapper
Sometimes there may be technical reasons (e.g. js components) which cause in adding an additional wrapper element around the icon. In this case, moving the icon classes to the wrapper element is possible:  
``` 
<div class="icon">
  <svg role="img" title="arrow down">
    <use xlink:href="/path-to-icon-sprite/svg-sprite.svg#icon-arrow-down"/>
  </svg>
</div>
``` 

### Icon sizes
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
All icons are rendered in black by default. Changing the icon to a different color can be done by adding individual color definitions inside the CSS code:  
``` 
.some-color-class {
  color: $color-palette-white;
}

<svg class="icon some-color-class" role="img" title="arrow down">
  <use xlink:href="/path-to-icon-sprite/svg-sprite.svg#icon-arrow-down"/>
</svg>
``` 

### Accessibility
With using SVG icons, there are options to give more accessibility to users using screen readers. Here are some good practices:

* If icons stand alone, adding descriptive text with an `aria-label` attribute is a good practice:
```
<svg class="icon" role="img" focusable="false" aria-label="descriptive text, e.g: close the layer">
  <use xlink:href="../../images/porsche-ui-kit-docs/svg-sprite.svg#icon-close"/>
</svg>
```

* If an icon is just for visual presentation and has no meaning of its own, it can be hidden from screen readers.  
Possible use case: if an arrow icon is palced beside a descriptive button text:
```
<button type="button">
  <svg class="icon" role="img" focusable="false" aria-hidden="true">
    <use xlink:href="../../images/porsche-ui-kit-docs/svg-sprite.svg#icon-arrow-right"/>
  </svg>
  go to detail page
<button>
```
