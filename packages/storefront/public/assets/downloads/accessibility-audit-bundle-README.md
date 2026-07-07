# Accessibility Audit Skill Bundle

Download from the [PDS storefront](https://designsystem.porsche.com/v4/must-know/accessibility/ai-accessibility-audit/).

## Contents

| Path | Purpose |
| ---- | ------- |
| `accessibility-audit/SKILL.md` | Audit workflow — install to `.agents/skills/accessibility-audit/` |
| `accessibility-audit/references/` | Fix guides, checklists, **report template** (`report-template.md`) |

## Install

1. Extract this ZIP into your **repository root**.
2. Move `accessibility-audit/` to **`.agents/skills/accessibility-audit/`** (create `.agents/skills/` if needed).
3. Complete [AI Agent Context](https://designsystem.porsche.com/v4/must-know/accessibility/ai-agent-context/) (`AGENTS.md` + platform coding rules).
4. Install Playwright MCP in your agent settings.
5. Invoke with **`/accessibility-audit`** or natural language.

The report template ships inside the skill at `references/report-template.md`. The agent writes the filled report to **`accessibility-audit-report-{date}.md`** in your repository root (alongside `.accessibility-audit-plan.json`).

Cursor, GitHub Copilot, and Claude Code all support [Agent Skills](https://agentskills.io/) at `.agents/skills/`.

## Verify installation

```text
Conduct a WCAG 2.2 AA accessibility audit on http://localhost:3000/.
Use the accessibility audit skill. Start with scope, then static PDS scan, then axe.
```
