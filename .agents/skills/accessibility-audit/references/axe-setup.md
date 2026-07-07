# axe-core Setup for AI Agent Audits

## Mandatory: local axe injection (never CDN on CSP sites)

Many applications block third-party script injection via Content-Security-Policy. **Do not** load axe from a CDN when auditing PDS storefront or production-like apps.

### Option A — `@axe-core/playwright` (recommended in Node/CI)

When running Playwright scripts from the project:

```typescript
import { AxeBuilder } from '@axe-core/playwright';

const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
  .analyze();
```

### Option B — Playwright MCP with local `axe-core`

Inject from `node_modules` after navigating to the page:

```javascript
// 1. Read axe source from local install (agent runs in project root)
// path: node_modules/axe-core/axe.min.js

// 2. Inject via page.evaluate
await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });

// 3. Run scan
const results = await page.evaluate(async () => {
  // @ts-expect-error axe injected globally
  return await axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
  });
});
```

If `node_modules` is not at repo root, resolve path from the app's package directory.

### Option C — `fs.readFileSync` + `page.evaluate` (MCP without file path support)

```javascript
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
await page.evaluate((source) => {
  const script = document.createElement('script');
  script.textContent = source;
  document.head.appendChild(script);
}, axeSource);
// wait briefly, then run axe.run as above
```

## PDS `componentsReady()` — wait before every scan

PDS web components render asynchronously. Always wait before axe, focus, or structure audits:

```javascript
await page.evaluate(() =>
  window.componentsReady?.() ?? Promise.resolve()
);
```

In Playwright test fixtures, call `componentsReady()` after `goto` and before axe runs.

## Scan configuration (align with PDS CI)

| Setting | Value |
| ------- | ----- |
| Tags | `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice` |
| Viewports | Mobile ~320px, desktop ~768px (or project breakpoints) |
| Themes | Light and dark if supported |
| Exclude | `iframe` (third-party embeds) |

## Before each scan

- Always scroll to the bottom of each page to ensure lazy-loaded content is present.
- Add  timeouts or wait for `networkidle` to ensure all content is loaded before running axe.

## Viewport and theme matrix

For each URL, scan:

1. Mobile + light
2. Mobile + dark 
3. Desktop + light
4. Desktop + dark 

Toggle dark mode via app UI or:

```javascript
await page.emulateMedia({ colorScheme: 'dark' });
```

## Incomplete results — triage, do not ignore

Common PDS false positives:

| Rule | Cause | Action |
| ---- | ----- | ------ |
| `aria-valid-attr-value` | Closed `p-select` / `p-combobox` | Open widget or verify `aria` prop; document if host-only |
| `color-contrast` | Shadow DOM, sidebar links under overlay | Verify visually; document if passes manual check |
| `landmark-unique` | Multiple `nav` regions | Add `aria-label` to distinguish |

## Install dependencies (product teams)

```bash
npm install -D @axe-core/playwright axe-core @playwright/test
npx playwright install chromium
```

## Troubleshooting

| Error | Fix |
| ----- | --- |
| CSP blocks CDN script | Use local injection (this guide) |
| `axe is not defined` | Wait for script injection; check path |
| `__name is not defined` in evaluate | Inline logic in `page.evaluate` callback; avoid passing nested functions from tsx |
| Zero violations but page looks broken | Call `componentsReady()`; wait for `networkidle` |
| Different results vs CI | Match tags, viewport, theme, and URL exactly |
