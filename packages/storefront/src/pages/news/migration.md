# PDS V3 Migration Guide

With the new **Porsche Design Language** comes a lot of changes regarding layout and design principles. To keep
refactoring efforts as low as possible when upgrading from `v2` to `v3`, **breaking changes** were avoided as far as
possible. Nevertheless, there are a few breaking changes and some more deprecations which should receive attention.

The recommended way to learn PDS 3 is by reading the
[components info table](https://designsystem.porsche.com/latest/component-meta) and
[changelog](https://designsystem.porsche.com/latest/news/changelog).

## 👹 Breaking Changes 👹

##### Button:

- Removed deprecated prop `tabbable`.

```diff
- <p-button tabbable="false">Some label</p-button>
+ <p-button tabindex="-1">Some label</p-button>
```

- Default value of prop `icon` has changed from `arrow-head-right` to `none`. Therefore, the `icon` property **must** be
  set if the component has the `hide-label` property.

```diff
- <p-button hide-label="true">Some label</p-button>
+ <p-button hide-label="true" icon="arrow-right">Some label</p-button>

- <p-button hide-label="{ base: true, m: false }">Some label</p-button>
+ <p-button hide-label="{ base: true, m: false }" icon="arrow-right">Some label</p-button>
```

##### Button Pure:

- Removed `subline` slot (visually not intended anymore).

```diff
<p-button-pure>
  Some label
-   <p slot="subline">Some Subline</p>
</p-button-pure>
```

- Removed deprecated prop `tabbable`.

```diff
- <p-button-pure tabbable="false">Some label</p-button-pure>
+ <p-button-pure tabindex="-1">Some label</p-button-pure>
```

##### Icon:

- Value `inherit` for prop `color` works slightly different to the previous major version. A CSS filter is required to
  apply custom coloring to take advantage of using an SVG embedded in an `<img/>` for better SSR support and loading
  performance in general.

```diff
- <p-icon color="inherit" style="color: white;"></p-icon>
+ <p-icon color="inherit" style="filter: invert(100%);"></p-icon>
```

- Camel case syntax for `name` prop isn't supported, please use param case syntax instead (TypeScript typings have been
  updated too).

```diff
- <p-icon name="arrowRight"></p-icon>
+ <p-icon name="arrow-right"></p-icon>
```

##### Link:

- Default value of prop `icon` has changed from `arrow-head-right` to `none`. Therefore, the `icon` property **must** be
  set if the component has the `hide-label` property.

```diff
- <p-link href="#" hide-label="true">Some label</p-link>
+ <p-link href="#" hide-label="true" icon="arrow-right">Some label</p-link>

- <p-link href="#" hide-label="{ base: true, m: false }">Some label</p-link>
+ <p-link href="#" hide-label="{ base: true, m: false }" icon="arrow-right">Some label</p-link>
```

##### Link Pure:

- Removed `subline` slot (visually not intended anymore).

```diff
<p-link-pure href="#">
  Some label
-   <p slot="subline">Some Subline</p>
</p-link-pure>
```

##### Marque:

- Removed `variant` property.

```diff
- <p-marque variant="75-years"></p-marque>
+ <p-marque></p-marque>
// or even better, replace component by wordmark
+ <p-wordmark></p-wordmark>
```

##### Switch:

- Removed deprecated prop `tabbable`.

```diff
- <p-switch tabbable="false">Some label</p-switch>
+ <p-switch tabindex="-1">Some label</p-switch>
```

##### Partials:

- `getIconLinks()` partial accepts only param-cased icon names.

```diff
- require('@porsche-design-system/components-js/partials').getIconLinks({ icons: ['arrowRight'] })

+ require('@porsche-design-system/components-js/partials').getIconLinks({ icons: ['arrow-right'] })
```

##### CSS global scope:

- Changed naming of CSS global variables names.

```diff
- --p-animation-duration__spinner
- --p-animation-duration__banner
+ --p-animation-duration
```
