import {
  blurFrosted,
  colorCanvas,
  colorFrosted,
  colorFrostedSoft,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  radiusLg,
  radiusXl,
  ref,
  spacingStatic2Xs,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../styles';
import { getCss, overlayTransitionSupportsQuery } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { POPOVER_SAFE_ZONE } from './popover-utils';

/**
 * @css-variable {"name": "--p-popover-w", "description": "Width of the popover.", "defaultValue": "max-content"}
 */
const cssVariableWidth = '--p-popover-w';

/**
 * @css-variable {"name": "--p-popover-h", "description": "Height of the popover.", "defaultValue": "auto"}
 */
const cssVariableHeight = '--p-popover-h';

/**
 * @css-variable {"name": "--p-popover-min-w", "description": "Min width of the popover.", "defaultValue": "0px"}
 */
const cssVariableMinWidth = '--p-popover-min-w';

/**
 * @css-variable {"name": "--p-popover-min-h", "description": "Min height of the popover.", "defaultValue": "auto"}
 */
const cssVariableMinHeight = '--p-popover-min-h';

/**
 * @css-variable {"name": "--p-popover-max-w", "description": "Max width of the popover.", "defaultValue": "min(calc(100dvw - 16px), 48ch)"}
 */
const cssVariableMaxWidth = '--p-popover-max-w';

/**
 * @css-variable {"name": "--p-popover-max-h", "description": "Max height of the popover.", "defaultValue": "calc(100dvh - 16px)"}
 */
const cssVariableMaxHeight = '--p-popover-max-h';

/**
 * @css-variable {"name": "--p-popover-px", "description": "Horizontal padding of the popover.", "defaultValue": "16px"}
 */
const cssVarPaddingInline = '--p-popover-px';

/**
 * @css-variable {"name": "--p-popover-py", "description": "Vertical padding of the popover.", "defaultValue": "12px"}
 */
const cssVarPaddingBlock = '--p-popover-py';

/**
 * @css-variable {"name": "--p-popover-radius", "description": "Border radius of the popover.", "defaultValue": "12px"}
 */
const cssVarRadius = '--p-popover-radius';

const iconInfo = getInlineSVGBackgroundImage(
  `<path d="M12.5 10v6h-1v-6zm0-2v1h-1V8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16m0-1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9"/>`
);

export const getComponentCss = (isCompact: boolean, isOpen: boolean): string => {
  // fade-in on open (via `@starting-style` below), fade-out on close. While closing, the panel keeps `display: grid`
  // (Chromium via `overlay` + `display` `allow-discrete`; Safari/Firefox via the deferred `hidePopover()`), so
  // `display: none` only describes the fully-closed terminal state. Tabbability / a11y-tree removal during the fade-out
  // is handled immediately via the `inert` attribute on the panel (see popover.tsx), so no `visibility` toggle is needed.
  const transition = getTransition('opacity', 'short', isOpen ? 'in' : 'out');

  const css = getCss({
    '@global': {
      ':host': {
        // We use display: inline-block for now, but would prefer display: contents once possible. The popover mimics
        // the native [popover] element, so its :host ideally shouldn't participate in visual DOM rendering. Switching
        // is blocked by the slotted button, which must remain rendered until it can be referenced via an external
        // button (e.g. through a ref property).
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      'slot:not([name]), p': {
        display: 'block',
        margin: 0, // reset ua-style for paragraphs
        minWidth: 0, // allow the grid item to shrink below its content size (needed for correct clamping via --p-popover-max-w)
        minHeight: 0, // allow the grid item to shrink below its content size so overflow scrolls instead of expanding the panel (needed for --p-popover-max-h)
        maxWidth: 'inherit',
        maxHeight: 'inherit',
        boxSizing: 'border-box',
        padding: `${ref(cssVarPaddingBlock, isCompact ? ref(spacingStaticXs) : `calc(12 * ${ref(spacingStatic2Xs)})`)} ${ref(cssVarPaddingInline, isCompact ? ref(spacingStaticSm) : ref(spacingStaticMd))}`,
        overflow: 'hidden auto',
        overscrollBehaviorY: 'none',
      },
      'slot[name="button"]': {
        display: 'block',
      },
      button: {
        all: 'unset',
        display: 'grid',
        font: `${ref(typescaleSm)} ${ref(fontPorscheNext)}`, // needed for correct width/height definition based on ex-unit
        width: ref(leadingNormal),
        height: ref(leadingNormal),
        borderRadius: ref(radiusFull),
        cursor: 'pointer',
        background: ref(colorFrosted),
        transition: getTransition('background-color'),
        WebkitBackdropFilter: ref(blurFrosted),
        backdropFilter: ref(blurFrosted),
        ...hoverMediaQuery({
          '&:hover': {
            background: ref(colorFrostedSoft),
          },
        }),
        '&:focus-visible': getFocusBaseStyles(),
        '&::after': {
          content: '""',
          WebkitMask: `${iconInfo} center/contain no-repeat`, // necessary for Sogou browser support :-)
          mask: `${iconInfo} center/contain no-repeat`,
          background: ref(colorPrimary),
        },
      },
      '[popover]': {
        all: 'unset',
        position: 'fixed', // matches floating ui's `fixed` strategy; required for correct top-layer positioning in Safari
        top: 0,
        left: 0,
        filter: 'drop-shadow(0 0 16px rgba(0,0,0,.3))',
        backdropFilter: 'drop-shadow(0 0 transparent)', // workaround for Firefox bug not rendering PDS frosted glass correctly when nested inside CSS filter: https://bugzilla.mozilla.org/show_bug.cgi?id=1797051
        borderRadius: ref(cssVarRadius, isCompact ? ref(radiusLg) : ref(radiusXl)),
        background: ref(colorCanvas),
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        color: ref(colorPrimary),
        width: ref(cssVariableWidth, 'max-content'),
        height: ref(cssVariableHeight, 'auto'),
        minWidth: ref(cssVariableMinWidth, '0px'),
        minHeight: ref(cssVariableMinHeight, 'auto'),
        maxWidth: ref(cssVariableMaxWidth, `min(calc(100dvw - ${POPOVER_SAFE_ZONE * 2}px), 48ch)`),
        maxHeight: ref(cssVariableMaxHeight, `calc(100dvh - ${POPOVER_SAFE_ZONE * 2}px)`),
        opacity: isOpen ? 1 : 0,
        transition,
        // keep the popover on the #top-layer while the fade-out runs (Chromium only; see `overlayTransitionSupportsQuery`)
        ...overlayTransitionSupportsQuery({
          transition: `${transition},${getTransition('overlay', 'short', isOpen ? 'in' : 'out')} allow-discrete,${getTransition('display', 'short', isOpen ? 'in' : 'out')} allow-discrete`,
        }),
        // Unlike `opacity` (driven by the `isOpen` render flag), `overlay` and `display` are toggled via the
        // `:popover-open` UA state instead of `isOpen`. Both are owned by the browser: they only flip once
        // `showPopover()` / `hidePopover()` actually promote/remove the element to/from the #top-layer. Driving them
        // from `isOpen` would desync from that native state — e.g. Safari/Firefox defer `hidePopover()` until the
        // fade-out ends (see `createTopLayerController`), so `display` must stay `grid` while `:popover-open` is still
        // truthy; an `isOpen`-based `display: none` would hide the panel instantly and kill the fade. Binding to
        // `:popover-open` keeps CSS in lockstep with the browser across all engines, while the Chromium-only
        // `allow-discrete` transition above animates the discrete `overlay`/`display` switch during the fade-out.
        overlay: 'none',
        display: 'none',
        '&:popover-open': {
          overlay: 'auto',
          display: 'grid',
        },
        ...forcedColorsMediaQuery({
          outline: '2px solid CanvasText',
          outlineOffset: '-2px',
        }),
        '&::backdrop': {
          display: 'none', // reset ua-style
        },
      },
    },
    arrow: {
      position: 'absolute',
      width: '24px',
      height: '12px',
      clipPath: 'polygon(50% 0, 100% 110%, 0 110%)',
      background: ref(colorCanvas),
      ...forcedColorsMediaQuery({
        background: 'CanvasText',
      }),
    },
  });

  // Fade-IN: `@starting-style` supplies the opacity the browser transitions *from* on the first rendered frame, i.e. the
  // moment the panel leaves `display: none` via `:popover-open` (triggered by `showPopover()`). Without it the panel
  // snaps to full opacity, because its computed `opacity` is already `1` by the time it is promoted out of `display:
  // none`. The fade-OUT needs no starting style (a rendered prior state already exists). Appended as raw CSS because the
  // JSS conditional-rule plugin only supports `@media`/`@supports`/`@container`, not `@starting-style`. Unsupported
  // engines (< Chromium 117 / Safari 17.5 / Firefox 129) ignore the unknown at-rule and skip the entry fade (graceful
  // degradation). Formatting mirrors JSS output so the unit-test CSS parser can read it.
  //
  // ALTERNATIVE APPROACH (not implemented) — mirror the `dialog-base` (p-modal/p-flyout) pattern and drop `@starting-style`:
  //   • Keep the panel permanently rendered (never `display: none`); collapse the closed state via `visibility: hidden`
  //     + `width/height: 0` instead. Because the element stays rendered, `opacity` fades normally in BOTH directions with
  //     no `@starting-style`, and an initial `open=true` computes straight to `opacity: 1` (appears instantly, no entry
  //     fade) — which fixes the one downside of the current approach (initial `open=true` fades in on page load).
  //   • Caveat: drive `visibility` + `width/height` from the `isOpen` flag with a CLOSE-ONLY delayed transition
  //     (`… 0s linear ${isOpen ? '0s' : motionDurationMap.short}`), NOT from `:popover-open`. `:popover-open` drops
  //     immediately on Chromium (only Safari/FF defer `hidePopover()`), so `:popover-open`-bound dimensions would collapse
  //     to 0 at the START of the Chromium fade-out and clip the panel mid-fade. The delay keeps size/visibility through
  //     the fade and collapses them only afterwards. `:popover-open` then remains solely for `overlay` + the Chromium
  //     `allow-discrete` top-layer retention.
  //   • `visibility: hidden` still occupies layout (can cause scrollbars), which is why it must be paired with
  //     `width/height: 0`. `inert` is still required either way (visibility is delayed, so the panel stays visible/
  //     tabbable during the fade-out).
  //   • Trade-off: removes the `@starting-style` raw-CSS append + the initial-load fade, at the cost of reintroducing the
  //     delayed `visibility` plus delayed `width/height` and tighter coupling to the motion duration.
  return isOpen ? `${css}\n@starting-style {\n  [popover] {\n    opacity: 0;\n  }\n}` : css;
};
