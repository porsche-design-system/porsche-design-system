---
applyTo: "**/*.{html,css,scss,js,ts,tsx,jsx,vue,mdx,md}"
---

# Porsche Design System (PDS) – Accessibility Instructions

These instructions apply to **all frontend code** generated for this repository (Stencil components, wrappers, storefront, docs examples).

## Non‑negotiable requirements (WCAG 2.2 AA)

When generating or modifying UI code:

1. **Meet WCAG 2.2 AA**.
2. **Full keyboard access**: no mouse-only interactions, no keyboard traps.
3. **Visible focus** for all interactive elements.
4. **High Contrast Mode** / `forced-colors` support.
5. **Prefer PDS primitives** (web components + wrappers) over custom widgets.

If a request conflicts with these requirements, prioritize accessibility and propose an accessible alternative.

## Repository-specific guidance

### Developing Core Components (Internal)

- **Utils**: When building Stencil components, use helpers from `packages/components/src/utils/a11y/a11y.ts`.
- **Styles**: Import shared focus styles from `styles/common-styles.ts` to maintain consistency.

### Prefer PDS components

- Use the existing PDS components (`p-` prefixed web components, wrappers in `@porsche-design-system/components-{react|angular|vue}`) whenever possible.
- Don’t re-implement common patterns (button, link, tabs, accordion, modal, toast, form controls) with custom `div`/`span` widgets.

### ARIA with PDS components

- Use ARIA only when needed. Never add ARIA that conflicts with native semantics.
- If a PDS component needs extra ARIA, pass it via the component’s **`aria` prop** (per PDS conventions/documentation).
- Avoid placing `aria-*` attributes on a PDS component `:host` as a workaround.

### Focus styling in this repo

- **Do not remove focus indicators** (avoid global `outline: none`).
- Preserve existing PDS focus styling. Only introduce custom focus rings when a non-PDS element requires it.
- Prefer `:focus-visible` over `:focus`.

### Overlays, dialogs, and popovers

- When opening an overlay (modal/dialog/popover/menu), move focus into it.
- When closing, restore focus to the trigger.
- Avoid positive `tabindex`; keep tab order consistent with DOM order.

### Semantics first

- Prefer native elements (`button`, `a`, `input`, `select`, `details/summary`, `dialog`) over custom roles.
- Use headings and landmarks correctly (`header`, `nav`, `main`, `footer`). Maintain heading order.

### Accessible name, role, value

- Every interactive element must have an accessible name via one of:
  - visible text,
  - `<label>` (for form controls),
  - `aria-label`, or
  - `aria-labelledby`.
- Icons:
  - If purely decorative, hide from assistive tech.
  - If meaningful, provide an accessible name (or ensure adjacent text covers it).

### Forms: errors and status

- Errors must be visible and programmatically conveyed:
  - `aria-invalid="true"` for invalid controls,
  - connect messages via `aria-describedby` and/or `aria-errormessage`.
- Use `aria-live` sparingly and only for truly dynamic announcements.

### High Contrast Mode / forced colors

- Ensure UI remains usable with `@media (forced-colors: active)`.
- Don’t rely on subtle shadows or background images for affordances.
- Don’t disable forced-color adjustments unless implementing a correct alternative.

### Motion and zoom

- Respect `prefers-reduced-motion`.
- Ensure content remains usable at **200% zoom**.

## Testing expectations (use existing repo tooling)

When you change UI behavior:

- Add/adjust **unit tests (Vitest)** where available.
- For user flows, prefer **Playwright e2e/a11y** checks used in this repo.
- Keep tests minimal but meaningful (happy path + 1 accessibility edge).

## Quick self-check before finishing

- Can this be done with **keyboard only**?
- Is focus **always visible**?
- Does every control have an **accessible name**?
- Does it work in **forced-colors**?
- Is any ARIA used **correct and necessary**?
