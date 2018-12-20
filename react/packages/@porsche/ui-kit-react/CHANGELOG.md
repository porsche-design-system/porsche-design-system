# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [0.6.0] - 2018-20-12
- Enhanced Input component: enable to pass an Icon as custom JSX Element
- Updated NPM dependencies
- Update to React v16.6.3 and Typescript v3.1.6
- Minor fixes on docs examples
- Deleted "loading" examples of Select component, because "loading" prop doesn't exist yet.
- Minor housekeeping

__Breaking Change:__ 
- Changed relative SCSS input paths into `~` (tilde) imports. If you use webpack node-sass you should be fine. If not, install `node-sass-tilde-importer` as dependency.

## [0.5.0] - 2018-06-12

- Added new grid component to specify standard grid behaviour (formerly done with flex component)  

    Migration path:  
    Change the following occurrencies of flex used as grid (example):
    
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

- Refactoring of flex component  

    Migration path:  
    Change the following flex parent properties:  
    
    `<Flex gap="grid">` => Use grid component (see above)!  
    `<Flex alignLines={ ... }>` => `<Flex alignContent={ ... }>`  
    `<Flex shrink={ ... }>` => deleted! (must be set on flex children (Flex.Item))  
    
    Changes regarding width and offset properties:  
    
    `<Flex.Item width={ ... }>` => Only basic widths are now supported ("auto" | "one-quarter" | "one-third" | "half" | "two-thirds" | "three-quarters" | "full"). If you need grid sizes use grid component instead!  
    `<Flex.Item offset={ ... }>` => Hint: only basic offsets are now supported ("none" | "one-quarter" | "one-third" | "half" | "two-thirds" | "three-quarters"). If you need grid offsets use grid component instead!  


## [0.4.5] - 2018-29-11

-   Fixed overflowing text on MultiSelect component.

## [0.4.4] - 2018-23-11

-   Hotfix: revert react version to 16.5.2 and its dependencies.
-   Fixed ButtonIcon width and height, test scripts and rendfering in IE11 

## [0.4.3] - 2018-22-11

-   BREAKING: removed padding between tab and content area.

## [0.4.1] - 2018-11-21

- Update version in ui-kit react docs.

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
