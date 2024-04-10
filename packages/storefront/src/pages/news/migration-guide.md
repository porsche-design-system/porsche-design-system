# Migration Guide

<TableOfContents></TableOfContents>

## Migrate from Porsche Design System v2 to v3

With the new **Porsche Design Language** comes a lot of changes regarding layout and design principles. To keep
refactoring efforts as low as possible when upgrading from `v2` to `v3`, **breaking changes** were avoided as far as
possible. Nevertheless, there are a few breaking changes and some more deprecations which should receive attention.

Please follow the migration guide on this page. In addition, we offer a [components overview](components/introduction)
which shows all component information including deprecated components/props/values.

<Notification heading="Deprecation hint" heading-tag="h3" state="error">
  Porsche Design System <b>v2</b> support will end on <b>June 30th, 2023</b> (until EOL date only critical bug fixing takes place).<br>
  <br>
  <b>Please make sure that upgrading to Porsche Design System v3 is feasible before the EOL date</b>.
</Notification>

## Notable New Features

- New design language for all components
- All components are supporting `theme` light and dark
- New Components: `Crest`, `Wordmark`, `Model Signature`, `Link Tile Model Signature`, `Button Tile` and `Display`
- Vue JS documentation for all components
- Porsche Next font supports Vietnamese charset
- SSR Support for Remix

## 👹 Breaking Changes

### Banner:

- It's a controlled component now and its visibility has to be controlled via the `open` prop (similar like
  **[Modal](components/modal)**).

```diff
- <p-banner></p-banner>
+ <p-banner open="true"></p-banner>
```

- Removed global CSS variable.

```diff
- --p-banner-position-type
```

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

### CSS Variables:

- Changed naming of global CSS variables.

```diff
- --p-animation-duration__spinner
- --p-animation-duration__banner
+ --p-animation-duration
```

### Partials:

- Removed deprecated `withoutTags` option for all partials, please use `format: jsx` instead.

## 🤡 Component deprecations

All deprecated components are refactored to match the new design language, therefor it's technically not breaking, but
we highly recommend to migrate to the mentioned alternative, since those deprecated components will be removed with next
major version.

### Content Wrapper:

- Component is deprecated and will be removed with the next major release. Please use **[Porsche Grid](styles/grid)**
  instead, which is based on [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid) covering the specific
  layout needs for a harmonic appearance across all digital Porsche touch-points.

### Fieldset Wrapper:

- Component is deprecated and will be removed with the next major release. Please use the
  **[Fieldset](components/fieldset)** component instead.

```diff
- <p-fieldset-wrapper label="Some legend label">
+ <p-fieldset label="Some legend label">
    <p-text-field-wrapper label="Some label">
      <input type="text" name="some-name" />
    </p-text-field-wrapper>
- </p-fieldset-wrapper>
+ </p-fieldset>
```

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
  **[Heading](components/heading)** component instead.

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

### Accordion:

- Event `accordionChange` is deprecated, use new event `update`.

```diff
// Accordingly for other JS frameworks, e.g. React example:
- <PAccordion onAccordionChange={(e: CustomEvent<AccordionChangeEvent>) => {}} />
+ <PAccordion onUpdate={(e: CustomEvent<AccordionUpdateEvent>) => {}} />
```

### Banner:

- Prop `width` is deprecated, instead the component is aligned with the **[Porsche Grid](styles/grid)** "extended" by
  default.

```diff
- <p-banner width="fluid"></p-banner>
+ <p-banner></p-banner>
```

- Named `slot="title"` is deprecated, use new slot or prop `heading`.

```diff
<p-banner>
- <span slot="title">Some heading</span>
+ <span slot="heading">Some heading</span>
  <span slot="description">Some notification description.</span>
</p-banner>

- <p-banner>
+ <p-banner heading="Some heading" description="Some notification description.">
-   <span slot="title">Some heading</span>
-   <span slot="description">Some notification description.</span>
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

- Prop `wrap-content` is deprecated. The component is always aligned with the **[Porsche Grid](styles/grid)** now,
  adjustable by prop `width`.

```diff
- <p-carousel wrap-content="true"></p-carousel>
+ <p-carousel></p-carousel>
```

- Prop `disablePagination` is deprecated, use new prop `pagination`.

```diff
- <p-carousel disable-pagination="true"></p-carousel>
+ <p-carousel pagination="false"></p-carousel>
```

- Event `carouselChange` is deprecated, use new event `update`.

```diff
// Accordingly for other JS frameworks, e.g. React example:
- <PCarousel onCarouselChange={(e: CustomEvent<CarouselChangeEvent>) => {}} />
+ <PCarousel onUpdate={(e: CustomEvent<CarouselUpdateEvent>) => {}} />
```

### Content Wrapper (deprecated):

- Prop `theme` and `background-color` are deprecated, has no effect anymore.

```diff
- <p-content-wrapper theme="dark" background-color="default">Some content</p-content-wrapper>
+ <p-content-wrapper>Some content</p-content-wrapper>
```

### Divider:

- Prop `orientation` is deprecated, use new prop `direction`.

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

- Prop `lazy` is deprecated, has no effect anymore.

```diff
- <p-icon lazy="true"></p-icon>
+ <p-icon></p-icon>
```

### Inline Notification:

- Prop `persistent` is deprecated, use new prop `dismissButton`.

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

- Prop `disableCloseButton` is deprecated, use new prop `dismissButton`.

```diff
- <p-modal disable-close-button="true"></p-modal>
+ <p-modal dismiss-button="false"></p-modal>
```

- Event `close` is deprecated, use new event `dismiss`.

```diff
// Accordingly for other JS frameworks, e.g. React example:
- <PModal onClose={(e: CustomEvent<void>) => {}} />
+ <PModal onDismiss={(e: CustomEvent<void>) => {}} />
```

### Pagination:

- Props `allyLabelNext`, `allyLabelPage`, `allyLabelPrev` and `allyLabel` are deprecated, use new prop `intl`.

```diff
- <p-pagination ally-label="Paginierung" ally-label-prev="Vorherige Seite" ally-label-next="Nächste Seite" ally-label-page="Seite"></p-pagination>
+ <p-pagination intl="{root: 'Paginierung', prev: 'Vorherige Seite', next: 'Nächste Seite', page: 'Seite'}"></p-pagination>
```

- Event `pageChange` is deprecated, use new event `update`.

```diff
// Accordingly for other JS frameworks, e.g. React example:
- <PPagination onPageChange={(e: CustomEvent<PageChangeEvent>) => {}} />
+ <PPagination onUpdate={(e: CustomEvent<PaginationUpdateEvent>) => {}} />
```

### Scroller:

- Prop `gradientColorScheme` is deprecated, use new prop `gradientColor`.

```diff
- <p-scroller gradient-color-scheme="surface"></p-scroller>
+ <p-scroller gradient-color="background-surface"></p-scroller>
```

- Prop `scrollIndicatorPosition` is deprecated, use new prop `alignScrollIndicator`.

```diff
- <p-scroller scroll-indicator-position="top"></p-scroller>
+ <p-scroller align-scroll-indicator="top"></p-scroller>
```

### Segmented Control:

- Prop `background-color` is deprecated, has no effect anymore.

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

- Event `segmentedControlChange` is deprecated, use new event `update`.

```diff
// Accordingly for other JS frameworks, e.g. React example:
- <PSegmentedControl onSegmentedControlChange={(e: CustomEvent<SegmentedControlChangeEvent>) => {}} />
+ <PSegmentedControl onUpdate={(e: CustomEvent<SegmentedControlUpdateEvent>) => {}} />
```

### Stepper Horizontal:

- Event `stepChange` is deprecated, use new event `update`.

```diff
// Accordingly for other JS frameworks, e.g. React example:
- <PStepperHorizontal onStepChange={(e: CustomEvent<StepChangeEvent>) => {}} />
+ <PStepperHorizontal onUpdate={(e: CustomEvent<StepperHorizontalUpdateEvent>) => {}} />
```

### Switch:

- Event `switchChange` is deprecated, use new event `update`.

```diff
// Accordingly for other JS frameworks, e.g. React example:
- <PSwitch onSwitchChange={(e: CustomEvent<SwitchChangeEvent>) => {}} />
+ <PSwitch onUpdate={(e: CustomEvent<SwitchUpdateEvent>) => {}} />
```

### Table:

- Event `sortingChange` is deprecated, use new event `update`.

```diff
// Accordingly for other JS frameworks, e.g. React example:
- <PTable onSortingChange={(e: CustomEvent<SortingChangeEvent>) => {}} />
+ <PTable onUpdate={(e: CustomEvent<TableUpdateEvent>) => {}} />
```

### Tabs:

- Prop `gradientColorScheme` is deprecated, use new prop `gradientColor`.

```diff
- <p-tabs gradient-color-scheme="surface"></p-tabs>
+ <p-tabs gradient-color="background-surface"></p-tabs>
```

- Event `tabChange` is deprecated, use new event `update`.

```diff
// Accordingly for other JS frameworks, e.g. React example:
- <PTabs onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabs onUpdate={(e: CustomEvent<TabsUpdateEvent>) => {}} />
```

### Tabs Bar:

- Prop `gradientColorScheme` is deprecated, use new prop `gradientColor`.

```diff
- <p-tabs-bar gradient-color-scheme="surface"></p-tabs-bar>
+ <p-tabs-bar gradient-color="background-surface"></p-tabs-bar>
```

- Event `tabChange` is deprecated, use new event `update`.

```diff
// Accordingly for other JS frameworks, e.g. React example:
- <PTabsBar onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabsBar onUpdate={(e: CustomEvent<TabsUpdateEvent>) => {}} />
```

### Text Field Wrapper:

- Prop `showCharacterCount` is deprecated, use new prop `showCounter`.

```diff
- <p-text-field-wrapper show-character-count="false">
+ <p-text-field-wrapper show-counter="false">
    <input type="text" maxlength="20" />
</p-text-field-wrapper>
```

### Textarea Wrapper:

- Prop `showCharacterCount` is deprecated, use new prop `showCounter`.

```diff
- <p-textarea-wrapper show-character-count="false">
+ <p-textarea-wrapper show-counter="false">
    <textarea maxlength="80"></textarea>
</p-textarea-wrapper>
```

### Text List

- Props `listType` and `orderType` are deprecated, use new prop `type`.

```diff
- <p-text-list list-type="unordered"></p-text-list>
+ <p-text-list type="unordered"></p-text-list>

- <p-text-list list-type="ordered" order-type="numbered"></p-text-list>
+ <p-text-list type="numbered"></p-text-list>

- <p-text-list list-type="ordered" order-type="alphabetically"></p-text-list>
+ <p-text-list type="alphabetically"></p-text-list>
```

## 👾 Property value deprecations

All deprecated values are mapped to new ones, therefor it's technically not breaking, but we highly recommend to migrate
to the new values since those ones will be removed with next major version.

### Banner:

- Prop value `neutral` of `state` prop is deprecated, use new value `info`.

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

- Prop value `fluid` of `width` prop is deprecated, use new value `full`.

```diff
- <p-content-wrapper width="fluid">Some content</p-content-wrapper>
+ <p-content-wrapper width="full">Some content</p-content-wrapper>
```

### Divider:

- Prop values `neutral-contrast-low | neutral-contrast-medium | neutral-contrast-high` of `color` prop are deprecated,
  use new values `contrast-low | contrast-medium | contrast-high`.

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
  `color` prop are deprecated, use new values
  `primary | contrast-low | contrast-medium | contrast-high | notification-info`.

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

- <p-icon color="notification-neutral"></p-icon>
+ <p-icon color="notification-info"></p-icon>
```

### Inline Notification:

- Prop value `neutral` of `state` prop is deprecated, use new value `info`.

```diff
- <p-inline-notification state="neutral"></p-inline-notification>
+ <p-inline-notification state="info"></p-inline-notification>
```

### Link Tile:

- Prop value `semibold` of `weight` prop is deprecated, use new value `semi-bold`.

```diff
- <p-link-tile weight="semibold"></p-link-tile>
+ <p-link-tile weight="semi-bold"></p-link-tile>
```

### Tabs:

- Prop value `semibold` of `weight` prop is deprecated, use new value `semi-bold`.

```diff
- <p-tabs weight="semibold"></p-tabs>
+ <p-tabs weight="semi-bold"></p-tabs>
```

### Tabs Bar:

- Prop value `semibold` of `weight` prop is deprecated, use new value `semi-bold`.

```diff
- <p-tabs-bar weight="semibold"></p-tabs>
+ <p-tabs-bar weight="semi-bold"></p-tabs>
```

### Tag:

- Prop value
  `notification-neutral | background-error | background-success | background-warning | neutral-contrast-high | background-default`
  of `color` prop is deprecated, use new value
  `notification-info-soft | notification-error-soft | notification-success-soft | notification-warning-soft | primary | background-base`.

```diff
- <p-tag color="notification-neutral">Color label</p-tag>
+ <p-tag color="notification-info-soft">Color label</p-tag>

- <p-tag color="notification-error">Color label</p-tag>
+ <p-tag color="notification-error-soft">Color label</p-tag>

- <p-tag color="notification-success">Color label</p-tag>
+ <p-tag color="notification-success-soft">Color label</p-tag>

- <p-tag color="notification-warning">Color label</p-tag>
+ <p-tag color="notification-warning-soft">Color label</p-tag>

- <p-tag color="neutral-contrast-high">Color label</p-tag>
+ <p-tag color="primary">Color label</p-tag>

- <p-tag color="background-default">Color label</p-tag>
+ <p-tag color="background-base">Color label</p-tag>
```

### Tag Dismissible:

- Prop value `background-default` of `color` prop is deprecated, use new value `background-base`.

```diff
- <p-tag-dismissible color="background-default">Color label</p-tag-dismissible>
+ <p-tag-dismissible color="background-base">Color label</p-tag-dismissible>
```

### Text:

- Prop value `thin | semibold` of `weight` prop is deprecated (`thin` is mapped to `regular` by default).

```diff
- <p-text weight="thin">Some text</p-text>
+ <p-text>Some text</p-text>

- <p-text weight="semibold">Some text</p-text>
+ <p-text weight="semi-bold">Some text</p-text>
```

- Prop value
  `brand | default | neutral-contrast-low | neutral-contrast-medium | neutral-contrast-high | notification-neutral` of
  `color` prop is deprecated, use new value
  `primary | contrast-low | contrast-medium | contrast-high | notification-info`.

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

- Prop value `neutral` of `state` parameter is deprecated, use new value `info`.

```diff
- …addMessage({ text: `Some message`, state: 'neutral' })
+ …addMessage({ text: `Some message`, state: 'info' })
```
