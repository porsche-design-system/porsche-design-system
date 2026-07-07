# Accessibility Audit Skill Bundle

Download from the [PDS storefront](https://designsystem.porsche.com/v4/must-know/accessibility/ai-accessibility-audit/).

## Contents

| Path | Purpose |
| ---- | ------- |
| `accessibility-audit/SKILL.md` | Audit workflow — install to `.agents/skills/accessibility-audit/` |
| `accessibility-audit/references/` | Fix guides, axe setup, PDS integration checks, manual checklist |
| `accessibility-audit-report-template.md` | Audit report template |

## Install

1. Extract this ZIP into your **repository root**.
2. Move `accessibility-audit/` to **`.agents/skills/accessibility-audit/`** (create `.agents/skills/` if needed).
3. Complete [AI Agent Context](https://designsystem.porsche.com/v4/must-know/accessibility/ai-agent-context/) (`AGENTS.md` + platform coding rules).
4. Install Playwright MCP in your agent settings.
5. Invoke with **`/accessibility-audit`** or natural language.

Cursor, GitHub Copilot, and Claude Code all support [Agent Skills](https://agentskills.io/) at `.agents/skills/` ([Cursor](https://cursor.com/docs/skills), [Copilot](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)).

## Coding rules vs audit skill

| Purpose | What to install | Where |
| ------- | --------------- | ----- |
| **Accessible code generation** | `AGENTS.md`, `accessibility.instructions.md`, `accessibility.mdc` | See [AI Agent Context](https://designsystem.porsche.com/v4/must-know/accessibility/ai-agent-context/) |
| **Accessibility audit workflow** | This skill bundle | `.agents/skills/accessibility-audit/` |

## Verify installation

```text
Conduct a WCAG 2.2 AA accessibility audit on http://localhost:3000/.
Use the accessibility audit skill. Start with scope, then static PDS scan, then axe.
```

The agent should resolve `references/axe-setup.md` relative to `.agents/skills/accessibility-audit/`.
