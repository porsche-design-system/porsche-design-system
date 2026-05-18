# Porsche Design System — GitHub Copilot Instructions

GitHub Copilot reads `AGENTS.md` files natively using proximity-based loading.
**Do not duplicate content here** — maintain it in the `AGENTS.md` hierarchy instead.

## Where instructions live

| Scope | File |
|-------|------|
| Project-wide context | [`AGENTS.md`](../AGENTS.md) |
| Core Stencil components | [`packages/components/AGENTS.md`](../packages/components/AGENTS.md) |
| React wrapper | [`packages/components-react/AGENTS.md`](../packages/components-react/AGENTS.md) |
| Angular wrapper | [`packages/components-angular/AGENTS.md`](../packages/components-angular/AGENTS.md) |
| Vue wrapper | [`packages/components-vue/AGENTS.md`](../packages/components-vue/AGENTS.md) |
| Documentation site | [`packages/storefront/AGENTS.md`](../packages/storefront/AGENTS.md) |
| Design tokens | [`packages/tokens/AGENTS.md`](../packages/tokens/AGENTS.md) |
| Style libraries | [`packages/styles/AGENTS.md`](../packages/styles/AGENTS.md) |
| Other packages | `packages/*/AGENTS.md` |

## Path-scoped instructions

The following instruction files activate automatically for matching file patterns:

- [`instructions/accessibility.instructions.md`](instructions/accessibility.instructions.md) — all frontend files
- [`instructions/components.instructions.md`](instructions/components.instructions.md) — `packages/components/**`
- [`instructions/storefront.instructions.md`](instructions/storefront.instructions.md) — `packages/storefront/**`
- [`instructions/react.instructions.md`](instructions/react.instructions.md) — `packages/components-react/**`
- [`instructions/angular.instructions.md`](instructions/angular.instructions.md) — `packages/components-angular/**`
- [`instructions/vue.instructions.md`](instructions/vue.instructions.md) — `packages/components-vue/**`
- [`instructions/testing.instructions.md`](instructions/testing.instructions.md) — test files
- [`instructions/code-style.instructions.md`](instructions/code-style.instructions.md) — all TS/Vue files
