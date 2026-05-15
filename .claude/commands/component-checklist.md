# Component Checklist

Generate a targeted pre-PR checklist for a component change, based on what actually changed.

**Component name**: $ARGUMENTS (kebab-case, e.g., `button` or `input-text`)

## Steps

### 1. Analyze what changed

- Run `git diff --name-only` to identify changed files related to `$ARGUMENTS`
- Categorize changes:
  - **Component source** (`$ARGUMENTS.tsx`) — logic, props, markup
  - **Styles** (`$ARGUMENTS-styles.ts`) — visual changes
  - **Utils** (`$ARGUMENTS-utils.ts`) — helper logic
  - **Tests** (`.spec.ts`) — test updates

### 2. Determine impact scope

Based on what changed, determine which checks are required:

**If component source changed (props, events, markup, ARIA)**:
- [ ] Unit tests pass: `npm run test:unit:components -- $ARGUMENTS`
- [ ] Keyboard navigation works end-to-end
- [ ] Every interactive element has an accessible name
- [ ] Focus ring uses `getFocusBaseStyles()` behavior
- [ ] ARIA attributes are correct and necessary
- [ ] `forced-colors: active` renders correctly
- [ ] E2E tests pass: `npm run test:e2e:components-js -- --grep $ARGUMENTS`
- [ ] A11y tests pass: `npm run test:a11y:components-js -- --grep $ARGUMENTS`

**If styles changed (visual appearance)**:
- [ ] Style snapshot tests updated: `npm run test:unit:components -- $ARGUMENTS-styles`
- [ ] VRT snapshots updated: `./docker.sh npm run test:vrt:components-js -- --grep $ARGUMENTS`
- [ ] `forced-colors: active` shows all states and focus correctly
- [ ] Content usable at 200% zoom
- [ ] Disabled states use `getDisabledBaseStyles()`

**If component API changed (new/removed/renamed props)**:
- [ ] `propTypes` constant updated with correct `AllowedTypes`
- [ ] Wrappers regenerated: `npm run build:components && npm run build:components-js && npm run build:components-react && npm run build:components-angular && npm run build:components-vue`
- [ ] Component-meta regenerated: `npm run build:component-meta`
- [ ] Storefront documentation updated (if applicable)
- [ ] Breaking change documented

**If form behavior changed**:
- [ ] `formResetCallback()` works correctly
- [ ] `formDisabledCallback()` syncs state
- [ ] Form submission includes correct values
- [ ] `implicitSubmit()` works with Enter key

### 3. Output the checklist

Present only the relevant checks based on the actual changes. Include the specific commands to run. Flag any checks that are particularly important given the nature of the change.

### 4. Offer to run checks

Ask if the user wants to run any of the identified test commands.
