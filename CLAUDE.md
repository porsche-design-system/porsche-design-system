# CLAUDE.md

> **Canonical guidance:** [`AGENTS.md`](AGENTS.md). Keep this file aligned for Claude Code sessions in the PDS monorepo.

See [`AGENTS.md`](AGENTS.md) for build order, essential commands, package structure, WCAG requirements, and package-level `AGENTS.md` files.

## AI agent configuration (this repo)

| Tool | Files |
| ---- | ----- |
| **All agents** | [`AGENTS.md`](AGENTS.md) |
| **GitHub Copilot** | [`.github/copilot-instructions.md`](.github/copilot-instructions.md), [`.github/instructions/accessibility.instructions.md`](.github/instructions/accessibility.instructions.md), [`.github/instructions/accessibility-audit.instructions.md`](.github/instructions/accessibility-audit.instructions.md) |
| **Cursor** | [`.cursor/rules/accessibility.mdc`](.cursor/rules/accessibility.mdc), [`.cursor/skills/accessibility-audit/SKILL.md`](.cursor/skills/accessibility-audit/SKILL.md) |
| **Claude Code** | This file |

MCP servers (e.g. Playwright) are configured **individually** in your agent settings — not committed to this repository.

## Accessibility audit workflow

Use when asked for a WCAG 2.2 AA audit, especially on the **storefront**.

### Prerequisites

1. Accessibility rules configured (see table above).
2. `npm run start:storefront` running → `http://localhost:3000` (or built output on port 8080).
3. Playwright MCP installed in your Claude Code / agent MCP settings; browsers: `npx playwright install chromium`.

### Workflow

1. **Define scope** — URLs, viewports, light/dark themes, exclusions.
2. **Scan** — Playwright MCP + axe-core (`wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`).
3. **Triage** — App/storefront vs core component fixes.
4. **Fix loop** — Minimal fixes; re-scan until clean.
5. **Manual checks** — Keyboard, focus, HCM, 200% zoom, screen reader spot-check.
6. **Report** — `packages/storefront/public/assets/downloads/accessibility-audit-report-template.md`.
7. **Validate** — `npm run test:a11y:storefront` after substantive fixes (requires `npm run build:storefront`).

Detailed steps: [`.cursor/skills/accessibility-audit/SKILL.md`](.cursor/skills/accessibility-audit/SKILL.md) and storefront guide at `packages/storefront/src/app/(main)/must-know/accessibility/ai-accessibility-audit/`.
