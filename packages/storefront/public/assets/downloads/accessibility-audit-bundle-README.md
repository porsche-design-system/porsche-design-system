# Accessibility Audit Skill Bundle

Download from the [PDS storefront](https://designsystem.porsche.com/v4/must-know/accessibility/ai-accessibility-audit/).

## Contents

| Path | Purpose |
| ---- | ------- |
| `accessibility-audit/SKILL.md` | Cursor skill (main workflow) |
| `accessibility-audit/references/` | Fix guides, axe setup, PDS integration checks |
| `accessibility-audit.instructions.md` | GitHub Copilot instructions |
| `accessibility-audit.claude.md` | Claude Code workflow |
| `accessibility-audit-report-template.md` | Audit report template |

## Installation

### Cursor

Copy the `accessibility-audit/` folder to `.cursor/skills/` in your project (or user skills directory).

Invoke with `/accessibility-audit`.

### GitHub Copilot

Copy `accessibility-audit.instructions.md` to `.github/instructions/` in your project.

### Claude Code

Merge `accessibility-audit.claude.md` into your project `CLAUDE.md`, or keep it as a referenced file.

### Prerequisites

Complete [AI Agent Context](https://designsystem.porsche.com/v4/must-know/accessibility/ai-agent-context/) setup (`AGENTS.md` + platform rules) before running audits.
