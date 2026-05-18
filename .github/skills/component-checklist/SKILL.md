---
name: component-checklist
description: Use when the user asks for a pre-PR checklist, wants to verify a component change is complete, or asks what tests to run before opening a pull request for a component.
allowed-tools: shell
---

# Component Checklist

Generate a targeted pre-PR checklist for a component change, based on what actually changed.

**Component name**: read from the user's message (kebab-case, e.g., `button`). Ask the user if not provided.

## Steps

### 1. Analyze what changed

- Run `git diff --name-only` to identify changed files related to the component
- Categorize changes: component source, styles, utils, or tests

### 2. Determine impact scope

**If component source changed (props, events, markup, ARIA)**:
- [ ] Unit tests pass: `npm run test:unit:components -- {name}`
- [ ] Keyboard navigation works end-to-end
- [ ] Every interactive element has an accessible name
- [ ] Focus ring uses `getFocusBaseStyles()` behavior
- [ ] ARIA attributes are correct and necessary
- [ ] `forced-colors: active` renders correctly
- [ ] E2E tests pass: `npm run test:e2e:components-js -- --grep {name}`
- [ ] A11y tests pass: `npm run test:a11y:components-js -- --grep {name}`

**If styles changed (visual appearance)**:
- [ ] Style snapshot tests updated: `npm run test:unit:components -- {name}-styles`
- [ ] VRT snapshots updated: `./docker.sh npm run test:vrt:components-js -- --grep {name}`
- [ ] `forced-colors: active` shows all states and focus correctly
- [ ] Content usable at 200% zoom

**If component API changed (new/removed/renamed props)**:
- [ ] `propTypes` constant updated with correct `AllowedTypes`
- [ ] Wrappers regenerated: `npm run build:components && npm run build:components-js && npm run build:components-react && npm run build:components-angular && npm run build:components-vue`
- [ ] Component-meta regenerated: `npm run build:component-meta`
- [ ] Storefront documentation updated (if applicable)
- [ ] Breaking change documented

**If form behavior changed**:
- [ ] `formResetCallback()` works correctly
- [ ] `formDisabledCallback()` syncs state
- [ ] `formStateRestoreCallback()` handles autofill
- [ ] Form submission includes correct values

### 3. Output the checklist

Present only the relevant checks based on the actual changes. Include specific commands. Flag critical checks given the nature of the change.

### 4. Offer to run checks

Ask if the user wants to run any of the identified test commands.

## In this repository (Porsche Design System)

- VRT must run in Docker: `./docker.sh npm run test:vrt:components-js`
- Build before cross-package tests: `npm run build:core-dependencies`
- Follow `packages/components/AGENTS.md` for the full accessibility checklist
