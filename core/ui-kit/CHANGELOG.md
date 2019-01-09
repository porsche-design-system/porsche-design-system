# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

* Added svg icon system (@see icon usage documentation)

### Statement: why switching from icon-font to SVG-sprite for visualization of icons in web applications?
There seems to be a lot of discussion about the pros and cons of using svg or icon-fonts for icon systems. 
And as always, there is no single truth which method is the best except the phrase "it depends". 

Never the less, Porsche Ui-Kit has to fulfill some basic, fundamental and generic concepts which should also be future proof, flexible and "state of the art". 
To suit these needs, SVG seems to be the most generic solution. Here are some benefits from it:  
* Better (sharper) and consistent rendering in the browser (high-res screens)
* Very flexible in usage (sprite, inline, background-image)
* Accessible (e.g. by using title attributes)
* Individual sprite generation - each team can individually create custom svg sprites for their own needs
* Can be fully animated by CSS (inline) or JS (Sprite)
* Colors, fills, strokes can be manipulated by CSS
* And last but not least: converting SVG files into fonts and referencing them by an entity inside a CSS pseudo class seemed always a bit hacky

### Breaking changes
* Moved `icon` files to deprecated folder
* Renamed `icon` (files and classes) to `icon-font`
* Added svg icon system

__Migration path:__  
  Follow these steps to continue using icon-fonts until every component which uses this technique is refactored/upgraded to SVG icon system.
  
  * Change include path of `icon/index.scss` (and corresponding files):  
  `@import '../modules/icon/icon*.scss` => `@import '../deprecated/icon-font/icon-font*.scss`  
  
  * Change CSS classes (inclusive --modifier):  
  `.#{$global-class-prefix}icon` => `.#{$global-class-prefix}icon-font`  
  `.#{$global-class-prefix}icon--*` => `.#{$global-class-prefix}icon-font--*`  


## [0.15.0] - 2018-11-26
* Add possibility display the navigation-steps on light or dark background
  __Migration path:__ 
  * if you need the color to be white on dark background, use the `navigation-steps--theme-inverted`
  class on the navigation-steps element.

* Add possibility display the page header on light or dark background
  __Migration path:__ 
  * if you need the color to be white on dark background, use the `page-header--theme-inverted`
  class on the page-header element.

## [0.14.2] - 2018-11-23
* Added additional property to flex component and additional examples to visualize flex shorthands.
* Added missing flex mixin changes to migration path.
* Changed order of scss import of deprecated scss files to prevent css specificity issues.
* Fixed layout issue of confirmation modal component (which was caused by css specificity mentioned above).

## [## [0.14.1] - 2018-11-05]
### Bugfix
Added missing "-" seperator on sizes/offset classname at "xl" breakpoint

## [0.14.0] - 2018-10-25
### Grid-Float component is now "deprecated"
Moved grid-float component to `deprecated` folder.

#### Breaking changes
* Migration path:
  * Changed location of files (and corresponding import paths of other components):
  
    `base/grid/column.mixin.scss` => `deprecated/grid/column.mixin.scss`  
    `base/grid/column.scss` => `deprecated/grid/column.scss`  
    `base/grid/column.setup.scss` => `deprecated/grid/column.setup.scss`  
    `base/grid/row.mixin.scss` => `deprecated/grid/row.mixin.scss`  
    `base/grid/row.scss` => `deprecated/grid/row.scss`  
    `base/grid/row.setup.scss` => `deprecated/grid/row.setup.scss`  
    `base/grid/index.scss` => `deprecated/grid/index.scss` 
  
  * Deleted global `setup/grid.setup.scss` because these variables are now directly implemented in grid component.

### Extraction of grid as a standalone component (from flex).
Grid behaviour is now extracted from flex component and is developed as a new grid component.  
That means that all grid related properties from flex component are now maintained under grid.  
Every usage of flex component, which was used to layout with grid sizings, must now use grid component classes.  

#### Breaking changes
* Migration path:
  * Changed location of files (and corresponding import paths):
  
    `base/grid/flex.setup.scss` => `base/grid/grid.setup.scss`  
    `base/grid/flex.mixin.scss` => `base/grid/grid.mixin.scss`  
    `base/grid/flex.scss` => `base/grid/grid.scss`  
  
  * Renamings of class names of flex parent:
    
    `flex` => `grid`
    `flex--direction-row` => `grid--direction-row`  
    `flex--direction-row-reverse` => `grid--direction-row-reverse`  
    `flex--direction-column` => `grid--direction-column`  
    `flex--direction-column-reverse` => `grid--direction-column-reverse`  
    
  * Renamings of class names of flex children:
      
    `flex__child` => `grid__child`  
    `flex__child--gap-left` => deleted  
    `flex__child--gap-right` => deleted  
    `flex__child--gap-left-(variant)` => is set on parent only  
    `flex__child--gap-right-(variant)` => is set on parent only  
    `flex__child--(size)` => `grid__child--size-(size)`  
  
### Refactoring of flex component.
* Added missing flex properties.

#### Breaking changes
  * Migration path:
    * Changed location of files (and corresponding import paths):
    
      `base/grid/flex.setup.scss` => deleted!  
      `base/grid/flex.mixin.scss` => `base/layout/flex.mixin.scss`  
      `base/grid/flex.scss` => `base/layout/flex.scss`  
      `base/grid/index.scss` => `base/layout/index.scss`  
      
    * Deleted unused/deprecated class names which can be set by more generic classes:
        
      `flex--center-vertical` => `flex--direction-column flex--cross-axis-center`  
      `flex--center-horizontal` => `flex--cross-axis-center`  
      `flex--row-reverse` => `flex--direction-row-reverse`  
      `flex--column-reverse` => `flex--direction-column-reverse`  
      `flex--row-wrap` => `flex--wrap`  
      `flex--row-nowrap` => `flex--wrap-no`  
      `flex--row` => `flex--direction-row`  
      `flex--column` => `flex--direction-column`  
      `flex--grow` => `flex__child--grow-1` || `flex__child--grow-0`  
    
    * Consolidated and deleted doubled mixins (and corresponding includes):
      
      `@include flex--direction` => `@include flex-direction`  
      `@include flex--wrap` => `@include flex-wrap`  
      `@include flex--justify-content` => `@include flex-main-axis`  
      `@include flex--align-items` => `@include flex-cross-axis`  
      `@include flex--align-content` => `@include flex-align-content`  
      `@include flex--align-self`, `@include flex-child-align` => `@include flex-child-cross-axis`  
      `@include flex--grow` => `@include flex-child-grow`  
      `@include flex--shrink` => `@include flex-child-shrink`  
      `@include flex--basis` => `@include flex-child-basis`  
      `@include flex--order` => `@include flex-child-order`  
      `@include flex--center-vertical` => `@include flex-direction(column) @include flex-main-axis(center)`  
      `@include flex--center-horizontal` => `@include flex-cross-axis(center)`  
      `@include flex--column-reverse` => `@include flex-direction(column-reverse)`  
      `@include flex--row-reverse` => `@include flex-direction(row-reverse)`  
      `@include flex--row-wrap` => `@include flex-wrap(wrap)`  
      `@include flex--row-nowrap` => `@include flex-wrap(nowrap)`  
      `@include flex--space-between-vertical` => `@include flex-direction(column) @include flex-main-axis(center)`  
      `@include flex--space-between-horizontal` => `@include flex-main-axis(space-between)`  
      
      

## [0.13.3] - 2018-10-22
* Set text-decoration: none to all button patterns to make those patterns more self-contained

## [0.13.2] - 2018-10-08
* Added new `e-route` icon

## [0.13.1] - 2018-10-04
### Improvements
* Updated all pattern status

## [0.13.0] - 2018-09-24
### New feature
* Added `pagination` pattern

## [0.12.0] - 2018-09-14
### Breaking change
* deprecated car-chooser pattern: removed/refactored wrong usage of style modifiers
  __Migration path:__ 
  * add a new block with class `car-chooser__dropdown-input` around the search input field 
  and remove the style modifier class `car-chooser__dropdown-input` of the input itself
  * add a new block with class `car-chooser__dropdown-add-button` around the add-button for a new vehicle
  and remove the style modifier class `car-chooser__dropdown-add-button` of the button itself  
### Bugfixes
* Fixed dropdown animation for deprecated car chooser
### Improvements
* add a class `sg-wrapper-overflow` to patternlab styling for usage with absolute positioned elements in pattern view
* Added stylings for callout
* The consumer of the callout is not responsible to position the arrow, default it is centered

## [0.11.0] - 2018-09-11
### Improvements
* Added visual regression testing
* Set npm registry to default for public available npm packages
* Optimized `disableCSSAnimations` url parameter to disable CSS animations and transitions

### Breaking change
* Removed default padding bottom for <body> and deleted `/common/defaults.scss`.  
  __Migration path:__ Set padding for <body> in your project individually!

## [0.10.1] - 2018-09-04
### Improvements
* Added animations for deprecated car chooser
* Added empty search result state for deprectaed car chooser
* Added empty vehicles state for deprectaed car chooser

### Bugfixes
* Hover effect for deprecated car chooser
* Highlight for selected vehicles for deprecated car chooser
* Fixed spacings for deprecated car chooser

## [0.10.0] - 2018-09-04
### Visual breaking changes
* Form element `input` updated to current spec (visual: [Invision](https://udg.invisionapp.com/d/main#/console/13100009/277692959/inspect))
  * Changed default height to 50px
  * Changed default text (16px) and label (12px) font size
  * Changed default icon size to 20px
  * Removed responsive breakpoints
  * Removed obsolete variables in scss setup

## [0.9.1] - 2018-08-21
### Improvements
* Removed unused sass variable in `column`

## [0.9.0] - 2018-08-21
### Improvements
* Updated npm publish scripts to only use JFrog Artifactory
* Updated npm repository name to official product abbreviation "pouikit-npm"

## [0.8.0] - 2018-08-21
### Improvements
* fix for pagination-dots for car-chooser to get the corrected active state

### Breaking changes
* `car-selector` is now using `pagination-dots` type grey which needs to be updated within the markup

## [0.7.5] - 2018-08-21
### Improvements
* Change footer copyright text

## [0.7.4] - 2018-08-06
### Bugfixes
* "list-bullet":
  * Refactored list items
  * List style types are customisable now
  * List style square is now 4px instead of 6px

### Breaking changes
"list-bullet" migration path: the modifier `list-bullet--square` was removed from the ul and needs to be added 
as `list-bullet__item--square` to each li element. Same goes for the variants e.g. `list-bullet__item--square-black`

## [0.7.3] - 2018-07-30
### Bugfixes
* Fixed navigation-footer item-header cursor from pointer to text up from breakpoint s
* Fixed/Updated spacings of footer and navigation-footer
* Fixed wrong text-decoration in footer pattern on hover
* Fixed missing open-close animation for navigation-footer pattern on mobile viewports

## [0.7.2] - 2018-07-17
### Bugfixes
* added display: inline-block for footer links on breakpoint xxs to prevent wrong block display

## [0.7.1] - 2018-07-10
### Improvements
* Molecule: Pagination dots
  * simplified pagination dots json config (type modifiers)
  * changed markup from `button` to `span` for easier mobile implementation
  * added safe clickable area per dot

## [0.7.0] - 2018-07-09
### Breaking changes
* [breaking change] renaming of mixin animation-translate-scale to transform-translate-scale
  * move transform-translate-scale from mixins/animation.scss to mixin/transform.scss
    
### Improvements
* encapsulate all animations in a mixin call to be able to suppress the output of the css
animation for a specific pattern if you want to build the animation via e.g. script 
  * affected patterns
    * input
    * toggle
    * tile-slider
    * tile-image-text-link
  * you can now overwrite the output of the css animation part by modifying the file
  `/setup/animations.scss` (see detailed how to in comment)
* removing all animations completely of the image-cover pattern

## [0.6.1] - 2018-07-09
### Bugfixes
* Multiple fixes for footer pattern

## [0.6.0] - 2018-07-03
### New features
* Updated molecule `pagination dots` to reflect the latest design specification

### Breaking changes
* Molecule: Pagination dots
  * Pagination dots are now rounded by default, as there are no square ones to be used
  * The modifier class `.pagination-dots__dot-rounded` has been removed
  * The variable `$pagination-dots-dot-button-padding` has been removed
  * The width and height of the dots defaults to 10px (before: 8px)
  * Various variables have been renamed. Please update your patterns to the new names:

      `$pagination-dots-dot-button-dimension` => `$pagination-dots-dot-size-primary`
      `$pagination-dots-dot-button-margin` => `$pagination-dots-dot-margin`

  * Please check out the pagination dots docs for further use (pagination-dots.md)

* Organism: Car selector / chooser
  * Updated car selector sass setup `car-selector.setup.scss` to the latest pagination dots variables

## [0.5.3] - 2018-07-03
### Bugfixes
* Fixed forgotten column-classes of demo templates for breaking change of 0.2.0

### Improvements
* Updated float grid documentation and examples
* Minor update to flex grid documentation

## [0.5.2] - 2018-06-27
### Bugfixes
* Fixed notification-button, so that label with multiple words don't get multiline

## [0.5.1] - 2018-06-26
### Improvements
* Updated navigation width to fit with latest design spec

### Bugfixes
* Added cursor pointer for next-best-actions if no href is present

## [0.5.0] - 2018-06-19
### Breaking changes
Removed deprecated `column` and `row` classes used for "Grid Float", please have a look at migration path mentioned in version 0.2.0

## [0.4.5] - 2018-06-07
### Improvements
* Added scripts for publishing to multiple repositories (nexus + artifactory)

## [0.4.4] - 2018-06-07
### Improvements
* Added default padding-bottom to body element. It's necessary to import the common/defaults.scss:
`@import '~@porsche/ui-kit-core/src/common/defaults.scss';` Or when importing common/index.scss already then nothing
has to be done because defaults will be auto imported.
* Removed default outer and inner spacing for button, input, textarea and select elements

## [0.4.3] - 2018-06-07
### Improvements
* Added setup scss file for various (external) brand colors `external-brands-colors.scss`

## [0.4.2] - 2018-05-30
### Bugfixes
* Add clickarea to icon in media-center-modal

## [0.4.1] - 2018-05-28
### Bugfixes
* Fix iframe in media-center-modal for ie

## [0.4.0] - 2018-05-28
### New Features
* Added "media-center-modal" pattern
* Extended "tile-slider" pattern to support video's

## [0.3.0] - 2018-05-16
### Improvements
* Extracted font-face for PAG icons and Porsche Next font family [BREAKING CHANGE]
  Migration path: Import following scss file into application globally: `~@porsche/ui-kit-core/src/common/font-face.scss` 
* Extracted text-size and font as individual pattern
* Extracted icon as variations

## [0.2.1] - 2018-05-02
### Bugfixes
* Updated handlebars files according to migration path described in @porsche/ui-kit-core@0.2.0

## [0.2.0] - 2018-05-01
### New Features
* Added "grid-float" pattern
* Added column--gap-normal, column--gap-small and column--gap-zero classes and corresponding min-width breakpoint specific ones
* Added column--direction-normal and column--direction-reverse classes and corresponding min-width breakpoint specific ones
* Added global grid setup file

### Improvements
* Extracted variables for row and column grid
* Updated breakpoint definitions
* Renamed "flex-grid" pattern to "grid-flex"
* Updated -wrapper-page width and offset definitions

### Breaking changes
* Removed row--flex and column--flex-centered
  Migration path: It's recommended to use a proper flex class with modifier instead
* Removed some css classes related to "column" and "row" (grid float) and replaced them with ones that fits convention
  Migration path: Please search & replace following CSS classes that are used in your
  project in the following order:
```
column--reverse => column--direction-reverse
column--small => column--gap-small
row--small => row--gap-small
```
* Removed column--zero's and row--zero's breakpoint only classes entirely and replaced them with ones that are min-width breakpoint specific
  Migration path: Please search & replace following CSS classes that are used in your
  project in the following order (and be aware that the new classes are "min-width" not "only" breakpoint specific):
```
column--zero-xxs-only => column--gap-zero
column--zero-xs-only => column--gap-zero-xs
column--zero-s-only => column--gap-zero-s
column--zero-m-only => column--gap-zero-m
column--zero-l-only => column--gap-zero-l
column--zero => column--gap-zero

row--zero-xxs-only => row--gap-zero
row--zero-xs-only => row--gap-zero-xs
row--zero-s-only => row--gap-zero-s
row--zero-m-only => row--gap-zero-m
row--zero-l-only => row--gap-zero-l
row--zero => row--gap-zero
```
* Renamed column's modifiers for defining width of a column, but kept old (deprecated) class names in addition for backward compatibility. 
  Anyway it's recommended to follow migration path because deprecated classes will be removed at some point.
  Migration path: Please search & replace following CSS classes that are used in your
  project in the following order:
```
column--xs-auto => column--auto-xs
column--xs-1 => column--1-xs
column--xs-2 => column--2-xs
column--xs-3 => column--3-xs
column--xs-4 => column--4-xs
column--xs-5 => column--5-xs
column--xs-6 => column--6-xs
column--xs-7 => column--7-xs
column--xs-8 => column--8-xs
column--xs-9 => column--9-xs
column--xs-10 => column--10-xs
column--xs-11 => column--11-xs
column--xs-12 => column--12-xs

column--s-auto => column--auto-s
column--s-1 => column--1-s
column--s-2 => column--2-s
column--s-3 => column--3-s
column--s-4 => column--4-s
column--s-5 => column--5-s
column--s-6 => column--6-s
column--s-7 => column--7-s
column--s-8 => column--8-s
column--s-9 => column--9-s
column--s-10 => column--10-s
column--s-11 => column--11-s
column--s-12 => column--12-s

column--m-auto => column--auto-m
column--m-1 => column--1-m
column--m-2 => column--2-m
column--m-3 => column--3-m
column--m-4 => column--4-m
column--m-5 => column--5-m
column--m-6 => column--6-m
column--m-7 => column--7-m
column--m-8 => column--8-m
column--m-9 => column--9-m
column--m-10 => column--10-m
column--m-11 => column--11-m
column--m-12 => column--12-m

column--l-auto => column--auto-l
column--l-1 => column--1-l
column--l-2 => column--2-l
column--l-3 => column--3-l
column--l-4 => column--4-l
column--l-5 => column--5-l
column--l-6 => column--6-l
column--l-7 => column--7-l
column--l-8 => column--8-l
column--l-9 => column--9-l
column--l-10 => column--10-l
column--l-11 => column--11-l
column--l-12 => column--12-l
```
* Removed padding-bottom of -wrapper-page
  Migration path: Instead please use a -spacing class to define space between modules that have -wrapper-page class applied

## [0.1.12] - 2018-04-18
* Reverted improvement of @porsche/ui-kit-core@0.1.11

## [0.1.11] - 2018-04-18
* Improved npm postinstall again

## [0.1.10] - 2018-04-18
* Improved npm postinstall

## [0.1.9] - 2018-04-16
* Updated sass renderer

## [0.1.8] - 2018-04-16
* Updated plugin-node-sass-dependency-collector, now it's possible to use tilde importer for sass files

## [0.1.7] - 2018-04-14
* Added plugin-node-sass-dependency-collector.config.json configuration
* Resolved npm err when package is installed within a node_modules directory, removed node-sass-dependency-collector pre install

## [0.1.6] - 2018-04-11
* Updated npm ignore, /patternlab/source/css/ will be released again

## [0.1.5] - 2018-04-11
* Updated scaffolding css

## [0.1.4] - 2018-04-11
* Updated preinstall npm script

## [0.1.3] - 2018-04-11
* Clean up

## [0.1.2] - 2018-04-09
* Adapt font-weight of button in car-selector
* Added notification-icon

## [0.1.1] - 2018-04-09
* Added index.scss to src folder

## [0.1.0] - 2018-04-06
* Initial setup based on porsche-stylesheets@0.95.5
