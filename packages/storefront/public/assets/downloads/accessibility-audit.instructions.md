---
applyTo: '**/*.{html,css,scss,js,ts,tsx,jsx,vue,mdx}'
---

# Accessibility Audit Instructions (GitHub Copilot)

Use these instructions when the user asks for an accessibility audit, WCAG scan, or a11y review.

## Before scanning

1. Confirm `AGENTS.md` and accessibility instruction files are configured (see [AI Agent Context](https://designsystem.porsche.com/v4/must-know/accessibility/ai-agent-context/)).
2. Confirm the application dev server is running at a known `localhost` URL.
3. Confirm Playwright MCP is installed in your individual Copilot / VS Code MCP settings.
4. Install `axe-core` or `@axe-core/playwright` locally — never inject axe from CDN (CSP blocks it).

## MCP configuration (GitHub Copilot in VS Code)

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

Download the skill bundle from the [AI Accessibility Audit](https://designsystem.porsche.com/v4/must-know/accessibility/ai-accessibility-audit/) page ([full ZIP](https://designsystem.porsche.com/v4/assets/downloads/accessibility-audit.zip) or individual files).

0. **Scope** — URLs, viewports, themes, exclusions
1. **Static PDS scan** — aria-on-host, icon-only controls, carousel skip (see `references/pds-integration-checks.md`)
2. **axe scan (2a)** — local axe; tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`; `componentsReady()` on PDS apps
3. **Focus visibility (2b)** — Tab walk probe (see `references/fix-guide-focus.md`)
4. **Structure audit (2c)** — landmarks, headings, lang, title (see `references/structure-audit.md`)
5. **Keyboard/modals (2d)** — overlay focus management
6. **Triage** — group by severity; use categorized fix guides
7. **Plan artifact** — write `.accessibility-audit-plan.json` (see `references/plan-artifact.md`)
8. **Fix loop** — re-scan until clean or documented
9. **Manual checks** — see `references/manual-checklist.md`
10. **Report** — use the [audit report template](https://designsystem.porsche.com/v4/assets/downloads/accessibility-audit-report-template.md) from the PDS storefront

## Fix principles

- WCAG 2.2 AA is non-negotiable.
- Prefer native HTML and Porsche Design System components.
- Use PDS `aria` prop; never place `aria-*` on component host elements.
- Visible focus via `:focus-visible`; support `forced-colors`.

## Out of scope

Legal accessibility statements, full SR certification, auditing without a running app.
