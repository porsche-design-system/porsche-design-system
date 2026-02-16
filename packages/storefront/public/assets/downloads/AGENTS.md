# AGENTS.md

> This file provides context for AI coding assistants working in this repository.
> See [agents.md](https://agents.md/) for the specification.

## Overview

<!-- Describe your project here -->

## Tech Stack

<!-- List your technologies -->

| Layer           | Technology |
| --------------- | ---------- |
| Package Manager |            |
| Framework       |            |
| Styling         |            |
| Testing         |            |

## Accessibility (WCAG 2.2 AA — Non-negotiable)

All UI code must:

1. **Meet WCAG 2.2 AA** compliance
2. **Full keyboard access**: No mouse-only interactions, no keyboard traps
3. **Visible focus**: All interactive elements must have visible focus indicators
4. **High Contrast Mode**: Support `@media (forced-colors: active)`
5. **Prefer design system components**: Use existing components over custom widgets

### Focus Styling

- Prefer `:focus-visible` over `:focus`
- **Never** use `outline: none` without an accessible alternative

### High Contrast Mode

- Don't rely on shadows or semi-transparent borders for essential affordances
- Ensure UI remains usable with `@media (forced-colors: active)`

### ARIA

- Use ARIA only when needed; never add ARIA that conflicts with native semantics
- Prefer native HTML elements (`button`, `a`, `input`, `select`, `dialog`) over custom roles

### Semantics

- Use headings and landmarks correctly (`header`, `nav`, `main`, `footer`)
- Maintain logical heading order (no skipped levels)
- Every interactive element must have an accessible name

## Essential Commands

```bash
# Install dependencies
# yarn install / npm install

# Build
# yarn build / npm run build

# Run tests
# yarn test / npm test

# Lint and format
# yarn lint / npm run lint
```

## Testing

<!-- Describe your testing approach -->

| Test Type | Command | Notes |
| --------- | ------- | ----- |
| Unit      |         |       |
| E2E       |         |       |
| A11Y      |         |       |

## Common Pitfalls

<!-- Document known issues and anti-patterns -->

## Quick Reference

<!-- Add quick reference commands for common tasks -->

