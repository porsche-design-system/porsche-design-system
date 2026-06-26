# Porsche Design System — Tailwind CSS theme

The Porsche Design System ships a ready-made Tailwind CSS theme: a curated catalog of design
tokens exposed as Tailwind `@theme` variables (colors, typography, spacing, border radii,
blur, shadow, motion and breakpoints) plus a set of documented `@utility` classes
(gradients, the layout grid, skeletons and typography shorthands). Importing it resets
Tailwind's default namespaces so that **only** Porsche Design System tokens remain, and
generates the matching utility classes (e.g. `.bg-canvas`, `.p-fluid-md`, `.rounded-md`).

> Requires **Tailwind CSS v4 or higher** — the theme is built on the v4 `@theme` engine.

Reach for these foundational styles when you build a custom component or pattern that is not yet
available in the component library, or for foundational layout work such as typography, surfaces and
boxes.

## How to use

### Import

Install Tailwind CSS (see the [official guide](https://tailwindcss.com/docs/installation)),
then add the Porsche Design System theme import to your global CSS **immediately after** the
standard Tailwind import:

```css
@import 'tailwindcss';
@import '@porsche-design-system/components-{js|angular|react|vue}/tailwindcss';
```

### Color scheme (light / dark)

Colors are driven by the native CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
function via the CSS [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
property — no proprietary switching logic. The Tailwind `.scheme-*` utilities are extended
with a polyfill for browsers without `light-dark()` support. Apply one of these classes to
the document or any container; the selected context cascades to all child elements:

- `.scheme-light` — forces light mode.
- `.scheme-dark` — forces dark mode.
- `.scheme-light-dark` — dynamically follows the system/OS setting.

```html
<html class="scheme-dark">
  <body>
    <!-- rendered in dark mode -->
    <div class="bg-frosted text-primary"></div>
  </body>
</html>
```

## Contents

- [Theme variables](#theme-variables) — Border, Blur, Breakpoint, Color, Font, Shadow, Spacing, Motion
- [Utilities](#utilities) — Gradient, Typography (Heading / Text / Display), Skeleton, Grid (Base / Narrow / Basic / Extended / Wide / Full / Span)

## Theme variables

### Border — Radius

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--radius-xs` | `.rounded-xs` | Applies a **x-small** `border-radius`. |
| `--radius-sm` | `.rounded-sm` | Applies a **small** `border-radius`. |
| `--radius-md` | `.rounded-md` | Applies a **medium** `border-radius`. |
| `--radius-lg` | `.rounded-lg` | Applies a **large** `border-radius`. |
| `--radius-xl` | `.rounded-xl` | Applies a **x-large** `border-radius`. |
| `--radius-2xl` | `.rounded-2xl` | Applies a **2x-large** `border-radius`. |
| `--radius-3xl` | `.rounded-3xl` | Applies a **3x-large** `border-radius`. |
| `--radius-4xl` | `.rounded-4xl` | Applies a **4x-large** `border-radius`. |
| `--radius-full` | `.rounded-full` | Applies a **fully** rounded `border-radius`. |

### Border — Width

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--default-border-width` | – | Default border width applied globally via the Tailwind `@theme` block. |
| `--border-width-regular` | – | Alias for the regular (2 px) border width. **Deprecated** — prefer `--default-border-width`. |
| `--border-width-thin` | – | Alias for the thin (1 px) border width. **Deprecated** — prefer `--default-border-width`. |

### Blur

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--blur-frosted` | `.backdrop-blur-frosted`, `.blur-frosted` | Applies a **frosted** effect when used with `backdrop-filter` or `filter: blur()` when combined with a semi-transparent color. |

### Breakpoint

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--breakpoint-xs` | `xs:*` | Defines the **x-small** responsive breakpoint. |
| `--breakpoint-sm` | `sm:*` | Defines the **small** responsive breakpoint. |
| `--breakpoint-md` | `md:*` | Defines the **medium** responsive breakpoint. |
| `--breakpoint-lg` | `lg:*` | Defines the **large** responsive breakpoint. |
| `--breakpoint-xl` | `xl:*` | Defines the **x-large** responsive breakpoint. |
| `--breakpoint-2xl` | `2xl:*` | Defines the **2x-large** responsive breakpoint. |

### Color — A11y

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--color-focus` | `.outline-focus` | Applies the focus color, typically used as the outline for `:focus-visible` states. |

### Color — Background

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--color-canvas` | `.bg-canvas` | Applies the canvas color, typically used for surfaces. |
| `--color-surface` | `.bg-surface` | Applies the surface color, typically used for surfaces. |
| `--color-frosted` | `.bg-frosted` | Applies the frosted color, typically used as a background in combination with a blur effect `.backdrop-blur-frosted`. |
| `--color-frosted-soft` | `.bg-frosted-soft` | Applies the frosted color, typically used as a background `:hover`. |
| `--color-frosted-strong` | `.bg-frosted-strong` | Applies the frosted color, typically used as a background in combination with a blur effect `.backdrop-blur-frosted`. |
| `--color-backdrop` | `.bg-backdrop` | Applies the backdrop color, typically used for backdrops. |

### Color — Foreground

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--color-contrast-lower` | `.border-contrast-lower` | Applies the contrast-lower color, intended only for decorative elements, as it is not accessibility-compliant. |
| `--color-contrast-low` | `.border-contrast-low` | Applies the contrast-low color, intended only for decorative elements, as it is not accessibility-compliant. |
| `--color-contrast-medium` | `.text-contrast-medium` | Applies the contrast-medium color, typically used for text. |
| `--color-contrast-high` | `.text-contrast-high` | Applies the contrast-high color, typically used for text. |
| `--color-contrast-higher` | `.text-contrast-higher` | Applies the contrast-higher color, typically used for text. |
| `--color-primary` | `.text-primary` | Applies the primary color, typically used for text. |

### Color — Semantic

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--color-success` | `.text-success` | Applies the success color, typically used for text. |
| `--color-success-low` | `.text-success`, `.border-success` | Applies the success color, typically used for text or border. |
| `--color-success-medium` | `.text-success`, `.border-success` | Applies the success color, typically used for text or border. |
| `--color-success-frosted` | `.bg-success-frosted` | Applies the success-frosted color, typically used as background in combination with a blur effect `.backdrop-blur-frosted`. |
| `--color-success-frosted-soft` | `.bg-success-frosted-soft` | Applies the success-frosted-soft color, typically used as background `:hover`. |
| `--color-warning` | `.text-warning` | Applies the warning color, typically used for text. |
| `--color-warning-low` | `.text-warning`, `.border-warning` | Applies the warning color, typically used for text or border. |
| `--color-warning-medium` | `.text-warning`, `.border-warning` | Applies the warning color, typically used for text or border. |
| `--color-warning-frosted` | `.bg-warning-frosted` | Applies the warning-frosted color, typically used as background in combination with a blur effect `.backdrop-blur-frosted`. |
| `--color-warning-frosted-soft` | `.bg-warning-frosted-soft` | Applies the warning-frosted-soft color, typically used as background `:hover`. |
| `--color-error` | `.text-error` | Applies the error color, typically used for text. |
| `--color-error-low` | `.text-error`, `.border-error` | Applies the error color, typically used for text or border. |
| `--color-error-medium` | `.text-error`, `.border-error` | Applies the error color, typically used for text or border. |
| `--color-error-frosted` | `.bg-error-frosted` | Applies the error-frosted color, typically used as background in combination with a blur effect `.backdrop-blur-frosted`. |
| `--color-error-frosted-soft` | `.bg-error-frosted-soft` | Applies the error-frosted-soft color, typically used as background `:hover`. |
| `--color-info` | `.text-info` | Applies the info color, typically used for text. |
| `--color-info-low` | `.text-info`, `.border-info` | Applies the info color, typically used for text or border. |
| `--color-info-medium` | `.text-info`, `.border-info` | Applies the info color, typically used for text or border. |
| `--color-info-frosted` | `.bg-info-frosted` | Applies the info-frosted color, typically used as background in combination with a blur effect `.backdrop-blur-frosted`. |
| `--color-info-frosted-soft` | `.bg-info-frosted-soft` | Applies the info-frosted-soft color, typically used as background `:hover`. |

### Font — Family

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--font-porsche-next` | `.font-porsche-next` | Applies the **Porsche Next** font family along with fallback fonts. Automatically swaps to the locale-specific CJK stack (Simplified Chinese, Traditional Chinese, Japanese, Korean) via `:lang()` based on the nearest `lang` attribute. |
| `--font-sans` | `.font-sans` | Aliases the Tailwind `--font-sans` variable to `--font-porsche-next`, so the built-in `.font-sans` utility automatically applies the Porsche Next typeface. |

### Font — Weight

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--font-weight-normal` | `.font-normal` | Applies the **regular** font weight optimized for the Porsche Next typeface. |
| `--font-weight-semibold` | `.font-semibold` | Applies the **semi-bold** font weight optimized for the Porsche Next typeface. |
| `--font-weight-bold` | `.font-bold` | Applies the **bold** font weight optimized for the Porsche Next typeface. |

### Font — Line height

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--leading-normal` | `.leading-normal` | Applies a dynamic default line height specifically optimized for the Porsche Next typeface. |

### Font — Size

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--text-2xs` | `.text-2xs` | Applies the **2x-small** font size and line height optimized for the Porsche Next typeface. |
| `--text-xs` | `.text-xs` | Applies the **x-small** font size and line height optimized for the Porsche Next typeface. |
| `--text-sm` | `.text-sm` | Applies the **small** font size and line height optimized for the Porsche Next typeface. |
| `--text-md` | `.text-md` | Applies the **medium** font size and line height optimized for the Porsche Next typeface. |
| `--text-lg` | `.text-lg` | Applies the **large** font size and line height optimized for the Porsche Next typeface. |
| `--text-xl` | `.text-xl` | Applies the **x-large** font size and line height optimized for the Porsche Next typeface. |
| `--text-2xl` | `.text-2xl` | Applies the **2x-large** font size and line height optimized for the Porsche Next typeface. |
| `--text-3xl` | `.text-3xl` | Applies the **3x-large** font size and line height optimized for the Porsche Next typeface. |
| `--text-4xl` | `.text-4xl` | Applies the **4x-large** font size and line height optimized for the Porsche Next typeface. |
| `--text-5xl` | `.text-5xl` | Applies the **5x-large** font size and line height optimized for the Porsche Next typeface. |

### Shadow

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--shadow-sm` | `.shadow-sm` | Applies a **small** `box-shadow`. |
| `--shadow-md` | `.shadow-md` | Applies a **medium** `box-shadow`. |
| `--shadow-lg` | `.shadow-lg` | Applies a **large** `box-shadow`. |

### Spacing — Fluid

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--spacing-fluid-xs` | `.p-fluid-xs`, `.m-fluid-xs` | Applies the **x-small fluid** spacing. |
| `--spacing-fluid-sm` | `.p-fluid-sm`, `.m-fluid-sm` | Applies the **small fluid** spacing. |
| `--spacing-fluid-md` | `.p-fluid-md`, `.m-fluid-md` | Applies the **medium fluid** spacing. |
| `--spacing-fluid-lg` | `.p-fluid-lg`, `.m-fluid-lg` | Applies the **large fluid** spacing. |
| `--spacing-fluid-xl` | `.p-fluid-xl`, `.m-fluid-xl` | Applies the **x-large fluid** spacing. |
| `--spacing-fluid-2xl` | `.p-fluid-2xl`, `.m-fluid-2xl` | Applies the **2x-large fluid** spacing. |

### Spacing — Static

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--spacing-static-2xs` | `.p-static-2xs`, `.m-static-2xs` | Applies the **2x-small static** spacing. |
| `--spacing-static-xs` | `.p-static-xs`, `.m-static-xs` | Applies the **x-small static** spacing. |
| `--spacing-static-sm` | `.p-static-sm`, `.m-static-sm` | Applies the **small static** spacing. |
| `--spacing-static-md` | `.p-static-md`, `.m-static-md` | Applies the **medium static** spacing. |
| `--spacing-static-lg` | `.p-static-lg`, `.m-static-lg` | Applies the **large static** spacing. |
| `--spacing-static-xl` | `.p-static-xl`, `.m-static-xl` | Applies the **x-large static** spacing. |
| `--spacing-static-2xl` | `.p-static-2xl`, `.m-static-2xl` | Applies the **2x-large static** spacing. |

### Motion — Duration

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--transition-duration-sm` | `.duration-sm` | Applies a **short** `transition-duration`. |
| `--transition-duration-md` | `.duration-md` | Applies a **moderate** `transition-duration`. |
| `--transition-duration-lg` | `.duration-lg` | Applies a **long** `transition-duration`. |
| `--transition-duration-xl` | `.duration-xl` | Applies a **very long** `transition-duration`. |

### Motion — Ease

| Theme variable | Tailwind class(es) | Description |
| --- | --- | --- |
| `--ease-in-out` | `.ease-in-out` | Applies an **in-out** `transition-timing-function`. |
| `--ease-in` | `.ease-in` | Applies an **in** `transition-timing-function`. |
| `--ease-out` | `.ease-out` | Applies an **out** `transition-timing-function`. |

## Utilities

### Gradient

| Tailwind `@utility` class | Description |
| --- | --- |
| `.bg-fade-to-t` | Applies a fade gradient towards the top. |
| `.bg-fade-to-r` | Applies a fade gradient towards the right. |
| `.bg-fade-to-b` | Applies a fade gradient towards the bottom. |
| `.bg-fade-to-l` | Applies a fade gradient towards the left. |

### Typography — Heading

| Tailwind `@utility` class | Description |
| --- | --- |
| `.prose-heading-2xs` | Applies the heading style in size 2xs. |
| `.prose-heading-xs` | Applies the heading style in size xs. |
| `.prose-heading-sm` | Applies the heading style in size sm. |
| `.prose-heading-md` | Applies the heading style in size md. |
| `.prose-heading-lg` | Applies the heading style in size lg. |
| `.prose-heading-xl` | Applies the heading style in size xl. |
| `.prose-heading-2xl` | Applies the heading style in size 2xl. |
| `.prose-heading-3xl` | Applies the heading style in size 3xl. |
| `.prose-heading-4xl` | Applies the heading style in size 4xl. |
| `.prose-heading-5xl` | Applies the heading style in size 5xl. |

### Typography — Text

| Tailwind `@utility` class | Description |
| --- | --- |
| `.prose-text-2xs` | Applies the text style in size 2xs. |
| `.prose-text-xs` | Applies the text style in size xs. |
| `.prose-text-sm` | Applies the text style in size sm. |
| `.prose-text-md` | Applies the text style in size md. |
| `.prose-text-lg` | Applies the text style in size lg. |
| `.prose-text-xl` | Applies the text style in size xl. |
| `.prose-text-2xl` | Applies the text style in size 2xl. |
| `.prose-text-3xl` | Applies the text style in size 3xl. |
| `.prose-text-4xl` | Applies the text style in size 4xl. |
| `.prose-text-5xl` | Applies the text style in size 5xl. |

### Typography — Display

| Tailwind `@utility` class | Description |
| --- | --- |
| `.prose-display-sm` | Applies the display style in size sm. |
| `.prose-display-md` | Applies the display style in size md. |
| `.prose-display-lg` | Applies the display style in size lg. |

### Skeleton

| Tailwind `@utility` class | Description |
| --- | --- |
| `.skeleton` | Applies a skeleton placeholder style to indicate loading state. |

### Grid — Base

| Tailwind `@utility` class | Description |
| --- | --- |
| `.grid-template` | Applies the responsive Porsche Grid template with named column areas. |

### Grid — Narrow

| Tailwind `@utility` class | Description |
| --- | --- |
| `.col-narrow` | Places content across the narrow area of the Porsche Grid. |
| `.col-start-narrow` | Sets the start position of the narrow area within the Porsche Grid. |
| `.col-end-narrow` | Sets the end position of the narrow area within the Porsche Grid. |

### Grid — Basic

| Tailwind `@utility` class | Description |
| --- | --- |
| `.col-basic` | Places content across the basic area of the Porsche Grid. |
| `.col-start-basic` | Sets the start position of the basic area within the Porsche Grid. |
| `.col-end-basic` | Sets the end position of the basic area within the Porsche Grid. |

### Grid — Extended

| Tailwind `@utility` class | Description |
| --- | --- |
| `.col-extended` | Places content across the extended area of the Porsche Grid. |
| `.col-start-extended` | Sets the start position of the extended area within the Porsche Grid. |
| `.col-end-extended` | Sets the end position of the extended area within the Porsche Grid. |

### Grid — Wide

| Tailwind `@utility` class | Description |
| --- | --- |
| `.col-wide` | Places content across the wide area of the Porsche Grid. |
| `.col-start-wide` | Sets the start position of the wide area within the Porsche Grid. |
| `.col-end-wide` | Sets the end position of the wide area within the Porsche Grid. |

### Grid — Full

| Tailwind `@utility` class | Description |
| --- | --- |
| `.col-full` | Applies the start/end position of the full area within the Porsche Grid. |
| `.col-start-full` | Sets the start position of the full area within the Porsche Grid. |
| `.col-end-full` | Sets the end position of the full area within the Porsche Grid. |

### Grid — Span

| Tailwind `@utility` class | Description |
| --- | --- |
| `.col-span-one-half` | Spans content across one half of the current Porsche Grid area. |
| `.col-span-one-third` | Spans content across one third of the current Porsche Grid area. |
| `.col-span-two-thirds` | Spans content across two thirds of the current Porsche Grid area. |

## Exact values

This document is the index. For the exact token values and the complete generated stylesheet, read `../tailwindcss/index.css` in the installed package.
