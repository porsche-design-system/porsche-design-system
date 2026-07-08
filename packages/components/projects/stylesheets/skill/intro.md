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
> The single package-root CSS import (`@import '@porsche-design-system/components-{js|angular|react|vue}'`,
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
solutions ([Tailwind CSS](/tailwindcss/introduction), [SCSS](/scss/introduction),
[Emotion](/emotion/introduction) or [Vanilla Extract](/vanilla-extract/introduction)). Those
solutions build on these same variables, so custom UI shares the exact palette, spacing and
typography as the components.

This document then serves as the complete index of the global styles: it lists every documented
stylesheet, every exposed CSS variable with its value, and every color-scheme class.
