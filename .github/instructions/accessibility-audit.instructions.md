---
applyTo: '**/*.{html,css,scss,js,ts,tsx,jsx,vue,mdx,md}'
---

# Accessibility Audit Instructions (PDS monorepo)

Use when the user asks for an accessibility audit, WCAG scan, or a11y review.

## Before scanning

1. Confirm `AGENTS.md`, `.github/instructions/accessibility.instructions.md`, and this file are in the repo.
2. Build if auditing built output: `npm run build:storefront` (or full `npm run build`).
3. Start the storefront dev server: `npm run start:storefront` → typically `http://localhost:3000`.
4. Confirm Playwright MCP is installed in your individual Copilot / VS Code MCP settings.
5. Install browsers if needed: `npx playwright install chromium`.

## PDS audit targets

| Target | URL / command |
| ------ | ------------- |
| **Storefront (agent audit)** | `http://localhost:3000` after `npm run start:storefront` |
| **Storefront (CI axe crawl)** | `npm run test:a11y:storefront` (port 8080, requires build) |
| **Components** | `npm run test:a11y:components-js` after `npm run build` |

Prefer agent audits on the **running dev server**. Use `npm run test:a11y:storefront` to validate fixes in CI.

Focus visibility (step 2b) and page structure (step 2c) use **Playwright MCP** — same workflow as product teams. See skill references `fix-guide-focus.md` and `structure-audit.md`.

## Audit workflow

Follow `.cursor/skills/accessibility-audit/SKILL.md`:

0. **Scope** — URLs, viewports, themes, exclusions; check for existing `.accessibility-audit-plan.json`
1. **Static PDS scan** — grep for aria-on-host, icon-only controls, carousel skip, outline:none
2. **axe scan (2a)** — local axe injection; tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`; wait for `componentsReady()`
3. **Focus visibility (2b)** — Playwright MCP Tab walk + computed-style probe (see `references/fix-guide-focus.md`)
4. **Structure audit (2c)** — Playwright MCP `page.evaluate` (see `references/structure-audit.md`)
5. **Keyboard/modals (2d)** — overlay focus trap and return
6. **Triage** — group by severity; use fix guides in `references/`
7. **Plan artifact** — write `.accessibility-audit-plan.json`
8. **Fix loop** — re-scan until clean or documented
9. **Manual checks** — see `references/manual-checklist.md`
10. **Report** — use `packages/storefront/public/assets/downloads/accessibility-audit-report-template.md`

## Fix principles

- WCAG 2.2 AA is non-negotiable.
- Prefer PDS `p-*` components and `@porsche-design-system/components-react/ssr` in storefront.
- Use PDS `aria` prop; never place `aria-*` on component host elements.
- Visible focus via `:focus-visible`; support `forced-colors`.
- Inject axe from local `node_modules` — never CDN (CSP blocks it).
- For component bugs, file at [PDS bug report](https://designsystem.porsche.com/v4/help/bug-report/).

## Reference files

- Skill: `.cursor/skills/accessibility-audit/SKILL.md`
- Storefront docs: [AI Accessibility Audit](https://designsystem.porsche.com/v4/must-know/accessibility/ai-accessibility-audit/)
- PDS integration checks: `.cursor/skills/accessibility-audit/references/pds-integration-checks.md`
- axe setup: `.cursor/skills/accessibility-audit/references/axe-setup.md`

## Out of scope

Legal accessibility statements, full SR certification, auditing without a running app.
