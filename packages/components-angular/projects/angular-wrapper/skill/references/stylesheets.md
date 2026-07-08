# Porsche Design System — Global styles

The global styles are the **foundation every Porsche Design System component depends on** — not an
optional add-on. Each component reads its colors, fonts, spacing, radii and motion from the global
CSS variables and expects the reset and font faces to be present. Without the global styles loaded,
components render with the wrong colors, wrong fonts and broken layout, or fail to render correctly
at all. **Any** task that installs PDS, renders a component, sets up a page, debugs "components look
unstyled / wrong font / wrong colors", or touches theming and dark mode depends on what is described
here — read this reference for all of them.

> As of Porsche Design System **v4** the global styles are **required**, and `variables.css` and
> `font-face.css` in particular are mandatory — components will not render correctly without them.
> The single package-root CSS import (`@import '@porsche-design-system/components-angular'`,
> see "How to use" below) pulls in all of them at once and is the recommended setup.

## What the global styles contain

PDS ships four global stylesheets. The single package-root import bundles all four; you can also
import them individually (see "How to use").

- **`variables.css`** _(required)_ — exposes the design system's **CSS variables** (custom
  properties) on `:root`: the full palette of theme-aware colors, which resolve to the right value
  for the active color scheme via the native CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
  function, plus spacing, typography, border-radius, blur, shadow and motion tokens, and `:lang()`
  font-family overrides. This is what every component and every styling solution reads its values
  from — it is the single palette shared across PDS components and your own custom markup.
- **`font-face.css`** _(required)_ — declares the Porsche `@font-face` sources. Without it the
  correct brand fonts never load and text falls back to system fonts.
- **`color-scheme.css`** — the `.scheme-light` / `.scheme-dark` / `.scheme-light-dark` utility
  classes that drive the CSS `color-scheme` property, plus an `@supports` polyfill for browsers
  without `light-dark()`. This one class themes **both** the components and your custom markup — it
  is the entire theming mechanism; there is no `theme` prop on the provider or on any component.
- **`normalize.css`** — the recommended reset / normalize rules and base typography (font family and
  line height) for `html` and `body`.

Reach for the global CSS variables directly for a pure-CSS approach — to align components in your
page layout or to build custom components — when you prefer not to use one of the dedicated styling
solutions ([Tailwind CSS](./styles/tailwindcss.md), [SCSS](./styles/scss.md),
[Emotion](./styles/emotion.md) or [Vanilla Extract](./styles/vanilla-extract.md)). Those
solutions build on these same variables, so custom UI shares the exact palette, spacing and
typography as the components.

This document then serves as the complete index of the global styles: it lists every documented
stylesheet, every exposed CSS variable with its value, and every color-scheme class.

## How to use

### Import

When you import the main package CSS file, all global styles are included (CSS variables, color
scheme, font face and normalize):

```css
@import '@porsche-design-system/components-angular';

/* Alternative: if your bundler requires an explicit .css extension, use this path instead */
@import '@porsche-design-system/components-angular/index.css';
```

If you only need specific styles, import each stylesheet separately for more granular control. Note
that `variables.css` and `font-face.css` are **required** — components will not render correctly
without them:

```css
@import '@porsche-design-system/components-angular/variables.css';
@import '@porsche-design-system/components-angular/font-face.css';
@import '@porsche-design-system/components-angular/normalize.css';
@import '@porsche-design-system/components-angular/color-scheme.css';
```

### CSS variables

Consume the exposed custom properties with `var(…)` in your own styles. Color variables resolve to
the correct value for the active color scheme automatically:

```css
.my-component {
  background-color: var(--p-color-canvas);
  color: var(--p-color-primary);
  border-radius: var(--p-radius-md);
}
```

### Color scheme (light / dark)

Colors are driven by the native CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
function via the CSS [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
property — no proprietary switching logic. By default, color tokens use the light color scheme. To
enable the dark color scheme or automatic switching, add one of the `.scheme-*` classes to the
`<html>` element or any ancestor; the selected scheme cascades to all child elements:

- `.scheme-light` — enforces the light color scheme.
- `.scheme-dark` — enforces the dark color scheme.
- `.scheme-light-dark` — automatically switches based on the user's system preference.

This one class themes **both** PDS components and your own custom markup — everything resolves colors
through the same `light-dark()` palette, so there is no separate component-level theming API and no
`theme` prop on `PorscheDesignSystemProvider` or on any component. Switching theme means setting the
`.scheme-*` class, nothing else.

```html
<html class="scheme-dark">
  <body>
    <!-- rendered in dark mode -->
    <div class="my-component"></div>
  </body>
</html>
```

The `color-scheme.css` stylesheet additionally ships a polyfill for browsers without `light-dark()`
support. If [browser support](https://caniuse.com/mdn-css_types_color_light-dark) is already
sufficient for your project, you can skip the polyfill and use the native `color-scheme` property and
`light-dark()` function directly (e.g. `html { color-scheme: light dark; }`).

## Contents

- [Stylesheets](#stylesheets) — variables.css, color-scheme.css, normalize.css
- [CSS variables](#css-variables) — Color (Background / Foreground / Semantic / A11y), Font (Family / Weight / Line height / Size), Spacing (Fluid / Static), Border (Radius), Blur, Shadow, Motion (Duration / Ease)
- [Color-scheme classes](#color-scheme-classes) — Color scheme

## Stylesheets

| Stylesheet | Description |
| --- | --- |
| `variables.css` | Exposes the design system **CSS variables** (custom properties) on `:root`, including theme-aware colors resolved via `light-dark()` and `:lang()` font overrides. |
| `color-scheme.css` | Provides the `.scheme-*` utility classes controlling the CSS `color-scheme` property, plus the `@supports` `light-dark()` polyfill. |
| `normalize.css` | Recommended **normalize** styles including CSS reset rules and base typography (font family and line height) for `html` and `body`. |

## CSS variables

### Color — Background

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-color-canvas` | `light-dark(#fff,hsl(225 66.7% 1.2%))` | Applies the **canvas** color, typically used for surfaces. |
| `--p-color-surface` | `light-dark(hsl(240 10% 95%),hsl(240 2% 10%))` | Applies the **surface** color, typically used for surfaces. |
| `--p-color-frosted` | `light-dark(hsl(240 5% 70% / 0.148),hsl(240 2% 43% / 0.228))` | Applies the **frosted** color, typically used as a background in combination with a blur effect. |
| `--p-color-frosted-soft` | `light-dark(hsl(234 9.8% 60% / 0.06),hsl(240 3.7% 26.5% / 0.154))` | Applies the **frosted** color, typically used as a background `:hover`. |
| `--p-color-frosted-strong` | `light-dark(hsl(236 6.5% 42% / 0.236),hsl(240 1.5% 61.8% / 0.302))` | Applies the **frosted-strong** color, typically used as a background in combination with a blur effect. |
| `--p-color-backdrop` | `light-dark(hsl(240 5.3% 14.9% / 0.5),hsl(240 5.3% 14.9% / 0.5))` | Applies the **backdrop** color, typically used for backdrops. |

### Color — Foreground

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-color-primary` | `light-dark(hsl(225 66.7% 1.2%),hsl(225 100% 99%))` | Applies the **primary** color, typically used for text. |
| `--p-color-contrast-higher` | `light-dark(hsl(240 8.7% 9% / 0.8),hsl(240 12.5% 96.9% / 0.78))` | Applies the **contrast-higher** color, typically used for text. |
| `--p-color-contrast-high` | `light-dark(hsl(240 7.1% 11% / 0.7),hsl(240 12.5% 96.9% / 0.67))` | Applies the **contrast-high** color, typically used for text. |
| `--p-color-contrast-medium` | `light-dark(hsl(240 6.1% 7% / 0.6),hsl(240 12.5% 96.9% / 0.56))` | Applies the **contrast-medium** color, typically used for text. |
| `--p-color-contrast-low` | `light-dark(hsl(240 5.3% 14.9% / 0.5),hsl(240 12.5% 96.9% / 0.45))` | Applies the **contrast-low** color, intended only for decorative elements, as it is not accessibility-compliant. |
| `--p-color-contrast-lower` | `light-dark(hsl(234 6% 32.9% / 0.324),hsl(240 1.5% 61.8% / 0.302))` | Applies the **contrast-lower** color, intended only for decorative elements, as it is not accessibility-compliant. |

### Color — Semantic

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-color-info` | `light-dark(hsl(228 83.2% 51%),hsl(210 100% 54.5%))` | Applies the **info** color, typically used for text. |
| `--p-color-info-medium` | `light-dark(hsl(228 83.2% 51% / 0.6),hsl(210 100% 54.5% / 0.6))` | Applies the **info** color, typically used for text or border. |
| `--p-color-info-low` | `light-dark(hsl(228 83.2% 51% / 0.18),hsl(210 100% 54.5% / 0.18))` | Applies the **info** color, typically used for text or border. |
| `--p-color-info-frosted` | `light-dark(hsl(211 100% 90% / 0.55),hsl(210 79% 20% / 0.66))` | Applies the **info-frosted** color, typically used as background in combination with a blur effect. |
| `--p-color-info-frosted-soft` | `light-dark(hsl(211 80% 95% / 0.55),hsl(210 59% 15% / 0.66))` | Applies the **info-frosted-soft** color, typically used as background `:hover`. |
| `--p-color-success` | `light-dark(hsl(115 77.5% 27.8%),hsl(157 84.9% 41.6%))` | Applies the **success** color, typically used for text. |
| `--p-color-success-medium` | `light-dark(hsl(115 77.5% 27.8% / 0.6),hsl(157 84.9% 41.6% / 0.6))` | Applies the **success** color, typically used for text or border. |
| `--p-color-success-low` | `light-dark(hsl(115 77.5% 27.8% / 0.18),hsl(157 84.9% 41.6% / 0.18))` | Applies the **success** color, typically used for text or border. |
| `--p-color-success-frosted` | `light-dark(hsl(109 100% 90% / 0.55),hsl(157 79% 20% / 0.66))` | Applies the **success-frosted** color, typically used as background in combination with a blur effect. |
| `--p-color-success-frosted-soft` | `light-dark(hsl(109 80% 95% / 0.55),hsl(157 59% 15% / 0.66))` | Applies the **success-frosted-soft** color, typically used as background `:hover`. |
| `--p-color-warning` | `light-dark(hsl(28 97.7% 34.1%),hsl(28 90.2% 56.1%))` | Applies the **warning** color, typically used for text. |
| `--p-color-warning-medium` | `light-dark(hsl(28 97.7% 34.1% / 0.6),hsl(28 90.2% 56.1% / 0.6))` | Applies the **warning** color, typically used for text or border. |
| `--p-color-warning-low` | `light-dark(hsl(28 97.7% 34.1% / 0.18),hsl(28 90.2% 56.1% / 0.18))` | Applies the **warning** color, typically used for text or border. |
| `--p-color-warning-frosted` | `light-dark(hsl(40 100% 90% / 0.55),hsl(52 79% 20% / 0.66))` | Applies the **warning-frosted** color, typically used as background in combination with a blur effect. |
| `--p-color-warning-frosted-soft` | `light-dark(hsl(40 80% 95% / 0.55),hsl(52 59% 15% / 0.66))` | Applies the **warning-frosted-soft** color, typically used as background `:hover`. |
| `--p-color-error` | `light-dark(hsl(357 78% 41%),hsl(0 96.9% 62%))` | Applies the **error** color, typically used for text. |
| `--p-color-error-medium` | `light-dark(hsl(357 78% 41% / 0.6),hsl(0 96.9% 62% / 0.6))` | Applies the **error** color, typically used for text or border. |
| `--p-color-error-low` | `light-dark(hsl(357 78% 41% / 0.18),hsl(0 96.9% 62% / 0.18))` | Applies the **error** color, typically used for text or border. |
| `--p-color-error-frosted` | `light-dark(hsl(0 100% 90% / 0.55),hsl(0 79% 20% / 0.66))` | Applies the **error-frosted** color, typically used as background in combination with a blur effect. |
| `--p-color-error-frosted-soft` | `light-dark(hsl(0 80% 95% / 0.55),hsl(0 59% 15% / 0.66))` | Applies the **error-frosted-soft** color, typically used as background `:hover`. |

### Color — A11y

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-color-focus` | `light-dark(#1A44EA,#1A44EA)` | Applies the **focus** color, typically used as the outline for `:focus-visible` states. |

### Font — Family

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-font-porsche-next` | `'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif` | Applies the **Porsche Next** font family along with fallback fonts. Automatically swaps to the locale-specific CJK stack (Simplified Chinese, Traditional Chinese, Japanese, Korean) via `:lang()` based on the nearest `lang` attribute. |
| `--p-font-sans` | `var(--p-font-porsche-next)` | Alias for `--p-font-porsche-next`, provided for Tailwind-style `font-sans` usage. |

### Font — Weight

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-font-weight-normal` | `400` | Applies the **regular** font weight optimized for the Porsche Next typeface. |
| `--p-font-weight-semibold` | `600` | Applies the **semi-bold** font weight optimized for the Porsche Next typeface. |
| `--p-font-weight-bold` | `700` | Applies the **bold** font weight optimized for the Porsche Next typeface. |

### Font — Line height

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-leading-normal` | `calc(6px + 2.125ex)` | Applies a dynamic default line height specifically optimized for the Porsche Next typeface. |

### Font — Size

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-typescale-2xs` | `.75rem` | Applies the **2x-small** font size for the Porsche Next typeface. |
| `--p-typescale-xs` | `.875rem` | Applies the **x-small** font size for the Porsche Next typeface. |
| `--p-typescale-sm` | `1rem` | Applies the **small** font size for the Porsche Next typeface. |
| `--p-typescale-md` | `clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)` | Applies the **medium** font size for the Porsche Next typeface. |
| `--p-typescale-lg` | `clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)` | Applies the **large** font size for the Porsche Next typeface. |
| `--p-typescale-xl` | `clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)` | Applies the **x-large** font size for the Porsche Next typeface. |
| `--p-typescale-2xl` | `clamp(1.6rem, 1.56vw + 1.29rem, 3.16rem)` | Applies the **2x-large** font size for the Porsche Next typeface. |
| `--p-typescale-3xl` | `clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem)` | Applies the **3x-large** font size for the Porsche Next typeface. |
| `--p-typescale-4xl` | `clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem)` | Applies the **4x-large** font size for the Porsche Next typeface. |
| `--p-typescale-5xl` | `clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem)` | Applies the **5x-large** font size for the Porsche Next typeface. |

### Spacing — Fluid

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-spacing-fluid-xs` | `clamp(4px, 0.25vw + 3px, 8px)` | Applies the **x-small** fluid spacing. |
| `--p-spacing-fluid-sm` | `clamp(8px, 0.5vw + 6px, 16px)` | Applies the **small** fluid spacing. |
| `--p-spacing-fluid-md` | `clamp(16px, 1.25vw + 12px, 36px)` | Applies the **medium** fluid spacing. |
| `--p-spacing-fluid-lg` | `clamp(32px, 2.75vw + 23px, 76px)` | Applies the **large** fluid spacing. |
| `--p-spacing-fluid-xl` | `clamp(48px, 3vw + 38px, 96px)` | Applies the **x-large** fluid spacing. |
| `--p-spacing-fluid-2xl` | `clamp(80px, 7.5vw + 56px, 200px)` | Applies the **2x-large** fluid spacing. |

### Spacing — Static

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-spacing-static-2xs` | `1px` | Applies the **2x-small** static spacing. |
| `--p-spacing-static-xs` | `4px` | Applies the **x-small** static spacing. |
| `--p-spacing-static-sm` | `8px` | Applies the **small** static spacing. |
| `--p-spacing-static-md` | `16px` | Applies the **medium** static spacing. |
| `--p-spacing-static-lg` | `32px` | Applies the **large** static spacing. |
| `--p-spacing-static-xl` | `48px` | Applies the **x-large** static spacing. |
| `--p-spacing-static-2xl` | `80px` | Applies the **2x-large** static spacing. |

### Border — Radius

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-radius-xs` | `2px` | Applies a **x-small** `border-radius`. |
| `--p-radius-sm` | `4px` | Applies a **small** `border-radius`. |
| `--p-radius-md` | `6px` | Applies a **medium** `border-radius`. |
| `--p-radius-lg` | `8px` | Applies a **large** `border-radius`. |
| `--p-radius-xl` | `12px` | Applies a **x-large** `border-radius`. |
| `--p-radius-2xl` | `16px` | Applies a **2x-large** `border-radius`. |
| `--p-radius-3xl` | `24px` | Applies a **3x-large** `border-radius`. |
| `--p-radius-4xl` | `32px` | Applies a **4x-large** `border-radius`. |
| `--p-radius-full` | `calc(infinity * 1px)` | Applies a **fully** rounded `border-radius`. |

### Blur

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-blur-frosted` | `blur(32px)` | Applies a **frosted** effect when used with `backdrop-filter` or `filter: blur()` when combined with a semi-transparent color. |

### Shadow

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-shadow-sm` | `0px 3px 8px rgba(0,0,0,.16)` | Applies a **small** `box-shadow`. |
| `--p-shadow-md` | `0px 4px 16px rgba(0,0,0,.16)` | Applies a **medium** `box-shadow`. |
| `--p-shadow-lg` | `0px 8px 40px rgba(0,0,0,.16)` | Applies a **large** `box-shadow`. |

### Motion — Duration

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-duration-sm` | `.25s` | Applies a **short** `transition-duration`. |
| `--p-duration-md` | `.4s` | Applies a **moderate** `transition-duration`. |
| `--p-duration-lg` | `.6s` | Applies a **long** `transition-duration`. |
| `--p-duration-xl` | `1.2s` | Applies a **very long** `transition-duration`. |

### Motion — Ease

| CSS variable | Value | Description |
| --- | --- | --- |
| `--p-ease-in-out` | `cubic-bezier(.25,.1,.25,1)` | Applies an **in-out** `transition-timing-function`. |
| `--p-ease-in` | `cubic-bezier(0,0,.2,1)` | Applies an **in** `transition-timing-function`. |
| `--p-ease-out` | `cubic-bezier(.4,0,.5,1)` | Applies an **out** `transition-timing-function`. |

## Color-scheme classes

### Color scheme

| Class | Usage | Description |
| --- | --- | --- |
| `.scheme-normal` | Set class="scheme-normal" on the html element or any container. | Sets `color-scheme: normal`. The element isn't rendered with any color scheme at all — the browser default applies. |
| `.scheme-dark` | Set class="scheme-dark" on the html element or any container. | Sets `color-scheme: dark`. Indicates the element supports only the dark color scheme. |
| `.scheme-light` | Set class="scheme-light" on the html element or any container. | Sets `color-scheme: light`. Indicates the element supports only the light color scheme. |
| `.scheme-light-dark` | Set class="scheme-light-dark" on the html element or any container. | Sets `color-scheme: light dark`. Indicates the element supports both light and dark, chosen by user preference. |
| `.scheme-only-dark` | Set class="scheme-only-dark" on the html element or any container. | Sets `color-scheme: only dark`. Forces the dark color scheme and prevents the browser from overriding it. |
| `.scheme-only-light` | Set class="scheme-only-light" on the html element or any container. | Sets `color-scheme: only light`. Forces the light color scheme and prevents the browser from overriding it. |
