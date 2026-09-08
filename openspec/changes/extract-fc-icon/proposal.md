## Why

Every internal use of `p-icon` inside another shadow web component (`p-button`, `p-link`, `p-select`, `p-pagination`, `multi-select`, ~18 call sites in total) nests a full custom element: an extra shadow root, an element upgrade, its own stylesheet, a component lifecycle, and an `<img>` that triggers an asynchronous CDN fetch. On icon-dense pages (data tables full of buttons, multi-selects where every option carries a `check` icon) this multiplies into measurable memory, style-recalc, and network cost. The repo already validated the fix once with `fc-dismiss-button`, which inlines the close icon as a CSS mask specifically to avoid a nested `p-icon`; this change generalizes that proven pattern to all internal icon rendering.

## What Changes

- Introduce a shared Stencil **functional component** `FCIcon` (in `components/src/components/common/fc-icon/`) plus a colocated `getFCIconStyles()` JSS helper that centralizes icon styling (responsive `size` via the `ex`-unit font-size trick, `color`/`--p-icon-color`, `--p-icon-size`, RTL flipping for flippable icons, and forced-colors handling).
- `FCIcon` renders **without its own shadow root** into the consuming component's shadow root:
  - decorative case (`aria-hidden`): a masked `<span>`/`::before` (no `<img>`, no `alt`).
  - meaningful case (accessible `aria-label`): an `<img>` with `alt`, preserving current a11y and fetch-priority behavior.
- Re-point the **`p-icon` web component** to render `FCIcon` internally, so icon markup has a single source of truth. `p-icon`'s public API (tag, props, CSS variables, slots) is unchanged — **not a breaking change**.
- Convert internal consumers to `FCIcon`, in two categories:
  - **Fixed-icon consumers** (e.g. `select` `arrow-head-down`, `select-option` `check`, `pagination` arrows, `input-search/email/tel/url`): inline the SVG path as a data-URI mask → no shadow root **and** no CDN fetch.
  - **Configurable-icon consumers** (e.g. `button`, `button-pure`, `link`, `link-pure`, `tag`, `segmented-control-item`): use `FCIcon` with a `mask: url(<CDN>)` → drops the shadow root, `<img>`, and lifecycle, but keeps one CDN fetch (arbitrary `IconName` cannot be bundled).
- Update unit, a11y (axe-core + a11y tree), and VRT (incl. High Contrast Mode and 200% text zoom) coverage to prove visual and accessibility parity.

## Capabilities

### New Capabilities

- `fc-icon`: A non-shadow, internally-reusable functional icon renderer (markup + shared JSS styling contract) that produces the same visual/accessible icon as `p-icon` without adding a nested shadow root, used by `p-icon` itself and by other PDS components.
- `internal-icon-rendering`: The convention/requirements for how PDS components render decorative and meaningful icons internally — when to inline a fixed SVG mask vs. use a CDN `mask: url()`, and how accessibility (decorative vs. meaningful), RTL flipping, sizing, color, and forced-colors must be preserved.

### Modified Capabilities

<!-- No existing OpenSpec specs; nothing to modify. -->

## Impact

- **New code**: `packages/components/src/components/common/fc-icon/fc-icon.tsx` and `fc-icon-styles.ts` (+ specs).
- **Modified components**: `p-icon` (delegates to `FCIcon`) and ~18 internal consumers (`button`, `button-pure`, `link`, `link-pure`, `tag`, `tag-dismissible`, `select`, `select-option`, `multi-select`, `pagination`, `stepper-horizontal-item`, `segmented-control-item`, `state-message`, `input-email/tel/url/search`).
- **Shared styling**: icon styling logic must be centralized in `getFCIconStyles()` to avoid the copy/paste drift risk noted in `fc-dismiss-button-styles.ts`.
- **Public API**: unchanged. `p-icon` remains a public web component; framework wrappers are unaffected.
- **Tests**: unit, axe-core, a11y-tree snapshots, and VRT (common + HCM + text-zoom) for all touched components; a11y-tree snapshots may change where a nested `p-icon` element disappears from the accessibility tree (expected).
- **Performance**: fewer shadow roots and (for fixed icons) fewer CDN requests.

