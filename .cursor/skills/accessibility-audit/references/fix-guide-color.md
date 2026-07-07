# Fix Guide — Color and Contrast

## When to use

axe rules: `color-contrast`, `link-in-text-block`, `autocomplete-valid`

## PDS rules

1. Use design tokens — do not hardcode colors that fail contrast
2. Do not rely on color alone for meaning (add icon, text, or pattern)
3. Support High Contrast Mode (`@media (forced-colors: active)`)

## Shadow DOM triage

axe may report `color-contrast` incomplete or false positives on:

- PDS components with shadow DOM (sidebar links, nested controls)
- Frosted/glass backgrounds

**Action:** Verify contrast manually with DevTools or contrast checker. Document in triage if visual pass confirmed.

## Fix patterns

### Token-based text

```jsx
<p-text color="primary">...</p-text>
```

### Forced colors

Ensure borders/outlines remain visible in HCM — use `forcedColorsMediaQuery()` helpers in PDS components.

## Verify

- axe `color-contrast` passes or documented exception
- Manual HCM check (step 7)
