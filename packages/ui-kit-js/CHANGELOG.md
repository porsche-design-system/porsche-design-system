# Porsche UI Kit JS

## NOT RELEASED YET

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