# Porsche UI Kit React

## NOT RELEASED YET

### Change
* Removed `pClick`, `pFocus`, `pBlur` events from PButtonIcon
* Made `click`, `focus`, `focusin`, `blur` and `focusout` events behave like expected (like native elements) for PButtonIcon
* Added `pTabindex` property to PButtonIcon  (values of 0 or -1 are allowed)
* It's now disallowed to use `tabindex` property on PButtonIcon (will be ignored and warning is shown)

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