# AGENTS.md — Components Package

> This file provides context for AI coding assistants working in `packages/components/`.
> See the root [`AGENTS.md`](../../AGENTS.md) for project-wide guidance.

## Overview

This package contains the **Porsche Design System Web Components** built with Stencil and styled with JSS. These are the source-of-truth components that get wrapped for Angular, React, and Vue.

## File Structure (per component)

```
src/components/{name}/
├── {name}.tsx           # Stencil component
├── {name}-styles.ts     # JSS styles
├── {name}-utils.ts      # Utility functions
├── {name}.spec.ts       # Unit tests
├── {name}-styles.spec.ts # Spec files for Unit Testing styles
├── {name}-utils.spec.ts # Spec files for Unit Testing utils
└── {name}.props.md      # Props documentation (auto-generated)
```

## Commands

```bash
# Start dev server
yarn start:components

# Build components
yarn build:components

# Run unit tests
yarn test:unit:components

# Run specific test file
yarn test:unit:components -- {name}.spec.ts
```

## Accessibility Contract (WCAG 2.2 AA)

When adding or updating a component:

| Requirement   | Must                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **Keyboard**  | Component is fully operable via keyboard, including all interactive parts in Shadow DOM |
| **Focus**     | Visible focus ring follows PDS focus styling (`getFocusBaseStyles()`)             |
| **HCM**       | Component is usable in Windows High Contrast Mode (`forced-colors: active`)       |
| **ARIA**      | Only add ARIA required by the pattern; ensure correct role/name/value updates     |
| **Semantics** | Use native HTML elements inside Shadow DOM where possible (`button`, `input`, `a`, etc.) |

## Focus Styles (Mandatory)

**Do not invent custom focus rings.** Import and use the shared helper:

```ts
import { getFocusBaseStyles } from '../../styles/common-styles';

// Apply to :focus-visible
'&:focus-visible': getFocusBaseStyles()
```

Source: [`src/styles/common-styles.ts`](src/styles/common-styles.ts)

### Guidelines

- Prefer `:focus-visible` over `:focus`
- Never remove focus without providing a compliant replacement
- If you use pseudo-elements for focus (e.g., `::before`), ensure it remains visible in forced-colors
- Do not use `outline: none` without an alternative indicator

## High Contrast Mode (Mandatory)

This repo supports HCM and runs visual regression tests for it.

### Utilities

| Utility                              | Location                                              | Usage                          |
| ------------------------------------ | ----------------------------------------------------- | ------------------------------ |
| `forcedColorsMediaQuery()`           | `src/styles/media-query/forced-colors-media-query.ts` | Wrap HCM-specific CSS in JSS   |

### Rules

- In `@media (forced-colors: active)`, don't rely on semi-transparent borders/shadows for essential affordances
- Ensure focus indicator remains visible and not clipped
- Do not use `forced-color-adjust: none` unless implementing a correct alternative

## ARIA Helpers

Prefer existing internal helpers rather than new ad-hoc code:

| Helper                      | Location                |
| --------------------------- | ----------------------- |
| `setAriaAttributes()`       | `src/utils/a11y/a11y.ts` |
| `parseAndGetAriaAttributes()` | `src/utils/a11y/a11y.ts` |
| `getHiddenTextJssStyle()`   | `src/styles/common-styles.ts` |

For custom widgets, follow [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) and implement the full keyboard interaction model (e.g., arrow keys for tabs, `Escape` to close overlays).

## Testing Expectations

When behavior/markup changes, add or update tests consistent with this repo.

### Test Locations

| Test Type          | Location                                                    | What It Validates                     |
| ------------------ | ----------------------------------------------------------- | ------------------------------------- |
| Unit tests         | `src/components/{name}/{name}.spec.ts`                      | Component logic, utils                |
| Axe-core           | `../components-js/tests/a11y/specs/axe-core/`               | WCAG violations via automated scan    |
| A11y tree snapshots | `../components-js/tests/a11y/specs/a11ytree/`              | Accessibility tree structure          |
| HCM VRT            | `../components-js/tests/vrt/specs/`                         | Visual appearance in forced-colors    |
| Text zoom VRT      | `../components-js/tests/vrt/specs/`                         | Appearance at 200% text zoom          |

### Before Finishing, Verify

- [ ] Keyboard navigation works end-to-end
- [ ] Focus ring matches `getFocusBaseStyles()` behavior
- [ ] `forced-colors: active` still shows all states and focus
- [ ] Axe-core and a11y tree tests pass
- [ ] Unit tests pass: `yarn test:unit:components`

## Component Conventions

- **Tag prefix**: All components use `p-` prefix (e.g., `p-button`, `p-modal`)
- **Props**: Use feature-based naming, not action-based (e.g., `compact` not `enableCompact`)
- **Boolean props**: Default to `false`, use positive naming (e.g., `disabled` not `notEnabled`)
- **Styles**: Import from `../../styles/common-styles.ts` for focus, transitions, etc.

## Common Imports

```ts
// Styles
import { getFocusBaseStyles, getHiddenTextJssStyle } from '../../styles/common-styles';
import { forcedColorsMediaQuery } from '../../styles/media-query/forced-colors-media-query';

// A11y utilities
import { setAriaAttributes, parseAndGetAriaAttributes } from '../../utils/a11y/a11y';
```

