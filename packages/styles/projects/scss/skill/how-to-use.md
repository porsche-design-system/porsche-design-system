## How to use

### Import

Add the Porsche Design System SCSS package to your stylesheet with the Sass module system. Always
import it under the `pds` namespace so the variables and mixins are clearly scoped:

```scss
@use '@porsche-design-system/scss' as pds;

.my-card {
  border-radius: pds.$radius-md;
}
```

You can also forward it with `as *` to drop the namespace, but the explicit `pds` namespace is
recommended to avoid collisions.

### Variables and mixins

Every documented variable is a `$`-prefixed Sass variable (e.g. `pds.$radius-md`), and every
documented mixin is included with `@include` (e.g. `@include pds.media-query-min(m) { … }`). Use the
reference below to discover what is available; read the shipped partials for the exact values.

### Deprecated aliases

The package still ships the legacy `$pds-*` variables and `pds-*` mixins as deprecated aliases so
existing stylesheets keep compiling. Prefer the documented variables and mixins listed here for new
code.
