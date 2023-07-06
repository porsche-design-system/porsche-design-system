# Support

To drive continuous communication within the community of users, contributors and the Porsche Design System team,
specific use-case-related communication channels and methods are provided.

<TableOfContents></TableOfContents>

## Website as an information hub

This website offers a comprehensive overview of all relevant information and guidelines, such as usable components with
their corresponding guidelines. Before using other channels, the website content should be read completely.

## Personal communication via Slack and mail

We use Slack for public discussions and questions, that can be read and answered by the whole community and the Porsche
Design System team. The Porsche Design System is hosting the channel
[#tool-porsche-design-system](https://porschedev.slack.com/app_redirect?channel=tool-porsche-design-system) in the
workspace of porschedev.slack.com. Also, messages to designsystem@porsche.de will be answered by the team as quickly as
possible.

## Get notifications per mail

Let us notify you whenever there is relevant news for you regarding Porsche Design System or general design topics. We
will use your account registration for sending mails. If you are not yet registered, please sign up via
[Start Designing](designing/introduction) or [Start Developing](developing/introduction)

## Issue and contribution management at GitHub

### Feature Requests

Feature requests can be forwarded to the Porsche Design System team by creating issues in the
[Porsche Design System Issue Board](https://github.com/porsche-design-system/porsche-design-system/issues/new/choose).

### Contributions

If you want to contribute solutions or fixes, you can create pull requests in the
[Porsche Design System repository](https://github.com/porsche-design-system/porsche-design-system).

To keep the quality high we rely on extensive testing and test automation.  
Our CI pipeline will report back most issues for already existing features and it is possible to work by trial and
error. Since this isn't ideal you can use the following high-level checklist to get a better understanding of how, where
and in which context a single component is tested.

#### Checklist to keep in mind per package when modifying components

##### `components`

- unit tests for component itself, e.g. `button.spec.ts`
- unit tests for component styles, e.g. `button-styles.spec.ts`
- unit tests for component utils, e.g. `button-utils.spec.ts`
- generic unit tests for all components, e.g. `lifecycleValidtion.spec.ts`, `host-hidden-styles.spec.ts`,
  `slotted-styles.spec.ts`, `hover-media-query.spec.ts` and `a11y.spec.ts`

##### `components-js`

- e2e tests for component, e.g. `e2e/puppeteer/specs/button.e2e.ts`
- generic e2e tests for all components, e.g. `e2e/puppeteer/specs/default-dom.e2e.ts` and
  `e2e/puppeteer/specs/lifecycle-after-disconnect.e2e.ts`
- vrt tests of `button.html` page with puppeteer for component, e.g. `vrt/puppeteer/specs/button.vrt.ts`
- vrt tests of `button.html` with playwright for component, e.g. `vrt/playwright/specs/button.vrt.ts`
- vrt tests of hover and focus states with puppeteer for component, e.g. `vrt/puppeteer/specs/button.vrt.ts`
- vrt tests of `overview.html` for all components including prefixing with puppeteer, e.g.
  `vrt/puppeteer/specs/overview.vrt.ts`
- vrt tests of `overview.html` for all components including prefixing with playwright, e.g.
  `vrt/playwright/specs/overview.vrt.ts`
- generic vrt tests for all components, e.g. `vrt/puppeteer/specs/component-high-contrast-mode.vrt.ts` and
  `vrt/puppeteer/specs/component-scaling.vrt.ts`

##### `components-angular`

- vrt pages are generated via `generateVRTPages.ts` but tests are maintained manually and have to match shared fixtures
  of components-js, e.g. `vrt/specs/button.vrt.ts`

##### `components-react`

- vrt pages are generated via `generateVRTPages.ts` but tests are maintained manually and have to match shared fixtures
  of components-js, e.g. `vrt/specs/button.vrt.ts`

##### `components-vue`

- vrt pages and tests are maintained manually and `OverviewPage.vue` need to be kept in sync, e.g.
  `vrt/specs/overview.vrt.ts`

##### `components-react/projects/react-ssr-wrapper`

- unit tests for component edge cases, e.g. `react-ssr-wrapper.spec.tsx`
- generic unit tests for all components, e.g. `react-ssr-wrapper.spec.tsx`

##### `components-react/projects/next-js`

- vrt pages are generated automatically via `generateVRTPages.ts` but fixtures are separate because we are
  screenshotting the server side rendered pages with disabled javascript, e.g. `vrt/specs/button.vrt.ts`

##### `components-react/projects/remix`

- vrt pages are generated automatically via `generateVRTPages.ts` but only `overview.tsx` and fixtures are shared with
  projects/next-js and have to match, e.g. `vrt/specs/overview.vrt.ts`
