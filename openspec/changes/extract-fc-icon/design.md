## Context

`p-icon` is a shadow web component (`shadow: true`) that renders an `<img>` (pushed off-screen via `objectPosition: -9999px`) and paints the visible glyph with a CSS `mask` + `background-color`. Per its own code comment, the `<img>` exists only for two reasons: accessible `alt` text and fetch-priority handling. The icon graphic itself is fetched from the CDN (`buildIconUrl` → `getCDNBaseURL()/icons/...`).

`p-icon` is nested internally by ~18 components (`button`, `button-pure`, `link`, `link-pure`, `tag`, `tag-dismissible`, `select`, `select-option`, `multi-select`, `pagination`, `stepper-horizontal-item`, `segmented-control-item`, `state-message`, `input-email/tel/url/search`). Each nested instance adds a shadow root, an element upgrade, a stylesheet (`attachComponentCss`), a lifecycle, and an `<img>`/CDN request.

The repo already has a precedent that solves exactly this problem for one case: `common/fc-dismiss-button` is a Stencil `FunctionalComponent` that renders a native `<button>` with the `close` icon inlined as a CSS mask (`getInlineSVGBackgroundImage`) — its doc comment states it does so "so it needs neither a nested `p-button` nor a `p-icon` (which would fetch the SVG from the CDN asynchronously)". Its styling lives in `fc-dismiss-button-styles.ts` and carries a `NOTE:` warning that values were copied from the shared button styles and must be kept in sync — a concrete example of the drift risk this design must avoid.

## Goals / Non-Goals

**Goals:**

- Provide a shared, non-shadow `FCIcon` functional component + `getFCIconStyles()` helper that produces the same visual/accessible icon as `p-icon`.
- Make `p-icon` delegate to `FCIcon` (single source of truth for icon markup/styles).
- Remove nested `p-icon` shadow roots from internal consumers.
- For fixed internal icons, also remove the CDN fetch by inlining the SVG mask.
- Preserve public API, visual output (VRT parity), and accessibility (axe-core + a11y-tree parity, HCM, RTL, 200% zoom).

**Non-Goals:**

- No change to the public `p-icon` element, its props, CSS variables, or the framework wrappers.
- No change to the CDN icon library or `buildIconUrl` mechanism.
- No bundling of the entire icon set into the components package (only fixed, already-referenced icons are inlined).
- No change to `fc-dismiss-button` behavior (it may later be reframed on top of `FCIcon`, but that is out of scope here).

## Decisions

### 1. FCIcon as a Stencil `FunctionalComponent`, not a web component

Mirror the `fc-dismiss-button` pattern: `FCIcon` renders into the consumer's shadow root (no shadow boundary, no upgrade, no lifecycle). This is the whole point — a nested web component is what creates the redundant shadow root. Alternative considered: a light-DOM (`shadow: false`) `p-icon` variant — rejected because it still creates a custom element/upgrade and complicates the public element story.

### 2. Structure: markup + colocated style helper

Create `common/fc-icon/fc-icon.tsx` (markup) and `common/fc-icon/fc-icon-styles.ts` exporting `getFCIconStyles(...)`. Consumers merge `getFCIconStyles()` into their own `getComponentCss` under the icon class key. This directly addresses the drift risk: icon styling logic exists in exactly one place, so consumers never copy `ex`-unit sizing, color, RTL-flip, or forced-colors values. `p-icon-styles.ts` becomes a thin caller of the same helper.

### 3. Two rendering elements: `<span>` (decorative) vs `<img>` (meaningful)

Internal icons are effectively always `aria-hidden="true"` (decorative) → render a masked `<span>`/`::before` with no `<img>` and no `alt` (lighter, matches dismiss-button). When an accessible label is present (standalone `p-icon` with `aria-label`), render the `<img alt>` variant to keep alt text + fetch priority. `FCIcon` branches on the presence of an accessible label. Alternative considered: always `<img>` — rejected because it keeps the element/fetch-priority overhead for the decorative majority.

### 4. Two icon-source strategies: inlined mask vs CDN mask

- **Fixed icons** (name known at build time): inline the SVG path via `getInlineSVGBackgroundImage(...)` → zero CDN fetch. Applies to `select` (`arrow-head-down`), `select-option` (`check`), `pagination` (arrows), `input-search/email/tel/url`, `tag-dismissible` (`close`, already effectively done by dismiss-button), etc.
- **Configurable icons** (name from a consumer prop, arbitrary `IconName`): keep `mask: url(buildIconUrl(...))` from the CDN. Applies to `button`, `button-pure`, `link`, `link-pure`, `tag`, `segmented-control-item`, and also custom `iconSource`.

Inlining all icons is explicitly rejected (would bloat the bundle and defeat the CDN library). Only icons the components already hardcode are inlined.

### 5. Staged rollout

1. Extract `FCIcon` + `getFCIconStyles`; re-point `p-icon` to it and prove parity (no consumer change yet).
2. Convert fixed-icon consumers (highest, lowest-risk win — no shadow *and* no fetch).
3. Convert configurable-icon consumers (CDN-mask path; more VRT care).

This keeps each step independently verifiable and reversible.

## Risks / Trade-offs

- **Styling drift across consumers** → Centralize everything in `getFCIconStyles()`; forbid copy-pasting icon CSS values (the `fc-dismiss-button-styles.ts` `NOTE` is the cautionary example). Add a unit test for the style helper.
- **Visual regressions (mask geometry, size via `ex`-unit, RTL flip, HCM)** → Run full VRT incl. High Contrast Mode and 200% text-zoom for every touched component; keep `isFlippableIcon` logic inside the shared helper.
- **Accessibility-tree snapshot changes** → Expected where the nested `p-icon` element disappears; review each a11y-tree diff to confirm it only removes the redundant node and the component's accessible name is unchanged.
- **Fetch-priority/loading semantics differ** between `<img loading="lazy">` and `mask: url()` for the configurable path → Sanity-check perceived loading behavior; standalone `p-icon` (meaningful) keeps the `<img>` path unchanged.
- **Inlined SVG paths can go stale** vs the source icon in `packages/assets` → Reference the source path in a comment (as dismiss-button does) and cover with VRT; keep the inlined set minimal.

## Migration Plan

- Purely internal refactor; no consumer-facing migration. Ship behind normal VRT/a11y gates.
- Rollback is per-stage: each converted component can revert to nesting `p-icon` independently since the public API and `p-icon` itself remain intact throughout.

## Open Questions

- Should `fc-dismiss-button` be re-based on `FCIcon` now (dedupe the `close` inline) or left as-is for a follow-up? (Leaning follow-up to keep this change focused.)
- Exact prop shape of `FCIcon` (single `aria`/label prop vs explicit `decorative` boolean) — to be finalized during step 1 while keeping `p-icon` parity.

