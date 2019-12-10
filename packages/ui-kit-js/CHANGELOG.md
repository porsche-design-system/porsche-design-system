# Porsche UI Kit JS

## NOT RELEASED YET

### Change

* Button component
  * New custom element
  
* Button-Pure component
  * New custom element
 
* Remove button-regular and button-icon component

* Link component
  * New custom element

* Link-Pure component
  * New custom element
  
* Text component
  * Reduce amount of text variants in global interface
  * Remove `ul | ol | li | sup | sub | label` from `tag` property
  * Add `weight` property
  
* Text Link component
  * Reduce amount of text variants (defined in global interface)

* Spacing
  * Remove global static spacing classes
  * Remove responsive spacing classes (`a` to `g`)
  
* Global Setup
  * `porsche-ui-kit.css` style should not be included by the application anymore

## [1.0.0-alpha.7] (2019-11-05)

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
  * Rename `align-items` values from `start` to `flex-start` and `end` to `flex-end`
  * Rename `justify-content` values from `start` to `flex-start` and `end` to `flex-end`
  * Rename `align-self` values from `start` to `flex-start` and `end` to `flex-end`
  * Rename `stretch` values from `start` to `flex-start` and `end` to `flex-end`
  * Rename `wrap` values from `reverse` to `wrap-reverse`
* Button Icon
  * Removed `pClick`, `pFocus`, `pBlur` events from p-button-icon
  * Made `click`, `focus`, `focusin`, `blur` and `focusout` events behave like expected (like native elements) for p-button-icon
  * Added `tabbable` property to p-button-icon
  * It's now disallowed to use `tabindex` property on p-button-icon (will be ignored and warning is shown)
* Icon 
  * Renamed `icon` prop to `name` 

### Bugfix
* Button Icon
  * Fix submitting form behaviour of p-button-icon (it's now preventable by "preventDefault")

### Breaking change
- Changed icon CDN path to Icon Tools CDN directory.
- Changed interface of `Icon` component: 
    - `source` property is now only for custom icon paths
    - `icon` property is added for official icon names (delivered from Porsche Icon Tool)
    - Deleted `icon_` prefix of icon namings, e.g. `icon_arrow-right-hair` --> `arrow-right-hair` 
    - Migration path: change any occurrence of `source` to `icon` if not used with custom icons (custom URL)

- Changed interface of `Button Regular`, `Button Icon` and `Text Link` component: 
    - `iconSource` property is added only for custom icon paths
    - `icon` property is now only for official icon names (delivered from Porsche Icon Tool)
    - Deleted `icon_` prefix of icon namings, e.g. `icon_arrow-right-hair` --> `arrow-right-hair` 
    - Migration path: change any occurrence of `source` to `iconSource` (or `icon-source) if used` with custom icons (custom URL)


## [1.0.0-alpha.6] (2019-10-14)

### Bugfix
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
* bugfix: updated react-output-plugin to fix typescript issue
* Add target attribute to `button-regular` and `button-icon` component


## [1.0.0-alpha.3] (2019-09-09)

### Change
* Update of react output plugin. 
* Refactor use of breakpoint mixin to support latest `ui-kit-scss-utils` package.


## [1.0.0-alpha.2] (2019-08-22)

### Bugfix
* Fix false prop type for text-link download attribute

### Change
* Update Angular module name


## [1.0.0-alpha.1] (2019-08-21)

### Features
* Initial release