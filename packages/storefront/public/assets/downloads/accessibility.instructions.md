---
applyTo: "**/*.{html,css,scss,js,ts,tsx,jsx,vue,mdx,md}"
---

# Accessibility Instructions

These instructions apply to **all frontend code** generated for this repository.

## Non-negotiable accessibility requirements

When generating or modifying any frontend code:

1. **Must comply with WCAG 2.2 AA.**
2. **Must be fully keyboard accessible** (no mouse-only interactions, no keyboard traps).
3. **Must provide visible focus** for all interactive elements.
4. **Must support High Contrast Mode (HCM)** / forced-colors.
5. **Must preserve Porsche Design System (PDS) focus styling** where PDS components/styles are used (do not invent new focus rings unless required).

If a request conflicts with these requirements, prioritize accessibility and propose an accessible alternative.

## Default implementation rules

### Semantics first

- Prefer **native HTML elements** (`button`, `a`, `input`, `select`, `details/summary`, `dialog`, etc.) over custom div/span widgets.
- Use correct landmarks (`header`, `nav`, `main`, `footer`) and maintain a consistent heading order.

### Accessible name, role, value

- Every interactive element **must have an accessible name** via one of:
  - visible text content,
  - `<label>` (for form controls),
  - `aria-label`, or
  - `aria-labelledby`.
- Use ARIA only when necessary; never add ARIA that conflicts with native semantics.
- If a Porsche Design System component needs extra ARIA attributes, add them according to PDS documentation via the `aria` prop.
- Ensure icons have accessible names if they convey meaning and are not followed by adjacent text.

### Keyboard interactions

- Everything interactive must be reachable via **Tab** and operable via keyboard.
- Use standard key mappings:
  - `Enter` / `Space` activate buttons.
  - Arrow keys for roving focus patterns (tabs, radio groups, menus) only when you truly implement that widget pattern.
- Don't remove focus outlines globally; avoid `outline: none` unless replacing with a compliant focus indicator.

### Focus management

- Use `:focus-visible` (not `:focus`) for focus rings where possible.
- Maintain logical tab order (DOM order) unless there is a strong reason; avoid positive `tabindex`.
- When opening overlays/modals/menus, move focus into the region and return focus to the trigger on close.

### High Contrast Mode / forced-colors

- Ensure UI is usable with `@media (forced-colors: active)`.
- Avoid relying solely on background images or subtle box-shadows for affordances.
- Don't disable forced-color adjustments unless you are implementing a correct alternative.

### Color contrast and non-color cues

- Text and essential icons must meet contrast requirements for **AA**.
- Don't convey meaning only via color (errors/success states must have text or icon + accessible name).

### Form errors and status messages

- Errors must be visible **and** programmatically conveyed:
  - set `aria-invalid="true"` for invalid controls,
  - connect messages via `aria-describedby` / `aria-errormessage`.
- Use `aria-live` only when content truly changes dynamically and must be announced.

### Motion and zoom

- Respect reduced motion (`prefers-reduced-motion`) for non-essential animations.
- Ensure layouts work at **200% text zoom** without losing content/function.

## Porsche Design System (PDS) usage

When using Porsche Design System components:

- Use `@porsche-design-system/components-{react|angular|vue}` for UI primitives instead of building custom widgets.
- If a PDS component needs extra ARIA, use the `aria` prop according to PDS documentation.
- Preserve PDS focus styling; don't override focus rings unless absolutely required.
- Never place `aria` attributes on PDS components `:host` elements directly.
- Check PDS component documentation for accessibility best practices.

## Output expectations

When you generate UI code, also generate:

- brief inline comments explaining ARIA/keyboard decisions (only where non-obvious),
- minimal tests where the project already has patterns (e.g., axe checks / a11y tree snapshots / Playwright).

## Quick self-check (before you finish)

- Can I complete the task with **keyboard only**?
- Is focus **clearly visible** at all times?
- Does every control have a correct **accessible name**?
- Does it still work in **forced-colors** / HCM?
- Is any ARIA used correct for the implemented behavior?

