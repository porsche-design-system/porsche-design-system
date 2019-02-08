# Contributing guide

This file is meant for Porsche Stylesheets developers.  See `README.md` for general usage.

Before starting developing or changing patterns, please make yourself familiar with what Pattern Lab actually is, how it works etc.  A good starting point is the [Working with patterns](http://patternlab.io/docs/pattern-organization.html) guide.

## Installation

Check out the project, install and run it:

```
> git checkout ssh://git@bitbucket.web.porsche.biz:2222/pcccom/porsche-stylesheets.git
> npm install
> npm start
```

Pattern Lab will watch for changes and rebuild once it detects those.  SASS changes are handled way faster than changes to the handlebar files.

Please also make sure to restart from time to time since some checks are only done on full (re-)start.  Restarting is also recommended from time to time due to memory consumption of gulp and the whole watch process.

### Linking the Porsche Stylesheets (in a Node.js project)

In some occasions, it might be reasonable to link the Porsche Stylesheets into your project to check out new or changed patterns in the context of your application.  This can be achieved through:

1. Go to the `porsche-stylesheets` project and run: `npm link`
3. Go to your project and run: `npm link porsche-stylesheets`

The Porsche Stylesheets are now available to be used in your project.

### Unlinking

Once you no longer need the linked development version, follow the following steps to unlink the package and revert to using the published version:

1. Go to the project that consumes `porsche-stylesheets`.
2. `npm unlink porsche-stylesheets`
3. `npm install`

To remove the possibility to link the development package again, run the following command in the `porsche-stylesheets` project:

1. `npm unlink`

## Release Management
1. After merge requirements of a pull request are fulfilled, it can be merged to master branch (don't forget to delete the branch afterwards)
2. Goto UI Kit Core project in terminal and pull latest commits `git pull`
3. Either execute `npm version patch` for a patch release or `npm version minor` for a minor release
4. Open `CHANGELOG.md` and update release notes with proper date and version
5. Create a commit with following message structure `Release ui-kit/v0.{MINOR_NUMBER}.{PATCH_NUMBER} | {DEVELOPER_ABBREVEATION} | PUIK`
6. Create a Git tag `git tag v0.{MINOR_NUMBER}.{PATCH_NUMBER}/core`
7. Run project with `npm start` to be sure everything works as expected
8. Push local commit with tag to master branch `git push --tags`
9. Create a npm release by executing `npm run publish-artifactory` or simply `npm publish` when your Artifactory credentials are properly set already
10. Login to Artifactory and download latest npm package of Porsche UI Kit Core
11. Rename downloaded package to `@porsche/{PREVIOUS_FILENAME}`
12. Upload package to Confluence "Porsche UI Kit Releases" page
13. Write a Slack notification by coping last entry of `CHANGELOG.md` in Porsche UI Kit channel

## Folder and file structure

```
.
├── ...
├── dist
├── patternlab
│   ├── source
│   └── ...
└── src
    ├── base
    ├── common
    ├── mixins
    ├── modules
    ├── setup
    ├── index.scss
    └── ...
```

The important bits:

`patternlab/source` contains the markup and meta information of patterns.

`src` contains all SASS files for all patterns including general SASS code and support files (eg. mixins, variables, ...).

## Pattern structure

Porsche Stylesheets are strictly following [Atomic Design](http://atomicdesign.bradfrost.com/) principles with one exception: templates are usually not used.

Besides that there are two types of patterns: global and service specific patterns.  Global patterns are those that are used by all but at least two services while service specific ones are only used by one service.  It's forbidden to consume service specific patterns by global patterns.

A pattern usually consists of the following files:

* a handlebar template (`*.hbs`)
* a markdown file with some meta information (`*.md`)
* an optional JSON file with default configuration (`*.json`)
* a SASS file specifying the styles for the pattern (`*.scss`)

### Markup

The entry point for pattern markup and meta information is the directory `patternlab/source/_patterns/`.  Depending on the nature of the pattern, the most appropriate folder for the pattern is chosen.  Within the target folder is a folder with either the name of the pattern or a logical name for a "pattern collection", which contains all required files for pattern lab except the SASS files.

_Note: a pattern collection is a collection of patterns somehow related to each other.  For example there's a pattern collection called `tile` with patterns such as `tile`, `tile-events`, `tile-slider` and more._

Handlebar is used as template engine, which also supports component variables.  Default values can be specified in the JSON file which are respected in the Pattern Lab frontend.  See also the official [Creating Pattern-specific Values manual](http://patternlab.io/docs/data-pattern-specific.html).  The [Data Inheritance Plugin for Pattern Lab Node](https://github.com/Altinn/plugin-node-data-inheritance) is also in use.

### Styles

All style definitions are based in the `src/` folder.

- `base`

  contains base layout stuff that is needed for almost every pattern

- `common`

  contains commonly used files like a reset.scss and keyframe identifiers for animations

  _TODO: the difference between `base` and `common` is not clear._

- `mixins`

  contains generic and global mixins

- `modules`

  contains all pattern specific SASS code

- `setup`

  contains common and global setup files

- `porsche-stylesheet(.+)?.scss`

  These files are used by Pattern Lab.  It's not meant to be used by consumers.

## Naming conventions

### Pattern names

Names are important to identify patterns and draw conclusions regarding names of other patterns. Therefore it was agreed on a common naming convention as follows:

* If the pattern belongs to another pattern, eg. is used exclusively by this, use the pattern name as a prefix, appended with a dash.

> Example: a pattern specifically made for use in tiles gets the prefix `tile-`.

> Example: a pattern specifically made for use in a navigation element gets the prefix `navigation-`.

* Use the major representation or identification as a name.  If it looks like something but can also be uses as something else, use the one that is more common.

> Example: a headline is used as a link but could also be used as just a headline.  The name then becomes `headline`.  With a potential prefix it would be `tile-headline`.

> Example: a link with an icon that should always be identified as a link should have a name `link` and not `icon-link`.  With a potential prefix it would be `tile-link`.

* In case the actual name does not identify the pattern enough, the full name can be further specified with an appendix.

> Example: a link, that should always indicate to scroll the page up can have the appendix `scroll-up`, so it will become `link-scroll-up`.  With a potential prefix it would be `footer-link-scroll-up`.

In any case, common sense rules over this small set of rules.

### Component variables

Due to inheritance issues with objects, component variables have to be flat and cannot be nested/written as objects.  Therefore it was agreed on a naming scheme for variables to achieve a logical structure:

* Variables are always prefixed with the pattern name
* The actual variable name needs to be written in camelCase with a lower first letter
* Prefix and name are separated with an underscore

> Syntax: `${pattern-name}_${variableName}`

> Example: `visualization-typo_responsiveBehaviour`

### Page variables

Variables for pages can be written as objects since there's no expectation of inheritance.  It's still important to "prefix" variables with their parent, in this case a name for the page.  Nesting can be as deep as it makes sense for the specific use case.

JSON example:

```json
{
  "my-page": {
    "getStarted": {
      "title": "How to get started",
      "description": "Some how to text"
    },
    "aboutUs": {
      "title": "About us",
      "description": "Some introduction text"
    }
  }
}
```

## Pattern layout

Patterns should not have an outer margin or a padding.  It should be possible to position a pattern (child) in any other pattern (parent) with the alignment defined in the parent.  If specific margins need to be applied, use the [Style Modifier](http://patternlab.io/docs/pattern-stylemodifier.html).  To be able to apply the Style Modifier, each pattern must include the variable `styleModifier` within their class list definition as per the docs.

_Note: `styleModifier` should never be extracted into the JSON file._

Disclaimer: some pattern may require to have a margin or padding, such as headlines or other specific use cases.  Please apply common sense and, when in doubt, discuss about the specific implementation.

Please note that some patterns might use so called "custom style modifiers", through which classes can be applied to an element buried inside of the pattern.  In some cases this has been seen as the only solution to achieve a certain visualization, however, this is now considered bad practice and should be avoided.  Possible solutions to work around this is:

* refactor affected code, eg. icons are now written as mixins and can be applied without setting a class name
* create an API (via component variables) through which the affected part can be controlled

## Code formatting rules

### Markup / handlebars

* 2 spaces are used for indentation.

* Included partials (=other components, patterns) are indented as the markup would be.  The first parameter should be placed on the same line as the partial name.  Subsequent parameters should be written on a separate line for each parameter while they're aligned with the first parameter.

Code sample:

```handlebars
<div class="some-css-class {{styleModifier}}">
  <div class="some-css-class another-css-class
             {{#if some-property-1}} some-specific-css-class {{/if}}
             {{#if some-property-2}} antother-specific-css-class {{/if}}"
       id="foo-bar">

    {{#if some-property-3}}
      {{> button-inline styleModifier="some-css-class" }}
    {{/if}}

    {{> button-inline styleModifier="some-css-class"
                      button-inline_disabled=true
                      button-inline_seamless=true }}

  </div>
<div>
```

### SASS

Please refer to the SASS linting configuration for facts.  Other than that we follow these rules:

* 2 spaces are used for indentation.

* Selectors follow the BEM and BEVM methodology (see http://getbem.com and https://www.viget.com/articles/bem-sass-modifiers)

* Style sheets can be grouped logically, spacing should be kept as low as one empty line.

* Comments are explicitly allowed, even multiline comments.  Always stick to the rule: don't comment *what* the code does but *why* it does what it does.  If the "*what*" has to be documented to understand the code, the code needs to be refactored.

* Explicit values (see following list) have to be extracted in a so called "setup file".  This file has the same name as the corresponding SASS file with the pre-suffix `setup`.  Ergo, the setup file for `foo.scss` becomes `foo.setup.scss`.

  List of values to be extracted:

  - colors (color, background-color, border-color, ...)
  - paddings
  - margins
  - width (border-width...), height
  - font-size
  - left, right, top, bottom
  - opacity

  Implicit values such as `auto` or `inherit` can be extracted as well but don't have to.

* Always import all other files the pattern is relying upon.  This might not be needed to build and inspect the pattern with Pattern Lab.  But it has to be done to document all references so they can be imported by the consumer as well.

* Never use pixel unit as value for a property but use the px-to-REM converter mixin `rem()`.

* Don't use `@extend`; try to extract the generic part into a mixin and use this.  See https://www.sitepoint.com/avoid-sass-extend/ for an exmplanation.

* Framework specific styles should go into a separated `porsche-stylesheets.${framework}.scss` file in `src/`, which includes files containing specific rules.  One example is Angular with its `ng-*` classes.

* Never import SASS of other patterns into a pattern, rather refactor and use the generic part in both patterns.

* Try to keep specificity as low as possible by avoiding nested or adjoining classes as well as `!important` declarations.  Exceptions and common sense applies here as well.

* It's necessary to add #{$global-class-prefix} Sass variable before each BEM block name, so that it's possible for consumers of this package to prefix all CSS classes to prevent CSS class name clashes.

Code sample:

```scss
@import 'some-mixin.scss';
@import 'another-mixin.scss';

.button {
  @include some-mixin;
  @include another-mixin;

  height: auto;

  &__label {
    @include some-mixin;

    display: inline;
    width: auto;
    height: auto;
  }
}
```

### SASS Variable names

It should be easy identify what a variable stands for.  Therefore it was agreed to use a similar convention as BEM, written as kebab-case.

> Syntax: `${pattern-name}${-element}?${-modifier}?${-property}${-state}?${breakpoint}?`

> Example: `$button-background-color`

> Example: `$button-label-primary-text-color-m`

Code sample:

```scss
// foo.scss
.button {
  background: $button-background-color;

  &[disabled] {
    background: $button-background-color-disabled;
  }

  &__label {
    text-color: $button-label-text-color;

    &--primary {
      text-color: $button-label-primary-text-color;

      @include breakpoint('m') {
        text-color: $button-label-primary-text-color-m;
      }
    }
  }
}
```

```scss
// foo.setup.scss
$button-background-color: $color-palette-black !default;
$button-background-color-disabled: $color-palette-grey-5 !default;

$button-label-text-color: $color-palette-white !default;

$button-label-primary-text-color: $color-palette-red-1 !default;
$button-label-primary-text-color-m: $color-palette-red-2 !default;
```

## Special mixins

### Input Polyfill

Some browsers are not able to handle placeholders correctly.  Therefore a polyfill exists in this project called `polyfill.placeholder-shown.js` to add a class called `placeholder-not-shown`.

To use it, make sure the project includes the file `form/input.polyfill.placeholder-shown.scss`.

### Spacings

Helper classes and mixins for static (e.g. `-spacing-3`) and responsive (e.g. `-spacing-a`) spacings are available.

Please use them carefully: spacing between patterns should be avoided because of collapsing margins.  If possible, only use `margin-top` to be consistent with other patterns and to ensure the ease of maintenance.
