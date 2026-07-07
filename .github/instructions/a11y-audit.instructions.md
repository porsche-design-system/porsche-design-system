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

## Audit workflow

1. **Define scope** — URLs, viewports (mobile ~320px, desktop ~768px), light/dark themes, exclusions.
2. **Scan** — Playwright MCP + axe-core; tags: `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`.
3. **Triage** — Group by severity; separate storefront/app fixes from core component issues.
4. **Fix loop** — Propose minimal fixes; re-scan until clean or documented.
5. **Manual checks** — Keyboard-only, focus visibility, HCM, 200% zoom, screen reader spot-check.
6. **Report** — Use `packages/storefront/public/assets/downloads/a11y-audit-report-template.md`.

## Fix principles

- WCAG 2.2 AA is non-negotiable.
- Prefer PDS `p-*` components and `@porsche-design-system/components-react/ssr` in storefront.
- Use PDS `aria` prop; never place `aria-*` on component host elements.
- Visible focus via `:focus-visible`; support `forced-colors`.
- For component bugs, file at `/help/bug-report` on the storefront.

## Related configuration

- Cursor audit skill: `.cursor/skills/a11y-audit/SKILL.md`
- Storefront docs: `packages/storefront/src/app/(main)/must-know/accessibility/ai-accessibility-audit/`

## Out of scope

Legal accessibility statements, full SR certification, auditing without a running app.
