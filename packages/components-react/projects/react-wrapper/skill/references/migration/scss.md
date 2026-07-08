# Migration Guide

## ⭐ Introducing Color Scheme

The new color system leverages the CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) function to deliver native, preference-based theming. By adopting this browser-native engine, we have eliminated the need for proprietary switching logic, resulting in a more performant and standardized architecture.

> **⚠️ Deprecation Notice:** Legacy SCSS color variables are officially deprecated and scheduled for removal in the next major release. We recommend migrating to the new functional tokens immediately to ensure your components remain future-proof.

### Core Implementation

All colors and styles are now driven by the CSS [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme) property. To ensure broad compatibility, we provide the `@mixin color-scheme()`, which generates utility classes and includes a polyfill for browsers that do not yet support `light-dark()` (see [browser support](https://caniuse.com/mdn-css_types_color_light-dark)).

#### Utility Classes

Apply these classes to the document or any container to control the color-scheme context:

- `.scheme-light` — Forces light mode.
- `.scheme-dark` — Forces dark mode.
- `.scheme-light-dark` — Dynamically follows system/OS settings.

### Usage

#### 1. Global Setup

Include the mixin once in your global stylesheet to initialize the color-scheme utilities.

```scss
// global styles
@use '@porsche-design-system/components-js/scss' as pds;

@include pds.color-scheme();

html, body {…}
```

#### 2. Component Implementation

Utilize the new tokens within your styles. These variables automatically resolve to the correct value based on the active color-scheme.

```scss
// custom component styles
@use '@porsche-design-system/components-{js\|angular\|react\|vue}/scss' as pds;

.my-component {
  // Use light-dark() color variables
  background-color: pds.$color-frosted;
  color: pds.$color-primary;
}
```

#### 3. Application

The defined color-scheme context will cascade to all child elements.

```html
<!-- Defined color-scheme will be applied to all child elements -->
<html class="scheme-dark">
  <head></head>
  <body>
    <!-- Will be rendered in dark mode -->
    <div class="my-component"></div>
  </body>
</html>
```

## 👹 Breaking Changes

- Removed `@mixin pds-hover()` since it did not work reliably. There is no replacement.
- **Heading font-weight changed:** All heading typography mixins (`prose-heading-*` / formerly `pds-heading-*`) now use `font-weight: normal` (regular) instead of `semi-bold`. This is a visual change that applies automatically when upgrading.
- **Border-radius `large` value changed:** `$pds-border-radius-large` / `$radius-lg` was changed from `12px` to `8px`, since more radius sizes are now available (`$radius-xl` through `$radius-4xl` and `$radius-full`).

## 🤡 Deprecations (will be removed in v5)

Please transition to the new styles as soon as possible. All legacy styles are currently deprecated and are scheduled for removal in the next major release.

### Import path

Changed import path for SCSS styles. We recommend using a namespace e.g. `as pds` to easily identify pds styles. The new SCSS styles don't include a prefix like `$pds-`.

```diff
- @use '@porsche-design-system/components-{js\|angular\|react\|vue}/styles' as *;
+ @use '@porsche-design-system/components-{js\|angular\|react\|vue}/scss' as pds;
```

### Blur

See [SCSS Blur Examples](../styles/scss.md) for more details.

```diff
- @include pds-frosted-glass();
+ backdrop-filter: $blur-frosted;
```

### Border

See [SCSS Border Examples](../styles/scss.md) for more details.

```diff
- border-radius: $pds-border-radius-medium;
+ border-radius: $radius-md;
- border-radius: $pds-border-radius-small;
+ border-radius: $radius-sm;
- border-radius: $pds-border-radius-large;
+ border-radius: $radius-lg;
- border-width: $pds-border-width-base;
+ border-width: 2px;
- border-width: $pds-border-width-thin;
+ border-width: 1px;
```

### Color

New color definitions now leverage the native CSS [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) function. You can explore implementation samples in the [SCSS Color Examples](../styles/scss.md) or dive deeper into our system architecture in the [Theme Guide](https://designsystem.porsche.com/must-know/theme).

```diff
- $pds-theme-light-primary;
- $pds-theme-dark-primary;
+ $color-primary;
- $pds-theme-light-background-base;
- $pds-theme-dark-background-base;
+ $color-canvas;
- $pds-theme-light-background-surface;
- $pds-theme-dark-background-surface;
+ $color-surface;
- $pds-theme-light-background-shading;
- $pds-theme-dark-background-shading;
+ $color-backdrop;
- $pds-theme-light-background-frosted;
- $pds-theme-dark-background-frosted;
+ $color-frosted;
- $pds-theme-light-contrast-low;
- $pds-theme-dark-contrast-low;
+ $color-contrast-low;
- $pds-theme-light-contrast-medium;
- $pds-theme-dark-contrast-medium;
+ $color-contrast-medium;
- $pds-theme-light-contrast-high;
- $pds-theme-dark-contrast-high;
+ $color-contrast-high;
- $pds-theme-light-notification-success;
- $pds-theme-dark-notification-success;
+ $color-success;
- $pds-theme-light-notification-success-soft;
- $pds-theme-dark-notification-success-soft;
+ $color-success-frosted;
- $pds-theme-light-notification-warning;
- $pds-theme-dark-notification-warning;
+ $color-warning;
- $pds-theme-light-notification-warning-soft;
- $pds-theme-dark-notification-warning-soft;
+ $color-warning-frosted;
- $pds-theme-light-notification-error;
- $pds-theme-dark-notification-error;
+ $color-error;
- $pds-theme-light-notification-error-soft;
- $pds-theme-dark-notification-error-soft;
+ $color-error-frosted;
- $pds-theme-light-notification-info;
- $pds-theme-dark-notification-info;
+ $color-info;
- $pds-theme-light-notification-info-soft;
- $pds-theme-dark-notification-info-soft;
+ $color-info-frosted;
- $pds-theme-light-state-hover;
- $pds-theme-dark-state-hover;
// Not renamed yet, will be removed in next major release
- $pds-theme-light-state-active;
- $pds-theme-dark-state-active;
// Not renamed yet, will be removed in next major release
- $pds-theme-light-state-focus;
- $pds-theme-dark-state-focus;
+ $color-focus;
- $pds-theme-light-state-disabled;
- $pds-theme-dark-state-disabled;
+ $color-contrast-lower;
```

### Focus

See [SCSS Focus Examples](../styles/scss.md) for more details.

```diff
- @include pds-focus();
+ @include focus-visible();
```

### Gradient

See [SCSS Gradient Examples](../styles/scss.md) for more details.

```diff
- @include pds-gradient-to-bottom();
+ background: linear-gradient(to bottom, $gradient-stops-fade-dark);
- @include pds-gradient-to-left();
+ background: linear-gradient(to left, $gradient-stops-fade-dark);
- @include pds-gradient-to-right();
+ background: linear-gradient(to right, $gradient-stops-fade-dark);
- @include pds-gradient-to-top();
+ background: linear-gradient(to top, $gradient-stops-fade-dark);
```

### Media Query

See [SCSS Media Query Examples](../styles/scss.md) for more details.

```diff
- $pds-breakpoint-base
+ 0
- $pds-breakpoint-xs
+ $breakpoint-xs
- $pds-breakpoint-s
+ $breakpoint-sm
- $pds-breakpoint-m
+ $breakpoint-md
- $pds-breakpoint-l
+ $breakpoint-lg
- $pds-breakpoint-xl
+ $breakpoint-xl
- $pds-breakpoint-xxl
+ $breakpoint-2xl
```

```diff
- @include pds-media-query-min('base'|'xs'|'s'|'m'|'l'|'xl'|'xxl') { ... };
+ @include media-query-min('xs'|'sm'|'md'|'lg'|'xl'|'2xl') { ... };
- @include pds-media-query-max('xs'|'s'|'m'|'l'|'xl'|'xxl') { ... };
+ @include media-query-max('xs'|'sm'|'md'|'lg'|'xl'|'2xl') { ... };
- @include pds-media-query-min-max('base'|'xs'|'s'|'m'|'l'|'xl', 'xs'|'s'|'m'|'l'|'xl'|'xxl') { ... };
+ @include media-query-min-max('xs'|'sm'|'md'|'lg'|'xl'|'2xl', 'xs'|'sm'|'md'|'lg'|'xl'|'2xl') { ... };
```

### Motion

See [SCSS Motion Examples](../styles/scss.md) for more details.

```diff
- transition-duration: $pds-motion-duration-short;
+ transition-duration: $duration-sm;
- transition-duration: $pds-motion-duration-moderate;
+ transition-duration: $duration-md;
- transition-duration: $pds-motion-duration-long;
+ transition-duration: $duration-lg;
- transition-duration: $pds-motion-duration-very-long;
+ transition-duration: $duration-xl;
- transition-timing-function: $pds-motion-easing-base;
+ transition-timing-function: $ease-in-out;
- transition-timing-function: $pds-motion-easing-in;
+ transition-timing-function: $ease-in;
- transition-timing-function: $pds-motion-easing-out;
+ transition-timing-function: $ease-out;
```

### Shadow

See [SCSS Shadow Examples](../styles/scss.md) for more details.

```diff
- @include pds-drop-shadow-high();
+ box-shadow: $shadow-lg;
- @include pds-drop-shadow-medium();
+ box-shadow: $shadow-md;
- @include pds-drop-shadow-low();
+ box-shadow: $shadow-sm;
```

### Spacing

See [SCSS Spacing Examples](../styles/scss.md) for more details.

```diff
- $pds-spacing-fluid-x-small;
+ $spacing-fluid-xs;
- $pds-spacing-fluid-small;
+ $spacing-fluid-sm;
- $pds-spacing-fluid-medium;
+ $spacing-fluid-md;
- $pds-spacing-fluid-large;
+ $spacing-fluid-lg;
- $pds-spacing-fluid-x-large;
+ $spacing-fluid-xl;
- $pds-spacing-fluid-xx-large;
+ $spacing-fluid-2xl;
- $pds-spacing-static-x-small;
+ $spacing-static-xs;
- $pds-spacing-static-small;
+ $spacing-static-sm;
- $pds-spacing-static-medium;
+ $spacing-static-md;
- $pds-spacing-static-large;
+ $spacing-static-lg;
- $pds-spacing-static-x-large;
+ $spacing-static-xl;
- $pds-spacing-static-xx-large;
+ $spacing-static-2xl;
```

### Typography

See [SCSS Typography Examples](../styles/scss.md) for more details.

> **Note:** All heading mixins now use `font-weight: normal` (regular) instead of `semi-bold`. This change is applied automatically through the new mixins.

```diff
- @include pds-display-large;
+ @include prose-heading-5xl;
- @include pds-display-medium;
+ @include prose-heading-4xl;
- @include pds-display-small;
+ @include prose-heading-3xl;
- @include pds-heading-xx-large;
+ @include prose-heading-2xl;
- @include pds-heading-x-large;
+ @include prose-heading-xl;
- @include pds-heading-large;
+ @include prose-heading-lg;
- @include pds-heading-medium;
+ @include prose-heading-md;
- @include pds-heading-small;
+ @include prose-heading-sm;
- @include pds-text-x-large;
+ @include prose-text-xl;
- @include pds-text-large;
+ @include prose-text-lg;
- @include pds-text-medium;
+ @include prose-text-md;
- @include pds-text-small;
+ @include prose-text-sm;
- @include pds-text-x-small;
+ @include prose-text-xs;
- @include pds-text-xx-small;
+ @include prose-text-2xs;
```

Font variables:

```diff
- $pds-font-family;
+ $font-porsche-next;
- $pds-font-line-height;
+ $leading-normal;
- $pds-font-weight-regular;
+ $font-weight-normal;
- $pds-font-weight-semi-bold;
+ $font-weight-semibold;
- $pds-font-weight-bold;
+ $font-weight-bold;
- $pds-font-size-text-xx-small;
+ $typescale-2xs;
- $pds-font-size-text-x-small;
+ $typescale-xs;
- $pds-font-size-text-small;
+ $typescale-sm;
- $pds-font-size-text-medium;
+ $typescale-md;
- $pds-font-size-text-large;
+ $typescale-lg;
- $pds-font-size-text-x-large;
+ $typescale-xl;
- $pds-font-size-heading-small;
+ $typescale-sm;
- $pds-font-size-heading-medium;
+ $typescale-md;
- $pds-font-size-heading-large;
+ $typescale-lg;
- $pds-font-size-heading-x-large;
+ $typescale-xl;
- $pds-font-size-heading-xx-large;
+ $typescale-2xl;
- $pds-font-size-display-small;
+ $typescale-3xl;
- $pds-font-size-display-medium;
+ $typescale-4xl;
- $pds-font-size-display-large;
+ $typescale-5xl;
```

### Skeleton

See [SCSS Skeleton Examples](../styles/scss.md) for more details.

```diff
- @include pds-skeleton('light' | 'dark' | 'auto');
+ @include skeleton();
```
