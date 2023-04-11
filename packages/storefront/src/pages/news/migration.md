# Porsche Design System 3 Migration Guide

<p-inline-notification heading="Important note" state="warning" dismiss-button="false">
  Porsche Design System 2 support will end on June 30th, 2023.<br>
  Porsche Design System 2 is not under development anymore, only bug fixing takes place.<br>
  Please make sure that upgrading to Porsche Design System 3 is feasible before the EOL date.
</p-inline-notification>

With the new **Porsche Design Language** comes a lot of changes regarding layout and design principles. To keep
refactoring efforts as low as possible when upgrading from `v2` to `v3`, **breaking changes** were avoided as far as
possible. Nevertheless, there are a few breaking changes and some more deprecations which should receive attention.

The recommended way to learn Porsche Design System 3 is by reading the
[components info table](https://designsystem.porsche.com/latest/component-meta) and
[changelog](https://designsystem.porsche.com/latest/news/changelog).

## Notable New Features

- New design language
- `xxl` breakpoint for all breakpoint customizable component values
  ([#2454](https://github.com/porsche-design-system/porsche-design-system/pull/2454))
- New Components: `Crest` ([#2437](https://github.com/porsche-design-system/porsche-design-system/pull/2437)),
  `Button Tile` ([#2381](https://github.com/porsche-design-system/porsche-design-system/pull/2381)), `Fieldset`
  ([#2404](https://github.com/porsche-design-system/porsche-design-system/pull/2404)), `Link Tile Model Signature`
  ([#2388](https://github.com/porsche-design-system/porsche-design-system/pull/2388)), `Display` and `Heading`
- `Carousel`: new Props `activeSlideIndex`
  ([#2421](https://github.com/porsche-design-system/porsche-design-system/pull/2421)), `alignHeader` and `width`, Prop
  `slidesPerPage` supports value `auto`
- Prop `theme` for `Table` ([#2364](https://github.com/porsche-design-system/porsche-design-system/pull/2364/)),
  `Checkbox Wrapper`, `Radio Button Wrapper`, `Popover`, `Tag Dismissible`, `Textarea Wrapper`, `Text Field Wrapper` and
  `Fieldset Wrapper`
- Vue: plugin functions `createPorscheDesignSystem` and `usePorscheDesignSystemPlugin`
- Porsche Next font supports Vietnamese charset
- React: `patchRemixRunProcessBrowserGlobalIdentifier` binary to support SSR components with Remix

## 👹 Breaking Changes 👹

### Banner:

- Removed CSS variable `--p-banner-position-type`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))

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

### Grid:

- Removed `gridSafeZone`, `gridSafeZoneBase`, `gridSafeZoneXXL` and `pds-grid-safe-zone-base`, `pds-grid-safe-zone-xxl`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))
- Removed `gridWidth`, `gridWidthMin`, `gridWidthMax` and `pds-grid-width-min`, `pds-grid-width-max`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))

### Heading:

- Removed value `xxx-large` for prop `size`

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

- Prop `colors`'s value `disabled` is removed, use `state-disabled` instead.

```diff
- <p-icon color="disabled"></p-icon>
+ <p-icon color="state-disabled"></p-icon>
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

### Marque:

- Removed `variant` property.

```diff
- <p-marque variant="75-years"></p-marque>
+ <p-marque></p-marque>
// or even better, replace component by wordmark
+ <p-wordmark></p-wordmark>
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

- Removed deprecated `withoutTags` option for all partials, please use `format: 'jsx'` instead
- Removed `applyNormalizeStyles` option from `getInitialStyles()` partial which is applied by default now.

### CSS global scope:

- Changed naming of CSS global variables names.

```diff
- --p-animation-duration__spinner
- --p-animation-duration__banner
+ --p-animation-duration
```

- Removed `fontSizeHeadingXXLarge` and `$pds-font-size-heading-xx-large`

## 🤡 Component deprecations 🤡

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

```diff
- <p-headline>The quick brown fox jumps over the lazy dog</p-headline>
+ <p-heading>The quick brown fox jumps over the lazy dog</p-heading>
```

### Link Social:

- Component is deprecated and will be removed with the next major release. Please use the **[Link](components/link)**
  component instead.

### Marque: ([#2418](https://github.com/porsche-design-system/porsche-design-system/pull/2418))

```diff
- <p-marque></p-marque>
+ <p-wordmark></p-wordmark>
```

### Fieldset Wrapper: ([#2404](https://github.com/porsche-design-system/porsche-design-system/pull/2404))

```diff
- <p-fieldset-wrapper label="Some legend label">
+ <p-fieldset label="Some legend label">
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
- </p-fieldset-wrapper>
+ </p-fieldset>
```

## 🤖 Property deprecations 🤖

All deprecated properties are still present without any effect, therefor it's technically not breaking, but we highly
recommend to migrate and remove the deprecated props since those ones will be removed with next major version.

### Accordion:

- Event `accordionChange` is deprecated, use `update` event instead.

```diff
- <PAccordion onAccordionChange={(e: CustomEvent<AccordionChangeEvent>) => {}} />
+ <PAccordion onUpdate={(e: CustomEvent<AccordionUPdateEvent>) => {}} />
```

### Banner:

- Prop `persistent` is deprecated, use `dismissButton` instead.
- Prop `width` has no effect anymore, instead the component is aligned with Porsche Grid "extended" by default.
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))

```diff
- <p-banner persistent="true"></p-banner>
+ <p-banner dismiss-button="false"></p-banner>
```

- Named `slot="title"` is deprecated, use `heading` prop or `slot="heading"` instead.

```diff
<p-banner>
-  <span slot="title">Some heading</span>
+  <span slot="heading">Some heading</span>
   <span slot="description">Some notification description.</span>
</p-banner>

-<p-banner>
+<p-banner heading="Some heading" description="Some notification description.">
-  <span slot="title">Some heading</span>
-  <span slot="description">Some notification description.</span>
</p-banner>
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

### Carousel:

- Event `carouselChange` is deprecated, use `update` event instead.

```diff
- <PCarousel onCarouselChange={(e: CustomEvent<CarouselChangeEvent>) => {}} />
+ <PCarousel onUpdate={(e: CustomEvent<CarouselUpdateEvent>) => {}} />
```

- Prop `disablePagination` is deprecated, use `pagination` instead.

- Prop `wrap-content` is deprecated.

```diff
- <p-carousel wrap-content="true"></p-carousel>
+ <p-carousel></p-carousel>
```

### Content Wrapper (deprecated):

- Prop `theme` and `background-color` are deprecated.

```diff
- <p-content-wrapper theme="dark" background-color="default">Some content</p-content-wrapper>
+ <p-content-wrapper>Some content</p-content-wrapper>
```

### Divider:

- Prop `orientation` is deprecated, use `direction` instead.

```diff
- <p-divider orientation="horizontal"></p-divider>
+ <p-divider direction="horizontal"></p-divider>
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

### Inline Notification:

- Prop `persistent` is deprecated, use `dismissButton` instead.

```diff
- <p-inline-notification persistent="true"></p-inline-notification>
+ <p-inline-notification dismiss-button="false"></p-inline-notification>
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

### Modal:

- Prop `disableCloseButton` is deprecated, use `dismissButton` instead.
- Event `close` is deprecated, use `dismiss` event instead.

```diff
- <p-modal disable-close-button="true"></p-modal>
+ <p-modal dismiss-button="false"></p-modal>

- <PModal onClose={(e: CustomEvent<void>) => {}} />
+ <PModal onDismiss={(e: CustomEvent<void>) => {}} />
```

### Pagination:

- Event `pageChange` is deprecated, use `update` event instead.

```diff
- <PPagination onPageChange={(e: CustomEvent<PageChangeEvent>) => {}} />
+ <PPagination onUpdate={(e: CustomEvent<PaginationUpdateEvent>) => {}} />
```

- Props `allyLabelNext`, `allyLabelPage`, `allyLabelPrev` and `allyLabel` are deprecated.

### Scroller:

- Prop `gradientColorScheme` is deprecated, use `gradientColor` instead.
- Prop `scrollIndicatorPosition` is deprecated, use `alignScrollIndicator` instead.

```diff
- <p-scroller gradient-color-scheme="surface"></p-scroller>
+ <p-scroller gradient-color="background-surface"></p-scroller>

- <p-scroller scroll-indicator-position="top"></p-scroller>
+ <p-scroller align-scroll-indicator="top"></p-scroller>
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

- Event `segmentedControlChange` is deprecated, use `update` event instead.

```diff
- <PSegmentedControl onSegmentedControlChange={(e: CustomEvent<SegmentedControlChangeEvent>) => {}} />
+ <PSegmentedControl onUpdate={(e: CustomEvent<SegmentedControlUpdateEvent>) => {}} />
```

### Stepper Horizontal:

- Event `stepChange` is deprecated, use `update` event instead.

```diff
- <PStepperHorizontal onStepChange={(e: CustomEvent<StepChangeEvent>) => {}} />
+ <PStepperHorizontal onUpdate={(e: CustomEvent<StepperHorizontalUpdateEvent>) => {}} />
```

### Switch:

- Event `switchChange` is deprecated, use `update` event instead.

```diff
- <PSwitch onSwitchChange={(e: CustomEvent<SwitchChangeEvent>) => {}} />
+ <PSwitch onUpdate={(e: CustomEvent<SwitchUpdateEvent>) => {}} />
```

### Table:

- Event `sortingChange` is deprecated, use `update` event instead.

```diff
- <PTable onSortingChange={(e: CustomEvent<SortingChangeEvent>) => {}} />
+ <PTable onUpdate={(e: CustomEvent<TableUpdateEvent>) => {}} />
```

### Tabs:

- Event `tabChange` is deprecated, use `update` event instead.

```diff
- <PTabs onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabs onUpdate={(e: CustomEvent<TabsUpdateEvent>) => {}} />
```

- Prop `gradientColorScheme` is deprecated, use `gradientColor` instead.
- Prop `weight`'s value `semibold` is deprecated, use `semi-bold` instead.

```diff
- <p-tabs gradient-color-scheme="surface"></p-tabs>
+ <p-tabs gradient-color="background-surface"></p-tabs>

- <p-tabs weight="semibold"></p-tabs>
+ <p-tabs weight="semi-bold"></p-tabs>
```

### Tabs Bar:

- Event `tabChange` is deprecated, use `update` event instead.

```diff
- <PTabsBar onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabsBar onUpdate={(e: CustomEvent<TabsUpdateEvent>) => {}} />
```

- Prop `gradientColorScheme` is deprecated, use `gradientColor` instead.
- Prop `weight`'s value `semibold` is deprecated, use `semi-bold` instead.

```diff
- <p-tabs-bar gradient-color-scheme="surface"></p-tabs-bar>
+ <p-tabs-bar gradient-color="background-surface"></p-tabs-bar>

- <p-tabs-bar weight="semibold"></p-tabs>
+ <p-tabs-bar weight="semi-bold"></p-tabs>
```

### Text Field Wrapper:

- Prop `showCharacterCount` is deprecated, use `showCounter` instead.

```diff
-<p-text-field-wrapper show-character-count="false">
+<p-text-field-wrapper show-counter="false">
  <input type="text" maxlength="20" />
</p-text-field-wrapper>
```

### Textarea Wrapper:

- Prop `showCharacterCount` is deprecated, use `showCounter` instead.

```diff
-<p-textarea-wrapper show-character-count="false">
+<p-textarea-wrapper show-counter="false">
  <textarea maxlength="80"></textarea>
</p-textarea-wrapper>
```

### Text List

- Props `listType` and `orderType` are deprecated, use `type` instead.

```diff
- <p-text-list list-type="unordered"></p-text-list>
+ <p-text-list type="unordered"></p-text-list>

- <p-text-list list-type="ordered" order-type="numbered"></p-text-list>
+ <p-text-list type="numbered"></p-text-list>

- <p-text-list list-type="ordered" order-type="alphabetically"></p-text-list>
+ <p-text-list type="alphabetically"></p-text-list>
```

## 👾 Property value deprecations 👾

All deprecated values are mapped to new ones, therefor it's technically not breaking, but we highly recommend to migrate
to the new values since those ones will be removed with next major version.

### Banner:

- Prop value `fluid` of `width` prop is deprecated.

```diff
- <p-banner width="fluid"></p-banner>
+ <p-banner></p-banner>
```

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

### Content Wrapper:

- Prop value `fluid` of `width` prop is deprecated.

```diff
- <p-content-wrapper width="fluid">Some content</p-content-wrapper>
+ <p-content-wrapper>Some content</p-content-wrapper>
```

### Divider:

- Prop values `neutral-contrast-low | neutral-contrast-medium | neutral-contrast-high` of `color` prop are deprecated.

```diff
- <p-divider color="neutral-contrast-low"></p-divider>
+ <p-divider color="contrast-low"></p-divider>

- <p-divider color="neutral-contrast-medium"></p-divider>
+ <p-divider color="contrast-medium"></p-divider>

- <p-divider color="neutral-contrast-high"></p-divider>
+ <p-divider color="contrast-high"></p-divider>
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

- Prop values `notification-neutral`, `neutral-contrast-high`, `background-default`, `notification-warning`,
  `notification-success` and `notification-error` of `color` prop are deprecated, use `notification-warning-soft`,
  `notification-success-soft` and `notification-error-soft` instead.

```diff
- <p-tag color="notification-neutral">Color label</p-tag>
+ <p-tag color="notification-info">Color label</p-tag>

- <p-tag color="neutral-contrast-high">Color label</p-tag>
+ <p-tag color="primary">Color label</p-tag>

- <p-tag color="background-default">Color label</p-tag>
+ <p-tag color="background-base">Color label</p-tag>

- <p-tag color="notification-warning"></p-tag>
+ <p-tag color="notification-warning-soft"></p-tag>

- <p-tag color="notification-success"></p-tag>
+ <p-tag color="notification-success-soft"></p-tag>

- <p-tag color="notification-error"></p-tag>
+ <p-tag color="notification-error-soft"></p-tag>
```

### Link Tile:

- Prop `weight`'s value `semibold` is deprecated, use `semi-bold` instead.

```diff
- <p-link-tile weight="semibold"></p-link-tile>
+ <p-link-tile weight="semi-bold"></p-link-tile>
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
