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

## Install this skill

Download the [full skill bundle (ZIP)](https://designsystem.porsche.com/v4/assets/downloads/accessibility-audit.zip) from
[AI Accessibility Audit](https://designsystem.porsche.com/v4/must-know/accessibility/ai-accessibility-audit/). Move
`accessibility-audit/` to **`.agents/skills/accessibility-audit/`** ([Agent Skills](https://agentskills.io/) standard).

Invoke with **`/accessibility-audit`** or natural language. Supported by Cursor, GitHub Copilot, and Claude Code.

**Coding rules** (`AGENTS.md`, accessibility rules) are separate — see [AI Agent Context](https://designsystem.porsche.com/v4/must-know/accessibility/ai-agent-context/).

## Reference files

Read these when executing specific steps:

| File | Purpose |
| ---- | ------- |
| [references/completeness-matrix.md](references/completeness-matrix.md) | WCAG 2.2 AA automation coverage |
| [references/axe-setup.md](references/axe-setup.md) | Local axe injection, CSP, `componentsReady()` |
| [references/pds-integration-checks.md](references/pds-integration-checks.md) | Top 5 PDS integration anti-patterns |
| [references/structure-audit.md](references/structure-audit.md) | Landmarks, headings, skip links |
| [references/plan-artifact.md](references/plan-artifact.md) | `.accessibility-audit-plan.json` schema |
| [references/manual-checklist.md](references/manual-checklist.md) | Human-only verification |
| [references/fix-guide-*.md](references/) | Categorized fix patterns |

## Prerequisites (verify before scanning)

1. **Agent context configured** — `AGENTS.md` plus platform-specific **coding rules** (download from [AI Agent Context](https://designsystem.porsche.com/v4/must-know/accessibility/ai-agent-context/)):
   - **Cursor:** `accessibility.mdc` → `.cursor/rules/`
   - **GitHub Copilot:** `accessibility.instructions.md` → `.github/instructions/`
   - **Claude Code:** `CLAUDE.md` aligned with `AGENTS.md`
2. **Audit skill installed** — `.agents/skills/accessibility-audit/` per [Install this skill](#install-this-skill) above
3. **Application running** — dev server reachable at a known `localhost` URL.
4. **MCP configured** — Playwright MCP installed in your individual agent settings.
5. **Browser tooling available** — Playwright MCP (`@playwright/mcp`) or built-in browser automation.
6. **Local axe** — `axe-core` or `@axe-core/playwright` in `node_modules` (never CDN on CSP sites).

If prerequisites are missing, stop and tell the user what to install. Link to PDS guidance:
[AI Agent Context](https://designsystem.porsche.com/v4/must-know/accessibility/ai-agent-context/) and
[AI Accessibility Audit](https://designsystem.porsche.com/v4/must-know/accessibility/ai-accessibility-audit/).

## MCP configuration

MCP servers are configured **individually** by each developer — not as committed repository files.

Example Playwright server:

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
| Iterative scan → fix → re-scan (default) | Playwright MCP + local axe-core |
| Focus visibility (WCAG 2.4.7) | Tab walk + computed-style probe (step 2b) |
| Page structure | Structure audit (step 2c) |
| Static PDS integration | Source grep (step 1) |
| Supplementary score | Chrome DevTools MCP `lighthouse_audit` |

## Scan configuration

Align with PDS automated tests — see [references/axe-setup.md](references/axe-setup.md):

- **axe tags:** `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`
- **Viewports:** mobile (~320px) and desktop (~768px)
- **Themes:** light and dark if supported
- **Pre-scan:** always call `componentsReady()` on PDS apps

## Workflow

### 0. Scope and prerequisites

Ask or infer:

- URLs/routes to audit
- Viewports and color schemes
- Exclusions (third-party widgets, auth walls, WIP pages)
- Whether resuming from `.accessibility-audit-plan.json`

### 1. Static PDS integration scan

Before browser scans, check source for PDS anti-patterns — see [references/pds-integration-checks.md](references/pds-integration-checks.md):

```bash
rg '<(p-[a-z-]+)[^>]*\saria-[a-z]' --glob '*.{tsx,jsx,vue}' -n
rg '<(p-link|p-button)[^>]*icon=' --glob '*.{tsx,jsx,vue}' -n
rg '<p-carousel(?![^>]*skip-link-target)' --glob '*.{tsx,jsx,vue,html}' -n
rg 'outline:\s*none|outline:\s*0' --glob '*.{css,scss,ts,tsx}' -n
```

Record static findings for the plan artifact.

### 1b. Static component review (optional)

When auditing a specific component file, review props before runtime:

- `aria-*` on host → use `aria` prop
- Icon-only without label
- Custom focus styles without `:focus-visible`
- Heading `tag` props vs visual size

### 2a. axe-core scan

For each URL × viewport × theme:

1. Navigate to the URL
2. Wait for load + `componentsReady()` — see [references/axe-setup.md](references/axe-setup.md)
3. Inject axe from **local** `node_modules` (never CDN)
4. Run scan with WCAG tags above
5. Collect violations and incomplete checks

### 2b. Focus visibility scan

axe does **not** verify WCAG **2.4.7 Focus Visible**. Run after axe using **Playwright MCP** (works in any PDS product).

1. Tab through focusable elements (~20–40 stops)
2. After each Tab, probe `document.activeElement` for visible focus indicator (outline, box-shadow, border)
3. Traverse shadow roots to the deepest focused node
4. Record failures (`missing-indicator`) and warnings (`obscured` in sidebars)

See [references/fix-guide-focus.md](references/fix-guide-focus.md) for the probe logic and triage rules.

### 2c. Page structure audit

Check landmarks, headings, `lang`, `title`, skip links via **Playwright MCP** `page.evaluate`.

See [references/structure-audit.md](references/structure-audit.md) for the inline check script and PDS-specific patterns (`p-heading`, `#main-content`, `p-carousel` skip).

### 2d. Keyboard and modal checks

For pages with modals, drawers, or dialogs:

1. Tab to trigger; open overlay
2. Verify focus moves inside
3. Tab cycles within overlay (no trap beyond intended)
4. Escape closes (if supported)
5. Focus returns to trigger

See [references/fix-guide-keyboard.md](references/fix-guide-keyboard.md).

### 3. Triage violations

Group by impact (`critical`, `serious`, `moderate`, `minor`).

| Finding type | Action |
| ------------ | ------ |
| App code issue | Fix in app code; use fix guides |
| PDS integration mistake | See `pds-integration-checks.md` |
| PDS component bug | Workaround if possible; [file upstream bug](https://designsystem.porsche.com/v4/help/bug-report/) |
| Third-party embed | Document exclusion |
| False positive (shadow DOM, closed widget) | Document rationale |

### 4. Write plan artifact

Create or update `.accessibility-audit-plan.json` — see [references/plan-artifact.md](references/plan-artifact.md).

Include all findings from steps 1, 2a–2d with status `open`. This makes audits resumable.

### 5. Fix loop

For each violation (critical and serious first):

1. Locate source in codebase
2. Apply fix guide for the rule category:
   - ARIA/names → `fix-guide-aria.md`
   - Forms → `fix-guide-forms.md`
   - Keyboard → `fix-guide-keyboard.md`
   - Structure → `fix-guide-structure.md`
   - Contrast → `fix-guide-color.md`
   - Focus → `fix-guide-focus.md`
   - PDS integration → `pds-integration-checks.md`
3. Apply fix (or present diff for user approval)
4. Update plan artifact status
5. Re-scan affected URL (steps 2a–2d) until resolved

Stop when automated checks pass or remaining issues are documented exclusions.

### 6. Re-scan until clean

Repeat steps 2a–2d for all in-scope URLs. Update plan artifact scan summary.

### 7. Manual verification

Complete [references/manual-checklist.md](references/manual-checklist.md). Update plan `manualChecklist`.

### 8. Report

Output using the audit report template:

- Metadata, scope, exclusions
- Pass/fail per URL and scan type (axe, focus, structure)
- Violations table with WCAG criterion and fix status
- PDS integration findings
- Manual test results
- Jira-ready summary

Save as `accessibility-audit-report-{date}.md` unless the user specifies another path.

## PDS-specific rules during fixes

- Use `@porsche-design-system/components-{react|angular|vue}` for UI primitives
- Check each component's **Accessibility** tab on the PDS storefront (e.g. [Button accessibility](https://designsystem.porsche.com/v4/components/button/accessibility/))
- Do not re-implement patterns PDS already provides
- Integration dos and don'ts: [Accessibility: Do's and Don'ts](https://designsystem.porsche.com/v4/must-know/accessibility/dos-and-donts/)

## Out of scope

- Legal accessibility statement authoring
- Full screen reader certification
- Non-web EN 301 549 criteria
- Auditing without a running application (static analysis supplements only)

See [references/manual-checklist.md](references/manual-checklist.md) for criteria that cannot be automated.

## Output to the user

After each audit cycle:

1. Violation count by severity and scan type
2. Top fixes applied or proposed
3. Plan artifact path (`.accessibility-audit-plan.json`)
4. Remaining open issues
5. Manual checklist status
6. Path to generated report file

## In this repository (Porsche Design System)

- Agent context: `.cursor/rules/accessibility.mdc`, `.github/instructions/accessibility.instructions.md`, `CLAUDE.md`
- Audit skill: `.agents/skills/accessibility-audit/`
- **Storefront audit URL:** `http://localhost:3000` after `npm run start:storefront`
- **CI validation:** `npm run build:storefront && npm run test:a11y:storefront`
- **Report template:** `packages/storefront/public/assets/downloads/accessibility-audit-report-template.md`
- **Storefront docs:** [AI Accessibility Audit](https://designsystem.porsche.com/v4/must-know/accessibility/ai-accessibility-audit/)

Use the same Playwright MCP workflow as product teams. CI axe tests complement but do not replace agent-driven focus and structure checks.
