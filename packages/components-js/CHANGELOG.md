# Changelog

## Porsche Design System - Components JS
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [Unreleased]

### [1.5.4] - 2020-08-25

### [1.5.4-rc.0] - 2020-08-17

#### Changed
- Removed classnames dependency
- Stencil Core `taskQueue` from `congestionAsync` to `async` for more performant component rendering

#### Fixed
- Focus input on label click of `Checkbox Wrapper` and `Radio Button Wrapper`
- Fix typings for `orientation` of `Divider` component

### [1.5.3] - 2020-08-10

### [1.5.3-rc.0] - 2020-08-10

#### Fixed
- Mix of `Optgroups` and `Options` on same level in `Select Wrapper` component

### [1.5.2] - 2020-07-22

#### Fixed
- Dispatch change event in `Select Wrapper`
- Stencil react-output-target SSR Bug

### [1.5.1] - 2020-07-20

#### Fixed
- SVGO settings for icons
- Angular bug which causes `ngcc` to fail

### [1.5.0] - 2020-07-16

#### Added
- Icons (active-cabin-ventilation, battery-full, bell, bookmark, car-battery, charging-active, charging-state, climate, climate-control, garage, horn, key, map, parking-brake, parking-light, preheating, send, shopping-bag, sidelights, user-manual, wrenches)

#### Changed
- Icons (arrow-first, arrow-last, battery-empty, car, card, charging-station, question)

#### Fixed
- Porsche Marque images

### [1.5.0-rc.2] - 2020-07-06

### [1.5.0-rc.1] - 2020-07-06

#### Added
- **Notification Neutral** color to `color` property of `p-text` and `p-icon`

### [1.5.0-rc.0] - 2020-06-25

#### Added
- `Fieldset Wrapper` component
- Improved SEO of `p-headline` and `p-text`: Added possibility to write semantic HTML tags (e.g. `<h1>-<h6>` or `<p>`, `<blockquote>`, etc.) directly as slotted content.
- Possibility to include anchor tags directly as slots of `Link`, `Link Pure` and `Link Social` 
- `Text` new `weight` property `semibold`
- `Button Pure` label with subline pattern as slot
- `Link Pure` label with subline pattern as slot

#### Changed
- `Select Wrapper` is now ready for the catwalk. It is dressed now with a custom drop down list box and gets naked by default on touch devices. 

#### Fixed
- Minor accessibility improvements of `icons` and `Text Field`
- Remove native number spinner buttons of `Text Field` with type text for Firefox
- An issue with `Button` and `Button Pure` and their `disabled` attribute

### [1.4.0] - 2020-05-14

### [1.4.0-rc.3] - 2020-05-08

#### Added
- `Text List`

#### Changed
- Improve caching strategy for fonts by content-based hash
- Improve caching strategy for marque by content-based hash
- Dimensions and sharpness of marque
- Props for `Content Wrapper`

### [1.4.0-rc.2] - 2020-05-06

#### Added
- `Content Wrapper`
- Description property to `p-text-field-wrapper`, `p-textarea-wrapper` and `p-select-wrapper`
- `Link Social`

#### Changed
- Improve accessibility of error and success states of form elements
- Aria-invalid attribute of form elements if they are in error state is now managed by component
- Rename icon name `configure` to `configurate` (prevents breaking change compared to stable v1.3.0)
- Improve `p-icon` loading behavior

#### Fixed
- Display of wrong icons

#### Removed
- `safe-zone` property of `p-grid` (`Content Wrapper` should be used instead)

### [1.4.0-rc.1] - 2020-04-27

#### Added
- Add `safe-zone` property to `p-grid` for outer grid margin, max-width and centering
- Submit button with search icon to `p-textfield-wrapper` type search
- Test-Projects React, Angular, Gatsby and NextJS

#### Changed
- Background color of readonly state in components `p-textfield-wrapper` and `p-textarea-wrapper`
- Visual appearance of icons
- Improve caching strategy for icons by content-based hash
- Cursor of Radio, Checkbox and Select
- Fixed naming of Mock from `p-textfield-wrapper` to `p-text-field-wrapper`

#### Fixed
- Icon loading mechanism

### [1.4.0-rc.0] - 2020-04-09

#### Added
- SSR support

### [1.3.0] - 2020-04-08

#### Added
- New headline size `headline-5` to `p-headline`
- Test Mocks

#### Fixed
- Text styling of Select component on focus in IE11 and Chrome on Windows 10

### [1.3.0-rc.0] - 2020-04-03

#### Fixed
- Improve form elements

### [1.2.0] - 2020-03-25

#### Added
- `Divider`
- Hover state for form elements

#### Fixed
- Support label text of form elements for Screen readers

### [1.1.2] - 2020-03-17

#### Changed
- Notification colors

### [1.1.1] - 2020-03-13

#### Changed
- Icon of `Checkbox` indeterminate state

### [1.1.0] - 2020-03-11

#### Fixed
- Minor improvements

### [1.1.0-rc.0] - 2020-03-02

#### Added
- `Select Wrapper`
- `Checkbox Wrapper`
- `Radio Button Wrapper`
- `Textarea Wrapper`

#### Fixed
- `Text Field Wrapper` toggle password visibility

### [1.0.3] - 2020-02-13

#### Fixed
- JS framework compatibility

### [1.1.0-0] - 2020-02-06

#### Added
- `Text Field Wrapper`

#### Changed
- Add proper cursor for disabled state for `Button` and `Button Pure`

### [1.0.2] - 2020-02-04

#### Fixed
- Inheritable styling of slotted content

### [1.0.1] - 2020-01-30

#### Added
- Clickable area of `Link Pure` and `Button Pure` is optionally configurable by defining padding on host element

### [1.0.0] - 2020-01-28

#### Added
- Cursor pointer on hover for `Button` and `Button Pure`
- Line-height gets calculated based on Porsche type-scaling formula automatically for `Text`, `Link Pure` and `Button Pure`
- Test helper function `componentsReady()` which indicates when lazy loaded components fully have loaded

#### Changed
- Update CDN asset paths
- Improve font-weight definitions
- Rename and optimize neutral colors for `Icon` and `Text`

### [1.0.0-rc.1] - 2019-12-13

#### Added
- `Headline`
- `Text`
- `Marque`
- `Button`
- `Button Pure`
- `Spinner`
- `Icon`
- `Flex`
- `Grid`
- `Link`
- `Link Pure`
- `Pagination`
- "Blur on focus"