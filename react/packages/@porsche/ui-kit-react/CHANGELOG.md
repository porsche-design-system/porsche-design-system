# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
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

## [0.3.0] - 2018-31-10
- BREAKING: removed `Notification` in favor of `Toast` and `CookieNotification`.
- BREAKING: removed some type exports of some props. If you want to access the type of a prop like `type` of `Text`, you can simply access it directly with `TextProps["type"]`. Every component exports its props as a type.
- added `size` property to `Modal` to force the modal to use the entire width, height or both regardless of content size.

## [0.2.0] - 2018-10-23
- added `Toast`and `Toast.Manager` component to display little notifications or messages on the bottom left.
- added `loading` prop to `Modal` to show a loading indicator above the content but below the close button
- added `Loader.Mask` component to complement Loader

## [0.1.33] - 2018-10-15
- added bold font-weight to `Text` component
- added `autofocus` property to `Input` and `TextArea` component

## [0.1.32] - 2018-09-24
- icon changes
