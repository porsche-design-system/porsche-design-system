# Changelog

## Porsche Design System - Components
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [Unreleased]

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

In keeping with [Semver](https://semver.org/), Porsche Design System v2.0.0 was released due to changes in the API, fundamental changes in loading behavior and others.
With our new major version `v2.0.0` there are some important changes that you should watch out for.
To make the migration from `v1.5.x` to our current `v2.0.0` easier, we offer a few guidelines.

---

## General changes / improvements:

#### All components, icons, fonts, styles and marque of the Porsche Design System are loaded versioned and chunked from a central CDN
This way all web based digital Porsche products share and use the cached and versioned assets regardless of the JS framework used to improve loading performance across the Porsche group.
Only a tiny (1.4kb sized) Porsche Design System loader script gets bundled into your application code.
Everything else gets loaded versioned, cached and chunked from a central CDN ([read more](https://designsystem.porsche.com/latest/#/performance/cdn)).
However, this also means that you will need an **Internet connection** to render the components in a browser (possibly relevant for development stage or intranet applications).

#### Enabling Micro Frontend Architecture
In case of a micro-frontend architecture, multiple instances and versions of the Porsche Design System can be combined in a final application by configurable prefixing technique of the Porsche Design System components during runtime.
Please refer to our framework specific guidelines [Vanilla JS](https://designsystem.porsche.com/latest/#/start-coding/vanilla-js), [Angular](https://designsystem.porsche.com/latest/#/start-coding/angular) and [React](https://designsystem.porsche.com/latest/#/start-coding/react).

#### Prevent Flash of Unstyled Content (FOUC) and Flash of Unstyled Text (FOUT)
To prevent FOUC/FOUT, the Porsche Design System offers various partials as part of the `@porsche-design-system/components-{js|angular|react}` package to ensure all necessary Porsche Design System fonts and components are fully loaded.
If you've used the `@porsche-design-system/partials` package previously, stop using it and replace the integration with the partials provided by `@porsche-design-system/components-{js|angular|react}` package.
Have a look at our [FOUC/FOUT guidelines](https://designsystem.porsche.com/latest/#/performance/loading-behaviour).

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
Please follow our [CDN guidelines](https://designsystem.porsche.com/latest/#/performance/cdn) for more information.

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
[Read more about it](https://designsystem.porsche.com/latest/#/helpers/components-ready).

#### Removed "blur on focus"
Now focus styling is only applied when you navigate through keyboard and ignored by mouse interaction for browsers supporting `:focus-visible` otherwise it will fallback to `:focus` CSS implementation.

#### Changed focus styling for a better compromise between accessibility and visual appearance
Color and outline of general focus styling has changed to `currentColor` for light/dark theme with an outline of 1px width/offset.
If you have custom components build with the usage of our `@porsche-design-system/utilities` package then update it to the latest version (we also provide a focus [SCSS mixin](https://designsystem.porsche.com/latest/#/utilities/scss#functions) and [JS function](https://designsystem.porsche.com/latest/#/utilities/js#functions)).

#### Improved geometry of Porsche Next font
For better alignment and readability we've changed the geometry of the Porsche Next font which results in a visual change of font size and spacing.

#### Dropped support for IE11 and EdgeHTML according to Porsche's official browser strategy 2021
If you still need to support these browsers, you have to stick to `v1.5.x`.
We offer a Browser Notification package `@porsche-design-system/browser-notification` to alert users that these browsers are no longer supported.
It supports a blocking layer (to be used with Porsche Design System `v2.x`), or a dismissible banner (to be used with Porsche Design System `v1.x`). 
Please refer to our [Browser compatibility guidelines](https://designsystem.porsche.com/latest/#/help/browser-compatibility).

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

---

## Angular

#### Integration of Angular components
In the past it was possible to provide a token called `PREVENT_WEB_COMPONENTS_REGISTRATION` which prevented the registration of the Porsche Design System components and loading of polyfills.
Due to the fact that we no longer provide / need poly filling, we have completely removed the token.
For advanced usage please [read further](https://designsystem.porsche.com/latest/#/start-coding/angular).

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
For advanced usage please [read further](https://designsystem.porsche.com/latest/#/start-coding/react).


#### Jsdom Polyfill for React / Jest / jsdom test automation
We removed test mocks for React / Jest / jsdom as ShadowDOM is supported since jsdom v12.2.0.
Instead, we provide a Jsdom Polyfill (exclusivly for `@porsche-design-system/components-react` package) fixing missing implementation of jsdom which the Porsche Design System relies on.
**Note:** If your test includes Porsche Design System components, make sure to wrap the component you want to test with a PorscheDesignSystemProvider in order to avoid exceptions.
For more information please [read further](https://designsystem.porsche.com/latest/#/start-coding/react).

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
For advanced usage please [read further](https://designsystem.porsche.com/latest/#/start-coding/vanilla-js).

---

## Next.js and Gatsby

With the current v2.0.0 release we do not support SSR and you need to stick to `v1.5.x`. 
SSR support can be expected with the next minor release.

---

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