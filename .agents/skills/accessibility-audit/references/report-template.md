# Accessibility Audit Report

## Metadata

| Field | Value |
| ----- | ----- |
| **Application** | |
| **Auditor** | |
| **Date** | |
| **Tools used** | e.g. Playwright MCP + local axe-core, focus probe, structure audit |
| **Standard** | WCAG 2.2 Level AA |
| **Base URL** | e.g. `http://localhost:3000` |
| **Plan artifact** | `.accessibility-audit-plan.json` |

## Scope

### URLs audited

| URL | Viewports | Themes | axe | Focus | Structure | Result |
| --- | --------- | ------ | --- | ----- | --------- | ------ |
| | mobile, desktop | light, dark | Pass/Fail | Pass/Fail | Pass/Fail | Pass / Fail |

### Exclusions

<!-- List third-party widgets, auth-gated pages, or WIP areas not audited -->

-

## Summary

<!-- One paragraph: overall status, violation counts by severity, readiness for release -->

**Overall result:** Pass / Fail / Pass with documented exceptions

| Severity | Count | Fixed | Open |
| -------- | ----- | ----- | ---- |
| Critical | | | |
| Serious | | | |
| Moderate | | | |
| Minor | | | |

## Violations (axe)

| ID | Rule | WCAG | Severity | URL | Element / selector | Status | Notes |
| -- | ---- | ---- | -------- | --- | ------------------ | ------ | ----- |
| 1 | | | | | | Open / Fixed / Won't fix | |

## PDS integration findings

| ID | Anti-pattern | Source file | Status | Fix applied |
| -- | ------------ | ----------- | ------ | ----------- |
| | aria on host / icon-only / focus / carousel skip / structure | | Open / Fixed | |

## Focus visibility (step 2b)

| URL | Stops | Failures | Warnings (obscured) | Result |
| --- | ----- | -------- | ------------------- | ------ |
| | | | | Pass / Fail |

## Page structure (step 2c)

| URL | lang | title | h1 | main | Skip link | Issues | Result |
| --- | ---- | ----- | -- | ---- | --------- | ------ | ------ |
| | | | | | | | Pass / Fail |

## Manual test results

| Check | Result | Notes |
| ----- | ------ | ----- |
| Keyboard-only primary flows | Pass / Fail | |
| Focus visibility (visual) | Pass / Fail | |
| High Contrast Mode | Pass / Fail | |
| 200% text zoom | Pass / Fail | |
| Screen reader spot-check | Pass / Fail | |
| Reduced motion | Pass / Fail / N/A | |
| Form error association | Pass / Fail / N/A | |

## Open issues

| ID | Type | Description | Owner | Ticket |
| -- | ---- | ----------- | ----- | ------ |
| | App / PDS upstream / Third-party | | | |

---

## Jira paste block

Copy the section below into a Jira issue or epic:

```
h2. Accessibility audit summary

*Application:* [name]
*Date:* [date]
*Standard:* WCAG 2.2 AA
*Result:* [Pass / Fail / Pass with exceptions]

h3. Findings

# [Critical/Serious] [Short title] — [URL]
**WCAG:** [criterion]
**Description:** [what is wrong]
**Acceptance criteria:** [how to verify the fix]

# [Critical/Serious] [Short title] — [URL]
...

h3. Automated scans

* axe-core: [Pass/Fail]
* Focus visibility: [Pass/Fail]
* Page structure: [Pass/Fail]
* PDS integration (static): [count issues]

h3. Manual verification

* Keyboard: [Pass/Fail]
* Focus visibility: [Pass/Fail]
* High Contrast Mode: [Pass/Fail]
* 200% zoom: [Pass/Fail]
* Screen reader: [Pass/Fail]

h3. Exclusions

* [list documented exclusions]
```
