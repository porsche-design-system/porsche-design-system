---
name: setup-porsche-design-system
description: Guide for the initial setup of the Porsche Design System (PDS) in a web application. Use this skill whenever the user asks to install, integrate, add, or set up the Porsche Design System (PDS) in their project.
---

# Setup Porsche Design System

Follow this workflow strictly. Do **not** rely on prior knowledge of PDS setup — the authoritative instructions live in this skill folder and may change between versions.

## Step 1 — Detect the framework

Inspect the project root to determine which framework is in use. Check, in this order:

1. The root `package.json` `dependencies` and `devDependencies`.
2. Framework-specific config files (`next.config.*`, `angular.json`, `vite.config.*`, `astro.config.*`, `vue.config.*`, `react-router.config.*`, etc.).

Map the detected framework to one of the supported skill folders under `./developing/`:

| Detected stack                                              | Folder to use              |
| ----------------------------------------------------------- | -------------------------- |
| `next`                                                      | `developing/next-js`       |
| `@angular/core`                                             | `developing/angular`       |
| `vue`                                                       | `developing/vue`           |
| `astro`                                                     | `developing/astro`         |
| `react-router` (as the app framework)                       | `developing/react-router`  |
| `react` (without Next.js / React Router app framework)      | `developing/react`         |
| No framework / plain HTML / Vite vanilla                    | `developing/vanilla-js`    |

If you cannot confidently identify the framework, **ask the user** which of the supported frameworks above they want to set up before continuing. Do not guess.

## Step 2 — Load the getting-started guide

Read the file:

```
./developing/<framework>/getting-started/page.mdx
```

This document is the single source of truth for the setup. It is organized as a sequence of numbered sections (`### Step 1`, `### Step 2`, …). Some steps are marked as **`(recommended)`** or **`(optional)`** in their heading.

Do **not** read other folders (`demo/`, `advanced/`, `form/`, `faq/`, `testing/`) during setup unless the getting-started guide explicitly references them or the user asks for them.

## Step 3 — Execute the steps in order

Work through the steps **one by one, in the order they appear** in `page.mdx`:

1. **Required steps** (no `(recommended)` / `(optional)` marker): execute them directly. Apply the file edits, install the listed dependencies, and run the listed commands.
2. **Optional / recommended steps** (heading contains `(recommended)`, `(optional)`, or similar): **do not apply them automatically**. Stop and ask the user, e.g.:

   > Step 4 is marked *(recommended)*: "Integrate PDS Partials to preload fonts, icons and component chunks". Would you like me to apply it?

   Only proceed with that step if the user confirms. Skip it otherwise and continue with the next step.
3. After each step, briefly summarize what changed (files touched, packages installed) before moving on.

### Rules while applying steps

- Treat ```` ```diff ```` blocks as instructions: lines starting with `+` must be added, lines starting with `-` must be removed, unprefixed lines are existing context.
- Use the exact import paths, package names, and file locations from the guide (e.g. `@porsche-design-system/components-react/ssr` for Next.js). Do not substitute equivalents.
- If a file mentioned in the guide does not exist in the project, create it. If it exists with different contents, merge the additions rather than overwriting unrelated code.
- Install dependencies with the project's detected package manager (`npm`, `pnpm`, `yarn`, or `bun`) inferred from the lockfile.
- If the "Quick start" section assumes a fresh project but the user already has one, skip the project-creation commands and jump to the "Integration" steps.

## Step 4 — Verify

After all required (and accepted optional) steps are done:

1. Confirm the dev server command from the guide (typically `npm run dev`) and offer to run it.
2. List which optional steps were skipped so the user knows what they can still add later.
