# Definition Of Done

We value high quality and transparency.  
Thus we consider a task or ticket only done when all of the following criteria are fulfilled as our **Definition of
Done** (DOD).

<TableOfContents></TableOfContents>

## Current Criteria

- Respecting Porsche Brand Identity
- Code is written with
  - Semantic HTML
  - Smallest possible DOM hierarchy
  - Modern CSS techniques producing as few CSS as possible
  - Performance at runtime
  - Proper typing, abstraction, reusability and maintainability
- Code is tested with
  - Unit tests (in node/jsdom)
  - End-to-End Tests (E2E, via Puppeteer in Chromium)
  - Accessibility Tests (A11y, via Axe Core)
  - Visual Regression Tests (VRT, via Puppeteer in Chromium and Playwright in WebKit browser engines)
  - Unit tests for/with jsdom-polyfill (if modern browser APIs are used that are not available in jsdom)
  - Smoke tests (if adding new assets to our CDN)
- Accessibility compliance
  - WCAG 2.2 level AA
  - High Contrast Mode
  - 200% Text Zoom Support
- Auto Dark Theme Support
- SSR Support for Next.js and Remix
- Components are available on UXPin
- Security vulnerability scan passes (CodeQL of GitHub)
- Cross Browser Support (last 2 stable versions of Chrome, Edge, Firefox, iOS and macOS Safari)
- Documentation updated
- Changelog updated
- Design reviewed
- Code reviewed

## Potential Future Criteria

- LTR/RTL (left-to-right/right-to-left) Support (VRT)
- Print Support (VRT)
- Component a11y tests via axe-core (E2E)
