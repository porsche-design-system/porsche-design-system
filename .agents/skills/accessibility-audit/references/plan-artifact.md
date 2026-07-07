# Audit Plan Artifact (`.accessibility-audit-plan.json`)

Write this file after triage (step 4) to make audits **resumable** across agent sessions. Update after each fix cycle.

## Schema

```json
{
  "version": 1,
  "metadata": {
    "application": "My App",
    "baseUrl": "http://localhost:3000",
    "auditor": "AI agent + developer",
    "startedAt": "2026-07-07T10:00:00Z",
    "updatedAt": "2026-07-07T11:30:00Z",
    "standard": "WCAG 2.2 AA"
  },
  "scope": {
    "urls": ["/", "/checkout"],
    "viewports": [320, 768],
    "themes": ["light", "dark"],
    "exclusions": ["third-party chat widget"]
  },
  "findings": [
    {
      "id": "F001",
      "status": "open",
      "severity": "serious",
      "wcag": "4.1.2",
      "rule": "button-name",
      "url": "/checkout",
      "viewport": 320,
      "theme": "light",
      "selector": "p-button.icon-only",
      "description": "Icon-only submit button has no accessible name",
      "fixGuide": "fix-guide-aria.md",
      "pdsPattern": "aria prop with aria-label",
      "sourceFile": "src/features/checkout/Submit.tsx",
      "assignedTo": null,
      "ticket": null
    }
  ],
  "scanSummary": {
    "axe": { "violations": 3, "incomplete": 2, "passes": 45 },
    "focusVisibility": { "passed": false, "issueCount": 1 },
    "structure": { "passed": true, "issueCount": 0 },
    "pdsIntegration": { "staticIssues": 2 }
  },
  "manualChecklist": {
    "keyboardFlows": "pending",
    "screenReader": "pending",
    "highContrastMode": "pending",
    "zoom200": "pending",
    "reducedMotion": "pending"
  }
}
```

## Status values

| Status | Meaning |
| ------ | ------- |
| `open` | Not fixed |
| `in_progress` | Fix underway |
| `fixed` | Verified by re-scan |
| `wont_fix` | Documented exclusion |
| `upstream` | PDS component bug filed |

## Workflow

1. After step 3 triage → create plan with all findings as `open`
2. Before each fix → set `in_progress`
3. After re-scan confirms → set `fixed` with `updatedAt`
4. On resume → read plan; continue with `open` / `in_progress` items
5. On report (step 8) → fill `references/report-template.md`, save as `accessibility-audit-report-{date}.md` at repo root

## Severity mapping (axe impact)

| axe impact | Plan severity |
| ---------- | ------------- |
| critical | critical |
| serious | serious |
| moderate | moderate |
| minor | minor |

Non-axe findings (focus, structure, static PDS) use WCAG-based severity judgment.
