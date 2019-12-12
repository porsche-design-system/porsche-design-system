# Porsche UI Kit SCSS Utils

## Not released yet

### Change
* Headline
 * Add variable for semibold weight
 * Remove headline-5 mixin
 
* Color
  * Update and remove color variables
  
* Text
  * Refine text variables and add default styles
  * Rename mixing `p-text-generic` to `p-text`
  * Change param order of `p-text` (text-size first, weight second)
  * Remove mixin `p-text-copy` and `p-text-small`

* Spacings
  * Remove responsive spacings (`a` to `g`)
  * Add mapped variables for reduced spacing set


## [1.0.0-alpha.3] (2019-09-25)

### Features
* added custom color variables for grey color tones.


## [1.0.0-alpha.2] (2019-09-09)

### Breaking change
* added prefix to breakpoint mixin

#### Migration path
* change `@include breakpoint(...)` to `@include p-breakpoint(...)`


## [1.0.0-alpha.1] (2019-08-21)

### Features

* Initial release