# Porsche UI Kit React

## NOT RELEASED YET

### Change

* Button component
  * New custom element
  
* Button-Pure component
  * New custom element
 
* Remove button-regular and button-icon component

* Link component
  * New custom element

* Text component
  * Reduce amount of text variants in global interface
  * Remove `ul | ol | li | sup | sub | label` from `tag` property
  * Add `weight` property
  
* Text Link component
  * Reduce amount of text variants (defined in global interface)

* Global Setup
  * `porsche-ui-kit.css` style should not be imported by the application anymore

## [1.0.0-alpha.7] (2019-11-05)

### Change

* Grid component
  * Add JSON5 support to attributes (`BreakpointValues`)
  * Rename component `GridChild` to `GridItem`
  * Remove `gap` attribute
* Flex component
  * Add JSON5 support to attributes (`BreakpointValues`)
  * Add value `space-evenly` to attribute `stretch`
  * Remove `gap` attribute
  * Rename `flow` attribute to `inline`
  * Rename `alignItems` values from `start` to `flex-start` and `end` to `flex-end`
  * Rename `justifyContent` values from `start` to `flex-start` and `end` to `flex-end`
  * Rename `alignSelf` values from `start` to `flex-start` and `end` to `flex-end`
  * Rename `stretch` values from `start` to `flex-start` and `end` to `flex-end`
  * Rename `wrap` values from `reverse` to `wrap-reverse`
* Button Icon
  * Removed `pClick`, `pFocus`, `pBlur` events from PButtonIcon
  * Made `click`, `focus`, `focusin`, `blur` and `focusout` events behave like expected (like native elements) for PButtonIcon
  * Added `tabbable` property to PButtonIcon
  * It's now disallowed to use `tabindex` property on PButtonIcon (will be ignored and warning is shown)
* Icon 
  * Renamed `icon` prop to `name` 
  
### Bugfix
* Button Icon
  * Fix submitting form behaviour of pButtonIcon (it's now preventable by "preventDefault")

## [1.0.0-alpha.6] (2019-10-14)

### Bugfix
* Removed default rendering of download and rel attribute in `PTextLink` component

### Change
* Removed `a` from Text component `tag` property.
* Extract global type definitions.
* Adapted color prop of Icon component to be equal with text color props.

## [1.0.0-alpha.5] (2019-09-20)

### Bugfix
* UI Kit Angular build


## [1.0.0-alpha.4] (2019-09-19)

### Change
* bugfix: updated react-output-plugin to fix typescript issue
* Add target attribute to `button-regular` and `button-icon` component


## [1.0.0-alpha.3] (2019-09-09)

### Change
* add new dev dependency after update of react output plugin. 
* bugfix: you can use now responsive objects in `PGrid` and `PFlex` and `PSpacing` components.

### Silent Change
* added prefix to breakpoint mixin in UI Kit JS.


## [1.0.0-alpha.2] (2019-08-22)

### Bugfix
* Fix false prop type for text-link download attribute

### Change
* Update Angular module name


## [1.0.0-alpha.1] (2019-08-21)

### Features
* Initial release