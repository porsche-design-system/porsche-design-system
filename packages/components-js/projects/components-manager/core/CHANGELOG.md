# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-alpha.6] - 2021-01-05
### Changed
- Removed `stylesUrl` and `inlineStyles` from `LoadComponentLibraryOptions`

## [1.0.0-alpha.5] - 2021-01-04
### Changed
- Removed unneeded features and simplify config

## [1.0.0-alpha.4] - 2020-12-07
### Changed
- Renamed `WCM_KEY` from `porscheWebComponentsManager` to `porscheDesignSystem`

## [1.0.0-alpha.3] - 2020-10-29
### Changed
- Updated dependencies

## [1.0.0-alpha.2] - 2020-09-09

## [1.0.0-alpha.1] - 2020-09-09
### Changed
- Pass combined options parameter to `loadComponentLibrary` instead of 6 separate parameters

## [1.0.0-alpha.0] - 2020-08-20
### Changed
- Use `yarn` instead of `npm` in npm scripts
- Removed gtm-types and messaging-handler
- Subscribe to POLYFILLS_LOADED_EVENT_NAME only once
- Replaced jasmine and karma with jest
- Improved minification

## [0.2.5] - 2020-06-24

## [0.2.4] - 2020-06-23
### Changed
- Package name back to @myporsche/myservices-web-components-manager and releases to MyPorsche registry

## [0.2.3] - 2020-05-28
### Changed
- Package name to @porsche-design-system/web-components-manager and releases to Porsche Design System registry

## [0.2.2] - 2020-05-12
### Fixed
- Update `@myporsche/myservices-web-components-manager-polyfills` to make IE11 work again

## [0.2.1] - 2020-04-24
### Fixed
- Entrypoints in package.json

## [0.2.0] - 2020-04-24
### Added
- Unit tests based on karma and jasmine

### Changed
- Use new `@myporsche/myservices-web-components-manager-polyfills` package for polyfills
- Removed default value for version in `setRegisterComponentsCallback`
- Updated dependencies

### Fixed
- Provider API
  - `componentInit` should not throw `of null` errors anymore
  - `getLibraryHandlerData` accessing data for already loaded libraries
- Consumer API
  - `componentsReady` should not throw `of null` errors anymore

## [0.1.4] - 2020-04-08
### Changed
- minor change to reduce size of load `loadComponentLibrary` builds
- fixed event name to listen for new polyfills loaded event

## [0.1.3] - 2020-04-08
### Changed
- changed polyfills to a stencil based polyfill package

## [0.1.2] - 2020-04-07
### Changed
- `loadComponentLibrary` loads now styles in parallel to polyfills for better performance
  and loading behaviour
- ensure execution order for `addScript` to stick with the order of the `loadComponentLibrary`
  `scripts` parameter array.

## [0.1.1] - 2020-04-06
### Changed
- fix polyfill loading for edge 18

## [0.1.0] - 2020-04-05
### Added
- Polyfill handler
  - Consumer API
    - `loadPolyfills` to load the polyfills manually (which usually shouldn't be needed)
    - `preventPolyfills` to prevent polyfill loading completely (automatic and manual)
- esm5 build
- Provider API
  - `setRegisterComponentsCallback` as public api - to register components in prefix compatible libraries
- Make `ComponentLibraryScripts` interface available (without deep import)
- Handling for inline stylesheets and stylesheet url in `loadComponentLibrary`
- Messaging API
  - `provideDataWithHistory`
  - `requestDataWithHistoryStream`
  - Messaging with history key `track` including types for OneGA tracking

### Changed
- dist directory structure (esm5 and esm2015 builds are available now)
- Renamed `ComponentLibraryUrls` to `ComponentLibraryScripts`
- Renamed `ComponentLibraryUrl` to `ComponentLibraryScript`
- Interface of `ComponentLibraryScript` does now contain only a single url
  and a boolean if it's module syntax or not, to make it more generic
- Improved `loadComponentLibrary` to not depend on async/await or Promises
  (less to polyfill and smaller bundle size)
- Prefix is now `null` by default, to differentiate between no prefixing
  available and empty prefix string
- Version is now set as `'global'` instead of empty string by default. Also
  it's forced to be `'global'` if prefixing is not used (we can't support
  multiple versions then).
- `setRegisterComponentsCallback` does not take the 4th parameter `prefix`
  anymore
- `MessagingData` structure to support messaging with history

### Fixed
- Use correct parameters for `getLibraryHandlerData` in `loadComponentLibrary`
- Use correct parameters for `getLibraryHandlerData` in `setRegisterComponentsCallback`

## [0.0.3] - 2020-03-27
### Changed
- addScript does not add unused scripts anymore
- ensure in messaging handler that requestDataStream callback
  is never called synchronously

## [0.0.2] - 2020-03-26
### Added
- Messaging
  - Typing for predefined keys
### Changed
- fixed main entry point in package.json
- fixed data handler writing data to document

## [0.0.1] - 2020-03-26
### Added
- Consumer API
  - `componentsReady` to check if all web components are ready
- Provider API
  - `loadComponentLibrary` for load once behaviour of libraries
    (compatible with prefixes and multiple versions, if the
    library supports it)
  - `componentInit` to provide componentsReady compatibility for
    in library
- Messaging API
  - `provideData` to provide global data
  - `requestData` to request data once
  - `requestDataStream` to request data and get updated if new
    data is available
