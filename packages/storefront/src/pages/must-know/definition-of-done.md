# Definition Of Done

We value high quality and transparency.  
Thus we consider a task or ticket only done when all of the following criteria are fulfilled as our **Definition of
Done** (DOD).

<TableOfContents></TableOfContents>

## Current Criteria

- Unit tests (in node/jsdom)
- End-to-End Tests (E2E, via puppeteer in Chrome)
  - relevant functionality
  - a11y compliance (a11y tree snapshots)
- Visual Regression Tests (VRT, via Puppeteer in Chromium (Chrome) and Playwright in WebKit (Safari))
  - different prop configurations per component
  - :hover, :focus and :hover:focus states
  - high contrast mode
  - 200% text zoom support
- Unit tests for/with jsdom-polyfill (if modern browser APIs are used that are not available in jsdom)
- SSR support for Next.js and Remix (unit tested, and visually tested via puppeteer in Chrome with disabled JavaScript)
- Smoke tests (if adding new assets to our CDN)
- Security vulnerability scan passes (CodeQL of GitHub)
- Cross Browser Support (last 2 stable versions of Chrome, Edge, Firefox, iOS and macOS Safari)
- Documentation updated
- Changelog updated
- Code reviewed (via pull request)

## Potential Future Criteria

- Auto Dark Theme Support (VRT)
- Print Support (VRT)
- Component a11y tests via axe-core (E2E)
