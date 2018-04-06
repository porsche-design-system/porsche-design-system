# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
* 

## [0.95.5] - 2018-04-04
* Bugfix for latest node-sass version 4.8.3 to make sure variable interpolation and calculation works as desired

## [0.95.4] - 2018-04-03
* Add core pattern for common unordered list
* Bugfix: "modal-header", white-space property was updated
* Bugfix: "choose-dealer", white-space property was updated
* Bugfix: "additional-callback-vehicles", white-space property was updated

## [0.95.3] - 2018-03-21
* Extended font-family language codes with standardized ISO 639-1 language codes

## [0.95.2] - 2018-03-21
* Fixes for configurable-services and button-service

## [0.95.1] - 2018-03-21
* Update pag-iconfont

## [0.95.0] - 2018-03-20
* Add configurable-services organism 
* Add button-service organism 
* Add flex--align-content mixin - for handling of alignment of flex lines

## [0.94.0] - 2018-03-20
* Added HowTo for 'Charging Service' project [Breaking change]

## [0.93.2] - 2018-03-16

* Fix angular specific class wrappers for checkbox and radio to address invalid styling only if form is submitted

## [0.93.1] - 2018-03-13

* Fix hover color for arrow on tile financial services 
* Fix disabled color for arrow on tile financial services 

## [0.93.0] - 2018-03-13

* Implement Porsche Id Card UI

## [0.92.1] - 2018-03-13

* Fix highlighting of navigation-topbar messages

## [0.92.0] - 2018-03-12

* Updated typography classes [Breaking change]
  Migration path: Please search & replace following CSS classes that are used in your
  project in the following order:
  ```
  -typo-headline-4-thin => -text-size-5-thin
  -typo-headline-4 => -text-size-5-regular
  -typo-headline-3-thin => -text-size-4-thin
  -typo-headline-3 => -text-size-4-regular
  -typo-headline-2-thin => -text-size-3-thin
  -typo-headline-2 => -text-size-3-regular
  -typo-headline-1-thin => -text-size-2-thin
  -typo-headline-1 => -text-size-2-regular
  -typo-copy-small => -text-size-small
  -typo-copy => -text-size-copy
  ```
* Renamed typo.scss, typo.mixin.scss and typo.setup.scss to text-size.scss, text-size.mixin.scss and
  text-size.setup.scss. Please upgrade file import for e.g. CSS class usage:
  from `@import '~porsche-stylesheets/src/base/typo/typo.scss';`
  to `@import '~porsche-stylesheets/src/base/text-size/text-size.scss';`
* Moved -overflow-ellipsis class and mixin. Please upgrade file import for e.g. CSS class usage:
  from `@import '~porsche-stylesheets/src/base/typo/typo.scss';`
  to `@import '~porsche-stylesheets/src/base/overflow/overflow.scss';`

## [0.91.2] - 2018-03-09

* Fixed sizing issue with radio or checkbox without label
* adjust proposition pattern for 'Charging Service' project to show more than 3 propositions

## [0.91.1] - 2018-03-06

* Optimized default width behaviour of flex grid

## [0.91.0] - 2018-03-06

* Add new state to tile-financial-services
* Fix tile-financial-services height, colors and spacings

## [0.90.0] - 2018-03-06

* Add disabled state to button-icon

## [0.89.0] - 2018-03-02

* Updated static spacing classes [Breaking change]
  Migration path: Please search & replace following CSS classes that are used in your
  project as followed:
  ```
  -spacing-static-a => -spacing-3
  -spacing-static-b => -spacing-6
  -spacing-static-c => -spacing-12
  -spacing-static-d => -spacing-18
  -spacing-static-e => -spacing-24
  -spacing-static-f => -spacing-30
  -spacing-static-g => -spacing-42
  ```

## [0.88.1] - 2018-03-02

* Fix checkbox error state colors
* Fix radio buttons error state colors
* Fix colors for checkbox and radio buttons according to spec
* Fix line-height of checkbox and radio labels
* Align checkbox and radio optically
* Add styling for link in between checkbox or radio label

## [0.88.0] - 2018-03-02

* Added price-communication for 'Charging Service' project
* Added pattern auth-info for 'Charging Service' project
* Add new navigation-step´s variant

## [0.87.0] - 2018-02-22

* Updated icon library
  — Updated visualization-car pattern [Breaking change]
  — Moved visualization-car pattern to project scope [Breaking change]

## [0.86.0] - 2018-02-19

* feat(pfs): PCCK-11747 add financial service tile

## [0.85.4] - 2018-02-16

* Added media-center for 'Connected Car Shop'

## [0.85.3] - 2018-02-15

* fix overflow in IE due to unnecessary flexbox usage PCCK-11812

## [0.85.2] - 2018-02-14

* PCCK-11906 fix selector for building within @porsche/navigation

## [0.85.1] - 2018-02-13

* Added flex-fixes for proposition in 'Charging Service' project

## [0.85.0] - 2018-02-13

* Added main-axis, cross-axis modifier to flex grid and renamed align-self to align modifier [Breaking change]
* Updated state-empty-action, set background to transparent and added long label edge case test

## [0.84.2] - 2018-02-13

* Added $global-class-prefix Sass variable, so that it's possible for consumers to prefix all CSS classes to prevent name clashes

## [0.84.1] - 2018-02-12

* Fix navigation-topbar-desktop: PCCK-11327 fix "jumping" portal when body switches to not overflow

## [0.84.0] - 2018-02-12

* Fix navigation-topbar-desktop
  * PCCK-11906 make sure first visible element gets no border
  * PCCK-11907 create fixed position for flyout tip
* Added new state to the SAR and use the new button-primary pattern
* Added state describe service and set radio button at service scheduling to checked by default

## [0.83.5] - 2018-02-02

* Add Access login tabs

## [0.83.4] - 2018-02-02

* Added flex none to make sure flex\_\_child resizes correctly

## [0.83.3] - 2018-02-02

* Added flex--column and flex--row again, because those were removed accidentally

## [0.83.2] - 2018-02-02

* Extend flexbox helpers to enabled usage as fully-featured grid
* color-fix in pattern proposition for 'Charging Service' project

## [0.83.1] - 2018-02-02

* changed display to visibility property for dropdown-multi-function
* added positioning on top of target element for dropdown-multi-function

## [0.83.0] - 2018-01-30

* Added tile-paragraph line breaking (multiline) variant

## [0.82.0] - 2018-01-18

* added pattern proposition for 'Charging Service' project
* optimized layout of organism portal-linking [Breaking change]
* Fixed car-selector button-action (no border-radius for chrome)

## [0.81.1] - 2018-01-12

* Fix rules for link-text :hover, :focus, :active to not be overwritten

## [0.81.0] - 2018-01-11

* Added link-text pattern

## [0.80.1] - 2018-01-10

* Added optional text for loader-application

## [0.80.0] - 2018-01-08

* Added link-text pattern

## [0.79.1] - 2017-12-21

* Updated spacing event-detail page
* Updated image size event-detail page

## [0.79.0] - 2017-12-18

* Bugfixed alignment of e-range-map on page e-control [Breaking change]

## [0.78.0] - 2017-12-18

* Updated next-best-actions, optimized alignment and spacings [Breaking change]

## [0.77.0] - 2017-12-18

* Added radio-button-choose-dealer pattern
* Added modal-choose-dealer pattern
* Added slider-choose-dealer pattern
* Refactored modal-footer pattern
* Added correct favourite icon to navigation-plus form ('Favourite' checkbox icon)

## [0.76.0] - 2017-12-14

* Updated design of Car Selector (opacity, position of buttons, hover states)

## [0.75.0] - 2017-12-12

* Optimized presentation of button-primary in design spec page
* Added button-ghost
* Added error state for button-primary

## [0.74.1] - 2017-12-08

* Updated pattern states to inprogress, inreview, complete
* Updated npm dependencies

## [0.74.0] - 2017-12-06

* Added background-gradient to image-cover
* Adjust event tile
* Fixed button-inline disabled coloring
* Changed event-tile headline grey according design specs
* Added overflow ellipsis to event tile content (headline, paragraph)

## [0.73.0] - 2017-12-05

* Updated icon size for state-empty-action
* Updated spacings between page-header and navigation [Breaking change]
* Minimized markup structure for page-header on page level: navigation-plus, trip-control, car-alarm, car-finder, car-control, online-remote-update, pre-heater, climate, e-control, speed-alarm, location-alarm [Breaking change]

## [0.72.2] - 2017-12-05

* Added "real data" to navigation footer and navigation header pattern
* Refactored SAR, removed unnecessary styles and markup
* Changed width of buttons on mobile to 100%

## [0.72.1] - 2017-11-28

* Fixed car detail flex wrapping issue on Mac OS Safari

## [0.72.0] - 2017-11-24

* Updated icon-font, Added icon-leaf
* Added definition of done

## [0.71.0] - 2017-11-23

* Renamed icon-marker to symbol-marker [Breaking change]
* Updated list-view-poi [Breaking change]
* Added dropdown-multi-function
* Added copyright-google
* Added summary-poi
* Added symbol-diamond
* Added symbol-menu-dots
* Added/Updated variations of navigation-plus
* Cleaned up base markup structure of navigation-plus [Breaking change]

## [0.70.0] - 2017-11-22

* Updated button-primary
* Spacing between central context menu and list changed from -spacing-static-e to -spacing-static-c [Breaking change]
* Updated spacings for e-range-map-selector [Breaking change]

## [0.69.0] - 2017-11-21

* Fixed order of icons for toggle
* Added over-the-air-update-control
* Added remote-online-update

## [0.68.0] - 2017-11-16

* Added "button-primary"

## [0.67.1] - 2017-11-16

* Fix for Google Chrome version 62.0.3202.94 for macOS introduced border-radius 4px as default button style in the user agent stylesheet. Button-inline now uses explicit border-radius 0 to overwrite the user agent stylesheet.

## [0.67.0] - 2017-11-16

* Added password complexity bar pattern
* Added password complexity checker pattern
* Added password complexity hint pattern

## [0.66.0] - 2017-11-15

* Removed global flex-fix for IE from flex() - mixin
* Added "toggle" pattern
* Added disableCSSAnimations as parameter option to url, e.g. {{ $HOST }}/index.html?disableCSSAnimations (this only works in "new window mode")

## [0.65.2] - 2017-11-15

* Fixed closing quote at tiles
* Fixed font weight of static tile

## [0.65.1] - 2017-11-14

* Fixed variable name event-detail-contact

## [0.65.0] - 2017-11-14

* Fixed map
* Fixed event tile
* Added "loader-text" pattern
* Moved modal-base, modal-body, modal-footer, modal-header into one folder called "modal"

## [0.64.0] - 2017-11-07

* Updated "battery-chart"
* Removed "plug-status" [Breaking change]
* Added "visualization-charging-time"
* Added "visualization-e-range"
* Added "visualization-plug-status"
* Added "charge-status"
* Removed "layout-battery-status" [Breaking change]

## [0.63.1] - 2017-11-06

* fixed map-pin on static map

## [0.63.0] - 2017-11-02

* Updated icon font

## [0.62.1] - 2017-10-26

* Changed presentation of event tile
* Fixed image on static tile-image-text-link

## [0.62.0] - 2017-10-24

* Added charge-control pattern
* Removed wrapper classes from e-control page [Breaking change]
* Optimized grid layout on e-control page [Breaking change]
* Added some spacing to list-message date to prevent overlapping date and arrow [Breaking Change]

## [0.61.0] - 2017-10-24

* Updated car-actions-control and layout-car-chart
* Added CCM to Speed Alarm page
* Optimized inheritance structure of Speed Alarm page
* Created alarm-form-edit and alarm-form-create pattern
* Added list-empty pattern
* Added Speed Alarm page variations
* Removed list\_\_separator from list-violation [Breaking change]

## [0.60.0] - 2017-10-23

* Updated timestamp-refresh to fit new design specs [Breaking change]

## [0.59.0] - 2017-10-20

* Added loader-base
* Added loader-application
* Added loader-fullpage
* Added loader-list
* Added loader-module
* Added loader patterns:
  * PL1 => loader-application
  * PL2a => loader-list
  * PL2b => loader-module
  * PL5 => loader-fullpage
  * PL6 => loader-base (dark version)

## [0.58.0] - 2017-10-20

* Updated spacings between timestamp and car chooser [Breaking change]

## [0.57.0] - 2017-10-19

* Updated header-tile title to h2 according to design spec
* Updated layout-car-chart title to h4 according to design spec
* Updated spacings between ccm and list for VRS [Breaking change]
* Updated icon color of load more button in VRS [Breaking change]
* Updated hover state of seamless button-inline
* Updated module headlines of e-control according to design spec [Breaking change]
* Updated typo definition of e-range-map-selector [Breaking change]
* Updated state-empty-action and removed state-empty-action\_\_icon--large class [Breaking change]
* Updated spacings for trip-statistics

## [0.56.0] - 2017-10-19

* Added checkboxes to the point-of-interest-form
* Added label-icon element to the checkbox molecule

## [0.55.0] - 2017-10-19

* Refactored tile, tile-service-interval, car-control [Breaking change]
* Updated Read Me "Pattern Lab Variable Inheritance"

## [0.54.0] - 2017-10-18

* Partly refactor tiles and adapt to specs
* Added navigation footer pattern
* Added common footer pattern

## [0.53.0] - 2017-10-17

* Added Slide Tutorial Pattern
* Added Tutorial SPIN Pattern
* Added Tutorial Pairing Code Pattern
* Added Modal Base, Modal Header, Modal Body, Modal Footer Patterns
* Added Ghost Dark Button Inline variant for ghost button on bright backgrounds

## [0.52.0] - 2017-10-17

* Added VIN input pattern
* Added an additional information part to the header tile Pattern
* Refactored link scroll up pattern to a more global pattern called link-icon-text [Breaking change]
* Optimized spacing spec
* Updated read me
* Added icon close pattern [Breaking Change]
  * This affects the following patterns: - notifications with close button - all type of modals
* Renamend marker-icon to icon-marker [Breaking Change]
* Added Support Help Pattern
* Extended Header Tile Pattern with the option to add a subline

## [0.51.0] - 2017-10-12

* Refactored JSON file structure at "Admin"-Section
* Added navigation step pattern
* Fixed hover behaviour of navigation-header items and refactored the markup [Breaking Change]

## [0.50.0] - 2017-10-05

* Redesign event detail page [Breaking Change]
* Added portal-linking pattern [New Feature]

## [0.49.0] - 2017-10-04

* Deleted unneeded styles for vehicle related services: remote-auxiliary-heating-countdown + remote-pre-trip-climatisation-countdown [Breaking Change]

## [0.48.1] - 2017-10-02

* Fixed issue with content overflow at next-best-actions on mobile devices
* Fixed divider gray variant color

## [0.48.0] - 2017-09-30

* New organism modal-dynamic
* New organism services access (go online, software update)
* Portal organism licenseactivation panel / widget
* Portal page firstportaluse

## [0.47.0] - 2017-09-29

* Use flex for layout-map-form so delete button is position in the right place independently of form contents [Breaking Change]
* Refactored map-fence-overview organism from location alarm to a common organism which is called as map-action-overview [Breaking Change]

## [0.46.0] - 2017-09-29

* Change spacing behavior for striped list: Spacing is now static and doesn't change with changing viewports
* Updated icon font
* Refactored no-recall-available pattern [Breaking Change] and Recall Reminder
* Change design event tile

## [0.45.2] - 2017-09-27

* Fixed issue with angular extension of input field when using with icon

## [0.45.1] - 2017-09-27

* Fix build break

## [0.45.0] - 2017-09-27

* Added list-striped pattern
* Added portal car-detail pattern

## [0.44.0] - 2017-09-27

* Optimized car-interior-ventilation with adaptive images, so that IE renders less pixelated [Breaking change]

## [0.43.0] - 2017-09-26

* Updated spacings [Breaking change]
  Migration path: Please do a search & replace all for your application and replace spacing
  classes that you have used in your markup. First replace all spacing classes with "-new"
  suffix and afterwards replace all to the final spacing class:
  -spacing-a => -spacing-d-new => -spacing-d
  -spacing-b => -spacing-c-new => -spacing-c
  -spacing-d => -spacing-b-new => -spacing-b
  -spacing-e => -spacing-a-new => -spacing-a
  -spacing-f => -spacing-a-new => -spacing-a
  -spacing-g => -spacing-f-new => -spacing-f
  -spacing-widget-a => -spacing-b-new => -spacing-b
  -spacing-widget-b => -spacing-e-new => -spacing-e
* Fixed issue by some browsers regarding sizing of input field
* Fixed issue by some browsers with jumping line-height of input field on focus
* Updated polyfill for input [Breaking change]

## [0.42.3] - 2017-09-20

* Added text positioning to tile-image-text-link

## [0.42.2] - 2017-09-20

* input.angular.scss ng-valid now dependend of ng-submitted
* Bugfix for navigation-topbar-desktop

## [0.42.1] - 2017-09-19

* Bugfix for navigation-topbar-desktop

## [0.42.0] - 2017-09-18

* Added display.mixin
* Added modifier to notification-error-inline for margin bottom
* Added dealer registration pages

## [0.41.0] - 2017-09-18

* Refactored car-interior-ventilation pattern [Breaking change]

## [0.40.1] - 2017-09-15

* Added event-detail-contact organism (Feature)
* Added event-tile organism (Feature)
* Added event-detail page (Feature)
* Added event-list page (Feature)

## [0.40.0] - 2017-09-14

* Change layout-fence-form to a module called layout-map-form to reuse it also in navigation plus [Breaking change]
* Add a new pattern for the creation form in navigation plus

## [0.39.3] - 2017-09-08

* Refactored header pattern [Breaking change]
* BUGFIX: fixed wrong flyout position in navigation-topbar-desktop
* Refactored dealer information pattern

## [0.39.2] - 2017-09-06

* BUGFIX: fixed wrong font linking which broke the porsche stylesheet

## [0.39.1] - 2017-09-06

* Added new font families like arabic, pashto, persian, urdu
* Refactored navigation topbar mobile pattern

## [0.39.0] - 2017-09-05

* Added tag pattern
* Added tag group pattern
* Added central context menu pattern
* Added central context menu flyout pattern
* Added central context menu button pattern
* Added portal ccm-filter-button-flyout
* Added portal notification center page
* Added profile list orders organism
* Added profile page orders overview

## [0.38.0] - 2017-09-04

* Added new porsche crest [Breaking change]

## [0.37.6] - 2017-09-01

* car-selector enhancement, switched desktop-view to breakpoint 'm'

## [0.37.5] - 2017-08-30

* BUGFIX: service history vehicle tile logo

## [0.37.4] - 2017-08-30

* BUGFIX: Added missing font families for cyrillic, greek and chinese

## [0.37.3] - 2017-08-30

* Added car-interior-ventilation pattern
* Added status-bar pattern
* Added climatisation-control pattern
* Added ventilation-control pattern
* Updated icon font
* Added page variations for pre-heater pattern

## [0.37.2] - 2017-08-25

* BUGFIX Design for the tile-image-headline organism

## [0.37.1] - 2017-08-24

* BUGFIX Positioning of navigation topbar flyout

## [0.37.0] - 2017-08-23

* Added Next Best Actions pattern
* Added color modifier for Icon in button-inline pattern

## [0.36.1] - 2017-08-23

* BUGFIX max-height for service history tile

## [0.36.0] - 2017-08-21

* Added single car view in car-selector
* Added portal organism service history tile
* Added service history tile to the vehicle detail page

## [0.35.0] - 2017-08-18

* Updated battery-charge-form-timer pattern with form-button-group [Breaking change]
* Extended climate with edit-timer variation
* Extended pre-heater with edit-timer variation
* Included layer-blocking in climate, e-control, pre-heater page variations
* Updated battery-chart-form-timer, form-auxiliary-heating-timer and form-climatistation-timer [Breaking change]
* Updated list-expanded pattern, made hover state of close icon red
* Fixed bugs for portal tiles on internet explorer wich caused text to break out of box
* Added button ghost variant
* Added Portal Cardetail page
* Added roadside assistance organism
* Added Button Mixin to dynamicly change the button styling due to breakpoint configuration
* Added vehicle overview pattern
* Extended form button row to be configurable

## [0.34.1] - 2017-08-16

* Added sticky option to layer-blocking
* Added pagination-dots organism
* Enhance the tile-slider with above mentioned pagination and add prev/next arrows for larger viewports
* Replace previous pagination-dots implementation in car-selector
* Added new state of service appointment request
* Added marker-icon molecule
* Added new service navigation-plus to vehicle-related-services
* Added list-view-poi patterns to navigation-plus

## [0.34.0] - 2017-08-16

* Refactored vehicle information pattern
* Added pagination-dots organism
* Enhance the tile-slider with above mentioned pagination and add prev/next arrows for larger viewports
* Replace previous pagination-dots implementation in car-selector

## [0.33.0] - 2017-08-11

* Added page variations with offline banner for pre-header, climate and e-control
* Refactored "notification" to fit new design spec and multi notification support [Breaking change]
* Refactored css class "content" to "-wrapper-page" [Breaking change]
* Refactored "notification-button" according to new design spec [Breaking change]
* Changed colors again. ;-)
* Updated icon font

## [0.32.2] - 2017-08-10

* Refactored textarea pattern because of IE Bug

## [0.32.1] - 2017-08-10

* Added disclaimer text to e-range-map-selector
* Make height of e-range-map 100% on sizes larger than 's' so it grows with the content of e-range-map-selector

## [0.32.0] - 2017-08-09

* Added pattern image-cover
* Added pattern tile-events
* Added pattern tile-icon-headline-button
* Added pattern tile-image-headline-button
* Added pattern tile-image-text-link
* Added pattern tile-slider
* Added page portal-home

## [0.31.0] - 2017-08-04

* Added new car selector

## [0.30.0] - 2017-08-04

* Added list bullet pattern
* Added service confirmation information pattern
* Added service appointment confirmation page
* Added car-selector pattern

## [0.29.0] - 2017-08-02

* Added visualization-icon-text pattern
* Refactored list-violation with new visualization-icon-text pattern [Breaking change]
* Updated line-height definitions of typo classes
* Fixed flex grow issue in car control service
* Switched from box-sizing model content-box to border-box globally

## [0.28.0] - 2017-08-01

* added styleModifier_label for button-inline
* Added Flexbox-Fix for IE10: set correct flex-values for flex items
* Added car-alarm page pattern
* Removed button pattern, that was marked as depracted before [Breaking change]
* Removed scss import pattern documentation [Breaking change]
* Added plugin-node-sass-dependency-collector, that auto generates scss import
  documentation for a pattern. In addition the plugin is able to lint css class usage
  and scss component dependencies. [Breaking change]

## [0.27.0] - 2017-07-27

* Upgraded color to fit newest color spec [Breaking change]
* Migration path, switching from old colors to new ones (when used on markup level):
  -background-page => -background-grey-9-1
  -background-toolbar => -background-grey-1
  -background-module => -background-white
  -background-notification-info => -background-blue-2
  -background-notification-error => -background-red-2
  -background-gray-1 => -background-grey-10-1
  -background-gray-2 => -background-grey-7
  -background-gray-3 => -background-grey-8
  -background-gray-4 => -background-grey-7
  -background-blue => -background-blue-1
  -background-red => -background-red-1
  -text-color-valid-form => -text-color-status-green
  -text-color-red-2 => -text-color-red-1
  -text-color-orange => -text-color-status-orange
  -text-color-e-mobility => -text-color-acid-green
  -text-color-e-plug-connected => -text-color-status-green

## [0.26.0] - 2017-07-26

* Added map-overview pattern
* Replaced map-fence-overview\_\_canvas class definitions with map-overview pattern [Breaking change]

## [0.25.3] - 2017-07-26

* Updated font-weight definitions and moved them to font.setup.scss

## [0.25.2] - 2017-07-24

* Fixed the build caused by notification-common missing variables

## [0.25.1] - 2017-07-24

* Updated notification-common so that styling matches design over all breakpoints

## [0.25.0] - 2017-07-24

* Add new button-inline type --multi-lines-centered for multiple lines of text and centered vertical
* Upgraded spacing mixins in order to be able to configure spacing type
* Renamed -spacing-widget-default to -spacing-widget-a [Breaking change]
* Renamed -spacing-widget-default-b to -spacing-widget-b [Breaking change]

## [0.24.0] - 2017-07-20

* Updated font and typo with new specs [Breaking change]
* Migration to new font: -font-secondary is removed completely. It's not necessary to define
* font-XXX on markup level anymore when you are using a -typo-XXX class. -typo-headline-5 was replaced
  with -typo-headline-4. You should replace any -typo-headline-XXX class that you've defined on markup
  with -typo-headline-XXX-thin.

## [0.23.2] - 2017-07-19

* Fixes service interval visual issues on Safari
* Adds breakpoint classes for flex
* Updated PatternLab dependency styleguidekit-assets-default to an internal one: styleguidekit-assets-default@3.5.0-porsche-stylesheets

## [0.23.1] - 2017-07-18

* Added pattern called list tag

## [0.23.0] - 2017-07-18

* Updated visualization-car pattern and style [Breaking change]
* @mixin icon-rotate
* Added all spacings from spec, usage of spacing in different directions
* Removed padding-right from car-list-info
* Font-size replaced with importing typo-copy in car-list-info
* Updated pattern states to inprogress, technical-review, visual-review, customer-review, complete
* Updated fallback car image for pattern visualization-car

## [0.22.0] - 2017-07-13

* Added spacing for callouts
* Updated pattern engine from Mustache to Handlebars [Breaking change]

## [0.21.6] - 2017-07-13

* Add flex for fixing safari bug
* Cleaned up unneeded scss files for vehicle related services

## [0.21.5] - 2017-07-13

* Added spacing for list expanded close button
* Added position mixin
* Added callout position changes
* IE11 flex issue fix for car-actions-control

## [0.21.4] - 2017-07-12

* Add hover for tab horizontal active

## [0.21.3] - 2017-07-12

* fixed flex issue with car-actions-control

## [0.21.2] - 2017-07-12

* Button-icon color changed as red
* Page-header spacing changed as spacing-f
* Seamless button disabled state does not have any background now
* Added textarea pattern

## [0.21.1] - 2017-07-10

* Changed import of font at checkbox.scss, radio.scss and select.scss

## [0.21.0] - 2017-07-07

* Added visualization-car pattern
* Bugfixed car-actions-control [Breaking Change]
* Add internal classes for navigation-topbar-desktop
* Added trip statistics component
* Added checkbox multiple selector pattern
* Added horizontal tabs

## [0.20.1] - 2017-06-30

* Added empty state to Trip Control page
* Optimized empty-state-action pattern

## [0.20.0] - 2017-06-30

* Added button notification pattern
* Added more styles for notification common pattern
* Added notification error inline pattern
* Added notification sticky pattern

## [0.19.0] - 2017-06-29

* Updated list-view, moved :hover feature to modifier &--hoverable [Breaking Change]
* Updated list-view, added checkable modifier &--checkable [Breaking Change]
* Updated list-view, added divider modifier &--divider [Breaking Change]
* Updated list-view icon size
* z-index was removed of list-view, positioning of layer-blocking needs to be handled by -layer helper [Breaking Change]
* Updated icon font

## [0.18.1] - 2017-06-28

* Hotfix for visualization-typo pattern

## [0.18.0] - 2017-06-27

* Add cursor styles for timestamp
* Added header organism

## [0.17.1] - 2017-06-23

* Added disabled state for timestamp-refresh to revert back to default (arrow -- it turns into a text cursor for text instead of the arrow) for the label

## [0.17.0] - 2017-06-22

* Created separate build step for framework (angular) specific css components. You'll have to import
  framework specific CSS manually now, e.g. for input, checkbox, radio, textarea and select. [Breaking Change]
* Added error state visualization for checkbox, radio to design spec page
* Optimized visual appearance of checkbox, radio, input, button-inline scroll up link and loaders on design spec page
* Removed button-icon from design spec page
* Bugfixed ng-invalid behaviour for input, radio and checkbox
* Add disabled state for refresh

## [0.16.0] - 2017-06-19

* Added navigation header pattern
* Renamed navigation topbar pattern [Breaking Change]

## [0.15.0] - 2017-06-14

* Added loader and refactored the loader styles [Breaking Change]
* Added modal common pattern
* Added disabled state for inline button
* Added animation for refresh

## [0.14.0] - 2017-06-13

* Added chart-bar and layout-car-chart pattern
* Added new pattern called tile-service-interval
* Refactored list-header to header-tile [Breaking Change]
* Added new pattern called tile
* Modified size of icon of timestamp-refresh

## [0.13.3] - 2017-06-13

* Added timestamp-refresh as organism (shared)

## [0.13.2] - 2017-06-09

* Added desktop navigation as organism
* Added notification common

## [0.13.1] - 2017-06-08

* Added honk and flash styles
* Change the approach for state empty image
* Fixes visual error at list-car-info pattern

## [0.13.0] - 2017-06-06

* Added new state for car-chooser
* Added state empty action
* Added list-car-info pattern

## [0.12.9] - 2017-06-01

* Added -layer (-layer-blocking-lower/-layer-blocking-higher) pattern
* Updated map-fence-overview
* Updated new icon font

## [0.12.8] - 2017-05-31

* Changed width of slider item
* Added px-to-rem converter to Aftersales specific files

## [0.12.7] - 2017-05-30

* Added car action control
* Optimized button-inline and added seamless version of it

## [0.12.6] - 2017-05-29

* Added new organism "slider-vehicle"

## [0.12.5] - 2017-05-26

* Added map-fence-overview pattern
* Created page variations for location alarm
* Refactored top level navigation service based
* Added new global organism car-chooser
* Changed divider modifier class name "grey" to "gray"

## [0.12.4] - 2017-05-23

* Added alarm form for speed alarm
* Added text color for pattern lab heading
* Added callout pattern

## [0.12.3] - 2017-05-19

* Added file extension to imports
* Renamed px-to-rem converter

## [0.12.2] - 2017-05-17

* Cleaned px - rem conversion for button modules

## [0.12.1] - 2017-05-17

* Added pixel to rem converter function
* Added disable state for button

## [0.12.0] - 2017-05-16

* Removed rounded corners of input, textarea and select fields
* Updated "layout-fence-form" [breaking pattern and style change]
* Updated tag suggested to use for button-icon
* Updated include paths needed for button-inline and button-icon
* Extended button-inline with a style for load more button
* Updated pattern page names for vehicle related services
* Added list violation for Speed alarm service
* Added new Atom "layer-blocking"

## [0.11.1] - 2017-05-15

* Added "link-scroll-up"

## [0.11.0] - 2017-05-12

* Updated mileage-input-form and vehicle-information pattern [breaking pattern and style change]

## [0.10.0] - 2017-05-09

* Bugfixed button-inline [breaking change]
* Added "layout-fence-form"
* Extended "button-inline" with --stretch modifier
* Extended "column" with --reverse modifier
* Renamed Geo Fence page pattern to Location Alarm
* Renamed Battery Charge page pattern to E-Control
* Refactored CSS file path remote-battery-charge to e-control for battery-chart, e-range-map, layout, plug-status and visualization [breaking change]

## [0.9.0] - 2017-05-04

* Refactored dealer service checkboxes as molecule and added layout page for dealer servie checkboxes
* Refactored vehicle information (pattern) [breaking change]

## [0.8.1] - 2017-05-03

* Added new list violation component
* Extended button-inline class with optional icon
* added new molecule "no recall available"

## [0.8.0] - 2017-05-02

* Added list-header (css & pattern)
* Updated list-view (css & pattern) [breaking change]
* Updated page pattern Battery Charge
* Added page pattern for Geo Fence, Speed Alert, Remote Auxiliary Heating, Remote Pre Trip Climatisation

## [0.7.0] - 2017-04-27

* Refactored flex classes [breaking change]
* Optimized behaviour of button-inline
* Added page-header (organism) pattern and css class
* Added Geo Fence (page) pattern
* Updated Remote Battery Charge (page) pattern
* Added -spacing-widget-default to spacing helper class
* Updated Geo Fence and Battery Charge (page) pattern [breaking change]
* Removed spacer class which was replaced with spacing class [breaking change]
* Extend spacing class with spacing-zero breakpoint specific class

## [0.6.0] - 2017-04-25

* Added new Porsche Next font [breaking design change]
* Extended remote-battery-charge page pattern

## [0.5.1] - 2017-04-24

* Updated z-index for expanded list view

## [0.5.0] - 2017-04-24

* optimized input field [markup changed]
* Added styles for input password field, date field, time field
* Added styles for input field with icon ( & hover state)
* Added styles for input field error state (Angular specific style)
* Added global error class for the input field
* Added new button-inline class
* Added new modifier to the column
* Optimized battery-charge-form-timer [markup changed]
* Added list-expanded component
* Updated flex, removed breakpoint specific selector for flex modifier

## [0.4.1] - 2017-04-12

### Added

* Added net pattern for vehicle related services, battery-charge-form-timer
* Added new common pattern for spacing
* Implemented inheritance plugin for data pattern object
* Refactored data pattern object, key will be named like: 'pattern-object_keyThatIsUsedInPattern'
* It's now possible to use pattern variables e.g. {{> molecules-checkbox:-spacing-static-c (checkbox_label: 'some custom label') }}
* Added design spec pattern page with form elements and removed radio/checkbox variations
* Refactored radio/checkbox pattern

## [0.4.0] - 2017-04-10

### Added

* Optimized list view pattern and style
* Updated markup for list view [breaking change]
* Added new organism "additional callback vehicles"
* Added new page "recall reminder"
* Added new color in color palette $color-palette-gray-7
* Added new modifier class for flexbox centering column content
* Updated column--zero and row--zero classes and added breakpoint specific class names
* Added new breakpoint "xxs"

## [0.3.2] - 2017-04-05

### Added

* Optimized list view
* Added flex class for displaying row reverse
* Added breakpoint specific row modifier "row--zero"

## [0.3.1] - 2017-04-03

### Added

* Added "safe clickable area" for checkbox
* Added "safe clickable area" for radio
* Added list pattern
* Added "spacing" class according to design specs, which will remove "spacer" class in the near future.

## [0.3.0] - 2017-03-28

### Added

* Added input field pattern
* Updated service appointment request [markup changed]
* Updated folder structure for aftersales
* Added new styles for car chooser component
* Added molecules for aftersales
* Changed implementation of templates into organism and pages
* Added new organism for aftersales
* Refactored dealer service scss
* Added common select dummy data
* Included primary font for input field label via mixin
* Added select field pattern
* Included primary font for select options via mixin
* Added checkbox molecules

## [0.2.1] - 2017-03-22

### Added

* Added height and width attributes to svg element in battery chart, as well as a preserveAspectRation property
* Added min-height to "battery-chart\_\_pending"
* Added input field pattern
* Updated service appointment request [markup changed]
* Updated folder structure for aftersales
* Added new styles for car chooser component
* Added molecules for aftersales
* Changed implementation of templates into organism and pages
* Added new organism for aftersales
* Refactored dealer service scss
* Added common select dummy data
* Included primary font for input field label via mixin
* Added select field pattern
* Included primary font for select options via mixin
* Added checkbox molecules

## [0.2.0] - 2017-03-16

### Added

* Added helper mixin for "background"
* Added helper mixin for "font"
* Added helper mixin for "text-color"
* Added helper mixin for "typo" [css source changed]
* Changed responsive behaviour of visualization-typo and removed icon [markup changed]
* Added helper mixin for align [css source changed, breaking change]
* Changed remaining `@extend`s to `@mixin` `@include`s and updated README
* Moved grid to base folder
* Renamed every class in base folder instead of grid and content with dash prefix [breaking change]
* Moved icon to modules folder [css source changed, breaking change]
* Refactored spacer class without modifiers [breaking change]
* Defined PatternLab state for VRS patterns
* Updated VRS pattern scss import statements
* Added text-color-gray-3
* Added markup for battery status timestamp to battery charge page on VRS
* Updated battery-charge [markup changed, breaking change]
* Removed breakpoint s from typo-headline-4

## [0.1.2] - 2017-03-13

### Added

* Updated breakpoint mixin, added optional second max-width parameter
* Replaced manual breakpoints with mixin for following css module, "typo", "battery-chart", "visualization-typo"
* Added "visualization-typo" as common css module
* Optimized battery chart animation
* Updated battery-chart [markup changed]
* Added battery-status
* Updated e-range-map [css source changed]
* Updated e-range-map-selector [css source changed]
* Added plug-status
* Added visualization-typo

## [0.1.1] - 2017-03-07

### Added

* Bugfix postinstall

## [0.1.0] - 2017-03-07

### Added

* Patternlab is part of the stylesheet repo now

## [0.0.9] - 2017-02-20

### Added

* Updated folder structure
* Updated build process to copy font assets into dist folder
* Changes at aftersales specific scss files
* Rename index files in modules to \_index to avoid import name clashes

## [0.0.8] - 2017-02-13

### Added

* Updated folder structure

## [0.0.7] - 2017-02-10

### Added

* Added specific vehicle related services styles

## [0.0.6] - 2017-02-09

### Added

* Added basic vehicle related services styles

## [0.0.5] - 2017-01-12

### Added

* Fixed sourceMapRoout for windows user

## [0.0.4] - 2017-01-12

### Added

* Moved dependencies

## [0.0.3] - 2017-01-12

### Added

* Added windows compatability

## [0.0.2] - 2017-01-12

### Added

* Added postcss plugins -> autoprefix, postcss-unprefix, postcss-flexboxfixer, postcss-gradientfixer, autoprefixer

## [0.0.1] - 2017-01-11

### Added

* initial project setup

[unreleased]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/compare/diff?targetBranch=refs%2Ftags%2Fv0.95.5&sourceBranch=refs%2Fheads%2Fmaster
[0.95.5]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.95.4
[0.95.4]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.95.3
[0.95.3]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.95.2
[0.95.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.95.1
[0.95.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.95.0
[0.95.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.94.0
[0.94.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.93.2
[0.93.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.93.1
[0.93.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.93.0
[0.93.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.92.1
[0.92.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.92.0
[0.92.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.91.2
[0.91.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.91.1
[0.91.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.91.0
[0.91.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.90.0
[0.90.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.89.0
[0.89.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.88.1
[0.88.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.88.0
[0.88.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.87.0
[0.87.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.86.0
[0.86.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.85.4
[0.85.4]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.85.3
[0.85.3]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.85.2
[0.85.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.85.1
[0.85.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.85.0
[0.85.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.84.2
[0.84.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.84.1
[0.84.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.84.0
[0.84.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.83.5
[0.83.5]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.83.4
[0.83.4]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.83.3
[0.83.3]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.83.2
[0.83.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.83.1
[0.83.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.83.0
[0.83.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.82.0
[0.82.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.81.1
[0.81.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.81.0
[0.81.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.80.1
[0.80.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.80.0
[0.80.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.79.1
[0.79.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.79.0
[0.79.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.78.0
[0.78.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.77.0
[0.77.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.76.0
[0.76.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.75.0
[0.75.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.74.1
[0.74.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.74.0
[0.74.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.73.0
[0.73.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.72.2
[0.72.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.72.1
[0.72.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.72.0
[0.72.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.71.0
[0.71.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.70.0
[0.70.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.69.0
[0.69.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.68.0
[0.68.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.67.1
[0.67.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.67.0
[0.67.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.66.0
[0.66.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.65.2
[0.65.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.65.1
[0.65.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.65.0
[0.65.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.64.0
[0.64.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.63.1
[0.63.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.63.0
[0.63.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.62.1
[0.62.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.62.0
[0.62.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.61.0
[0.61.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.60.0
[0.60.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.59.0
[0.59.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.58.0
[0.58.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.57.0
[0.57.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.56.0
[0.56.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.55.0
[0.55.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.54.0
[0.54.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.53.0
[0.53.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.52.0
[0.52.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.51.0
[0.51.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.50.0
[0.50.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.49.0
[0.49.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.48.0
[0.48.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.47.0
[0.47.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.46.0
[0.46.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.45.2
[0.45.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.45.1
[0.45.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.45.0
[0.45.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.44.0
[0.44.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.43.0
[0.43.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.42.3
[0.42.3]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.42.2
[0.42.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.42.1
[0.42.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.42.0
[0.42.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.41.0
[0.41.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.40.1
[0.40.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.40.0
[0.40.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.39.3
[0.39.3]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.39.2
[0.39.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.39.0
[0.39.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.39.0
[0.39.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.38.0
[0.38.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.37.6
[0.37.6]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.37.5
[0.37.5]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.37.4
[0.37.4]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.37.3
[0.37.3]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.37.2
[0.37.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.37.1
[0.37.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.37.0
[0.37.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.36.0
[0.36.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.36.0
[0.36.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.35.0
[0.35.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.34.1
[0.34.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.34.0
[0.34.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.33.0
[0.33.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.32.2
[0.32.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.32.1
[0.32.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.32.0
[0.32.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.31.0
[0.30.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.29.0
[0.29.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.28.0
[0.28.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.27.0
[0.25.3]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.25.2
[0.25.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.25.1
[0.25.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.25.0
[0.25.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.24.0
[0.24.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.23.2
[0.23.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.23.1
[0.23.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.23.0
[0.23.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.22.0
[0.22.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.21.6
[0.21.6]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.21.5
[0.21.5]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.21.4
[0.21.4]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.21.3
[0.21.3]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.21.2
[0.21.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.21.1
[0.21.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.21.0
[0.21.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.20.1
[0.20.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.20.0
[0.20.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.19.0
[0.19.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.18.1
[0.18.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.18.0
[0.18.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.17.1
[0.17.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.17.0
[0.17.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.16.0
[0.16.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.15.0
[0.15.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.14.0
[0.14.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.13.3
[0.13.3]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.13.2
[0.13.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.13.1
[0.13.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.13.0
[0.13.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.12.9
[0.12.9]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.12.8
[0.12.8]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.12.7
[0.12.7]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.12.6
[0.12.6]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.12.5
[0.12.5]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.12.4
[0.12.4]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.12.3
[0.12.3]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.12.2
[0.12.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.12.1
[0.12.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.12.0
[0.12.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.11.1
[0.1.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.1.2
[0.1.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.1.1
[0.1.0]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.1.1
[0.0.5]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.1.0
[0.0.4]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.0.4
[0.0.3]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.0.3
[0.0.2]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.0.2
[0.0.1]: https://bitbucket.web.porsche.biz/projects/PCCCOM/repos/porsche-stylesheets/commits?until=refs%2Ftags%2Fv0.0.1
