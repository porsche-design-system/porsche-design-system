# WCAG 2.2 AA — Automation Coverage Matrix

Use this matrix to proof audit completeness. Each criterion maps to a skill step and tool.

**Legend:** `Auto` = fully automatable | `Partial` = automate + manual triage | `Manual` = human only

| WCAG | Criterion | Automation | Skill step | Tool |
| ---- | --------- | ---------- | ---------- | ---- |
| 1.1.1 | Non-text Content | Auto | 2a | axe `image-alt`, `svg-img-alt` |
| 1.2.1–1.2.5 | Time-based Media | Manual | 7 | Human review of captions/transcripts |
| 1.3.1 | Info and Relationships | Auto | 2a, 2c, 1 | axe + structure audit |
| 1.3.2 | Meaningful Sequence | Partial | 2a, 7 | axe + SR spot-check |
| 1.3.3 | Sensory Characteristics | Manual | 7 | Content review |
| 1.4.1 | Use of Color | Partial | 2a, 7 | axe + visual check |
| 1.4.3 | Contrast (Minimum) | Partial | 2a, 3 | axe (shadow DOM triage) |
| 1.4.4 | Resize Text | Partial | 7 | Browser 200% zoom |
| 1.4.10 | Reflow | Partial | 7 | Resize probe optional |
| 1.4.11 | Non-text Contrast | Partial | 2a, 3 | axe incomplete |
| 1.4.12 | Text Spacing | Partial | 2a | axe best-practice |
| 1.4.13 | Content on Hover/Focus | Partial | 2d, 7 | Keyboard + hover |
| 2.1.1 | Keyboard | Auto | 2d | Tab walk, modal traps |
| 2.1.2 | No Keyboard Trap | Auto | 2d | Escape/Tab from overlays |
| 2.2.1 | Timing Adjustable | Manual | 7 | Session timeout review |
| 2.2.2 | Pause, Stop, Hide | Partial | 7 | `prefers-reduced-motion` |
| 2.3.1 | Three Flashes | Partial | 2a | axe `no-flash` |
| 2.4.1 | Bypass Blocks | Auto | 2c, 1 | Skip link + landmarks |
| 2.4.2 | Page Titled | Auto | 2c | `<title>` check |
| 2.4.3 | Focus Order | Partial | 2b, 2d | Tab walk |
| 2.4.4 | Link Purpose (In Context) | Auto | 2a, 1 | axe `link-name` |
| 2.4.5 | Multiple Ways | Manual | 7 | Navigation review |
| 2.4.6 | Headings and Labels | Auto | 2a, 2c, 1 | axe + heading order |
| 2.4.7 | Focus Visible | Auto | 2b | Focus visibility probe |
| 2.4.11 | Focus Not Obscured (Min.) | Partial | 2b | Obscured = warning |
| 2.5.1 | Pointer Gestures | Manual | 7 | Complex gesture review |
| 2.5.2 | Pointer Cancellation | Manual | 7 | Interaction review |
| 2.5.3 | Label in Name | Partial | 2a | axe `label-content-name-mismatch` |
| 2.5.4 | Motion Actuation | Manual | 7 | Device motion review |
| 2.5.7 | Dragging Movements | Manual | 7 | Alternative input review |
| 2.5.8 | Target Size (Minimum) | Partial | 2a | axe best-practice |
| 3.1.1 | Language of Page | Auto | 2c | `html[lang]` |
| 3.1.2 | Language of Parts | Partial | 2a | axe `valid-lang` |
| 3.2.1 | On Focus | Partial | 2d | Focus event review |
| 3.2.2 | On Input | Partial | 2d | Form behavior |
| 3.2.3 | Consistent Navigation | Manual | 7 | Cross-page review |
| 3.2.4 | Consistent Identification | Manual | 7 | Cross-page review |
| 3.2.6 | Consistent Help | Manual | 7 | Help placement |
| 3.3.1 | Error Identification | Partial | 2a, 1 | axe forms rules |
| 3.3.2 | Labels or Instructions | Auto | 2a, 1 | axe `label`, static scan |
| 3.3.3 | Error Suggestion | Manual | 7 | Error message quality |
| 3.3.4 | Error Prevention | Manual | 7 | Legal/financial flows |
| 3.3.7 | Redundant Entry | Manual | 7 | Form UX review |
| 3.3.8 | Accessible Authentication | Partial | 2a, 7 | CAPTCHA, cognitive load |
| 4.1.1 | Parsing | Auto | 2a | axe `duplicate-id`, `valid-lang` |
| 4.1.2 | Name, Role, Value | Auto | 2a, 1 | axe + PDS `aria` prop |
| 4.1.3 | Status Messages | Partial | 2a, 7 | axe `aria-live` + SR |

## PDS integration rules (PR #4543)

| Anti-pattern | Automation | Skill step |
| ------------ | ---------- | ---------- |
| `aria-*` on PDS host | Auto | 1, 2a | 
| Icon-only without name | Auto | 1, 2a |
| Missing focus indicators | Auto | 2b |
| Carousel without skip link | Auto | 1, 2c |
| Wrong headings/landmarks | Auto | 2c |

## Manual-only (do not claim automation)

- Screen reader phrasing and announcement quality (VoiceOver, NVDA, JAWS)
- Cognitive load, reading level, plain language
- Video/audio captions, transcripts, audio description
- Complex live region behavior under real assistive technology
- Legal accessibility statement accuracy
- Full EN 301 549 non-web criteria

## PDS CI parity

Align axe configuration with PDS automated testing (see [AI Accessibility Audit](https://designsystem.porsche.com/v4/must-know/accessibility/ai-accessibility-audit/)):

- Tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`
- Exclude: `iframe`
- Disabled: `landmark-unique` (storefront only — do not disable globally in product apps without reason)
