---
name: accessibility-audit
description:
  Conducts iterative WCAG 2.2 AA accessibility audits on local web applications using browser automation and
  axe-core. Use when the user asks for an accessibility audit, WCAG scan, a11y review, or to check/fix accessibility
  violations on a page or route.
---

# Accessibility Audit (WCAG 2.2 AA)

## Goal

Run a structured, iterative accessibility audit on the user's locally running application. Produce actionable findings,
propose fixes aligned with Porsche Design System (PDS) conventions, re-scan until automated checks pass, then guide
manual verification before sign-off.

## Prerequisites (verify before scanning)

1. **Agent context configured** — `AGENTS.md` plus platform-specific rules:
   - **Cursor:** `.cursor/rules/accessibility.mdc`
   - **GitHub Copilot:** `.github/instructions/accessibility.instructions.md`
   - **Claude Code:** `CLAUDE.md` (in sync with `AGENTS.md`)
2. **Application running** — dev server reachable at a known `localhost` URL.
3. **MCP configured** — Playwright MCP installed in your individual agent settings (Cursor Settings → MCP, VS Code Copilot MCP, Claude Code `/mcp`, etc.).
4. **Browser tooling available** — at least one of:
   - Built-in browser (Cursor Agent mode)
   - Playwright MCP (`@playwright/mcp`)

If prerequisites are missing, stop and tell the user what to install. Link to PDS guidance:
`/must-know/accessibility/ai-agent-context/` and `/must-know/accessibility/ai-accessibility-audit/`.

## MCP configuration

MCP servers are configured **individually** by each developer in their AI agent — not as committed repository files.

| Platform | Where to configure |
| -------- | ------------------ |
| Cursor | Settings → Features → MCP, or MCP marketplace |
| GitHub Copilot (VS Code) | Copilot MCP settings |
| Claude Code | `claude mcp add` or agent MCP settings |

Example Playwright server definition:

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

## Tool selection

| Situation | Tool |
| --------- | ---- |
| Quick exploration, keyboard walkthrough | Built-in browser (Cursor) or IDE tools |
| Iterative scan → fix → re-scan (default) | Playwright MCP + axe-core |
| Supplementary performance + a11y score | Chrome DevTools MCP `lighthouse_audit` |

Prefer **Playwright MCP + axe-core** for deterministic WCAG rule checks on `localhost`.

## Scan configuration

Align with PDS automated tests:

- **axe tags:** `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`
- **Viewports:** mobile (~320px) and desktop (~768px or project breakpoint)
- **Themes:** light and dark if the app supports color schemes
- **Scope:** user-defined URL list; scan `main` content unless told otherwise

When injecting axe via Playwright, evaluate on the loaded page and return structured violations (rule id, impact,
selector, html snippet, help URL).

## Workflow

### 1. Define scope

Ask or infer:

- URLs/routes to audit
- Viewports and color schemes
- Exclusions (third-party widgets, auth walls, WIP pages)

### 2. Automated scan

For each URL × viewport × theme:

1. Navigate to the URL
2. Wait for network idle / PDS `componentsReady()` if applicable
3. Run axe-core scan
4. Collect violations and incomplete checks

### 3. Triage violations

Group findings by impact (`critical`, `serious`, `moderate`, `minor`).

| Finding type | Action |
| ------------ | ------ |
| App code issue (missing label, contrast, heading order) | Fix in app code |
| PDS component bug (built-in component fails axe) | Fix workaround if possible; file upstream bug at PDS bug report |
| Third-party embed | Document exclusion; suggest vendor fix |
| False positive (isolated component test context) | Document rationale; do not mask globally |

### 4. Fix loop

For each violation (critical and serious first):

1. Locate source in codebase
2. Propose minimal fix following accessibility rules:
   - Prefer native HTML and PDS `p-*` components
   - Use PDS `aria` prop — never `aria-*` on component host
   - Use `:focus-visible`; never `outline: none` without alternative
   - Support `forced-colors` for essential affordances
3. Apply fix (or present diff for user approval)
4. Re-scan affected URL until violations for that rule are resolved

Stop the fix loop when axe reports zero violations for in-scope URLs, or when remaining issues are documented exclusions.

### 5. Manual verification checklist

Automated scans cannot replace human testing. Verify:

- [ ] Full keyboard-only journey through primary flows (Tab, Shift+Tab, Enter, Space, Escape)
- [ ] Focus always visible; no keyboard traps; focus returns after closing overlays
- [ ] High Contrast Mode (`forced-colors: active`) — UI remains usable
- [ ] 200% text zoom — content readable, no loss of function
- [ ] Screen reader spot-check on critical flows (names, roles, announcements)
- [ ] Motion respects `prefers-reduced-motion` where animations exist
- [ ] Error messages programmatically associated with form fields

### 6. Report

Output using the audit report template structure:

- Metadata (app, URLs, date, tools)
- Scope and exclusions
- Pass/fail summary per URL
- Violations table (id, WCAG criterion, severity, element, status)
- Manual test results
- Open issues / upstream PDS tickets
- Jira-ready summary with numbered findings and acceptance criteria

Save report as `accessibility-audit-report-{date}.md` unless the user specifies another path.

## PDS-specific rules during fixes

- Use `@porsche-design-system/components-{react|angular|vue}` for UI primitives
- Check component Accessibility tab on the PDS storefront for keyboard and ARIA guidance
- Do not re-implement patterns PDS already provides (buttons, modals, tabs, form controls)
- For monorepo PDS development: run `npm run test:a11y:components-js` after component changes

## Out of scope

- Legal accessibility statement authoring
- Full screen reader certification
- Non-web EN 301 549 criteria (hardware, documents, etc.)
- Auditing without a running application (use static analysis only as a supplement)

## Output to the user

After each audit cycle, provide:

1. Violation count by severity
2. Top fixes applied or proposed
3. Remaining open issues
4. Manual checklist status
5. Path to generated report file

## In this repository (Porsche Design System)

- Agent context: `.cursor/rules/accessibility.mdc`, `.github/instructions/accessibility.instructions.md`, `CLAUDE.md`
- Audit instructions (Copilot): `.github/instructions/accessibility-audit.instructions.md`
- Playwright MCP: install individually in your agent settings (not committed to this repo)
- **Storefront audit URL:** `http://localhost:3000` after `npm run start:storefront`
- **CI validation:** `npm run build:storefront && npm run test:a11y:storefront`
- **Report template:** `packages/storefront/public/assets/downloads/accessibility-audit-report-template.md`
- Storefront docs: `packages/storefront/src/app/(main)/must-know/accessibility/ai-accessibility-audit/`
