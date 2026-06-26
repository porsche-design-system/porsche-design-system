# Porsche Design System — SCSS

The Porsche Design System ships a ready-made SCSS package: a curated catalog of design tokens
exposed as Sass variables (colors, typography, spacing, border radii, blur, shadow, motion and
breakpoints) plus a set of documented mixins (the layout grid, focus, skeletons,
media queries and typography shorthands). Importing it under the `pds` namespace makes every
documented `pds.$variable` and `pds.mixin` available to your stylesheets.

> Requires the [Dart Sass](https://sass-lang.com/dart-sass/) module system (`@use`).

Reach for these foundational styles when you build a custom component or pattern that is not yet
available in the component library, or for foundational layout work such as typography, surfaces and
boxes.

## How to use

### Import

Install Sass (see the [official guide](https://sass-lang.com/install/)), then add the Porsche Design
System SCSS package to your stylesheet with the Sass module system. Always import it under the `pds`
namespace so the variables and mixins are clearly scoped:

```scss
@use '@porsche-design-system/components-{js|angular|react|vue}/scss' as pds;

.my-card {
  border-radius: pds.$radius-md;
}
```

You can also forward it with `as *` to drop the namespace, but the explicit `pds` namespace is
recommended to avoid collisions.

### Color scheme (light / dark)

Colors are driven by the native CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
function via the CSS [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
property — no proprietary switching logic. Include the `color-scheme()` mixin **once** in your global
styles to generate the `.scheme-*` utility classes and add a polyfill for browsers without
`light-dark()` support:

```scss
// global styles
@use '@porsche-design-system/components-{js|angular|react|vue}/scss' as pds;

@include pds.color-scheme();

html, body {…}
```

Then use the light-dark color variables in your component styles; they resolve to the correct value
for the active theme automatically:

```scss
.my-component {
  background-color: pds.$color-frosted;
  color: pds.$color-primary;
}
```

Apply one of the `.scheme-*` classes to the document or any container; the selected context cascades
to all child elements:

- `.scheme-light` — forces light mode.
- `.scheme-dark` — forces dark mode.
- `.scheme-light-dark` — dynamically follows the system/OS setting.

```html
<html class="scheme-dark">
  <body>
    <!-- rendered in dark mode -->
    <div class="my-component"></div>
  </body>
</html>
```

### Variables and mixins

Every documented variable is a `$`-prefixed Sass variable (e.g. `pds.$radius-md`), and every
documented mixin is included with `@include` (e.g. `@include pds.media-query-min(m) { … }`). Use the
reference below to discover what is available; read the shipped partials for the exact values.

### Deprecated aliases

The package still ships the legacy `$pds-*` variables and `pds-*` mixins as deprecated aliases so
existing stylesheets keep compiling. Prefer the documented variables and mixins listed here for new
code.

## Contents

- [Variables](#variables) — Border, Blur, Breakpoint, Color, Font, Shadow, Spacing, Motion, Gradient, Grid
- [Mixins](#mixins) — Typography, Skeleton, Focus, Media query, Grid

## Variables

### Border — Radius

| SCSS variable | Description |
| --- | --- |
| `$radius-xs` | Holds a **x-small** `border-radius`. |
| `$radius-sm` | Holds a **small** `border-radius`. |
| `$radius-md` | Holds a **medium** `border-radius`. Used for `p-checkbox` in **compact mode**. |
| `$radius-lg` | Holds a **large** `border-radius`. Used for interactive controls in **compact mode** (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…). |
| `$radius-xl` | Holds a **x-large** `border-radius`. Used for interactive controls (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…). Defines the primary visual appearance alongside **radius3Xl**. |
| `$radius-2xl` | Holds a **2x-large** `border-radius`. Used for notification components (e.g. `p-banner`, `p-inline-notification`, `p-toast`,…). |
| `$radius-3xl` | Holds a **3x-large** `border-radius`. Used for card-like containers or dialogs (e.g. `p-link-tile`, `p-modal`, `p-flyout`, `p-sheet`,…). Defines the primary visual appearance alongside **radiusXl**. |
| `$radius-4xl` | Holds a **4x-large** `border-radius`. |
| `$radius-full` | Holds a **fully** rounded `border-radius`. Used for pill shapes (e.g. `p-tag`, `p-switch`,…). Recommended only for standalone indicators. |

### Blur

| SCSS variable | Description |
| --- | --- |
| `$blur-frosted` | Holds a blur value for a **frosted** effect when combined with a semi-transparent color. |

### Breakpoint

| SCSS variable | Description |
| --- | --- |
| `$breakpoint-xs` | Holds the **x-small** responsive breakpoint. |
| `$breakpoint-sm` | Holds the **small** responsive breakpoint. |
| `$breakpoint-md` | Holds the **medium** responsive breakpoint. |
| `$breakpoint-lg` | Holds the **large** responsive breakpoint. |
| `$breakpoint-xl` | Holds the **x-large** responsive breakpoint. |
| `$breakpoint-2xl` | Holds the **2x-large** responsive breakpoint. |

### Color — Background

| SCSS variable | Description |
| --- | --- |
| `$color-canvas` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **canvas** color, typically used for surfaces. |
| `$color-surface` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **surface** color, typically used for surfaces. |
| `$color-frosted` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted** color, typically used as a background in combination with `blur()`. |
| `$color-frosted-soft` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted-soft** color, typically used as a background `:hover`. |
| `$color-frosted-strong` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **frosted** color, typically used as a background in combination with `blur()`. |
| `$color-backdrop` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **backdrop** color, typically used for backdrops. |

### Color — Foreground

| SCSS variable | Description |
| --- | --- |
| `$color-primary` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **primary** color, typically used for text. |
| `$color-contrast-higher` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-higher** color, typically used for text. |
| `$color-contrast-high` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-high** color, typically used for text. |
| `$color-contrast-medium` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-medium** color, typically used for text. |
| `$color-contrast-low` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-low** color, intended only for decorative elements. |
| `$color-contrast-lower` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **contrast-lower** color, intended only for decorative elements. |

### Color — Semantic

| SCSS variable | Description |
| --- | --- |
| `$color-info` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info** color, typically used for text. |
| `$color-info-medium` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-medium** color, typically used for text or border. |
| `$color-info-low` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-low** color, typically used for text or border. |
| `$color-info-frosted` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-frosted** color, typically used as background with `.backdrop-blur-frosted`. |
| `$color-info-frosted-soft` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **info-frosted-soft** color, typically used as background `:hover`. |
| `$color-success` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success** color, typically used for text. |
| `$color-success-medium` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-medium** color, typically used for text or border. |
| `$color-success-low` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-low** color, typically used for text or border. |
| `$color-success-frosted` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-frosted** color, typically used as background with `.backdrop-blur-frosted`. |
| `$color-success-frosted-soft` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **success-frosted-soft** color, typically used as background `:hover`. |
| `$color-warning` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning** color, typically used for text. |
| `$color-warning-medium` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-medium** color, typically used for text or border. |
| `$color-warning-low` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-low** color, typically used for text or border. |
| `$color-warning-frosted` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-frosted** color, typically used as background with `.backdrop-blur-frosted`. |
| `$color-warning-frosted-soft` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **warning-frosted-soft** color, typically used as background `:hover`. |
| `$color-error` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error** color, typically used for text. |
| `$color-error-medium` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-medium** color, typically used for text or border. |
| `$color-error-low` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-low** color, typically used for text or border. |
| `$color-error-frosted` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-frosted** color, typically used as background with `.backdrop-blur-frosted`. |
| `$color-error-frosted-soft` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **error-frosted-soft** color, typically used as background `:hover`. |

### Color — A11y

| SCSS variable | Description |
| --- | --- |
| `$color-focus` | Holds the [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) **focus** color, typically used as the outline for `:focus-visible` states. |

### Font — Family

| SCSS variable | Description |
| --- | --- |
| `$font-porsche-next` | Holds the **Porsche Next** font family along with fallback fonts. |
| `$font-porsche-next-zh-hans` | Holds the **Porsche Next** font family along with fallback fonts for **Simplified Chinese**. |
| `$font-porsche-next-zh-hant` | Holds the **Porsche Next** font family along with fallback fonts for **Traditional Chinese**. |
| `$font-porsche-next-ja` | Holds the **Porsche Next** font family along with fallback fonts for **Japanese**. |
| `$font-porsche-next-ko` | Holds the **Porsche Next** font family along with fallback fonts for **Korean**. |

### Font — Weight

| SCSS variable | Description |
| --- | --- |
| `$font-weight-normal` | Holds the **normal** font weight optimized for the Porsche Next typeface. |
| `$font-weight-semibold` | Holds the **semibold** font weight optimized for the Porsche Next typeface. |
| `$font-weight-bold` | Holds the **bold** font weight optimized for the Porsche Next typeface. |

### Font — Line height

| SCSS variable | Description |
| --- | --- |
| `$leading-normal` | Holds a dynamic default line height specifically optimized for the Porsche Next typeface. |

### Font — Size

| SCSS variable | Description |
| --- | --- |
| `$typescale-2xs` | Holds the **2x-small** font size optimized for the Porsche Next typeface. |
| `$typescale-xs` | Holds the **x-small** font size optimized for the Porsche Next typeface. |
| `$typescale-sm` | Holds the **small** font size optimized for the Porsche Next typeface. |
| `$typescale-md` | Holds the **medium** font size optimized for the Porsche Next typeface. |
| `$typescale-lg` | Holds the **large** font size optimized for the Porsche Next typeface. |
| `$typescale-xl` | Holds the **x-large** font size optimized for the Porsche Next typeface. |
| `$typescale-2xl` | Holds the **2x-large** font size optimized for the Porsche Next typeface. |
| `$typescale-3xl` | Holds the **3x-large** font size optimized for the Porsche Next typeface. |
| `$typescale-4xl` | Holds the **4x-large** font size optimized for the Porsche Next typeface. |
| `$typescale-5xl` | Holds the **5x-large** font size optimized for the Porsche Next typeface. |

### Shadow

| SCSS variable | Description |
| --- | --- |
| `$shadow-sm` | Holds a **small** `shadow`. |
| `$shadow-md` | Holds a **medium** `shadow`. |
| `$shadow-lg` | Holds a **large** `shadow`. |

### Spacing — Fluid

| SCSS variable | Description |
| --- | --- |
| `$spacing-fluid-xs` | Holds the **x-small fluid** spacing. |
| `$spacing-fluid-sm` | Holds the **small fluid** spacing. |
| `$spacing-fluid-md` | Holds the **medium fluid** spacing. |
| `$spacing-fluid-lg` | Holds the **large fluid** spacing. |
| `$spacing-fluid-xl` | Holds the **x-large fluid** spacing. |
| `$spacing-fluid-2xl` | Holds the **2x-large fluid** spacing. |

### Spacing — Static

| SCSS variable | Description |
| --- | --- |
| `$spacing-static-2xs` | Holds the **2x-small static** spacing. |
| `$spacing-static-xs` | Holds the **x-small static** spacing. |
| `$spacing-static-sm` | Holds the **small static** spacing. |
| `$spacing-static-md` | Holds the **medium static** spacing. |
| `$spacing-static-lg` | Holds the **large static** spacing. |
| `$spacing-static-xl` | Holds the **x-large static** spacing. |
| `$spacing-static-2xl` | Holds the **2x-large static** spacing. |

### Motion — Duration

| SCSS variable | Description |
| --- | --- |
| `$duration-sm` | Holds a **short** `transition-duration` / `animation-duration`. |
| `$duration-md` | Holds a **moderate** `transition-duration` / `animation-duration`. |
| `$duration-lg` | Holds a **long** `transition-duration` / `animation-duration`. |
| `$duration-xl` | Holds a **very long** `transition-duration` / `animation-duration`. |

### Motion — Ease

| SCSS variable | Description |
| --- | --- |
| `$ease-in-out` | Holds an **in-out** `transition-timing-function`. |
| `$ease-in` | Holds an **in** `transition-timing-function`. |
| `$ease-out` | Holds an **out** `transition-timing-function`. |

### Gradient

| SCSS variable | Description |
| --- | --- |
| `$gradient-stops-fade-dark` | Holds color stops for a faded gradient, used as `background-image`. |

### Grid — Base

| SCSS variable | Description |
| --- | --- |
| `$pds-grid-gap` | Holds the grid **gap** the Porsche Grid. |

### Grid — Narrow

| SCSS variable | Description |
| --- | --- |
| `$pds-grid-narrow-column-start` | Holds the **start** position of the `narrow` area within the Porsche Grid. |
| `$pds-grid-narrow-column-end` | Holds the **end** position of the `narrow` area within the Porsche Grid. |
| `$pds-grid-narrow-span-one-half` | Holds a **one third** span within the `narrow` area of the Porsche Grid. |
| `$pds-grid-narrow-offset-base` | Holds a **base** offset within the `narrow` area of the Porsche Grid. |
| `$pds-grid-narrow-offset-s` | Holds a **small** offset within the `narrow` area of the Porsche Grid. |
| `$pds-grid-narrow-offset-xxl` | Holds a **xxl** offset within the `narrow` area of the Porsche Grid. |

### Grid — Basic

| SCSS variable | Description |
| --- | --- |
| `$pds-grid-basic-column-start` | Holds the **start** position of the `basic` area within the Porsche Grid. |
| `$pds-grid-basic-column-end` | Holds the **end** position of the `basic` area within the Porsche Grid. |
| `$pds-grid-basic-span-one-half` | Holds a **half** span within the `basic` area of the Porsche Grid. |
| `$pds-grid-basic-span-one-third` | Holds a **one third** span within the `basic` area of the Porsche Grid. |
| `$pds-grid-basic-span-two-thirds` | Holds a **two thirds** span within the `basic` area of the Porsche Grid. |
| `$pds-grid-basic-offset-base` | Holds a **base** offset within the `base` area of the Porsche Grid. |
| `$pds-grid-basic-offset-s` | Holds a **small** offset within the `base` area of the Porsche Grid. |
| `$pds-grid-basic-offset-xxl` | Holds a **xxl** offset within the `base` area of the Porsche Grid. |

### Grid — Extended

| SCSS variable | Description |
| --- | --- |
| `$pds-grid-extended-column-start` | Holds the **start** position of the `extended` area within the Porsche Grid. |
| `$pds-grid-extended-column-end` | Holds the **end** position of the `extended` area within the Porsche Grid. |
| `$pds-grid-extended-span-one-half` | Holds a **half** span within the `extended` area of the Porsche Grid. |
| `$pds-grid-extended-offset-base` | Holds a **base** offset within the `extended` area of the Porsche Grid. |
| `$pds-grid-extended-offset-s` | Holds a **small** offset within the `extended` area of the Porsche Grid. |
| `$pds-grid-extended-offset-xxl` | Holds a **xxl** offset within the `extended` area of the Porsche Grid. |

### Grid — Wide

| SCSS variable | Description |
| --- | --- |
| `$pds-grid-wide-column-start` | Holds the **start** position of the `wide` area within the Porsche Grid. |
| `$pds-grid-wide-column-end` | Holds the **end** position of the `wide` area within the Porsche Grid. |
| `$pds-grid-wide-offset-base` | Holds a **base** offset within the `wide` area of the Porsche Grid. |
| `$pds-grid-wide-offset-s` | Holds a **small** offset within the `wide` area of the Porsche Grid. |
| `$pds-grid-wide-offset-xxl` | Holds a **xxl** offset within the `wide` area of the Porsche Grid. |

### Grid — Full

| SCSS variable | Description |
| --- | --- |
| `$pds-grid-full-column-start` | Holds the **start** position of the `full` area within the Porsche Grid. |
| `$pds-grid-full-column-end` | Holds the **end** position of the `full` area within the Porsche Grid. |
| `$pds-grid-full-offset` | Holds a **full** offset within the `full` area of the Porsche Grid. |

## Mixins

### Typography — Heading

| SCSS mixin | Description |
| --- | --- |
| `@include prose-heading-5xl` | Applies the **5x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `@include prose-heading-4xl` | Applies the **4x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `@include prose-heading-3xl` | Applies the **3x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `@include prose-heading-2xl` | Applies the **2x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `@include prose-heading-xl` | Applies the **x-large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `@include prose-heading-lg` | Applies the **large** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `@include prose-heading-md` | Applies the **medium** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `@include prose-heading-sm` | Applies the **small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `@include prose-heading-xs` | Applies the **x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |
| `@include prose-heading-2xs` | Applies the **2x-small** heading typography variant primarily to `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` tags. |

### Typography — Text

| SCSS mixin | Description |
| --- | --- |
| `@include prose-text-5xl` | Applies the **5x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `@include prose-text-4xl` | Applies the **4x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `@include prose-text-3xl` | Applies the **3x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `@include prose-text-2xl` | Applies the **2x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `@include prose-text-xl` | Applies the **x-large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `@include prose-text-lg` | Applies the **large** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `@include prose-text-md` | Applies the **medium** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `@include prose-text-sm` | Applies the **small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `@include prose-text-xs` | Applies the **x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |
| `@include prose-text-2xs` | Applies the **2x-small** text typography variant primarily to `<p>`, `<ul>`, `<ol>`, `<blockquote>` tags. |

### Skeleton

| SCSS mixin | Description |
| --- | --- |
| `@include skeleton()` | Applies a skeleton placeholder style to indicate loading state. |

### Focus

| SCSS mixin | Description |
| --- | --- |
| `@include focus-visible($offset: 2px)` | Applies a **focus-visible** style. |

### Media query

| SCSS mixin | Description |
| --- | --- |
| `@include media-query-min($min: null)` | Applies a **min** media query with the specified breakpoint. |
| `@include media-query-max($max: null)` | Applies a **max** media query with the specified breakpoint. |
| `@include media-query-min-max($min: null, $max: null)` | Applies a **min-max** media query with the specified breakpoints. |

### Grid

| SCSS mixin | Description |
| --- | --- |
| `@include pds-grid` | Applies the **Porsche Grid** layout system (must be applied once at the top level, span the full viewport width, and cannot be nested). |

## Exact values

This document is the index. For the exact token values and the complete generated stylesheet, read `../scss` in the installed package.
