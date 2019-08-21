# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Changed

-   BREAKING CHANGE: Reset styles are now _not_ included by default in `index.css` or `index.scss`. Include `reset.css` separately to restore the styles as they were in the previous version. This allows a more finegrained control over how styles are included in a project.

    Migration path:

    -   Add `import "@porsche/ui-kit-react/css/reset.css"`

-   BREAKING CHANGE: The font scss mixins are removed. Replace the `-font-primary` mixin with `font-family: $p-font-primary;`.

-   BREAKING CHANGE: Icons are now in SVG format and not provided via a font. If you used icons directly in css (which is highly unlikely) you need to replace all css occurences with the `<Icon>` component. If your icons are not taking on the correct color or hover color, make sure to use both `color` and `fill` in your css to correctly color the svgs, or (even better) use the `color` and `hoverColor` props of the component.

-   All font faces are now loaded from porscheui CDN and have modernized @font-face definitions for improved performance. As such, no fonts are bundled with this package, and no fonts need to be bundled into your deployable for this UI Kit to work correctly. This finally enables browser font caching across different Porsche applications.

### Added

-   In addition to the `index.css` containing styles for all components, each component now has its own stylesheet as well. This way, you can only import the css you need. You should always include `import "@porsche/ui-kit-react/css/font-face.css"` for the Porsche font to work though.

-   The `<Icon>` component now has a `registerIcons` method to register project specific react components to render svg icons. You can create them by hand, but take a look at the README first to see how we create them programmatically using `svgr`.

### Fixed

-   Fixed an issue where `<ToastManager>` would ignore a timeout value of 0 and use the default timeout of 5000ms. Now 0 and negative timeout values display the toast until the user closes it manually.
-   Fixed an issue where `<Spacing>` would not pass all its props to the child element.

## [0.13.0] - 2019-07-30

-   Update to latest UI Kit Core version to support webfont files loaded from Edgecast CDN

## [0.12.3] - 2019-07-02

-   Add inputProps to Input Component props to pass attributes to native input element
-   Add textareaProps to Textarea Component props to pass attributes to native textarea element
-   Add inputProps to Radio Component props to pass attributes to native input element

## [0.12.2] - 2019-06-6

-   Bugfix disabled state in Radio Group component

## [0.12.1] - 2019-05-20

-   Changed design of checkboxes in disabled/checked state and default outline color

## [0.12.0] - 2019-05-13

-   Added pattern option to input component

## [0.11.0] - 2019-04-12

-   Added resizable option to textarea component

## [0.10.0] - 2019-03-13

-   Added Pagination component

## [0.9.1] - 2019-03-12

-   Added compatibility for Typescript 3.3.3333

## [0.9.0] - 2019-26-02

-   Refactoring of Button component
-   Added vertical alignment of radio group component

**Breaking Change:**

-   deleted `active` state property !!
-   deleted `error` state property !!
-   deleted `showContent` property !!
-   deleted `centered` property !! (buttons are always left aligned, also on mobile vp's)
-   changed `type` properties
-   added `inverted` property
-   added `size` property
-   added `direction`property to ButtonGroup

    Migration path:

    -   Mapping of button type properties: `default` => `default` `black` => Deleted! `red` => `highlight` `blue` => `sales` `acid-green` => Deleted! `ghost` => `ghost` `ghost-inverted` => Deleted! "inverted" will be a separate property

        additional type properties: `sales-ghost`

    -   On dark backgrounds always add `inverted` property

## [0.8.0] - 2019-18-01

-   Add Radio Component to molecules

## [0.7.0] - 2019-10-01

-   Update Ui-Kit-Core version
-   Changed Loader component to adapt core layout

## [0.6.0] - 2018-20-12

-   Enhanced Input component: enable to pass an Icon as custom JSX Element
-   Updated NPM dependencies
-   Update to React v16.6.3 and Typescript v3.1.6
-   Minor fixes on docs examples
-   Deleted "loading" examples of Select component, because "loading" prop doesn't exist yet.
-   Minor housekeeping

**Breaking Change:**

-   Changed relative SCSS input paths into `~` (tilde) imports. If you use webpack node-sass you should be fine. If not, install `node-sass-tilde-importer` as dependency.

## [0.5.0] - 2018-06-12

-   Added new grid component to specify standard grid behaviour (formerly done with flex component)

    Migration path: Change the following occurrencies of flex used as grid (example):

    ```
    <Flex gap="grid">
        <Flex.Item width={{ base: 0, l: 4 }} offset={{ base: 0, l: 2 }}> ... </Flex.Item>
    </Flex>
    ```

    to

    ```
    <Grid>
        <Grid.Child size={{ base: 0, l: 4 }} offset={{ base: 0, l: 2 }}> ... </Grid.Child>
    </Grid>
    ```

-   Refactoring of flex component

    Migration path: Change the following flex parent properties:

    `<Flex gap="grid">` => Use grid component (see above)! `<Flex alignLines={ ... }>` => `<Flex alignContent={ ... }>` `<Flex shrink={ ... }>` => deleted! (must be set on flex children (Flex.Item))

    Changes regarding width and offset properties:

    `<Flex.Item width={ ... }>` => Only basic widths are now supported ("auto" | "one-quarter" | "one-third" | "half" | "two-thirds" | "three-quarters" | "full"). If you need grid sizes use grid component instead! `<Flex.Item offset={ ... }>` => Hint: only basic offsets are now supported ("none" | "one-quarter" | "one-third" | "half" | "two-thirds" | "three-quarters"). If you need grid offsets use grid component instead!

## [0.4.5] - 2018-29-11

-   Fixed overflowing text on MultiSelect component.

## [0.4.4] - 2018-23-11

-   Hotfix: revert react version to 16.5.2 and its dependencies.
-   Fixed ButtonIcon width and height, test scripts and rendfering in IE11

## [0.4.3] - 2018-22-11

-   BREAKING: removed padding between tab and content area.

## [0.4.1] - 2018-11-21

-   Update version in ui-kit react docs.

## [0.4.0] - 2018-11-21

-   Added new `ButtonIcon` component.

## [0.3.1] - 2018-11-15

-   `Logo` is now the plain and simple Porsche Crest with barely any CSS. The box shadow and positioning CSS is now moved to the `Header` component.

## [0.3.0] - 2018-31-10

-   BREAKING: removed `Notification` in favor of `Toast` and `CookieNotification`.
-   BREAKING: removed some type exports of some props. If you want to access the type of a prop like `type` of `Text`, you can simply access it directly with `TextProps["type"]`. Every component exports its props as a type.
-   added `size` property to `Modal` to force the modal to use the entire width, height or both regardless of content size.

## [0.2.0] - 2018-10-23

-   added `Toast`and `Toast.Manager` component to display little notifications or messages on the bottom left.
-   added `loading` prop to `Modal` to show a loading indicator above the content but below the close button
-   added `Loader.Mask` component to complement Loader

## [0.1.33] - 2018-10-15

-   added bold font-weight to `Text` component
-   added `autofocus` property to `Input` and `TextArea` component

## [0.1.32] - 2018-09-24

-   icon changes
