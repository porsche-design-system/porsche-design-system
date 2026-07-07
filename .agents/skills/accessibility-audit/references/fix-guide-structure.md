# Fix Guide — Page Structure

## When to use

axe rules: `page-has-heading-one`, `heading-order`, `landmark-one-main`, `region`, `document-title`, `html-has-lang`

## Required structure

```html
<html lang="en">
  <head><title>Meaningful page title</title></head>
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header>...</header>
    <nav aria-label="Primary">...</nav>
    <main id="main-content">...</main>
    <footer>...</footer>
  </body>
</html>
```

## Heading rules

- One `h1` per page (main topic)
- No skipped levels (`h1` → `h3` without `h2`)
- Use `p-heading` with correct `tag` — structure, not visual size

## Landmarks

| Landmark | When |
| -------- | ---- |
| `header` | Site or section header |
| `nav` | Navigation; add `aria-label` if multiple |
| `main` | Primary content (one per page) |
| `footer` | Site or section footer |
| `aside` | Complementary content |

## Page sections

| Section | When |
| -------- | ---- |
| `section` | Content section; add `aria-label` if multiple sections are present |
| `article` | Self-contained content block; add `aria-label` if multiple articles are present |

## PDS carousel skip

Large `p-carousel` blocks need `skip-link-target` — see `pds-integration-checks.md`.

## Verify

- Re-run structure check via Playwright MCP
- axe heading and landmark rules pass or documented false positive
