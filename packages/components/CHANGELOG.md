# Changelog

## Porsche Design System

All notable changes to this project will be documented in this file and published as following npm packages:

- `@porsche-design-system/components-js`
- `@porsche-design-system/components-angular`
- `@porsche-design-system/components-react`
- `@porsche-design-system/components-vue`

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [Unreleased]

### [3.3.0] - 2023-07-07

### [3.3.0-rc.0] - 2023-07-06

#### Added

- `Tabs` and `Tabs Bar` support SSR ([#2611](https://github.com/porsche-design-system/porsche-design-system/pull/2611))
- Contents of `Tag` component can now be wrapped in multiple lines
  ([#2625](https://github.com/porsche-design-system/porsche-design-system/pull/2625))
- `Carousel`: Possibility to set custom border-radius of slide items
  ([#2645](https://github.com/porsche-design-system/porsche-design-system/pull/2645))
- native lazy loading attribute to `img` tag of `Icon`
  ([#2644](https://github.com/porsche-design-system/porsche-design-system/pull/2644))

#### Fixed

- `Stepper Horizontal` navigation between 2 pages is not working as expected in angular
  ([#2641](https://github.com/porsche-design-system/porsche-design-system/pull/2641))
- `Segmented Control` text is not centered / causing unintended line-breaks
  ([#2614](https://github.com/porsche-design-system/porsche-design-system/pull/2614))
- `jsdom-polyfill` fixes validation errors in unit tests during SSR hydration
  ([#2613](https://github.com/porsche-design-system/porsche-design-system/pull/2613))
- `Accordion` collapsable content is overflowing when used with multiple prefixes  
  ([#2612](https://github.com/porsche-design-system/porsche-design-system/pull/2612))
- `Tabs Bar` position of underline for fluid font-size with `size="medium` when resizing
  ([#2611](https://github.com/porsche-design-system/porsche-design-system/pull/2611))
- `Button Pure`, `Link Pure`: `:hover` bug on Firefox
  ([#2630](https://github.com/porsche-design-system/porsche-design-system/pull/2630))
- `Carousel`: Removed `overflow:hidden` of slide items
  ([#2645](https://github.com/porsche-design-system/porsche-design-system/pull/2645))

#### Changed

- Improved bootstrapping behaviour of `Icon`
  ([#2644](https://github.com/porsche-design-system/porsche-design-system/pull/2644))

### [3.2.0] - 2023-06-19

### [3.2.0-rc.0] - 2023-06-19

#### Added

- `skipLinkTarget` property to `Carousel` component to enhance keyboard functionality
  ([#2557](https://github.com/porsche-design-system/porsche-design-system/pull/2557))
- `showLastPage` property to `Pagination` component
  ([#2606](https://github.com/porsche-design-system/porsche-design-system/pull/2606))

#### Fixed

- Partials: `getInitialStyles` supports `Flyout` component
  ([#2598](https://github.com/porsche-design-system/porsche-design-system/pull/2598))
- `Popover` content can be selected/highlighted
  ([#2599](https://github.com/porsche-design-system/porsche-design-system/pull/2599))

#### Changed

- `Carousel` pagination now shows 5 "infinite bullets" when using more than 5 slides
  ([#2600](https://github.com/porsche-design-system/porsche-design-system/pull/2600))
- `Carousel` supports click events on non-active slides and changed keyboard navigation
  ([#2557](https://github.com/porsche-design-system/porsche-design-system/pull/2557))
- Unified wordings of all console warnings, errors and exceptions
  ([#2602](https://github.com/porsche-design-system/porsche-design-system/pull/2602))
- Angular: increased peer dependency to `>=15.0.0 <17.0.0`
  ([#2602](https://github.com/porsche-design-system/porsche-design-system/pull/2602))
- `Toast` allows line break markups within toast message
  ([#2584](https://github.com/porsche-design-system/porsche-design-system/pull/2584))
- `Toast` shows always the latest toast message and clears its queue immediately if a new message is added
  ([#2584](https://github.com/porsche-design-system/porsche-design-system/pull/2584))

### [3.1.0] - 2023-06-09

### [3.1.0-rc.2] - 2023-06-09

#### Changed

- `Crest` updated assets ([#2595](https://github.com/porsche-design-system/porsche-design-system/pull/2595))
- Partials: `getMetaTagsAndIconLinks` updated assets
  ([#2595](https://github.com/porsche-design-system/porsche-design-system/pull/2595))

#### Added

- `Flyout` ([#2547](https://github.com/porsche-design-system/porsche-design-system/pull/2547))

#### Fixed

- Wrong validation during SSR hydration of `Link Tile` and `Select Wrapper`
  ([#2588](https://github.com/porsche-design-system/porsche-design-system/pull/2588))
- `Modal` scrollable modal does not jump to top on changes within dialog
  ([#2574](https://github.com/porsche-design-system/porsche-design-system/pull/2574))
- Unnecessary lifecycles are prevented when prop values do not change for complex values
  ([#2574](https://github.com/porsche-design-system/porsche-design-system/pull/2574))

### [3.1.0-rc.1] - 2023-06-02

#### Added

- **[EXPERIMENTAL]** Prop `showPasswordToggle` for `Text Field Wrapper` with `input type="password"`
  ([#2586](https://github.com/porsche-design-system/porsche-design-system/pull/2586))
- Prop `name` for `Icon` supports `heart`, `heart-filled`, `copy`, `fingerprint`, `tire`, `roof-open` and `roof-closed`
  ([#2589](https://github.com/porsche-design-system/porsche-design-system/pull/2589))

#### Fixed

- `Select Wrapper` missing border on touch devices
  ([#2579](https://github.com/porsche-design-system/porsche-design-system/pull/2579))
- `Tabs Item` text content can be selected/highlighted
  ([#2582](https://github.com/porsche-design-system/porsche-design-system/pull/2582))

### [3.1.0-rc.0] - 2023-05-24

#### Added

- `Marque` now has a `variant` property, including 75 years variant
  ([#2575](https://github.com/porsche-design-system/porsche-design-system/pull/2575))

### [3.0.0] - 2023-05-11

### [3.0.0-rc.3] - 2023-05-10

#### Fixed

- `Tabs Bar` focus behavior via keyboard navigation
  ([#2546](https://github.com/porsche-design-system/porsche-design-system/pull/2546))
- Rendering of `Wordmark` in Safari ([#2542](https://github.com/porsche-design-system/porsche-design-system/pull/2542))
- Disabled dragging/ghosting of icons
  ([#2536](https://github.com/porsche-design-system/porsche-design-system/pull/2536))

#### Changed

- Styles: `dropShadow{Low|Medium|High}Style`s use `box-shadow` instead of `filter: drop-shadow()` to fix glitches
  together with `frostedGlassStyle` in Firefox
  ([#2545](https://github.com/porsche-design-system/porsche-design-system/pull/2545))
- Size of icon and height of `Accordion`
  ([#2536](https://github.com/porsche-design-system/porsche-design-system/pull/2536))

### [3.0.0-rc.2] - 2023-05-09

#### Fixed

- `Checkbox Wrapper` Safari visual state change while hovering
  ([#2508](https://github.com/porsche-design-system/porsche-design-system/pull/2508))
- `Checkbox Wrapper` keyboard arrow navigation
  ([#2508](https://github.com/porsche-design-system/porsche-design-system/pull/2508))
- `Modal` fix hover state of dismiss button
  ([#2510](https://github.com/porsche-design-system/porsche-design-system/pull/2510))
- `Link Pure`, `Button Pure`: adjust offset of `:hover` and `active` styles
  ([#2511](https://github.com/porsche-design-system/porsche-design-system/pull/2511))
- `Tabs Bar`, `Tabs` ([#2521](https://github.com/porsche-design-system/porsche-design-system/pull/2521)):
  - `focus` state of tabpanel
  - Indicator bar height
- Optimize icon/text alignment of `Link Pure` and `Button Pure` in Safari
- `Select Wrapper` multiline option height and scaling behavior
  ([#2524](https://github.com/porsche-design-system/porsche-design-system/pull/2524))
- Fixed accessibility issues of `Tabs`, `Tabs Bar` and `Stepper Horizontal` to comply with v.4.7.0 of `axe-core`
  ([#2530](https://github.com/porsche-design-system/porsche-design-system/pull/2530))
- React: `patchRemixRunProcessBrowserGlobalIdentifier` binary now supports Remix 1.16.0
  ([#2537](https://github.com/porsche-design-system/porsche-design-system/pull/2537))
- Angular: added optional modifier to optional properties for better type checking in strict mode
  ([#2544](https://github.com/porsche-design-system/porsche-design-system/pull/2544))

#### Added

- Deprecation warning to `Icon` component if `lazy` prop is used
  ([#2521](https://github.com/porsche-design-system/porsche-design-system/pull/2521))
- `aria` prop to `Scroller` component
  ([#2530](https://github.com/porsche-design-system/porsche-design-system/pull/2530))

#### Changed

- Model signature asset of 718 model ([#2532](https://github.com/porsche-design-system/porsche-design-system/pull/2532))

### [3.0.0-rc.1] - 2023-04-19

#### Added

- Prop `name` for `Icon` supports `push-pin`, `push-pin-off`, `qr`, `pin-filled`, `shopping-cart-filled`,
  `shopping-bag-filled`, `logo-apple-podcast`, `logo-spotify` and `user-filled`
  ([#2471](https://github.com/porsche-design-system/porsche-design-system/pull/2471)).
- **[EXPERIMENTAL]** Prop `loading` for `Checkbox Wrapper`
  ([#2483](https://github.com/porsche-design-system/porsche-design-system/pull/2483))

#### Fixed

- `Wordmark`, `Crest` and `Model Signature` respect parent width/height
  ([#2479](https://github.com/porsche-design-system/porsche-design-system/pull/2479))
- `Button Tile`, `Link Tile` and `Link Tile Model Signature` are using correct border radius of
  `pds-border-radius-large` ([#2473](https://github.com/porsche-design-system/porsche-design-system/pull/2473))
- `Text Field Wrapper` with `input type="search"` has better accessibility for clear button
  ([#2476](https://github.com/porsche-design-system/porsche-design-system/pull/2476))
- `Accordion` layout shift with nested accordions
  ([#2465](https://github.com/porsche-design-system/porsche-design-system/pull/2465))
- Color Contrast issues and rendering in Windows High Contrast Mode
  ([#2420](https://github.com/porsche-design-system/porsche-design-system/pull/2420))

### [3.0.0-rc.0] - 2023-04-11

#### Fixed

- Styles: `borderRadiusLarge` and `pds-border-radius-large` are exposing correct value
  ([#2463](https://github.com/porsche-design-system/porsche-design-system/pull/2463))

### [3.0.0-alpha.6] - 2023-04-06

#### Added

- `xxl` breakpoint for all breakpoint customizable component values
  ([#2454](https://github.com/porsche-design-system/porsche-design-system/pull/2454))

#### Fixed

- Disabled color of `Icon` component ([#2446](https://github.com/porsche-design-system/porsche-design-system/pull/2446))
- Support of `Radio Button Wrapper` for name value with non-alphanumeric characters
  ([#2443](https://github.com/porsche-design-system/porsche-design-system/pull/2443))

#### Changed

- `Banner` is a controlled component now and its visibility has to be controlled via the `open` prop
  ([#2447](https://github.com/porsche-design-system/porsche-design-system/pull/2447))

```diff
- <p-banner></p-banner>
+ <p-banner open="true"></p-banner>
```

- Renamed all custom `change` events to `update` because of bad event emissions with native `change` events, e.g. with
  nested `select` or `input` elements

#### 🤖 Property deprecations 🤖

##### Accordion:

- Event `accordionChange` is deprecated, use `update` event instead.

```diff
- <PAccordion onAccordionChange={(e: CustomEvent<AccordionChangeEvent>) => {}} />
+ <PAccordion onUpdate={(e: CustomEvent<AccordionUpdateEvent>) => {}} />
```

##### Banner:

- Prop `persistent` is deprecated, use `dismissButton` instead.

```diff
- <p-banner persistent="true"></p-banner>
+ <p-banner dismiss-button="false"></p-banner>
```

##### Carousel:

- Event `carouselChange` is deprecated, use `update` event instead.

```diff
- <PCarousel onCarouselChange={(e: CustomEvent<CarouselChangeEvent>) => {}} />
+ <PCarousel onUpdate={(e: CustomEvent<CarouselUpdateEvent>) => {}} />
```

##### Inline Notification:

- Prop `persistent` is deprecated, use `dismissButton` instead.

```diff
- <p-inline-notification persistent="true"></p-inline-notification>
+ <p-inline-notification dismiss-button="false"></p-inline-notification>
```

##### Pagination:

- Event `pageChange` is deprecated, use `update` event instead.

```diff
- <PPagination onPageChange={(e: CustomEvent<PageChangeEvent>) => {}} />
+ <PPagination onUpdate={(e: CustomEvent<PaginationUpdateEvent>) => {}} />
```

##### Segmented Control:

- Event `segmentedControlChange` is deprecated, use `update` event instead.

```diff
- <PSegmentedControl onSegmentedControlChange={(e: CustomEvent<SegmentedControlChangeEvent>) => {}} />
+ <PSegmentedControl onUpdate={(e: CustomEvent<SegmentedControlUpdateEvent>) => {}} />
```

##### Stepper Horizontal:

- Event `stepChange` is deprecated, use `update` event instead.

```diff
- <PStepperHorizontal onStepChange={(e: CustomEvent<StepChangeEvent>) => {}} />
+ <PStepperHorizontal onUpdate={(e: CustomEvent<StepperHorizontalUpdateEvent>) => {}} />
```

##### Switch:

- Event `switchChange` is deprecated, use `update` event instead.

```diff
- <PSwitch onSwitchChange={(e: CustomEvent<SwitchChangeEvent>) => {}} />
+ <PSwitch onUpdate={(e: CustomEvent<SwitchUpdateEvent>) => {}} />
```

##### Table:

- Event `sortingChange` is deprecated, use `update` event instead.

```diff
- <PTable onSortingChange={(e: CustomEvent<SortingChangeEvent>) => {}} />
+ <PTable onUpdate={(e: CustomEvent<TableUpdateEvent>) => {}} />
```

##### Tabs:

- Event `tabChange` is deprecated, use `update` event instead.

```diff
- <PTabs onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabs onUpdate={(e: CustomEvent<TabsUpdateEvent>) => {}} />
```

##### Tabs Bar:

- Event `tabChange` is deprecated, use `update` event instead.

```diff
- <PTabsBar onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabsBar onUpdate={(e: CustomEvent<TabsUpdateEvent>) => {}} />
```

### [3.0.0-alpha.5] - 2023-03-30

#### Added

- `Wordmark` ([#2418](https://github.com/porsche-design-system/porsche-design-system/pull/2418))
- `Crest` ([#2437](https://github.com/porsche-design-system/porsche-design-system/pull/2437))

#### Changed

- Styles: changed color values of `theme[Light|Dark]ContrastMedium` and `theme[Light|Dark]Notification[*]` color tokens
  of `Styles` subpackage ([#2436](https://github.com/porsche-design-system/porsche-design-system/pull/2436))

### [3.0.0-alpha.4] - 2023-03-28

#### Changed

- `Table` matches new design language
  ([#2364](https://github.com/porsche-design-system/porsche-design-system/pull/2364/))

#### Added

- Styles: ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))
  - `gridWide`
  - `gridWideColumnStart` and `pds-grid-wide-column-start`
  - `gridWideColumnEnd` and `pds-grid-wide-column-end`
  - `gridNarrowOffset`, `gridNarrowOffsetBase`, `gridNarrowOffsetS`, `gridNarrowOffsetXXL` and
    `$pds-grid-narrow-offset-base`, `$pds-grid-narrow-offset-s`, `$pds-grid-narrow-offset-xxl`
  - `gridBasicOffset`, `gridBasicOffsetBase`, `gridBasicOffsetS`, `gridBasicOffsetXXL` and
    `$pds-grid-basic-offset-base`, `$pds-grid-basic-offset-s`, `$pds-grid-basic-offset-xxl`
  - `gridExtendedOffset`, `gridExtendedOffsetBase`, `gridExtendedOffsetS`, `gridExtendedOffsetXXL` and
    `$pds-grid-extended-offset-base`, `$pds-grid-extended-offset-s`, `$pds-grid-extended-offset-xxl`
  - `gridWideOffset`, `gridWideOffsetBase`, `gridWideOffsetS`, `gridWideOffsetXXL` and `$pds-grid-wide-offset-base`,
    `$pds-grid-wide-offset-s`, `$pds-grid-wide-offset-xxl`
  - `gridFullOffset` and `$pds-grid-full-offset`
- `Button Tile` ([#2381](https://github.com/porsche-design-system/porsche-design-system/pull/2381))
- `Fieldset` ([#2404](https://github.com/porsche-design-system/porsche-design-system/pull/2404))
- `Link Tile Model Signature` ([#2388](https://github.com/porsche-design-system/porsche-design-system/pull/2388))
- Prop `activeSlideIndex` to `Carousel`
  ([#2421](https://github.com/porsche-design-system/porsche-design-system/pull/2421))
- Prop `slidesPerPage` supports value `auto` of `Carousel`
  ([#2421](https://github.com/porsche-design-system/porsche-design-system/pull/2421))
- Prop `scrollbar` for `Scroller` ([#2364](https://github.com/porsche-design-system/porsche-design-system/pull/2364/))
- Prop `theme` for `Table` ([#2364](https://github.com/porsche-design-system/porsche-design-system/pull/2364/))

#### Fixed

- React: missing animation of `Carousel` in certain scenarios

#### Changed

- Styles: `gridStyles` and `pds-grid` are supporting an additional column range called `wide`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))
- Styles: SCSS version needs to be imported by `@porsche-design-system/components-js/styles` instead of
  `@porsche-design-system/components-js/styles/scss`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))

#### Removed

- `Banner`: CSS variable `--p-banner-position-type`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))
- Styles: `gridSafeZone`, `gridSafeZoneBase`, `gridSafeZoneXXL` and `pds-grid-safe-zone-base`, `pds-grid-safe-zone-xxl`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))
- Styles: `gridWidth`, `gridWidthMin`, `gridWidthMax` and `pds-grid-width-min`, `pds-grid-width-max`
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))

#### 🤖 Property deprecations 🤖

##### Banner:

- Prop `width` has no effect anymore, instead the component is aligned with Porsche Grid "extended" by default.
  ([#2422](https://github.com/porsche-design-system/porsche-design-system/pull/2422))

#### 🤡 Component deprecations 🤡

##### Marque: ([#2418](https://github.com/porsche-design-system/porsche-design-system/pull/2418))

```diff
- <p-marque></p-marque>
+ <p-wordmark></p-wordmark>
```

##### Fieldset Wrapper: ([#2404](https://github.com/porsche-design-system/porsche-design-system/pull/2404))

```diff
- <p-fieldset-wrapper label="Some legend label">
+ <p-fieldset label="Some legend label">
  <p-text-field-wrapper label="Some label">
    <input type="text" name="some-name" />
  </p-text-field-wrapper>
- </p-fieldset-wrapper>
+ </p-fieldset>
```

### [3.0.0-alpha.3] - 2023-03-17

#### 🤖 Property deprecations 🤖

##### Accordion:

- Event `accordionChange` is deprecated, use `change` event instead.

```diff
- <PAccordion onAccordionChange={(e: CustomEvent<AccordionChangeEvent>) => {}} />
+ <PAccordion onChange={(e: CustomEvent<AccordionChangeEvent>) => {}} />
```

##### Banner:

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

##### Carousel:

- Prop `disablePagination` is deprecated, use `pagination` instead.
- Event `carouselChange` is deprecated, use `change` event instead.

```diff
- <p-carousel disable-pagination="true"></p-carousel>
+ <p-carousel pagination="false"></p-carousel>

- <PCarousel onCarouselChange={(e: CustomEvent<CarouselChangeEvent>) => {}} />
+ <PCarousel onChange={(e: CustomEvent<CarouselChangeEvent>) => {}} />
```

##### Divider:

- Prop `orientation` is deprecated, use `direction` instead.

```diff
- <p-divider orientation="horizontal"></p-divider>
+ <p-divider direction="horizontal"></p-divider>
```

##### Icon:

- Prop `colors`'s value `disabled` is removed, use `state-disabled` instead.

```diff
- <p-icon color="disabled"></p-icon>
+ <p-icon color="state-disabled"></p-icon>
```

##### Link Tile:

- Prop `weight`'s value `semibold` is deprecated, use `semi-bold` instead.

```diff
- <p-link-tile weight="semibold"></p-link-tile>
+ <p-link-tile weight="semi-bold"></p-link-tile>
```

##### Modal:

- Prop `disableCloseButton` is deprecated, use `dismissButton` instead.
- Event `close` is deprecated, use `dismiss` event instead.

```diff
- <p-modal disable-close-button="true"></p-modal>
+ <p-modal dismiss-button="false"></p-modal>

- <PModal onClose={(e: CustomEvent<void>) => {}} />
+ <PModal onDismiss={(e: CustomEvent<void>) => {}} />
```

##### Pagination:

- Props `allyLabelNext`, `allyLabelPage`, `allyLabelPrev` and `allyLabel` are deprecated.
- Event `pageChange` is deprecated, use `change` event instead.

```diff
- <p-pagination ally-label="Paginierung" ally-label-prev="Vorherige Seite" ally-label-next="Nächste Seite" ally-label-page="Seite"></p-pagination>
+ <p-pagination intl="{root: 'Paginierung', prev: 'Vorherige Seite', next: 'Nächste Seite', page: 'Seite'}"></p-pagination>

- <PPagination onPageChange={(e: CustomEvent<PageChangeEvent>) => {}} />
+ <PPagination onChange={(e: CustomEvent<PaginationChangeEvent>) => {}} />
```

##### Scroller:

- Prop `gradientColorScheme` is deprecated, use `gradientColor` instead.
- Prop `scrollIndicatorPosition` is deprecated, use `alignScrollIndicator` instead.

```diff
- <p-scroller gradient-color-scheme="surface"></p-scroller>
+ <p-scroller gradient-color="background-surface"></p-scroller>

- <p-scroller scroll-indicator-position="top"></p-scroller>
+ <p-scroller align-scroll-indicator="top"></p-scroller>
```

##### Segmented Control:

- Event `segmentedControlChange` is deprecated, use `change` event instead.

```diff
- <PSegmentedControl onSegmentedControlChange={(e: CustomEvent<SegmentedControlChangeEvent>) => {}} />
+ <PSegmentedControl onChange={(e: CustomEvent<SegmentedControlChangeEvent>) => {}} />
```

##### Stepper Horizontal:

- Event `stepChange` is deprecated, use `change` event instead.

```diff
- <PStepperHorizontal onStepChange={(e: CustomEvent<StepChangeEvent>) => {}} />
+ <PStepperHorizontal onChange={(e: CustomEvent<StepperHorizontalChangeEvent>) => {}} />
```

##### Switch:

- Event `switchChange` is deprecated, use `change` event instead.

```diff
- <PSwitch onSwitchChange={(e: CustomEvent<SwitchChangeEvent>) => {}} />
+ <PSwitch onChange={(e: CustomEvent<SwitchChangeEvent>) => {}} />
```

##### Table:

- Event `sortingChange` is deprecated, use `change` event instead.

```diff
- <PTable onSortingChange={(e: CustomEvent<SortingChangeEvent>) => {}} />
+ <PTable onChange={(e: CustomEvent<TableChangeEvent>) => {}} />
```

##### Tabs:

- Prop `gradientColorScheme` is deprecated, use `gradientColor` instead.
- Prop `weight`'s value `semibold` is deprecated, use `semi-bold` instead.
- Event `tabChange` is deprecated, use `change` event instead.

```diff
- <p-tabs gradient-color-scheme="surface"></p-tabs>
+ <p-tabs gradient-color="background-surface"></p-tabs>

- <p-tabs weight="semibold"></p-tabs>
+ <p-tabs weight="semi-bold"></p-tabs>

- <PTabs onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabs onChange={(e: CustomEvent<TabsChangeEvent>) => {}} />
```

##### Tabs Bar:

- Prop `gradientColorScheme` is deprecated, use `gradientColor` instead.
- Prop `weight`'s value `semibold` is deprecated, use `semi-bold` instead.
- Event `tabChange` is deprecated, use `change` event instead.

```diff
- <p-tabs-bar gradient-color-scheme="surface"></p-tabs-bar>
+ <p-tabs-bar gradient-color="background-surface"></p-tabs-bar>

- <p-tabs-bar weight="semibold"></p-tabs>
+ <p-tabs-bar weight="semi-bold"></p-tabs>

- <PTabsBar onTabChange={(e: CustomEvent<TabChangeEvent>) => {}} />
+ <PTabsBar onChange={(e: CustomEvent<TabsChangeEvent>) => {}} />
```

##### Tag:

- Prop `color`'s value `notification-warning`, `notification-success` and `notification-error` are deprecated, use
  `notification-warning-soft`, `notification-success-soft` and `notification-error-soft` instead.

```diff
- <p-tag color="notification-warning"></p-tag>
+ <p-tag color="notification-warning-soft"></p-tag>

- <p-tag color="notification-success"></p-tag>
+ <p-tag color="notification-success-soft"></p-tag>

- <p-tag color="notification-error"></p-tag>
+ <p-tag color="notification-error-soft"></p-tag>
```

##### Text Field Wrapper:

- Prop `showCharacterCount` is deprecated, use `showCounter` instead.

```diff
- <p-text-field-wrapper show-character-count="false">
+ <p-text-field-wrapper show-counter="false">
    <input type="text" maxlength="20" />
</p-text-field-wrapper>
```

##### Textarea Wrapper:

- Prop `showCharacterCount` is deprecated, use `showCounter` instead.

```diff
- <p-textarea-wrapper show-character-count="false">
+ <p-textarea-wrapper show-counter="false">
    <textarea maxlength="80"></textarea>
</p-textarea-wrapper>
```

##### Text List

- Props `listType` and `orderType` are deprecated, use `type` instead.

```diff
- <p-text-list list-type="unordered"></p-text-list>
+ <p-text-list type="unordered"></p-text-list>

- <p-text-list list-type="ordered" order-type="numbered"></p-text-list>
+ <p-text-list type="numbered"></p-text-list>

- <p-text-list list-type="ordered" order-type="alphabetically"></p-text-list>
+ <p-text-list type="alphabetically"></p-text-list>
```

#### Added

- `Text`, `Icon`, `Button Pure` and `Link Pure` support value `xx-small` for prop `size`
- `Display` supports value `small` for prop `size`
- Partials: `getInitialStyles` supports multi prefix, e.g.
  `getInitialStyles({ prefix: ['', 'some-prefix', 'another-prefix'] });`
- Styles: `displaySmallStyle` and `pds-display-small`
- Styles: `textXXSmallStyle` and `pds-text-xx-small`
- Styles: `fontSizeDisplaySmall` and `$pds-font-size-display-small`
- Styles: `fontSizeTextXXSmall` and `$pds-font-size-text-xx-small`
- Styles: `getHoverStyle` and `pds-hover`
- `Banner` has `heading` and `description` prop as well as `slot="heading"` and deprecated `slot="title"`
- Custom events have consistent names across components and deprecated old event names
  - `Accordion` emits `change` and deprecated `accordionChange` event
  - `Carousel` emits `change` and deprecated `carouselChange` event
  - `Modal` emits `dismiss` and deprecated `close` event
  - `Pagination` emits `change` and deprecated `pageChange` event
  - `Segmented Control` emits `change` and deprecated `segmentedControlChange` event
  - `Stepper Horizontal` emits `change` and deprecated `stepChange` event
  - `Switch` emits `change` and deprecated `switchChange` event
  - `Table` emits `change` and deprecated `sortingChange` event
  - `Tabs` emits `change` and deprecated `tabChange` event
  - `Tabs Bar` emits `change` and deprecated `tabChange` event
- Props have consistent names across components and deprecated old props
  - `Carousel` got `pagination` prop and deprecated `disablePagination` prop
  - `Divider` got `direction` prop and deprecated `orientation` prop
  - `Modal` got `dismissButton` prop and deprecated `disableCloseButton` prop
  - `Pagination` got `intl` prop and deprecated `allyLabelNext`, `allyLabelPage`, `allyLabelPrev` and `allyLabel` props
  - `Scroller` got `gradientColor` prop and deprecated `gradientColorScheme` prop
  - `Scroller` got `alignScrollIndicator` prop and deprecated `scrollIndicatorPosition` prop
  - `Tabs` got `gradientColor` prop and deprecated `gradientColorScheme` prop
  - `Tabs Bar` got `gradientColor` prop and deprecated `gradientColorScheme` prop
  - `Text Field Wrapper` got `showCounter` prop and deprecated `showCharacterCount` prop
  - `Textarea Wrapper` got `showCounter` prop and deprecated `showCharacterCount` prop
  - `Text List` got `type` prop and deprecated `listType` and `orderType` prop
- Props have consistent values across components and deprecated old values
  - `Icon` prop `color` got value `state-disabled` and removed `disabled` value
  - `Link Tile` prop `weight` got value `semi-bold` and deprecated `semibold` value
  - `Tabs Bar` and `Tabs` prop `weight` got value `semi-bold` and deprecated `semibold` value
  - `Tag` prop `color` got values `notification-info-soft`, `notification-warning-soft`, `notification-success-soft`,
    `notification-error-soft` and deprecated `notification-warning`, `notification-success`, `notification-error` values

#### Changed

- `Display` uses font-weight regular and font-style normal
- Partials: `getInitialStyles` matches new design language
- Partials: All component related, slotted Light DOM styles have been moved to `getInitialStyles`
- Styles: `getFocusStyle` and `pds-focus` doesn't need `theme` parameter anymore
- Styles: `breakpoint{Base|XS|S|M|L|XL|XXL}` and `$pds-breakpoint-{base|xs|s|m|l|xl|xxl}` are provided as number without
  unit (px)
- `Link Tile` matches new design language
- Typings for all component props start with the component name, e.g. `SwitchAlignLabel`, `TabsBarGradientColor` or
  `LinkPureIcon`
- `Icon` prop `color` value `disabled` is renamed to `state-disabled`
- `Tag` prop `color` value `notification-info` is renamed to `notification-info-soft`

#### Fixed

- `Text Field Wrapper` calendar and time indicator icons respect color definition in dark theme
- `Text Field Wrapper` has correct height when type date or time is used
- Partials: Typings of return value with and without options parameter
- `Modal` scrolling behavior on mouse drag

#### Removed

- `Heading`: value `xxx-large` for prop `size`
- Styles: `headingXXXLargeStyle` and `pds-heading-xxx-large`
- Styles: `fontSizeHeadingXXLarge` and `$pds-font-size-heading-xx-large`

### [3.0.0-alpha.2] - 2023-02-27

#### 🤖 Property deprecations 🤖

##### Carousel:

- Prop `wrap-content` is deprecated.

```diff
- <p-carousel wrap-content="true"></p-carousel>
+ <p-carousel></p-carousel>
```

##### Divider:

- Prop values `neutral-contrast-low | neutral-contrast-medium | neutral-contrast-high` of `color` prop are deprecated.

```diff
- <p-divider color="neutral-contrast-low"></p-divider>
+ <p-divider color="contrast-low"></p-divider>

- <p-divider color="neutral-contrast-medium"></p-divider>
+ <p-divider color="contrast-medium"></p-divider>

- <p-divider color="neutral-contrast-high"></p-divider>
+ <p-divider color="contrast-high"></p-divider>
```

#### Changed

- `Divider`, `Button Group`, `Carousel` and `Text List` match new design language
- Background color of `Scroller`'s `prev` and `next` buttons in dark theme
- Partials: Removed deprecated `withoutTags` option for all partials, please use `format: 'jsx'` instead
- `Content Wrapper` default value of prop `width` has changed from `basic` to `extended`

#### Added

- `Model Signature`
- Props `align-header` and `width` for `Carousel`
- Vue: plugin functions `createPorscheDesignSystem` and `usePorscheDesignSystemPlugin`

#### Fixed

- `Radio Button Wrapper` keyboard arrow navigation
- `Button Pure` and `Link Pure` lagging active state background when scrolling on iOS

### [3.0.0-alpha.1] - 2023-02-16

#### Added

- Porsche Next font supports Vietnamese charset
- Prop `color` of `Icon` supports `disabled`
- React: `patchRemixRunProcessBrowserGlobalIdentifier` binary to support SSR components with Remix

#### Changed

- `Stepper Horizontal` matches new design language
- Styles: Optimize design tokens "spacing", "typography" and "theme" provided by styles sub-package
  `@porsche-design-system/components-{js|angular|react|vue}/styles`
- Styles: Use calc() instead of max() to calculate padding for `gridStyle` (JS) and `pds-grid` (SCSS)
- Styles: `gridStyle` (JS) and `pds-grid` (SCSS) uses optimized grid gap

### [3.0.0-alpha.0] - 2023-02-08

#### Note to the new `v3` major release of the Porsche Design System

With the new **Porsche Design Language** comes a lot of changes regarding layout and design principles. To keep
refactoring efforts as low as possible when upgrading from `v2` to `v3`, **breaking changes** were avoided as far as
possible. Nevertheless, there are a few breaking changes and some more deprecations which should receive attention.

#### 👹 Breaking Changes 👹

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

#### 🤡 Component deprecations 🤡

All deprecated components are refactored to match the new design language, therefor it's technically not breaking, but
we highly recommend to migrate to the mentioned alternative, since those deprecated components will be removed with next
major version.

##### Content Wrapper:

- Component is deprecated and will be removed with the next major release. Please use **[Porsche Grid](styles/grid)**
  instead, which is based on [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid) covering the specific
  layout needs for a harmonic appearance across all digital Porsche touch-points.

##### Flex:

- Component is deprecated and will be removed with the next major release. In general, please use native
  [CSS Flex](https://css-tricks.com/snippets/css/a-guide-to-flexbox) instead for better performance and more
  standardized layout technique.

##### Grid:

- Component is deprecated and will be removed with the next major release. In general, please use native
  [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid) in combination with
  **[Porsche Grid](styles/grid)** instead for better performance and more standardized layout technique.

##### Headline:

```diff
- <p-headline>The quick brown fox jumps over the lazy dog</p-headline>
+ <p-heading>The quick brown fox jumps over the lazy dog</p-heading>
```

##### Link Social:

- Component is deprecated and will be removed with the next major release. Please use the **[Link](components/link)**
  component instead.

#### 🤖 Property deprecations 🤖

All deprecated properties are still present without any effect, therefor it's technically not breaking, but we highly
recommend to migrate and remove the deprecated props since those ones will be removed with next major version.

##### Button Pure:

- Prop `weight` is deprecated, only regular font weight will be applied.

```diff
- <p-button-pure weight="thin">Some label</p-button-pure>
- <p-button-pure weight="regular">Some label</p-button-pure>
- <p-button-pure weight="semibold">Some label</p-button-pure>
- <p-button-pure weight="bold">Some label</p-button-pure>
+ <p-button-pure>Some label</p-button-pure>
```

##### Content Wrapper (deprecated):

- Prop `theme` and `background-color` are deprecated.

```diff
- <p-content-wrapper theme="dark" background-color="default">Some content</p-content-wrapper>
+ <p-content-wrapper>Some content</p-content-wrapper>
```

##### Grid (deprecated):

- The `gutter` property is deprecated and has no effect anymore. Instead, a fluid gutter depending on the viewport width
  is used.

```diff
- <p-grid gutter="16">Some content</p-grid>
- <p-grid gutter="24">Some content</p-grid>
- <p-grid gutter="36">Some content</p-grid>
+ <p-grid>Some content</p-grid>
```

##### Icon:

- Prop `lazy` is deprecated.

```diff
- <p-icon lazy="true"></p-icon>
+ <p-icon></p-icon>
```

##### Link Pure:

- Prop `weight` is deprecated, only regular font weight will be applied.

```diff
- <p-link-pure href="#" weight="thin">Some label</p-link-pure>
- <p-link-pure href="#" weight="regular">Some label</p-link-pure>
- <p-link-pure href="#" weight="semibold">Some label</p-link-pure>
- <p-link-pure href="#" weight="bold">Some label</p-link-pure>
+ <p-link-pure href="#">Some label</p-link-pure>
```

##### Segmented Control:

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

#### 👾 Property value deprecations 👾

All deprecated values are mapped to new ones, therefor it's technically not breaking, but we highly recommend to migrate
to the new values since those ones will be removed with next major version.

##### Banner:

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

##### Content Wrapper:

- Prop value `fluid` of `width` prop is deprecated.

```diff
- <p-content-wrapper width="fluid">Some content</p-content-wrapper>
+ <p-content-wrapper>Some content</p-content-wrapper>
```

##### Icon:

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

##### Inline Notification:

- Prop value `neutral` of `state` prop is deprecated.

```diff
- <p-inline-notification state="neutral"></p-inline-notification>
+ <p-inline-notification state="info"></p-inline-notification>
```

##### Tag:

- Prop value `notification-neutral | neutral-contrast-high | background-default` of `color` prop is deprecated.

```diff
- <p-tag color="notification-neutral">Color label</p-tag>
+ <p-tag color="notification-info">Color label</p-tag>

- <p-tag color="neutral-contrast-high">Color label</p-tag>
+ <p-tag color="primary">Color label</p-tag>

- <p-tag color="background-default">Color label</p-tag>
+ <p-tag color="background-base">Color label</p-tag>
```

##### Tag Dismissible:

- Prop value `background-default` of `color` prop is deprecated.

```diff
- <p-tag-dismissible color="background-default">Color label</p-tag-dismissible>
+ <p-tag-dismissible color="background-base">Color label</p-tag-dismissible>
```

##### Text:

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

##### ToastManager:

- Prop value `neutral` of `state` parameter is deprecated.

```diff
- …addMessage({ text: `Some message`, state: 'neutral' })
+ …addMessage({ text: `Some message`, state: 'info' })
```

#### Added

- `Display` component
- `Heading` component
- Prop `underline` for `Link Pure`
- Prop `theme` for `Checkbox Wrapper`, `Radio Button Wrapper`, `Popover`, `Tag Dismissible`, `Textarea Wrapper`,
  `Text Field Wrapper` and `Fieldset Wrapper`
- Prop `size` for `Icon` supports `x-small` and `x-large`
- Prop `size` for `Accordion` `compact="true"` supports `medium`

#### Changed

- `Spinner`, `Icon`, `Link Pure`, `Button Pure`, `Link`, `Link Social`, `Button`, `Checkbox Wrapper`,
  `Radio Button Wrapper`, `Popover`, `Modal`, `Select Wrapper`, `Tag`, `Tag Dismissible`, `Textarea Wrapper`,
  `Inline Notification`, `Banner`, `Toast`, `Grid`, `Flex`, `Pagination`, `Scroller`, `Accordion`, `Text`,
  `Text Field Wrapper`, `Content Wrapper`, `Segmented Control`, `Tabs`, `Tabs Bar`, `Headline` and `Fieldset Wrapper`
  match new design language
- `Icon` supports
  `primary | contrast-low | contrast-medium | contrast-high | notification-success | notification-warning | notification-error | notification-info | inherit`
  for `color` prop
- Default value of prop `width` of `Banner` has changed from `basic` to `extended`
- Default value of prop `action-icon` of `Inline Notification` has changed from `arrow-head-right` to `arrow-right`
- Default value of prop `name` of `Icon` has changed from `arrow-head-right` to `arrow-right`
- Default value of prop `variant` of `Link` and `Button` has changed from `secondary` to `primary`

#### Removed

- Custom slotted CSS for mostly all components. Equivalent styles are now provided by `getInitialStyles()` partial
  instead.
- `applyNormalizeStyles` option from `getInitialStyles()` partial which is applied by default now.

### [2.20.0] - 2023-02-06

### [2.20.0-rc.1] - 2023-02-06

### [2.20.0-rc.0] - 2023-01-30

#### Added

- `applyNormalizeStyles` option for `getInitialStyles()` partial which includes basic css styles for Light DOM

### [2.19.1-rc.1] - 2023-01-18

#### Added

- `jsdom-polyfill` subpackage is available at `@porsche-design-system/components-{js|angular|react|vue}/jsdom-polyfill`
  and can be used to have working web components in jsdom based tests (e.g. jest)
- `testing` subpackage is available at `@porsche-design-system/components-{js|angular|react|vue}/testing` to provide
  `getByRoleShadowed`, `getByLabelTextShadowed` and `getByTextShadowed` utilities which use `@testing-library/dom`
  queries internally to support Shadow DOM
- Validation if `prefix` is already reserved by a different version upon initialization of the Porsche Design System

#### Fixed

- `componentsReady()` waits for Porsche Design System being initialized before checking components which can happen in
  certain test scenarios without partials

### [2.19.1-rc.0] - 2023-01-18

#### Fixed

- Bug in `@porsche-design-system/components-react/ssr` where in some cases during SSG an error was thrown when
  components render their children conditionally

### [2.19.0] - 2022-12-22

### [2.19.0-rc.2] - 2022-12-22

### [2.19.0-rc.1] - 2022-12-22

#### Fixed

- `Stepper Horizontal` calculation of scroll position when used within any parent that has a margin or padding

### [2.19.0-rc.0] - 2022-12-21

#### Added

- Vue: typed components are available via the `@porsche-design-system/components-vue` package

#### Fixed

- `Modal` focus cycle when pressing Shift Tab right after it was opened

### [2.18.0] - 2022-12-15

### [2.18.0-rc.2] - 2022-12-14

#### Added

- Validation to ensure crucial partials are used.  
  **Disclaimer:** The Porsche Design System will **not** inject its initial styles anymore. Please use the
  `getInitialStyles()` partial to reduce flash of unstyled content (FOUC) as described here:
  [getInitialStyles() documentation](https://designsystem.porsche.com/latest/partials/initial-styles)

#### Changed

- `line-height` calculation for all components is handled CSS only now by using `ex`-unit in combination with `calc()`
  which gives the best performance, the easiest possible integration and respects UI best practices in having **larger**
  `line-height` values for **small** `font-size` definitions and **smaller** `line-height` values for **larger**
  `font-size` definitions. The calculated values by CSS slightly differ compared to the ones calculated by JavaScript,
  which might result in minor visual changes.

#### Fixed

- Screen reader announcements of `Textfield` and `Textarea` in `counter` mode
- Screen reader announcements in `Select Wrapper`

### [2.18.0-rc.1] - 2022-11-24

#### Added

- `Carousel` now has a `rewind` property, better prev/next icons, a `max-width` for `heading` and `description` and
  support for slotted `description`

#### Fixed

- `Select Wrapper` height if text is zoomed up to 200%

### [2.18.0-rc.0] - 2022-11-17

#### Added

- SSR/SSG ready components using Declarative Shadow DOM for Next JS are shipped via
  `@porsche-design-system/components-react/ssr`. To use it simply change your imports.

**Important:** make sure to apply the new `getDSRPonyfill()` partial right before your closing `</body>` tag. More
information can be found here:
[getDSRPonyfill() documentation](https://designsystem.porsche.com/latest/partials/dsr-ponyfill)

```diff
- import { PorscheDesignSystemProvider, PButton, ... } from '@porsche-design-system/components-react';
+ import { PorscheDesignSystemProvider, PButton, ... } from '@porsche-design-system/components-react/ssr';
+ import { getDSRPonyfill } from '@porsche-design-system/components-react/partials';
```

#### Changed

- Improve height calculation for `Accordion`
- Slotted anchor support for `Link Pure` is stricter (In case slotted `<a>` is used it must be a direct child of
  `Link Pure`)
- `getFontLinks()` partial now has `{ weights: ['regular', 'semi-bold'] }` for a default

### [2.17.0] - 2022-10-31

### [2.17.0-rc.0] - 2022-10-31

#### Added

- `Link Tile`

#### Fixed

- `Scroller` bug where scrollable content was not fully hidden by the gradient, when zoomed into the page.

#### Changed

- Removed `!important` keyword from css property `display` of `Link Pure` and `Button Pure`

### [2.16.3] - 2022-10-21

### [2.16.3-rc.0] - 2022-10-21

#### Fixed

- `Button Pure` and `Link Pure` error when using `size="inherit"` and `icon="none"`

#### Changed

- Replaced all internal usage of `Text` and `Headline` components

### [2.16.2] - 2022-09-15

### [2.16.2-rc.0] - 2022-09-15

#### Fixed

- Issue with `Popover` where drop-shadow is not shown correctly in Chrome >= 105
- Issue with `Carousel` and `wrap-content="true"` where the layout was out of sync with `Content Wrapper` for
  viewports >= 1760px.
- `Select Wrapper` with custom dropdown keeps attribute changes of native select options in sync if changed
  programmatically

### [2.16.1] - 2022-09-09

#### Fixed

- Issue with `Options` typing import for `Carousel`

### [2.16.0] - 2022-09-08

### [2.15.1-rc.1] - 2022-09-08

#### Added

- `Carousel`
- `Scroller`

#### Changed

- `Stepper Horizontal` now has `size` property
- `Stepper Horizontal` uses improved focus behavior in case it becomes scrollable and scroll indicators are centered
  correctly.
- `Tabs Bar` uses improved focus behavior in case it becomes scrollable and scroll indicators are centered correctly.

### [2.15.1-rc.0] - 2022-08-24

#### Fixed

- `Radio Button Wrapper` visual selection change bug in Safari >= 15.5

### [2.15.0] - 2022-08-22

### [2.15.0-rc.1] - 2022-08-18

#### Changed

- Downgraded `@angular` to `v13` to ensure backwards compatibility of `@porsche-design-system/components-angular`

### [2.15.0-rc.0] - 2022-08-16

#### Fixed

- `Popover` visual shadow bug in Safari
- `Stepper Horizontal Item` bug where pseudo styles of the counter element were overridable

### [2.15.0-beta.0] - 2022-08-05

#### Fixed

- `Tabs` & `Tabs Bar` `size` property when using `BreakpointCustomizable`

#### Changed

- `Modal` uses poly fluid sizing for outer spacing
- `Banner` uses poly fluid sizing for outer spacing
- `Content Wrapper` uses poly fluid sizing for inner spacing
- `Modal` min-width is slightly updated to perfectly fit into content area of `Content Wrapper` at 320px viewport width

#### Added

- Validation of properties for all components
- `Text Field Wrapper` with `input type="search"` is clearable via Escape key and custom clear button across browsers
- `Text Field Wrapper` with `input type="search"` shows a "Locate me" button when `actionIcon="locate"` is set, emits
  the `action` event on click and can be put into a loading state via `actionLoading="true"`

### [2.14.0] - 2022-07-11

### [2.14.0-rc.1] - 2022-07-11

### [2.14.0-rc.0] - 2022-07-11

#### Added

- `getBrowserSupportFallbackScript()` partial supporting `cdn` and `format` options as replacement for
  `includeOverlay()` of `@porsche-design-system/browser-notification` npm package
- `getCookiesFallbackScript()` partial supporting `cdn` and `format` options as replacement for `includeCookieOverlay()`
  of `@porsche-design-system/browser-notification` npm package

#### Changed

- `getMetaTagsAndIconLinks()` partial to return `theme-color` meta tags with `prefers-color-scheme: {light|dark}` media
  query

### [2.13.0] - 2022-06-23

### [2.13.0-rc.5] - 2022-06-23

#### Fixed

- `Stepper Horizontal Item` `state` validation
- `Button` and `Link` with `theme="dark" variant="tertiary"` and `Tag Dismissible` bug on Safari < v15.5 where wrong
  colors on hover were shown

### [2.13.0-rc.4] - 2022-06-22

#### Added

- `Stepper Horizontal`

### [2.13.0-rc.3] - 2022-06-22

#### Added

- `Segmented Control`

### [2.13.0-rc.2] - 2022-06-21

### [2.13.0-rc.1] - 2022-06-21

### [2.13.0-rc.0] - 2022-06-21

#### Changed

- `Button`, `Button Pure` and `Switch` apply `aria-disabled="true"` instead of `disabled` attribute to native button
  internally in case `disabled` and/or `loading` property is set

### [2.12.1] - 2022-05-25

### [2.12.1-rc.0] - 2022-05-25

#### Fixed

- Issue with `JssStyle` typing import

### [2.12.0] - 2022-05-19

#### Changed

- npm package is prepared for public release on [npmjs.org](https://npmjs.com)

### [2.12.0-rc.2] - 2022-05-12

### [2.12.0-rc.1] - 2022-05-11

### [2.12.0-rc.0] - 2022-05-04

#### Added

- `Table Head Cell` now has a `multiline` property

#### Changed

- `Headline` has no `hypens` / `overflow-wrap` style by default
- Partials now throw an exception if they are executed in browser

#### Fixed

- Exception in `Headline`, `Select Wrapper`, `Text` and `Text List` when changing `theme` prop from `dark` to `light`
- `getInitialStyles()` partial now returns `.hydrated` styles, too

### [2.11.0-skeletons] - 2022-04-21

### [2.11.0] - 2022-04-21

### [2.11.0-rc.0] - 2022-04-20

#### Added

- `Tag`
- `Tag Dismissible`

### [2.10.0-skeletons] - 2022-04-13

### [2.10.0] - 2022-04-13

### [2.9.3-rc.1] - 2022-04-06

#### Added

- `Text Field Wrapper` now has a `showCharacterCount` property which can be used to hide the character count when a
  `maxLength` attribute is set on the wrapped `input`.
- `Textarea Wrapper` now has a `showCharacterCount` property which can be used to hide the character count when a
  `maxLength` attribute is set on the wrapped `textarea`.

### [2.9.3-rc.0-skeletons] - 2022-03-29

### [2.9.3-rc.0] - 2022-03-28

#### Added

- `Text Field Wrapper` supports `unit` property on `input type="text"`
- `Marque` optional configurable clickable/focusable area by defining padding on host element

#### Fixed

- `Tabs Item` improved accessibility
- Angular: circular dependency in development mode in `2.9.2-skeletons`

### [2.9.2-skeletons] - 2022-03-24

#### Added

- **[EXPERIMENTAL]** `getInitialStyles` partial now accepts a `skeletonTagNames` array of component names that will
  initially have skeleton styles while the Porsche Design System is loading
- **[EXPERIMENTAL]** `Button`, `Button Pure`, `Checkbox Wrapper`, `Fieldset Wrapper`, `Link`, `Link Pure`,
  `Link Social`, `Radio Button Wrapper`, `Select Wrapper`, `Text Field Wrapper`, `Textarea Wrapper` can now have initial
  skeleton styles when passed as `skeletonTagNames` to the `getInitialStyles` partial

### [2.9.2] - 2022-03-24

### [2.9.2-rc.1] - 2022-03-23

#### Fixed

- Bug caused by Chrome where hover styles of `Link Pure` are not displayed correctly

### [2.9.2-rc.0] - 2022-03-22

#### Added

- Normalized font behavior (`hyphen`, `overflow-wrap` and `text-size-adjust`) across components

#### Fixed

- `Modal` scrolling and pinch to zoom on iOS
- `Modal` initial position if scrollable
- `Table Head Cell` sort icon `asc` + `desc`

### [2.9.1] - 2022-03-10

### [2.9.1-rc.0] - 2022-03-09

#### Added

- Styles for slotted `<button>` in `Text`

#### Changed

- `Modal` heading and aria validation happens only when open

#### Fixed

- React: bundling format of partials

### [2.9.0] - 2022-02-28

### [2.9.0-rc.1] - 2022-02-25

#### Fixed

- `Modal` focus trap respecting elements in shadow DOM and dynamically added/removed elements on first level
- `Tabs Item` focus outline on click in Safari
- Error while using partials in Vanilla JS and Angular

### [2.9.0-rc.0] - 2022-02-16

#### Added

- `getFontFaceStylesheet` returns additional `<link>` tags with `rel="preconnect"` and `rel="dns-prefetch"`
- Option `format` to partials `getFontFaceStylesheet`, `getComponentChunkLinks()`, `getFontLinks()`, `getIconLinks()`,
  `getInitialStyles()`, `getLoaderScript()` and `getMetaTagsAndIconLinks()`

#### Deprecated

- The option `withoutTags` of partials `getFontFaceStylesheet`, `getComponentChunkLinks()`, `getFontLinks()`,
  `getIconLinks()`, `getInitialStyles()`, `getLoaderScript()` and `getMetaTagsAndIconLinks()` is deprecated and will be
  removed in `v3.0.0`. Please use `format: 'jsx'` instead.

```diff
- <link rel="stylesheet" href={getFontFaceStylesheet({ withoutTags: true })} crossOrigin="true" />
+ {getFontFaceStylesheet({ format: 'jsx' })}
```

### [2.9.0-beta.1] - 2022-01-27

#### Added

- `:focus-visible` content of selected Tab in `Tabs` component gets focus styling
- Improved accessibility of `Text Field Wrapper` and `Textarea Wrapper` when `maxlength` attribute is set
- `Modal` aria property
- `Modal` class for slotted elements to make content full-width

#### Changed

- `Button Pure` and `Link Pure` removed `position: relative` imposition, make sure to **not** override it with
  `position: static`

#### Fixed

- `Modal` close button styles when no heading is passed

### [2.9.0-beta.0] - 2022-01-18

#### Added

- React: `getByRoleShadowed`, `getByLabelTextShadowed` and `getByTextShadowed` utilities which uses
  `@testing-library/dom` queries internally to support Shadow DOM

#### Fixed

- React: `UnhandledPromiseRejectionWarning` when using `skipPorscheDesignSystemCDNRequestsDuringTests()`

### [2.8.0] - 2022-01-17

#### Fixed

- Accessibility issue of `Icon` component in Windows High Contrast Mode in Chromium Browser

### [2.8.0-rc.0] - 2022-01-14

#### Added

- Support for `tabindex` attribute on `Button`, `Button Pure`, `Switch`, `Link`, `Link Pure` and `Link Social`

#### Changed

- `:focus-visible` style matches outline color of `Button` while hovered

#### Deprecated

- The `tabbable` property of `Button`, `Button Pure` and `Switch` is deprecated and will be removed in `v3.0.0`. Please
  use `tabindex` instead.

```diff
- <p-button tabbable="false">Some button</p-button>
+ <p-button tabindex="-1">Some button</p-button>
```

### [2.8.0-beta.3] - 2021-12-22

#### Added

**Disclaimer:** The provided themes `light-electric` and `dark-electric` are just a proof of concept, it's **not**
accessible regarding its color contrast and might even be removed in an upcoming major release again.

- `light-electric` theme for `Switch`
- `dark-electric` theme for `Button Pure` and `Link Pure`
- Character counter to `Text Field Wrapper` and `Textarea Wrapper` if `maxlength` is present on `input type="text"` and
  `textarea`

#### Changed

- `:focus-visible` style matches outline color of `Switch` while hovered

#### Fixed

- Box model of `Button Pure`

### [2.8.0-beta.2] - 2021-12-22

#### Fixed

- `Content Wrapper` regression for `!important` style

#### Added

- Usage validation for `Link`, `Link Pure` and `Link Social`

### [2.8.0-beta.1] - 2021-12-16

#### Fixed

- `Select Wrapper` validation of select element

### [2.8.0-beta.0] - 2021-12-15

#### Changed

- Angular: increased peer dependency to `>=12.0.0 <14.0.0`

### [2.7.0] - 2021-12-14

### [2.7.0-rc.0] - 2021-12-14

#### Removed

- `offset-bottom` prop of `Toast` (use `--p-toast-position-bottom` CSS variable instead)

### [2.7.0-beta.6] - 2021-12-08

#### Added

- `Popover`

### [2.7.0-beta.5] - 2021-12-07

#### Added

**Disclaimer:** The provided theme `light-electric` is just a proof of concept, it's **not** accessible regarding its
color contrast and might even be removed in an upcoming major release again.

- `light-electric` theme for `Accordion`, `Link`, `Link Pure`, `Button`, `Button Pure`, `Tabs`, `Tabs Bar`

### [2.7.0-beta.4] - 2021-12-02

### [2.7.0-beta.3] - 2021-11-30

#### Added

- `Accordion` uses `MutationObserver` fallback when no `ResizeObserver` is available in older browsers

#### Fixed

- `Link` and `Link Social` not adapting slotted anchor to the width of the element

### [2.7.0-beta.2] - 2021-11-24

#### Added

- `Toast`

#### Fixed

- `Banner` animations respect offset correctly

### [2.7.0-beta.1] - 2021-11-16

#### Fixed

- `Headline` applies `align` and `ellipsis` prop correctly

### [2.7.0-beta.0] - 2021-11-11

#### Added

- New `aria` property for `ARIA` attribute handling for: `Button`, `Button Pure`, `Icon`, `Link`, `Link Pure`, `Marque`,
  `Spinner`

#### Fixed

- React: warnings about `useLayoutEffect` in SSR context

### [2.6.1] - 2021-11-05

#### Fixed

- Prevent breaking entire Porsche Design System due to lacking support of `ResizeObserver`, however `Accordion` still
  requires it

### [2.6.0] - 2021-11-04

#### Added

- `unit` and `unitPosition` properties to `Text Field Wrapper`

### [2.6.0-beta.0] - 2021-10-29

#### Changed

- Use `Heiti SC` (pre-installed on iOS/macOS) and `SimHei` (pre-installed on Windows) as Chinese fallback font

#### Added

- `Marque` uses `webp` images for browsers that support it
- `Inline Notification`
- `Icon` now supports `success` for `name` property

#### Fixed

- Colors of `Banner` for dark theme
- Replaced CSS `inset` property with `top`, `left`, `right` and `bottom` for browser compatibility
- Opening and closing transition of `Modal`

### [2.5.1-beta.0] - 2021-10-11

#### Fixed

- Possible exceptions when components get unmounted directly

### [2.5.0] - 2021-10-04

#### Added

- `SimHei` and `黑体` as fallback for all components' `font-family`

### [2.5.0-beta.1] - 2021-09-28

#### Changed

- React: improved render behavior of components

### [2.5.0-beta.0] - 2021-09-22

#### Added

- React: utility function `skipPorscheDesignSystemCDNRequestsDuringTests`

### [2.4.0] - 2021-09-21

### [2.4.0-beta.2] - 2021-09-21

#### Added

- `Link Social` and `Icon` now support `kakaotalk`, `naver`, `reddit` and `tiktok`
- JSS caching mechanism to improve style performance

#### Changed

- Alignment of `linkedin` icon
- Improved accessibility of `Select Wrapper`
- `Icon` loading behaviour to non-blocking, components using the `Icon` will no longer wait for it to load
- Validation messages of `Fieldset Wrapper` have now an additional icon representing the validation state

#### Fixed

- Box model of `Link Pure`
- Focus of `Link Pure` with slotted anchor and hidden label
- Focus cycling of `Modal` without focusable children
- Suppress CORS error

### [2.4.0-beta.1] - 2021-08-26

#### Added

- `active` property to `Button Pure`

### [2.4.0-beta.0] - 2021-08-26

#### Added

- `icon` property of `Button Pure` and `Link Pure` was extended by `none` value
- `alignLabel` and `stretch` property to `Button Pure` and `Link Pure`

#### Changed

- Improved `:focus-visible` and `:hover:focus-visible` colors for `Link Social` and `Link`
- Improved slotted `<a>` coloring in dark theme for `Link Social` and `Link`
- Validation messages of `Checkbox Wrapper`, `Radio Button Wrapper`, `Select Wrapper`, `Textarea Wrapper` and
  `Text Field Wrapper` have now an additional icon representing the validation state
- `Modal` backdrop behavior to close modal on mouse-down

#### Fixed

- Slotted `<a>` coloring in dark theme for `Text`, `Headline`, `Text List`, `Banner`, `Select Wrapper` and `Link Pure`
- Wrong background color of scrollable `Modal`'s backdrop in Safari

### [2.3.0] - 2021-07-28

### [2.3.0-beta.3] - 2021-07-28

#### Changed

- `Accordion` reduce paddings, vertically align carets to the first heading row, adjust border color and hover styles

#### Fixed

- `Text Field Wrapper` accessibility of type password and search

### [2.3.0-beta.2] - 2021-07-15

#### Added

- `Checkbox Wrapper`, `Radio Button Wrapper`, `Select Wrapper`, `Textarea Wrapper` and `Text Field Wrapper` now reflect
  changes of the `required` attribute on their child component
- `multiline` property to `Table Cell`
- Partial function `getLoaderScript()` to initialize Porsche Design System as early as possible

#### Fixed

- `Table Head Cell` uses semi bold instead of bold as font weight
- Transition of `Modal`

### [2.3.0-beta.1] - 2021-07-08

#### Added

- `Accordion`

#### Changed

- Removed initial delay of `Banner`

### [2.3.0-beta.0] - 2021-07-01

#### Added

- `Table`
- Angular: export types from package root
- Accessibility icon

#### Changed

- `Button`, `Button Pure` and `Switch` are now focusable while in `loading` state
- `Text` and `Headline` inherits white-space CSS property
- React: sync component props via property instead of attribute

#### Fixed

- Angular: support `"strictTemplates": true` option in `tsconfig.json`
- Use correct icon for `arrow-last` and `arrow-first` in `Icon`, `Button` and `Link` components

### [2.2.1] - 2021-06-08

#### Changed

- Optimize vertical alignment of `Modal`

#### Fixed

- URL in inject global style warning

### [2.2.1-beta.1] - 2021-06-02

#### Fixed

- Margin of `Tabs Bar` within `Tabs` for Firefox and Safari
- SVG of `Icon` is not removed after prop change, e.g. on color change
- Fullscreen behavior of `Modal` on screens larger than 1760px

### [2.2.0] - 2021-05-19

#### Fixed

- `Text` inside `Button` now has the proper size on iOS Safari when changing to and from landscape mode
- `Banner` can now be re-opened after closing
- Closing one `Banner` will not close other `Banners` on the site

### [2.2.0-beta.2] - 2021-05-12

#### Fixed

- `Select Wrapper` value changes are now reflected correctly
- `Select Wrapper` dark theme background color if used with `filter` prop

### [2.2.0-beta.1] - 2021-05-05

#### Added

- Partial function `getIconLinks()` to preload Porsche Design System Icons

#### Fixed

- `Text Field Wrapper` spacing in Safari

### [2.2.0-beta.0] - 2021-05-05

#### Added

- Partial function `getMetaTagsAndIconLinks()` to simplify cross device fav and meta icons

### [2.1.0] - 2021-05-03

### [2.1.0-beta.0] - 2021-05-03

#### Added

- `Switch`

#### Changed

- `Text` automatically breaks words/strings into new line being too long to fit inside their container
- `Headline` automatically breaks words/strings into new line being too long to fit inside their container
- Extended `Fieldset Wrapper` with `labelSize`, `required`, `state` and `message` properties. If the `Fieldset Wrapper`
  is set to required only the label of the **Fieldset Wrapper** gets an asterisk. It is removed from all wrapped child
  components, as long as they are Porsche Design System form elements.

### [2.0.3] - 2021-04-28

### [2.0.3-beta] - 2021-04-28

#### Fixed

- Angular: events firing twice in `Pagination`, `Modal`, `Tabs`, `Tabs Bar` and `Banner` component

### [2.0.2] - 2021-04-21

### [2.0.2-beta.0] - 2021-04-20

#### Fixed

- TypeScript build errors due to duplicate declarations in `types.d.ts`

### [2.0.1] - 2021-04-16

#### Fixed

- Visual appearance of `Checkbox Wrapper` in iOS Safari
- A bug where `Text Field Wrapper` would throw an error when reattaching to DOM too quickly
- Visual bug in Firefox when zooming out `Text Field Wrapper`, `Checkbox Wrapper` and `Textarea Wrapper`
- Angular: streamline component styles in dark theme

#### Changed

- Aligned focus states of `Checkbox Wrapper` and `Radio Button Wrapper` across browsers

### [2.0.0] - 2021-04-13

In keeping with [Semver](https://semver.org/), Porsche Design System v2.0.0 was released due to changes in the API,
fundamental changes in loading behavior and others. With our new major version `v2.0.0` there are some important changes
that you should watch out for. To make the migration from `v1.5.x` to our current `v2.0.0` easier, we offer a few
guidelines.

## General changes / improvements:

#### All components, icons, fonts, styles and marque of the Porsche Design System are loaded versioned and chunked from a central CDN

This way all web based digital Porsche products share and use the cached and versioned assets regardless of the JS
framework used to improve loading performance across the Porsche group. Only a tiny (1.4kb sized) Porsche Design System
loader script gets bundled into your application code. Everything else gets loaded versioned, cached and chunked from a
central CDN ([read more](https://designsystem.porsche.com/latest/performance/cdn)). However, this also means that you
will need an **Internet connection** to render the components in a browser (possibly relevant for development stage or
intranet applications).

#### Enabling Micro Frontend Architecture

In case of a micro-frontend architecture, multiple instances and versions of the Porsche Design System can be combined
in a final application by configurable prefixing technique of the Porsche Design System components during runtime.
Please refer to our framework specific guidelines
[Vanilla JS](https://designsystem.porsche.com/latest/start-coding/vanilla-js),
[Angular](https://designsystem.porsche.com/latest/start-coding/angular) and
[React](https://designsystem.porsche.com/latest/start-coding/react).

#### Prevent Flash of Unstyled Content (FOUC) and Flash of Unstyled Text (FOUT)

To prevent FOUC/FOUT, the Porsche Design System offers various partials as part of the
`@porsche-design-system/components-{js|angular|react}` package to ensure all necessary Porsche Design System fonts and
components are fully loaded. If you've used the `@porsche-design-system/partials` package previously, stop using it and
replace the integration with the partials provided by `@porsche-design-system/components-{js|angular|react}` package.
Have a look at our [FOUC/FOUT guidelines](https://designsystem.porsche.com/latest/performance/loading-behaviour).

```diff
- <%= require('@porsche-design-system/partials').getPorscheDesignSystemCoreStyles() %>
+ <%= require('@porsche-design-system/components-{js|angular|react}/partials').getInitialStyles() %>

- <%= require('@porsche-design-system/partials').getFontFaceCSS() %>
+ <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontFaceStylesheet() %>

- <link rel="preload" href="path/to/webfont/nameOfWebFontFile" as="font" type="font/woff2" crossorigin />
+ <%= require('@porsche-design-system/components-{js|angular|react}/partials').getFontLinks({ weights: ['regular', 'semi-bold'] }) %>
```

#### Added support for China CDN

Our CDN is configured to forward requests to Chinese CDN automatically when necessary. So you're good to go without any
configuration or multiple region specific builds of your application. However, if you are aiming for the maximum
possible performance in China, you can configure which CDN the Porsche Design System must use. Please follow our
[CDN guidelines](https://designsystem.porsche.com/latest/performance/cdn) for more information.

#### New/optimized components

- **Tabs**
- **Tabs Bar**
- **Banner**
- **Modal**
- Headline
- Select
- Pagination
- Button
- Button Pure
- Link
- Link Pure
- Spinner
- Checkbox
- Radio Button

#### Improved TypeScript support for Angular and React

To ensure the best possible typing support, we have refactored our Angular and React wrappers which integrate the native
web components of the Porsche Design System.

#### componentsReady() works reliable

Because the Porsche Design System components get loaded async at the time they are needed, it might be relevant within
your application or test automation to know when those have been initialized. Therefore, we provide in all three
`@porsche-design-system/components-{js|angular|react}')` packages a reliable helper function `componentsReady()`.
[Read more about it](https://designsystem.porsche.com/latest/helpers/components-ready).

#### Removed "blur on focus"

Now focus styling is only applied when you navigate through keyboard and ignored by mouse interaction for browsers
supporting `:focus-visible` otherwise it will fallback to `:focus` CSS implementation.

#### Changed focus styling for a better compromise between accessibility and visual appearance

Color and outline of general focus styling has changed to `currentColor` for light/dark theme with an outline of 1px
width/offset. If you have custom components build with the usage of our `@porsche-design-system/utilities` package then
update it to the latest version.

#### Improved geometry of Porsche Next font

For better alignment and readability we've changed the geometry of the Porsche Next font which results in a visual
change of font size and spacing.

#### Dropped support for IE11 and EdgeHTML according to Porsche's official browser strategy 2021

If you still need to support these browsers, you have to stick to `v1.5.x`. We offer a Browser Notification package
`@porsche-design-system/browser-notification` to alert users that these browsers are no longer supported. It supports a
blocking layer (to be used with Porsche Design System `v2.x`), or a dismissible banner (to be used with Porsche Design
System `v1.x`). Please refer to our
[Browser compatibility guidelines](https://designsystem.porsche.com/latest/help/browser-compatibility).

#### Changed default type of Button and Button Pure

To be in sync with native `<button>` behavior we've changed the default `type` of **Button** and **Button Pure**
component. Those components will render a button within their Shadow DOM as `<button type="submit">` ( previously
`<button type="button">`).

- `submit`: The button submits the form data to the server. This is the default if the attribute is not specified for
  buttons associated with a `<form>`, or if the attribute is an empty or invalid value.
- `button`: The button has no default behavior, and does nothing when pressed by default. It can have client-side
  scripts listen to the element's events, which are triggered when the events occur.

#### Changed support for wrapped links around Link, Link Pure and Link Social component

Due to the support for setting links (`<a href="#">`) in our **Link**, **Link Pure** and **Link Social** components as
child, we've removed support for styling the anchor tag (`<a>`) when it surrounds the component. So we recommend
changing the position of the `<a>` tag from wrapping the component to a direct slot (child) of it.

```diff
- <a href="#"><p-link>Some label</p-link></a>
+ <p-link><a href="#">Some label</a></p-link>

- <a href="#"><p-link-pure>Some label</p-link-pure></a>
+ <p-link-pure><a href="#">Some label</a></p-link-pure>

- <a href="#"><p-link-social>Some label</p-link-social></a>
+ <p-link-social><a href="#">Some label</a></p-link-social>
```

#### Automatic \* asterisk symbol to form field labels

We added an automatic generated _ asterisk symbol to form field labels which have the required attribute. This might
lead to a doubled _ symbol if you set one by yourself.

```diff
- <p-text-field-wrapper label="Some label *"><input type="text" name="some-name" required /></p-text-field-wrapper>
+ <p-text-field-wrapper label="Some label"><input type="text" name="some-name" required /></p-text-field-wrapper>

- <p-checkbox-wrapper label="Some label *"><input type="checkbox" name="some-name" required /></p-checkbox-wrapper>
+ <p-checkbox-wrapper label="Some label"><input type="checkbox" name="some-name" required /></p-checkbox-wrapper>

- <p-radio-button-wrapper label="Some label *"><input type="radio" name="some-name" required /></p-radio-button-wrapper>
+ <p-radio-button-wrapper label="Some label"><input type="radio" name="some-name" required /></p-radio-button-wrapper>

- <p-radio-button-wrapper label="Some label *"><input type="radio" name="some-name" required /></p-radio-button-wrapper>
+ <p-radio-button-wrapper label="Some label"><input type="radio" name="some-name" required /></p-radio-button-wrapper>

- <p-textarea-wrapper label="Some label *"><textarea name="some-name" required></textarea></p-textarea-wrapper>
+ <p-textarea-wrapper label="Some label"><textarea name="some-name" required></textarea></p-textarea-wrapper>

- <p-select-wrapper label="Some label *"><select name="some-name" required><option>A</option></select></p-select-wrapper>
+ <p-select-wrapper label="Some label"><select name="some-name" required><option>A</option></select></p-select-wrapper>
```

#### Shadow DOM

`Flex`, `Flex Item`, `Grid` and `Grid Item` now use Shadow DOM, thus you are not able to overwrite styles defined by
these components any longer.

---

## Angular

#### Integration of Angular components

In the past it was possible to provide a token called `PREVENT_WEB_COMPONENTS_REGISTRATION` which prevented the
registration of the Porsche Design System components and loading of polyfills. Due to the fact that we no longer provide
/ need poly filling, we have completely removed the token. For advanced usage please
[read further](https://designsystem.porsche.com/latest/start-coding/angular).

---

## React

#### Integration of React components

In the past `@porsche-design-system/components-react` components have initialized the **Porsche Design System Loader**
automatically as soon as a component was imported. With `v2.x` you have to import the `PorscheDesignSystemProvider` once
in your `index.tsx` which then initializes the **Porsche Design System Loader**, e.g. like:

```diff
  // index.tsx

  import ReactDOM from 'react-dom';
  import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
  import { App } from './App';

  ReactDOM.render(
    <React.StrictMode>
+     <PorscheDesignSystemProvider>
        <App />
+     </PorscheDesignSystemProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
```

For advanced usage please [read further](https://designsystem.porsche.com/latest/start-coding/react).

#### Jsdom Polyfill for React / Jest / jsdom test automation

We removed test mocks for React / Jest / jsdom as Shadow DOM is supported since jsdom v12.2.0. Instead, we provide a
Jsdom Polyfill (exclusivly for `@porsche-design-system/components-react` package) fixing missing implementation of jsdom
which the Porsche Design System relies on. **Note:** If your test includes Porsche Design System components, make sure
to wrap the component you want to test with a PorscheDesignSystemProvider in order to avoid exceptions. For more
information please [read further](https://designsystem.porsche.com/latest/start-coding/react).

---

## Vanilla JS

#### Integration of Vanilla JS components

With `v1.x` of the Porsche Design System you've had to copy all needed JS files of
`@porsche-design-system/components-js` into your target directory and include the ES5 and ESM loader snippet. Now you
only need to copy one `index.js` file and initialize the Porsche Design System like in the example below:

```diff
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title>Porsche Design System</title>
-     <script nomodule src="PATH/TO/PACKAGE/@porsche-design-system/components-js/dist/porsche-design-system/porsche-design-system.js"></script>
-     <script type="module" src="PATH/TO/PACKAGE/@porsche-design-system/components-js/dist/porsche-design-system/porsche-design-system.esm.js"></script>
+     <script src="PATH/TO/PACKAGE/@porsche-design-system/components-js/index.js"></script>
    </head>
    <body>
+     <script type="text/javascript">
+       porscheDesignSystem.load();
+     </script>
      <p-headline variant="headline-1">Some text</p-headline>
    </body>
  </html>
```

For advanced usage please [read further](https://designsystem.porsche.com/latest/start-coding/vanilla-js).

---

### [2.0.0-rc.10] - 2021-04-12

#### Changed

- `Tabs` and `Tabs Bar` now respect dynamic additions / removals of `p-tabs-item`, `a` and `button` elements. Make sure
  to update the `activeTabIndex` when mutating elements
- Improved performance of `Text`, `Button Pure` and `Link Pure` when `size` is not `inherit`

#### Added

- `Grid` now has a `wrap` and `gutter` property
- Components (`Grid Item`, `Flex Item`, `Tabs Item` and `Text List Item`) that require a specific parent (`Grid`,
  `Flex`, `Tabs` and `Text List`) will now throw an error if used without that parent

#### Fixed

- Visual appearance of `Checkbox Wrapper` and `Radio Button Wrapper` reflect the state of the wrapped `input` element

### [2.0.0-rc.9] - 2021-03-26

#### Added

- `Button Group` component
- Fullscreen property for `Modal` on mobile

#### Changed

- Spacings, heading and sizes of `Modal`

#### Fixed

- Prevent duplicate loading of `porsche-design-system.v2.x.HASH.js` chunk when using `getComponentChunkLinks()` partial

### [2.0.0-rc.8] - 2021-03-17

#### Added

- Support for full height `Content Wrapper` with flex
- `Tabs Bar` now supports `undefined` as `activeTabIndex`

#### Changed

- `Tabs Bar` has a new default `activeTabIndex`, which is `undefined`
- `Tabs Bar` does not work by itself anymore. The `activeTabIndex` needs to be controlled from the outside
  ([read more](https://designsystem.porsche.com/latest/components/tabs-bar/examples))
- Background Color of `Select Wrapper` in `dark` theme to meet accessibility criteria

### [2.0.0-rc.7] - 2021-03-15

#### Fixed

- Make shadowed `Flex` and `Grid` work in Firefox + Safari

### [2.0.0-rc.6] - 2021-03-11

#### Changed

- Make `Grid` and `Grid Item` use Shadow DOM
- Make `Flex` and `Flex Item` use Shadow DOM

### [2.0.0-rc.5] - 2021-03-09

#### Added

- Configurable background color of `Content Wrapper`
- `italic` font-style in `Text` is now overridden with `normal`

#### Fixed

- Usage of `Select Wrapper` within custom elements
- A bug that caused `Spinner` to be displayed in a wrong size

### [2.0.0-rc.4] - 2021-03-01

#### Changed

- Filter of `Select Wrapper` supports substring search

#### Fixed

- Build error in SSR

### [2.0.0-rc.3] - 2021-02-17

#### Added

- React: utility function `skipCheckForPorscheDesignSystemProviderDuringTests`
- React: tree shaking for component wrappers

#### Fixed

- Angular: error in `Checkbox Wrapper`, `Radio Button Wrapper` and `Text Field Wrapper` when `input[type]` is bound

### [2.0.0-rc.2] - 2021-02-12

#### Added

- Validate usage of `Checkbox Wrapper`, `Radio Button Wrapper`, `Select Wrapper`, `Text Field Wrapper` and
  `Textarea Wrapper`

### [2.0.0-rc.1] - 2021-02-04

#### Added

- Partial function `getComponentChunkLinks()` to preload Porsche Design System Components

#### Changed

- Added a space before asterisk (`*`) when `input`, `textarea` or `select` have `required` attribute within form wrapper
  components
- Renamed partial `getFontLinks()` option from `weight` to `weights`

#### Fixed

- A bug in `Tabs Bar` where the nextButton was mistakenly rendered.
- A bug where `Icon` was not rendered when using `lazy` property.
- A bug in `Text Field Wrapper` with input type password where characters would overlap the icon.

### [2.0.0-rc.0] - 2021-01-29

#### Added

- Link support for `Marque`
- Sizing options `'responsive' | 'small' | 'medium'` for `Marque`

#### Changed

- Angular: added static `load()` function `PorscheDesignSystemModule` for custom prefix
- Hide up/down spin button when using **Text Field** with `type="number"` in Firefox

#### Fixed

- Angular: typings
- React: correct handling of `ref` property
- Unhandled exception in `Select Wrapper` if `selected` and `disabled` attributes are set on the same option
- A bug in `Tabs Bar` where scrolling was broken when a tab was selected
- A bug in `Tabs Bar` where the `nextButton` was always rendered

### [2.0.0-alpha.13] - 2021-01-26

#### Added

- Partial function `getFontLinks()` to prevent **Flash of Unstyled Text** (FOUT)

#### Fixed

- React: correct handling of `className` property

### [2.0.0-alpha.12] - 2021-01-20

#### Added

- Partial function `getInitialStyles()` to prevent **Flash of Unstyled Content** (FOUC)
- Partial function `getFontFaceStylesheet()` to prevent **Flash of Unstyled Text** (FOUT)

#### Changed

- React: `PorscheDesignSystemProvider` needs to wrap application
- React: component props have to be camelCase
- React: `PorscheDesignSystemProvider` is needed while testing components

#### Fixed

- React: typings
- React: support of objects for property values

#### Removed

- React: `getPrefixedComponents`, prefixing is handled by `PorscheDesignSystemProvider`

### [2.0.0-alpha.11] - 2021-01-08

#### Changed

- Precision of relative line height
- Changed color of `neutral contrast low`

### [2.0.0-alpha.10] - 2020-12-14

#### Added

- `native` property to `Select Wrapper` to force rendering of native Browser select dropdown
- Extended flexibility of `Headline`

#### Changed

- Some styling improvements of `Select Wrapper`

#### Fixed

- Jsdom Polyfill `fetch` error

### [2.0.0-alpha.9] - 2020-12-09

### Fixed

- Improved reliability of `componentsReady()`

#### Changed

- Jsdom Polyfill `console.warn` behaviour

### [2.0.0-alpha.8] - 2020-12-03

### Fixed

- A bug where `Modal` did not remove `overflow=hidden` on document body.

### [2.0.0-alpha.7] - 2020-11-26

#### Added

- Jsdom Polyfill

#### Removed

- Jsdom Mocks
- Global "blur on focus" script

#### Changed

- Default dropdown direction of `SelectWrapper` from `down` to `auto`
- Made API of `Tabs` consistent with `Tabs Bar`
- Removed transition for focus styling
- Use `:focus-visible` as default and `:focus` as fallback for focusable elements

#### Fixed

- The Selected element of `SelectWrapper` dropdown keeps now in sync with native selection if changed programmatically
- Invalid search results get cleared if `SelectWrapper` becomes focus state
- Some bugs in `TabsBar`
- Minification of dynamic slotted content styles
- An issue where `Pagination` throws console errors if disconnected from dom.

### [2.0.0-alpha.6] - 2020-10-28

#### Changed

- default `type` of `Button` and `Button Pure` to `submit`

#### Fixed

- Typings

### [2.0.0-alpha.5] - 2020-10-26

#### Added

- `Modal` component

#### Fixed

- Typing for `pageChange` event of `Pagination` component
- Typings

#### Changed

- Focus styling

### [2.0.0-alpha.4] - 2020-10-14

#### Added

- Custom filter to `Select Wrapper` component
- DropDown direction property to `Select Wrapper` component
- Display `*` after label when `input`, `textarea` or `select` have `required` attribute within form wrapper components
- `Tabs` component
- `Tabs Bar` component
- `Banner` component

#### Removed

- Default `position: relative;` style of `Link Pure` and `Button Pure`

#### Fixed

- `Spinner` zooming bug on Safari

### [2.0.0-alpha.3] - 2020-09-11

#### Added

- Support to load assets from China CDN directly via browser flag: `PORSCHE_DESIGN_SYSTEM_CDN = 'cn';`

#### Removed

- Support for `<a>` wrapped `Link` and `Link Pure`

### [2.0.0-alpha.2] - 2020-08-20

### [2.0.0-alpha.1] - 2020-08-17

#### Changed

- Removed classnames dependency
- Stencil Core `taskQueue` from `congestionAsync` to `async` for more performant component rendering

#### Fixed

- Focus input on label click of `Checkbox Wrapper` and `Radio Button Wrapper`

### [1.5.6] - 2020-10-15

### [1.5.6-rc.0] - 2020-10-13

### Fixed

- `Spinner` zooming bug on Safari

### [1.5.5] - 2020-09-11

### [1.5.5-rc.0] - 2020-09-07

### Changed

- Deprecated stencil lifecycle-method `componentDidUnload` to `disconnectedCallback` to fix "`selectObserver` is
  undefined" bug in `Select Wrapper` and `Pagination`

### [1.5.4] - 2020-08-25

### [1.5.4-rc.0] - 2020-08-17

#### Changed

- Removed classnames dependency
- Stencil Core `taskQueue` from `congestionAsync` to `async` for more performant component rendering

#### Fixed

- Focus input on label click of `Checkbox Wrapper` and `Radio Button Wrapper`
- Fix typings for `orientation` of `Divider` component

### [2.0.0-alpha.0] - 2020-08-06

#### Added

- **Experimental:** Optional web component scoping mechanism during runtime to enable micro service architecture

#### Changed

- Web components get lazy loaded from central CDN to improve caching strategy across Porsche's digital eco system

#### Removed

- Stop browser support for **IE11** and **EdgeHTML**

#### Fixed

- Mix of `Optgroups` and `Options` on same level in `Select Wrapper` component
- Fix typings for `orientation` of `Divider` component

### [1.5.3] - 2020-08-10

### [1.5.3-rc.0] - 2020-08-10

#### Fixed

- Mix of `Optgroups` and `Options` on same level in `Select Wrapper` component

### [1.5.2] - 2020-07-22

#### Fixed

- Dispatch change event in `Select Wrapper`
- Stencil react-output-target SSR Bug

### [1.5.1] - 2020-07-20

#### Fixed

- SVGO settings for icons
- Angular bug which causes `ngcc` to fail

### [1.5.0] - 2020-07-16

#### Added

- Icons (active-cabin-ventilation, battery-full, bell, bookmark, car-battery, charging-active, charging-state, climate,
  climate-control, garage, horn, key, map, parking-brake, parking-light, preheating, send, shopping-bag, sidelights,
  user-manual, wrenches)

#### Changed

- Icons (arrow-first, arrow-last, battery-empty, car, card, charging-station, question)

#### Fixed

- Porsche Marque images

### [1.5.0-rc.2] - 2020-07-06

### [1.5.0-rc.1] - 2020-07-06

#### Added

- **Notification Neutral** color to `color` property of `p-text` and `p-icon`

### [1.5.0-rc.0] - 2020-06-25

#### Added

- `Fieldset Wrapper` component
- Improved SEO of `p-headline` and `p-text`: Added possibility to write semantic HTML tags (e.g. `<h1>-<h6>` or `<p>`,
  `<blockquote>`, etc.) directly as slotted content.
- Possibility to include anchor tags directly as slots of `Link`, `Link Pure` and `Link Social`
- `Text` new `weight` property `semibold`
- `Button Pure` label with subline pattern as slot
- `Link Pure` label with subline pattern as slot

#### Changed

- `Select Wrapper` is now ready for the catwalk. It is dressed now with a custom drop down list box and gets naked by
  default on touch devices.

#### Fixed

- Minor accessibility improvements of `icons` and `Text Field`
- Remove native number spinner buttons of `Text Field` with type text for Firefox
- An issue with `Button` and `Button Pure` and their `disabled` attribute

### [1.4.0] - 2020-05-14

### [1.4.0-rc.3] - 2020-05-08

#### Added

- `Text List`

#### Changed

- Improve caching strategy for fonts by content-based hash
- Improve caching strategy for marque by content-based hash
- Dimensions and sharpness of marque
- Props for `Content Wrapper`

### [1.4.0-rc.2] - 2020-05-06

#### Added

- `Content Wrapper`
- Description property to `p-text-field-wrapper`, `p-textarea-wrapper` and `p-select-wrapper`
- `Link Social`

#### Changed

- Improve accessibility of error and success states of form elements
- Aria-invalid attribute of form elements if they are in error state is now managed by component
- Rename icon name `configure` to `configurate` (prevents breaking change compared to stable v1.3.0)
- Improve `p-icon` loading behavior

#### Fixed

- Display of wrong icons

#### Removed

- `safe-zone` property of `p-grid` (`Content Wrapper` should be used instead)

### [1.4.0-rc.1] - 2020-04-27

#### Added

- Add `safe-zone` property to `p-grid` for outer grid margin, max-width and centering
- Submit button with search icon to `p-textfield-wrapper` type search

#### Changed

- Background color of readonly state in components `p-textfield-wrapper` and `p-textarea-wrapper`
- Visual appearance of icons
- Improve caching strategy for icons by content-based hash
- Cursor of Radio, Checkbox and Select
- Fixed naming of Mock from `p-textfield-wrapper` to `p-text-field-wrapper`

#### Fixed

- Icon loading mechanism

### [1.4.0-rc.0] - 2020-04-09

#### Added

- SSR support

### [1.3.0] - 2020-04-08

#### Added

- New headline size `headline-5` to `p-headline`
- Test Mocks

#### Fixed

- Text styling of Select component on focus in IE11 and Chrome on Windows 10

### [1.3.0-rc.0] - 2020-04-03

#### Fixed

- Improve form elements

### [1.2.0] - 2020-03-25

#### Added

- `Divider`
- Hover state for form elements

#### Fixed

- Support label text of form elements for Screen readers

### [1.1.2] - 2020-03-17

#### Changed

- Notification colors

### [1.1.1] - 2020-03-13

#### Changed

- Icon of `Checkbox` indeterminate state

### [1.1.0] - 2020-03-11

#### Fixed

- Minor improvements

### [1.1.0-rc.0] - 2020-03-02

#### Added

- `Select Wrapper`
- `Checkbox Wrapper`
- `Radio Button Wrapper`
- `Textarea Wrapper`

#### Fixed

- `Text Field Wrapper` toggle password visibility

### [1.0.3] - 2020-02-13

#### Fixed

- JS framework compatibility

### [1.1.0-0] - 2020-02-06

#### Added

- `Text Field Wrapper`

#### Changed

- Add proper cursor for disabled state for `Button` and `Button Pure`

### [1.0.2] - 2020-02-04

#### Fixed

- Inheritable styling of slotted content

### [1.0.1] - 2020-01-30

#### Added

- Clickable area of `Link Pure` and `Button Pure` is optionally configurable by defining padding on host element

### [1.0.0] - 2020-01-28

#### Added

- Cursor pointer on hover for `Button` and `Button Pure`
- Line-height gets calculated based on Porsche type-scaling formula automatically for `Text`, `Link Pure` and
  `Button Pure`
- Test helper function `componentsReady()` which indicates when lazy loaded components fully have loaded

#### Changed

- Update CDN asset paths
- Improve font-weight definitions
- Rename and optimize neutral colors for `Icon` and `Text`

### [1.0.0-rc.1] - 2019-12-13

#### Added

- `Headline`
- `Text`
- `Marque`
- `Button`
- `Button Pure`
- `Spinner`
- `Icon`
- `Flex`
- `Grid`
- `Link`
- `Link Pure`
- `Pagination`
- "Blur on focus"
