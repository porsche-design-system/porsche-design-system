# Accessibility Audit Workflow (Claude Code)

Add this section to your project `CLAUDE.md`, or keep this file in the repo and reference it from `CLAUDE.md`.

Use when the user asks for an accessibility audit, WCAG scan, or a11y review.

## Prerequisites

1. `AGENTS.md` and accessibility rules configured (see PDS AI Agent Context guide).
2. Application dev server running at a known `localhost` URL.
3. Playwright MCP installed in your individual Claude Code / agent MCP settings. Approve servers via `/mcp` on first run.
4. Playwright browsers installed: `npx playwright install chromium`

PDS docs: `/must-know/accessibility/ai-agent-context/` and `/must-know/accessibility/ai-accessibility-audit/`

## MCP configuration

Install Playwright MCP via `claude mcp add playwright --scope user -- npx -y @playwright/mcp@latest`, or add it in your agent MCP settings. Example server definition:

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

Do not commit API keys. Use `${ENV_VAR}` placeholders for secrets.

## Audit workflow

1. **Define scope** — URLs, viewports (mobile + desktop), light/dark themes, exclusions.
2. **Scan** — Use Playwright MCP + axe-core; tags: `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`.
3. **Triage** — Group by severity; separate app fixes from PDS upstream or third-party issues.
4. **Fix loop** — Propose minimal fixes; re-scan until clean or documented.
5. **Manual checks** — Keyboard-only, focus visibility, HCM, 200% zoom, screen reader spot-check.
6. **Report** — Use the PDS audit report template; include Jira-ready summary.

## Fix principles

- WCAG 2.2 AA is non-negotiable.
- Prefer native HTML and Porsche Design System `p-*` components.
- Use PDS `aria` prop; never place `aria-*` on component host elements.
- Visible focus via `:focus-visible`; support `forced-colors`.

## Out of scope

Legal accessibility statements, full screen reader certification, auditing without a running app.
