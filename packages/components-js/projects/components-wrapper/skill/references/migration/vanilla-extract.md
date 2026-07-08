# Migration Guide

## ⭐ Introducing Color Scheme

The new color system leverages the CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) function to deliver native, preference-based theming. By adopting this browser-native engine, we have eliminated the need for proprietary switching logic, resulting in a more performant and standardized architecture.

> **⚠️ Deprecation Notice:** Legacy Vanilla Extract color variables are officially deprecated and scheduled for removal in the next major release. We recommend migrating to the new functional tokens immediately to ensure your components remain future-proof.

### Core Implementation

All colors and styles are now driven by the CSS [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme) property. To ensure broad compatibility, we provide the global `colorSchemeStyles`, which generates utility classes and includes a polyfill for browsers that do not yet support `light-dark()` (see [browser support](https://caniuse.com/mdn-css_types_color_light-dark)).

#### Utility Classes

Apply these classes to the document or any container to control the color-scheme context:

- `.scheme-light` — Forces light mode.
- `.scheme-dark` — Forces dark mode.
- `.scheme-light-dark` — Dynamically follows system/OS settings.

### Usage

#### 1. Global Setup

Include the global styles once in your `app.css.ts` to initialize the color-scheme utilities.

```diff
// app.css.ts

+ import { colorSchemeStyles } from '@porsche-design-system/components-react/vanilla-extract';
+ import { type GlobalStyleRule, globalStyle } from '@vanilla-extract/css';

+ for (const { selector, rule } of colorSchemeStyles) {
+   globalStyle(selector, rule as GlobalStyleRule);
+ }
```

#### 2. Component Implementation

Utilize the new tokens within your styles. These variables automatically resolve to the correct value based on the active color-scheme.

```tsx
import { colorFrosted, colorPrimary } from '@porsche-design-system/components-react/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const myComponent = style({
  backgroundColor: colorFrosted,
  color: colorPrimary,
});
```

#### 3. Application

The defined color-scheme context will cascade to all child elements.

```tsx
import { myComponent } from './myComponent.css';

<!-- Defined color-scheme will be applied to all child elements -->
export const App = () => {
  return (
    <div className="scheme-dark">
      <div className={myComponent}></div>
    </div>
  );
};
```

## 👹 Breaking Changes

- Removed `getHoverStyle` since it did not work reliable.
- Removed `opts` parameter in `getSkeletonStyle()` including `theme` (New skeleton style works with `light-dark()` CSS color function)

```diff
const skeletonAnimation = keyframes(skeletonKeyframes);
- const Skeleton = style(getSkeletonStyle(skeletonAnimation, { theme: 'light|dark' }));
+ const Skeleton = style(getSkeletonStyle(skeletonAnimation));
```

## 🤡 Deprecations (will be removed in v5)

Please transition to the new styles as soon as possible. All legacy styles are currently deprecated and are scheduled for removal in the next major release.

### Import path

Changed import path for Vanilla Extract styles.

```diff
- import { … } from '@porsche-design-system/components-js/styles/vanilla-extract';
+ import { … } from '@porsche-design-system/components-js/vanilla-extract';
```

### Blur

See [Emotion Blur Examples](../styles/vanilla-extract.md) for more details.

```diff
- ...frostedGlassStyle,
+ backdropFilter: blurFrosted,
```

### Border

See [Vanilla Extract Border Examples](../styles/vanilla-extract.md) for more details.

```diff
- borderRadius: borderRadiusMedium,
+ borderRadius: radiusMd,
- borderRadius: borderRadiusSmall,
+ borderRadius: radiusSm,
- borderRadius: borderRadiusLarge,
+ borderRadius: radiusLg,
- borderWidth: borderWidthBase,
+ borderWidth: 2px,
- borderWidth: borderWidthThin,
+ borderWidth: 1px;
```

### Color

New color definitions now leverage the native CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) function. You can explore implementation samples in the [Vanilla Extract Color Examples](../styles/vanilla-extract.md) or dive deeper into our system architecture in the [Theme Guide](https://designsystem.porsche.com/must-know/theme).

```diff
- themeLightPrimary
- themeDarkPrimary
+ colorPrimary
- themeLightBackgroundBase
- themeDarkBackgroundBase
+ colorCanvas
- themeLightBackgroundSurface
- themeDarkBackgroundSurface
+ colorSurface
- themeLightBackgroundShading
- themeDarkBackgroundShading
+ colorBackdrop
- themeLightBackgroundFrosted
- themeDarkBackgroundFrosted
+ colorFrosted
- themeLightContrastLow
- themeDarkContrastLow
+ colorContrastLow
- themeLightContrastMedium
- themeDarkContrastMedium
+ colorContrastMedium
- themeLightContrastHigh
- themeDarkContrastHigh
+ colorContrastHigh
- themeLightNotificationSuccess
- themeDarkNotificationSuccess
+ colorSuccess
- themeLightNotificationSuccessSoft
- themeDarkNotificationSuccessSoft
+ colorSuccessFrosted
- themeLightNotificationWarning
- themeDarkNotificationWarning
+ colorWarning
- themeLightNotificationWarningSoft
- themeDarkNotificationWarningSoft
+ colorWarningFrosted
- themeLightNotificationError
- themeDarkNotificationError
+ colorError
- themeLightNotificationErrorSoft
- themeDarkNotificationErrorSoft
+ colorErrorFrosted
- themeLightNotificationInfo
- themeDarkNotificationInfo
+ colorInfo
- themeLightNotificationInfoSoft
- themeDarkNotificationInfoSoft
+ colorInfoFrosted
- themeLightStateHover
- themeDarkStateHover
// Not renamed yet, will be removed in next major release
- themeLightStateActive
- themeDarkStateActive
// Not renamed yet, will be removed in next major release
- themeLightStateFocus
- themeDarkStateFocus
+ colorFocus
- themeLightStateDisabled
- themeDarkStateDisabled
+ colorContrastLower
```

### Focus

See [Vanilla Extract Focus Examples](../styles/vanilla-extract.md) for more details.

```diff
- ...getFocusStyle(),
+ ...getFocusVisibleStyle(),
```

### Gradient

See [Vanilla Extract Gradient Examples](../styles/vanilla-extract.md) for more details.

```diff
- ...gradientToBottomStyle,
+ background: `linear-gradient(to bottom, ${gradientStopsFadeDark});`
- ...gradientToLeftStyle,
+ background: `linear-gradient(to left, ${gradientStopsFadeDark});`
- ...gradientToRightStyle,
+ background: `linear-gradient(to right, ${gradientStopsFadeDark});`
- ...gradientToTopStyle,
+ background: `linear-gradient(to top, ${gradientStopsFadeDark});`
```

### Motion

See [Vanilla Extract Motion Examples](../styles/vanilla-extract.md) for more details.

```diff
- transitionDuration: motionDurationShort,
+ transitionDuration: durationSm,
- transitionDuration: motionDurationModerate,
+ transitionDuration: durationMd,
- transitionDuration: motionDurationLong,
+ transitionDuration: durationLg,
- transitionDuration: motionDurationVeryLong,
+ transitionDuration: durationXl,
- transitionTimingFunction: motionEasingBase,
+ transitionTimingFunction: easeInOut,
- transitionTimingFunction: motionEasingIn,
+ transitionTimingFunction: easeIn,
- transitionTimingFunction: motionEasingOut,
+ transitionTimingFunction: easeOut,
```

### Shadow

See [Vanilla Extract Shadow Examples](../styles/vanilla-extract.md) for more details.

```diff
- ...dropShadowHighStyle,
+ boxShadow: shadowLg,
- ...dropShadowMediumStyle,
+ boxShadow: shadowMd,
- ...dropShadowLowStyle,
+ boxShadow: shadowSm,
```

### Spacing

See [Vanilla Extract Spacing Examples](../styles/vanilla-extract.md) for more details.

```diff
- spacingFluidXSmall
+ spacingFluidXs
- spacingFluidSmall
+ spacingFluidSm
- spacingFluidMedium
+ spacingFluidMd
- spacingFluidLarge
+ spacingFluidLg
- spacingFluidXLarge
+ spacingFluidXl
- spacingFluidXXLarge
+ spacingFluid2Xl
- spacingStaticXSmall
+ spacingStaticXs
- spacingStaticSmall
+ spacingStaticSm
- spacingStaticMedium
+ spacingStaticMd
- spacingStaticLarge
+ spacingStaticLg
- spacingStaticXLarge
+ spacingStaticXl
- spacingStaticXXLarge
+ spacingStatic2Xl
```

### Typography

See [Vanilla Extract Typography Examples](../styles/vanilla-extract.md) for more details.

```diff
- ...displayLargeStyle,
+ ...proseHeading5XlStyle,
- ...displayMediumStyle,
+ ...proseHeading4XlStyle,
- ...displaySmallStyle,
+ ...proseHeading3XlStyle,
- ...headingXXLargeStyle,
+ ...proseHeading2XlStyle,
- ...headingXLargeStyle,
+ ...proseHeadingXlStyle,
- ...headingLargeStyle,
+ ...proseHeadingLgStyle,
- ...headingMediumStyle,
+ ...proseHeadingMdStyle,
- ...headingSmallStyle,
+ ...proseHeadingSmStyle,
- ...textXLargeStyle,
+ ...proseTextXlStyle,
- ...textLargeStyle,
+ ...proseTextLgStyle,
- ...textMediumStyle,
+ ...proseTextMdStyle,
- ...textSmallStyle,
+ ...proseTextSmStyle,
- ...textXSmallStyle,
+ ...proseTextXsStyle,
- ...textXXSmallStyle,
+ ...proseText2XsStyle,
```

Font variables:

```diff
- fontFamily
+ fontPorscheNext
- fontLineHeight
+ leadingNormal
- fontWeightRegular
+ fontWeightNormal
- fontWeightSemiBold
+ fontWeightSemibold
- fontSizeTextXXSmall
+ typescale2Xs
- fontSizeTextXSmall
+ typescaleXs
- fontSizeTextSmall
+ typescaleSm
- fontSizeTextMedium
+ typescaleMd
- fontSizeTextLarge
+ typescaleLg
- fontSizeTextXLarge
+ typescaleXl
- fontSizeHeadingSmall
+ typescaleSm
- fontSizeHeadingMedium
+ typescaleMd
- fontSizeHeadingLarge
+ typescaleLg
- fontSizeHeadingXLarge
+ typescaleXl
- fontSizeHeadingXXLarge
+ typescale2Xl
- fontSizeDisplay.small
+ typescale3Xl
- fontSizeDisplay.medium
+ typescale4Xl
- fontSizeDisplay.large
+ typescale5Xl
```
