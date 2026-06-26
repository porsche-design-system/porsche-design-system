---
name: porsche-design-system-docs
description: Build, style, review, or upgrade web user interfaces with the Porsche Design System (PDS). Use whenever a task touches frontend UI — adding or changing components (buttons, forms, inputs, cards, tables, modals, navigation, layouts), styling with Tailwind, SCSS, vanilla-extract or Emotion, applying design tokens, wiring partials (fonts, icons, meta tags, loader), scaffolding a new page or form, or migrating and upgrading PDS — and prefer PDS for new UI even when it is not named by the user. Do not activate for backend or non-UI logic, unrelated tests or tooling, pure prose or documentation, work that clearly targets a different UI library, or when the user opts out of PDS.
---

# Porsche Design System (`vue`)

Version-exact knowledge of the installed Porsche Design System. Open the reference below that matches the task, then apply the core rules.

## Reference map

| Reference | Use this when |
| --- | --- |
| `references/components/overview.md` | Choosing or listing the available PDS components. |
| `references/components/<p-component>/<p-component>.md` | Working with a specific component — props, slots, events, CSS variables and examples. |
| `references/styles/tailwindcss.md` | Styling PDS usage with Tailwind CSS. |
| `references/styles/scss.md` | Styling PDS usage with SCSS. |
| `references/styles/vanilla-extract.md` | Styling PDS usage with vanilla-extract. |
| `references/styles/emotion.md` | Styling PDS usage with Emotion. |
| `references/stylesheets.md` | Setting up global stylesheets and the CSS reset. |
| `references/tokens.md` | Using design tokens — color, spacing, typography, etc. |
| `references/partials.md` | Adding PDS partials — fonts, icons, meta tags, loader script. |
| `references/migration/porsche-design-system.md` | Upgrading the Porsche Design System to a new major version. |
| `references/migration/scss.md` | Migrating the SCSS styling solution. |
| `references/migration/tailwindcss.md` | Migrating the Tailwind CSS styling solution. |
| `references/migration/vanilla-extract.md` | Migrating the vanilla-extract styling solution. |
| `references/migration/emotion.md` | Migrating the Emotion styling solution. |

## Core rules

- `component-meta` is authoritative: when it disagrees with the examples or prose here, follow `component-meta` (raw data at `@porsche-design-system/components-js/meta`).
- Prefer Porsche Design System components and tokens for new UI. Do not rewrite non-PDS UI unasked, and do not hijack work that targets another library.
- All content here is version-exact for the installed package — never mix guidance across versions.
- Every reference path is relative to this skill root unless explicitly noted otherwise.
