# Porsche Design System — Global styles

The Porsche Design System ships a set of global styles used by its components: a curated catalog of
**CSS variables** (custom properties) exposed on `:root` — theme-aware colors that adapt to the
active color scheme via the native CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
function, plus spacing, typography, border radii, blur, shadow and motion tokens — together with the
`.scheme-*` **color-scheme** utility classes (and a `light-dark()` polyfill) and recommended
**normalize** styles.

> As of Porsche Design System **v4**, the global styles are **required**. `variables.css` and
> `font-face.css` in particular are mandatory — components will not render correctly without them.

Reach for the global CSS variables directly for a pure-CSS approach — to align components in your
page layout or to build custom components — when you prefer not to use one of the dedicated styling
solutions ([Tailwind CSS](/tailwindcss/introduction), [SCSS](/scss/introduction),
[Emotion](/emotion/introduction) or [Vanilla Extract](/vanilla-extract/introduction)).

This document is an index of the global styles: it lists every documented stylesheet, every exposed
CSS variable with its value, and every color-scheme class.
