import { gridExtendedOffsetBase } from '@porsche-design-system/emotion';
import { BANNER_Z_INDEX } from '../../constants';
import {
  addImportantToEachRule,
  cssVariableTransitionDuration,
  getTransition,
  hostHiddenStyles,
  motionDurationMap,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { shadowLg } from '../../styles/css-variables';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
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
const cssVariableZIndex = '--p-internal-banner-z-index';

export const getComponentCss = (
  isOpen: boolean,
  position: BreakpointCustomizable<BannerPosition>,
  state: BannerState,
  hasDismissButton: boolean,
  hasHeadingOrHeadingSlot: boolean
): string => {
  const duration = isOpen ? 'moderate' : 'short';
  const easing = isOpen ? 'in' : 'out';
  const transition = `visibility 0s linear var(${cssVariableTransitionDuration},${isOpen ? '0s' : motionDurationMap[duration]}),${getTransition('transform', duration, easing)}`;

  return getCss({
    ...mergeDeep(
      {
        '@global': {
          ':host': {
            display: 'contents',
            ...addImportantToEachRule({
              ...hostHiddenStyles,
            }),
          },
          ...preventFoucOfNestedElementsStyles,
          '[popover]': {
            all: 'unset',
            position: 'fixed',
            zIndex: `var(${cssVariableZIndex},${BANNER_Z_INDEX})`, // Fallback for browsers lacking `transition-behavior: allow-discrete` — keeps the banner visible during fade-out after leaving the top layer.
            ...buildResponsiveStyles(position, (v: BannerPosition) => ({
              ...(v === 'top' && {
                insetBlock: `var(${cssVarTop},var(${cssVarPositionTop},${topBottomFallback})) auto`,
                ...(!isOpen && {
                  transform: `translate3d(-50%,calc(-100% - var(${cssVarTop},var(${cssVarPositionTop},${topBottomFallback}))),0)`,
                }),
              }),
              ...(v === 'bottom' && {
                insetBlock: `auto var(${cssVarBottom},var(${cssVarPositionBottom},${topBottomFallback}))`,
                ...(!isOpen && {
                  transform: `translate3d(-50%,calc(var(${cssVarBottom},var(${cssVarPositionBottom},${topBottomFallback})) + 100%),0)`,
                }),
              }),
            })),
            left: '50vw',
            width: `min(calc(100vw - 2 * var(${cssVarInsetX},${gridExtendedOffsetBase})),var(${cssVarMaxWidth},100ch))`,
            '&:popover-open': {
              overlay: 'auto',
            },
            '&::backdrop': {
              display: 'none',
            },
            visibility: 'hidden', // element shall not be tabbable with keyboard after fade out transition has finished
            pointerEvents: 'none', // element can't be interacted with mouse
            ...(isOpen && {
              visibility: 'inherit',
              pointerEvents: 'inherit',
              transform: 'translate3d(-50%,0,0)',
            }),
            transition,
            // during transition the element will be removed from top-layer immediately, resulting in other elements laying over (as of Mai 2024 only Chrome is fixed by this)
            '@supports (transition-behavior: allow-discrete)': {
              transition: `${transition},${getTransition('overlay', duration, easing)} allow-discrete`,
            },
            '& .notification': {
              boxShadow: shadowLg,
              opacity: isOpen ? 1 : 0, // it's necessary to spit up opacity transition from [popover], otherwise frosted effect won't render
              transition: getTransition('opacity', duration, easing),
            },
          },
        },
      },
      getFunctionalComponentNotificationBaseStyles(state, false, hasDismissButton, hasHeadingOrHeadingSlot, '2xl')
    ),
  });
};
