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

This document is an index of the package. For the exact token values and the complete generated
SCSS, read the per-domain partials shipped alongside it (`_color.scss`, `_font.scss`, `_grid*.scss`,
… all re-exported from `_index.scss`).
