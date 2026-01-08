---
applyTo: "packages/components/**"
---

# Components Package Instructions

This package contains the **Porsche Design System Web Components** (Stencil/JSS). Generated work here must preserve existing PDS accessibility behavior and styling.

## Accessibility contract (WCAG 2.2 AA)

When adding or updating a component:

| Requirement | Must |
|-------------|------|
| **Keyboard** | Component is fully operable via keyboard, including all interactive parts in Shadow DOM. |
| **Focus** | Visible focus ring follows **PDS focus styling** (`getFocusBaseStyles()`). |
| **HCM** | Component is usable in Windows High Contrast Mode (`forced-colors: active`). |
| **ARIA** | Only add ARIA required by the pattern; ensure correct role/name/value updates. |
| **Semantics** | Use native HTML elements inside Shadow DOM where possible (`button`, `input`, `a`, etc.). |

---

## PDS focus styles (mandatory)

**Do not invent custom focus rings.**

Import and use the shared helper:

```ts
import { getFocusBaseStyles } from '../../styles/common-styles';

// Apply to :focus-visible
'&:focus-visible': getFocusBaseStyles()
```

Source: `packages/components/src/styles/common-styles.ts`

### Guidelines

- Prefer `:focus-visible` over `:focus`.
- Never remove focus without providing a compliant replacement.
- If you use pseudo-elements for focus (e.g., `::before`), ensure it remains visible in forced-colors.
- Do not use `outline: none` without an alternative indicator.

---

## High Contrast Mode (mandatory)

This repo already supports HCM and runs visual regression tests for it.

### Utilities

| Utility | Location | Usage |
|---------|----------|-------|
| `forcedColorsMediaQuery()` | `packages/components/src/styles/media-query/forced-colors-media-query.ts` | Wrap HCM-specific CSS in JSS. |
| `getSchemedHighContrastMediaQuery()` | `packages/components/src/styles/media-query/schemed-high-contrast-media-query.ts` | Light/dark HCM variants. |
| `isHighContrastMode` | `packages/components/src/utils/a11y/a11y.ts` | JS-only detection (use sparingly). |

### Rules

- In `@media (forced-colors: active)`, don't rely on semi-transparent borders/shadows for essential affordances.
- Ensure focus indicator remains visible and not clipped.
- Do not use `forced-color-adjust: none` unless implementing a correct alternative.

---

## ARIA helpers and patterns

Prefer existing internal helpers rather than new ad-hoc code:

| Helper | Location |
|--------|----------|
| `setAriaAttributes()` | `packages/components/src/utils/a11y/a11y.ts` |
| `parseAndGetAriaAttributes()` | `packages/components/src/utils/a11y/a11y.ts` |
| `getHiddenTextJssStyle()` | `packages/components/src/styles/common-styles.ts` |

For custom widgets, follow [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) and implement the *full* keyboard interaction model (e.g., arrow keys for tabs, `Escape` to close overlays).

If you can use native HTML semantics inside the web component, do so.

---

## Testing expectations

When behavior/markup changes, add or update tests consistent with this repo.

### Existing test patterns

| Test type | Location | What it validates |
|-----------|----------|-------------------|
| **Axe-core** | `packages/components-js/tests/a11y/specs/axe-core/components.a11y.ts` | WCAG violations via automated scan. |
| **A11y tree snapshots** | `packages/components-js/tests/a11y/specs/a11ytree/components.a11y.ts` | Accessibility tree structure. |
| **HCM VRT** | `packages/components-js/tests/vrt/specs/common/components.vrt.ts` | Visual appearance in forced-colors. |
| **Text zoom VRT** | (same VRT suite) | Appearance at 200% text zoom. |

### Before finishing, verify

- [ ] Keyboard navigation works end-to-end.
- [ ] Focus ring matches `getFocusBaseStyles()` behavior.
- [ ] `forced-colors: active` still shows all states and focus.
- [ ] Axe-core and a11y tree tests pass.

