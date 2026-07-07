# PDS Integration Checks

Detect → fix → verify for the top integration anti-patterns from [Accessibility: Do's and Don'ts](https://designsystem.porsche.com/v4/must-know/accessibility/dos-and-donts/).

## 1. ARIA on PDS component host vs `aria` prop

**WCAG:** 4.1.2 Name, Role, Value

### Detect

**Static (step 1):**

```bash
# React/TSX — aria-* on PDS host elements
rg '<(p-[a-z-]+)[^>]*\saria-[a-z]' --glob '*.{tsx,jsx,vue}' -n
```

**Runtime (step 2a):**

- axe `aria-valid-attr-value` on closed widgets (`p-select`, `p-combobox`, `p-multi-select`)
- Host element shows `aria-*` in DevTools but behavior unchanged

### Fix

❌ Anti-pattern:

```jsx
<PButton aria-haspopup="dialog" aria-label="Open details about the product">
  Open details
</PButton>
```

✅ Recommended:

```jsx
<PButton aria={{ 'aria-haspopup': 'dialog', 'aria-label': 'Open details about the product' }}>
  Open details
</PButton>
```

### Verify

- Re-run axe on the page; `aria-valid-attr-value` incomplete/violations resolved
- Inspect shadow DOM: ARIA applied to internal control, not host

---

## 2. Icon-only controls without accessible names

**WCAG:** 4.1.2, 2.4.4

### Detect

**Static (step 1):**

```bash
# Icon-only p-link or p-button without label/aria
rg '<(p-link|p-button)[^>]*icon=' --glob '*.{tsx,jsx,vue}' -n
```

Review each match for visible text, `hide-label` + text content, or `aria={{ 'aria-label': '...' }}`.

**Runtime (step 2a):**

- axe `button-name`, `link-name`

### Fix

❌ Anti-pattern:

```jsx
<PLink icon="arrow-right" href="https://example.com" />
```

✅ Recommended:

```jsx
<PLink icon="arrow-right" hide-label href="https://example.com">
  View details
</PLink>

// or contextual SR label
<PLink
  icon="arrow-right"
  hide-label
  aria={{ 'aria-label': 'View Porsche 911 details' }}
  href="https://example.com"
>
  View details
</PLink>
```

### Verify

- axe `button-name` / `link-name` pass
- Screen reader announces meaningful name (manual spot-check)

---

## 3. Missing focus indicators on custom UI

**WCAG:** 2.4.7 Focus Visible

### Detect

**Static (step 1):**

```bash
rg 'outline:\s*none|outline:\s*0' --glob '*.{css,scss,ts,tsx}' -n
rg ':focus(?!-visible)' --glob '*.{css,scss,ts}' -n
```

**Runtime (step 2b):**

- Tab through interactive elements; focus visibility probe flags `missing-indicator`

### Fix

- Use PDS `p-*` components where possible (built-in focus styles)
- Custom elements: `:focus-visible` with visible outline or box-shadow
- Follow PDS focus styling guidance: [Focus styles](https://designsystem.porsche.com/v4/emotion/focus/)
- Never `outline: none` without an accessible alternative
- Support `@media (forced-colors: active)`

### Verify

- Focus visibility audit passes (step 2b)
- Tab through control shows visible ring in light and dark themes

---

## 4. Large carousel without skip behavior

**WCAG:** 2.4.1 Bypass Blocks, 2.1.1 Keyboard

### Detect

**Static (step 1):**

```bash
rg '<p-carousel(?![^>]*skip-link-target)' --glob '*.{tsx,jsx,vue,html}' -n
```

**Runtime (step 2c, 2d):**

- Tab through carousel: many stops before next content section
- No skip link appears at carousel start

### Fix

❌ Anti-pattern:

```jsx
<PCarousel>{/* many slides */}</PCarousel>
<PHeading tag="h2">Next section</PHeading>
```

✅ Recommended:

```jsx
<PCarousel skip-link-target="#next-section">{/* many slides */}</PCarousel>
<PHeading tag="h2" id="next-section">Next section</PHeading>
```

Skip target must point to the next meaningful element after the carousel.

### Verify

- Tab from carousel start reaches skip link quickly
- Activating skip moves focus to target element

---

## 5. Wrong heading hierarchy or missing landmarks

**WCAG:** 1.3.1, 2.4.6

### Detect

**Static (step 1):**

- Review page templates for `<main>`, `<nav>`, `<header>`, `<footer>`
- Check `p-heading` `tag` props follow logical order

**Runtime (step 2c):**

- axe `page-has-heading-one`, `heading-order`
- Structure audit: multiple `h1`, skipped levels, missing `main`

### Fix

- One `h1` per page (or per main view in SPAs)
- Logical order: `h1` → `h2` → `h3` (no skipping levels)
- Use semantic landmarks: `header`, `nav`, `main`, `footer`
- Use `p-heading` with correct `tag` — not visual size alone
- Add `aria-label` or `aria-labelledby` to landmarks when needed

### Verify

- Structure audit passes
- axe heading rules pass or documented false positive

---

## Before-merge checklist (integration)

- [ ] Component [Accessibility tab](https://designsystem.porsche.com/v4/components/button/accessibility/) reviewed for each PDS component used
- [ ] All interactive controls keyboard reachable and operable
- [ ] Focus indicators visible; PDS focus styling referenced for custom UI
- [ ] Icon-only actions have accessible names
- [ ] ARIA passed via supported PDS APIs (`aria` prop)
- [ ] Repeated blocks have skip strategy when needed
- [ ] Semantic structure and logical heading order maintained
