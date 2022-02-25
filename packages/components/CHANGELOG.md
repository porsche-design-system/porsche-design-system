# Changelog

## Porsche Design System - Components
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [Unreleased]

### [2.9.0-rc.1] - 2022-02-25

#### Fixed
- `Modal` focus trap respecting elements in shadow DOM and dynamically added/removed elements on first level
- `TabsItem` focus outline on click in Safari
- Error while using partials in Vanilla JS and Angular

### [2.9.0-rc.0] - 2022-02-16

#### Added
- `getFontFaceStylesheet` returns additional `<link>` tags with `rel="preconnect"` and `rel="dns-prefetch"`
- Option `format` to partials `getFontFaceStylesheet`, `getComponentChunkLinks()`, `getFontLinks()`, `getIconLinks()`, `getInitialStyles()`, `getLoaderScript()` and `getMetaTagsAndIconLinks()`

#### Deprecated
- The option `withoutTags` of partials `getFontFaceStylesheet`, `getComponentChunkLinks()`, `getFontLinks()`, `getIconLinks()`, `getInitialStyles()`, `getLoaderScript()` and `getMetaTagsAndIconLinks()`
  is deprecated and will be removed in `v3.0.0`. Please use `format: 'jsx'` instead.
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
- `Button Pure` and `Link Pure` removed `position: relative` imposition, make sure to **not** override it with `position: static`

#### Fixed
- `Modal` close button styles when no heading is passed

### [2.9.0-beta.0] - 2022-01-18

#### Added
- React: `getByRoleShadowed`, `getByLabelTextShadowed` and `getByTextShadowed` utilities which uses `@testing-library/dom` queries internally to support Shadow DOM  

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
- The `tabbable` property of `Button`, `Button Pure` and `Switch` is deprecated and will be removed in `v3.0.0`. Please use `tabindex` instead.
```diff
- <p-button tabbable="false">Some button</p-button>
+ <p-button tabindex="-1">Some button</p-button>
```

### [2.8.0-beta.3] - 2021-12-22

#### Added
**Disclaimer:** The provided themes `light-electric` and `dark-electric` are just a proof of concept, it's **not** accessible regarding its color contrast and might even be removed in an upcoming major release again.
- `light-electric` theme for `Switch`
- `dark-electric` theme for `Button Pure` and `Link Pure`
- Character counter to `Text Field Wrapper` and `Textarea Wrapper` if `maxlength` is present on `input type="text"` and `textarea`

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
- Angular: Increased peer dependency to `>=12.0.0 <14.0.0`

### [2.7.0] - 2021-12-14

### [2.7.0-rc.0] - 2021-12-14

#### Removed
- `offset-bottom` prop of `Toast` (use `--p-toast-position-bottom` CSS variable instead)

### [2.7.0-beta.6] - 2021-12-08

#### Added
- `Popover`

### [2.7.0-beta.5] - 2021-12-07

#### Added
**Disclaimer:** The provided theme `light-electric` is just a proof of concept, it's **not** accessible regarding its color contrast and might even be removed in an upcoming major release again.
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
- New `aria` property for `ARIA` attribute handling for: `Button`, `Button Pure`, `Icon`, `Link`, `Link Pure`, `Marque`, `Spinner`

#### Fixed
- React: warnings about `useLayoutEffect` in SSR context

### [2.6.1] - 2021-11-05

#### Fixed
- Prevent breaking entire Porsche Design System due to lacking support of `ResizeObserver`, however `Accordion` still requires it 

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
- Validation messages of `Checkbox Wrapper`, `Radio Button Wrapper`, `Select Wrapper`, `Textarea Wrapper` and `Text Field Wrapper` have now an additional icon representing the validation state
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
- `Checkbox Wrapper`, `Radio Button Wrapper`, `Select Wrapper`, `Textarea Wrapper` and `Text Field Wrapper` now reflect changes of the `required` attribute on their child component
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
- Extended `Fieldset Wrapper` with `labelSize`, `required`, `state` and `message` properties. If the `Fieldset Wrapper` is set to required 
  only the label of the **Fieldset Wrapper** gets an asterisk. It is removed from all wrapped child components, as long as they are Porsche Design System form elements.

### [2.0.3] - 2021-04-28

### [2.0.3-beta] - 2021-04-28

#### Fixed
- Angular: Events firing twice in `Pagination`, `Modal`, `Tabs`, `Tabs Bar` and `Banner` component

### [2.0.2] - 2021-04-21

### [2.0.2-beta.0] - 2021-04-20

#### Fixed
- TypeScript build errors due to duplicate declarations in `types.d.ts`

### [2.0.1] - 2021-04-16

#### Fixed
- Visual appearance of `Checkbox Wrapper` in iOS Safari
- A bug where `Text Field Wrapper` would throw an error when reattaching to DOM too quickly
- Visual bug in Firefox when zooming out `Text Field Wrapper`, `Checkbox Wrapper` and `Textarea Wrapper`
- Angular: Streamline component styles in dark theme 

#### Changed
- Aligned focus states of `Checkbox Wrapper` and `Radio Button Wrapper` across browsers

### [2.0.0] - 2021-04-13

In keeping with [Semver](https://semver.org/), Porsche Design System v2.0.0 was released due to changes in the API, fundamental changes in loading behavior and others.
With our new major version `v2.0.0` there are some important changes that you should watch out for.
To make the migration from `v1.5.x` to our current `v2.0.0` easier, we offer a few guidelines.

## General changes / improvements:

#### All components, icons, fonts, styles and marque of the Porsche Design System are loaded versioned and chunked from a central CDN
This way all web based digital Porsche products share and use the cached and versioned assets regardless of the JS framework used to improve loading performance across the Porsche group.
Only a tiny (1.4kb sized) Porsche Design System loader script gets bundled into your application code.
Everything else gets loaded versioned, cached and chunked from a central CDN ([read more](https://designsystem.porsche.com/latest/performance/cdn)).
However, this also means that you will need an **Internet connection** to render the components in a browser (possibly relevant for development stage or intranet applications).

#### Enabling Micro Frontend Architecture
In case of a micro-frontend architecture, multiple instances and versions of the Porsche Design System can be combined in a final application by configurable prefixing technique of the Porsche Design System components during runtime.
Please refer to our framework specific guidelines [Vanilla JS](https://designsystem.porsche.com/latest/start-coding/vanilla-js), [Angular](https://designsystem.porsche.com/latest/start-coding/angular) and [React](https://designsystem.porsche.com/latest/start-coding/react).

#### Prevent Flash of Unstyled Content (FOUC) and Flash of Unstyled Text (FOUT)
To prevent FOUC/FOUT, the Porsche Design System offers various partials as part of the `@porsche-design-system/components-{js|angular|react}` package to ensure all necessary Porsche Design System fonts and components are fully loaded.
If you've used the `@porsche-design-system/partials` package previously, stop using it and replace the integration with the partials provided by `@porsche-design-system/components-{js|angular|react}` package.
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
Our CDN is configured to forward requests to Chinese CDN automatically when necessary.
So you're good to go without any configuration or multiple region specific builds of your application.
However, if you are aiming for the maximum possible performance in China, you can configure which CDN the Porsche Design System must use.
Please follow our [CDN guidelines](https://designsystem.porsche.com/latest/performance/cdn) for more information.

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
To ensure the best possible typing support, we have refactored our Angular and React wrappers which integrate the native web components of the Porsche Design System.

#### componentsReady() works reliable
Because the Porsche Design System components get loaded async at the time they are needed, it might be relevant within your application or test automation to know when those have been initialized.
Therefore, we provide in all three `@porsche-design-system/components-{js|angular|react}')` packages a reliable helper function `componentsReady()`.
[Read more about it](https://designsystem.porsche.com/latest/helpers/components-ready).

#### Removed "blur on focus"
Now focus styling is only applied when you navigate through keyboard and ignored by mouse interaction for browsers supporting `:focus-visible` otherwise it will fallback to `:focus` CSS implementation.

#### Changed focus styling for a better compromise between accessibility and visual appearance
Color and outline of general focus styling has changed to `currentColor` for light/dark theme with an outline of 1px width/offset.
If you have custom components build with the usage of our `@porsche-design-system/utilities` package then update it to the latest version (we also provide a focus [SCSS mixin](https://designsystem.porsche.com/latest/utilities/scss/functions) and [JS function](https://designsystem.porsche.com/latest/utilities/js/functions)).

#### Improved geometry of Porsche Next font
For better alignment and readability we've changed the geometry of the Porsche Next font which results in a visual change of font size and spacing.

#### Dropped support for IE11 and EdgeHTML according to Porsche's official browser strategy 2021
If you still need to support these browsers, you have to stick to `v1.5.x`.
We offer a Browser Notification package `@porsche-design-system/browser-notification` to alert users that these browsers are no longer supported.
It supports a blocking layer (to be used with Porsche Design System `v2.x`), or a dismissible banner (to be used with Porsche Design System `v1.x`).
Please refer to our [Browser compatibility guidelines](https://designsystem.porsche.com/latest/help/browser-compatibility).

#### Changed default type of Button and Button Pure
To be in sync with native `<button>` behavior we've changed the default `type` of **Button** and **Button Pure** component.
Those components will render a button within their Shadow DOM as `<button type="submit">` (previously `<button type="button">`).

- `submit`: The button submits the form data to the server. This is the default if the attribute is not specified for buttons associated with a `<form>`, or if the attribute is an empty or invalid value.
- `button`: The button has no default behavior, and does nothing when pressed by default. It can have client-side scripts listen to the element's events, which are triggered when the events occur.

#### Changed support for wrapped links around Link, Link Pure and Link Social component
Due to the support for setting links (`<a href="#">`) in our **Link**, **Link Pure** and **Link Social** components as child, we've removed support for styling the anchor tag (`<a>`) when it surrounds the component.
So we recommend changing the position of the `<a>` tag from wrapping the component to a direct slot (child) of it.

```diff
- <a href="#"><p-link>Some label</p-link></a>
+ <p-link><a href="#">Some label</a></p-link>

- <a href="#"><p-link-pure>Some label</p-link-pure></a>
+ <p-link-pure><a href="#">Some label</a></p-link-pure>

- <a href="#"><p-link-social>Some label</p-link-social></a>
+ <p-link-social><a href="#">Some label</a></p-link-social>
```

#### Automatic * asterisk symbol to form field labels
We added an automatic generated * asterisk symbol to form field labels which have the required attribute.
This might lead to a doubled * symbol if you set one by yourself.

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
`Flex`, `Flex Item`, `Grid` and `Grid Item` now use Shadow DOM, thus you are not able to overwrite styles defined by these components any longer.

---

## Angular

#### Integration of Angular components
In the past it was possible to provide a token called `PREVENT_WEB_COMPONENTS_REGISTRATION` which prevented the registration of the Porsche Design System components and loading of polyfills.
Due to the fact that we no longer provide / need poly filling, we have completely removed the token.
For advanced usage please [read further](https://designsystem.porsche.com/latest/start-coding/angular).

---

## React

#### Integration of React components
In the past `@porsche-design-system/components-react` components have initialized the **Porsche Design System Loader** automatically as soon as a component was imported.
With `v2.x` you have to import the `PorscheDesignSystemProvider` once in your `index.tsx` which then initializes the **Porsche Design System Loader**, e.g. like:
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
We removed test mocks for React / Jest / jsdom as Shadow DOM is supported since jsdom v12.2.0.
Instead, we provide a Jsdom Polyfill (exclusivly for `@porsche-design-system/components-react` package) fixing missing implementation of jsdom which the Porsche Design System relies on.
**Note:** If your test includes Porsche Design System components, make sure to wrap the component you want to test with a PorscheDesignSystemProvider in order to avoid exceptions.
For more information please [read further](https://designsystem.porsche.com/latest/start-coding/react).

---

## Vanilla JS

#### Integration of Vanilla JS components
With `v1.x` of the Porsche Design System you've had to copy all needed JS files of `@porsche-design-system/components-js` into your target directory and include the ES5 and ESM loader snippet.
Now you only need to copy one `index.js` file and initialize the Porsche Design System like in the example below:

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
- `Tabs` and `Tabs Bar` now respect dynamic additions / removals of `p-tabs-item`, `a` and `button` elements. Make sure to update the `activeTabIndex` when mutating elements
- Improved performance of `Text`, `Button Pure` and `Link Pure` when `size` is not `inherit`

#### Added
- `Grid` now has a `wrap` and `gutter` property
- Components (`Grid Item`, `Flex Item`, `Tabs Item` and `Text List Item`) that require a specific parent (`Grid`, `Flex`, `Tabs` and `Text List`) will now throw an error if used without that parent

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
- `Tabs Bar` does not work by itself anymore. The `activeTabIndex` needs to be controlled from the outside ([read more](https://designsystem.porsche.com/latest/components/tabs-bar/examples))
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
- Validate usage of `Checkbox Wrapper`, `Radio Button Wrapper`, `Select Wrapper`, `Text Field Wrapper` and `Textarea Wrapper`

### [2.0.0-rc.1] - 2021-02-04

#### Added
- Partial function `getComponentChunkLinks()` to preload Porsche Design System Components

#### Changed
- Added a space before asterisk (`*`) when `input`, `textarea` or `select` have `required` attribute within form wrapper components
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
- Deprecated stencil lifecycle-method `componentDidUnload` to `disconnectedCallback` to fix "`selectObserver` is undefined" bug in `Select Wrapper` and `Pagination`

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
- Icons (active-cabin-ventilation, battery-full, bell, bookmark, car-battery, charging-active, charging-state, climate, climate-control, garage, horn, key, map, parking-brake, parking-light, preheating, send, shopping-bag, sidelights, user-manual, wrenches)

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
- Improved SEO of `p-headline` and `p-text`: Added possibility to write semantic HTML tags (e.g. `<h1>-<h6>` or `<p>`, `<blockquote>`, etc.) directly as slotted content.
- Possibility to include anchor tags directly as slots of `Link`, `Link Pure` and `Link Social` 
- `Text` new `weight` property `semibold`
- `Button Pure` label with subline pattern as slot
- `Link Pure` label with subline pattern as slot

#### Changed
- `Select Wrapper` is now ready for the catwalk. It is dressed now with a custom drop down list box and gets naked by default on touch devices. 

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
- Test-Projects React, Angular, Gatsby and NextJS

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
- Line-height gets calculated based on Porsche type-scaling formula automatically for `Text`, `Link Pure` and `Button Pure`
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
