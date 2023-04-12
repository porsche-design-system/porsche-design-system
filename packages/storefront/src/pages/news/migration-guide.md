# Migration Guide

<p-inline-notification heading="Porsche Design System v2" state="error" dismiss-button="false">
  Support will end on <b>June 30th, 2023</b>.<br>
  In addition, it's not under active development anymore. Only critical bug fixing takes place.<br>
  Please make sure that upgrading to <b>Porsche Design System v3</b> is feasible before the EOL date.
</p-inline-notification>

<TableOfContents></TableOfContents>

## How to migrate from Porsche Design System v2 to v3

With the new **Porsche Design Language** comes a lot of changes regarding layout and design principles. To keep
refactoring efforts as low as possible when upgrading from `v2` to `v3`, **breaking changes** were avoided as far as
possible. Nevertheless, there are a few breaking changes and some more deprecations which should receive attention.

To help making migration easier, we offer a
[components overview](https://designsystem.porsche.com/latest/component-meta) which shows all component information
including deprecated components/props/values.

## Notable New Features

- New design language for all components
- New Components: `Crest`, `Wordmark`, `Model Signature`, `Link Tile Model Signature`, `Button Tile` and `Display`
- All components are supporting `theme` light and dark
- Vue JS documentation for all components
- Porsche Next font supports Vietnamese charset
- SSR Support for Remix

## 👹 Breaking Changes

### Button:

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

### Button Pure:

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

### Icon:

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

### Link:

- Default value of prop `icon` has changed from `arrow-head-right` to `none`. Therefore, the `icon` property **must** be
  set if the component has the `hide-label` property.

```diff
- <p-link href="#" hide-label="true">Some label</p-link>
+ <p-link href="#" hide-label="true" icon="arrow-right">Some label</p-link>

- <p-link href="#" hide-label="{ base: true, m: false }">Some label</p-link>
+ <p-link href="#" hide-label="{ base: true, m: false }" icon="arrow-right">Some label</p-link>
```

### Link Pure:

- Removed `subline` slot (visually not intended anymore).

```diff
<p-link-pure href="#">
  Some label
-   <p slot="subline">Some Subline</p>
</p-link-pure>
```

### Switch:

- Removed deprecated prop `tabbable`.

```diff
- <p-switch tabbable="false">Some label</p-switch>
+ <p-switch tabindex="-1">Some label</p-switch>
```

### Partials:

- `getIconLinks()` partial accepts only param-cased icon names.

```diff
- require('@porsche-design-system/components-js/partials').getIconLinks({ icons: ['arrowRight'] })
+ require('@porsche-design-system/components-js/partials').getIconLinks({ icons: ['arrow-right'] })
```

### CSS global scope:

- Changed naming of global CSS variables.

```diff
- --p-animation-duration__spinner
- --p-animation-duration__banner
+ --p-animation-duration
```

## 🤡 Component deprecations

All deprecated components are refactored to match the new design language, therefor it's technically not breaking, but
we highly recommend to migrate to the mentioned alternative, since those deprecated components will be removed with next
major version.

### Content Wrapper:

- Component is deprecated and will be removed with the next major release. Please use **[Porsche Grid](styles/grid)**
  instead, which is based on [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid) covering the specific
  layout needs for a harmonic appearance across all digital Porsche touch-points.

### Flex:

- Component is deprecated and will be removed with the next major release. In general, please use native
  [CSS Flex](https://css-tricks.com/snippets/css/a-guide-to-flexbox) instead for better performance and more
  standardized layout technique.

### Grid:

- Component is deprecated and will be removed with the next major release. In general, please use native
  [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid) in combination with
  **[Porsche Grid](styles/grid)** instead for better performance and more standardized layout technique.

### Headline:

- Component is deprecated and will be removed with the next major release. Please use the
  **[Heading](components/typography/heading)** component instead.

```diff
- <p-headline>The quick brown fox jumps over the lazy dog</p-headline>
+ <p-heading>The quick brown fox jumps over the lazy dog</p-heading>
```

### Link Social:

- Component is deprecated and will be removed with the next major release. Please use the **[Link](components/link)**
  component instead.

```diff
- <p-link-social href="#" icon="logo-facebook" target="_blank" rel="nofollow noopener"></p-link-social>
+ <p-link href="#" icon="logo-facebook" target="_blank" rel="nofollow noopener"></p-link>
```

### Marque:

- Component is deprecated and will be removed with the next major release. Please use the
  **[Wordmark](components/wordmark)** component instead.

```diff
- <p-marque></p-marque>
+ <p-wordmark></p-wordmark>
```

## 🤖 Property deprecations

All deprecated properties are still present without any effect, therefor it's technically not breaking, but we highly
recommend to migrate and remove the deprecated props since those ones will be removed with next major version.

### Banner:

- Prop `width` is deprecated.

```diff
- <p-banner width="fluid"></p-banner>
+ <p-banner></p-banner>
```

### Button Pure:

- Prop `weight` is deprecated, only regular font weight will be applied.

```diff
- <p-button-pure weight="thin">Some label</p-button-pure>
- <p-button-pure weight="regular">Some label</p-button-pure>
- <p-button-pure weight="semibold">Some label</p-button-pure>
- <p-button-pure weight="bold">Some label</p-button-pure>
+ <p-button-pure>Some label</p-button-pure>
```

### Content Wrapper (deprecated):

- Prop `theme` and `background-color` are deprecated.

```diff
- <p-content-wrapper theme="dark" background-color="default">Some content</p-content-wrapper>
+ <p-content-wrapper>Some content</p-content-wrapper>
```

### Grid (deprecated):

- The `gutter` property is deprecated and has no effect anymore. Instead, a fluid gutter depending on the viewport width
  is used.

```diff
- <p-grid gutter="16">Some content</p-grid>
- <p-grid gutter="24">Some content</p-grid>
- <p-grid gutter="36">Some content</p-grid>
+ <p-grid>Some content</p-grid>
```

### Icon:

- Prop `lazy` is deprecated.

```diff
- <p-icon lazy="true"></p-icon>
+ <p-icon></p-icon>
```

### Link Pure:

- Prop `weight` is deprecated, only regular font weight will be applied.

```diff
- <p-link-pure href="#" weight="thin">Some label</p-link-pure>
- <p-link-pure href="#" weight="regular">Some label</p-link-pure>
- <p-link-pure href="#" weight="semibold">Some label</p-link-pure>
- <p-link-pure href="#" weight="bold">Some label</p-link-pure>
+ <p-link-pure href="#">Some label</p-link-pure>
```

### Segmented Control:

- Prop `background-color` is deprecated.

```diff
- <p-segmented-control background-color="background-surface">
   <p-segmented-control-item value="xs">XS</p-segmented-control-item>
   <p-segmented-control-item value="s">S</p-segmented-control-item>
 </p-segmented-control>
+ <p-segmented-control>
   <p-segmented-control-item value="xs">XS</p-segmented-control-item>
   <p-segmented-control-item value="s">S</p-segmented-control-item>
 </p-segmented-control>
```

## 👾 Property value deprecations

All deprecated values are mapped to new ones, therefor it's technically not breaking, but we highly recommend to migrate
to the new values since those ones will be removed with next major version.

### Banner:

- Prop value `neutral` of `state` prop is deprecated.

```diff
- <p-banner state="neutral">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description. You can also add inline <a href="https://porsche.com">links</a> to route to another page.</span>
 </p-banner>
+ <p-banner state="info">
  <span slot="title">Some banner title</span>
  <span slot="description">Some banner description. You can also add inline <a href="https://porsche.com">links</a> to route to another page.</span>
 </p-banner>
```

### Content Wrapper (deprecated):

- Prop value `fluid` of `width` prop is deprecated.

```diff
- <p-content-wrapper width="fluid">Some content</p-content-wrapper>
+ <p-content-wrapper>Some content</p-content-wrapper>
```

### Icon:

- Prop values
  `brand | default | neutral-contrast-low | neutral-contrast-medium | neutral-contrast-high | notification-neutral` of
  `color` prop are deprecated.

```diff
- <p-icon color="brand"></p-icon>
+ <p-icon color="primary"></p-icon>

- <p-icon color="default"></p-icon>
+ <p-icon color="primary"></p-icon>

- <p-icon color="neutral-contrast-low"></p-icon>
+ <p-icon color="contrast-low"></p-icon>

- <p-icon color="neutral-contrast-medium"></p-icon>
+ <p-icon color="contrast-medium"></p-icon>

- <p-icon color="neutral-contrast-high"></p-icon>
+ <p-icon color="contrast-high"></p-icon>

- <p-icon color="neutral-contrast-neutral"></p-icon>
+ <p-icon color="contrast-info"></p-icon>
```

### Inline Notification:

- Prop value `neutral` of `state` prop is deprecated.

```diff
- <p-inline-notification state="neutral"></p-inline-notification>
+ <p-inline-notification state="info"></p-inline-notification>
```

### Tag:

- Prop value `notification-neutral | neutral-contrast-high | background-default` of `color` prop is deprecated.

```diff
- <p-tag color="notification-neutral">Color label</p-tag>
+ <p-tag color="notification-info">Color label</p-tag>

- <p-tag color="neutral-contrast-high">Color label</p-tag>
+ <p-tag color="primary">Color label</p-tag>

- <p-tag color="background-default">Color label</p-tag>
+ <p-tag color="background-base">Color label</p-tag>
```

### Tag Dismissible:

- Prop value `background-default` of `color` prop is deprecated.

```diff
- <p-tag-dismissible color="background-default">Color label</p-tag-dismissible>
+ <p-tag-dismissible color="background-base">Color label</p-tag-dismissible>
```

### Text:

- Prop value `thin | semibold` of `weight` prop is deprecated.

```diff
- <p-text weight="thin">Some text</p-text>
+ <p-text>Some text</p-text>

- <p-text weight="semibold">Some text</p-text>
+ <p-text weight="semi-bold">Some text</p-text>
```

- Prop value
  `brand | default | neutral-contrast-low | neutral-contrast-medium | neutral-contrast-high | notification-neutral` of
  `color` prop is deprecated.

```diff
- <p-text color="brand">Some text</p-text>
+ <p-text>Some text</p-text>

- <p-text color="default">Some text</p-text>
+ <p-text>Some text</p-text>

- <p-text color="neutral-contrast-low">Some text</p-text>
+ <p-text color="contrast-low">Some text</p-text>

- <p-text color="neutral-contrast-medium">Some text</p-text>
+ <p-text color="contrast-medium">Some text</p-text>

- <p-text color="neutral-contrast-high">Some text</p-text>
+ <p-text color="contrast-high">Some text</p-text>

- <p-text color="notification-neutral">Some text</p-text>
+ <p-text color="notification-info">Some text</p-text>
```

### ToastManager:

- Prop value `neutral` of `state` parameter is deprecated.

```diff
- …addMessage({ text: `Some message`, state: 'neutral' })
+ …addMessage({ text: `Some message`, state: 'info' })
```
