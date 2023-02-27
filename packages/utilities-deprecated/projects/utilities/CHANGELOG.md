# Changelog

## Porsche Design System - Utilities **DEPRECATED**

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [Unreleased]

### [5.4.1] - 2023-02-27

This package is **deprecated** and will no longer be maintained. All `Porsche Design System` utilities are now provided
via the `@porsche-design-system/components-{js|angular|react|vue}/styles` sub-package. To make the migration easier, we
offer an overview of the old deprecated values in reference to the new styles. Further documentation about the new
styles can be found [here](https://designsystem.porsche.com/latest/styles/introduction).

#### Changed

##### JS

**Functions**

- `focus()` is now `getFocusStyles()`.

```diff
- import { focus } from '@porsche-design-system/utilities';
+ import { getFocusStyles } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

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
- import { breakpoint } from '@porsche-design-system/utilities';
+ import { breakpoint } from '@porsche-design-system/components-{js|angular|react|vue}/styles';

- if (window.matchMedia(`(min-width: ${breakpoint.xxs}px)`).matches) {
+ if (window.matchMedia(`(min-width: ${breakpoint.base}px)`).matches) {
  /* The viewport is greater than, or equal to the breakpointValue wide */
}
```

- instead of `mediaQuery()` we provide now `getMediaQueryMin()`, `getMediaQueryMax()` and `getMediaQueryMinMax()`.
  Furthermore, the functions accept only the predefined breakpoints from `base` to `xxl` and no custom breakpoints
  anymore.

```diff
- import { breakpoint, mediaQuery } from '@porsche-design-system/utilities';
+ import { breakpoint, getMediaQueryMin, getMediaQueryMax, getMediaQueryMinMax } from '@porsche-design-system/components-{js|angular|react|vue}/styles';

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
```

- `titleLarge` got renamed to `displayLargeStyle`. The size of the new `display` styles are changing fluid depending on
  the viewport width instead of fixed predefined sizes on specific breakpoints, and they are italic now.

```diff
- import { titleLarge } from '@porsche-design-system/utilities';
+ import { displayMediumStyle, displayLargeStyle } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const component1 = styled.h1`
- ${titleLarge}
+ ${displayLargeStyle}
`;

const component2 = styled.h2`
+ ${displayMediumStyle}
`;
```

- `headline{1|2|3|4|5}` got renamed to `heading{Small|Medium|Large|XLarge|XXLarge|XXXLarge}Style`. The size of the new
  `heading` styles are changing fluid depending on the viewport width instead of fixed predefined sizes on specific
  breakpoints, and they are italic now.

```diff
- import { headline } from '@porsche-design-system/utilities';
+ import { headingXXLargeStyle } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const component1 = styled.h1`
- ${headline['1']}
+ ${headingXXLargeStyle}
`;
```

- `text` got renamed to `text{XSmall|Small|Medium|Large|XLarge}Style`. Except `textSmallStyle` all text styles have
  fluid sizes that change depending on the viewport width instead of fixed predefined sizes on specific breakpoints.

```diff
- import { text } from '@porsche-design-system/utilities';
+ import { textSmallStyle } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const component1 = styled.p`
- ${text.small}
+ ${textSmallStyle}
`;
```

**Colors**

As of v3 of the Porsche Design System the color theme got reworked completely to achieve a monochrome look. To get an
overview of the new colors have a look [here](https://designsystem.porsche.com/latest/styles/theme).

- `color.lightTheme` and `color.darkTheme` got renamed to `theme.light` and `theme.dark`. In addition, you can also
  single import a theme if for e.g. you only need `themeLight`.

```diff
- import { color } from '@porsche-design-system/utilities';;
+ import { theme, themeLight, themeDark } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
```

As the styles for `themeLight` and `themeDark` are in sync, the name changes mentioned below concern both themes even if
only light theme is displayed in the diff.

- `brand` got renamed to `primary`.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const component1 = styled.div({
- background: color.lightTheme.brand
+ background: theme.light.primary
});
```

- `default` is removed, use `primary` instead.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const component1 = styled.div({
- background: color.lightTheme.default
+ background: theme.light.primary
});
```

- `backgound.default` is renamed to `background.base`.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const component1 = styled.div({
- background: color.lightTheme.background.default
+ background: theme.light.background.base
});
```

- `neutralContrast` is renamed to `contrast`.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const component1 = styled.div({
- background: color.lightTheme.neutralContrast.medium
+ background: theme.light.contrast.medium
});
```

- `notification.neutral` and `notification.neutralSoft` are renamed to `notification.info` and `notification.infoSoft`.

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
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

- `fontFamily` is provided the same way, only the import has changed.

```diff
- import { fontFamily } from '@porsche-design-system/utilities';
+ import { fontFamily } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
```

- `fontWeight` is provided the same way, only the import has changed.

```diff
- import { fontWeight } from '@porsche-design-system/utilities';
+ import { fontWeight } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
```

**Spacings**

With the upcoming v3 release, we will be introducing fluid spacers alongside our static spacers. These spacers will
adjust in size based on a min and max value, providing a fluid response to changes in browser width. Additionally, we've
switched from using _rem_ to _px_ for our spacers to ensure they don't unnecessarily expand when the root font size is
adjusted.

To get an overview ot the new spacings have a look [here](https://designsystem.porsche.com/latest/styles/spacing).

```diff
- import { spacing, layout } from '@porsche-design-system/utilities';
+ import { spacing, spacingStatic, spacingFluid } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
```

##### SCSS

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';
```

**Mixins**

- `p-focus` is now `pds-focus`.

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';

a {
-  @include p-focus;
+  @include pds-focus;
  }

button {
-  @include p-focus($p-color-state-focus, 1px, '::before');
+  @include pds-focus('small', 'small', 'light');
  }
```

- `breakpoint` `xxs` is now `base`.
- instead of `p-media-query` we provide now `pds-media-query-min`, `pds-media-query-max` and `pds-media-query-min-max`.
  Furthermore, the mixins only accept the predefined Porsche Design System breakpoints from `base` to `xxl` and no
  custom breakpoints anymore.

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';

div {
  color: inherit;

   // up to predefined breakpoint xs apply color black
+  @include pds-media-query-max('xs')
    color: black;
  }

  // from predefined breakpoint xs to m apply color aqua
-  @include p-media-query('xs', 'm') {
+  @include pds-media-query-min-max('xs', 'm')
    color: aqua;
  }

  // from predefined breakpoint m apply color deeppink
-  @include p-media-query('m') {
+  @include pds-media-query-min('m')
    color: deeppink;
  }
}
```

- `p-title-large` mixin is now renamed to `pds-display-large` and in addition we provide `pds-display-medium`. The size
  of the new `display` styles are changing fluid depending on the viewport width instead of fixed predefined sizes on
  specific breakpoints, and they are italic now.

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';

h1 {
- @include p-title-large;
+ @include pds-display-large;
}

h2 {
+ @include pds-display-medium;
}
```

- `p-headline-{1|2|3|4|5}` got renamed/extended to `pds-heading-{small|medium|large|x-large|xx-large|xxx-large}`. The
  size of the new `heading` styles are changing fluid depending on the viewport width instead of fixed predefined sizes
  on specific breakpoints, and they are italic now.

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';

h1 {
- @include p-headline-1;
+ @include pds-heading-xx-large;
}

h2 {
- @include p-headline-2;
+ @include pds-heading-x-large;
}
```

- `p-text-{x-small|small|medium|large|x-large}` got renamed to `pds-text-{x-small|small|medium|large|x-large}`. Except
  `pds-text-small` all text styles have fluid sizes that change depending on the viewport width instead of fixed
  predefined sizes on specific breakpoints.

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';

p {
- @include p-text-small;
+ @include pds-text-small;
}
```

**Colors**

As of v3 of the Porsche Design System the color theme got reworked completely to achieve a monochrome look. To get an
overview ot the new colors have a look [here](https://designsystem.porsche.com/latest/styles/theme).

- `brand` got renamed to `primary`.

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';

div {
- background: {$p-color-brand|$p-color-theme-light-brand};
+ background: $pds-theme-light-primary;
}
```

- `default` is removed, use `primary` instead.

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';

div {
- color: {$p-color-default|$p-color-theme-light-default};
+ color: $pds-theme-light-primary;
}
```

- `$p-color-theme-light-background` is renamed to `$pds-theme-light-background-base`.

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';

div {
- background: {$p-color-background-default|$p-color-theme-light-background};
+ background: $pds-theme-light-background-base;
}
```

- to keep it clear, only the old color variable in regard to its new name will be mentioned below:

```diff
- $p-color-background-surface
- $p-color-theme-light-surface
+ $pds-theme-light-background-surface

- $p-color-background-shading
- $p-color-theme-light-background-shading
+ $pds-theme-light-background-shading
```

```diff
- $p-color-neutral-contrast-low
- $p-color-theme-light-neutral-contrast-low
+ $pds-theme-light-contrast-low

- $p-color-neutral-contrast-medium
- $p-color-theme-light-neutral-contrast-medium
+ $pds-theme-light-contrast-medium

- $p-color-neutral-contrast-high
- $p-color-theme-light-neutral-contrast-high
+ $pds-theme-light-contrast-high
```

- `$p-color-notification-neutral` and `$p-color-notification-neutral-soft` are renamed to
  `$pds-theme-light-notification-info` and `$pds-theme-light-notification-info-soft`.

```diff
- $p-color-notification-success
- $p-color-theme-light-notification-success
+ $pds-theme-light-notification-success

- $p-color-notification-success-soft
- $p-color-theme-light-notification-success-soft
+ $pds-theme-light-notification-success-soft

- $p-color-notification-warning
- $p-color-theme-light-notification-warning
+ $pds-theme-light-notification-warning

- $p-color-notification-warning-soft
- $p-color-theme-light-notification-warning-soft
+ $pds-theme-light-notification-warning-soft

- $p-color-notification-error
- $p-color-theme-light-notification-error
+ $pds-theme-light-notification-error

- $p-color-notification-error-soft
- $p-color-theme-light-notification-error-soft
+ $pds-theme-light-notification-error-soft

- $p-color-notification-neutral
- $p-color-theme-light-notification-neutral
+ $pds-theme-light-notification-info

- $p-color-notification-neutral-soft
- $p-color-theme-light-notification-neutral-soft
+ $pds-theme-light-notification-info-soft
```

- `$pds-theme-light-state-focus` is now a fixed color depending on theme instead of `currentColor`.

```diff
- $p-color-state-hover
- $p-color-theme-light-state-hover
+ $pds-theme-light-state-hover

- $p-color-state-active
- $p-color-theme-light-state-active
+ $pds-theme-light-state-active

- $p-color-state-focus
- $p-color-theme-light-state-focus
+ $pds-theme-light-state-focus

- $p-color-state-disabled
- $p-color-theme-light-state-disabled
+ $pds-theme-light-state-disabled
```

- all name changes that happened in theme light also apply to theme dark:

```diff
- $p-color-theme-dark-brand
+ $pds-theme-dark-primary

- $p-color-theme-dark-default
+ $pds-theme-dark-background-base

- $p-color-theme-dark-background-default
+ $pds-theme-dark-primary

- $p-color-theme-dark-background-surface
+ $pds-theme-dark-background-surface

- $p-color-theme-dark-background-shading
+ $pds-theme-dark-background-shading

- $p-color-theme-dark-neutral-contrast-high
+ $pds-theme-dark-contrast-high

- $p-color-theme-dark-neutral-contrast-medium
+ $pds-theme-dark-contrast-medium

- $p-color-theme-dark-neutral-contrast-low
+ $pds-theme-dark-contrast-low

- $p-color-theme-dark-notification-success
+ $pds-theme-dark-notification-success

- $p-color-theme-dark-notification-success-soft
+ $pds-theme-dark-notification-success-soft

- $p-color-theme-dark-notification-warning
+ $pds-theme-dark-notification-warning

- $p-color-theme-dark-notification-warning-soft
+ $pds-theme-dark-notification-warning-soft

- $p-color-theme-dark-notification-error
+ $pds-theme-dark-notification-error

- $p-color-theme-dark-notification-error-soft
+ $pds-theme-dark-notification-error-soft

- $p-color-theme-dark-notification-neutral
+ $pds-theme-dark-notification-info

- $p-color-theme-dark-notification-neutral-soft
+ $pds-theme-dark-notification-info-soft

- $p-color-theme-dark-state-hover
+ $pds-theme-dark-state-hover

- $p-color-theme-dark-state-active
+ $pds-theme-dark-state-active

- $p-color-theme-dark-state-focus
+ $pds-theme-dark-state-focus

- $p-color-theme-dark-state-disabled
+ $pds-theme-dark-state-disabled
```

**Font**

- `$p-font-family` got renamed to `$pds-font-family`.

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';

p {
- font-family: $p-font-family;
+ font-family: $pds-font-family;
}
```

- `$p-font-weight-{regular|semi-bold|bold}` got renamed to `$pds-font-weight-{regular|semi-bold|bold}`.

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';

button {
- font-weight: $p-font-weight-bold;
+ font-weight: $pds-font-weight-bold;
}
```

- `$p-font-size-{x-small|small|medium|large|x-large}` got renamed to
  `$pds-font-size-{x-small|small|medium|large|x-large}`.

```diff
- @import '~@porsche-design-system/utilities/scss';
+ @import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';

button {
- font-size: $p-font-size-medium;
+ font-size: $pds-font-size-medium;
}
```

**Spacings**

With the upcoming v3 release, we will be introducing fluid spacers alongside our static spacers. These spacers will
adjust in size based on a min and max value, providing a fluid response to changes in browser width.

```diff
+ $pds-spacing-fluid-x-small
+ $pds-spacing-fluid-small
+ $pds-spacing-fluid-medium
+ $pds-spacing-fluid-large
+ $pds-spacing-fluid-x-large
+ $pds-spacing-fluid-xx-large
```

Additionally, we've switched from using _rem_ to _px_ for our spacers to ensure they don't unnecessarily expand when the
root font size is adjusted.

```diff
- $p-layout-x-small
+ $pds-spacing-static-x-small

- $p-layout-small
+ $pds-spacing-static-small

- $p-layout-medium
+ $pds-spacing-static-medium

- $p-layout-large
+ $pds-spacing-static-large

- $p-layout-x-large
+ $pds-spacing-static-x-large

- $p-layout-xx-large
+ $pds-spacing-static-xx-large
```

To get an overview ot the new spacings have a look [here](https://designsystem.porsche.com/latest/styles/spacing).

#### Deprecated

##### JS

**Functions**

- `pxToRem()` will be removed in v3 without replacement.
- `remToPx()` will be removed in v3 without replacement.
- `calculateLineHeight()` will be removed in v3. To set the `line-height`, use the `fontLineHeight` style provided.
- `generateTypeScale()` will be removed in v3. Since the font sizes are now fluid, the `fontLineHeight` style and one of
  the provided font sizes should be used.
- `generateFontDefinition()` will be removed in v3. We provide `fontFamily`, `fontWeight`, `fontLineHeight` and multiple
  font sizes, which should be used instead.

**Colors**

- all `external` colors are no longer available in v3.

**Font**

- `fontWeight` thin is removed as of v3.
- the static `font.size` object is no longer provided in v3. Please use one of the predefined fluid font sizes or the
  `fontLineHeight` style and on of the provided font sizes, e.g. `fontSizeTextSmall` to recreate it.

**Spacings**

- the static `spacing` object with `rem` spacings is no longer provided in v3. Please use one of the provided static or
  fluid spacings.

##### SCSS

**Mixins**

- `p-px-to-rem` will be removed in v3 without replacement.
- `p-rem-to-px` will be removed in v3 without replacement.
- `p-calculate-line-height` will be removed in v3. To set the `line-height`, use the `$pds-font-line-height` variable.
- `p-generate-type-scale` will be removed in v3 since the font sizes are now fluid. The `$pds-font-line-height` style
  and one of the provided font sizes should be used.
- `p-generate-font-definition` will be removed in v3. We provide `$pds-font-family`, `$pds-font-weight`,
  `$pds-font-line-height` and multiple font sizes, which should be used instead.

**Colors**

- theme `light-electric` and `dark-electric` are no longer available in v3.
- all `external` colors are no longer available in v3.

**Font**

- `$p-font-weight-thin` is removed.

```diff
- $p-font-weight-thin
```

- static font sizes `$p-font-size-{12]16|18|20|22|24|28|30|32|36||42|44|48|52|60|62|72|84}` will be removed in v3.
  Please use one of the predefined fluid font sizes or the `$pds-font-line-height` style and on of the provided font
  sizes, to recreate it.

**Spacings**

- static spacings with rem values are no longer provided in v3.

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
