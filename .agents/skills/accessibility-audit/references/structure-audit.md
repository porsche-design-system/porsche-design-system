# Page Structure Audit (step 2c)

Run after axe scan. Checks landmarks, headings, metadata, and skip links.

Use **Playwright MCP** `page.evaluate` — works in any PDS product.

## Procedure

1. Navigate to the page; wait for load and `componentsReady()` on PDS apps
2. Run the structure check below via `page.evaluate`
3. Record issues in `.accessibility-audit-plan.json`
4. Cross-check with axe rules: `page-has-heading-one`, `heading-order`, `landmark-one-main`, `html-has-lang`, `document-title`

## Structure check (`page.evaluate`)

```javascript
// Run via Playwright MCP after page load
const result = await page.evaluate(() => {
  const issues = [];

  const lang = document.documentElement.lang?.trim();
  if (!lang) issues.push({ rule: 'html-has-lang', message: 'Missing lang on <html>' });

  const title = document.title?.trim();
  if (!title) issues.push({ rule: 'document-title', message: 'Empty <title>' });

  // Native headings
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];

  // PDS p-heading hosts
  const pLevels = [];
  for (const el of document.querySelectorAll('p-heading')) {
    const level = parseInt((el.getAttribute('tag') || '').replace(/^h/i, ''), 10);
    if (level > 0) pLevels.push(level);
  }

  const h1s = headings.filter((h) => h.tagName === 'H1');
  let pH1Count = 0;
  for (const el of document.querySelectorAll('p-heading')) {
    if ((el.getAttribute('tag') || '').toLowerCase() === 'h1') pH1Count++;
  }
  const mainHeading = document.getElementById('main-heading');
  const totalH1 = h1s.length + pH1Count + (mainHeading ? 1 : 0);

  if (totalH1 === 0) issues.push({ rule: 'page-has-heading-one', message: 'No page heading found' });
  if (totalH1 > 1) issues.push({ rule: 'page-has-heading-one', message: `Multiple h1 (${totalH1})` });

  let lastLevel = 0;
  for (const h of headings) {
    const level = parseInt(h.tagName[1], 10);
    if (lastLevel > 0 && level > lastLevel + 1) {
      issues.push({ rule: 'heading-order', message: `Skipped level after h${lastLevel}: ${h.tagName}` });
    }
    lastLevel = level;
  }

  const mains = [...document.querySelectorAll('main, [role="main"], #main-content')];
  if (mains.length === 0) issues.push({ rule: 'landmark-one-main', message: 'No main landmark' });
  if (mains.length > 1) issues.push({ rule: 'landmark-one-main', message: `Multiple main (${mains.length})` });

  const hasSkipLink = [...document.querySelectorAll('a[href^="#"]')].some((a) => /skip/i.test(a.textContent || ''));

  const carousels = [...document.querySelectorAll('p-carousel')];
  for (const c of carousels) {
    if (!c.hasAttribute('skip-link-target')) {
      issues.push({ rule: 'bypass-blocks', message: 'p-carousel without skip-link-target' });
    }
  }

  return { issues, hasSkipLink, lang, title, h1Count: totalH1, mainCount: mains.length };
});
```

## PDS patterns to accept

| Pattern | Valid as |
| ------- | -------- |
| `<PHeading tag="h1" id="main-heading">` | Page heading (may render in shadow DOM) |
| `<section id="main-content">` | Main landmark equivalent |
| `<PCarousel skip-link-target="#target">` | Carousel skip strategy |

## Pass criteria

- `lang` on `<html>`
- Non-empty `<title>`
- One page heading (`h1`, `PHeading tag="h1"`)
- No skipped heading levels
- One main landmark (`main`, `[role="main"]`)
- Skip link when page has long nav sidebars or carousel blocks

## Fix guide

See `fix-guide-structure.md` and `pds-integration-checks.md` (carousel skip).
