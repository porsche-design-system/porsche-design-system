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
  - Unit Tests (Unit)
  - End-to-End Tests (E2E)
  - Accessibility Tests (A11y)
  - Visual Regression Tests (VRT)
  - Smoke Tests (Smoke)
  - Unit Tests for/with jsdom-polyfill (if modern browser APIs are used that are not available in jsdom)
- Accessibility compliance
  - WCAG 2.2 level AA (A11y)
  - High Contrast Mode (A11y)
  - 200% Text Zoom Support (VRT)
- Auto Dark Theme Support (VRT)
- LTR/RTL (left-to-right/right-to-left) Support (VRT)
- SSR Support for Next.js and Remix (VRT)
- Components are available on UXPin
- Security vulnerability scan passes (CodeQL of GitHub)
- Cross Browser Support (last 2 stable versions of Chrome, Edge, Firefox, iOS and macOS Safari)
- Documentation updated
- Changelog updated
- Design reviewed
- Code reviewed

## Potential Future Criteria

- Print Support (VRT)
- Component a11y tests via axe-core (E2E)

## Legend

- Unit: Unit Test with `Vitest` (**environment:** `node` and/or `jsdom`)
- E2E: End-to-end Test with `Playwright` (**environment:** `Chromium`, `WebKit` and `Firefox`)
- A11y: Accessibility Test with `Playwright` (**environment:** `Chromium`) and `Axe Core`
- VRT: Visual Regression Test with `Playwright` (**environment:** `Chromium` and `WebKit`)
- Smoke: Smoke Test with `Vitest` (**environment:** `node`) and/or `Playwright` (**environment:** `Chromium`)
