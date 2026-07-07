# CLAUDE.md

> **Canonical guidance:** [`AGENTS.md`](AGENTS.md). Keep this file aligned for Claude Code sessions in the PDS monorepo.

See [`AGENTS.md`](AGENTS.md) for build order, essential commands, package structure, WCAG requirements, and package-level `AGENTS.md` files.

## AI agent configuration (this repo)

| Tool | Files |
| ---- | ----- |
| **All agents** | [`AGENTS.md`](AGENTS.md), [`.agents/skills/accessibility-audit/SKILL.md`](.agents/skills/accessibility-audit/SKILL.md) |
| **GitHub Copilot** | [`.github/copilot-instructions.md`](.github/copilot-instructions.md), [`.github/instructions/accessibility.instructions.md`](.github/instructions/accessibility.instructions.md) |
| **Cursor** | [`.cursor/rules/accessibility.mdc`](.cursor/rules/accessibility.mdc) |
| **Claude Code** | This file |

MCP servers (e.g. Playwright) are configured **individually** in your agent settings — not committed to this repository.

## Accessibility audit workflow

Use when asked for a WCAG 2.2 AA audit, especially on the **storefront**.

**Invoke:** `/accessibility-audit` or natural language.

**Full workflow:** [`.agents/skills/accessibility-audit/SKILL.md`](.agents/skills/accessibility-audit/SKILL.md)

### Prerequisites

1. Accessibility **coding rules** configured (see table above).
2. Audit **skill** at `.agents/skills/accessibility-audit/`.
3. `npm run start:storefront` running → `http://localhost:3000` (or built output on port 8080).
4. Playwright MCP installed in your agent MCP settings; browsers: `npx playwright install chromium`.

### Validate

After substantive fixes: `npm run test:a11y:storefront` (requires `npm run build:storefront`).

Storefront guide: `packages/storefront/src/app/(main)/must-know/accessibility/ai-accessibility-audit/`.
