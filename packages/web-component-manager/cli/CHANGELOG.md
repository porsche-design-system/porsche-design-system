# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-alpha.9] - 2021-01-05
### Changed
- Updated dependencies

## [1.0.0-alpha.8] - 2021-01-04
### Changed
- Simplify Config

## [1.0.0-alpha.7] - 2020-12-07
## [1.0.0-alpha.6] - 2020-12-07
### Changed
- Only stringify relevant part of config and expose as `PWCM_CONFIG`

## [1.0.0-alpha.5] - 2020-11-25
### Added
- Additional entry files and typings can be supplied via `additionalEntryFiles` config

### Changed
- `pwcm.config.js` is searched for

## [1.0.0-alpha.4] - 2020-10-30
### Changed
- Updated to webpack 5

## [1.0.0-alpha.3] - 2020-10-29
### Changed
- Updated dependencies

## [1.0.0-alpha.2] - 2020-09-09

## [1.0.0-alpha.1] - 2020-09-09
### Changed
- Pass options parameter to `load` function instead of only string for prefix

## [1.0.0-alpha.0] - 2020-08-20
### Changed
- Improve formatting

## [0.2.5] - 2020-06-24
### Changed
- Add typescript definitions file to created `index.js`

## [0.2.4] - 2020-06-23
### Changed
- Package name back to @myporsche/myservices-web-components-manager-cli and releases to MyPorsche registry

## [0.2.3] - 2020-05-28
### Changed
- Package name to @porsche-design-system/web-components-manager-cli and releases to Porsche Design System registry

### Fixed
- library-entry with prefix is now es5 compatible (IE11 compatibility)

## [0.2.2] - 2020-04-24
### Fixed
- Update `@myporsche/myservices-web-components-manager` to make IE11 work again

## [0.2.1] - 2020-04-24
### Changed
- Update `@myporsche/myservices-web-components-manager` to 0.2.1

## [0.2.0] - 2020-04-24
### Changed
- Aligned major and patch version number with `@myporsche/myservices-web-components-manager`
- Use `nodir` option for glob patterns, that they don't accidentally match directories
- Updated dependencies 

## [0.0.6] - 2020-04-08
### Changed
- Update `@myporsche/myservices-web-components-manager` to 0.1.4

## [0.0.5] - 2020-04-08
### Changed
- Update `@myporsche/myservices-web-components-manager` to 0.1.3

## [0.0.4] - 2020-04-07
### Changed
- Update `@myporsche/myservices-web-components-manager` to 0.1.2

## [0.0.3] - 2020-04-06
### Changed
- Update `@myporsche/myservices-web-components-manager` to 0.1.1

## [0.0.2] - 2020-04-05
### Added
- Possibility to set source url directly for `globalStyles` and `scripts`

### Changed
- `globalStyles` has not now be an object instead of a string

## [0.0.1] - 2020-04-05
### Added
- Initial implementation of cli to create PWCM compatible
  web component library npm packages
