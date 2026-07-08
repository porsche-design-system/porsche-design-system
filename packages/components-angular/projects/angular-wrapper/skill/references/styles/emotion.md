# Porsche Design System — Emotion

The Porsche Design System ships a ready-made [Emotion](https://emotion.sh) package: a curated catalog of design tokens
exposed as JavaScript values (colors, typography, spacing, border radii, blur, shadow, motion and breakpoints) plus a
set of documented style utilities (the layout grid, focus, skeletons, media queries, typography shorthands and the
color-scheme styles). Every documented symbol is a named export you import and apply inside your Emotion `css`/`styled`
styles.

Reach for these foundational styles when you build a custom component or pattern that is not yet available in the
component library, or for foundational layout work such as typography, surfaces and boxes.

This document is an index of the package. Tokens resolve to native CSS
[`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) custom
properties at runtime, so the exact value follows the active color scheme — import the token by name and let it resolve.

## How to use

### Import

Install Emotion (see the [official guide](https://emotion.sh/docs/install)), then import the documented
tokens and utilities from the Porsche Design System Emotion entry:

```ts
import { colorPrimary, spacingFluidMd } from '@porsche-design-system/components-angular/emotion';
import styled from '@emotion/styled';

const Card = styled.div({
  color: colorPrimary,
  padding: spacingFluidMd,
});
```

Tokens are plain values you assign to CSS properties; utilities are style objects or functions you
spread/call inside your styles (e.g. `css(getFocusVisibleStyle())`, `<Global styles={colorSchemeStyles} />`).

### Color scheme (light / dark)

Colors are driven by the native CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
function via the CSS [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
property — no proprietary switching logic. Include the global `colorSchemeStyles` **once** in your
global styles to generate the `.scheme-*` utility classes and add a polyfill for browsers without
`light-dark()` support:

```tsx
import { colorSchemeStyles } from '@porsche-design-system/components-angular/emotion';
import { Global } from '@emotion/react';

// global setup
<Global styles={colorSchemeStyles} />;
```

Then use the light-dark color tokens in your component styles; they resolve to the correct value for
the active theme automatically. Apply one of the `.scheme-*` classes to the document or any container
and the selected context cascades to all child elements:

- `.scheme-light` — forces light mode.
- `.scheme-dark` — forces dark mode.
- `.scheme-light-dark` — dynamically follows the system/OS setting.

```tsx
<div className="scheme-dark">{/* rendered in dark mode */}</div>
```

### Tokens and utilities

Every documented token is a named value export (e.g. `colorPrimary`, `radiusMd`); every documented
utility is a style object or a function returning one (e.g. `getMediaQueryMin`, `proseHeadingMdStyle`,
`gridNarrow`). Use the reference below to discover what is available.

### Deprecated aliases

The package still ships legacy exports as deprecated aliases so existing code keeps working. They are
intentionally **not** listed here — prefer the documented tokens and utilities below for new code.

## Contents

- [Tokens](#tokens) — Border, Blur, Breakpoint, Color, Font, Shadow, Spacing, Motion, Gradient, Grid
- [Utilities](#utilities) — Breakpoint, Color, Font, Typography (Heading / Text), Skeleton, Focus, Media query, Grid (Base / Narrow / Basic / Extended / Wide / Full)

## Tokens

### Border — Radius

| Export | Description | Value |
| --- | --- | --- |
| `radiusXs` | Holds a **x-small** `border-radius`. | `2px` |
| `radiusSm` | Holds a **small** `border-radius`. | `4px` |
| `radiusMd` | Holds a **medium** `border-radius`. Used for `p-checkbox` in **compact mode**. | `6px` |
| `radiusLg` | Holds a **large** `border-radius`. Used for interactive controls in **compact mode** (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…). | `8px` |
| `radiusXl` | Holds a **x-large** `border-radius`. Used for interactive controls (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…). Defines the primary visual appearance alongside **radius3Xl**. | `12px` |
| `radius2Xl` | Holds a **2x-large** `border-radius`. Used for notification components (e.g. `p-banner`, `p-inline-notification`, `p-toast`,…). | `16px` |
| `radius3Xl` | Holds a **3x-large** `border-radius`. Used for card-like containers or dialogs (e.g. `p-link-tile`, `p-modal`, `p-flyout`, `p-sheet`,…). Defines the primary visual appearance alongside **radiusXl**. | `24px` |
| `radius4Xl` | Holds a **4x-large** `border-radius`. | `32px` |
| `radiusFull` | Holds a **fully** rounded `border-radius`. Used for pill shapes (e.g. `p-tag`, `p-switch`,…). Recommended only for standalone indicators. | `calc(infinity * 1px)` |

### Blur

| Export | Description | Value |
| --- | --- | --- |
| `blurFrosted` | Holds a blur value for a **frosted** effect when combined with a semi-transparent color. | `blur(32px)` |

### Breakpoint

| Export | Description | Value |
| --- | --- | --- |
| `breakpointXS` | Holds the `xs` breakpoint value. | `480` |
| `breakpointS` | Holds the `sm` breakpoint value. | `760` |
| `breakpointM` | Holds the `md` breakpoint value. | `1000` |
| `breakpointL` | Holds the `lg` breakpoint value. | `1300` |
| `breakpointXL` | Holds the `xl` breakpoint value. | `1760` |
| `breakpointXXL` | Holds the `2xl` breakpoint value. | `1920` |
| `breakpointBase` | Holds the `base` breakpoint value. | `0` |

### Color — Background

| Export | Description | Value |
| --- | --- | --- |
| `colorCanvas` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **canvas** color, typically used for surfaces. | `var(--_color-canvas, light-dark(#fff,hsl(225 66.7% 1.2%)))` |
| `colorSurface` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **surface** color, typically used for surfaces. | `var(--_color-surface, light-dark(hsl(240 10% 95%),hsl(240 2% 10%)))` |
| `colorFrosted` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted** color, typically used as a background in combination with `blur()`. | `var(--_color-frosted, light-dark(hsl(240 5% 70% / 0.148),hsl(240 2% 43% / 0.228)))` |
| `colorFrostedSoft` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted-soft** color, typically used as a background `:hover`. | `var(--_color-frosted-soft, light-dark(hsl(234 9.8% 60% / 0.06),hsl(240 3.7% 26.5% / 0.154)))` |
| `colorFrostedStrong` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted-strong** color, typically used as a background in combination with `blur()`. | `var(--_color-frosted-strong, light-dark(hsl(236 6.5% 42% / 0.236),hsl(240 1.5% 61.8% / 0.302)))` |
| `colorBackdrop` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **backdrop** color, typically used for backdrops. | `var(--_color-backdrop, light-dark(hsl(240 5.3% 14.9% / 0.5),hsl(240 5.3% 14.9% / 0.5)))` |

### Color — Foreground

| Export | Description | Value |
| --- | --- | --- |
| `colorPrimary` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **primary** color, typically used for text. | `var(--_color-primary, light-dark(hsl(225 66.7% 1.2%),hsl(225 100% 99%)))` |
| `colorContrastHigher` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-higher** color, typically used for text. | `var(--_color-contrast-higher, light-dark(hsl(240 8.7% 9% / 0.8),hsl(240 12.5% 96.9% / 0.78)))` |
| `colorContrastHigh` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-high** color, typically used for text. | `var(--_color-contrast-high, light-dark(hsl(240 7.1% 11% / 0.7),hsl(240 12.5% 96.9% / 0.67)))` |
| `colorContrastMedium` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-medium** color, typically used for text. | `var(--_color-contrast-medium, light-dark(hsl(240 6.1% 7% / 0.6),hsl(240 12.5% 96.9% / 0.56)))` |
| `colorContrastLow` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-low** color, intended only for decorative elements. | `var(--_color-contrast-low, light-dark(hsl(240 5.3% 14.9% / 0.5),hsl(240 12.5% 96.9% / 0.45)))` |
| `colorContrastLower` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-lower** color, intended only for decorative elements. | `var(--_color-contrast-lower, light-dark(hsl(234 6% 32.9% / 0.324),hsl(240 1.5% 61.8% / 0.302)))` |

### Color — Semantic

| Export | Description | Value |
| --- | --- | --- |
| `colorInfo` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info** color, typically used for text. | `var(--_color-info, light-dark(hsl(228 83.2% 51%),hsl(210 100% 54.5%)))` |
| `colorInfoMedium` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-medium** color, typically used for text or border. | `var(--_color-info-medium, light-dark(hsl(228 83.2% 51% / 0.6),hsl(210 100% 54.5% / 0.6)))` |
| `colorInfoLow` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-low** color, typically used for text or border. | `var(--_color-info-low, light-dark(hsl(228 83.2% 51% / 0.18),hsl(210 100% 54.5% / 0.18)))` |
| `colorInfoFrosted` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-frosted** color, typically used as background with `.backdrop-blur-frosted`. | `var(--_color-info-frosted, light-dark(hsl(211 100% 90% / 0.55),hsl(210 79% 20% / 0.66)))` |
| `colorInfoFrostedSoft` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-frosted-soft** color, typically used as background `:hover`. | `var(--_color-info-frosted-soft, light-dark(hsl(211 80% 95% / 0.55),hsl(210 59% 15% / 0.66)))` |
| `colorSuccess` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success** color, typically used for text. | `var(--_color-success, light-dark(hsl(115 77.5% 27.8%),hsl(157 84.9% 41.6%)))` |
| `colorSuccessMedium` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-medium** color, typically used for text or border. | `var(--_color-success-medium, light-dark(hsl(115 77.5% 27.8% / 0.6),hsl(157 84.9% 41.6% / 0.6)))` |
| `colorSuccessLow` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-low** color, typically used for text or border. | `var(--_color-success-low, light-dark(hsl(115 77.5% 27.8% / 0.18),hsl(157 84.9% 41.6% / 0.18)))` |
| `colorSuccessFrosted` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-frosted** color, typically used as background with `.backdrop-blur-frosted`. | `var(--_color-success-frosted, light-dark(hsl(109 100% 90% / 0.55),hsl(157 79% 20% / 0.66)))` |
| `colorSuccessFrostedSoft` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-frosted-soft** color, typically used as background `:hover`. | `var(--_color-success-frosted-soft, light-dark(hsl(109 80% 95% / 0.55),hsl(157 59% 15% / 0.66)))` |
| `colorWarning` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning** color, typically used for text. | `var(--_color-warning, light-dark(hsl(28 97.7% 34.1%),hsl(28 90.2% 56.1%)))` |
| `colorWarningMedium` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-medium** color, typically used for text or border. | `var(--_color-warning-medium, light-dark(hsl(28 97.7% 34.1% / 0.6),hsl(28 90.2% 56.1% / 0.6)))` |
| `colorWarningLow` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-low** color, typically used for text or border. | `var(--_color-warning-low, light-dark(hsl(28 97.7% 34.1% / 0.18),hsl(28 90.2% 56.1% / 0.18)))` |
| `colorWarningFrosted` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-frosted** color, typically used as background with `.backdrop-blur-frosted`. | `var(--_color-warning-frosted, light-dark(hsl(40 100% 90% / 0.55),hsl(52 79% 20% / 0.66)))` |
| `colorWarningFrostedSoft` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-frosted-soft** color, typically used as background `:hover`. | `var(--_color-warning-frosted-soft, light-dark(hsl(40 80% 95% / 0.55),hsl(52 59% 15% / 0.66)))` |
| `colorError` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error** color, typically used for text. | `var(--_color-error, light-dark(hsl(357 78% 41%),hsl(0 96.9% 62%)))` |
| `colorErrorMedium` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-medium** color, typically used for text or border. | `var(--_color-error-medium, light-dark(hsl(357 78% 41% / 0.6),hsl(0 96.9% 62% / 0.6)))` |
| `colorErrorLow` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-low** color, typically used for text or border. | `var(--_color-error-low, light-dark(hsl(357 78% 41% / 0.18),hsl(0 96.9% 62% / 0.18)))` |
| `colorErrorFrosted` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-frosted** color, typically used as background with `.backdrop-blur-frosted`. | `var(--_color-error-frosted, light-dark(hsl(0 100% 90% / 0.55),hsl(0 79% 20% / 0.66)))` |
| `colorErrorFrostedSoft` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-frosted-soft** color, typically used as background `:hover`. | `var(--_color-error-frosted-soft, light-dark(hsl(0 80% 95% / 0.55),hsl(0 59% 15% / 0.66)))` |

### Color — A11y

| Export | Description | Value |
| --- | --- | --- |
| `colorFocus` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **focus** color, typically used as the outline for `:focus-visible` states. | `var(--_color-focus, light-dark(#1A44EA,#1A44EA))` |

### Font — Family

| Export | Description | Value |
| --- | --- | --- |
| `fontPorscheNext` | Holds the **Porsche Next** font family along with fallback fonts. | `'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif` |
| `fontPorscheNextZhHans` | Holds the **Porsche Next** font family along with fallback fonts for **Simplified Chinese**. | `'Porsche Next', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', 'Arial Narrow', Arial, sans-serif` |
| `fontPorscheNextZhHant` | Holds the **Porsche Next** font family along with fallback fonts for **Traditional Chinese**. | `'Porsche Next', 'PingFang TC', 'Microsoft JhengHei', 'Noto Sans TC', 'Arial Narrow', Arial, sans-serif` |
| `fontPorscheNextJa` | Holds the **Porsche Next** font family along with fallback fonts for **Japanese**. | `'Porsche Next', 'Hiragino Sans', 'Yu Gothic', 'Noto Sans JP', 'Arial Narrow', Arial, sans-serif` |
| `fontPorscheNextKo` | Holds the **Porsche Next** font family along with fallback fonts for **Korean**. | `'Porsche Next', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', 'Arial Narrow', Arial, sans-serif` |

### Font — Weight

| Export | Description | Value |
| --- | --- | --- |
| `fontWeightNormal` | Holds the **normal** font weight optimized for the Porsche Next typeface. | `400` |
| `fontWeightSemibold` | Holds the **semibold** font weight optimized for the Porsche Next typeface. | `600` |
| `fontWeightBold` | Holds the **bold** font weight optimized for the Porsche Next typeface. | `700` |

### Font — Line height

| Export | Description | Value |
| --- | --- | --- |
| `leadingNormal` | Holds a dynamic default line height specifically optimized for the Porsche Next typeface. | `calc(6px + 2.125ex)` |

### Font — Size

| Export | Description | Value |
| --- | --- | --- |
| `typescale2Xs` | Holds the **2x-small** font size optimized for the Porsche Next typeface. | `.75rem` |
| `typescaleXs` | Holds the **x-small** font size optimized for the Porsche Next typeface. | `.875rem` |
| `typescaleSm` | Holds the **small** font size optimized for the Porsche Next typeface. | `1rem` |
| `typescaleMd` | Holds the **medium** font size optimized for the Porsche Next typeface. | `clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)` |
| `typescaleLg` | Holds the **large** font size optimized for the Porsche Next typeface. | `clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)` |
| `typescaleXl` | Holds the **x-large** font size optimized for the Porsche Next typeface. | `clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)` |
| `typescale2Xl` | Holds the **2x-large** font size optimized for the Porsche Next typeface. | `clamp(1.6rem, 1.56vw + 1.29rem, 3.16rem)` |
| `typescale3Xl` | Holds the **3x-large** font size optimized for the Porsche Next typeface. | `clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem)` |
| `typescale4Xl` | Holds the **4x-large** font size optimized for the Porsche Next typeface. | `clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem)` |
| `typescale5Xl` | Holds the **5x-large** font size optimized for the Porsche Next typeface. | `clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem)` |

### Shadow

| Export | Description | Value |
| --- | --- | --- |
| `shadowSm` | Holds a **small** `shadow`. | `0px 3px 8px rgba(0,0,0,.16)` |
| `shadowMd` | Holds a **medium** `shadow`. | `0px 4px 16px rgba(0,0,0,.16)` |
| `shadowLg` | Holds a **large** `shadow`. | `0px 8px 40px rgba(0,0,0,.16)` |

### Spacing — Fluid

| Export | Description | Value |
| --- | --- | --- |
| `spacingFluidXs` | Holds the **x-small fluid** spacing. | `clamp(4px, 0.25vw + 3px, 8px)` |
| `spacingFluidSm` | Holds the **small fluid** spacing. | `clamp(8px, 0.5vw + 6px, 16px)` |
| `spacingFluidMd` | Holds the **medium fluid** spacing. | `clamp(16px, 1.25vw + 12px, 36px)` |
| `spacingFluidLg` | Holds the **large fluid** spacing. | `clamp(32px, 2.75vw + 23px, 76px)` |
| `spacingFluidXl` | Holds the **x-large fluid** spacing. | `clamp(48px, 3vw + 38px, 96px)` |
| `spacingFluid2Xl` | Holds the **2x-large fluid** spacing. | `clamp(80px, 7.5vw + 56px, 200px)` |

### Spacing — Static

| Export | Description | Value |
| --- | --- | --- |
| `spacingStatic2Xs` | Holds the **2x-small static** spacing. | `1px` |
| `spacingStaticXs` | Holds the **x-small static** spacing. | `4px` |
| `spacingStaticSm` | Holds the **small static** spacing. | `8px` |
| `spacingStaticMd` | Holds the **medium static** spacing. | `16px` |
| `spacingStaticLg` | Holds the **large static** spacing. | `32px` |
| `spacingStaticXl` | Holds the **x-large static** spacing. | `48px` |
| `spacingStatic2Xl` | Holds the **2x-large static** spacing. | `80px` |

### Motion — Duration

| Export | Description | Value |
| --- | --- | --- |
| `durationSm` | Holds a **short** `transition-duration` / `animation-duration`. | `.25s` |
| `durationMd` | Holds a **moderate** `transition-duration` / `animation-duration`. | `.4s` |
| `durationLg` | Holds a **long** `transition-duration` / `animation-duration`. | `.6s` |
| `durationXl` | Holds a **very long** `transition-duration` / `animation-duration`. | `1.2s` |

### Motion — Ease

| Export | Description | Value |
| --- | --- | --- |
| `easeInOut` | Holds an **in-out** `transition-timing-function`. | `cubic-bezier(.25,.1,.25,1)` |
| `easeIn` | Holds an **in** `transition-timing-function`. | `cubic-bezier(0,0,.2,1)` |
| `easeOut` | Holds an **out** `transition-timing-function`. | `cubic-bezier(.4,0,.5,1)` |

### Gradient

| Export | Description | Value |
| --- | --- | --- |
| `gradientStopsFadeDark` | Holds color stops for a faded gradient, used as `background-image`. | `hsla(0,0%,0%,.8) 0%,hsla(0,0%,0%,.8) 8.1%,hsla(0,0%,0%,.8) 15.5%,hsla(0,0%,0%,.8) 22.5%,hsla(0,0%,0%,.78) 29%,hsla(0,0%,0%,.73) 35.3%,hsla(0,0%,0%,.67) 41.2%,hsla(0,0%,0%,.6) 47.1%,hsla(0,0%,0%,.52) 52.9%,hsla(0,0%,0%,.44) 58.8%,hsla(0,0%,0%,.33) 64.7%,hsla(0,0%,0%,.22) 71%,hsla(0,0%,0%,.12) 77.5%,hsla(0,0%,0%,.05) 84.5%,hsla(0,0%,0%,.011) 91.9%,hsla(0,0%,0%,0) 100%` |

### Grid — Base

| Export | Description | Value |
| --- | --- | --- |
| `gridGap` | Holds the grid **gap** of the Porsche Grid. | `clamp(16px, 1.25vw + 12px, 36px)` |

### Grid — Narrow

| Export | Description | Value |
| --- | --- | --- |
| `gridNarrowColumnStart` | Holds the **start** position of the `narrow` area within the Porsche Grid. | `narrow-start` |
| `gridNarrowColumnEnd` | Holds the **end** position of the `narrow` area within the Porsche Grid. | `narrow-end` |
| `gridNarrowSpanOneHalf` | Holds a **one half** span within the `narrow` area of the Porsche Grid. | `var(--pds-grid-narrow-span-one-half)` |
| `gridNarrowOffsetBase` | Holds a **base** offset within the `narrow` area of the Porsche Grid. | `max(22px, 10.625vw - 12px)` |
| `gridNarrowOffsetS` | Holds a **small** offset within the `narrow` area of the Porsche Grid. | `calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * 4)` |
| `gridNarrowOffsetXXL` | Holds a **xxl** offset within the `narrow` area of the Porsche Grid. | `calc(max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * 4)` |

### Grid — Basic

| Export | Description | Value |
| --- | --- | --- |
| `gridBasicColumnStart` | Holds the **start** position of the `basic` area within the Porsche Grid. | `basic-start` |
| `gridBasicColumnEnd` | Holds the **end** position of the `basic` area within the Porsche Grid. | `basic-end` |
| `gridBasicSpanOneHalf` | Holds a **half** span within the `basic` area of the Porsche Grid. | `var(--pds-grid-basic-span-one-half)` |
| `gridBasicSpanOneThird` | Holds a **one third** span within the `basic` area of the Porsche Grid. | `var(--pds-grid-basic-span-one-third)` |
| `gridBasicSpanTwoThirds` | Holds a **two thirds** span within the `basic` area of the Porsche Grid. | `var(--pds-grid-basic-span-two-thirds)` |
| `gridBasicOffsetBase` | Holds a **base** offset within the `basic` area of the Porsche Grid. | `max(22px, 10.625vw - 12px)` |
| `gridBasicOffsetS` | Holds a **small** offset within the `basic` area of the Porsche Grid. | `calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * 2)` |
| `gridBasicOffsetXXL` | Holds a **xxl** offset within the `basic` area of the Porsche Grid. | `calc(max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * 2)` |

### Grid — Extended

| Export | Description | Value |
| --- | --- | --- |
| `gridExtendedColumnStart` | Holds the **start** position of the `extended` area within the Porsche Grid. | `extended-start` |
| `gridExtendedColumnEnd` | Holds the **end** position of the `extended` area within the Porsche Grid. | `extended-end` |
| `gridExtendedSpanOneHalf` | Holds a **half** span within the `extended` area of the Porsche Grid. | `var(--pds-grid-extended-span-one-half)` |
| `gridExtendedOffsetBase` | Holds a **base** offset within the `extended` area of the Porsche Grid. | `max(22px, 10.625vw - 12px)` |
| `gridExtendedOffsetS` | Holds a **small** offset within the `extended` area of the Porsche Grid. | `calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * 1)` |
| `gridExtendedOffsetXXL` | Holds a **xxl** offset within the `extended` area of the Porsche Grid. | `calc(max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * 1)` |

### Grid — Wide

| Export | Description | Value |
| --- | --- | --- |
| `gridWideColumnStart` | Holds the **start** position of the `wide` area within the Porsche Grid. | `wide-start` |
| `gridWideColumnEnd` | Holds the **end** position of the `wide` area within the Porsche Grid. | `wide-end` |
| `gridWideOffsetBase` | Holds a **base** offset within the `wide` area of the Porsche Grid. | `max(22px, 10.625vw - 12px)` |
| `gridWideOffsetS` | Holds a **small** offset within the `wide` area of the Porsche Grid. | `calc(5vw - 16px)` |
| `gridWideOffsetXXL` | Holds a **xxl** offset within the `wide` area of the Porsche Grid. | `calc(max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px))` |

### Grid — Full

| Export | Description | Value |
| --- | --- | --- |
| `gridFullColumnStart` | Holds the **start** position of the `full` area within the Porsche Grid. | `full-start` |
| `gridFullColumnEnd` | Holds the **end** position of the `full` area within the Porsche Grid. | `full-end` |
| `gridFullOffset` | Holds a **full** offset within the `full` area of the Porsche Grid. | `max(0px, 50vw - 2560px / 2)` |

## Utilities

### Breakpoint

| Export | Description |
| --- | --- |
| `breakpoint` | Object containing all breakpoint values. |
| `breakpoints` | Array containing all breakpoint keys. |

### Color

| Export | Description |
| --- | --- |
| `colorSchemeStyles` | Holds the global style rules for the `.scheme-*` color-scheme classes, including [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) fallback variables for browsers without support. |

### Font

| Export | Description |
| --- | --- |
| `getCJKFontFamilyStyle` | Applies locale-specific **Porsche Next** font stacks for **CJK** languages (Simplified Chinese, Traditional Chinese, Japanese, Korean) based on the element's `lang` attribute. |
| `fontHyphenationStyle` | Applies **hyphenation** styles (`overflow-wrap` and `hyphens`) to break and hyphenate long words. |

### Typography — Heading

| Export | Description |
| --- | --- |
| `proseHeading5XlStyle` | Applies the **5x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `proseHeading4XlStyle` | Applies the **4x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `proseHeading3XlStyle` | Applies the **3x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `proseHeading2XlStyle` | Applies the **2x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `proseHeadingXlStyle` | Applies the **x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `proseHeadingLgStyle` | Applies the **large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `proseHeadingMdStyle` | Applies the **medium** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `proseHeadingSmStyle` | Applies the **small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `proseHeadingXsStyle` | Applies the **x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `proseHeading2XsStyle` | Applies the **2x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |

### Typography — Text

| Export | Description |
| --- | --- |
| `proseText5XlStyle` | Applies the **5x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `proseText4XlStyle` | Applies the **4x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `proseText3XlStyle` | Applies the **3x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `proseText2XlStyle` | Applies the **2x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `proseTextXlStyle` | Applies the **x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `proseTextLgStyle` | Applies the **large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `proseTextMdStyle` | Applies the **medium** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `proseTextSmStyle` | Applies the **small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `proseTextXsStyle` | Applies the **x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `proseText2XsStyle` | Applies the **2x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |

### Skeleton

| Export | Description |
| --- | --- |
| `getSkeletonStyle` | Applies a skeleton placeholder style to indicate loading state. |

### Focus

| Export | Description |
| --- | --- |
| `getFocusVisibleStyle` | Applies a **focus-visible** style. |

### Media query

| Export | Description |
| --- | --- |
| `getMediaQueryMax` | Applies a **max** media query with the specified breakpoint. |
| `getMediaQueryMin` | Applies a **min** media query with the specified breakpoint. |
| `getMediaQueryMinMax` | Applies a **min-max** media query with the specified breakpoints. |

### Grid — Base

| Export | Description |
| --- | --- |
| `gridStyle` | Applies the **Porsche Grid** layout system (must be applied once at the top level, span the full viewport width, and cannot be nested). |

### Grid — Narrow

| Export | Description |
| --- | --- |
| `gridNarrow` | Object containing all `narrow` grid styles. |
| `gridNarrowOffset` | Object containing all `narrow` grid offset styles. |

### Grid — Basic

| Export | Description |
| --- | --- |
| `gridBasic` | Object containing all `basic` grid styles. |
| `gridBasicOffset` | Object containing all `basic` grid offset styles. |

### Grid — Extended

| Export | Description |
| --- | --- |
| `gridExtended` | Object containing all `extended` grid styles. |
| `gridExtendedOffset` | Object containing all `extended` grid offset styles. |

### Grid — Wide

| Export | Description |
| --- | --- |
| `gridWide` | Object containing all `wide` grid styles. |
| `gridWideOffset` | Object containing all `wide` grid offset styles. |

### Grid — Full

| Export | Description |
| --- | --- |
| `gridFull` | Object containing all `full` grid styles. |
