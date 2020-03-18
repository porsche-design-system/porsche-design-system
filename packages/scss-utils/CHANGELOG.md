# Porsche Design System | SCSS Utils
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2020-03-17

### Changed
- Notification colors

## [1.0.0] - 2020-01-28

### Added
- p-type-scale() mixin - Calculates font-size and line-height to fit into Porsche Vertical Grid System
- p-px() function - Converts rem to px units
- $p-font-size-22 variable to complete Porsche Type Scale
- $p-color-theme-{light|dark}-neutral-contrast-low
- $p-color-theme-{light|dark}-state-hover
- $p-color-theme-{light|dark}-state-active

### Changed
- Rename rem() to p-rem() function
- $p-color-theme-{light|dark}-neutral-1 => $p-color-theme-{light|dark}-neutral-contrast-high
- $p-color-theme-{light|dark}-neutral-2 => removed without replacement
- $p-color-theme-{light|dark}-neutral-3 => $p-color-theme-{light|dark}-neutral-contrast-medium

### Deprecated
- Mark rem() function as deprecated (will be removed in next major release)

## [1.0.0-rc.1] - 2019-12-13

### Added
- Initial release