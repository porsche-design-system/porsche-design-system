# Page Structure Audit (step 2c)

Run after axe scan. Checks landmarks, headings, metadata, and skip links.

Use **Playwright MCP** `page.evaluate` — works in any PDS product.

## Framework note

Inspect the **rendered DOM**, not framework source syntax. PDS wrappers (React `PHeading`, Angular `p-heading`, Vue `PHeading`, etc.) output custom elements whose tag names follow `p-*` or `{team-prefix}-p-*` when a [custom prefix](https://designsystem.porsche.com/v4/developing/react/advanced/) is configured (e.g. `sample-prefix-p-heading`).

**Heading checks are prefix-agnostic** — `p-heading` / `{prefix}-p-heading` render semantic `h1`–`h6` inside shadow DOM; the walker finds those tags directly.

**Carousel checks** resolve the canonical PDS component name from the host tag (same pattern as PDS internals), so prefixed hosts are included.

```javascript
// Matches p-carousel, sample-prefix-p-carousel, etc.
const PDS_HOST_TAG = /^(?:[a-z0-9-]+-)?(p-[a-z-]+)$/i;
const getPdsTagName = (el) => PDS_HOST_TAG.exec(el.tagName)?.[1]?.toLowerCase() ?? null;
```

No React/Angular/Vue-specific selectors are needed. A flat `document.querySelectorAll('h1,…')` misses PDS headings in shadow DOM — the script walks light DOM **and** open shadow roots in document order.

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

  // Walk light DOM + open shadow roots in document order (framework- and prefix-agnostic)
  function* walkElements(root) {
    for (const child of root.children) {
      yield child;
      if (child.shadowRoot) yield* walkElements(child.shadowRoot);
      yield* walkElements(child);
    }
  }

  // PDS host tags: p-carousel or {prefix}-p-carousel (see Framework note)
  const PDS_HOST_TAG = /^(?:[a-z0-9-]+-)?(p-[a-z-]+)$/i;
  const getPdsTagName = (el) => PDS_HOST_TAG.exec(el.tagName)?.[1]?.toLowerCase() ?? null;

  const headingLevels = [];
  let totalH1 = 0;
  const carousels = [];

  for (const el of walkElements(document.body)) {
    const pdsTag = getPdsTagName(el);
    if (pdsTag === 'p-carousel') carousels.push(el);

    const match = el.tagName.match(/^H([1-6])$/);
    if (!match) continue;
    const level = parseInt(match[1], 10);
    headingLevels.push(level);
    if (level === 1) totalH1++;
  }

  if (totalH1 === 0) issues.push({ rule: 'page-has-heading-one', message: 'No page heading found' });
  if (totalH1 > 1) issues.push({ rule: 'page-has-heading-one', message: `Multiple h1 (${totalH1})` });

  let lastLevel = 0;
  for (const level of headingLevels) {
    if (lastLevel > 0 && level > lastLevel + 1) {
      issues.push({ rule: 'heading-order', message: `Skipped level after h${lastLevel}: h${level}` });
    }
    lastLevel = level;
  }

  const mains = [...document.querySelectorAll('main, [role="main"]')];
  if (mains.length === 0) issues.push({ rule: 'landmark-one-main', message: 'No main landmark' });
  if (mains.length > 1) issues.push({ rule: 'landmark-one-main', message: `Multiple main (${mains.length})` });

  const hasSkipLink = [...document.querySelectorAll('a[href^="#"]')].some((a) => /skip/i.test(a.textContent || ''));

  for (const c of carousels) {
    if (!c.hasAttribute('skip-link-target')) {
      const tag = c.tagName.toLowerCase();
      issues.push({ rule: 'bypass-blocks', message: `${tag} without skip-link-target` });
    }
  }

  return { issues, hasSkipLink, lang, title, h1Count: totalH1, mainCount: mains.length };
});
```

## PDS patterns to accept

| Pattern | DOM output | Valid as |
| ------- | ---------- | -------- |
| `<PHeading tag="h1">` with default or custom prefix | `p-heading` or `{prefix}-p-heading` host + `h1` in shadow | One page heading |
| `<main>` | Light DOM landmark | Main landmark |
| `<PCarousel skip-link-target="#target">` | `p-carousel` or `{prefix}-p-carousel` with `skip-link-target` | Carousel skip strategy |

## Custom prefix and static scans

Runtime structure checks above do **not** need the team prefix configured — heading semantics come from shadow `h1`–`h6`; carousel hosts are matched by suffix `p-carousel`.

For **static** grep in step 1 (`pds-integration-checks.md`), source may show `PHeading` / `PCarousel` while DOM uses prefixed tags. Options:

1. **Infer prefix from provider config** — e.g. `PorscheDesignSystemProvider prefix="sample-prefix"` → grep for `sample-prefix-p-carousel`
2. **Record prefix in audit scope** — add optional `pdsPrefix` to `.accessibility-audit-plan.json` `scope` when known
3. **Rely on runtime scans** — axe + structure audit (steps 2a, 2c) catch integration issues without static tag names

## Pass criteria

- `lang` on `<html>`
- Non-empty `<title>`
- One page heading (`h1` in light or shadow DOM)
- No skipped heading levels (shadow-aware)
- One main landmark (`main`, `[role="main"]`)
- Skip link when page has long nav sidebars or carousel blocks

## Fix guide

See `fix-guide-structure.md` and `pds-integration-checks.md` (carousel skip).
