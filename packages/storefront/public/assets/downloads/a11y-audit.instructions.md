---
applyTo: '**/*.{html,css,scss,js,ts,tsx,jsx,vue,mdx}'
---

# Accessibility Audit Instructions (GitHub Copilot)

Use these instructions when the user asks for an accessibility audit, WCAG scan, or a11y review.

## Before scanning

1. Confirm `AGENTS.md` and accessibility instruction files are configured (see PDS AI Agent Context guide).
2. Confirm the application dev server is running at a known `localhost` URL.
3. Confirm Playwright MCP is installed in your individual Copilot / VS Code MCP settings.
4. Prefer automated axe-core scans via Playwright MCP where available.

## MCP configuration (GitHub Copilot in VS Code)

Install Playwright MCP in your Copilot MCP settings (or VS Code MCP marketplace). Example server definition:

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

Do not commit API keys. See the PDS AI Accessibility Audit guide for details.

## Audit workflow

1. **Define scope** — URLs, viewports (mobile + desktop), light/dark themes, exclusions.
2. **Scan** — Run axe-core with tags: `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`.
3. **Triage** — Group by severity; separate app fixes from PDS upstream or third-party issues.
4. **Fix loop** — Propose minimal fixes; re-scan until clean or documented.
5. **Manual checks** — Keyboard-only, focus visibility, HCM, 200% zoom, screen reader spot-check.
6. **Report** — Use the PDS audit report template; include Jira-ready summary.

## Fix principles

- WCAG 2.2 AA is non-negotiable.
- Prefer native HTML and Porsche Design System components.
- Use PDS `aria` prop; never place `aria-*` on component host elements.
- Visible focus via `:focus-visible`; support `forced-colors`.

## Out of scope

Legal accessibility statements, full SR certification, auditing without a running app.
