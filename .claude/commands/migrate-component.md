# Migrate Component

When refactoring or renaming a component, ensure all related files across the monorepo are updated consistently.

**Component name**: $ARGUMENTS (the current kebab-case name, e.g., `button` or `input-text`)

## Steps

### 1. Inventory all related files

Search the entire monorepo for files related to `$ARGUMENTS`. Check each of these locations:

**Component source** (`packages/components/`):
- `src/components/$ARGUMENTS/` — all component files (.tsx, -styles.ts, -utils.ts, .spec.ts, .props.md)
- `src/components/*/` — other components that may import from this component's utils
- `src/utils/` — utility files that reference this component

**Test harness** (`packages/components-js/`):
- `tests/e2e/specs/$ARGUMENTS.e2e.ts` — E2E tests
- `tests/vrt/specs/$ARGUMENTS.vrt.ts` — VRT tests
- `tests/a11y/specs/axe-core/$ARGUMENTS.a11y.ts` — axe-core tests
- `tests/a11y/specs/a11ytree/$ARGUMENTS.a11y.ts` — a11y tree tests
- `src/pages/` — test pages that render this component

**Storefront** (`packages/storefront/`):
- `src/app/components/$ARGUMENTS/` — documentation pages and stories
- Other MDX files that reference `p-$ARGUMENTS`

**Shared** (`packages/shared/`):
- `scripts/generateCodeExamples.ts` — code example registration
- `src/data/` — any data referencing this component
- `src/lib/` — generated tag name lookups (will regenerate)

**Component Meta** (`packages/component-meta/`):
- Generated metadata (will regenerate, but verify)

**Wrapper generators** (`packages/components/scripts/wrapper-generator/`):
- Check if component has special handling in any generator

### 2. Report the inventory

Present the full list of files found, organized by package. Highlight:
- Files that need manual updating
- Files that will auto-regenerate on build
- Files where references exist but may not need changes (e.g., just imports)

### 3. Execute the migration

For each file that needs updating:
- Make the necessary changes
- Preserve existing test coverage
- Maintain accessibility compliance

### 4. Rebuild and verify

After all changes:
1. `npm run build:shared` — regenerate tag names and lookups
2. `npm run build:component-meta` — regenerate metadata
3. `npm run build:components` — rebuild components
4. `npm run build:components-js` — rebuild JS wrapper
5. `npm run build:components-react && npm run build:components-angular && npm run build:components-vue` — rebuild wrappers
6. `npm run test:unit:components -- $ARGUMENTS` — verify unit tests
7. Report any remaining issues

### 5. Generate checklist

Output a summary of everything that was changed and what still needs manual verification (e.g., VRT snapshot updates, storefront preview).
