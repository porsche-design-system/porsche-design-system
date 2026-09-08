## 1. Extract FCIcon + shared styles

- [ ] 1.1 Create `packages/components/src/components/common/fc-icon/fc-icon.tsx` as a Stencil `FunctionalComponent` that renders icon markup (no shadow root), branching between a decorative masked `<span>`/`::before` and a meaningful `<img alt>` based on the presence of an accessible label.
- [ ] 1.2 Create `packages/components/src/components/common/fc-icon/fc-icon-styles.ts` exporting `getFCIconStyles(...)` centralizing responsive `size` (`ex`-unit font-size), `color`/`inherit`/`--p-icon-color`, `--p-icon-size`, `isFlippableIcon` RTL flipping, and forced-colors handling (move logic out of `icon-styles.ts`).
- [ ] 1.3 Support both icon-source strategies in FCIcon: inlined SVG data-URI mask (`getInlineSVGBackgroundImage`) for fixed icons and `mask: url(buildIconUrl(...))` for configurable icons/`iconSource`.
- [ ] 1.4 Add `fc-icon.spec.ts` and `fc-icon-styles.spec.ts` unit tests (decorative vs meaningful, size/color/flip/HCM output, inline vs CDN mask).

## 2. Re-point p-icon to FCIcon

- [ ] 2.1 Refactor `packages/components/src/components/icon/icon.tsx` `render()` to delegate to `FCIcon`, keeping tag, `name`/`source`/`color`/`size`/`aria` props and behavior unchanged.
- [ ] 2.2 Refactor `icon-styles.ts` to call `getFCIconStyles(...)` (single source of truth); keep `--p-icon-size`/`--p-icon-color` CSS variable docs intact.
- [ ] 2.3 Update/confirm `icon.spec.ts`, `icon-styles.spec.ts`, `icon-utils.spec.ts` pass with no public-API change.
- [ ] 2.4 Run existing VRT (common + HCM + text-zoom) and axe-core/a11y-tree for `p-icon` to confirm parity.

## 3. Convert fixed-icon consumers (no shadow, no CDN fetch)

- [ ] 3.1 Convert `select/select/select.tsx` (`arrow-head-down`) to inlined `FCIcon`.
- [ ] 3.2 Convert `multi-select/multi-select/multi-select.tsx` (`arrow-head-down`) and `select/select-option/select-option.tsx` (`check`) to inlined `FCIcon`.
- [ ] 3.3 Convert `pagination/pagination.tsx` (`arrow-left`/`arrow-right`) to inlined `FCIcon`.
- [ ] 3.4 Convert `input-search`, `input-email`, `input-tel`, `input-url` start icons to inlined `FCIcon`.
- [ ] 3.5 Convert `tag-dismissible/tag-dismissible.tsx` (`close`) and `common/state-message/state-message.tsx` to `FCIcon` (inline where the icon is fixed).
- [ ] 3.6 Update each converted component's `-styles.ts` to merge `getFCIconStyles()` and remove nested-`p-icon` styling; update unit tests.

## 4. Convert configurable-icon consumers (no shadow, CDN mask)

- [ ] 4.1 Convert `button/button.tsx` internal icon to `FCIcon` (CDN mask via `icon`/`iconSource`), keeping `hasVisibleIcon` gating and `color="inherit"`.
- [ ] 4.2 Convert `button-pure/button-pure.tsx` and `link/link.tsx` internal icons to `FCIcon`.
- [ ] 4.3 Convert `link-pure/link-pure.tsx` and `tag/tag.tsx` internal icons to `FCIcon`.
- [ ] 4.4 Convert `segmented-control/segmented-control-item/segmented-control-item.tsx` and `stepper-horizontal/stepper-horizontal-item/stepper-horizontal-item.tsx` internal icons to `FCIcon`.
- [ ] 4.5 Update each converted component's `-styles.ts` and unit tests; ensure no nested `p-icon` remains (grep for `PrefixedTagNames.pIcon`).

## 5. Verification

- [ ] 5.1 Build core dependencies + components (`npm run build:core-dependencies` then components) and fix type/compile errors.
- [ ] 5.2 Run unit tests: `npm run test:unit:components`.
- [ ] 5.3 Run axe-core and a11y-tree tests; review a11y-tree snapshot diffs to confirm only the redundant nested icon node is removed and accessible names are unchanged.
- [ ] 5.4 Run VRT in Docker for common + HCM + text-zoom (`./docker.sh npm run test:vrt:components-js`) and update baselines only after confirming visual parity.
- [ ] 5.5 Confirm no remaining internal `PrefixedTagNames.pIcon` usages except where intentionally kept; update `CHANGELOG`/docs if needed.

