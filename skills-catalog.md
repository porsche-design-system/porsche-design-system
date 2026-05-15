# Porsche Design System — Skills Catalog

Implemented Claude Code skills (custom slash commands) for common workflows in this monorepo.
All skills are in `.claude/commands/` — invoke via `/command-name {arguments}`.

## Implemented Skills (9)

### Component Development

| Command | Purpose | Arguments |
|---------|---------|-----------|
| `/new-component` | Scaffold a new Stencil web component with all required files | Component name (kebab-case) |
| `/new-form-component` | Scaffold a form-associated component with ElementInternals | Component name (kebab-case) |
| `/new-component-docs` | Scaffold storefront documentation pages | Component name (kebab-case) |

### Quality Assurance

| Command | Purpose | Arguments |
|---------|---------|-----------|
| `/component-checklist` | Generate targeted pre-PR checklist based on actual changes | Component name |
| `/vrt-update` | Run VRT in Docker and update snapshots | Component name or filter (optional) |

### Workflow Enforcement (Mandatory Follow-ups)

| Command | Purpose | Arguments |
|---------|---------|-----------|
| `/post-component-change` | Rebuild wrappers, meta, and verify after component API changes | Component name |
| `/post-token-change` | Cascade rebuild through styles, components, and downstream | Token category (optional) |
| `/post-shared-change` | Rebuild affected downstream packages after shared changes | Changed area (optional) |

### Refactoring

| Command | Purpose | Arguments |
|---------|---------|-----------|
| `/migrate-component` | Find and update all related files when refactoring a component | Component name |

## Skill Categories Explained

### Scaffolding Skills (`/new-*`)
Create new files following established patterns. These read reference implementations from the codebase to ensure generated code matches conventions exactly. They verify the result compiles and passes tests.

### Workflow Enforcement Skills (`/post-*`)
Run mandatory steps that must happen after certain changes. These exist because the monorepo has strict build dependencies — skipping a step causes stale output or build failures downstream. Use these whenever you modify:
- A component's API → `/post-component-change`
- Design tokens → `/post-token-change`
- Shared utilities → `/post-shared-change`

### Quality Skills (`/component-checklist`, `/vrt-update`)
Ensure changes meet quality standards. `/component-checklist` analyzes the actual diff to produce a targeted checklist (not a generic one). `/vrt-update` handles the Docker requirement for visual regression testing.

### Refactoring Skills (`/migrate-component`)
Handle cross-cutting changes that touch many files across the monorepo. These inventory all related files before making changes to prevent orphaned references.

## When to Use Which Skill

| Scenario | Skill |
|----------|-------|
| Creating a new UI component | `/new-component` or `/new-form-component` |
| Adding docs for an existing component | `/new-component-docs` |
| Changed a component's props or events | `/post-component-change` |
| Changed design token values | `/post-token-change` |
| Modified shared utilities or generators | `/post-shared-change` |
| Visual changes need new baselines | `/vrt-update` |
| About to open a PR for component work | `/component-checklist` |
| Renaming or restructuring a component | `/migrate-component` |

## Relationship to Rule Files

Each skill references one or more `.claude/rules/` files for context:

| Skill | Primary Rule | Also Uses |
|-------|-------------|-----------|
| `/new-component` | `components.md` | `accessibility.md`, `code-style.md` |
| `/new-form-component` | `components.md` | `accessibility.md`, `code-style.md` |
| `/new-component-docs` | `storefront.md` | `accessibility.md` |
| `/component-checklist` | `components.md` | `testing.md`, `accessibility.md` |
| `/vrt-update` | `components-js.md` | `testing.md` |
| `/post-component-change` | `components.md` | `components-react.md`, `components-angular.md`, `components-vue.md` |
| `/post-token-change` | `tokens.md` | `styles.md`, `components.md` |
| `/post-shared-change` | `shared.md` | All downstream rules |
| `/migrate-component` | `components.md` | `components-js.md`, `storefront.md`, `shared.md` |
