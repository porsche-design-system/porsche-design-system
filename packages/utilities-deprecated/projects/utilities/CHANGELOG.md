# Changelog

## Porsche Design System - Utilities **DEPRECATED**

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [Unreleased]

This package is **deprecated** and will no longer be maintained. All `Porsche Design System` utilities are now provided
via the `@porsche-design-system/components-{js|angular|react|vue}/styles` sub-package. To make the migration easier, we
offer an overview of the old deprecated values in reference to the new styles. Further documentation about the new
styles can be found here [Introduction](https://designsystem.porsche.com/latest/styles/introduction).

#### Changed

##### JS

**Functions**

- `focus()` is now `getFocusStyles()`.

```diff
- import { focus } from '@porsche-design-system/utilities'
+ import { getFocusStyles } from '@porsche-design-system/components-{js|angular|react|vue}/styles'

const Component1 = styled.a`
-  ${focus({ color: color.state.focus, offset: '1px', pseudo: '::before' })}
+  ${getFocusStyle({ offset: 'small', borderRadius: 'small', theme: 'light' })}
`;

const Component2 = styled.a`
-  ${focus({ color: color.state.focus, offset: '1px', pseudo: '::before' })}
+  ${getFocusStyle({ offset: 'small', borderRadius: 'small', theme: 'light' })}
`;
```

- `breakpoint` `xxs` is now `base`.

```diff
- import { breakpoint } from '@porsche-design-system/utilities'
+ import { breakpoint } from '@porsche-design-system/components-{js|angular|react|vue}/styles'

- if (window.matchMedia(`(min-width: ${breakpoint.xxs}px)`).matches) {
+ if (window.matchMedia(`(min-width: ${breakpoint.base}px)`).matches) {
  /* The viewport is greater than, or equal to the breakpointValue wide */
}
```

- Instead of `mediaQuery()` we provide now `getMediaQueryMin()`, `getMediaQueryMax()` and `getMediaQueryMinMax()`.
  Furthermore, the functions accept only the predefined breakpoints from `base` to `xxl` and no custom breakpoints
  anymore.

```diff
- import { breakpoint, mediaQuery } from '@porsche-design-system/utilities'
+ import { breakpoint, getMediaQueryMin, getMediaQueryMax, getMediaQueryMinMax } from '@porsche-design-system/components-{js|angular|react|vue}/styles'

const StyledDiv = css`{
  color: 'royalblue',

  // up to predefined breakpoint xs apply color black
+ [getMediaQueryMax(breakpoint.xs)]: {
    color: 'black'
  }

  // from predefined breakpoint xs to m apply color aqua
- [mediaQuery(breakpoint.xs, breakpoint.m)]: {
+ [getMediaQueryMinMax(breakpoint.xs, breakpoint.m)]: {
    color: 'aqua'
  },

  // from predefined breakpoint m apply color deeppink
- [mediaQuery(breakpoint.m)]: {
+ [getMediaQueryMin(breakpoint.m)]: {
    color: 'deeppink'
  }
}`;

render(<StyledDiv>Styled Text</StyledDiv>);
```

- `titleLarge` got renamed to `displayLargeStyle`. The size of the new `display` styles are changing fluid depending on
  the viewport width instead of fixed predefined sizes on specific breakpoints, and they are italic now.

```diff
- import { titleLarge } from '@porsche-design-system/utilities'
+ import { displayMediumStyle, displayLargeStyle } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
import styled from 'styled-components';

const component1 = styled.h1`
- ${titleLarge}
+ ${displayLargeStyle}
`;

const component2 = styled.h2`
+ ${displayMediumStyle}
`;
```

- `headline` got renamed to `heading{Small|Medium|Large|XLarge|XXLarge|XXXLarge}Style`. The size of the new `heading`
  styles are changing fluid depending on the viewport width instead of fixed predefined sizes on specific breakpoints,
  and they are italic now.

```diff
- import { headline{1|2|3|4|5} } from '@porsche-design-system/utilities'
+ import { heading{Small|Medium|Large|XLarge|XXLarge|XXXLarge}Style } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
import styled from 'styled-components';

const component1 = styled.h1`
- ${headline['1']}
+ ${headingMediumStyle}
`;
```

- `text` got renamed to `text{XSmall|Small|Medium|Large|XLarge}Style`. Except `textSmallStyle` all text styles have
  fluid sizes that change depending on the viewport width instead of fixed predefined sizes on specific breakpoints.

```diff
- import { text } from '@porsche-design-system/utilities'
+ import { textXSmallStyle, textSmallStyle, textMediumStyle, textLargeStyle, textXLargeStyle } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
import styled from 'styled-components';

const component1 = styled.p`
- ${text.small}
+ ${textSmallStyle}
`;
```

**Colors**

As of v3 of the Porsche Design System the color theme got reworked completely to achieve a monochrome look. To get an
overview of the new colors have a look at [Theme](https://designsystem.porsche.com/latest/styles/theme).

- `lightTheme` and `darkTheme` got renamed to `themeLight` and `themeDark`. In addition, you can also single import a
  theme if for e.g. you only need `lightTheme`.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme, themeLight, themeDark } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

As the design tokens for `themeLight` and `themeDark` are in sync, the name changes mentioned below concern both themes
even if only light theme is displayed in the diff.

- `brand` got renamed to `primary`.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
import styled from 'styled-components';

const component1 = styled.div({
- background: color.lightTheme.brand
+ background: theme.light.primary
});
```

- `default` is removed, use `primary` instead.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
import styled from 'styled-components';

const component1 = styled.div({
- background: color.lightTheme.default
+ background: theme.light.primary
});
```

- `backgound.default` is renamed to `background.base`.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
import styled from 'styled-components';

const component1 = styled.div({
- background: color.lightTheme.background.default
+ background: theme.light.background.base
});
```

- `neutralContrast` is renamed to `contrast`.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
import styled from 'styled-components';

const component1 = styled.div({
- background: color.lightTheme.neutralContrast.{low|medium|high}
+ background: theme.light.contrast.{low|medium|high}
});
```

- `notification.neutral` and `notification.neutralSoft` are renamed to `notification.info` and `notification.infoSoft`.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
import styled from 'styled-components';

const component1 = styled.div({
- background: color.lightTheme.notification.neutral
+ background: theme.light.notification.info
});

const component2 = styled.div({
- background: color.lightTheme.notification.neutralSoft
+ background: theme.light.notification.infoSoft
});
```

- `state.focus` is changed from `currentColor` to a fixed color, depending on the theme.

**Font**

- `fontFamily` is provided only the import has changed

```diff
- import { fontFamily } from '@porsche-design-system/utilities';
+ import { fontFamily } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

- `fontWeight` is provided only the import has changed

```diff
- import { fontWeight } from '@porsche-design-system/utilities';
+ import { fontWeight } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

**Spacings**

With the upcoming v3 release, we will be introducing fluid spacers alongside our static spacers. These spacers will
adjust in size based on a min and max value, providing a fluid response to changes in browser width. Additionally, we've
switched from using _rem_ to _px_ for our spacers to ensure they don't unnecessarily expand when the root font size is
adjusted.

To get an overview ot the new spacings have a look at [Spacing](https://designsystem.porsche.com/latest/styles/spacing).

```diff
- import { spacing } from '@porsche-design-system/utilities';
- import { layout } from '@porsche-design-system/utilities';
+ import { spacing, spacingStatic, spacingFluid } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

##### SCSS

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';
```

**Mixins**

- `p-focus` mixin is now `pds-focus`. The parameters have changed as the focus is now handled with `border` and rounded
  edges. You can choose `small` or `medium` for the `border-radius`. `pds-focus` also excepts an `theme` parameter
  instead of `color`, which determines the color of the focus.

```diff
-  @include p-focus;
+  @include pds-focus;
```

- `breakpoint` `xxs` is now `base`. The values have not changed.
- Instead of `p-media-query` we provide now `pds-media-query-min`, `pds-media-query-max` and `pds-media-query-min-max`.
  Furthermore, the mixins only accept the predefined PDS breakpoints from `base` to `xxl` and no custom breakpoints
  anymore.

```diff
-  @include p-media-query($min, $max);

+  @include pds-media-query-min($min);
+  @include pds-media-query-max($max);
+  @include pds-media-query-min-max($min, $max);
```

- `p-title-large` mixin is now renamed to `pds-display-large`. The size got adjusted. In addition, we also provide
  `pds-display-medium`. The new `display` mixin differ also, that they are recursive and their size is changing fluid
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
overview ot the new colors have a look at [Theme](https://designsystem.porsche.com/latest/styles/theme).

- `brand` got renamed to `primary`.

```diff
- $p-color-brand;
- $p-color-theme-light-brand;

+ $pds-theme-light-primary;
```

- `default` is removed.

```diff
- $p-color-default;
- $p-color-theme-light-default;
```

- `$p-color-theme-light-background` is renamed to `$pds-theme-light-background-base`.

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
- $p-color-neutral-contrast-low
- $p-color-theme-light-neutral-contrast-low
- $p-color-neutral-contrast-medium
- $p-color-theme-light-neutral-contrast-medium
- $p-color-neutral-contrast-high
- $p-color-theme-light-neutral-contrast-high

+ $pds-theme-light-contrast-low
+ $pds-theme-light-contrast-medium
+ $pds-theme-light-contrast-high
```

- `$p-color-notification-neutral` and `$p-color-notification-neutral-soft` are renamed to
  `$pds-theme-light-notification-info` and `$pds-theme-light-notification-info-soft`.

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

- `$pds-theme-light-state-focus` is now a fixed color depending on theme instead of `currentColor`.

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

With the upcoming v3 release, we will be introducing fluid spacers alongside our static spacers. These spacers will
adjust in size based on a min and max value, providing a response to changes in browser width. Additionally, we've
switched from using _rem_ to _px_ for our spacers to ensure they don't unnecessarily expand when the root font size is
adjusted.

To get an overview ot the new spacings have a look at [Spacing](https://designsystem.porsche.com/latest/styles/spacing).

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
- `font` object is no longer provided as the font sizes are now fluid. You can use `fontLineHeight` design token and on
  of the provided font sizes, e.g. `fontSizeTextSmall` to recreate it.

```diff
- import { font } from '@porsche-design-system/utilities';
+ import { fontLineHeight, fontSizeTextSmall } from '@porsche-design-system/components-{js|angular|react|vue}/styles'
```

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
