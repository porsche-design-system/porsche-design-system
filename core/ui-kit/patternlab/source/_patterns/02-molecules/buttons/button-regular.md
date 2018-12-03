---
title: Button Regular
state: inprogress
---

# UI Kit Core button manual

## Recommendation of use
A Button Regular enables the user to execute an action, change the state of an application or jump to another page with a single tap. For an optimal user guidance and dedicated pursuit of business or sales goals, different types of buttons (basic, highlight, sales) can be used.

## Styling
- The Button Regular is available for light (standard) and dark (inverted) background.
- It always contains an icon (default: arrow right) and a text label in copytext size. 
- The content is always positioned top left aligned within the button. 
- Button dimensions:
  - __Width:__ By default, the button width is determined by the specific content length.
  - __Height:__ Standard size 50 px (padding left/right 18 px), small size 30 px (padding left/right 12 px). If it gets multilined, the Button Regular grows to the bottom, keeping its initial padding.
- The Button Regular comes in 2 different sizes. The small size is only to be used in dedicated cases, when a standard size is not appropriate (usually for lack of space).
- Different types of buttons are available to be used for specific contexts:
  - __Basic:__ Default button in grey (standard) or white (inverted). 
  - __Highlight:__ Button Regular in red. To be used only for next best actions to give the user the best guidance possible. Allowed max. 2 times per screen.
  - __Sales:__ Button Regular in blue, only to be used for sales-relevant interactions or promotional functions.
- __Filled & Ghost:__ Both Basic and Sales Button are available in filled and ghost (outline only) view. The ghost view is always subordinate to the filled view, thus it is often used in combination (e.g. Submit = filled / Cancel = ghost) or stand-alone, when there are other buttons on a page with higher priority.
- __Button Positioning:__ By default, the Button Regular is to be positioned left-aligned within a module or a screen. Depending on the content and the user guidance, the position can be changed individually, e.g. it can also be placed right-aligned (e.g. in forms) or also at the end of a text (e.g. error notifications). 

## Interaction
- The whole button area is clickable. The clickability is indicated by a specific hover state (slightly changing color).

## Usability
- __Button width:__ Even if there is no technical limit to the button width, you should always make sure that the button remains legible, even more so in multiline state. For copytext size, it is recommended to use max. 100 characters per line (equals approx. 700 px button width).
- __Disabled state:__ All types of Button Regular are provided in disabled state. However, disabled states should be avoided whenever possible, as they always tend to disrupt the user and break the user flow. Keep in mind: “The best way [to] prevent user error is to make sure that the user cannot make errors in the first place (…).” (Donald A. Norman, 2002).

## Technical guidelines

### Defining button types and variants
All button types can be generated out of the basic button by implementing additional modifier classes:

__Button regular basic (default):__  
`<button type="button" class="button-regular">Lorem ipsum</button>`  

__Button regular with "ghost" modifier:__  
`<button type="button" class="button-regular button-regular--ghost">Lorem ipsum</button>` 

__Button regular with sales and small modifier:__  
`<button type="button" class="button-regular button-regular--sales button-regular--small">Lorem ipsum</button>`  

__All buttons can either be `<button>` elements or `<a>` elements:__  
`<a href="#" class="button-regular">Lorem ipsum</a>`

__The following class modifier can be used to define the needed button type:__  
`button-regular--ghost` => ghost button  
`button-regular--sales` => sales button  
`button-regular--sales-ghost` => sales ghost button  
`button-regular--highlight` => highlight button  
`button-regular--loading` => button with loader (see explanation below)  
`button-regular--inverted` => inverted button on dark backgrounds  
`button-regular--small` => small button  
`button-regular--stretch` => stretched button  
`button-regular--group` => grouped buttons  

__For defining disabled states, the usage of disabled attribute or equivalent aria-role is recommended:__  
`<button type="button" disabled>Lorem ipsum</button>` => disables a button type="button" element  
`<a aria-disabled="true">Lorem ipsum</a>` => disables a link (anker) element  

### Set specific icons
If another icon needs to be implemented, just replace the #name with your new icon name from the sprite:  

```
<svg class="icon-svg button-regular__icon" role="img" title="close icon">
  <use xlink:href="/path/to/your/svg-sprite.svg#icon-close" />
</svg>
``` 

Further informations about SVG icons can be found in the `icon-svg` documentation.  

### Loading state
If a button has a loading state, it must also be set in a disabled state to prevent click behaviour caused by the user.  
To show the loader icon, the default svg icon (probably implemented by `<use>`-tag) must be replaced with the loader component:  

```
<span class="loader loader--small button-regular__icon-loader" aria-busy="true">
  <svg class="loader__fg loader__fg--small" viewBox="25 25 50 50" role="img" title="loader circle">
    <circle class="loader__fg-path" cx="50" cy="50" r="20"></circle>
  </svg>
  <svg class="loader__bg loader__bg--small" viewBox="25 25 50 50" role="img" title="loader circle">
    <circle class="loader__bg-path" cx="50" cy="50" r="20"></circle>
  </svg>
</span>
```

### Button group
Displaying a group of buttons which are placed side by side (horizontal) or among each other (vertical) can be done by combining `flex` component with `button-group`.

__Button group horizontal:__  
```
<div class="flex button-group">
  <button type="button" class="button-regular">
      <svg class="icon-svg button-regular__icon" role="img" title="arrow-right-hair">
        <use xlink:href="../../images/porsche-ui-kit-docs/svg-sprite.svg#icon-arrow-right-hair"></use>
      </svg>
    <span class="button-regular__label">Some Button Label with more text</span>
  </button>
  <button type="button" class="button-regular button-regular--highlight">
      <svg class="icon-svg button-regular__icon" role="img" title="arrow-right-hair">
        <use xlink:href="../../images/porsche-ui-kit-docs/svg-sprite.svg#icon-arrow-right-hair"></use>
      </svg>
    <span class="button-regular__label">Less text</span>
  </button>
</div>
```

__Button group vertical:__  
```
<div class="flex flex--direction-column flex--cross-axis-start button-group button-group--vertical">
  <button type="button" class="button-regular">
      <svg class="icon-svg button-regular__icon" role="img" title="arrow-right-hair">
        <use xlink:href="../../images/porsche-ui-kit-docs/svg-sprite.svg#icon-arrow-right-hair"></use>
      </svg>
    <span class="button-regular__label">Some Button Label with more text</span>
  </button>
  <button type="button" class="button-regular button-regular--highlight">
      <svg class="icon-svg button-regular__icon" role="img" title="arrow-right-hair">
        <use xlink:href="../../images/porsche-ui-kit-docs/svg-sprite.svg#icon-arrow-right-hair"></use>
      </svg>
    <span class="button-regular__label">Less text</span>
  </button>
</div>
```

__Breakpoint specific switching between horizontal and vertical layout:__  
```
<div class="flex flex--direction-column flex--direction-row-m button-group--vertical button-group--m">
  <button type="button" class="button-regular">
      <svg class="icon-svg button-regular__icon" role="img" title="arrow-right-hair">
        <use xlink:href="../../images/porsche-ui-kit-docs/svg-sprite.svg#icon-arrow-right-hair"></use>
      </svg>
    <span class="button-regular__label">Some Button Label with more text</span>
  </button>
  <button type="button" class="button-regular button-regular--highlight">
      <svg class="icon-svg button-regular__icon" role="img" title="arrow-right-hair">
        <use xlink:href="../../images/porsche-ui-kit-docs/svg-sprite.svg#icon-arrow-right-hair"></use>
      </svg>
    <span class="button-regular__label">Less text</span>
  </button>
</div>
```

