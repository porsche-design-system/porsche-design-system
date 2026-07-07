# Fix Guide — Keyboard and Focus

## When to use

WCAG 2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.4.11 — keyboard access, focus order, focus visibility, traps

## Automated checks (step 2b, 2d)

1. **Focus visibility** — Tab walk with computed-style probe (see `fix-guide-focus.md`)
2. **Modal traps** — Open overlay; Tab cycles inside; Escape closes; focus returns to trigger
3. **Skip links** — First Tab reaches skip link on long pages

## PDS rules

- Prefer `p-button`, `p-link`, `p-modal`, `p-tabs` over custom widgets
- Custom interactive elements need `tabindex="0"` only when no native element fits
- Use `:focus-visible`, not `:focus` alone for focus rings

## Modal / drawer checklist

- [ ] Opens on trigger activation
- [ ] Focus moves into overlay on open
- [ ] Tab trapped inside while open (or focus managed per pattern)
- [ ] Escape closes (if documented for component)
- [ ] Focus returns to trigger on close

## Verify

- Step 2b passes (no `missing-indicator` failures)
- Step 2d: no keyboard traps; focus returns after overlay close
