---
name: porsche-design-system-docs
description: Guide for navigating the Porsche Design System documentation. Use this skill whenever the user asks for information about the Porsche Design System (PDS) that can be found in the official docs, such as component usage, design guidelines, or API references.
---

# Porsche Design System Docs Skill

All information needed to answer any question about the Porsche Design System (PDS) is available in the sibling folders next to this `SKILL.md` file. **Do not guess or invent answers** — always query the correct folder(s) for the relevant content.

## Step 1: Determine the framework first

Before answering any component-related question, **always determine which framework the user is currently working in** (e.g. `react`, `angular`, `vue`, `next`, vanilla JS, etc.). This is required to locate the correct component examples.

Detect the framework by inspecting the workspace (e.g. `package.json` dependencies, config files like `next.config.ts`, `angular.json`, `vue.config.js`, framework-specific imports). If it cannot be determined, ask the user.

## Step 2: Look up information in the correct top-level folder

The following folders sit next to this skill file. Pick the folder that matches the question:

| Folder | Use for |
| --- | --- |
| `components` | Individual PDS components (usage, examples, API) |
| `styles` | Design tokens, theming, spacing, typography, colors |
| `patterns` | Composed UI patterns built from multiple components |
| `must-know` | Essential concepts every consumer must know |
| `developing` | Developer setup, tooling, integration guides |
| `partials` | Reusable HTML partials (e.g. font/icon links, CSP) |
| `tailwindcss` | PDS + Tailwind CSS integration |
| `ag-grid` | PDS + AG Grid integration |
| `templates` | Page/layout templates |
| `help` | FAQ, troubleshooting, support |
| `news` | Release notes, announcements, changelog |
| `designing` | Designer-focused guidance, Figma, UX |
| `accessibility-statement` | Accessibility conformance information |
| `license` | Licensing information |

## Step 3: Component lookups

Each component inside `components/` follows this structure:

```
components/<component-name>/
  examples/
    <framework>/   # framework-specific usage examples
  api/             # framework-agnostic API reference (props, events, slots, etc.)
```

When answering a component question:

1. Read `components/<component-name>/api/` for the API / props / events / slots reference.
2. Read `components/<component-name>/examples/<framework>/` (using the framework from Step 1) for concrete code examples.

If the requested framework folder does not exist for a component, fall back to the closest available example and clearly state that to the user.

## Rules

- Always ground answers in the contents of these folders and reference the exact files used.
- Never fabricate component props, events, or APIs — verify them in the `api/` folder.
- If information is missing from the docs, say so explicitly rather than guessing.
