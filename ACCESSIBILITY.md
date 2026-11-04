# Accessibility Policy

Thank you for helping keep the **Porsche Design System** usable for everyone — including people who use keyboards,
screen readers, magnification, High Contrast Mode, or other assistive technologies.

## Commitment

Accessibility is a core quality requirement of the Porsche Design System. We design, develop, and test our components
and documentation against **[WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/)**.

That target guides our work. It is **not** a formal conformance claim for every consumer product built with PDS —
product teams remain responsible for accessible integration of our components into their applications.

We prioritize:

- **Keyboard access** — every interactive control is reachable and operable without a pointer, with a visible focus
  indicator and no keyboard traps
- **Assistive technology support** — semantic markup, accessible names, and roles/states that work with screen readers
- **Perception** — sufficient contrast, High Contrast Mode (`forced-colors`), and usability at 200% text zoom
- **Honest documentation** — known limitations and integration pitfalls are documented rather than hidden

## Scope

### In scope

- Published npm packages under `@porsche-design-system/components-{js|angular|react|vue}`
- Core web components in this repository (`packages/components`)
- The official storefront at `https://designsystem.porsche.com`
- Shared examples that demonstrate component usage (`packages/examples`)

### Out of scope

- Consumer applications that integrate PDS — report product-specific barriers to the product owner
- Unofficial forks, mirrors, or third-party demos (CodeSandbox, StackBlitz snapshots hosted by others)
- Upstream browser, OS, or assistive-technology bugs we cannot fix in this repository (we document workarounds when
  known)

## Supported environments

We target evergreen browsers covered by our [Browserslist](./.browserslistrc) configuration (broadly: recent Chrome,
Edge, Firefox, and Safari on desktop and mobile).

Manual screen-reader spot checks focus on **VoiceOver** (macOS / iOS) and **NVDA** (Windows). Other assistive
technologies may work, but are not part of our routine verification.

## How we test

Components go through automated and manual accessibility checks before release:

| Stage     | Coverage                                                                 |
| --------- | ------------------------------------------------------------------------ |
| Automated | axe-core (WCAG 2.2 AA + best practice), accessibility-tree snapshots     |
| Visual    | High Contrast Mode and 200% text-zoom visual regression tests            |
| Manual    | Keyboard navigation and screen-reader spot checks (e.g. VoiceOver, NVDA) |

Per-component results and guidance live on each component's **Accessibility** tab on the storefront.

## Contributor expectations

If you change UI, components, or documentation in this repository:

- Do a **keyboard-only pass** on interactive changes (logical tab order, visible focus, no traps, expected keys).
- Do not regress automated a11y coverage (`npm run test:a11y:components-js` and related package suites where
  applicable).
- Follow the storefront [Do's and Don'ts](https://designsystem.porsche.com/must-know/accessibility/dos-and-donts/) and
  each component's **Accessibility** tab (e.g. pass ARIA via the `aria` prop, not as host `aria-*` attributes).
- Keep semantics, accessible names, contrast, and High Contrast Mode support intact.

Agent-oriented rules for this repo also live in [`AGENTS.md`](./AGENTS.md) (Accessibility section).

## Known limitations

Web Components and Shadow DOM currently limit some ARIA patterns (notably ID-reference relationships across the shadow
boundary). We document these constraints and follow platform progress such as the
[Accessibility Object Model](https://github.com/WICG/aom). Browser differences can also affect how accessibility
features behave; component docs call these out where relevant.

Using PDS does not automatically make an entire product accessible — incorrect integration (for example putting `aria-*`
on a component host instead of the `aria` prop, or missing accessible names on icon-only controls) can still introduce
barriers. See the storefront guidance linked below.

## Reporting an accessibility barrier

**Please report accessibility barriers.** You do not need to disclose a disability or diagnosis.

1. Search existing [GitHub issues](https://github.com/porsche-design-system/porsche-design-system/issues) to avoid
   duplicates.
2. Open a [Bug Report](https://github.com/porsche-design-system/porsche-design-system/issues/new/choose) (or follow the
   [Bug Report guide](https://designsystem.porsche.com/help/bug-report/) on the storefront).
3. Mention that the issue is an **accessibility barrier**, apply or ask for the `a11y` label, and include, where
   possible:
   - The task you were trying to complete and what went wrong
   - Affected component(s), package(s), and version(s)
   - Operating system, browser, and assistive technology (with versions)
   - Steps to reproduce and a minimal reproduction (StackBlitz is preferred — see the bug report guide)
   - Impact using the severity guide below, and any workaround you found

You can report in **English or German**.

Avoid posting personal, medical, account, or security-sensitive information in a public issue. Security vulnerabilities
belong in [SECURITY.md](./SECURITY.md), not here.

### Severity

Use this to describe impact when reporting. Maintainers may adjust severity during triage.

| Severity | Meaning                                                               |
| -------- | --------------------------------------------------------------------- |
| Critical | Blocks completing a core task with no reasonable workaround           |
| High     | Significant difficulty; a workaround exists                           |
| Medium   | Inconsistent or degraded experience that does not block the main task |
| Low      | Minor issue with limited impact on usability                          |

### What to expect

We triage accessibility reports with other bugs and will follow up on the GitHub issue. Where a workaround exists, we
aim to share it while a fix is in progress.

## Further documentation

| Resource                                                                                                   | Purpose                                                              |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [Accessibility introduction](https://designsystem.porsche.com/must-know/accessibility/introduction/)       | How PDS approaches accessibility and testing                         |
| [Do's and Don'ts](https://designsystem.porsche.com/must-know/accessibility/dos-and-donts/)                 | Practical integration guidance for consumers                         |
| [AI Agent Context](https://designsystem.porsche.com/must-know/accessibility/ai-agent-context/)             | Install generation-time WCAG 2.2 AA guardrails for AI coding agents  |
| [AI Accessibility Audit](https://designsystem.porsche.com/must-know/accessibility/ai-accessibility-audit/) | Run guided WCAG 2.2 AA audits with the web-accessibility-audit skill |
| [PDS Agent Skills](https://designsystem.porsche.com/skills/introduction/general/)                          | Version-matched PDS component knowledge skills for AI agents         |

## Ownership and maintenance

Accessibility for this repository is owned by the
[@porsche-design-system/maintainers](https://github.com/orgs/porsche-design-system/teams/maintainers) team. This page is
updated when our commitment, reporting process, or known limitations change.

Suggestions that improve this document (rather than report a barrier) are welcome via a GitHub issue or pull request.

---

**Last updated:** 2026-11-04
