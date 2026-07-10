import { gridExtendedOffsetBase } from '@porsche-design-system/emotion';
import { ref, shadowLg } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, getTransition, hostHiddenStyles } from '../../styles';
import { buildResponsiveStyles, getCss, mergeDeep, overlayTransitionSupportsQuery } from '../../utils';
import type { BreakpointCustomizable } from '../../utils/breakpoint-customizable';
import { getFunctionalComponentNotificationBaseStyles } from '../common/notification-base/notification-base-styles';
import type { BannerPosition, BannerState } from './banner-utils';

/**
 * @css-variable {"name": "--p-banner-max-w", "description": "Defines the maximum width of the Banner.", "defaultValue": "100ch"}
 */
const cssVarMaxWidth = '--p-banner-max-w';
/**
 * @css-variable {"name": "--p-banner-top", "description": "Defines the distance from the top of the viewport. Only takes effect when the `position` property is set to `top` (at the respective breakpoint).", "defaultValue": "56px"}
 */
const cssVarTop = '--p-banner-top';
/**
 * @css-variable {"name": "--p-banner-bottom", "description": "Defines the distance from the bottom of the viewport. Only takes effect when the `position` property is set to `bottom` (at the respective breakpoint).", "defaultValue": "56px"}
 */
const cssVarBottom = '--p-banner-bottom';
/**
 * @css-variable {"name": "--p-banner-inset-x", "description": "Defines the horizontal offset of the Banner from the edges of the viewport.", "defaultValue": "max(22px, 10.625vw - 12px)"}
 */
const cssVarInsetX = '--p-banner-inset-x';

const cssVarPositionTop = '--p-banner-position-top'; // deprecated (aliased)
const cssVarPositionBottom = '--p-banner-position-bottom'; // deprecated (aliased)
const topBottomFallback = '56px';

export const getComponentCss = (
  isOpen: boolean,
  position: BreakpointCustomizable<BannerPosition>,
  state: BannerState,
  hasDismissButton: boolean,
  hasHeadingOrHeadingSlot: boolean,
  skipEntryTransition: boolean
): string => {
  const duration = isOpen ? 'moderate' : 'short';
  const easing = isOpen ? 'in' : 'out';
  const transition = getTransition('transform', duration, easing);

  const css = getCss({
    ...mergeDeep(
      {
        '@global': {
          ':host': {
            display: 'contents',
            ...addImportantToEachRule({
              ...hostHiddenStyles,
            }),
          },
          '[popover]': {
            all: 'unset',
            position: 'fixed',
            ...buildResponsiveStyles(position, (v: BannerPosition) => ({
              ...(v === 'top' && {
                '--_a': `translate3d(-50%,calc(-100% - ${ref(cssVarTop, ref(cssVarPositionTop, topBottomFallback))}),0)`,
                insetBlock: `${ref(cssVarTop, ref(cssVarPositionTop, topBottomFallback))} auto`,
              }),
              ...(v === 'bottom' && {
                '--_a': `translate3d(-50%,calc(${ref(cssVarBottom, ref(cssVarPositionBottom, topBottomFallback))} + 100%),0)`,
                insetBlock: `auto ${ref(cssVarBottom, ref(cssVarPositionBottom, topBottomFallback))}`,
              }),
            })),
            left: '50vw',
            width: `min(calc(100vw - 2 * ${ref(cssVarInsetX, gridExtendedOffsetBase)}),${ref(cssVarMaxWidth, '100ch')})`,
            transform: isOpen ? 'translate3d(-50%,0,0)' : ref('--_a'),
            transition,
            // keep the popover on the #top-layer while the fade-out runs (Chromium only; see `overlayTransitionSupportsQuery`)
            ...overlayTransitionSupportsQuery({
              transition: `${transition},${getTransition('overlay', duration, easing)} allow-discrete, ${getTransition('display', duration, easing)} allow-discrete`,
            }),
            overlay: 'none',
            display: 'none',
            '&:popover-open': {
              overlay: 'auto',
              display: 'grid',
            },
            '&::backdrop': {
              display: 'none', // reset ua-style
            },
          },
        },
      },
      {
        notification: {
          boxShadow: ref(shadowLg),
          opacity: isOpen ? 1 : 0, // it's necessary to spit up opacity transition from [popover], otherwise frosted effect won't render
          transition: getTransition('opacity', duration, easing),
        },
      },
      getFunctionalComponentNotificationBaseStyles(state, false, hasDismissButton, hasHeadingOrHeadingSlot)
    ),
  });

  // Both the `[popover]` box (transform) and its nested `.notification` (opacity) need a `@starting-style`: while closed
  // the popover is `display: none`, so on open `.notification` renders fresh with a computed `opacity: 1` and has no
  // prior value to transition from — without the starting value it snaps to full opacity instead of fading in. The
  // opacity is split onto `.notification` (not `[popover]`) so the frosted-glass backdrop-filter renders correctly.
  //
  // `skipEntryTransition` omits the append on the component's FIRST render, so an initially-open banner (`open=true` on
  // page load) computes straight to its visible transform/opacity and appears instantly instead of sliding/fading in.
  // Every later render passes `false`, so a user-triggered open still animates normally.
  return isOpen && !skipEntryTransition
    ? `${css}\n@starting-style {\n  [popover] {\n    transform: ${ref('--_a')};\n  }\n  .notification {\n    opacity: 0;\n  }\n}`
    : css;
};
