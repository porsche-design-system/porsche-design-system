# Changelog

## Porsche Design System

All notable changes to this project will be documented in this file and published as following npm packages:

- `@porsche-design-system/components-js`
- `@porsche-design-system/components-angular`
- `@porsche-design-system/components-react`
- `@porsche-design-system/components-vue`

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.29.0] - 2025-08-20

## [3.29.0-rc.5] - 2025-08-19

### Changed

- `Checkbox`, `Multi Select`, `Select`, `Pin Code`, `Textarea`: removed slotted anchor styles
  ([#3981](https://github.com/porsche-design-system/porsche-design-system/pull/3981))

### Fixed

- `Popover`: support for custom slotted button & improvements
  ([#3976](https://github.com/porsche-design-system/porsche-design-system/pull/3976))

## [3.29.0-rc.4] - 2025-08-15

### Added

- `Flag`: ([#3964](https://github.com/porsche-design-system/porsche-design-system/pull/3964))
- `Input Url`: ([#3949](https://github.com/porsche-design-system/porsche-design-system/pull/3949))
- `Multi Select`: `compact` prop to enable a smaller, space-saving version for compact layouts
  ([#3953](https://github.com/porsche-design-system/porsche-design-system/pull/3953))
- `Fieldset`: ARIA role `radiogroup` is now supported via `aria` prop. Internal ARIA attributes for `aria-invalid` and
  `aria-required`. ([#3957](https://github.com/porsche-design-system/porsche-design-system/pull/3957))
- `Input Date`, `Input Time`: ([#3954](https://github.com/porsche-design-system/porsche-design-system/pull/3954))

### Changed

- `Multi Select`, `Select`: `background` is now transparent to be aligned with other form fields
  ([#3953](https://github.com/porsche-design-system/porsche-design-system/pull/3953))
- `Multi Select`, `Select`: improved a11y and highlight of options
  ([#3953](https://github.com/porsche-design-system/porsche-design-system/pull/3953))
- `Multi Select`: aligned filter and keyboard behavior with `Select`
  ([#3943](https://github.com/porsche-design-system/porsche-design-system/pull/3943))
- `Scroller`: Deprecation of prop `gradientColor` because gradient is now managed internally and adapts to all themes
  and background colors automatically.
  ([#3962](https://github.com/porsche-design-system/porsche-design-system/pull/3962))

## [3.29.0-rc.3] - 2025-07-29

### Fixed

- Partials: `topLevelAwait` issue in ESM build
  ([#3947](https://github.com/porsche-design-system/porsche-design-system/pull/3947))

## [3.29.0-rc.2] - 2025-07-28

### Changed

- Partials: provide CJS & ESM build ([#3945](https://github.com/porsche-design-system/porsche-design-system/pull/3945))

## [3.29.0-rc.1] - 2025-07-15

### Added

- `Popover`: support for custom slotted button
  ([#3861](https://github.com/porsche-design-system/porsche-design-system/pull/3861))
- `Icon`: `ai-spark` and `ai-spark-filled`
  ([#3916](https://github.com/porsche-design-system/porsche-design-system/pull/3916))
- `Input Text`: `counter` prop functions independently of `max-length`, allowing character count display even when no
  limit is set ([#3901](https://github.com/porsche-design-system/porsche-design-system/pull/3901))
- `Input Email`: ([#3927](https://github.com/porsche-design-system/porsche-design-system/pull/3927))
- `Input Tel`: ([#3928](https://github.com/porsche-design-system/porsche-design-system/pull/3928))

### Changed

- `Input Search`: `indicator` prop now defaults to `false`
  ([#3917](https://github.com/porsche-design-system/porsche-design-system/pull/3917))
- Angular: updated peer dependency to `>=20.0.0 <21.0.0`
- **Breaking Change** `Textarea`:
  - Renamed the `showCounter` prop to `counter`.
  - Changed default behavior: the `counter` is now disabled by default (`false` instead of `true`).

  ```diff
  - <p-textarea name="some-name" showCounter="false"></p-textarea>
  + <p-textarea name="some-name"></p-textarea>
  ```

  To enable the counter explicitly:

  ```diff
  - <p-textarea name="some-name"></p-textarea>
  + <p-textarea name="some-name" counter="true"></p-textarea>
  ```

  ⚠️ This is a breaking change — you must update all instances using `showCounter`.
  ([#3901](https://github.com/porsche-design-system/porsche-design-system/pull/3901))

### Fixed

- `Carousel`: component does not work correctly if an invalid `lang` value is provided
  ([#3924](https://github.com/porsche-design-system/porsche-design-system/pull/3924))
- Vue: fixed initial render for `dark` and `auto` themes in `PorscheDesignSystemProvider`
  ([#3898](https://github.com/porsche-design-system/porsche-design-system/pull/3898))

## [3.29.0-rc.0] - 2025-06-27

### Added

- `Input Search`: ([#3874](https://github.com/porsche-design-system/porsche-design-system/pull/3874))
- `Input Number`, `Input Password`: added loading state
  ([#3874](https://github.com/porsche-design-system/porsche-design-system/pull/3874))
- `Input Text`: ([#3897](https://github.com/porsche-design-system/porsche-design-system/pull/3897))
- `Select`: `filter` prop to enable an input in the dropdown to filter options
  ([#3893](https://github.com/porsche-design-system/porsche-design-system/pull/3893))
- `Flyout`: expose `--ref-p-flyout-pt` and `--ref-p-flyout-px` read only CSS variable
  ([#3902](https://github.com/porsche-design-system/porsche-design-system/pull/3902))

## [3.28.0] - 2025-06-02

### Added

- `Input Number`: ([#3855](https://github.com/porsche-design-system/porsche-design-system/pull/3855))

### Fixed

- `Select Wrapper`: update of scroll position if dropdown is navigated with keyboard
  ([#3858](https://github.com/porsche-design-system/porsche-design-system/pull/3858))
- `Select`, `Multi Select`: replacement of static (english) a11y announcement of active `option` with dynamic
  announcement through `ariaActiveDescendantElement`
  ([#3826](https://github.com/porsche-design-system/porsche-design-system/pull/3826))

## [3.28.0-rc.3] - 2025-05-19

### Added

- `Styles`: theme for `tailwindcss` including utilities available under
  `import { … } from '@porsche-design-system/components-{js|angular|react|vue}/tailwindcss';`
  ([#3849](https://github.com/porsche-design-system/porsche-design-system/pull/3849))

### Changed

- Partials: `getInitialStyles` removed default styles for `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `b` and `strong`
  ([#3849](https://github.com/porsche-design-system/porsche-design-system/pull/3849))

#### Fixed

- `Multi Select`: enable full a11y compliance
  ([#3819](https://github.com/porsche-design-system/porsche-design-system/pull/3819))
- Accessibility: fix ARIA live announcements of form components status messages
  ([#3796](https://github.com/porsche-design-system/porsche-design-system/pull/3796))

## [3.28.0-rc.2] - 2025-04-23

### Fixed

- `Canvas`: stealing focus from `Text Field Wrapper`
  ([#3843](https://github.com/porsche-design-system/porsche-design-system/pull/3843))

## [3.28.0-rc.1] - 2025-04-14

### Fixed

- `Drilldown`, `Drilldown Item`: visibility for slotted content (experimental)
  ([#3833](https://github.com/porsche-design-system/porsche-design-system/pull/3833))

## [3.28.0-rc.0] - 2025-04-11

### Added

- `Input Password`: ([#3763](https://github.com/porsche-design-system/porsche-design-system/pull/3763))
- `Drilldown`, `Drilldown Item`: CSS variable `--p-drilldown-grid-template` and `--p-drilldown-gap` (experimental)
  ([#3822](https://github.com/porsche-design-system/porsche-design-system/pull/3822))
- `Drilldown Item`: named slot `button` and `header` (experimental)
  ([#3822](https://github.com/porsche-design-system/porsche-design-system/pull/3822))
- `Drilldown Link`: (experimental) ([#3822](https://github.com/porsche-design-system/porsche-design-system/pull/3822))

### Changed

- **Breaking Change** `Flyout Multilevel`, `Flyout Multilevel Item`: renamed (experimental) component to `Drilldown` and
  `Drilldown Item` ([#3822](https://github.com/porsche-design-system/porsche-design-system/pull/3822))
- **Breaking Change** `Drilldown Item` doesn't style slotted `<a>` tags anymore, instead use `Drilldown Link` or a
  custom link ([#3822](https://github.com/porsche-design-system/porsche-design-system/pull/3822))

### Fixed

- `aria` prop now supports a colon inside a value, e.g. `aria="{ 'aria-label': 'Always remember: yes you can!' }"`
  ([#3680](https://github.com/porsche-design-system/porsche-design-system/pull/3680))

## [3.27.3] - 2025-03-21

## [3.27.2] - 2025-03-20

## [3.27.2-rc.0] - 2025-03-18

### Changed

- `Table`: add border-bottom styles to `Table Head` to support both, empty and missing `Table Body`
  ([#3788](https://github.com/porsche-design-system/porsche-design-system/pull/3788))

### Fixed

- `Styles`: change `Gradient` color values from `rgba` to `hsla` to fix Chrome rendering bug
  ([#3793](https://github.com/porsche-design-system/porsche-design-system/pull/3793))

## [3.27.1] - 2025-03-05

## [3.27.1-rc.0] - 2025-03-05

### Fixed

- `Carousel`: `auto` value of `slides-per-page` prop is breakpoint customizable
  ([#3783](https://github.com/porsche-design-system/porsche-design-system/pull/3783))
- `Select`, `Multi Select`, `Select Wrapper`: remove positioning with native anchor positioning due to a Chrome bug
  ([#3780](https://github.com/porsche-design-system/porsche-design-system/pull/3780))

## [3.27.0] - 2025-02-28

## [3.27.0-rc.6] - 2025-02-28

### Added

- `Table`: `compact` prop to enable a smaller, space-saving version for compact layouts
  ([#3758](https://github.com/porsche-design-system/porsche-design-system/pull/3758))
- `Table`: `layout` prop to render table with `table-layout: fixed` css for manual control of column widths
  ([#3758](https://github.com/porsche-design-system/porsche-design-system/pull/3758))
- `Carousel`: `align-controls` prop to align the controls slot to the left or center (overwrites auto-alignment)
  ([#3766](https://github.com/porsche-design-system/porsche-design-system/pull/3766))

### Changed

- `Select`, `Multi Select`, `Select Wrapper`:
  - gets rendered on `#top-layer` which enables it to be shown correctly even when used e.g. within a scroll container
    or overflow context ([#3754](https://github.com/porsche-design-system/porsche-design-system/pull/3754))
  - gets positioned by [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
    or [Floating UI](https://floating-ui.com) as fallback for browsers not supporting it yet
    ([#3754](https://github.com/porsche-design-system/porsche-design-system/pull/3754))
  - modernized visual appearance, dynamic max-height based on viewport and fade in animation of option list
    ([#3754](https://github.com/porsche-design-system/porsche-design-system/pull/3754))
- `Select`, `Select Wrapper`:
  - focus outline becomes default focus style when no filter is used
    ([#3754](https://github.com/porsche-design-system/porsche-design-system/pull/3754))
- `Carousel`: Center layout of Carousel on mobile view
  ([#3765](https://github.com/porsche-design-system/porsche-design-system/pull/3765))
- `Carousel`: `auto` value of `slides-per-page` prop is breakpoint customizable
  ([#3771](https://github.com/porsche-design-system/porsche-design-system/pull/3771))

## [3.27.0-rc.5] - 2025-02-20

### Fixed

- `AG Grid`: error on reload in next.js.
  ([#3759](https://github.com/porsche-design-system/porsche-design-system/pull/3759))

## [3.27.0-rc.4] - 2025-02-20

### Fixed

- `AG Grid`: not accessing cdn base url correctly.
  ([#3759](https://github.com/porsche-design-system/porsche-design-system/pull/3759))

## [3.27.0-rc.3] - 2025-02-18

### Fixed

- `AG Grid`: not resolving dependencies correctly.
  ([#3757](https://github.com/porsche-design-system/porsche-design-system/pull/3757))

## [3.27.0-rc.2] - 2025-02-18

### Fixed

- `AG Grid`: not resolving dependencies correctly.
  ([#3756](https://github.com/porsche-design-system/porsche-design-system/pull/3756))

## [3.27.0-rc.1] - 2025-02-17

### Changed

- **Breaking Change** `AG Grid`: Updated from v32 to v33, which introduced a new Theming API. AG Grid migrated from a
  CSS-based theming approach to a JavaScript object-based theming system. As a result, our custom theme also had to be
  adjusted accordingly. ([#3740](https://github.com/porsche-design-system/porsche-design-system/pull/3740))

### Fixed

- Styles: `vanilla-extract` returns `getMediaQueryMax`, `getMediaQueryMin`, `getMediaQueryMinMax` & `getSkeletonStyle`
  in wrong format ([#3753](https://github.com/porsche-design-system/porsche-design-system/pull/3753))

## [3.27.0-rc.0] - 2025-02-13

### Added

- `@font-face` supports Thai language
  ([#3750](https://github.com/porsche-design-system/porsche-design-system/pull/3750))
- Partials: `getFontLinks` supports preloading `thai` subset
  ([#3750](https://github.com/porsche-design-system/porsche-design-system/pull/3750))

### Changed

- `Popover`: gets rendered on `#top-layer` which enables it to be shown correctly even when used e.g. within a scroll
  container ([#3732](https://github.com/porsche-design-system/porsche-design-system/pull/3732))

#### Removed

- `Popover`: default styling for slotted anchors
  ([#3732](https://github.com/porsche-design-system/porsche-design-system/pull/3732))

## [3.26.0] - 2025-02-07

## [3.26.0-rc.0] - 2025-02-06

### Added

- `Switch`: `compact` prop to enable a smaller, space-saving version for compact layouts
  ([#3728](https://github.com/porsche-design-system/porsche-design-system/pull/3728))
- `Select`: `compact` prop to enable a smaller, space-saving version for compact layouts
  ([#3731](https://github.com/porsche-design-system/porsche-design-system/pull/3731))
- `Canvas`: named slot `sidebar-end-header`
  ([#3736](https://github.com/porsche-design-system/porsche-design-system/pull/3736))
- `Icon`: `4-wheel-drive`, `aggregation`, `arrow-compact-down`, `arrow-compact-left`, `arrow-compact-right`,
  `arrow-compact-up`, `arrows`, `battery-half`, `battery-one-quarter`, `battery-three-quarters`, `brain`, `cabriolet`,
  `charging-network`, `cloud`, `color-picker`, `compass`, `coupe`, `cut`, `door`, `drag`, `ear`, `error`,
  `exclamation-filled`, `fast-backward`, `fast-forward`, `file-csv`, `file-excel`, `flag`, `genuine-parts`,
  `geo-localization`, `grip`, `group`, `hand`, `highway-filled`, `history`, `laptop`, `limousine`, `linked`,
  `logo-apple-carplay`, `logo-apple-music`, `logo-kununu`, `logo-snapchat`, `microphone`, `news`, `north-arrow`,
  `online-search`, `paste`, `pivot`, `price-tag`, `qr-off`, `question-filled`, `radar`, `radio`, `return`, `road`,
  `seat`, `service-technician`, `skip-backward`, `skip-forward`, `stop`, `suv`, `theme`, `turismo`, `trigger-finger`,
  `unlinked` and `weather` ([#3737](https://github.com/porsche-design-system/porsche-design-system/pull/3737))

## [3.25.1] - 2025-01-23

## [3.25.1-rc.0] - 2025-01-23

### Fixed

- `Carousel`: throws error when object-like string is passed by `pagination`
  ([#3715](https://github.com/porsche-design-system/porsche-design-system/pull/3715))

## [3.25.0] - 2025-01-23

## [3.25.0-rc.1] - 2025-01-22

### Fixed

- `Carousel`: throws error when object-like string is passed by `slides-per-page`
  ([#3710](https://github.com/porsche-design-system/porsche-design-system/pull/3710))

## [3.25.0-rc.0] - 2025-01-21

### Added

- `Sheet` ([#3704](https://github.com/porsche-design-system/porsche-design-system/pull/3704))
- `Button`, `Button-Pure`: Add `form` prop to explicitly associate the component with a form, even when it's not
  directly nested within it. ([#3648](https://github.com/porsche-design-system/porsche-design-system/pull/3648))

### Changed

- `Table`: Enable `Table Head Cell` to be used within `Table Row` in addition to `Table Head Row` to further align with
  table structure defined by W3C ([#3701](https://github.com/porsche-design-system/porsche-design-system/pull/3701))

### Fixed

- `Textarea`, `Textarea Wrapper`, `Textfield Wrapper`: color contrast of `unit` prop and counter in `readonly` mode
  meets WCAG 2.2 AA standard ([#3693](https://github.com/porsche-design-system/porsche-design-system/pull/3693))

## [3.24.0] - 2025-01-08

## [3.24.0-rc.1] - 2025-01-08

## [3.24.0-rc.0] - 2025-01-07

### Added

- Styles: support for `vanilla-extract` available under
  `import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles/vanilla-extract';`
  ([#3666](https://github.com/porsche-design-system/porsche-design-system/pull/3666))

### Changed

- React: updated peer dependency to `>=19.0.0 <20.0.0`

## [3.23.0] - 2024-12-12

## [3.23.0-rc.0] - 2024-12-12

### Changed

- `Select`: Slotted image of selected option now visible in combobox
  ([#3651](https://github.com/porsche-design-system/porsche-design-system/pull/3651))

### Fixed

- `Flyout`: transition bug in Safari ([3674](https://github.com/porsche-design-system/porsche-design-system/pull/3674))
- `Styles`: dart sass deprecation warnings in `SCSS` variant
  ([3664](https://github.com/porsche-design-system/porsche-design-system/pull/3664))

## [3.22.1] - 2024-12-09

## [3.22.1-rc.0] - 2024-12-09

### Fixed

- `Flyout Multilevel`: Secondary scroll area not shown in iOS Safari (iPhone only)
  ([3663](https://github.com/porsche-design-system/porsche-design-system/pull/3663))

## [3.22.0] - 2024-12-06

## [3.22.0-rc.1] - 2024-12-06

### Added

- `Flyout Multilevel`: Supports infinite layers
  ([3647](https://github.com/porsche-design-system/porsche-design-system/pull/3647))

### Fixed

- Partials: error when using in projects without `react/jsx-runtime` as dependency
  ([#3660](https://github.com/porsche-design-system/porsche-design-system/pull/3660))
- `Textfield Wrapper`: text alignment of type `email` and `tel` values in RTL mode
  ([3655](https://github.com/porsche-design-system/porsche-design-system/pull/3655))
- `Popover`:
  - Rendering bug of drop-shadow in Safari 18.x
    ([3622](https://github.com/porsche-design-system/porsche-design-system/pull/3622))
  - Positioning in RTL mode if rendered inside a table (in #top-layer)
    ([3658](https://github.com/porsche-design-system/porsche-design-system/pull/3658))

## [3.22.0-rc.0] - 2024-11-19

### Added

- `Modal`, `Flyout`:
  - `aria-label` is generated from slotted header contents if `aria` prop is not provided
  - ARIA `role` to `aria` prop of `Modal` component to support setting `alertdialog` role
    ([3618](https://github.com/porsche-design-system/porsche-design-system/pull/3618))
- `Pin-Code`: Add `form` prop to explicitly associate the component with a form, even when it's not directly nested
  within it. ([#3588](https://github.com/porsche-design-system/porsche-design-system/pull/3588))
- `Segmented-Control`: Use ElementInternals API and add `form` prop to explicitly associate the component with a form,
  even when it's not directly nested within it.
  ([#3614](https://github.com/porsche-design-system/porsche-design-system/pull/3614))

### Changed

- Angular: updated peer dependency to `>=19.0.0 <20.0.0`
- `Pin-Code`:
  - Remove native input and use ElementInternals API
  - **Breaking Change**: `Pin-Code` component no longer support native validation due to the removal of the underlying
    native `<input>` element. ([#3588](https://github.com/porsche-design-system/porsche-design-system/pull/3588))
- `Styles`: `SCSS` variant uses `@forward/@use` internally to replace deprecated `@import`
  ([#3623](https://github.com/porsche-design-system/porsche-design-system/pull/3623))

### Fixed

- Partials: removed bundled `react/jsx-runtime` due to React 18/19 incompatibilities. When using `jsx` in the `format`
  option, it is necessary to have `react/jsx-runtime` as a dependency in the project included.
  ([#3613](https://github.com/porsche-design-system/porsche-design-system/pull/3613))
- `Select`, `Multi-Select`: Ensure that dynamically changing the `disabled` property via `optgroups` persists the
  `disabled` state for individual options within the group.
  ([#3614](https://github.com/porsche-design-system/porsche-design-system/pull/3614))

## [3.21.0] - 2024-11-12

## [3.21.0-rc.0] - 2024-11-11

### Added

- `Flyout`: Prop `footerBehavior` to always make footer fixed
  ([3590](https://github.com/porsche-design-system/porsche-design-system/pull/3590))
- `Checkbox`, `Textarea`: `formDisabledCallback` and `formStateRestoreCallback` from ElementInternals API and sync
  validity with form element. ([#3528](https://github.com/porsche-design-system/porsche-design-system/pull/3528))
- `Link`, `Link Pure`, `Link Tile`: `aria-haspopup` is now supported for `aria` prop
  ([#3589](https://github.com/porsche-design-system/porsche-design-system/pull/3589))
- `Button`, `Link`: `compact` prop is breakpoint customizable
  ([#3580](https://github.com/porsche-design-system/porsche-design-system/pull/3580))
- `Select`, `Multi-Select`: Add `form` prop to explicitly associate these components with a specific form when they are
  not directly nested within it. ([#3542](https://github.com/porsche-design-system/porsche-design-system/pull/3542))

### Changed

- `Select`, `Multi-Select`:
  - Remove native select and use ElementInternals API
    ([#3542](https://github.com/porsche-design-system/porsche-design-system/pull/3542))
  - **Breaking Change**: `Select` and `Multi-Select` components no longer support native validation due to the removal
    of the underlying native `<select>` element.

### Fixed

- `Flyout`: overlapping of scrollbar in iOS/iPadOS Safari when sticky header/footer is used
  ([#3607](https://github.com/porsche-design-system/porsche-design-system/pull/3607))
- `Carousel`: dynamic change in `slidesPerPages` when using `focusOnCenterSlide` prop breaks pagination
  ([#3592](https://github.com/porsche-design-system/porsche-design-system/pull/3592))
- `Flyout`, `Modal`:
  - transition not working correctly when using conditionally rendered content
    ([#3590](https://github.com/porsche-design-system/porsche-design-system/pull/3590))
  - dismiss button not sticky in case header slot is not present
    ([#3574](https://github.com/porsche-design-system/porsche-design-system/pull/3574))
  - dismiss button overlaps content area
    ([#3574](https://github.com/porsche-design-system/porsche-design-system/pull/3574))
- `jsdom-polyfill`: errors from included polyfill packages
  ([3543](https://github.com/porsche-design-system/porsche-design-system/pull/3543))
- React: global `hidden` attribute with value `false` not working
  ([#3555](https://github.com/porsche-design-system/porsche-design-system/pull/3555))

## [3.20.0] - 2024-10-24

## [3.20.0-rc.1] - 2024-10-24

### Added

- React: better tree-shaking for `@porsche-design-system/components-react`
  ([#3554](https://github.com/porsche-design-system/porsche-design-system/pull/3554))
- `Icon`: `sidebar` ([#3556](https://github.com/porsche-design-system/porsche-design-system/pull/3556))

### Changed

- `Canvas`: Improve UI and UX behaviour in Safari
  ([#3556](https://github.com/porsche-design-system/porsche-design-system/pull/3556))

### Fixed

- `Flyout`: transition animation in Chrome Browser if `Flyout` has scrollable content
  ([#3550](https://github.com/porsche-design-system/porsche-design-system/pull/3550))

## [3.20.0-rc.0] - 2024-10-18

### Added

- `Icon`: `attachment`, `dislike`, `dislike-filled`, `like`, `like-filled`, `new-chat`
  ([#3515](https://github.com/porsche-design-system/porsche-design-system/pull/3515))

### Changed

- `Canvas`: Improve UI and UX behaviour
  ([#3515](https://github.com/porsche-design-system/porsche-design-system/pull/3515))
- `Flyout`, `Modal`: Removed default styling for slotted anchors
  ([#3515](https://github.com/porsche-design-system/porsche-design-system/pull/3515))

## [3.19.0] - 2024-10-14

## [3.19.0-rc.4] - 2024-10-14

### Added

- `AG Grid`: custom theme ([#3517](https://github.com/porsche-design-system/porsche-design-system/pull/3517))
- `Checkbox`: Added a `compact` prop to enable a smaller, space-saving version of the checkbox for compact layouts.
  ([#3504](https://github.com/porsche-design-system/porsche-design-system/pull/3504))
- `Text`, `Display`, `Heading` and `Headline`: introduce new option `inherit` to prop `align`
  ([#3520](https://github.com/porsche-design-system/porsche-design-system/pull/3520))

### Fixed

- `Pin Code`, `Select Wrapper`: programmatic focus
  ([#3527](https://github.com/porsche-design-system/porsche-design-system/pull/3527))
- `Select Wrapper`: native option dropdown has wrong colors in theme dark
  ([#3523](https://github.com/porsche-design-system/porsche-design-system/pull/3523))
- `Switch`: width/height calculation of the toggle element supports browser based text only zoom
  ([#3542](https://github.com/porsche-design-system/porsche-design-system/pull/3542))
- Angular, React, Vue: missing `@deprecated` annotations for deprecated components
  ([#3525](https://github.com/porsche-design-system/porsche-design-system/pull/3525))
- Partials: Replace meta tag `apple-mobile-web-app-capable` with `mobile-web-app-capable` in `getMetaTagsAndIconLinks`
  partial. ([#3519](https://github.com/porsche-design-system/porsche-design-system/pull/3519))

## [3.19.0-rc.3] - 2024-10-02

### Fixed

- `Carousel`: remove gradient styles for carousel if `gradientColor` is not defined
  ([#3518](https://github.com/porsche-design-system/porsche-design-system/pull/3518))

## [3.19.0-rc.2] - 2024-10-01

### Added

- `Carousel`: introduce `trimSpace` prop
  ([#3496](https://github.com/porsche-design-system/porsche-design-system/pull/3496))
- `Checkbox`: ([#3498](https://github.com/porsche-design-system/porsche-design-system/pull/3498))

### Fixed

- `Checkbox Wrapper`, `Radio Button Wrapper`: rendering of `checked` state in Blink based Browsers when component is
  rendered in high contrast mode ([#3488](https://github.com/porsche-design-system/porsche-design-system/pull/3488))

## [3.19.0-rc.1] - 2024-09-06

### Changed

- `Canvas`: Improve UX ([#3494](https://github.com/porsche-design-system/porsche-design-system/pull/3494))

## [3.19.0-rc.0] - 2024-09-03

### Added

- `componentsReady()`: Introduce optional `readyState` parameter
  ([#3460](https://github.com/porsche-design-system/porsche-design-system/pull/3460))
- `Carousel`: introduce `focusOnCenterSlide` & `gradientColor` props
  ([#3488](https://github.com/porsche-design-system/porsche-design-system/pull/3488))

### Changed

- `Text Field Wrapper`: width calculation of counter and unit element are now CSS based in relation to the number of
  characters ([#3472](https://github.com/porsche-design-system/porsche-design-system/pull/3472))

### Fixed

- `jsdom-polyfill`: errors from included polyfill packages
  ([3481](https://github.com/porsche-design-system/porsche-design-system/pull/3481))

## [3.18.0] - 2024-08-21

## [3.18.0-rc.0] - 2024-08-21

### Added

- `Button Tile`, `Link Tile`, `Link Tile Model Signature`: supports `<video/>` (the tile components automatically check
  for OS reduced motion setting to decide weather the video autoplay should be prevented or not to improve accessibility
  & UX) ([#3454](https://github.com/porsche-design-system/porsche-design-system/pull/3454))
- Extend deprecation console warnings by reference to causing DOM element
  ([#3439](https://github.com/porsche-design-system/porsche-design-system/pull/3439))
- `Textarea`: ([#3443](https://github.com/porsche-design-system/porsche-design-system/pull/3443))

### Changed

- Partials: `getInitialStyles` uses CSS `:defined` to determine the visibility of web components, as well as
  `[data-ssr]` attribute instead of `.ssr` class for Next JS and Remix
  ([#3466](https://github.com/porsche-design-system/porsche-design-system/pull/3466))
- Components: Use `:defined` & `[data-ssr]` to handle visibility of nested elements within Shadow DOM
  ([#3470](https://github.com/porsche-design-system/porsche-design-system/pull/3470))
- `Button`, `Link`: spacings adjusted for `compact` mode
- `Banner`, `Flyout`, `Inline Notification`, `Modal`, `Scroller`, `Toast`: button style
  ([#3435](https://github.com/porsche-design-system/porsche-design-system/pull/3435))
- `Select`: added `display: block` to host in order to be consistent with other form components
  ([#3462](https://github.com/porsche-design-system/porsche-design-system/pull/3462))

### Fixed

- `Select`, `Multi-Select`: programmatic focus
  ([#3462](https://github.com/porsche-design-system/porsche-design-system/pull/3462))
- `Button Tile`, `Link Tile`, `Link Tile Model Signature`: correct image position if custom css `position: absolute` is
  used on media element ([#3446](https://github.com/porsche-design-system/porsche-design-system/pull/3446))
- `Button`, `Link`: Safari rendering issue of `backdrop-filter` on border in variant `ghost`
  ([#3435](https://github.com/porsche-design-system/porsche-design-system/pull/3435))
- `Select`, `Select Wrapper`, `Multi Select`, `Textfield Wrapper`: `text-overflow` has now ellipsis behaviour and
  `min-width` is added to prevent text overlapping
  ([#3465](https://github.com/porsche-design-system/porsche-design-system/pull/3465))

## [3.17.0] - 2024-08-01

## [3.17.0-rc.2] - 2024-08-01

### Fixed

- `Optgoup`: hydration error in Next.js SSR context
  ([#3432](https://github.com/porsche-design-system/porsche-design-system/pull/3432))
- `Select`: ensure slotted image width
  ([#3432](https://github.com/porsche-design-system/porsche-design-system/pull/3432))

## [3.17.0-rc.1] - 2024-07-31

### Added

- `Button`, `Link`:
  - Prop `variant` extended by value `ghost`
    ([#3423](https://github.com/porsche-design-system/porsche-design-system/pull/3423))
  - Prop `compact` ([#3423](https://github.com/porsche-design-system/porsche-design-system/pull/3423))

### Fixed

- `Tabs Bar`: fixed tabindex issue when `Tabs Bar` is rendered with the `Scroller` component
  ([#3421](https://github.com/porsche-design-system/porsche-design-system/pull/3421))

## [3.17.0-rc.0] - 2024-07-29

### Added

- `Link Tile`, `Link Tile Model Signature`, `Button Tile`:
  - Named slot `header` ([#3419](https://github.com/porsche-design-system/porsche-design-system/pull/3419))
- `Link Tile`, `Button Tile`: Prop `size` extended by value `large`
  ([#3419](https://github.com/porsche-design-system/porsche-design-system/pull/3419))
- `Tag`:
  - Prop `compact` ([#3411](https://github.com/porsche-design-system/porsche-design-system/pull/3411))
  - Prop `color` extended by value `background-frosted`
    ([#3411](https://github.com/porsche-design-system/porsche-design-system/pull/3411))
- Styles: `theme{Light|Dark}BackgroundFrosted` and `$pds-theme-{light|dark}-background-frosted` color
  ([#3409](https://github.com/porsche-design-system/porsche-design-system/pull/3409))
- `Optgroup`: Usable in combination with `Select` and `Multi Select`
  ([#3410](https://github.com/porsche-design-system/porsche-design-system/pull/3410))
- `Flyout`, `Modal`: Add custom events `motionVisibleEnd` and `motionHiddenEnd` to notify when opening and closing
  transitions are complete ([#3418](https://github.com/porsche-design-system/porsche-design-system/pull/3418))

### Changed

- `Link Tile`, `Link Tile Model Signature`, `Button Tile`:
  - Layout behaviour is able to break out of its aspect ratio in case content overflows to be a11y compliant and/or to
    improve visual alignment in CSS Grid context
    ([#3419](https://github.com/porsche-design-system/porsche-design-system/pull/3419))
  - Values `1:1 | 4:3 | 3:4 | 16:9 | 9:16` of prop `aspect-ratio` are deprecated and mapped to new values
    `1/1 | 4/3 | 3/4 | 16/9 | 9/16` to be aligned with CSS spec
    ([#3419](https://github.com/porsche-design-system/porsche-design-system/pull/3419))

```diff
- <p-link-tile aspect-ratio="1:1 | 4:3 | 3:4 | 16:9 | 9:16"></p-link-tile>
+ <p-link-tile aspect-ratio="1/1 | 4/3 | 3/4 | 16/9 | 9/16"></p-link-tile>

- <p-button-tile aspect-ratio="1:1 | 4:3 | 3:4 | 16:9 | 9:16"></p-button-tile>
+ <p-button-tile aspect-ratio="1/1 | 4/3 | 3/4 | 16/9 | 9/16"></p-button-tile>

- <p-link-tile-model-signature aspect-ratio="1:1 | 4:3 | 3:4 | 16:9 | 9:16"></p-link-tile-model-signature>
+ <p-link-tile-model-signature aspect-ratio="1/1 | 4/3 | 3/4 | 16/9 | 9/16"></p-link-tile-model-signature>
```

- `Link Tile`, `Button Tile`: Value `default` of prop `size` is deprecated and mapped to new value `medium` to be in
  sync with typography sizing definition
  ([#3419](https://github.com/porsche-design-system/porsche-design-system/pull/3419))

```diff
- <p-link-tile size="default"></p-link-tile>
+ <p-link-tile size="medium"></p-link-tile>

- <p-button-tile size="default"></p-button-tile>
+ <p-button-tile size="medium"></p-button-tile>
```

- `Icon`: All icons are up-to-date with the One UI look
- Shorten asset filenames
- `Carousel`: Slides and `controls` slot are centered if `alignHeader` prop is set to `center` and amount of slides is
  less than `slidesPerPage` ([#3372](https://github.com/porsche-design-system/porsche-design-system/pull/3372))

### Fixed

- `Link Pure`: Broken with `alignLabel="start"`, hidden label & nested anchor
  ([#3379](https://github.com/porsche-design-system/porsche-design-system/pull/3379))
- `Textfield Wrapper`, `Textarea Wrapper`: Conditionally rendered component throws
  `TypeError: Cannot read properties of undefined (reading 'type')`
  ([#3383](https://github.com/porsche-design-system/porsche-design-system/pull/3383))
- `Link Tile`: Broken word-break & hyphens Safari
  ([#3397](https://github.com/porsche-design-system/porsche-design-system/pull/3397))
- `Select Wrapper`: `optgroup` styling and behavior
  ([#3410](https://github.com/porsche-design-system/porsche-design-system/pull/3410))

## [3.16.0] - 2024-07-02

## [3.16.0-rc.2] - 2024-07-02

### Added

- Partials: Added default `og:image` and related meta tags to the `getMetaTagsAndIconLinks` partial. Can be disabled by
  setting the `ogImage` option to `false`.
  ([#3357](https://github.com/porsche-design-system/porsche-design-system/pull/3357))

### Changed

- `Flyout Navigation`, `Flyout Navigation Item`: Renamed (experimental) component to `Flyout Multilevel` and
  `Flyout Multilevel Item` ([#3351](https://github.com/porsche-design-system/porsche-design-system/pull/3351))
- `Toast`: Renders fully on `#top-layer`, stacking behaviour has changed and follows W3C standards now, see
  https://developer.mozilla.org/en-US/docs/Glossary/Top_layer and
  https://developer.chrome.com/blog/what-is-the-top-layer
  ([#3356](https://github.com/porsche-design-system/porsche-design-system/pull/3356))

```diff
- <p-flyout-navigation><p-flyout-navigation-item></p-flyout-navigation-item></p-flyout-navigation>
+ <p-flyout-multilevel><p-flyout-multilevel-item></p-flyout-multilevel-item></p-flyout-multilevel>
```

### Fixed

- Types: `@porsche-design-system/components-vue` typings are not exposed
  ([#3355](https://github.com/porsche-design-system/porsche-design-system/pull/3355))

## [3.16.0-rc.1] - 2024-06-18

### Added

- `jsdom-polyfill` Added polyfills for `Popover API` and `ResizeObserver`
  ([#3334](https://github.com/porsche-design-system/porsche-design-system/pull/3334))
- `Segmented Control`: Prop `aria` added to `Segmented Control Item` to support ARIA attributes
  ([#3327](https://github.com/porsche-design-system/porsche-design-system/pull/3327))

### Changed

- Angular: updated peer dependency to `>=17.0.0 <19.0.0`
  ([#3346](https://github.com/porsche-design-system/porsche-design-system/pull/3346))
- React: Improve prop typings for all wrappers of `@porsche-design-system/components-react`
  ([#3336](https://github.com/porsche-design-system/porsche-design-system/pull/3336))

## [3.16.0-rc.0] - 2024-06-05

### Added

- `Flyout`:
  - CSS variable `--p-flyout-sticky-top` (experimental)
    ([#3191](https://github.com/porsche-design-system/porsche-design-system/pull/3191))
  - Prop `disableBackdropClick` ([#3191](https://github.com/porsche-design-system/porsche-design-system/pull/3191))
- `Modal`:
  - CSS variable `--p-modal-width` (experimental)
    ([#3191](https://github.com/porsche-design-system/porsche-design-system/pull/3191))
  - Named slot `header` ([#3191](https://github.com/porsche-design-system/porsche-design-system/pull/3191))

### Changed

- `Modal`, `Flyout`:
  - Sticky dismiss button ([#3191](https://github.com/porsche-design-system/porsche-design-system/pull/3191))
  - Aligned layout, spacing and UX behaviour
    ([#3191](https://github.com/porsche-design-system/porsche-design-system/pull/3191))
  - Renders fully on `#top-layer`, stacking behaviour has changed and follows W3C standards now, see
    https://developer.mozilla.org/en-US/docs/Glossary/Top_layer and
    https://developer.chrome.com/blog/what-is-the-top-layer
    ([#3191](https://github.com/porsche-design-system/porsche-design-system/pull/3191))
- `Modal`: `heading` prop and `slot="heading"` are deprecated. Use `slot="header"` instead.

### Fixed

- Types: Fixed incorrectly allowed type `string` in types `BreakpointCustomizable`, `SelectedAriaAttributes`,
  `CarouselInternationalization`, `PaginationInternationalization` and `ScrollToPosition`
- `Modal`, `Flyout`: Dynamically react to adding/removing named slots
  ([#3191](https://github.com/porsche-design-system/porsche-design-system/pull/3191))
- `Modal`: Uses native `<dialog />` element to resolve focus issues, focus trap
  ([#3191](https://github.com/porsche-design-system/porsche-design-system/pull/3191))

## [3.15.2] - 2024-05-29

### Fixed

- `aria`: Refactor `parseJSONAttribute` to support Safari < 16.4  
  ([#3314](https://github.com/porsche-design-system/porsche-design-system/pull/3314))

## [3.15.1] - 2024-05-23

### Fixed

- `Banner`: Fixed position on mobile ([#3307](https://github.com/porsche-design-system/porsche-design-system/pull/3307))

## [3.15.0] - 2024-05-16

## [3.15.0-rc.5] - 2024-05-16

### Added

- `Button Pure`: Prop `underline` to show an underline for the label
  ([#3212](https://github.com/porsche-design-system/porsche-design-system/pull/3212))
- Partials: Added new option `globalStyles` to `getInitialStyles` to disable global reset styles.  
  ([#3213](https://github.com/porsche-design-system/porsche-design-system/pull/3213))

### Changed

- `Banner`: Refactor Banner to use native `popover`
  ([#3196](https://github.com/porsche-design-system/porsche-design-system/pull/3196))
- Partials: `getInitialStyles` only contain hydration visibility and global styles. All other styles are handled by
  constructable stylesheets at component level.
  ([#3213](https://github.com/porsche-design-system/porsche-design-system/pull/3213))
- `Table`: Removed slotted image style `verticalAlign: 'middle'` from initialStyles
  ([#3213](https://github.com/porsche-design-system/porsche-design-system/pull/3213))
- `Tabs Bar`: Removed sibling tabpanel focus style from initialStyles
  ([#3213](https://github.com/porsche-design-system/porsche-design-system/pull/3213))

### Fixed

- `Carousel`: Accessible name of carousel region wrapper
  ([#3220](https://github.com/porsche-design-system/porsche-design-system/pull/3220))
- `aria` property now supports escaped single quotes inside JSON strings, e.g.
  `aria="{ 'aria-label': 'You can\'t do that? yes you can!' }"`
  ([#3217](https://github.com/porsche-design-system/porsche-design-system/pull/3217))

## [3.15.0-rc.4] - 2024-05-06

### Added

- Partials: Added new partial `getFontFaceStyles` which returns an inline style containing all font-face definitions.  
  ([#3188](https://github.com/porsche-design-system/porsche-design-system/pull/3188))

### Changed

- Partials: Partial `getFontFaceStylesheet` is deprecated and will be removed with the next major release. Use the
  `getFontFaceStyles` partial instead, which directly returns a `<style>` tag containing all font-face definitions and
  can be used in the same way. ([#3188](https://github.com/porsche-design-system/porsche-design-system/pull/3188))

```diff
- getFontFaceStylesheet()
+ getFontFaceStyles()
```

## [3.15.0-rc.3] - 2024-04-23

### Fixed

- `Pin Code`: Fixed several problems with IME keyboards
  ([#3197](https://github.com/porsche-design-system/porsche-design-system/pull/3197))

## [3.15.0-rc.2] - 2024-04-22

### Added

- `Accordion`: Add experimental property `sticky` for a fixed heading
  ([#3181](https://github.com/porsche-design-system/porsche-design-system/pull/3181))
- `Inline Notification`, `Banner`: heading hierarchy can now be customized with `headingTag` prop
  ([#3168](https://github.com/porsche-design-system/porsche-design-system/pull/3168))

### Changed

- `Accordion`: `tag` property is deprecated. Use `headingTag` property instead to specify heading hierarchy level.
  ([#3168](https://github.com/porsche-design-system/porsche-design-system/pull/3168))

```diff
- <p-accordion tag="h3"></p-accordion>
+ <p-accordion heading-tag="h3"></p-accordion>
```

### Fixed

- `Pin Code`: Input is entered twice in iOS
  ([#3192](https://github.com/porsche-design-system/porsche-design-system/pull/3192))

## [3.15.0-rc.1] - 2024-04-17

### Added

- Partials: `getMetaTagsAndIconLinks`, `getComponentChunkLinks`, `getIconLinks` and `getFontLinks` support new format
  option `js` ([#3179](https://github.com/porsche-design-system/porsche-design-system/pull/3179))

## [3.15.0-rc.0] - 2024-04-05

### Changed

- `Model Signature`: Enabling the use of hex colors, CSS gradients, CSS image and video masks. In addition, the size was
  slightly adjusted. ([#3153](https://github.com/porsche-design-system/porsche-design-system/pull/3153))

### Fixed

- `Modal`: Missing box-shadow on sticky footer when slotted content changes
  ([#3154](https://github.com/porsche-design-system/porsche-design-system/pull/3154))
- `Select`: Hydration error in Next.js when using slotted `img`
  ([#3162](https://github.com/porsche-design-system/porsche-design-system/pull/3162))
- `Text Field Wrapper`, `Textarea Wrapper`: Dynamic changes of `showCounter` and `maxLength` are reflected. The counter
  element dynamically adjusts to changes in the input value accurately.
  ([#3084](https://github.com/porsche-design-system/porsche-design-system/pull/3084))

## [3.14.0] - 2024-03-25

## [3.14.0-rc.0] - 2024-03-25

### Added

- `Icon`: `battery-empty-fuel` ([#3148](https://github.com/porsche-design-system/porsche-design-system/pull/3148))

### Changed

- `Icon`: `battery-empty-co2` and `co2-class`
  ([#3148](https://github.com/porsche-design-system/porsche-design-system/pull/3148))
- Angular: updated peer dependency to `>=17.0.0 <18.0.0`
  ([#3125](https://github.com/porsche-design-system/porsche-design-system/pull/3125))
- React: updated peer dependency to `>=18.0.0 <19.0.0`
  ([#3125](https://github.com/porsche-design-system/porsche-design-system/pull/3125))

## [3.13.1] - 2024-03-20

### Fixed

- `Modal`: Unexpected scrolling behavior on iOS >= 17.4
  ([#3128](https://github.com/porsche-design-system/porsche-design-system/pull/3128))
- `Select`, `Multi-Select`: Cropping issues of select dropdown when used inside `Table` component
  ([#3114](https://github.com/porsche-design-system/porsche-design-system/pull/3114))
- `Flyout`, `Flyout Navigation`: iOS Safari URL bar overlaying
  ([#3131](https://github.com/porsche-design-system/porsche-design-system/pull/3131))

## [3.13.0] - 2024-03-11

## [3.13.0-rc.2] - 2024-03-11

### Added

- `Icon`: `battery-empty-co2` and `co2-class`
  ([#3103](https://github.com/porsche-design-system/porsche-design-system/pull/3103))

## [3.13.0-rc.1] - 2024-03-08

### Added

- `Select` ([#3008](https://github.com/porsche-design-system/porsche-design-system/pull/3008))
- `Modal`: Prop `backdrop` ([#3082](https://github.com/porsche-design-system/porsche-design-system/pull/3082))
- `Modal`: CSS variables `--p-modal-spacing-top` and `--p-modal-spacing-bottom`
  ([#3082](https://github.com/porsche-design-system/porsche-design-system/pull/3082))

### Fixed

- `Flyout`: Refactor Flyout to use native Dialog element to resolve focus issues
  ([#2998](https://github.com/porsche-design-system/porsche-design-system/pull/2998))
- `Accordion`: Fix overflow scrollbar issues
  ([#3042](https://github.com/porsche-design-system/porsche-design-system/pull/3042))
- `Carousel`: Skip link is visible when it receives keyboard focus
  ([#3055](https://github.com/porsche-design-system/porsche-design-system/pull/3055))
- Placeholder color of `Text Field Wrapper` for `input type="date"` and `input type="time"` in Safari and alignment in
  Mobile Safari ([#3068](https://github.com/porsche-design-system/porsche-design-system/pull/3068))
- Counter overlap with long initial value in `Text Field Wrapper` for `input type="text"` with `maxlength`
  ([#3079](https://github.com/porsche-design-system/porsche-design-system/pull/3079))

### Changed

- Updated favicons output via `getMetaTagsAndIconLinks()` partial
  ([#3081](https://github.com/porsche-design-system/porsche-design-system/pull/3081))

## [3.13.0-rc.0] - 2024-02-19

### Added

- `Link Tile Product`: Prop `price-original` to be able to visualize sale and original price
  ([#3040](https://github.com/porsche-design-system/porsche-design-system/pull/3040))

### Changed

- Validation of `getInitialStyles()` partial is temporarily disabled
  ([#3049](https://github.com/porsche-design-system/porsche-design-system/pull/3049))

## [3.12.0] - 2024-02-12

## [3.12.0-rc.1] - 2024-02-08

### Fixed

- `Checkbox Wrapper`, `Radio Button Wrapper`: Safari visually reflects input status (checked/unchecked) when used in
  another Shadow DOM or changed programmatically
  ([#3028](https://github.com/porsche-design-system/porsche-design-system/pull/3028))

## [3.12.0-rc.0] - 2024-02-05

### Added

- `Icon`: `logo-x`, `bookmark-filled` and `star-filled`
  ([#3025](https://github.com/porsche-design-system/porsche-design-system/pull/3025))

### Changed

- `Icon`: Visual appearance of `information-filled`, `information`, `success-filled`, `success`, `bookmark`, `compare`,
  `configurate`, `heart-filled`, `heart`, `menu-lines`, `success`, `search`, `locate`, `star`, `shopping-bag-filled`,
  `shopping-bag`, `user-filled` and `user`
  ([#3025](https://github.com/porsche-design-system/porsche-design-system/pull/3025))
- All components (expect some form elements) have improved focus styling based on `:focus-visible`
  ([#3011](https://github.com/porsche-design-system/porsche-design-system/pull/3011))
- Several components are using CSS property `inset|inset-inline|inset-block` instead of `top|bottom|left|right` for
  better RTL (right-to-left) support ([#3011](https://github.com/porsche-design-system/porsche-design-system/pull/3011))
- `Switch`: Improve RTL (right-to-left) mode
  ([#3011](https://github.com/porsche-design-system/porsche-design-system/pull/3011))
- `Button`, `Button Pure`, `Switch`, `Checkbox Wrapper`, `Radio Button Wrapper`, `Pin Code`: optimized announcement of
  loading state for assistive technologies
  ([#3009](https://github.com/porsche-design-system/porsche-design-system/pull/3009))

### Fixed

- All components are supporting focus style in High Contrast Mode correctly
  ([#3011](https://github.com/porsche-design-system/porsche-design-system/pull/3011))

## [3.11.0] - 2024-01-30

## [3.11.0-rc.0] - 2024-01-30

### Fixed

- `Carousel`: Carousel does not work with single pointer event on smaller touch devices
  ([#3003](https://github.com/porsche-design-system/porsche-design-system/pull/3003))
- `Carousel`: `Each child in a list should have a unique "key" prop` warning in Next.js SSR context
  ([#3001](https://github.com/porsche-design-system/porsche-design-system/pull/3001))

### Changed

- Scroll-lock used in `Flyout`, `Flyout Navigation` and `Modal` is based on `body { overflow: hidden; }` for all devices
  ([#3013](https://github.com/porsche-design-system/porsche-design-system/pull/3013))
- `Toast`: Alignment reflects RTL (right-to-left) mode
  ([#3010](https://github.com/porsche-design-system/porsche-design-system/pull/3010))
- `Carousel`: Pagination can be used for navigation & pagination has more spacing on touch devices
  ([#3003](https://github.com/porsche-design-system/porsche-design-system/pull/3003))

## [3.10.0] - 2024-01-17

## [3.10.0-rc.5] - 2024-01-16

### Changed

- `visibility` css property can be overridden on all components, e.g. to make use of `visibility: hidden;`  
  ([#2988](https://github.com/porsche-design-system/porsche-design-system/pull/2988))
- `Carousel`: Named slot `header` renamed to `controls`
  ([#2992](https://github.com/porsche-design-system/porsche-design-system/pull/2992))

## [3.10.0-rc.4] - 2024-01-15

### Added

- `Icon`: Auto-flipping icons (certain ones only) in RTL (right-to-left) mode
  ([#2957](https://github.com/porsche-design-system/porsche-design-system/pull/2957))
- `Carousel`: Prop `heading-size`, named slot `header`
  ([#2915](https://github.com/porsche-design-system/porsche-design-system/pull/2915))
- `Accordion`: support for custom click area for `compact` variant
  ([#2920](https://github.com/porsche-design-system/porsche-design-system/pull/2920))
- `@font-face` supports Middle East languages
  ([#2946](https://github.com/porsche-design-system/porsche-design-system/pull/2946))
- Partials: `getFontLinks` supports preloading `arabic`, `pashto` and `urdu` subsets
  ([#2946](https://github.com/porsche-design-system/porsche-design-system/pull/2946))

### Changed

- `Flyout Navigation`: Improved validation and `activeIdentifier` isn't automatically updated anymore
  ([#2935](https://github.com/porsche-design-system/porsche-design-system/pull/2935))
- `Carousel`: Position and width of heading and description
  ([#2915](https://github.com/porsche-design-system/porsche-design-system/pull/2915))
- `Model Signature` asset for `model="macan"`
- Aligned naming of all `CustomEvent<T>` types and deprecated old ones since they are in fact typing the `detail: T`
  property of the event

```diff
- AccordionUpdateEvent
+ AccordionUpdateEventDetail
- CarouselUpdateEvent
+ CarouselUpdateEventDetail
- FlyoutNavigationUpdateEvent
+ FlyoutNavigationUpdateEventDetail
- LinkTileProductLikeEvent
+ LinkTileProductLikeEventDetail
- MultiSelectUpdateEvent
+ MultiSelectUpdateEventDetail
- PaginationUpdateEvent
+ PaginationUpdateEventDetail
- PinCodeUpdateEvent
+ PinCodeUpdateEventDetail
- SegmentedControlUpdateEvent
+ SegmentedControlUpdateEventDetail
- StepperHorizontalUpdateEvent
+ StepperHorizontalUpdateEventDetail
- SwitchUpdateEvent
+ SwitchUpdateEventDetail
- TableUpdateEvent
+ TableUpdateEventDetail
- TabsUpdateEvent
+ TabsUpdateEventDetail
- TabsBarUpdateEvent
+ TabsBarUpdateEventDetail
```

### Fixed

- `Pin Code`: Focus correct input when clicking on label
  ([#2985](https://github.com/porsche-design-system/porsche-design-system/pull/2985))
- `Flyout Navigation`: Focus dismiss button after opening
  ([#2935](https://github.com/porsche-design-system/porsche-design-system/pull/2935))
- `Accordion`: Alignment of slotted heading with custom padding
  ([#2920](https://github.com/porsche-design-system/porsche-design-system/pull/2920))
- `Modal`: Scrollbar is hidden ([#2907](https://github.com/porsche-design-system/porsche-design-system/pull/2907))
- `Toast`: `max-width` when used in scale mode
  ([#2960](https://github.com/porsche-design-system/porsche-design-system/pull/2960))

## [3.10.0-rc.3] - 2023-12-12

## [3.10.0-rc.2] - 2023-12-12

## [3.10.0-rc.1] - 2023-12-11

### Added

- **[EXPERIMENTAL]** `Link Tile Product`
  ([#2909](https://github.com/porsche-design-system/porsche-design-system/pull/2909))

### Fixed

- `Wordmark`, `Crest` and `Marque`: custom clickable area
  ([#2930](https://github.com/porsche-design-system/porsche-design-system/pull/2930))

## [3.10.0-rc.0] - 2023-12-07

### Added

- **[EXPERIMENTAL]** `Flyout Navigation`
  ([#2906](https://github.com/porsche-design-system/porsche-design-system/pull/2906))
- Prop `submit-button` to show/hide a submit button for `Text Field Wrapper` `type="search"` if wrapped inside a form
  ([#2908](https://github.com/porsche-design-system/porsche-design-system/pull/2908))

### Changed

- `Accordion`: removed `border-bottom` if used standalone
  ([#2911](https://github.com/porsche-design-system/porsche-design-system/pull/2911))
- `display` css property can be overridden on all components, e.g. to make use of `display: none;` within media
  queries  
  ([#2913](https://github.com/porsche-design-system/porsche-design-system/pull/2913))
- `Pagination`: Prop `maxNumberOfPageLinks` is deprecated and has no effect anymore, instead there is responsive
  behavior out of the box with full SSR support
  ([#2898](https://github.com/porsche-design-system/porsche-design-system/pull/2898))

## [3.9.0] - 2023-11-24

## [3.9.0-rc.0] - 2023-11-23

### Added

- Angular: `theme: 'light' | 'dark' | 'auto'` option to `PorscheDesignSystemModule.load()` to set `theme` on all child
  components  
  ([#2872](https://github.com/porsche-design-system/porsche-design-system/pull/2872))
- React: `theme: 'light' | 'dark' | 'auto'` prop to `PorscheDesignSystemProvider` to set `theme` on all child
  components  
  ([#2872](https://github.com/porsche-design-system/porsche-design-system/pull/2872))
- Vue: `theme: 'light' | 'dark' | 'auto'` prop to `PorscheDesignSystemProvider` to set `theme` on all child components  
  ([#2872](https://github.com/porsche-design-system/porsche-design-system/pull/2872))
- Validation for usage of different PDS versions
  ([#2867](https://github.com/porsche-design-system/porsche-design-system/pull/2867))

### Changed

- `Text Field Wrapper`, `Textarea Wrapper`, `Select Wrapper`, `Multi Select`, `Pin Code`, `Checkbox Wrapper` and
  `Radio Button Wrapper` have improved visual alignment
  ([#2854](https://github.com/porsche-design-system/porsche-design-system/pull/2854))
- `Text Field Wrapper` fully supports RTL (right-to-left) mode
  ([#2854](https://github.com/porsche-design-system/porsche-design-system/pull/2854))
- `Pin Code`: Prop values from `1` to `6` are now supported for `length` prop
  ([#2859](https://github.com/porsche-design-system/porsche-design-system/pull/2859))
- `Model Signature` asset for `model="macan"`
  ([#2857](https://github.com/porsche-design-system/porsche-design-system/pull/2857))
- Use motion tokens in all components
  ([#2834](https://github.com/porsche-design-system/porsche-design-system/pull/2834))

### Fixed

- `Select Wrapper`: Select dropdown is now visible if it overflows the `Table` component
  ([#2885](https://github.com/porsche-design-system/porsche-design-system/pull/2885))
- `Select Wrapper` keyboard and scroll behavior
  ([#2864](https://github.com/porsche-design-system/porsche-design-system/pull/2864))
- Safari 15 default margin of button elements in several components
  ([#2858](https://github.com/porsche-design-system/porsche-design-system/pull/2858))
- `Checkbox Wrapper` and `Radio Button Wrapper` border-color/background-color does not reset on hover
  ([#2852](https://github.com/porsche-design-system/porsche-design-system/pull/2852))
- `Tabs Bar` losing `activeTabIndex` and underline in certain framework scenarios
  ([#2896](https://github.com/porsche-design-system/porsche-design-system/pull/2896))
- `Modal` and `Flyout` body jumping in the background and scrolling back to the top in Next Js and Remix
  ([#2890](https://github.com/porsche-design-system/porsche-design-system/pull/2890))

## [3.8.0] - 2023-10-24

## [3.8.0-rc.0] - 2023-10-23

### Added

- RTL (right-to-left) support for all components
  ([#2819](https://github.com/porsche-design-system/porsche-design-system/pull/2819))
- `Popover` and `Modal` support theme dark and auto
  ([#2789](https://github.com/porsche-design-system/porsche-design-system/pull/2789))
- Styles: `getSkeletonStyle()` and `pds-skeleton()`
  ([#2796](https://github.com/porsche-design-system/porsche-design-system/pull/2796))
- Styles: `motionDuration{Short|Moderate|Long|VeryLong}`, `motionEasing{Base|In|Out}`, and
  `$pds-motion-duration-{short|moderate|long|very-long}`, `$pds-motion-easing-{base|in|out}`
  ([#2791](https://github.com/porsche-design-system/porsche-design-system/pull/2791))

### Changed

- Styles: `themeDarkBackgroundShading` and `$pds-theme-dark-background-shading` color
  ([#2789](https://github.com/porsche-design-system/porsche-design-system/pull/2789))
- `Spinner` animation was optimized to consume less CPU
  ([#2825](https://github.com/porsche-design-system/porsche-design-system/pull/2825))

- `Text`, `Display`, `Heading`, `Headline`: Prop values `left | right` of `align` prop are deprecated and mapped to new
  values `start | end` for correct RTL (right-to-left) support
  ([#2819](https://github.com/porsche-design-system/porsche-design-system/pull/2819))

```diff
- <p-text align="left"></p-text>
+ <p-text align="start"></p-text>

- <p-text align="right"></p-text>
+ <p-text align="end"></p-text>

- <p-display align="left"></p-display>
+ <p-display align="start"></p-display>

- <p-display align="right"></p-display>
+ <p-display align="end"></p-display>

- <p-heading align="left"></p-heading>
+ <p-heading align="start"></p-heading>

- <p-heading align="right"></p-heading>
+ <p-heading align="end"></p-heading>

- <p-headline align="left"></p-headline>
+ <p-headline align="start"></p-headline>

- <p-headline align="right"></p-headline>
+ <p-headline align="end"></p-headline>
```

- `Button Pure`, `Link Pure`, `Switch`: Prop values `left | right` of `align-label` prop are deprecated and mapped to
  new values `start | end` for correct RTL (right-to-left) support
  ([#2819](https://github.com/porsche-design-system/porsche-design-system/pull/2819))

```diff
- <p-button-pure align-label="left"></p-button-pure>
+ <p-button-pure align-label="start"></p-button-pure>

- <p-button-pure align-label="right"></p-button-pure>
+ <p-button-pure align-label="end"></p-button-pure>

- <p-link-pure align-label="left"></p-link-pure>
+ <p-link-pure align-label="start"></p-link-pure>

- <p-link-pure align-label="right"></p-link-pure>
+ <p-link-pure align-label="end"></p-link-pure>

- <p-switch align-label="left"></p-switch>
+ <p-switch align-label="start"></p-switch>

- <p-switch align-label="right"></p-switch>
+ <p-switch align-label="end"></p-switch>
```

- `Flyout`: Prop values `left | right` of `position` prop are deprecated and mapped to new values `start | end` for
  correct RTL (right-to-left) support
  ([#2819](https://github.com/porsche-design-system/porsche-design-system/pull/2819))

```diff
- <p-flyout position="left"></p-flyout>
+ <p-flyout-pure position="start"></p-flyout>

- <p-flyout-pure position="right"></p-flyout>
+ <p-flyout-pure position="end"></p-flyout>
```

- `Carousel`: Prop value `left` of `align-header` prop is deprecated and mapped to new value `start` for correct RTL
  (right-to-left) support ([#2819](https://github.com/porsche-design-system/porsche-design-system/pull/2819))

```diff
- <p-carousel align-header="left"></p-carousel>
+ <p-carousel-pure align-header="start"></p-carousel>
```

### Fixed

- `Popover` doesn't get cut off when used within the `Table` component
  ([#2814](https://github.com/porsche-design-system/porsche-design-system/pull/2814))
- `Flyout` and `Modal` with `open="false"` and nested `Accordion` with `open="true"` containing focusable elements like
  links can't be focused anymore ([#2818](https://github.com/porsche-design-system/porsche-design-system/pull/2818))
- Background for open `Flyout` and `Modal` on iOS Mobile Safari with collapsed address bar is no longer scrollable
  ([#2822](https://github.com/porsche-design-system/porsche-design-system/pull/2822))
- `Tabs Bar` works with translated page content
  ([#2847](https://github.com/porsche-design-system/porsche-design-system/pull/2847))

## [3.7.0] - 2023-10-04

## [3.7.0-rc.2] - 2023-10-04

### Added

- Styles: `gridStyles` and `pds-grid()` support basic usage inside `Flyout` component
  ([#2756](https://github.com/porsche-design-system/porsche-design-system/pull/2756))

### Fixed

- Overlay issues of header/footer in `Flyout` component
  ([#2786](https://github.com/porsche-design-system/porsche-design-system/pull/2786))

## [3.7.0-rc.1] - 2023-09-20

### Added

- **[EXPERIMENTAL]** Prop `loading` for `Radio Button Wrapper`
  ([#2774](https://github.com/porsche-design-system/porsche-design-system/pull/2774))
- Theme property supports `auto` for all themeable components, reflecting `prefers-color-scheme` based on OS system
  settings ([#2719](https://github.com/porsche-design-system/porsche-design-system/pull/2719))
- `hyphens` CSS property can now be overwritten in `Button Tile`, `Link Tile` and `Link Tile Model Signature` components
  ([#2758](https://github.com/porsche-design-system/porsche-design-system/pull/2758))
- Partials that produce innerHTML support `{ format: 'sha256' }` option for whitelisting in
  [Content-Security-Policy (CSP)](/must-know/security/content-security-policy/)
  ([#2773](https://github.com/porsche-design-system/porsche-design-system/pull/2773))
- `Pin Code` ([#2691](https://github.com/porsche-design-system/porsche-design-system/pull/2691))

### Fixed

- Dragging of `Carousel` can become stucked
  ([#2768](https://github.com/porsche-design-system/porsche-design-system/pull/2768))
- Color of `message` for `Fieldset`, `Fieldset Wrapper`, `Text Field Wrapper` and `Textarea Wrapper` in dark theme
  ([#2769](https://github.com/porsche-design-system/porsche-design-system/pull/2769))

### Changed

- Usage of `getInitialStyles()` partial is required and validated with an exception
  ([#2749](https://github.com/porsche-design-system/porsche-design-system/pull/2749))

## [3.7.0-rc.0] - 2023-09-05

### Added

- `Multi Select` ([#2658](https://github.com/porsche-design-system/porsche-design-system/pull/2658))

### Changed

- Partials: `Cdn` and `Format` types are exposed
  ([#2760](https://github.com/porsche-design-system/porsche-design-system/pull/2760))

## [3.6.1] - 2023-08-29

## [3.6.1-rc.0] - 2023-08-29

### Fixed

- Overlapping issues of `Accordion` contents when positioned outside of content area
  ([#2746](https://github.com/porsche-design-system/porsche-design-system/pull/2746))
- Backwards compatibility with previous versions of Porsche Design System
  ([#2752](https://github.com/porsche-design-system/porsche-design-system/pull/2752))

## [3.6.0] - 2023-08-28

## [3.6.0-rc.2] - 2023-08-28

### Fixed

- `Tabs Bar` losing `activeTabIndex` and underline
  ([#2748](https://github.com/porsche-design-system/porsche-design-system/pull/2748))

## [3.6.0-rc.1] - 2023-08-24

### Fixed

- Bundling format and name of `components-js` entrypoint for Vanilla JS integration
  ([#2745](https://github.com/porsche-design-system/porsche-design-system/pull/2745))

## [3.6.0-rc.0] - 2023-08-23

### Added

- New value `aria-current` for `aria` property for linked components (`Link`, `Link Pure`, `Link Tile`, `Crest`,
  `Marque`) ([#2696](https://github.com/porsche-design-system/porsche-design-system/pull/2696))
- Angular: `cdn: 'auto' | 'cn'` option to `PorscheDesignSystemModule.load()` as alternative to using
  `window.PORSCHE_DESIGN_SYSTEM_CDN` ([#2676](https://github.com/porsche-design-system/porsche-design-system/pull/2676))
- React: `cdn: 'auto' | 'cn'` prop to `PorscheDesignSystemProvider` as alternative to using
  `window.PORSCHE_DESIGN_SYSTEM_CDN` with SSR support
  ([#2676](https://github.com/porsche-design-system/porsche-design-system/pull/2676))
- Vue: `cdn: 'auto' | 'cn'` prop to `PorscheDesignSystemProvider` as alternative to using
  `window.PORSCHE_DESIGN_SYSTEM_CDN` ([#2676](https://github.com/porsche-design-system/porsche-design-system/pull/2676))
- Support for sticky footer to `Modal`
  ([#2723](https://github.com/porsche-design-system/porsche-design-system/pull/2723))

### Changed

- Update of Twitter icon ([#2731](https://github.com/porsche-design-system/porsche-design-system/pull/2731))
- Use China CDN and set `window.PORSCHE_DESIGN_SYSTEM_CDN` for backwards compatibility based on .cn top level domain
  before design system initialization
  ([#2676](https://github.com/porsche-design-system/porsche-design-system/pull/2676))

### Fixed

- `Flyout`: Overlapping of sticky header/footer if slotted content has different z-index
  ([#2736](https://github.com/porsche-design-system/porsche-design-system/pull/2736))
- Keyboard behavior and `aria` semantics if either `a` or `button` elements are used as slotted content in `Tabs Bar`
  component. ([#2713](https://github.com/porsche-design-system/porsche-design-system/pull/2713))
- React/SSR: compatibility with Next.js v13 app router
  ([#2687](https://github.com/porsche-design-system/porsche-design-system/pull/2687))
- Consistent `package.json` ECMAScript module exports with `.mjs` and `.cjs` file extensions for
  `components-{js|angular|react|vue}`
  ([#2739](https://github.com/porsche-design-system/porsche-design-system/pull/2739))

## [3.5.0] - 2023-07-25

## [3.5.0-rc.0] - 2023-07-21

### Added

- `background` property to `Button Tile` and `Link Tile` component to adapt the description and link/button theme when
  used on light background image ([#2669](https://github.com/porsche-design-system/porsche-design-system/pull/2669))
- Breakpoint customizable property `columns` to `Segmented Control` to set the amount of columns
  ([#2652](https://github.com/porsche-design-system/porsche-design-system/pull/2652))

### Fixed

- Alignment of `Icon` inside `Accordion` header
  ([#2673](https://github.com/porsche-design-system/porsche-design-system/pull/2673))
- Direction of `Select Wrapper` dropdown if `direction` property is set to `auto`
  ([#2677](https://github.com/porsche-design-system/porsche-design-system/pull/2677))

## [3.4.0] - 2023-07-14

## [3.4.0-rc.0] - 2023-07-13

### Added

- React: `'use client';` directive is applied on all components for main and `ssr` sub-package
  ([#2654](https://github.com/porsche-design-system/porsche-design-system/pull/2654))

### Fixed

- Regression in `observeChildren` that affected nested components (e.g. incorrect rendering of nested `Tabs`).
  ([#2649](https://github.com/porsche-design-system/porsche-design-system/pull/2649))
- Click behaviour of slotted interactive elements of `Carousel`
  ([#2663](https://github.com/porsche-design-system/porsche-design-system/pull/2663))

## [3.3.0] - 2023-07-07

## [3.3.0-rc.0] - 2023-07-06

### Added

- `Tabs` and `Tabs Bar` support SSR ([#2611](https://github.com/porsche-design-system/porsche-design-system/pull/2611))
- Contents of `Tag` component can now be wrapped in multiple lines
  ([#2625](https://github.com/porsche-design-system/porsche-design-system/pull/2625))
- `Carousel`: Possibility to set custom border-radius of slide items
  ([#2645](https://github.com/porsche-design-system/porsche-design-system/pull/2645))
- native lazy loading attribute to `img` tag of `Icon`
  ([#2644](https://github.com/porsche-design-system/porsche-design-system/pull/2644))

### Fixed

- `Stepper Horizontal` navigation between 2 pages is not working as expected in angular
  ([#2641](https://github.com/porsche-design-system/porsche-design-system/pull/2641))
- `Segmented Control` text is not centered / causing unintended line-breaks
  ([#2614](https://github.com/porsche-design-system/porsche-design-system/pull/2614))
- `jsdom-polyfill` fixes validation errors in unit tests during SSR hydration
  ([#2613](https://github.com/porsche-design-system/porsche-design-system/pull/2613))
- `Accordion` collapsable content is overflowing when used with multiple prefixes  
  ([#2612](https://github.com/porsche-design-system/porsche-design-system/pull/2612))
- `Tabs Bar` position of underline for fluid font-size with `size="medium` when resizing
  ([#2611](https://github.com/porsche-design-system/porsche-design-system/pull/2611))
- `Button Pure`, `Link Pure`: `:hover` bug on Firefox
  ([#2630](https://github.com/porsche-design-system/porsche-design-system/pull/2630))
- `Carousel`: Removed `overflow:hidden` of slide items
  ([#2645](https://github.com/porsche-design-system/porsche-design-system/pull/2645))

### Changed

- Improved bootstrapping behaviour of `Icon`
  ([#2644](https://github.com/porsche-design-system/porsche-design-system/pull/2644))

## [3.2.0] - 2023-06-19

## [3.2.0-rc.0] - 2023-06-19

### Added

- `skipLinkTarget` property to `Carousel` component to enhance keyboard functionality
  ([#2557](https://github.com/porsche-design-system/porsche-design-system/pull/2557))
- `showLastPage` property to `Pagination` component
  ([#2606](https://github.com/porsche-design-system/porsche-design-system/pull/2606))

### Fixed

- Partials: `getInitialStyles` supports `Flyout` component
  ([#2598](https://github.com/porsche-design-system/porsche-design-system/pull/2598))
- `Popover` content can be selected/highlighted
  ([#2599](https://github.com/porsche-design-system/porsche-design-system/pull/2599))

### Changed

- `Carousel` pagination now shows 5 "infinite bullets" when using more than 5 slides
  ([#2600](https://github.com/porsche-design-system/porsche-design-system/pull/2600))
- `Carousel` supports click events on non-active slides and changed keyboard navigation
  ([#2557](https://github.com/porsche-design-system/porsche-design-system/pull/2557))
- Unified wordings of all console warnings, errors and exceptions
  ([#2602](https://github.com/porsche-design-system/porsche-design-system/pull/2602))
- Angular: increased peer dependency to `>=15.0.0 <17.0.0`
  ([#2602](https://github.com/porsche-design-system/porsche-design-system/pull/2602))
- `Toast` allows line break markups within toast message
  ([#2584](https://github.com/porsche-design-system/porsche-design-system/pull/2584))
- `Toast` shows always the latest toast message and clears its queue immediately if a new message is added
  ([#2584](https://github.com/porsche-design-system/porsche-design-system/pull/2584))

## [3.1.0] - 2023-06-09

## [3.1.0-rc.2] - 2023-06-09

### Changed

- `Crest` updated assets ([#2595](https://github.com/porsche-design-system/porsche-design-system/pull/2595))
- Partials: `getMetaTagsAndIconLinks` updated assets
  ([#2595](https://github.com/porsche-design-system/porsche-design-system/pull/2595))

### Added

- `Flyout` ([#2547](https://github.com/porsche-design-system/porsche-design-system/pull/2547))

### Fixed

- Wrong validation during SSR hydration of `Link Tile` and `Select Wrapper`
  ([#2588](https://github.com/porsche-design-system/porsche-design-system/pull/2588))
- `Modal` scrollable modal does not jump to top on changes within dialog
  ([#2574](https://github.com/porsche-design-system/porsche-design-system/pull/2574))
- Unnecessary lifecycles are prevented when prop values do not change for complex values
  ([#2574](https://github.com/porsche-design-system/porsche-design-system/pull/2574))

## [3.1.0-rc.1] - 2023-06-02

### Added

- **[EXPERIMENTAL]** Prop `showPasswordToggle` for `Text Field Wrapper` with `input type="password"`
  ([#2586](https://github.com/porsche-design-system/porsche-design-system/pull/2586))
- Prop `name` for `Icon` supports `heart`, `heart-filled`, `copy`, `fingerprint`, `tire`, `roof-open` and `roof-closed`
  ([#2589](https://github.com/porsche-design-system/porsche-design-system/pull/2589))

### Fixed

- `Select Wrapper` missing border on touch devices
  ([#2579](https://github.com/porsche-design-system/porsche-design-system/pull/2579))
- `Tabs Item` text content can be selected/highlighted
  ([#2582](https://github.com/porsche-design-system/porsche-design-system/pull/2582))

## [3.1.0-rc.0] - 2023-05-24

### Added

- `Marque` now has a `variant` property, including 75 years variant
  ([#2575](https://github.com/porsche-design-system/porsche-design-system/pull/2575))

## [3.0.0] - 2023-05-11

## [3.0.0-rc.3] - 2023-05-10

### Fixed

- `Tabs Bar` focus behavior via keyboard navigation
  ([#2546](https://github.com/porsche-design-system/porsche-design-system/pull/2546))
- Rendering of `Wordmark` in Safari ([#2542](https://github.com/porsche-design-system/porsche-design-system/pull/2542))
- Disabled dragging/ghosting of icons
  ([#2536](https://github.com/porsche-design-system/porsche-design-system/pull/2536))

### Changed

- Styles: `dropShadow{Low|Medium|High}Style`s use `box-shadow` instead of `filter: drop-shadow()` to fix glitches
  together with `frostedGlassStyle` in Firefox
  ([#2545](https://github.com/porsche-design-system/porsche-design-system/pull/2545))
- Size of icon and height of `Accordion`
  ([#2536](https://github.com/porsche-design-system/porsche-design-system/pull/2536))

## [3.0.0-rc.2] - 2023-05-09

### Fixed

- `Checkbox Wrapper` Safari visual state change while hovering
  ([#2508](https://github.com/porsche-design-system/porsche-design-system/pull/2508))
- `Checkbox Wrapper` keyboard arrow navigation
  ([#2508](https://github.com/porsche-design-system/porsche-design-system/pull/2508))
- `Modal` fix hover state of dismiss button
  ([#2510](https://github.com/porsche-design-system/porsche-design-system/pull/2510))
- `Link Pure`, `Button Pure`: adjust offset of `:hover` and `active` styles
  ([#2511](https://github.com/porsche-design-system/porsche-design-system/pull/2511))
- `Tabs Bar`, `Tabs` ([#2521](https://github.com/porsche-design-system/porsche-design-system/pull/2521)):
  - `focus` state of tabpanel
  - Indicator bar height
- Optimize icon/text alignment of `Link Pure` and `Button Pure` in Safari
- `Select Wrapper` multiline option height and scaling behavior
  ([#2524](https://github.com/porsche-design-system/porsche-design-system/pull/2524))
- Fixed accessibility issues of `Tabs`, `Tabs Bar` and `Stepper Horizontal` to comply with v.4.7.0 of `axe-core`
  ([#2530](https://github.com/porsche-design-system/porsche-design-system/pull/2530))
- React: `patchRemixRunProcessBrowserGlobalIdentifier` binary now supports Remix 1.16.0
  ([#2537](https://github.com/porsche-design-system/porsche-design-system/pull/2537))
- Angular: added optional modifier to optional properties for better type checking in strict mode
  ([#2544](https://github.com/porsche-design-system/porsche-design-system/pull/2544))

### Added

- Deprecation warning to `Icon` component if `lazy` prop is used
  ([#2521](https://github.com/porsche-design-system/porsche-design-system/pull/2521))
- `aria` prop to `Scroller` component
  ([#2530](https://github.com/porsche-design-system/porsche-design-system/pull/2530))

### Changed

- Model signature asset of 718 model ([#2532](https://github.com/porsche-design-system/porsche-design-system/pull/2532))

## [3.0.0-rc.1] - 2023-04-19

### Added

- Prop `name` for `Icon` supports `push-pin`, `push-pin-off`, `qr`, `pin-filled`, `shopping-cart-filled`,
  `shopping-bag-filled`, `logo-apple-podcast`, `logo-spotify` and `user-filled`
  ([#2471](https://github.com/porsche-design-system/porsche-design-system/pull/2471)).
- **[EXPERIMENTAL]** Prop `loading` for `Checkbox Wrapper`
  ([#2483](https://github.com/porsche-design-system/porsche-design-system/pull/2483))

### Fixed

- `Wordmark`, `Crest` and `Model Signature` respect parent width/height
  ([#2479](https://github.com/porsche-design-system/porsche-design-system/pull/2479))
- `Button Tile`, `Link Tile` and `Link Tile Model Signature` are using correct border radius of
  `$pds-border-radius-large` ([#2473](https://github.com/porsche-design-system/porsche-design-system/pull/2473))
- `Text Field Wrapper` with `input type="search"` has better accessibility for clear button
  ([#2476](https://github.com/porsche-design-system/porsche-design-system/pull/2476))
- `Accordion` layout shift with nested accordions
  ([#2465](https://github.com/porsche-design-system/porsche-design-system/pull/2465))
- Color Contrast issues and rendering in Windows High Contrast Mode
  ([#2420](https://github.com/porsche-design-system/porsche-design-system/pull/2420))

## [3.0.0-rc.0] - 2023-04-11

### Fixed

- Styles: `borderRadiusLarge` and `$pds-border-radius-large` are exposing correct value
  ([#2463](https://github.com/porsche-design-system/porsche-design-system/pull/2463))

## [3.0.0-alpha.6] - 2023-04-06

### Added

- `xxl` breakpoint for all breakpoint customizable component values
  ([#2454](https://github.com/porsche-design-system/porsche-design-system/pull/2454))

### Fixed

- Disabled color of `Icon` component ([#2446](https://github.com/porsche-design-system/porsche-design-system/pull/2446))
- Support of `Radio Button Wrapper` for name value with non-alphanumeric characters
  ([#2443](https://github.com/porsche-design-system/porsche-design-system/pull/2443))

### Changed

- `Banner` is a controlled component now and its visibility has to be controlled via the `open` prop
  ([#2447](https://github.com/porsche-design-system/porsche-design-system/pull/2447))

```diff
- <p-banner></p-banner>
+ <p-banner open="true"></p-banner>
```

- Renamed all custom `change` events to `update` because of bad event emissions with native `change` events, e.g. with
  nested `select` or `input` elements

#### 🤖 Property deprecations 🤖

##### Accordion:

- Event `accordionChange` is deprecated, use `update` event instead.

```diff
- <PAccordion onAccordionChange={(e: CustomEvent<AccordionChangeEvent>) => {}} />
+ <PAccordion onUpdate={(e: CustomEvent<AccordionUpdateEvent>) => {}} />
```

##### Banner:

- Prop `persistent` is deprecated, use `dismissButton` instead.

```diff
- <p-banner persistent="true"></p-banner>
+ <p-banner dismiss-button="false"></p-banner>
```

##### Carousel:

- Event `carouselChange` is deprecated, use `update` event instead.

```diff
- <PCarousel onCarouselChange={(e: CustomEvent<CarouselChangeEvent>) => {}} />
+ <PCarousel onUpdate={(e: CustomEvent<CarouselUpdateEvent>) => {}} />
```

##### Inline Notification:

- Prop `persistent` is deprecated, use `dismissButton` instead.

```diff
- <p-inline-notification persistent="true"></p-inline-notification>
+ <p-inline-notification dismiss-button="false"></p-inline-notification>
```

##### Pagination:

- Event `pageChange` is deprecated, use `update` event instead.

```diff
- <PPagination onPageChange={(e: CustomEvent<PageChangeEvent>) => {}} />
+ <PPagination onUpdate={(e: CustomEvent<PaginationUpdateEvent>) => {}} />
```

##### Segmented Control:

- Event `segmentedControlChange` is deprecated, use `update` event instead.

```diff
- <PSegmentedControl onSegmentedControlChange={(e: CustomEvent<SegmentedControlChangeEvent>) => {}} />
+ <PSegmentedControl onUpdate={(e: CustomEvent<SegmentedControlUpdateEvent>) => {}} />
```

##### Stepper Horizontal:

- Event `stepChange` is deprecated, use `update` event instead.

```diff
- <PStepperHorizontal onStepChange={(e: CustomEvent<StepChangeEvent>) => {}} />
+ <PStepperHorizontal onUpdate={(e: CustomEvent<StepperHorizontalUpdateEvent>) => {}} />
```

##### Switch:

- Event `switchChange` is deprecated, use `update` event instead.

```diff
- <PSwitch onSwitchChange={(e: CustomEvent<SwitchChangeEvent>) => {}} />
+ <PSwitch onUpdate={(e: CustomEvent<SwitchUpdateEvent>) => {}} />
```

##### Table:

- Event `sortingChange` is deprecated, use `update` event instead.

```diff
- <PTable onSortingChange={(e: CustomEvent<SortingChangeEvent>) => {}} />
+ <PTable onUpdate={(e: CustomEvent<TableUpdateEvent>) => {}} />
```

##### Tabs:

- Event `tabChange` is deprecated, use `update` event instead.

```diff
- <PTabs onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabs onUpdate={(e: CustomEvent<TabsUpdateEvent>) => {}} />
```

##### Tabs Bar:

- Event `tabChange` is deprecated, use `update` event instead.

```diff
- <PTabsBar onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabsBar onUpdate={(e: CustomEvent<TabsUpdateEvent>) => {}} />
```

## [3.0.0-alpha.5] - 2023-03-30

### Added

- `Wordmark` ([#2418](https://github.com/porsche-design-system/porsche-design-system/pull/2418))
- `Crest` ([#2437](https://github.com/porsche-design-system/porsche-design-system/pull/2437))

### Changed

- Styles: changed color values of `theme[Light|Dark]ContrastMedium` and `theme[Light|Dark]Notification[*]` color tokens
  of `Styles` subpackage ([#2436](https://github.com/porsche-design-system/porsche-design-system/pull/2436))

## [3.0.0-alpha.4] - 2023-03-28

### Changed

- `Table` matches new design language
  ([#2364](https://github.com/porsche-design-system/porsche-design-system/pull/2364/))

### Added

- Styles: ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))
  - `gridWide`
  - `gridWideColumnStart` and `$pds-grid-wide-column-start`
  - `gridWideColumnEnd` and `$pds-grid-wide-column-end`
  - `gridNarrowOffset`, `gridNarrowOffsetBase`, `gridNarrowOffsetS`, `gridNarrowOffsetXXL` and
    `$pds-grid-narrow-offset-base`, `$pds-grid-narrow-offset-s`, `$pds-grid-narrow-offset-xxl`
  - `gridBasicOffset`, `gridBasicOffsetBase`, `gridBasicOffsetS`, `gridBasicOffsetXXL` and
    `$pds-grid-basic-offset-base`, `$pds-grid-basic-offset-s`, `$pds-grid-basic-offset-xxl`
  - `gridExtendedOffset`, `gridExtendedOffsetBase`, `gridExtendedOffsetS`, `gridExtendedOffsetXXL` and
    `$pds-grid-extended-offset-base`, `$pds-grid-extended-offset-s`, `$pds-grid-extended-offset-xxl`
  - `gridWideOffset`, `gridWideOffsetBase`, `gridWideOffsetS`, `gridWideOffsetXXL` and `$pds-grid-wide-offset-base`,
    `$pds-grid-wide-offset-s`, `$pds-grid-wide-offset-xxl`
  - `gridFullOffset` and `$pds-grid-full-offset`
- `Button Tile` ([#2381](https://github.com/porsche-design-system/porsche-design-system/pull/2381))
- `Fieldset` ([#2404](https://github.com/porsche-design-system/porsche-design-system/pull/2404))
- `Link Tile Model Signature` ([#2388](https://github.com/porsche-design-system/porsche-design-system/pull/2388))
- Prop `activeSlideIndex` to `Carousel`
  ([#2421](https://github.com/porsche-design-system/porsche-design-system/pull/2421))
- Prop `slidesPerPage` supports value `auto` of `Carousel`
  ([#2421](https://github.com/porsche-design-system/porsche-design-system/pull/2421))
- Prop `scrollbar` for `Scroller` ([#2364](https://github.com/porsche-design-system/porsche-design-system/pull/2364/))
- Prop `theme` for `Table` ([#2364](https://github.com/porsche-design-system/porsche-design-system/pull/2364/))

### Fixed

- React: missing animation of `Carousel` in certain scenarios

### Changed

- Styles: `gridStyles` and `pds-grid()` are supporting an additional column range called `wide`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))
- Styles: SCSS version needs to be imported by `@porsche-design-system/components-js/styles` instead of
  `@porsche-design-system/components-js/styles/scss`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))

#### Removed

- `Banner`: CSS variable `--p-banner-position-type`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))
- Styles: `gridSafeZone`, `gridSafeZoneBase`, `gridSafeZoneXXL` and `$pds-grid-safe-zone-base`,
  `$pds-grid-safe-zone-xxl` ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))
- Styles: `gridWidth`, `gridWidthMin`, `gridWidthMax` and `$pds-grid-width-min`, `$pds-grid-width-max`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))

#### 🤖 Property deprecations 🤖

##### Banner:

- Prop `width` has no effect anymore, instead the component is aligned with Porsche Grid "extended" by default.
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))

#### 🤡 Component deprecations 🤡

##### Marque: ([#2418](https://github.com/porsche-design-system/porsche-design-system/pull/2418))

```diff
- <p-marque></p-marque>
+ <p-wordmark></p-wordmark>
```

##### Fieldset Wrapper: ([#2404](https://github.com/porsche-design-system/porsche-design-system/pull/2404))

```diff
- <p-fieldset-wrapper label="Some legend label">
+ <p-fieldset label="Some legend label">
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
- </p-fieldset-wrapper>
+ </p-fieldset>
```

## [3.0.0-alpha.3] - 2023-03-17

#### 🤖 Property deprecations 🤖

##### Accordion:

- Event `accordionChange` is deprecated, use `change` event instead.

```diff
- <PAccordion onAccordionChange={(e: CustomEvent<AccordionChangeEvent>) => {}} />
+ <PAccordion onChange={(e: CustomEvent<AccordionChangeEvent>) => {}} />
```

##### Banner:

- Named `slot="title"` is deprecated, use `heading` prop or `slot="heading"` instead.

```diff
<p-banner>
-  <span slot="title">Some heading</span>
+  <span slot="heading">Some heading</span>
   <span slot="description">Some notification description.</span>
</p-banner>

-<p-banner>
+<p-banner heading="Some heading" description="Some notification description.">
-  <span slot="title">Some heading</span>
-  <span slot="description">Some notification description.</span>
</p-banner>
```

##### Carousel:

- Prop `disablePagination` is deprecated, use `pagination` instead.
- Event `carouselChange` is deprecated, use `change` event instead.

```diff
- <p-carousel disable-pagination="true"></p-carousel>
+ <p-carousel pagination="false"></p-carousel>

- <PCarousel onCarouselChange={(e: CustomEvent<CarouselChangeEvent>) => {}} />
+ <PCarousel onChange={(e: CustomEvent<CarouselChangeEvent>) => {}} />
```

##### Divider:

- Prop `orientation` is deprecated, use `direction` instead.

```diff
- <p-divider orientation="horizontal"></p-divider>
+ <p-divider direction="horizontal"></p-divider>
```

##### Icon:

- Prop `colors`'s value `disabled` is removed, use `state-disabled` instead.

```diff
- <p-icon color="disabled"></p-icon>
+ <p-icon color="state-disabled"></p-icon>
```

##### Link Tile:

- Prop `weight`'s value `semibold` is deprecated, use `semi-bold` instead.

```diff
- <p-link-tile weight="semibold"></p-link-tile>
+ <p-link-tile weight="semi-bold"></p-link-tile>
```

##### Modal:

- Prop `disableCloseButton` is deprecated, use `dismissButton` instead.
- Event `close` is deprecated, use `dismiss` event instead.

```diff
- <p-modal disable-close-button="true"></p-modal>
+ <p-modal dismiss-button="false"></p-modal>

- <PModal onClose={(e: CustomEvent<void>) => {}} />
+ <PModal onDismiss={(e: CustomEvent<void>) => {}} />
```

##### Pagination:

- Props `allyLabelNext`, `allyLabelPage`, `allyLabelPrev` and `allyLabel` are deprecated.
- Event `pageChange` is deprecated, use `change` event instead.

```diff
- <p-pagination ally-label="Paginierung" ally-label-prev="Vorherige Seite" ally-label-next="Nächste Seite" ally-label-page="Seite"></p-pagination>
+ <p-pagination intl="{root: 'Paginierung', prev: 'Vorherige Seite', next: 'Nächste Seite', page: 'Seite'}"></p-pagination>

- <PPagination onPageChange={(e: CustomEvent<PageChangeEvent>) => {}} />
+ <PPagination onChange={(e: CustomEvent<PaginationChangeEvent>) => {}} />
```

##### Scroller:

- Prop `gradientColorScheme` is deprecated, use `gradientColor` instead.
- Prop `scrollIndicatorPosition` is deprecated, use `alignScrollIndicator` instead.

```diff
- <p-scroller gradient-color-scheme="surface"></p-scroller>
+ <p-scroller gradient-color="background-surface"></p-scroller>

- <p-scroller scroll-indicator-position="top"></p-scroller>
+ <p-scroller align-scroll-indicator="top"></p-scroller>
```

##### Segmented Control:

- Event `segmentedControlChange` is deprecated, use `change` event instead.

```diff
- <PSegmentedControl onSegmentedControlChange={(e: CustomEvent<SegmentedControlChangeEvent>) => {}} />
+ <PSegmentedControl onChange={(e: CustomEvent<SegmentedControlChangeEvent>) => {}} />
```

##### Stepper Horizontal:

- Event `stepChange` is deprecated, use `change` event instead.

```diff
- <PStepperHorizontal onStepChange={(e: CustomEvent<StepChangeEvent>) => {}} />
+ <PStepperHorizontal onChange={(e: CustomEvent<StepperHorizontalChangeEvent>) => {}} />
```

##### Switch:

- Event `switchChange` is deprecated, use `change` event instead.

```diff
- <PSwitch onSwitchChange={(e: CustomEvent<SwitchChangeEvent>) => {}} />
+ <PSwitch onChange={(e: CustomEvent<SwitchChangeEvent>) => {}} />
```

##### Table:

- Event `sortingChange` is deprecated, use `change` event instead.

```diff
- <PTable onSortingChange={(e: CustomEvent<SortingChangeEvent>) => {}} />
+ <PTable onChange={(e: CustomEvent<TableChangeEvent>) => {}} />
```

##### Tabs:

- Prop `gradientColorScheme` is deprecated, use `gradientColor` instead.
- Prop `weight`'s value `semibold` is deprecated, use `semi-bold` instead.
- Event `tabChange` is deprecated, use `change` event instead.

```diff
- <p-tabs gradient-color-scheme="surface"></p-tabs>
+ <p-tabs gradient-color="background-surface"></p-tabs>

- <p-tabs weight="semibold"></p-tabs>
+ <p-tabs weight="semi-bold"></p-tabs>

- <PTabs onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabs onChange={(e: CustomEvent<TabsChangeEvent>) => {}} />
```

##### Tabs Bar:

- Prop `gradientColorScheme` is deprecated, use `gradientColor` instead.
- Prop `weight`'s value `semibold` is deprecated, use `semi-bold` instead.
- Event `tabChange` is deprecated, use `change` event instead.

```diff
- <p-tabs-bar gradient-color-scheme="surface"></p-tabs-bar>
+ <p-tabs-bar gradient-color="background-surface"></p-tabs-bar>

- <p-tabs-bar weight="semibold"></p-tabs>
+ <p-tabs-bar weight="semi-bold"></p-tabs>

- <PTabsBar onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabsBar onChange={(e: CustomEvent<TabsChangeEvent>) => {}} />
```

##### Tag:

- Prop `color`'s value `notification-warning`, `notification-success` and `notification-error` are deprecated, use
  `notification-warning-soft`, `notification-success-soft` and `notification-error-soft` instead.

```diff
- <p-tag color="notification-warning"></p-tag>
+ <p-tag color="notification-warning-soft"></p-tag>

- <p-tag color="notification-success"></p-tag>
+ <p-tag color="notification-success-soft"></p-tag>

- <p-tag color="notification-error"></p-tag>
+ <p-tag color="notification-error-soft"></p-tag>
```

##### Text Field Wrapper:

- Prop `showCharacterCount` is deprecated, use `showCounter` instead.

```diff
- <p-text-field-wrapper show-character-count="false">
+ <p-text-field-wrapper show-counter="false">
    <input type="text" maxlength="20" />
</p-text-field-wrapper>
```

##### Textarea Wrapper:

- Prop `showCharacterCount` is deprecated, use `showCounter` instead.

```diff
- <p-textarea-wrapper show-character-count="false">
+ <p-textarea-wrapper show-counter="false">
    <textarea maxlength="80"></textarea>
</p-textarea-wrapper>
```

##### Text List

- Props `listType` and `orderType` are deprecated, use `type` instead.

```diff
- <p-text-list list-type="unordered"></p-text-list>
+ <p-text-list type="unordered"></p-text-list>

- <p-text-list list-type="ordered" order-type="numbered"></p-text-list>
+ <p-text-list type="numbered"></p-text-list>

- <p-text-list list-type="ordered" order-type="alphabetically"></p-text-list>
+ <p-text-list type="alphabetically"></p-text-list>
```

### Added

- `Text`, `Icon`, `Button Pure` and `Link Pure` support value `xx-small` for prop `size`
- `Display` supports value `small` for prop `size`
- Partials: `getInitialStyles` supports multi prefix, e.g.
  `getInitialStyles({ prefix: ['', 'some-prefix', 'another-prefix'] });`
- Styles: `displaySmallStyle` and `$pds-display-small`
- Styles: `textXXSmallStyle` and `$pds-text-xx-small`
- Styles: `fontSizeDisplaySmall` and `$pds-font-size-display-small`
- Styles: `fontSizeTextXXSmall` and `$pds-font-size-text-xx-small`
- Styles: `getHoverStyle` and `pds-hover()`
- `Banner` has `heading` and `description` prop as well as `slot="heading"` and deprecated `slot="title"`
- Custom events have consistent names across components and deprecated old event names
  - `Accordion` emits `change` and deprecated `accordionChange` event
  - `Carousel` emits `change` and deprecated `carouselChange` event
  - `Modal` emits `dismiss` and deprecated `close` event
  - `Pagination` emits `change` and deprecated `pageChange` event
  - `Segmented Control` emits `change` and deprecated `segmentedControlChange` event
  - `Stepper Horizontal` emits `change` and deprecated `stepChange` event
  - `Switch` emits `change` and deprecated `switchChange` event
  - `Table` emits `change` and deprecated `sortingChange` event
  - `Tabs` emits `change` and deprecated `tabChange` event
  - `Tabs Bar` emits `change` and deprecated `tabChange` event
- Props have consistent names across components and deprecated old props
  - `Carousel` got `pagination` prop and deprecated `disablePagination` prop
  - `Divider` got `direction` prop and deprecated `orientation` prop
  - `Modal` got `dismissButton` prop and deprecated `disableCloseButton` prop
  - `Pagination` got `intl` prop and deprecated `allyLabelNext`, `allyLabelPage`, `allyLabelPrev` and `allyLabel` props
  - `Scroller` got `gradientColor` prop and deprecated `gradientColorScheme` prop
  - `Scroller` got `alignScrollIndicator` prop and deprecated `scrollIndicatorPosition` prop
  - `Tabs` got `gradientColor` prop and deprecated `gradientColorScheme` prop
  - `Tabs Bar` got `gradientColor` prop and deprecated `gradientColorScheme` prop
  - `Text Field Wrapper` got `showCounter` prop and deprecated `showCharacterCount` prop
  - `Textarea Wrapper` got `showCounter` prop and deprecated `showCharacterCount` prop
  - `Text List` got `type` prop and deprecated `listType` and `orderType` prop
- Props have consistent values across components and deprecated old values
  - `Icon` prop `color` got value `state-disabled` and removed `disabled` value
  - `Link Tile` prop `weight` got value `semi-bold` and deprecated `semibold` value
  - `Tabs Bar` and `Tabs` prop `weight` got value `semi-bold` and deprecated `semibold` value
  - `Tag` prop `color` got values `notification-info-soft`, `notification-warning-soft`, `notification-success-soft`,
    `notification-error-soft` and deprecated `notification-warning`, `notification-success`, `notification-error` values

### Changed

- `Display` uses font-weight regular and font-style normal
- Partials: `getInitialStyles` matches new design language
- Partials: All component related, slotted Light DOM styles have been moved to `getInitialStyles`
- Styles: `getFocusStyle` and `pds-focus()` doesn't need `theme` parameter anymore
- Styles: `breakpoint{Base|XS|S|M|L|XL|XXL}` and `$pds-breakpoint-{base|xs|s|m|l|xl|xxl}` are provided as number without
  unit (px)
- `Link Tile` matches new design language
- Typings for all component props start with the component name, e.g. `SwitchAlignLabel`, `TabsBarGradientColor` or
  `LinkPureIcon`
- `Icon` prop `color` value `disabled` is renamed to `state-disabled`
- `Tag` prop `color` value `notification-info` is renamed to `notification-info-soft`

### Fixed

- `Text Field Wrapper` calendar and time indicator icons respect color definition in dark theme
- `Text Field Wrapper` has correct height when type date or time is used
- Partials: Typings of return value with and without options parameter
- `Modal` scrolling behavior on mouse drag

#### Removed

- `Heading`: value `xxx-large` for prop `size`
- Styles: `headingXXXLargeStyle` and `$pds-heading-xxx-large`
- Styles: `fontSizeHeadingXXLarge` and `$pds-font-size-heading-xx-large`

## [3.0.0-alpha.2] - 2023-02-27

#### 🤖 Property deprecations 🤖

##### Carousel:

- Prop `wrap-content` is deprecated.

```diff
- <p-carousel wrap-content="true"></p-carousel>
+ <p-carousel></p-carousel>
```

##### Divider:

- Prop values `neutral-contrast-low | neutral-contrast-medium | neutral-contrast-high` of `color` prop are deprecated.

```diff
- <p-divider color="neutral-contrast-low"></p-divider>
+ <p-divider color="contrast-low"></p-divider>

- <p-divider color="neutral-contrast-medium"></p-divider>
+ <p-divider color="contrast-medium"></p-divider>

- <p-divider color="neutral-contrast-high"></p-divider>
+ <p-divider color="contrast-high"></p-divider>
```

### Changed

- `Divider`, `Button Group`, `Carousel` and `Text List` match new design language
- Background color of `Scroller`'s `prev` and `next` buttons in dark theme
- Partials: Removed deprecated `withoutTags` option for all partials, please use `format: 'jsx'` instead
- `Content Wrapper` default value of prop `width` has changed from `basic` to `extended`

### Added

- `Model Signature`
- Props `align-header` and `width` for `Carousel`
- Vue: plugin functions `createPorscheDesignSystem` and `usePorscheDesignSystemPlugin`

### Fixed

- `Radio Button Wrapper` keyboard arrow navigation
- `Button Pure` and `Link Pure` lagging active state background when scrolling on iOS

## [3.0.0-alpha.1] - 2023-02-16

### Added

- Porsche Next font supports Vietnamese charset
- Prop `color` of `Icon` supports `disabled`
- React: `patchRemixRunProcessBrowserGlobalIdentifier` binary to support SSR components with Remix

### Changed

- `Stepper Horizontal` matches new design language
- Styles: Optimize design tokens "spacing", "typography" and "theme" provided by styles sub-package
  `@porsche-design-system/components-{js|angular|react|vue}/styles`
- Styles: Use calc() instead of max() to calculate padding for `gridStyle` (JS) and `pds-grid()` (SCSS)
- Styles: `gridStyle` (JS) and `pds-grid()` (SCSS) uses optimized grid gap

## [3.0.0-alpha.0] - 2023-02-08

#### Note to the new `v3` major release of the Porsche Design System

With the new **Porsche Design Language** comes a lot of changes regarding layout and design principles. To keep
refactoring efforts as low as possible when upgrading from `v2` to `v3`, **breaking changes** were avoided as far as
possible. Nevertheless, there are a few breaking changes and some more deprecations which should receive attention.

#### 👹 Breaking Changes 👹

##### Button:

- Removed deprecated prop `tabbable`.

```diff
- <p-button tabbable="false">Some label</p-button>
+ <p-button tabindex="-1">Some label</p-button>
```

- Default value of prop `icon` has changed from `arrow-head-right` to `none`. Therefore, the `icon` property **must** be
  set if the component has the `hide-label` property.

```diff
- <p-button hide-label="true">Some label</p-button>
+ <p-button hide-label="true" icon="arrow-right">Some label</p-button>

- <p-button hide-label="{ base: true, m: false }">Some label</p-button>
+ <p-button hide-label="{ base: true, m: false }" icon="arrow-right">Some label</p-button>
```

##### Button Pure:

- Removed `subline` slot (visually not intended anymore).

```diff
<p-button-pure>
  Some label
-   <p slot="subline">Some Subline</p>
</p-button-pure>
```

- Removed deprecated prop `tabbable`.

```diff
- <p-button-pure tabbable="false">Some label</p-button-pure>
+ <p-button-pure tabindex="-1">Some label</p-button-pure>
```

##### Icon:

- Value `inherit` for prop `color` works slightly different to the previous major version. A CSS filter is required to
  apply custom coloring to take advantage of using an SVG embedded in an `<img/>` for better SSR support and loading
  performance in general.

```diff
- <p-icon color="inherit" style="color: white;"></p-icon>
+ <p-icon color="inherit" style="filter: invert(100%);"></p-icon>
```

- Camel case syntax for `name` prop isn't supported, please use param case syntax instead (TypeScript typings have been
  updated too).

```diff
- <p-icon name="arrowRight"></p-icon>
+ <p-icon name="arrow-right"></p-icon>
```

##### Link:

- Default value of prop `icon` has changed from `arrow-head-right` to `none`. Therefore, the `icon` property **must** be
  set if the component has the `hide-label` property.

```diff
- <p-link href="#" hide-label="true">Some label</p-link>
+ <p-link href="#" hide-label="true" icon="arrow-right">Some label</p-link>

- <p-link href="#" hide-label="{ base: true, m: false }">Some label</p-link>
+ <p-link href="#" hide-label="{ base: true, m: false }" icon="arrow-right">Some label</p-link>
```

##### Link Pure:

- Removed `subline` slot (visually not intended anymore).

```diff
<p-link-pure href="#">
  Some label
-   <p slot="subline">Some Subline</p>
</p-link-pure>
```

##### Marque:

- Removed `variant` property.

```diff
- <p-marque variant="75-years"></p-marque>
+ <p-marque></p-marque>
// or even better, replace component by wordmark
+ <p-wordmark></p-wordmark>
```

##### Switch:

- Removed deprecated prop `tabbable`.

```diff
- <p-switch tabbable="false">Some label</p-switch>
+ <p-switch tabindex="-1">Some label</p-switch>
```

##### Partials:

- `getIconLinks()` partial accepts only param-cased icon names.

```diff
- require('@porsche-design-system/components-js/partials').getIconLinks({ icons: ['arrowRight'] })

+ require('@porsche-design-system/components-js/partials').getIconLinks({ icons: ['arrow-right'] })
```

##### CSS global scope:

- Changed naming of CSS global variables names.

```diff
- --p-animation-duration__spinner
- --p-animation-duration__banner
+ --p-animation-duration
```

#### 🤡 Component deprecations 🤡

All deprecated components are refactored to match the new design language, therefor it's technically not breaking, but
we highly recommend to migrate to the mentioned alternative, since those deprecated components will be removed with next
major version.

##### Content Wrapper:

- Component is deprecated and will be removed with the next major release. Please use **[Porsche Grid](/styles/grid/)**
  instead, which is based on [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid) covering the specific
  layout needs for a harmonic appearance across all digital Porsche touch-points.

##### Flex:

- Component is deprecated and will be removed with the next major release. In general, please use native
  [CSS Flex](https://css-tricks.com/snippets/css/a-guide-to-flexbox) instead for better performance and more
  standardized layout technique.

##### Grid:

- Component is deprecated and will be removed with the next major release. In general, please use native
  [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid) in combination with
  **[Porsche Grid](/styles/grid/)** instead for better performance and more standardized layout technique.

##### Headline:

```diff
- <p-headline>The quick brown fox jumps over the lazy dog</p-headline>
+ <p-heading>The quick brown fox jumps over the lazy dog</p-heading>
```

##### Link Social:

- Component is deprecated and will be removed with the next major release. Please use the **[Link](/components/link/)**
  component instead.

#### 🤖 Property deprecations 🤖

All deprecated properties are still present without any effect, therefor it's technically not breaking, but we highly
recommend to migrate and remove the deprecated props since those ones will be removed with next major version.

##### Button Pure:

- Prop `weight` is deprecated, only regular font weight will be applied.

```diff
- <p-button-pure weight="thin">Some label</p-button-pure>
- <p-button-pure weight="regular">Some label</p-button-pure>
- <p-button-pure weight="semibold">Some label</p-button-pure>
- <p-button-pure weight="bold">Some label</p-button-pure>
+ <p-button-pure>Some label</p-button-pure>
```

##### Content Wrapper (deprecated):

- Prop `theme` and `background-color` are deprecated.

```diff
- <p-content-wrapper theme="dark" background-color="default">Some content</p-content-wrapper>
+ <p-content-wrapper>Some content</p-content-wrapper>
```

##### Grid (deprecated):

- The `gutter` property is deprecated and has no effect anymore. Instead, a fluid gutter depending on the viewport width
  is used.

```diff
- <p-grid gutter="16">Some content</p-grid>
- <p-grid gutter="24">Some content</p-grid>
- <p-grid gutter="36">Some content</p-grid>
+ <p-grid>Some content</p-grid>
```

##### Icon:

- Prop `lazy` is deprecated.

```diff
- <p-icon lazy="true"></p-icon>
+ <p-icon></p-icon>
```

##### Link Pure:

- Prop `weight` is deprecated, only regular font weight will be applied.

```diff
- <p-link-pure href="#" weight="thin">Some label</p-link-pure>
- <p-link-pure href="#" weight="regular">Some label</p-link-pure>
- <p-link-pure href="#" weight="semibold">Some label</p-link-pure>
- <p-link-pure href="#" weight="bold">Some label</p-link-pure>
+ <p-link-pure href="#">Some label</p-link-pure>
```

##### Segmented Control:

- Prop `background-color` is deprecated.

```diff
- <p-segmented-control background-color="background-surface">
   <p-segmented-control-item value="xs">XS</p-segmented-control-item>
   <p-segmented-control-item value="s">S</p-segmented-control-item>
 </p-segmented-control>
+ <p-segmented-control>
   <p-segmented-control-item value="xs">XS</p-segmented-control-item>
   <p-segmented-control-item value="s">S</p-segmented-control-item>
 </p-segmented-control>
```

#### 👾 Property value deprecations 👾

All deprecated values are mapped to new ones, therefor it's technically not breaking, but we highly recommend to migrate
to the new values since those ones will be removed with next major version.

##### Banner:

- Prop value `fluid` of `width` prop is deprecated.

```diff
- <p-banner width="fluid"></p-banner>
+ <p-banner></p-banner>
```

- Prop value `neutral` of `state` prop is deprecated.

```diff
- <p-banner state="neutral">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description. You can also add inline <a href="https://porsche.com">links</a> to route to another page.</span>
 </p-banner>
+ <p-banner state="info">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description. You can also add inline <a href="https://porsche.com">links</a> to route to another page.</span>
 </p-banner>
```

##### Content Wrapper:

- Prop value `fluid` of `width` prop is deprecated.

```diff
- <p-content-wrapper width="fluid">Some content</p-content-wrapper>
+ <p-content-wrapper>Some content</p-content-wrapper>
```

##### Icon:

- Prop values
  `brand | default | neutral-contrast-low | neutral-contrast-medium | neutral-contrast-high | notification-neutral` of
  `color` prop are deprecated.

```diff
- <p-icon color="brand"></p-icon>
+ <p-icon color="primary"></p-icon>

- <p-icon color="default"></p-icon>
+ <p-icon color="primary"></p-icon>

- <p-icon color="neutral-contrast-low"></p-icon>
+ <p-icon color="contrast-low"></p-icon>

- <p-icon color="neutral-contrast-medium"></p-icon>
+ <p-icon color="contrast-medium"></p-icon>

- <p-icon color="neutral-contrast-high"></p-icon>
+ <p-icon color="contrast-high"></p-icon>

- <p-icon color="neutral-contrast-neutral"></p-icon>
+ <p-icon color="contrast-info"></p-icon>
```

##### Inline Notification:

- Prop value `neutral` of `state` prop is deprecated.

```diff
- <p-inline-notification state="neutral"></p-inline-notification>
+ <p-inline-notification state="info"></p-inline-notification>
```

##### Tag:

- Prop value `notification-neutral | neutral-contrast-high | background-default` of `color` prop is deprecated.

```diff
- <p-tag color="notification-neutral">Color label</p-tag>
+ <p-tag color="notification-info">Color label</p-tag>

- <p-tag color="neutral-contrast-high">Color label</p-tag>
+ <p-tag color="primary">Color label</p-tag>

- <p-tag color="background-default">Color label</p-tag>
+ <p-tag color="background-base">Color label</p-tag>
```

##### Tag Dismissible:

- Prop value `background-default` of `color` prop is deprecated.

```diff
- <p-tag-dismissible color="background-default">Color label</p-tag-dismissible>
+ <p-tag-dismissible color="background-base">Color label</p-tag-dismissible>
```

##### Text:

- Prop value `thin | semibold` of `weight` prop is deprecated.

```diff
- <p-text weight="thin">Some text</p-text>
+ <p-text>Some text</p-text>

- <p-text weight="semibold">Some text</p-text>
+ <p-text weight="semi-bold">Some text</p-text>
```

- Prop value
  `brand | default | neutral-contrast-low | neutral-contrast-medium | neutral-contrast-high | notification-neutral` of
  `color` prop is deprecated.

```diff
- <p-text color="brand">Some text</p-text>
+ <p-text>Some text</p-text>

- <p-text color="default">Some text</p-text>
+ <p-text>Some text</p-text>

- <p-text color="neutral-contrast-low">Some text</p-text>
+ <p-text color="contrast-low">Some text</p-text>

- <p-text color="neutral-contrast-medium">Some text</p-text>
+ <p-text color="contrast-medium">Some text</p-text>

- <p-text color="neutral-contrast-high">Some text</p-text>
+ <p-text color="contrast-high">Some text</p-text>

- <p-text color="notification-neutral">Some text</p-text>
+ <p-text color="notification-info">Some text</p-text>
```

##### ToastManager:

- Prop value `neutral` of `state` parameter is deprecated.

```diff
- …addMessage({ text: `Some message`, state: 'neutral' })
+ …addMessage({ text: `Some message`, state: 'info' })
```

### Added

- `Display` component
- `Heading` component
- Prop `underline` for `Link Pure`
- Prop `theme` for `Checkbox Wrapper`, `Radio Button Wrapper`, `Popover`, `Tag Dismissible`, `Textarea Wrapper`,
  `Text Field Wrapper` and `Fieldset Wrapper`
- Prop `size` for `Icon` supports `x-small` and `x-large`
- Prop `size` for `Accordion` `compact="true"` supports `medium`

### Changed

- `Spinner`, `Icon`, `Link Pure`, `Button Pure`, `Link`, `Link Social`, `Button`, `Checkbox Wrapper`,
  `Radio Button Wrapper`, `Popover`, `Modal`, `Select Wrapper`, `Tag`, `Tag Dismissible`, `Textarea Wrapper`,
  `Inline Notification`, `Banner`, `Toast`, `Grid`, `Flex`, `Pagination`, `Scroller`, `Accordion`, `Text`,
  `Text Field Wrapper`, `Content Wrapper`, `Segmented Control`, `Tabs`, `Tabs Bar`, `Headline` and `Fieldset Wrapper`
  match new design language
- `Icon` supports
  `primary | contrast-low | contrast-medium | contrast-high | notification-success | notification-warning | notification-error | notification-info | inherit`
  for `color` prop
- Default value of prop `width` of `Banner` has changed from `basic` to `extended`
- Default value of prop `action-icon` of `Inline Notification` has changed from `arrow-head-right` to `arrow-right`
- Default value of prop `name` of `Icon` has changed from `arrow-head-right` to `arrow-right`
- Default value of prop `variant` of `Link` and `Button` has changed from `secondary` to `primary`

#### Removed

- Custom slotted CSS for mostly all components. Equivalent styles are now provided by `getInitialStyles()` partial
  instead.
- `applyNormalizeStyles` option from `getInitialStyles()` partial which is applied by default now.

## [2.20.0] - 2023-02-06

## [2.20.0-rc.1] - 2023-02-06

## [2.20.0-rc.0] - 2023-01-30

### Added

- `applyNormalizeStyles` option for `getInitialStyles()` partial which includes basic css styles for Light DOM

## [2.19.1-rc.1] - 2023-01-18

### Added

- `jsdom-polyfill` subpackage is available at `@porsche-design-system/components-{js|angular|react|vue}/jsdom-polyfill`
  and can be used to have working web components in jsdom based tests (e.g. jest)
- `testing` subpackage is available at `@porsche-design-system/components-{js|angular|react|vue}/testing` to provide
  `getByRoleShadowed`, `getByLabelTextShadowed` and `getByTextShadowed` utilities which use `@testing-library/dom`
  queries internally to support Shadow DOM
- Validation if `prefix` is already reserved by a different version upon initialization of the Porsche Design System

### Fixed

- `componentsReady()` waits for Porsche Design System being initialized before checking components which can happen in
  certain test scenarios without partials

## [2.19.1-rc.0] - 2023-01-18

### Fixed

- Bug in `@porsche-design-system/components-react/ssr` where in some cases during SSG an error was thrown when
  components render their children conditionally

## [2.19.0] - 2022-12-22

## [2.19.0-rc.2] - 2022-12-22

## [2.19.0-rc.1] - 2022-12-22

### Fixed

- `Stepper Horizontal` calculation of scroll position when used within any parent that has a margin or padding

## [2.19.0-rc.0] - 2022-12-21

### Added

- Vue: typed components are available via the `@porsche-design-system/components-vue` package

### Fixed

- `Modal` focus cycle when pressing Shift Tab right after it was opened

## [2.18.0] - 2022-12-15

## [2.18.0-rc.2] - 2022-12-14

### Added

- Validation to ensure crucial partials are used.  
  **Disclaimer:** The Porsche Design System will **not** inject its initial styles anymore. Please use the
  `getInitialStyles()` partial to reduce flash of unstyled content (FOUC) as described here:
  [getInitialStyles() documentation](https://designsystem.porsche.com/v2/partials/initial-styles)

### Changed

- `line-height` calculation for all components is handled CSS only now by using `ex`-unit in combination with `calc()`
  which gives the best performance, the easiest possible integration and respects UI best practices in having **larger**
  `line-height` values for **small** `font-size` definitions and **smaller** `line-height` values for **larger**
  `font-size` definitions. The calculated values by CSS slightly differ compared to the ones calculated by JavaScript,
  which might result in minor visual changes.

### Fixed

- Screen reader announcements of `Textfield` and `Textarea` in `counter` mode
- Screen reader announcements in `Select Wrapper`

## [2.18.0-rc.1] - 2022-11-24

### Added

- `Carousel` now has a `rewind` property, better prev/next icons, a `max-width` for `heading` and `description` and
  support for slotted `description`

### Fixed

- `Select Wrapper` height if text is zoomed up to 200%

## [2.18.0-rc.0] - 2022-11-17

### Added

- SSR/SSG ready components using Declarative Shadow DOM for Next JS are shipped via
  `@porsche-design-system/components-react/ssr`. To use it simply change your imports.

**Important:** make sure to apply the new `getDSRPonyfill()` partial right before your closing `</body>` tag. More
information can be found here:
[getDSRPonyfill() documentation](https://designsystem.porsche.com/v2/partials/dsr-ponyfill)

```diff
- import { PorscheDesignSystemProvider, PButton, ... } from '@porsche-design-system/components-react';
+ import { PorscheDesignSystemProvider, PButton, ... } from '@porsche-design-system/components-react/ssr';
+ import { getDSRPonyfill } from '@porsche-design-system/components-react/partials';
```

### Changed

- Improve height calculation for `Accordion`
- Slotted anchor support for `Link Pure` is stricter (In case slotted `<a>` is used it must be a direct child of
  `Link Pure`)
- `getFontLinks()` partial now has `{ weights: ['regular', 'semi-bold'] }` for a default

## [2.17.0] - 2022-10-31

## [2.17.0-rc.0] - 2022-10-31

### Added

- `Link Tile`

### Fixed

- `Scroller` bug where scrollable content was not fully hidden by the gradient, when zoomed into the page.

### Changed

- Removed `!important` keyword from css property `display` of `Link Pure` and `Button Pure`

## [2.16.3] - 2022-10-21

## [2.16.3-rc.0] - 2022-10-21

### Fixed

- `Button Pure` and `Link Pure` error when using `size="inherit"` and `icon="none"`

### Changed

- Replaced all internal usage of `Text` and `Headline` components

## [2.16.2] - 2022-09-15

## [2.16.2-rc.0] - 2022-09-15

### Fixed

- Issue with `Popover` where drop-shadow is not shown correctly in Chrome >= 105
- Issue with `Carousel` and `wrap-content="true"` where the layout was out of sync with `Content Wrapper` for
  viewports >= 1760px.
- `Select Wrapper` with custom dropdown keeps attribute changes of native select options in sync if changed
  programmatically

## [2.16.1] - 2022-09-09

### Fixed

- Issue with `Options` typing import for `Carousel`

## [2.16.0] - 2022-09-08

## [2.15.1-rc.1] - 2022-09-08

### Added

- `Carousel`
- `Scroller`

### Changed

- `Stepper Horizontal` now has `size` property
- `Stepper Horizontal` uses improved focus behavior in case it becomes scrollable and scroll indicators are centered
  correctly.
- `Tabs Bar` uses improved focus behavior in case it becomes scrollable and scroll indicators are centered correctly.

## [2.15.1-rc.0] - 2022-08-24

### Fixed

- `Radio Button Wrapper` visual selection change bug in Safari >= 15.5

## [2.15.0] - 2022-08-22

## [2.15.0-rc.1] - 2022-08-18

### Changed

- Downgraded `@angular` to `v13` to ensure backwards compatibility of `@porsche-design-system/components-angular`

## [2.15.0-rc.0] - 2022-08-16

### Fixed

- `Popover` visual shadow bug in Safari
- `Stepper Horizontal Item` bug where pseudo styles of the counter element were overridable

## [2.15.0-beta.0] - 2022-08-05

### Fixed

- `Tabs` & `Tabs Bar` `size` property when using `BreakpointCustomizable`

### Changed

- `Modal` uses poly fluid sizing for outer spacing
- `Banner` uses poly fluid sizing for outer spacing
- `Content Wrapper` uses poly fluid sizing for inner spacing
- `Modal` min-width is slightly updated to perfectly fit into content area of `Content Wrapper` at 320px viewport width

### Added

- Validation of properties for all components
- `Text Field Wrapper` with `input type="search"` is clearable via Escape key and custom clear button across browsers
- `Text Field Wrapper` with `input type="search"` shows a "Locate me" button when `actionIcon="locate"` is set, emits
  the `action` event on click and can be put into a loading state via `actionLoading="true"`

## [2.14.0] - 2022-07-11

## [2.14.0-rc.1] - 2022-07-11

## [2.14.0-rc.0] - 2022-07-11

### Added

- `getBrowserSupportFallbackScript()` partial supporting `cdn` and `format` options as replacement for
  `includeOverlay()` of `@porsche-design-system/browser-notification` npm package
- `getCookiesFallbackScript()` partial supporting `cdn` and `format` options as replacement for `includeCookieOverlay()`
  of `@porsche-design-system/browser-notification` npm package

### Changed

- `getMetaTagsAndIconLinks()` partial to return `theme-color` meta tags with `prefers-color-scheme: {light|dark}` media
  query

## [2.13.0] - 2022-06-23

## [2.13.0-rc.5] - 2022-06-23

### Fixed

- `Stepper Horizontal Item` `state` validation
- `Button` and `Link` with `theme="dark" variant="tertiary"` and `Tag Dismissible` bug on Safari < v15.5 where wrong
  colors on hover were shown

## [2.13.0-rc.4] - 2022-06-22

### Added

- `Stepper Horizontal`

## [2.13.0-rc.3] - 2022-06-22

### Added

- `Segmented Control`

## [2.13.0-rc.2] - 2022-06-21

## [2.13.0-rc.1] - 2022-06-21

## [2.13.0-rc.0] - 2022-06-21

### Changed

- `Button`, `Button Pure` and `Switch` apply `aria-disabled="true"` instead of `disabled` attribute to native button
  internally in case `disabled` and/or `loading` property is set

## [2.12.1] - 2022-05-25

## [2.12.1-rc.0] - 2022-05-25

### Fixed

- Issue with `JssStyle` typing import

## [2.12.0] - 2022-05-19

### Changed

- npm package is prepared for public release on [npmjs.org](https://npmjs.com)

## [2.12.0-rc.2] - 2022-05-12

## [2.12.0-rc.1] - 2022-05-11

## [2.12.0-rc.0] - 2022-05-04

### Added

- `Table Head Cell` now has a `multiline` property

### Changed

- `Headline` has no `hypens` / `overflow-wrap` style by default
- Partials now throw an exception if they are executed in browser

### Fixed

- Exception in `Headline`, `Select Wrapper`, `Text` and `Text List` when changing `theme` prop from `dark` to `light`
- `getInitialStyles()` partial now returns `.hydrated` styles, too

## [2.11.0-skeletons] - 2022-04-21

## [2.11.0] - 2022-04-21

## [2.11.0-rc.0] - 2022-04-20

### Added

- `Tag`
- `Tag Dismissible`

## [2.10.0-skeletons] - 2022-04-13

## [2.10.0] - 2022-04-13

## [2.9.3-rc.1] - 2022-04-06

### Added

- `Text Field Wrapper` now has a `showCharacterCount` property which can be used to hide the character count when a
  `maxLength` attribute is set on the wrapped `input`.
- `Textarea Wrapper` now has a `showCharacterCount` property which can be used to hide the character count when a
  `maxLength` attribute is set on the wrapped `textarea`.

## [2.9.3-rc.0-skeletons] - 2022-03-29

## [2.9.3-rc.0] - 2022-03-28

### Added

- `Text Field Wrapper` supports `unit` property on `input type="text"`
- `Marque` optional configurable clickable/focusable area by defining padding on host element

### Fixed

- `Tabs Item` improved accessibility
- Angular: circular dependency in development mode in `2.9.2-skeletons`

## [2.9.2-skeletons] - 2022-03-24

### Added

- **[EXPERIMENTAL]** `getInitialStyles` partial now accepts a `skeletonTagNames` array of component names that will
  initially have skeleton styles while the Porsche Design System is loading
- **[EXPERIMENTAL]** `Button`, `Button Pure`, `Checkbox Wrapper`, `Fieldset Wrapper`, `Link`, `Link Pure`,
  `Link Social`, `Radio Button Wrapper`, `Select Wrapper`, `Text Field Wrapper`, `Textarea Wrapper` can now have initial
  skeleton styles when passed as `skeletonTagNames` to the `getInitialStyles` partial

## [2.9.2] - 2022-03-24

## [2.9.2-rc.1] - 2022-03-23

### Fixed

- Bug caused by Chrome where hover styles of `Link Pure` are not displayed correctly

## [2.9.2-rc.0] - 2022-03-22

### Added

- Normalized font behavior (`hyphen`, `overflow-wrap` and `text-size-adjust`) across components

### Fixed

- `Modal` scrolling and pinch to zoom on iOS
- `Modal` initial position if scrollable
- `Table Head Cell` sort icon `asc` + `desc`

## [2.9.1] - 2022-03-10

## [2.9.1-rc.0] - 2022-03-09

### Added

- Styles for slotted `<button>` in `Text`

### Changed

- `Modal` heading and aria validation happens only when open

### Fixed

- React: bundling format of partials

## [2.9.0] - 2022-02-28

## [2.9.0-rc.1] - 2022-02-25

### Fixed

- `Modal` focus trap respecting elements in shadow DOM and dynamically added/removed elements on first level
- `Tabs Item` focus outline on click in Safari
- Error while using partials in Vanilla JS and Angular

## [2.9.0-rc.0] - 2022-02-16

### Added

- `getFontFaceStylesheet` returns additional `<link>` tags with `rel="preconnect"` and `rel="dns-prefetch"`
- Option `format` to partials `getFontFaceStylesheet`, `getComponentChunkLinks()`, `getFontLinks()`, `getIconLinks()`,
  `getInitialStyles()`, `getLoaderScript()` and `getMetaTagsAndIconLinks()`

#### Deprecated

- The option `withoutTags` of partials `getFontFaceStylesheet`, `getComponentChunkLinks()`, `getFontLinks()`,
  `getIconLinks()`, `getInitialStyles()`, `getLoaderScript()` and `getMetaTagsAndIconLinks()` is deprecated and will be
  removed in `v3.0.0`. Please use `format: 'jsx'` instead.

```diff
- <link rel="stylesheet" href={getFontFaceStylesheet({ withoutTags: true })} crossOrigin="true" />
+ {getFontFaceStylesheet({ format: 'jsx' })}
```

## [2.9.0-beta.1] - 2022-01-27

### Added

- `:focus-visible` content of selected Tab in `Tabs` component gets focus styling
- Improved accessibility of `Text Field Wrapper` and `Textarea Wrapper` when `maxlength` attribute is set
- `Modal` aria property
- `Modal` class for slotted elements to make content full-width

### Changed

- `Button Pure` and `Link Pure` removed `position: relative` imposition, make sure to **not** override it with
  `position: static`

### Fixed

- `Modal` close button styles when no heading is passed

## [2.9.0-beta.0] - 2022-01-18

### Added

- React: `getByRoleShadowed`, `getByLabelTextShadowed` and `getByTextShadowed` utilities which uses
  `@testing-library/dom` queries internally to support Shadow DOM

### Fixed

- React: `UnhandledPromiseRejectionWarning` when using `skipPorscheDesignSystemCDNRequestsDuringTests()`

## [2.8.0] - 2022-01-17

### Fixed

- Accessibility issue of `Icon` component in Windows High Contrast Mode in Chromium Browser

## [2.8.0-rc.0] - 2022-01-14

### Added

- Support for `tabindex` attribute on `Button`, `Button Pure`, `Switch`, `Link`, `Link Pure` and `Link Social`

### Changed

- `:focus-visible` style matches outline color of `Button` while hovered

#### Deprecated

- The `tabbable` property of `Button`, `Button Pure` and `Switch` is deprecated and will be removed in `v3.0.0`. Please
  use `tabindex` instead.

```diff
- <p-button tabbable="false">Some button</p-button>
+ <p-button tabindex="-1">Some button</p-button>
```

## [2.8.0-beta.3] - 2021-12-22

### Added

**Disclaimer:** The provided themes `light-electric` and `dark-electric` are just a proof of concept, it's **not**
accessible regarding its color contrast and might even be removed in an upcoming major release again.

- `light-electric` theme for `Switch`
- `dark-electric` theme for `Button Pure` and `Link Pure`
- Character counter to `Text Field Wrapper` and `Textarea Wrapper` if `maxlength` is present on `input type="text"` and
  `textarea`

### Changed

- `:focus-visible` style matches outline color of `Switch` while hovered

### Fixed

- Box model of `Button Pure`

## [2.8.0-beta.2] - 2021-12-22

### Fixed

- `Content Wrapper` regression for `!important` style

### Added

- Usage validation for `Link`, `Link Pure` and `Link Social`

## [2.8.0-beta.1] - 2021-12-16

### Fixed

- `Select Wrapper` validation of select element

## [2.8.0-beta.0] - 2021-12-15

### Changed

- Angular: increased peer dependency to `>=12.0.0 <14.0.0`

## [2.7.0] - 2021-12-14

## [2.7.0-rc.0] - 2021-12-14

#### Removed

- `offset-bottom` prop of `Toast` (use `--p-toast-position-bottom` CSS variable instead)

## [2.7.0-beta.6] - 2021-12-08

### Added

- `Popover`

## [2.7.0-beta.5] - 2021-12-07

### Added

**Disclaimer:** The provided theme `light-electric` is just a proof of concept, it's **not** accessible regarding its
color contrast and might even be removed in an upcoming major release again.

- `light-electric` theme for `Accordion`, `Link`, `Link Pure`, `Button`, `Button Pure`, `Tabs`, `Tabs Bar`

## [2.7.0-beta.4] - 2021-12-02

## [2.7.0-beta.3] - 2021-11-30

### Added

- `Accordion` uses `MutationObserver` fallback when no `ResizeObserver` is available in older browsers

### Fixed

- `Link` and `Link Social` not adapting slotted anchor to the width of the element

## [2.7.0-beta.2] - 2021-11-24

### Added

- `Toast`

### Fixed

- `Banner` animations respect offset correctly

## [2.7.0-beta.1] - 2021-11-16

### Fixed

- `Headline` applies `align` and `ellipsis` prop correctly

## [2.7.0-beta.0] - 2021-11-11

### Added

- New `aria` property for `ARIA` attribute handling for: `Button`, `Button Pure`, `Icon`, `Link`, `Link Pure`, `Marque`,
  `Spinner`

### Fixed

- React: warnings about `useLayoutEffect` in SSR context

## [2.6.1] - 2021-11-05

### Fixed

- Prevent breaking entire Porsche Design System due to lacking support of `ResizeObserver`, however `Accordion` still
  requires it

## [2.6.0] - 2021-11-04

### Added

- `unit` and `unitPosition` properties to `Text Field Wrapper`

## [2.6.0-beta.0] - 2021-10-29

### Changed

- Use `Heiti SC` (pre-installed on iOS/macOS) and `SimHei` (pre-installed on Windows) as Chinese fallback font

### Added

- `Marque` uses `webp` images for browsers that support it
- `Inline Notification`
- `Icon` now supports `success` for `name` property

### Fixed

- Colors of `Banner` for dark theme
- Replaced CSS `inset` property with `top`, `left`, `right` and `bottom` for browser compatibility
- Opening and closing transition of `Modal`

## [2.5.1-beta.0] - 2021-10-11

### Fixed

- Possible exceptions when components get unmounted directly

## [2.5.0] - 2021-10-04

### Added

- `SimHei` and `黑体` as fallback for all components' `font-family`

## [2.5.0-beta.1] - 2021-09-28

### Changed

- React: improved render behavior of components

## [2.5.0-beta.0] - 2021-09-22

### Added

- React: utility function `skipPorscheDesignSystemCDNRequestsDuringTests`

## [2.4.0] - 2021-09-21

## [2.4.0-beta.2] - 2021-09-21

### Added

- `Link Social` and `Icon` now support `kakaotalk`, `naver`, `reddit` and `tiktok`
- JSS caching mechanism to improve style performance

### Changed

- Alignment of `linkedin` icon
- Improved accessibility of `Select Wrapper`
- `Icon` loading behaviour to non-blocking, components using the `Icon` will no longer wait for it to load
- Validation messages of `Fieldset Wrapper` have now an additional icon representing the validation state

### Fixed

- Box model of `Link Pure`
- Focus of `Link Pure` with slotted anchor and hidden label
- Focus cycling of `Modal` without focusable children
- Suppress CORS error

## [2.4.0-beta.1] - 2021-08-26

### Added

- `active` property to `Button Pure`

## [2.4.0-beta.0] - 2021-08-26

### Added

- `icon` property of `Button Pure` and `Link Pure` was extended by `none` value
- `alignLabel` and `stretch` property to `Button Pure` and `Link Pure`

### Changed

- Improved `:focus-visible` and `:hover:focus-visible` colors for `Link Social` and `Link`
- Improved slotted `<a>` coloring in dark theme for `Link Social` and `Link`
- Validation messages of `Checkbox Wrapper`, `Radio Button Wrapper`, `Select Wrapper`, `Textarea Wrapper` and
  `Text Field Wrapper` have now an additional icon representing the validation state
- `Modal` backdrop behavior to close modal on mouse-down

### Fixed

- Slotted `<a>` coloring in dark theme for `Text`, `Headline`, `Text List`, `Banner`, `Select Wrapper` and `Link Pure`
- Wrong background color of scrollable `Modal`'s backdrop in Safari

## [2.3.0] - 2021-07-28

## [2.3.0-beta.3] - 2021-07-28

### Changed

- `Accordion` reduce paddings, vertically align carets to the first heading row, adjust border color and hover styles

### Fixed

- `Text Field Wrapper` accessibility of type password and search

## [2.3.0-beta.2] - 2021-07-15

### Added

- `Checkbox Wrapper`, `Radio Button Wrapper`, `Select Wrapper`, `Textarea Wrapper` and `Text Field Wrapper` now reflect
  changes of the `required` attribute on their child component
- `multiline` property to `Table Cell`
- Partial function `getLoaderScript()` to initialize Porsche Design System as early as possible

### Fixed

- `Table Head Cell` uses semi bold instead of bold as font weight
- Transition of `Modal`

## [2.3.0-beta.1] - 2021-07-08

### Added

- `Accordion`

### Changed

- Removed initial delay of `Banner`

## [2.3.0-beta.0] - 2021-07-01

### Added

- `Table`
- Angular: export types from package root
- Accessibility icon

### Changed

- `Button`, `Button Pure` and `Switch` are now focusable while in `loading` state
- `Text` and `Headline` inherits white-space CSS property
- React: sync component props via property instead of attribute

### Fixed

- Angular: support `"strictTemplates": true` option in `tsconfig.json`
- Use correct icon for `arrow-last` and `arrow-first` in `Icon`, `Button` and `Link` components

## [2.2.1] - 2021-06-08

### Changed

- Optimize vertical alignment of `Modal`

### Fixed

- URL in inject global style warning

## [2.2.1-beta.1] - 2021-06-02

### Fixed

- Margin of `Tabs Bar` within `Tabs` for Firefox and Safari
- SVG of `Icon` is not removed after prop change, e.g. on color change
- Fullscreen behavior of `Modal` on screens larger than 1760px

## [2.2.0] - 2021-05-19

### Fixed

- `Text` inside `Button` now has the proper size on iOS Safari when changing to and from landscape mode
- `Banner` can now be re-opened after closing
- Closing one `Banner` will not close other `Banners` on the site

## [2.2.0-beta.2] - 2021-05-12

### Fixed

- `Select Wrapper` value changes are now reflected correctly
- `Select Wrapper` dark theme background color if used with `filter` prop

## [2.2.0-beta.1] - 2021-05-05

### Added

- Partial function `getIconLinks()` to preload Porsche Design System Icons

### Fixed

- `Text Field Wrapper` spacing in Safari

## [2.2.0-beta.0] - 2021-05-05

### Added

- Partial function `getMetaTagsAndIconLinks()` to simplify cross device fav and meta icons

## [2.1.0] - 2021-05-03

## [2.1.0-beta.0] - 2021-05-03

### Added

- `Switch`

### Changed

- `Text` automatically breaks words/strings into new line being too long to fit inside their container
- `Headline` automatically breaks words/strings into new line being too long to fit inside their container
- Extended `Fieldset Wrapper` with `labelSize`, `required`, `state` and `message` properties. If the `Fieldset Wrapper`
  is set to required only the label of the **Fieldset Wrapper** gets an asterisk. It is removed from all wrapped child
  components, as long as they are Porsche Design System form elements.

## [2.0.3] - 2021-04-28

## [2.0.3-beta] - 2021-04-28

### Fixed

- Angular: events firing twice in `Pagination`, `Modal`, `Tabs`, `Tabs Bar` and `Banner` component

## [2.0.2] - 2021-04-21

## [2.0.2-beta.0] - 2021-04-20

### Fixed

- TypeScript build errors due to duplicate declarations in `types.d.ts`

## [2.0.1] - 2021-04-16

### Fixed

- Visual appearance of `Checkbox Wrapper` in iOS Safari
- A bug where `Text Field Wrapper` would throw an error when reattaching to DOM too quickly
- Visual bug in Firefox when zooming out `Text Field Wrapper`, `Checkbox Wrapper` and `Textarea Wrapper`
- Angular: streamline component styles in dark theme

### Changed

- Aligned focus states of `Checkbox Wrapper` and `Radio Button Wrapper` across browsers

## [2.0.0] - 2021-04-13

In keeping with [Semver](https://semver.org), Porsche Design System v2.0.0 was released due to changes in the API,
fundamental changes in loading behavior and others. With our new major version `v2.0.0` there are some important changes
that you should watch out for. To make the migration from `v1.5.x` to our current `v2.0.0` easier, we offer a few
guidelines.

## General changes / improvements:

### All components, icons, fonts, styles and marque of the Porsche Design System are loaded versioned and chunked from a central CDN

This way all web based digital Porsche products share and use the cached and versioned assets regardless of the JS
framework used to improve loading performance across the Porsche group. Only a tiny (1.4kb sized) Porsche Design System
loader script gets bundled into your application code. Everything else gets loaded versioned, cached and chunked from a
central CDN ([read more](https://designsystem.porsche.com/v3/must-know/performance/cdn)). However, this also means that
you will need an **Internet connection** to render the components in a browser (possibly relevant for development stage
or intranet applications).

### Enabling Micro Frontend Architecture

In case of a micro-frontend architecture, multiple instances and versions of the Porsche Design System can be combined
in a final application by configurable prefixing technique of the Porsche Design System components during runtime.
Please refer to our framework specific guidelines
[Vanilla JS](https://designsystem.porsche.com/v2/start-coding/vanilla-js),
[Angular](https://designsystem.porsche.com/v2/start-coding/angular) and
[React](https://designsystem.porsche.com/v2/start-coding/react).

### Prevent Flash of Unstyled Content (FOUC) and Flash of Unstyled Text (FOUT)

To prevent FOUC/FOUT, the Porsche Design System offers various partials as part of the
`@porsche-design-system/components-{js|angular|react}` package to ensure all necessary Porsche Design System fonts and
components are fully loaded. If you've used the `@porsche-design-system/partials` package previously, stop using it and
replace the integration with the partials provided by `@porsche-design-system/components-{js|angular|react}` package.
Have a look at our [FOUC/FOUT guidelines](https://designsystem.porsche.com/v3/must-know/performance/loading-behaviour).

```diff
- <%= require('@porsche-design-system/partials').getPorscheDesignSystemCoreStyles() %>
+ <%= require('@porsche-design-system/components-{js|angular|react}/partials').getInitialStyles() %>

- <%= require('@porsche-design-system/partials').getFontFaceCSS() %>
+ <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontFaceStylesheet() %>

- <link rel="preload" href="path/to/webfont/nameOfWebFontFile" as="font" type="font/woff2" crossorigin />
+ <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontLinks({ weights: ['regular', 'semi-bold'] }) %>
```

### Added support for China CDN

Our CDN is configured to forward requests to Chinese CDN automatically when necessary. So you're good to go without any
configuration or multiple region specific builds of your application. However, if you are aiming for the maximum
possible performance in China, you can configure which CDN the Porsche Design System must use. Please follow our
[CDN guidelines](https://designsystem.porsche.com/v3/must-know/performance/cdn) for more information.

### New/optimized components

- **Tabs**
- **Tabs Bar**
- **Banner**
- **Modal**
- Headline
- Select
- Pagination
- Button
- Button Pure
- Link
- Link Pure
- Spinner
- Checkbox
- Radio Button

### Improved TypeScript support for Angular and React

To ensure the best possible typing support, we have refactored our Angular and React wrappers which integrate the native
web components of the Porsche Design System.

### componentsReady() works reliable

Because the Porsche Design System components get loaded async at the time they are needed, it might be relevant within
your application or test automation to know when those have been initialized. Therefore, we provide in all three
`@porsche-design-system/components-{js|angular|react}')` packages a reliable helper function `componentsReady()`.
[Read more about it](https://designsystem.porsche.com/v3/developing/components-ready).

### Removed "blur on focus"

Now focus styling is only applied when you navigate through keyboard and ignored by mouse interaction for browsers
supporting `:focus-visible` otherwise it will fallback to `:focus` CSS implementation.

### Changed focus styling for a better compromise between accessibility and visual appearance

Color and outline of general focus styling has changed to `currentColor` for light/dark theme with an outline of 1px
width/offset. If you have custom components build with the usage of our `@porsche-design-system/utilities` package then
update it to the latest version.

### Improved geometry of Porsche Next font

For better alignment and readability we've changed the geometry of the Porsche Next font which results in a visual
change of font size and spacing.

### Dropped support for IE11 and EdgeHTML according to Porsche's official browser strategy 2021

If you still need to support these browsers, you have to stick to `v1.5.x`. We offer a Browser Notification package
`@porsche-design-system/browser-notification` to alert users that these browsers are no longer supported. It supports a
blocking layer (to be used with Porsche Design System `v2.x`), or a dismissible banner (to be used with Porsche Design
System `v1.x`). Please refer to our
[Browser compatibility guidelines](https://designsystem.porsche.com/v3/must-know/browser-compatibility).

### Changed default type of Button and Button Pure

To be in sync with native `<button>` behavior we've changed the default `type` of **Button** and **Button Pure**
component. Those components will render a button within their Shadow DOM as `<button type="submit">` ( previously
`<button type="button">`).

- `submit`: The button submits the form data to the server. This is the default if the attribute is not specified for
  buttons associated with a `<form>`, or if the attribute is an empty or invalid value.
- `button`: The button has no default behavior, and does nothing when pressed by default. It can have client-side
  scripts listen to the element's events, which are triggered when the events occur.

### Changed support for wrapped links around Link, Link Pure and Link Social component

Due to the support for setting links (`<a href="#">`) in our **Link**, **Link Pure** and **Link Social** components as
child, we've removed support for styling the anchor tag (`<a>`) when it surrounds the component. So we recommend
changing the position of the `<a>` tag from wrapping the component to a direct slot (child) of it.

```diff
- <a href="#"><p-link>Some label</p-link></a>
+ <p-link><a href="#">Some label</a></p-link>

- <a href="#"><p-link-pure>Some label</p-link-pure></a>
+ <p-link-pure><a href="#">Some label</a></p-link-pure>

- <a href="#"><p-link-social>Some label</p-link-social></a>
+ <p-link-social><a href="#">Some label</a></p-link-social>
```

### Automatic \* asterisk symbol to form field labels

We added an automatic generated _ asterisk symbol to form field labels which have the required attribute. This might
lead to a doubled _ symbol if you set one by yourself.

```diff
- <p-text-field-wrapper label="Some label *"><input type="text" name="some-name" required /></p-text-field-wrapper>
+ <p-text-field-wrapper label="Some label"><input type="text" name="some-name" required /></p-text-field-wrapper>

- <p-checkbox-wrapper label="Some label *"><input type="checkbox" name="some-name" required /></p-checkbox-wrapper>
+ <p-checkbox-wrapper label="Some label"><input type="checkbox" name="some-name" required /></p-checkbox-wrapper>

- <p-radio-button-wrapper label="Some label *"><input type="radio" name="some-name" required /></p-radio-button-wrapper>
+ <p-radio-button-wrapper label="Some label"><input type="radio" name="some-name" required /></p-radio-button-wrapper>

- <p-radio-button-wrapper label="Some label *"><input type="radio" name="some-name" required /></p-radio-button-wrapper>
+ <p-radio-button-wrapper label="Some label"><input type="radio" name="some-name" required /></p-radio-button-wrapper>

- <p-textarea-wrapper label="Some label *"><textarea name="some-name" required></textarea></p-textarea-wrapper>
+ <p-textarea-wrapper label="Some label"><textarea name="some-name" required></textarea></p-textarea-wrapper>

- <p-select-wrapper label="Some label *"><select name="some-name" required><option>A</option></select></p-select-wrapper>
+ <p-select-wrapper label="Some label"><select name="some-name" required><option>A</option></select></p-select-wrapper>
```

### Shadow DOM

`Flex`, `Flex Item`, `Grid` and `Grid Item` now use Shadow DOM, thus you are not able to overwrite styles defined by
these components any longer.

---

## Angular

### Integration of Angular components

In the past it was possible to provide a token called `PREVENT_WEB_COMPONENTS_REGISTRATION` which prevented the
registration of the Porsche Design System components and loading of polyfills. Due to the fact that we no longer provide
/ need poly filling, we have completely removed the token. For advanced usage please
[read further](https://designsystem.porsche.com/v2/start-coding/angular).

---

## React

### Integration of React components

In the past `@porsche-design-system/components-react` components have initialized the **Porsche Design System Loader**
automatically as soon as a component was imported. With `v2.x` you have to import the `PorscheDesignSystemProvider` once
in your `index.tsx` which then initializes the **Porsche Design System Loader**, e.g. like:

```diff
  // index.tsx

  import ReactDOM from 'react-dom';
  import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
  import { App } from './App';

  ReactDOM.render(
    <React.StrictMode>
+     <PorscheDesignSystemProvider>
        <App />
+     </PorscheDesignSystemProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
```

For advanced usage please [read further](https://designsystem.porsche.com/v2/start-coding/react).

#### Jsdom Polyfill for React / Jest / jsdom test automation

We removed test mocks for React / Jest / jsdom as Shadow DOM is supported since jsdom v12.2.0. Instead, we provide a
Jsdom Polyfill (exclusivly for `@porsche-design-system/components-react` package) fixing missing implementation of jsdom
which the Porsche Design System relies on. **Note:** If your test includes Porsche Design System components, make sure
to wrap the component you want to test with a PorscheDesignSystemProvider in order to avoid exceptions. For more
information please [read further](https://designsystem.porsche.com/v2/start-coding/react).

---

## Vanilla JS

### Integration of Vanilla JS components

With `v1.x` of the Porsche Design System you've had to copy all needed JS files of
`@porsche-design-system/components-js` into your target directory and include the ES5 and ESM loader snippet. Now you
only need to copy one `index.js` file and initialize the Porsche Design System like in the example below:

```diff
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title>Porsche Design System</title>
-     <script nomodule src="PATH/TO/PACKAGE/@porsche-design-system/components-js/dist/porsche-design-system/porsche-design-system.js"></script>
-     <script type="module" src="PATH/TO/PACKAGE/@porsche-design-system/components-js/dist/porsche-design-system/porsche-design-system.esm.js"></script>
+     <script src="PATH/TO/PACKAGE/@porsche-design-system/components-js/index.js"></script>
    </head>
    <body>
+     <script type="text/javascript">
+       porscheDesignSystem.load();
+     </script>
      <p-headline variant="headline-1">Some text</p-headline>
    </body>
  </html>
```

For advanced usage please [read further](https://designsystem.porsche.com/v2/start-coding/vanilla-js).

---

## [2.0.0-rc.10] - 2021-04-12

### Changed

- `Tabs` and `Tabs Bar` now respect dynamic additions / removals of `p-tabs-item`, `a` and `button` elements. Make sure
  to update the `activeTabIndex` when mutating elements
- Improved performance of `Text`, `Button Pure` and `Link Pure` when `size` is not `inherit`

### Added

- `Grid` now has a `wrap` and `gutter` property
- Components (`Grid Item`, `Flex Item`, `Tabs Item` and `Text List Item`) that require a specific parent (`Grid`,
  `Flex`, `Tabs` and `Text List`) will now throw an error if used without that parent

### Fixed

- Visual appearance of `Checkbox Wrapper` and `Radio Button Wrapper` reflect the state of the wrapped `input` element

## [2.0.0-rc.9] - 2021-03-26

### Added

- `Button Group` component
- Fullscreen property for `Modal` on mobile

### Changed

- Spacings, heading and sizes of `Modal`

### Fixed

- Prevent duplicate loading of `porsche-design-system.v2.x.HASH.js` chunk when using `getComponentChunkLinks()` partial

## [2.0.0-rc.8] - 2021-03-17

### Added

- Support for full height `Content Wrapper` with flex
- `Tabs Bar` now supports `undefined` as `activeTabIndex`

### Changed

- `Tabs Bar` has a new default `activeTabIndex`, which is `undefined`
- `Tabs Bar` does not work by itself anymore. The `activeTabIndex` needs to be controlled from the outside
  ([read more](https://designsystem.porsche.com/v2/components/tabs-bar/examples))
- Background Color of `Select Wrapper` in `dark` theme to meet accessibility criteria

## [2.0.0-rc.7] - 2021-03-15

### Fixed

- Make shadowed `Flex` and `Grid` work in Firefox + Safari

## [2.0.0-rc.6] - 2021-03-11

### Changed

- Make `Grid` and `Grid Item` use Shadow DOM
- Make `Flex` and `Flex Item` use Shadow DOM

## [2.0.0-rc.5] - 2021-03-09

### Added

- Configurable background color of `Content Wrapper`
- `italic` font-style in `Text` is now overridden with `normal`

### Fixed

- Usage of `Select Wrapper` within custom elements
- A bug that caused `Spinner` to be displayed in a wrong size

## [2.0.0-rc.4] - 2021-03-01

### Changed

- Filter of `Select Wrapper` supports substring search

### Fixed

- Build error in SSR

## [2.0.0-rc.3] - 2021-02-17

### Added

- React: utility function `skipCheckForPorscheDesignSystemProviderDuringTests`
- React: tree shaking for component wrappers

### Fixed

- Angular: error in `Checkbox Wrapper`, `Radio Button Wrapper` and `Text Field Wrapper` when `input[type]` is bound

## [2.0.0-rc.2] - 2021-02-12

### Added

- Validate usage of `Checkbox Wrapper`, `Radio Button Wrapper`, `Select Wrapper`, `Text Field Wrapper` and
  `Textarea Wrapper`

## [2.0.0-rc.1] - 2021-02-04

### Added

- Partial function `getComponentChunkLinks()` to preload Porsche Design System Components

### Changed

- Added a space before asterisk (`*`) when `input`, `textarea` or `select` have `required` attribute within form wrapper
  components
- Renamed partial `getFontLinks()` option from `weight` to `weights`

### Fixed

- A bug in `Tabs Bar` where the nextButton was mistakenly rendered.
- A bug where `Icon` was not rendered when using `lazy` property.
- A bug in `Text Field Wrapper` with input type password where characters would overlap the icon.

## [2.0.0-rc.0] - 2021-01-29

### Added

- Link support for `Marque`
- Sizing options `'responsive' | 'small' | 'medium'` for `Marque`

### Changed

- Angular: added static `load()` function `PorscheDesignSystemModule` for custom prefix
- Hide up/down spin button when using **Text Field** with `type="number"` in Firefox

### Fixed

- Angular: typings
- React: correct handling of `ref` property
- Unhandled exception in `Select Wrapper` if `selected` and `disabled` attributes are set on the same option
- A bug in `Tabs Bar` where scrolling was broken when a tab was selected
- A bug in `Tabs Bar` where the `nextButton` was always rendered

## [2.0.0-alpha.13] - 2021-01-26

### Added

- Partial function `getFontLinks()` to prevent **Flash of Unstyled Text** (FOUT)

### Fixed

- React: correct handling of `className` property

## [2.0.0-alpha.12] - 2021-01-20

### Added

- Partial function `getInitialStyles()` to prevent **Flash of Unstyled Content** (FOUC)
- Partial function `getFontFaceStylesheet()` to prevent **Flash of Unstyled Text** (FOUT)

### Changed

- React: `PorscheDesignSystemProvider` needs to wrap application
- React: component props have to be camelCase
- React: `PorscheDesignSystemProvider` is needed while testing components

### Fixed

- React: typings
- React: support of objects for property values

#### Removed

- React: `getPrefixedComponents`, prefixing is handled by `PorscheDesignSystemProvider`

## [2.0.0-alpha.11] - 2021-01-08

### Changed

- Precision of relative line height
- Changed color of `neutral contrast low`

## [2.0.0-alpha.10] - 2020-12-14

### Added

- `native` property to `Select Wrapper` to force rendering of native Browser select dropdown
- Extended flexibility of `Headline`

### Changed

- Some styling improvements of `Select Wrapper`

### Fixed

- Jsdom Polyfill `fetch` error

## [2.0.0-alpha.9] - 2020-12-09

### Fixed

- Improved reliability of `componentsReady()`

### Changed

- Jsdom Polyfill `console.warn` behaviour

## [2.0.0-alpha.8] - 2020-12-03

### Fixed

- A bug where `Modal` did not remove `overflow=hidden` on document body.

## [2.0.0-alpha.7] - 2020-11-26

### Added

- Jsdom Polyfill

#### Removed

- Jsdom Mocks
- Global "blur on focus" script

### Changed

- Default dropdown direction of `SelectWrapper` from `down` to `auto`
- Made API of `Tabs` consistent with `Tabs Bar`
- Removed transition for focus styling
- Use `:focus-visible` as default and `:focus` as fallback for focusable elements

### Fixed

- The Selected element of `SelectWrapper` dropdown keeps now in sync with native selection if changed programmatically
- Invalid search results get cleared if `SelectWrapper` becomes focus state
- Some bugs in `TabsBar`
- Minification of dynamic slotted content styles
- An issue where `Pagination` throws console errors if disconnected from dom.

## [2.0.0-alpha.6] - 2020-10-28

### Changed

- default `type` of `Button` and `Button Pure` to `submit`

### Fixed

- Typings

## [2.0.0-alpha.5] - 2020-10-26

### Added

- `Modal` component

### Fixed

- Typing for `pageChange` event of `Pagination` component
- Typings

### Changed

- Focus styling

## [2.0.0-alpha.4] - 2020-10-14

### Added

- Custom filter to `Select Wrapper` component
- DropDown direction property to `Select Wrapper` component
- Display `*` after label when `input`, `textarea` or `select` have `required` attribute within form wrapper components
- `Tabs` component
- `Tabs Bar` component
- `Banner` component

#### Removed

- Default `position: relative;` style of `Link Pure` and `Button Pure`

### Fixed

- `Spinner` zooming bug on Safari

## [2.0.0-alpha.3] - 2020-09-11

### Added

- Support to load assets from China CDN directly via browser flag: `PORSCHE_DESIGN_SYSTEM_CDN = 'cn';`

#### Removed

- Support for `<a>` wrapped `Link` and `Link Pure`

## [2.0.0-alpha.2] - 2020-08-20

## [2.0.0-alpha.1] - 2020-08-17

### Changed

- Removed classnames dependency
- Stencil Core `taskQueue` from `congestionAsync` to `async` for more performant component rendering

### Fixed

- Focus input on label click of `Checkbox Wrapper` and `Radio Button Wrapper`

## [1.5.6] - 2020-10-15

## [1.5.6-rc.0] - 2020-10-13

### Fixed

- `Spinner` zooming bug on Safari

## [1.5.5] - 2020-09-11

## [1.5.5-rc.0] - 2020-09-07

### Changed

- Deprecated stencil lifecycle-method `componentDidUnload` to `disconnectedCallback` to fix "`selectObserver` is
  undefined" bug in `Select Wrapper` and `Pagination`

## [1.5.4] - 2020-08-25

## [1.5.4-rc.0] - 2020-08-17

### Changed

- Removed classnames dependency
- Stencil Core `taskQueue` from `congestionAsync` to `async` for more performant component rendering

### Fixed

- Focus input on label click of `Checkbox Wrapper` and `Radio Button Wrapper`
- Fix typings for `orientation` of `Divider` component

## [2.0.0-alpha.0] - 2020-08-06

### Added

- **Experimental:** Optional web component scoping mechanism during runtime to enable micro service architecture

### Changed

- Web components get lazy loaded from central CDN to improve caching strategy across Porsche's digital eco system

#### Removed

- Stop browser support for **IE11** and **EdgeHTML**

### Fixed

- Mix of `Optgroups` and `Options` on same level in `Select Wrapper` component
- Fix typings for `orientation` of `Divider` component

## [1.5.3] - 2020-08-10

## [1.5.3-rc.0] - 2020-08-10

### Fixed

- Mix of `Optgroups` and `Options` on same level in `Select Wrapper` component

## [1.5.2] - 2020-07-22

### Fixed

- Dispatch change event in `Select Wrapper`
- Stencil react-output-target SSR Bug

## [1.5.1] - 2020-07-20

### Fixed

- SVGO settings for icons
- Angular bug which causes `ngcc` to fail

## [1.5.0] - 2020-07-16

### Added

- Icons (active-cabin-ventilation, battery-full, bell, bookmark, car-battery, charging-active, charging-state, climate,
  climate-control, garage, horn, key, map, parking-brake, parking-light, preheating, send, shopping-bag, sidelights,
  user-manual, wrenches)

### Changed

- Icons (arrow-first, arrow-last, battery-empty, car, card, charging-station, question)

### Fixed

- Porsche Marque images

## [1.5.0-rc.2] - 2020-07-06

## [1.5.0-rc.1] - 2020-07-06

### Added

- **Notification Neutral** color to `color` property of `p-text` and `p-icon`

## [1.5.0-rc.0] - 2020-06-25

### Added

- `Fieldset Wrapper` component
- Improved SEO of `p-headline` and `p-text`: Added possibility to write semantic HTML tags (e.g. `<h1>-<h6>` or `<p>`,
  `<blockquote>`, etc.) directly as slotted content.
- Possibility to include anchor tags directly as slots of `Link`, `Link Pure` and `Link Social`
- `Text` new `weight` property `semibold`
- `Button Pure` label with subline pattern as slot
- `Link Pure` label with subline pattern as slot

### Changed

- `Select Wrapper` is now ready for the catwalk. It is dressed now with a custom drop down list box and gets naked by
  default on touch devices.

### Fixed

- Minor accessibility improvements of `icons` and `Text Field`
- Remove native number spinner buttons of `Text Field` with type text for Firefox
- An issue with `Button` and `Button Pure` and their `disabled` attribute

## [1.4.0] - 2020-05-14

## [1.4.0-rc.3] - 2020-05-08

### Added

- `Text List`

### Changed

- Improve caching strategy for fonts by content-based hash
- Improve caching strategy for marque by content-based hash
- Dimensions and sharpness of marque
- Props for `Content Wrapper`

## [1.4.0-rc.2] - 2020-05-06

### Added

- `Content Wrapper`
- Description property to `p-text-field-wrapper`, `p-textarea-wrapper` and `p-select-wrapper`
- `Link Social`

### Changed

- Improve accessibility of error and success states of form elements
- Aria-invalid attribute of form elements if they are in error state is now managed by component
- Rename icon name `configure` to `configurate` (prevents breaking change compared to stable v1.3.0)
- Improve `p-icon` loading behavior

### Fixed

- Display of wrong icons

#### Removed

- `safe-zone` property of `p-grid` (`Content Wrapper` should be used instead)

## [1.4.0-rc.1] - 2020-04-27

### Added

- Add `safe-zone` property to `p-grid` for outer grid margin, max-width and centering
- Submit button with search icon to `p-textfield-wrapper` type search

### Changed

- Background color of readonly state in components `p-textfield-wrapper` and `p-textarea-wrapper`
- Visual appearance of icons
- Improve caching strategy for icons by content-based hash
- Cursor of Radio, Checkbox and Select
- Fixed naming of Mock from `p-textfield-wrapper` to `p-text-field-wrapper`

### Fixed

- Icon loading mechanism

## [1.4.0-rc.0] - 2020-04-09

### Added

- SSR support

## [1.3.0] - 2020-04-08

### Added

- New headline size `headline-5` to `p-headline`
- Test Mocks

### Fixed

- Text styling of Select component on focus in IE11 and Chrome on Windows 10

## [1.3.0-rc.0] - 2020-04-03

### Fixed

- Improve form elements

## [1.2.0] - 2020-03-25

### Added

- `Divider`
- Hover state for form elements

### Fixed

- Support label text of form elements for Screen readers

## [1.1.2] - 2020-03-17

### Changed

- Notification colors

## [1.1.1] - 2020-03-13

### Changed

- Icon of `Checkbox` indeterminate state

## [1.1.0] - 2020-03-11

### Fixed

- Minor improvements

## [1.1.0-rc.0] - 2020-03-02

### Added

- `Select Wrapper`
- `Checkbox Wrapper`
- `Radio Button Wrapper`
- `Textarea Wrapper`

### Fixed

- `Text Field Wrapper` toggle password visibility

## [1.0.3] - 2020-02-13

### Fixed

- JS framework compatibility

## [1.1.0-0] - 2020-02-06

### Added

- `Text Field Wrapper`

### Changed

- Add proper cursor for disabled state for `Button` and `Button Pure`

## [1.0.2] - 2020-02-04

### Fixed

- Inheritable styling of slotted content

## [1.0.1] - 2020-01-30

### Added

- Clickable area of `Link Pure` and `Button Pure` is optionally configurable by defining padding on host element

## [1.0.0] - 2020-01-28

### Added

- Cursor pointer on hover for `Button` and `Button Pure`
- Line-height gets calculated based on Porsche type-scaling formula automatically for `Text`, `Link Pure` and
  `Button Pure`
- Test helper function `componentsReady()` which indicates when lazy loaded components fully have loaded

### Changed

- Update CDN asset paths
- Improve font-weight definitions
- Rename and optimize neutral colors for `Icon` and `Text`

## [1.0.0-rc.1] - 2019-12-13

### Added

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
