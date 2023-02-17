# Changelog

## Porsche Design System - Utilities **DEPRECATED**

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [Unreleased]

This package is **deprecated** and will no longer be maintained. All `Porsche Design System` utilities are now provided
at`@porsche-design-system/components-{js|angular|react|vue}/styles` in from of styles and Design Tokens. To make the
migration easier, we offer an overview of the old deprecated values in reference to the new design tokens. Further
documentation about the new Design Tokens can be found here https://designsystem.porsche.com/latest/styles/introduction

#### Changed

##### JS

**Functions**

- `focus()` is now `getFocusStyles()`. The parameters have changed as the focus is now handled with `border` and rounded
  edges. You can choose `small` or `medium` for the `borderRadius`. `getFocusStyles()` also excepts an `theme` parameter
  instead of `color`.

```diff
- import { focus } from '@porsche-design-system/utilities'
+ import { getFocusStyles } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

- `breakpoint` `xxs` is now `base`. The values have not changed.
- Instead of `mediaQuery()` we provide now `getMediaQueryMin`, `getMediaQueryMax` and `getMediaQueryMinMax`.
  Furthermore, the functions accept only the predefined PDS breakpoints from `base` to `xxl` and no custom breakpoints
  anymore.

```diff
- import { breakpoint, mediaQuery } from '@porsche-design-system/utilities'
+ import { breakpoint, getMediaQueryMin, getMediaQueryMax, getMediaQueryMinMax } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

- `titleLarge` got renamed to `displayLargeStyle`. The size got adjusted. In addition, we also provide
  `displayMediumStyle`. The new `display` styles differ also, that they are recursive and their size is fluid changing
  depending on the viewport width instead of fixed predefined sizes on specific breakpoints.

```diff
- import { titleLarge } from '@porsche-design-system/utilities'
+ import { displayMediumStyle, displayLargeStyle } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

- `headline` got renamed to `heading{Small|Medium|Large|XLarge|XXLarge|XXXLarge}Style`. The size got adjusted. Same as
  in `display`, the size is now fluid depending on the viewport width instead of fixed predefined sizes on specific
  breakpoints.

```diff
- import { headline1, headline2, headline3, headline4, headline5 } from '@porsche-design-system/utilities'
+ import { headingSmallStyle, headingMediumStyle, headingLargeStyle, headingXLargeStyle, headingXXLargeStyle, headingXXXLargeStyle } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

- `text` got not only renamed but also the size got adjusted. Except `textSmallStyle` all text styles have fluid sizes
  that change depending on the viewport width.

```diff
- import { textXSmall, textSmall, textMedium, textLarge, textXLarge } from '@porsche-design-system/utilities'
+ import { textXSmallStyle, textSmallStyle, textMediumStyle, textLargeStyle, textXLargeStyle, } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

**Colors**

As of v3 of the Porsche Design System the color theme got reworked completely to achieve a monochrome look. To get an
overview ot the new colors have a look at https://designsystem.porsche.com/latest/styles/theme.

As the design tokens for `themeLight` and `themeDark` are in sync, the name changes mentioned below concern both themes
even if only light theme is displayed in the diff.

- `lightTheme` and `darkTheme` got renamed to `themeLight` and `themeDark`. In addition, you can also single import a
  theme if for e.g. you only need `lightTheme`.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme, themeLight, themeDark } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

- `brand` got renamed to `primary`.

```diff
- color.lightTheme.brand
+ themeLight.primary
```

- `default` is removed.

```diff
- color.lightTheme.default
```

- `backgound.default` is renamed to `background.base`.

```diff
- color.lightTheme.background.default
+ themeLight.background.base
```

- `neutralContrast` is renamed to `contrast`.

```diff
- color.lightTheme.neutralContrast.{low|medium|high}
+ themeLight.contrast.{low|medium|high}
```

- `notification.neutral` and `notification.neutralSoft` are renamed to `notification.info` / `notification.infoSoft`.

```diff
- color.lightTheme.notification.neutral
- color.lightTheme.notification.neutralSoft
- themeLight.notification.info
- themeLight.notification.infoSoft
```

- `state.focus` is changed from `currentColor` to a fixed color for depending on the theme.

**Font**

- `fontFamily` is provided as design token

```diff
- import { fontFamily } from '@porsche-design-system/utilities';
+ import { fontFamily } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

- `fontWeight` is provided as design token

```diff
- import { fontWeight } from '@porsche-design-system/utilities';
+ import { fontWeight } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

**Spacings**

As of v3 of the Porsche Design System the spacing concept has shifted to using fluid spacing or static spacing. Spacing
values defined in `rem` are no longer available to avoid waisted space when fonts are scaled. Generally speaking you
should always use the fluid spacings if possible and not leave the predefined spacing range.

To get an overview ot the new spacings have a look at https://designsystem.porsche.com/latest/styles/spacings.

```diff
- import { spacing } from '@porsche-design-system/utilities';
- import { layout } from '@porsche-design-system/utilities';
+ import { spacing, spacingStatic, spacingFluid } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

##### SCSS

// TODO: add banners to scss .md files on storefront

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';
```

**Mixins**

- `p-focus` mixin is now `pds-focus`. The parameters have changed as the focus is now handled with `border` and rounded
  edges. You can choose `small` or `medium` for the `border-radius`. `pds-focus` also excepts an `theme` parameter
  instead of `color`.

```diff
-  @include p-focus;
+  @include pds-focus;
```

- `breakpoint` `xxs` is now `base`. The values have not changed.
- Instead of `p-media-query` we provide now `pds-media-query-min`, `pds-media-query-max` and `pds-media-query-min-max`.
  Furthermore, the mixins accept the predefined PDS breakpoints from `base` to `xxl` and no custom breakpoints anymore.

```diff
-  @include p-media-query($min, $max);

+  @include pds-media-query-min($min);
+  @include pds-media-query-max($max);
+  @include pds-media-query-min-max($min, $max);
```

- `p-title-large` mixin is now renamed to `pds-display-large`. The size got adjusted. In addition, we also provide
  `pds-display-medium`. The new `display` mixin differ also, that they are recursive and their size is fluid changing
  depending on the viewport width instead of fixed predefined sizes on specific breakpoints.

```diff
- @include p-title-large;

+ @include pds-display-medium;
+ @include pds-display-large;
```

- `p-headline-{1|2|3|4|5}` got renamed/extended to `pds-heading-{small|medium|large|x-large|xx-large|xxx-large}`. The
  size got adjusted. Same as in `display`, the size is now fluid depending on the viewport width instead of fixed
  predefined sizes on specific breakpoints.

```diff
- @include p-headline-1;
- @include p-headline-2;
- @include p-headline-3;
- @include p-headline-4;
- @include p-headline-5;

+ @include pds-heading-small;
+ @include pds-heading-medium;
+ @include pds-heading-large;
+ @include pds-heading-x-large;
+ @include pds-heading-xx-large;
+ @include pds-heading-xxx-large;
```

- `p-text-{x-small|small|medium|large|x-large}` got not only renamed to `pds-text-{x-small|small|medium|large|x-large}`
  but also the size got adjusted. Except `pds-text-small` all text mixins have fluid sizes that change depending on the
  viewport width.

```diff
- @include p-text-x-small;
- @include p-text-small;
- @include p-text-medium;
- @include p-text-large;
- @include p-text-x-large;

+ @include pds-text-x-small;
+ @include pds-text-small;
+ @include pds-text-medium;
+ @include pds-text-large;
+ @include pds-text-x-large;
```

**Colors**

As of v3 of the Porsche Design System the color theme got reworked completely to achieve a monochrome look. To get an
overview ot the new colors have a look at https://designsystem.porsche.com/latest/styles/theme.

```diff
- $p-color-brand;
- $p-color-theme-light-brand;

+ $pds-theme-light-primary;
```

```diff
- $p-color-default;
- $p-color-theme-light-default;
```

```diff
- $p-color-background-default;
- $p-color-theme-light-background;

+ $pds-theme-light-background-base
```

```diff
- $p-color-background-surface
- $p-color-theme-light-surface
- $p-color-background-shading
- $p-color-theme-light-background-shading

+ $pds-theme-light-background-surface
+ $pds-theme-light-background-shading
```

```diff
- $p-color-neutral-contrast-high
- $p-color-theme-light-neutral-contrast-high
- $p-color-neutral-contrast-medium
- $p-color-theme-light-neutral-contrast-medium
- $p-color-neutral-contrast-low
- $p-color-theme-light-neutral-contrast-low

+ $pds-theme-light-contrast-low
+ $pds-theme-light-contrast-medium
+ $pds-theme-light-contrast-high
```

```diff
- $p-color-notification-success
- $p-color-theme-light-notification-success
- $p-color-notification-success-soft
- $p-color-theme-light-notification-success-soft
- $p-color-notification-warning
- $p-color-theme-light-notification-warning
- $p-color-notification-warning-soft
- $p-color-theme-light-notification-warning-soft
- $p-color-notification-error
- $p-color-theme-light-notification-error
- $p-color-notification-error-soft
- $p-color-theme-light-notification-error-soft
- $p-color-notification-neutral
- $p-color-theme-light-notification-neutral
- $p-color-notification-neutral-soft
- $p-color-theme-light-notification-neutral-soft

+ $pds-theme-light-notification-success
+ $pds-theme-light-notification-success-soft
+ $pds-theme-light-notification-warning
+ $pds-theme-light-notification-warning-soft
+ $pds-theme-light-notification-error
+ $pds-theme-light-notification-error-soft
+ $pds-theme-light-notification-info
+ $pds-theme-light-notification-info-soft
```

```diff
- $p-color-state-hover
- $p-color-theme-light-state-hover
- $p-color-state-active
- $p-color-theme-light-state-active
- $p-color-state-focus
- $p-color-theme-light-state-focus
- $p-color-state-disabled
- $p-color-theme-light-state-disabled

+ $pds-theme-light-state-hover
+ $pds-theme-light-state-active
+ $pds-theme-light-state-focus
+ $pds-theme-light-state-disabled
```

```diff
- $p-color-theme-dark-brand
- $p-color-theme-dark-default
- $p-color-theme-dark-background-default
- $p-color-theme-dark-background-surface
- $p-color-theme-dark-background-shading
- $p-color-theme-dark-neutral-contrast-high
- $p-color-theme-dark-neutral-contrast-medium
- $p-color-theme-dark-neutral-contrast-low
- $p-color-theme-dark-notification-success
- $p-color-theme-dark-notification-success-soft
- $p-color-theme-dark-notification-warning
- $p-color-theme-dark-notification-warning-soft
- $p-color-theme-dark-notification-error
- $p-color-theme-dark-notification-error-soft
- $p-color-theme-dark-notification-neutral
- $p-color-theme-dark-notification-neutral-soft
- $p-color-theme-dark-state-hover
- $p-color-theme-dark-state-active
- $p-color-theme-dark-state-focus
- $p-color-theme-dark-state-disabled

+ $pds-theme-dark-primary
+ $pds-theme-dark-background-base
+ $pds-theme-dark-background-surface
+ $pds-theme-dark-background-shading
+ $pds-theme-dark-contrast-low
+ $pds-theme-dark-contrast-medium
+ $pds-theme-dark-contrast-high
+ $pds-theme-dark-notification-success
+ $pds-theme-dark-notification-success-soft
+ $pds-theme-dark-notification-warning
+ $pds-theme-dark-notification-warning-soft
+ $pds-theme-dark-notification-error
+ $pds-theme-dark-notification-error-soft
+ $pds-theme-dark-notification-info
+ $pds-theme-dark-notification-info-soft
+ $pds-theme-dark-state-hover
+ $pds-theme-dark-state-active
+ $pds-theme-dark-state-focus
+ $pds-theme-dark-state-disabled
```

**Font**

```diff
- $p-font-family
+ $pds-font-family
```

```diff
- $p-font-weight-regular
- $p-font-weight-semibold
- $p-font-weight-bold
+ $pds-font-weight-regular
+ $pds-font-weight-semi-bold
+ $pds-font-weight-bold
```

```diff
- $p-font-size-x-small
- $p-font-size-small
- $p-font-size-medium
- $p-font-size-large
- $p-font-size-x-large


+ $pds-font-size-text-x-small
+ $pds-font-size-text-small
+ $pds-font-size-text-medium
+ $pds-font-size-text-large
+ $pds-font-size-text-x-large
```

**Spacings**

As of v3 of the Porsche Design System the spacing concept has shifted to using fluid spacing or static spacing. Spacing
values defined in `rem` are no longer available to avoid waisted space when fonts are scaled. Generally speaking you
should always use the fluid spacings if possible and not leave the predefined spacing range.

To get an overview ot the new spacings have a look at https://designsystem.porsche.com/latest/styles/spacings.

```diff
- $p-spacing-4
- $p-spacing-8
- $p-spacing-16
- $p-spacing-24
- $p-spacing-32
- $p-spacing-40
- $p-spacing-48
- $p-spacing-56
- $p-spacing-64
- $p-spacing-72
- $p-spacing-80
- $p-layout-x-small
- $p-layout-small
- $p-layout-medium
- $p-layout-large
- $p-layout-x-large
- $p-layout-xx-large

+ $pds-spacing-static-x-small
+ $pds-spacing-static-small
+ $pds-spacing-static-medium
+ $pds-spacing-static-large
+ $pds-spacing-static-x-large
+ $pds-spacing-static-xx-large
+ $pds-spacing-fluid-x-small
+ $pds-spacing-fluid-small
+ $pds-spacing-fluid-medium
+ $pds-spacing-fluid-large
+ $pds-spacing-fluid-x-large
+ $pds-spacing-fluid-xx-large
```

#### Deprecated

##### JS

**Functions**

- `pxToRem()` there is no replacement for the function.
- `remToPx()` there is no replacement for the function.
- `calculateLineHeight()` the calculation of the `line-height` has changed and is defined by the `ex` unit. To set the
  `line-height`, use the `fontLineHeight` design token provided.
- `generateTypeScale()` since the font sizes are now fluid, the `fontLineHeight` design token and one of the provided
  font sizes should be used.
- `generateFontDefinition()` we provide `fontFamily`, `fontWeight`, `fontLineHeight` and multiple font sizes, which
  should be used instead.

**Colors**

- all `external` colors are no longer available in v3.

**Font**

- `fontWeight` thin is removed as of v3.
- `fontSize` object is no longer provided as the font sizes are now fluid. You can use `fontLineHeight` design token and
  on of the provided font sizes to recreate it.

```diff
- import { fontSize } from '@porsche-design-system/utilities';
+ import { fontLineHeight, fontSizeMedium } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

// TODO: fontSize is missing

##### SCSS

**Mixins**

- `p-px-to-rem` there is no replacement for the mixin.
- `p-rem-to-px` there is no replacement for the mixin.
- `p-calculate-line-height` the calculation of the `line-height` has changed and is defined by the `ex` unit. To set the
  `line-height`, use the `$pds-font-line-height` variable.
- `p-generate-type-scale` since the font sizes are now fluid, the `$pds-font-line-height` design token and one of the
  provided font sizes should be used.
- `p-generate-font-definition` we provide `$pds-font-family`, `$pds-font-weight`, `$pds-font-line-height` and multiple
  font sizes, which should be used instead.

**Colors**

- Theme `light-electric` and `dark-electric` are no longer available.
- External brand colors are no longer available.

**Font**

- `$p-font-weight-thin` is removed

```diff
- $p-font-weight-thin
```

- font sizes in `rem` are removed

```diff
- $p-font-size-12
- $p-font-size-16
- $p-font-size-18
- $p-font-size-20
- $p-font-size-22
- $p-font-size-24
- $p-font-size-28
- $p-font-size-30
- $p-font-size-32
- $p-font-size-36
- $p-font-size-42
- $p-font-size-44
- $p-font-size-48
- $p-font-size-52
- $p-font-size-60
- $p-font-size-62
- $p-font-size-72
- $p-font-size-84
```

### [5.4.0] - 2022-12-15

### [5.4.0-rc.0] - 2022-12-14

#### Changed

- `line-height` calculation uses `ex`-unit in combination with `calc()` which gives the best performance, the easiest
  possible integration and respects UI best practices in having **larger** `line-height` values for **small**
  `font-size` definitions and **smaller** `line-height` values for **larger** `font-size` definitions. The calculated
  values by CSS slightly differ compared to the ones before calculated by JavaScript or SCSS, which might result in
  minor visual changes.

### [5.3.1] - 2022-06-22

### [5.3.1-rc.0] - 2022-06-21

### [5.3.0] - 2022-05-19

#### Changed

- npm package is prepared for public release on [npmjs.org](https://npmjs.com)

### [5.3.0-beta.1] - 2022-05-12

#### Added

**Disclaimer:** The provided theme `dark-electric` is just a proof of concept, it's **not** accessible regarding its
color contrast and might even be removed in an upcoming major release again.

- Theme `dark-electric`

### [5.3.0-beta.0] - 2021-12-07

#### Added

**Disclaimer:** The provided theme `light-electric` is just a proof of concept, it's **not** accessible regarding its
color contrast and might even be removed in an upcoming major release again.

- Theme `light-electric`

### [5.2.0] - 2021-11-30

#### Changed

- Use `Heiti SC` (pre-installed on iOS/macOS) and `SimHei` (pre-installed on Windows) as Chinese fallback for
  `font-family`

### [5.1.0] - 2021-10-04

#### Added

- External brand colors: `kakaotalk`, `naver`, `reddit` and `tiktok`
- Global screen reader only styles to hide contents visually but grant access for screen readers.
- `SimHei` and `黑体` as fallback for `font-family`

### [5.0.0] - 2021-08-12

#### Changed

- Introduce breaking change: Slash as Division. https://sass-lang.com/documentation/breaking-changes/slash-div

### [4.1.0] - 2021-07-01

#### Added

- Export `Breakpoint` type

### [4.0.0] - 2020-12-17

#### Changed

- Precision of relative line height
- Color of `neutral contrast low` from `#C9CACB` to `#E3E4E5`

### [3.0.0] - 2020-11-26

#### Added

- `:focus` SCSS mixin and JS function
- Support to load `font-face.css` from China CDN directly via browser flag: `PORSCHE_DESIGN_SYSTEM_CDN = 'cn';`
- **Notification Soft** colors

#### Changed

- Background surface and hover/active state colors for dark theme
- Global focus colors

### [2.0.0] - 2020-08-19

### [2.0.0-rc.0] - 2020-08-17

#### Changed

- `FONT_FACE_CDN_URL` with changed UPM (units per em): different character size, letter spacing and vertical alignment

### [1.1.0] - 2020-08-12

### [1.1.0-rc.0] - 2020-08-12

#### Changed

- Generate typography.ts static
- Deprecated `FONT_FACE_STYLE_CDN_URL`, use `FONT_FACE_CDN_URL` instead

### [1.0.6] - 2020-07-28

### [1.0.6-rc.0] - 2020-07-28

#### Changed

- Use rollup to build / bundle package

### [1.0.5] - 2020-07-27

#### Fixed

- Package content
- Import of scss

### [1.0.5-rc.1] - 2020-07-27

#### Fixed

- Package content

### [1.0.5-rc.0] - 2020-07-27

#### Fixed

- Package content

### [1.0.4] - 2020-07-27

#### Fixed

- Package content

### [1.0.3] - 2020-07-27

#### Fixed

- Package content

### [1.0.2] - 2020-07-24

#### Fixed

- Pipeline output of package

### [1.0.1] - 2020-07-22

#### Fixed

- Added dependency CSS Types

### [1.0.0] - 2020-07-15

#### Added

- **Notification Neutral** color
- **Background Shading** color for overlays

### [1.0.0-rc.0] - 2020-06-18

#### Added

- Initial release
