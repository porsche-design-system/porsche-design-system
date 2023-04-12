# Migration Guide - Utilities

<TableOfContents></TableOfContents>

## Migrate from Utilities to Styles

With the new **Porsche Design System v3** a sub package called `Styles` is provided matching the new design language.
Further documentation can be found [here](https://designsystem.porsche.com/latest/styles/introduction).

<p-inline-notification heading="Deprecation hint" state="error" dismiss-button="false">
  The npm package <code>@porsche-design-system/utilities</code> is deprecated and will no longer be maintained. A migration 
to <code>@porsche-design-system/components-{js|angular|react|vue}/styles</code> should take place as fast as possible.
</p-inline-notification>

## JS

### Variables

#### Colors

With the new Porsche design language, the color theme got reworked completely to achieve a monochrome look. For further
information, have a look at [theme styles](https://designsystem.porsche.com/latest/styles/theme).

```diff
- import { color } from '@porsche-design-system/utilities';
+ import { theme } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const Component1 = styled.div({
- background: color.{lightTheme|darkTheme}.brand
+ background: theme.{light|dark}.primary // or `themeLightPrimary` as single import
- background: color.{lightTheme|darkTheme}.default
+ background: theme.{light|dark}.primary // or `themeLightPrimary` as single import

- background: color.{lightTheme|darkTheme}.background.default
+ background: theme.{light|dark}.background.base // or `themeLightBackgroundBase` as single import
- background: color.{lightTheme|darkTheme}.background.surface
+ background: theme.{light|dark}.background.surface // or `themeLightBackgroundSurface` as single import
- background: color.{lightTheme|darkTheme}.background.shading
+ background: theme.{light|dark}.background.shading // or `themeLightBackgroundShading` as single import

- background: color.{lightTheme|darkTheme}.neutralContrast.high
+ background: theme.{light|dark}.contrast.high // or `themeLightContrastHigh` as single import
- background: color.{lightTheme|darkTheme}.neutralContrast.medium
+ background: theme.{light|dark}.contrast.medium // or `themeLightContrastMedium` as single import
- background: color.{lightTheme|darkTheme}.neutralContrast.low
+ background: theme.{light|dark}.contrast.low // or `themeLightContrastLow` as single import

- background: color.{lightTheme|darkTheme}.notification.success
+ background: theme.{light|dark}.notification.success // or `themeLightNotificationSuccess` as single import
- background: color.{lightTheme|darkTheme}.notification.successSoft
+ background: theme.{light|dark}.notification.successSoft // or `themeLightNotificationSuccessSoft` as single import
- background: color.{lightTheme|darkTheme}.notification.warning
+ background: theme.{light|dark}.notification.warning // or `themeLightNotificationWarning` as single import
- background: color.{lightTheme|darkTheme}.notification.warningSoft
+ background: theme.{light|dark}.notification.warningSoft // or `themeLightNotificationWarningSoft` as single import
- background: color.{lightTheme|darkTheme}.notification.error
+ background: theme.{light|dark}.notification.error // or `themeLightNotificationError` as single import
- background: color.{lightTheme|darkTheme}.notification.errorSoft
+ background: theme.{light|dark}.notification.errorSoft // or `themeLightNotificationErrorSoft` as single import
- background: color.{lightTheme|darkTheme}.notification.neutral
+ background: theme.{light|dark}.notification.info // or `themeLightNotificationInfo` as single import
- background: color.{lightTheme|darkTheme}.notification.neutralSoft
+ background: theme.{light|dark}.notification.infoSoft // or `themeLightNotificationInfoSoft` as single import

- background: color.{lightTheme|darkTheme}.state.hover
+ background: theme.{light|dark}.state.hover // or `themeLightStateHover` as single import
- background: color.{lightTheme|darkTheme}.state.active
+ background: theme.{light|dark}.state.active // or `themeLightStateActive` as single import
- background: color.{lightTheme|darkTheme}.state.focus
+ background: theme.{light|dark}.state.focus // or `themeLightStateFocus` as single import
- background: color.{lightTheme|darkTheme}.state.disabled
+ background: theme.{light|dark}.state.disabled // or `themeLightStateDisabled` as single import

- background: color.external // removed entirely
});
```

#### Spacings

With the new Porsche design language, fluid spacings in addition to static ones are introduced. For further information,
have a look at [spacing styles](https://designsystem.porsche.com/latest/styles/spacing).

```diff
- import { layout } from '@porsche-design-system/utilities';
+ import { spacingStatic } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const Component1 = styled.div({
- margin: layout.xSmall // or spacing['4']
+ margin: spacingStatic.xSmall // or `spacingStaticXSmall` as single import

- margin: layout.small // or spacing['8']
+ margin: spacingStatic.small // or `spacingStaticSmall` as single import

- margin: layout.medium // or spacing['16']
+ margin: spacingStatic.medium // or `spacingStaticMedium` as single import

- margin: layout.large // or spacing['32']
+ margin: spacingStatic.large // or `spacingStaticLarge` as single import

- margin: layout.xLarge // or spacing['48']
+ margin: spacingStatic.xLarge // or `spacingStaticXLarge` as single import

- margin: layout.xxLarge // or spacing['80']
+ margin: spacingStatic.xxLarge // or `spacingStaticXXLarge` as single import

- margin: spacing['24'] // removed entirely
- margin: spacing['40'] // removed entirely
- margin: spacing['56'] // removed entirely
- margin: spacing['64'] // removed entirely
- margin: spacing['72'] // removed entirely
});
```

#### Font

```diff
- import { font } from '@porsche-design-system/utilities';
+ import { fontFamily, fontWeight, fontSizeText, fontLineHeight } from '@porsche-design-system/components-{js|angular|react|vue}/styles';

const Component1 = styled.div({
- fontFamily: font.family,
+ fontFamily: fontFamily,

- fontWeight: font.weight.{thin|regular|semibold|bold},
+ fontWeight: fontWeight.{regular|semiBold|bold}, // or `fontWeight{Regular|SemiBold|Bold}` as single import

- ...font.size.{xSmall|small|medium|large|xLarge},
+ fontSize: fontSizeText.{xSmall|small|medium|large|xLarge}, // or `fontSizeText{XSmall|Small|Medium|Large|XLarge}` as single import
+ lineHeight: fontLineHeight,
});
```

### Functions

#### Media Query / Breakpoints

`mediaQuery()` was replaced by `getMediaQueryMin()`, `getMediaQueryMax()` and `getMediaQueryMinMax()`. Furthermore, the
functions accept only the predefined breakpoints from `base` to `xxl` and no custom breakpoints anymore. For further
information, have a look at [media query styles](https://designsystem.porsche.com/latest/styles/media-query).

```diff
- import { breakpoint, mediaQuery } from '@porsche-design-system/utilities';
+ import { getMediaQueryMin, getMediaQueryMax, getMediaQueryMinMax } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const Component1 = styled.div({
  color: 'royalblue',

  // up to predefined breakpoint xs apply color black
  [getMediaQueryMax('xs')]: {
    color: 'black'
  }

  // from predefined breakpoint xs to m apply color aqua
-  [mediaQuery(breakpoint.xs, breakpoint.m)]: {
+  [getMediaQueryMinMax('xs', 'm')]: {
    color: 'aqua'
  },

  // from predefined breakpoint m apply color deeppink
-  [mediaQuery(breakpoint.m)]: {
+  [getMediaQueryMin('m')]: {
    color: 'deeppink'
  }
}`;
```

`breakpoint` object key `xxs` is now `base`. For further information, have a look at
[media query styles](https://designsystem.porsche.com/latest/styles/media-query).

```diff
- import { breakpoint } from '@porsche-design-system/utilities';
+ import { breakpoint } from '@porsche-design-system/components-{js|angular|react|vue}/styles';

- if (window.matchMedia(`(min-width: ${breakpoint.xxs}px)`).matches) {
+ if (window.matchMedia(`(min-width: ${breakpoint.base}px)`).matches) {
  /* The viewport is greater than, or equal to the breakpointValue wide */
}
```

#### Typography

With the new Porsche design language, fluid typography was introduced. For further information, have a look at
[typography styles](https://designsystem.porsche.com/latest/styles/typography).

```diff
- import { title, headline, text } from '@porsche-design-system/utilities';
+ import {
  displayLargeStyle,
  headingXXLargeStyle,
  headingXLargeStyle,
  headingLargeStyle,
  headingMediumStyle,
  headingSmallStyle,
  textXSmallStyle,
  textSmallStyle,
  textMediumStyle,
  textLargeStyle,
  textXLargeStyle,
} from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const Component1 = styled.h1({
- ...title.large,
+ ...displayLargeStyle,
});

const Component2 = styled.h2({
- ...headline['1|2|3|4|5'],
+ ...heading{XXLarge|XLarge|Large|Medium|Small}Style,
});

const Component3 = styled.p({
- ...text.{xSmall|small|medium|large|xLarge},
+ ...text{XSmall|Small|Medium|Large|XLarge}Style,
});
```

#### State

With the new Porsche design language, the focus outline got blue with rounded corners. For further information, have a
look at [focus styles](https://designsystem.porsche.com/latest/styles/focus).

```diff
- import { focus } from '@porsche-design-system/utilities';
+ import { getFocusStyle } from '@porsche-design-system/components-{js|angular|react|vue}/styles';
import styled from 'styled-components';

const Component1 = styled.a({
- ...focus()
+ ...getFocusStyle()
});

// pseudo and color option is not supported anymore
const Component2 = styled.a({
- ...focus({ color: color.state.focus, offset: '1px', pseudo: '::before' })
+ ...getFocusStyle({ offset: '1px' })
});
```

### Helper

`generateFontDefinition()`, `generateTypeScale()`, `calculateLineHeight()`, `pxToRem()` and `remToPx()` were removed.

## SCSS

tbd.
