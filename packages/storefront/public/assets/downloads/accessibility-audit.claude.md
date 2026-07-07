# Accessibility Audit Workflow (Claude Code)

Add this section to your project `CLAUDE.md`, or keep this file in the repo and reference it from `CLAUDE.md`.

Use when the user asks for an accessibility audit, WCAG scan, or a11y review.

## Prerequisites

1. `AGENTS.md` and accessibility rules configured (see [AI Agent Context](https://designsystem.porsche.com/v4/must-know/accessibility/ai-agent-context/)).
2. Application dev server running at a known `localhost` URL.
3. Playwright MCP installed. Approve servers via `/mcp` on first run.
4. Local `axe-core` in `node_modules` — never CDN injection (CSP).

PDS docs: [AI Agent Context](https://designsystem.porsche.com/v4/must-know/accessibility/ai-agent-context/) and [AI Accessibility Audit](https://designsystem.porsche.com/v4/must-know/accessibility/ai-accessibility-audit/)

## MCP configuration

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

## Audit workflow

Install the skill from the [AI Accessibility Audit](https://designsystem.porsche.com/v4/must-know/accessibility/ai-accessibility-audit/) download (`accessibility-audit/SKILL.md` + `references/` folder).

0. **Scope** — URLs, viewports, themes, exclusions
1. **Static PDS scan** — see `references/pds-integration-checks.md`
2. **axe scan (2a)** — local axe; WCAG 2.2 AA tags; `componentsReady()` on PDS apps
3. **Focus visibility (2b)** — Tab walk probe
4. **Structure audit (2c)** — landmarks, headings, metadata
5. **Keyboard/modals (2d)** — overlay focus traps
6. **Triage** — use fix guides in `references/`
7. **Plan artifact** — `.accessibility-audit-plan.json`
8. **Fix loop** — re-scan until clean
9. **Manual checks** — `references/manual-checklist.md`
10. **Report** — [audit report template](https://designsystem.porsche.com/v4/assets/downloads/accessibility-audit-report-template.md)

## Fix principles

- WCAG 2.2 AA is non-negotiable.
- Prefer Porsche Design System `p-*` components.
- Use PDS `aria` prop; never `aria-*` on component host.
- Visible focus via `:focus-visible`; support `forced-colors`.

## Out of scope

Legal accessibility statements, full screen reader certification, auditing without a running app.
