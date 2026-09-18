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

The same class themes **both** the PDS components and your own SCSS-styled markup — one `light-dark()`
palette drives both layers. There is no separate component theming API and no `theme` prop on
`PorscheDesignSystemProvider` or on components; the `.scheme-*` class is the whole switch.

```html
<html class="scheme-dark">
  <body>
    <!-- rendered in dark mode -->
    <div class="my-component"></div>
  </body>
</html>
```

### Grid

For pages whose sections share one alignment system, include `pds-grid` once on the page root. Make each full-width
section a subgrid, then place its content with the Porsche Grid variables. This avoids repeating the mixin and keeps all
sections aligned. Section-level grid instances remain valid when sections need independent grids.

### Variables and mixins

Every documented variable is a `$`-prefixed Sass variable (e.g. `pds.$radius-md`), and every
documented mixin is included with `@include` (e.g. `@include pds.media-query-min(m) { … }`). Use the
reference below to discover what is available; read the shipped partials for the exact values.

### Deprecated aliases

The package still ships the legacy `$pds-*` variables and `pds-*` mixins as deprecated aliases so
existing stylesheets keep compiling. Each is preceded by a `// @deprecated …` comment in the
shipped partials naming its replacement, and the complete list is in the knowledge skill's
`references/deprecations.md`. Prefer the documented variables and mixins listed here for new code.
