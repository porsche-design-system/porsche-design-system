---
globs: "**/*.{tsx,ts,vue,html,css,scss,mdx}"
---

# Accessibility (Cross-Cutting — WCAG 2.2 AA)

These requirements apply to all frontend code: Stencil components, framework wrappers, storefront, docs examples.

## Non-Negotiable Requirements

1. **Meet WCAG 2.2 AA** compliance
2. **Full keyboard access**: no mouse-only interactions, no keyboard traps
3. **Visible focus** for all interactive elements
4. **High Contrast Mode** / `forced-colors` support
5. **Prefer PDS primitives** (`p-` prefixed components) over custom widgets

If a request conflicts with these requirements, prioritize accessibility and propose an accessible alternative.

## Focus Styling

Use the shared helper — **do not invent custom focus rings**:

```ts
import { getFocusBaseStyles } from '../../styles/common-styles';

// In JSS style object:
'&:focus-visible': getFocusBaseStyles()    // default 2px offset
'&:focus-visible': getFocusBaseStyles(0)   // 0px offset
```

`getFocusBaseStyles(offset)` produces:
```ts
{
  outline: '2px solid ${colorFocus}',
  outlineOffset: '${offset}px',
  '@media (forced-colors: active)': {
    outlineColor: 'Highlight',
  },
}
```

Rules:
- Always use `:focus-visible`, never `:focus`
- Never use `outline: none` without an accessible replacement
- If using pseudo-elements for focus (e.g., `::before`), ensure visibility in forced-colors
- Source: `packages/components/src/styles/common-styles.ts`

## High Contrast Mode (HCM)

```ts
import { forcedColorsMediaQuery } from '../../styles/media-query/forced-colors-media-query';

// In JSS style object:
...forcedColorsMediaQuery({
  outlineColor: 'Highlight',
  borderColor: 'ButtonText',
})
```

Rules:
- Don't rely on shadows or semi-transparent borders for essential affordances
- Don't use `forced-color-adjust: none` unless implementing a correct alternative
- Ensure focus indicator remains visible and not clipped
- Use system colors: `Highlight`, `HighlightText`, `ButtonText`, `GrayText`, `Canvas`, `CanvasText`

## Disabled State Styling

```ts
import { getDisabledBaseStyles } from '../../styles/common-styles';

// In JSS:
...(isDisabled && {
  ...getDisabledBaseStyles({
    '&': { boxShadow: 'inset 0 0 0 2px GrayText !important' },  // optional HCM override
  }),
})
```

Produces `opacity: alphaDisabled` with forced-colors fallback to `GrayText`.

## ARIA Helpers

| Helper | Location | Purpose |
|--------|----------|---------|
| `setAriaAttributes()` | `src/utils/a11y/a11y.ts` | Set ARIA attributes on elements |
| `parseAndGetAriaAttributes()` | `src/utils/a11y/a11y.ts` | Parse PDS `aria` prop to HTML attributes |
| `getHiddenTextJssStyle()` | `src/styles/common-styles.ts` | Visually hidden but screen-reader-accessible text |

Component-specific ARIA modules:
- `src/utils/a11y/button/` — button ARIA patterns
- `src/utils/a11y/link/` — link ARIA patterns
- `src/utils/a11y/select/` — select/combobox ARIA patterns

## ARIA with PDS Components

Use the component's `aria` prop — never place `aria-*` directly on the host:

```tsx
// React
<PButton aria={{ 'aria-label': 'Close' }}>X</PButton>

// Angular
<p-button [aria]="{ 'aria-label': 'Close' }">X</p-button>

// Vue
<PButton :aria="{ 'aria-label': 'Close' }">X</PButton>
```

## Semantics First

- Use native HTML elements inside shadow DOM: `button`, `a`, `input`, `select`, `details/summary`, `dialog`
- Don't re-implement common patterns with `div`/`span` + ARIA roles
- Headings and landmarks (`header`, `nav`, `main`, `footer`) must maintain logical order
- Never skip heading levels

## Accessible Names

Every interactive element must have an accessible name via one of:
- Visible text content
- `<label>` element (for form controls)
- `aria-label`
- `aria-labelledby`

Icons: decorative icons use `aria-hidden="true"`. Meaningful icons need an accessible name.

## Overlays and Dialogs

- Move focus into overlay on open
- Restore focus to trigger on close
- No positive `tabindex` — tab order follows DOM order
- `Escape` key closes the overlay

## Forms

- `aria-invalid="true"` for invalid controls
- Connect error messages via `aria-describedby` / `aria-errormessage`
- Use `aria-live` sparingly and only for truly dynamic announcements

## Motion and Zoom

- Respect `prefers-reduced-motion` media query
- Content must remain usable at **200% zoom**

## Testing Checklist

Before finishing any UI work:

- [ ] Can this be done with **keyboard only**?
- [ ] Is focus **always visible**?
- [ ] Does every control have an **accessible name**?
- [ ] Does `forced-colors: active` show all states and focus correctly?
- [ ] Are ARIA attributes correct and necessary (not conflicting with native semantics)?
- [ ] Is content usable at 200% zoom?
