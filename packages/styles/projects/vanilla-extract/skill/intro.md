# Porsche Design System — Vanilla Extract

The Porsche Design System ships a ready-made [Vanilla Extract](https://vanilla-extract.style) package:
a curated catalog of design tokens exposed as JavaScript values (colors, typography, spacing, border
radii, blur, shadow, motion and breakpoints) plus a set of documented style utilities (the layout
grid, focus, skeletons, media queries, typography shorthands and the color-scheme styles). Every
documented symbol is a named export you import and apply inside your `*.css.ts` style definitions.

Reach for these foundational styles when you build a custom component or pattern that is not yet
available in the component library, or for foundational layout work such as typography, surfaces and
boxes.

This document is an index of the package. Tokens resolve to native CSS
[`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
custom properties at runtime, so the exact value follows the active color scheme — import the token by
name and let it resolve. For the precise values and the complete typed surface, read the published
`@porsche-design-system/vanilla-extract` package (the `./meta` entry exposes the same
`vanillaExtractMeta` catalog).
