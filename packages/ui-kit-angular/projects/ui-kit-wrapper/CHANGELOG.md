# Porsche UI Kit Angular

## NOT RELEASED YET

### Change

* Grid component
  * Add JSON5 support to attributes (`BreakpointValues`)
  * Rename component `grid-child` to `grid-item`
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
  * Removed `pClick`, `pFocus`, `pBlur` events from p-button-icon
  * Made `click`, `focus`, `focusin`, `blur` and `focusout` events behave like expected (like native elements) for p-button-icon
  * Added `tabbable` property to p-button-icon
  * It's now disallowed to use `tabindex` property on p-button-icon (will be ignored and warning is shown)

### Bugfix
* Button Icon
  * Fix submitting form behaviour of p-button-icon (it's now preventable by "preventDefault")


## [1.0.0-alpha.6] (2019-10-14)

### Bugfix
* Add `buildOptimizer` compatibility
* Removed default rendering of download and rel attribute in `p-text-link` component

### Change
* Removed `a` from Text component `tag` property.
* Extract global type definitions.
* Adapted color prop of Icon component to be equal with text color props.


## [1.0.0-alpha.5] (2019-09-20)

### Bugfix
* UI Kit Angular build


## [1.0.0-alpha.4] (2019-09-19)

### Change
* Add target attribute to `button-regular` and `button-icon` component


## [1.0.0-alpha.3] (2019-09-09)

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