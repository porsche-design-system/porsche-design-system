# Manual Verification Checklist (step 7)

Automated scans cannot replace human testing. Complete before sign-off.

## Required checks

| Check | How | Pass criteria |
| ----- | --- | ------------- |
| Keyboard-only flows | Tab, Shift+Tab, Enter, Space, Escape through primary journeys | All actions reachable; no mouse-only interactions |
| Focus visibility | Tab through UI visually | Focus ring visible on every interactive element |
| High Contrast Mode | OS HCM or DevTools `forced-colors: active` | UI usable; borders/focus remain visible |
| 200% text zoom | Browser zoom 200% or `text-size-adjust` | Content readable; no loss of function |
| Screen reader spot-check | VoiceOver (Mac), NVDA (Windows) | Names, roles, states announced correctly on critical flows |
| Reduced motion | `prefers-reduced-motion: reduce` | Animations reduced or disabled per policy |
| Form errors | Trigger validation errors | Errors announced; focus moves to first error if applicable |

## Cannot automate reliably

- Screen reader phrasing quality and natural language
- Cognitive load and plain language review
- Video/audio captions and transcripts
- Complex live region timing under real AT
- Cross-page consistency of navigation and help placement
- Legal accessibility statement content

## Record results

Update `.accessibility-audit-plan.json` → `manualChecklist` and the report (`references/report-template.md` → `accessibility-audit-report-{date}.md` at repo root).
