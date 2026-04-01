import { getMediaQueryMin, gridExtendedOffsetBase } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  cssVariableTransitionDuration,
  forcedColorsMediaQuery,
  getTransition,
  hostHiddenStyles,
  motionDurationMap,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  blurFrosted,
  colorError,
  colorErrorFrosted,
  colorInfo,
  colorInfoFrosted,
  colorPrimary,
  colorSuccess,
  colorSuccessFrosted,
  colorWarning,
  colorWarningFrosted,
  fontPorscheNext,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  legacyRadiusMedium,
  radius2Xl,
  shadowLg,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXs,
  typescaleSm,
} from '../../styles/css-variables';
import { getCss } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import type { BannerState } from './banner-utils';

/**
 * @css-variable {"name": "--p-banner-max-w", "description": "Defines the maximum width of the Banner.", "defaultValue": "100ch"}
 */
const cssVarMaxWidth = '--p-banner-max-w';
/**
 * @css-variable {"name": "--p-banner-top", "description": "Defines the distance from the top of the viewport. Only has an effect from breakpoint 's' upward.", "defaultValue": "56px"}
 */
const cssVarTop = '--p-banner-top';
/**
 * @css-variable {"name": "--p-banner-bottom", "description": "Defines the distance from the bottom of the viewport. Only has an effect below breakpoint 's'.", "defaultValue": "56px"}
 */
const cssVarBottom = '--p-banner-bottom';
/**
 * @css-variable {"name": "--p-banner-inset-x", "description": "Defines the horizontal offset of the Banner from the edges of the viewport.", "defaultValue": "Porsche Grid: gridExtendedOffsetBase"}
 */
const cssVarInsetX = '--p-banner-inset-x';

const cssVarPositionTop = '--p-banner-position-top'; // deprecated
const cssVarPositionBottom = '--p-banner-position-bottom'; // deprecated
const topBottomFallback = '56px';

const iconMap = {
  info: getInlineSVGBackgroundImage(
    '<path d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9m-.75 4.5h1.5V9h-1.5zm1.5 8.5h-1.5v-6h1.5z"/>'
  ),
  warning: getInlineSVGBackgroundImage(
    '<path d="M21.58 18.26 13.3 3.75A1.5 1.5 0 0 0 12 3a1.5 1.5 0 0 0-1.3.75l-8.28 14.5a1.5 1.5 0 0 0 0 1.5c.28.47.76.75 1.3.75h16.56a1.5 1.5 0 0 0 1.3-2.25M13 17.5h-2v-2h2zm-.4-3.5h-1.2L11 8.5h2z"/>'
  ),
  success: getInlineSVGBackgroundImage(
    '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.26 12.69-3.8-3.8 1.07-1.05 2.73 2.73 5.25-5.26 1.06 1.06z"/>'
  ),
  error: getInlineSVGBackgroundImage(
    '<path d="M18 3H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4l2 2 2-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 3.5-.4 5.5h-1.2L11 6.5zm-2 7h2v2h-2z"/>'
  ),
} as const;

const colorMap = {
  info: colorInfo,
  warning: colorWarning,
  success: colorSuccess,
  error: colorError,
} as const;

const backgroundMap = {
  info: colorInfoFrosted,
  warning: colorWarningFrosted,
  success: colorSuccessFrosted,
  error: colorErrorFrosted,
} as const;

export const getComponentCss = (isOpen: boolean, state: BannerState, hasDismissButton: boolean): string => {
  const duration = isOpen ? 'moderate' : 'short';
  const easing = isOpen ? 'in' : 'out';
  const transition = `visibility 0s linear var(${cssVariableTransitionDuration}, ${isOpen ? '0s' : motionDurationMap[duration]}), ${getTransition('transform', duration, easing)}`;

  return getCss({
    '@global': {
      ':host': {
        display: 'contents',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      slot: {
        display: 'block',
        '&[name="heading"]': {
          gridArea: '1/2',
        },
        '&[name="description"]': {
          gridArea: '2/2',
        },
      },
      'h1,h2,h3,h4,h5,h6': {
        all: 'unset',
        gridArea: '1/2',
        font: `${fontWeightSemibold} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
        color: colorPrimary,
      },
      p: {
        all: 'unset',
        gridArea: '2/2',
        font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
        color: colorPrimary,
      },
      ...preventFoucOfNestedElementsStyles,
      '[popover]': {
        all: 'unset',
        position: 'fixed',
        inset: `auto auto var(${cssVarBottom},var(${cssVarPositionBottom},${topBottomFallback})) 50vw`,
        width: `min(calc(100vw - 2 * var(${cssVarInsetX},${gridExtendedOffsetBase})), var(${cssVarMaxWidth}, 100ch))`,
        '&:popover-open': {
          overlay: 'auto',
        },
        '&::backdrop': {
          display: 'none',
        },
        visibility: 'hidden', // element shall not be tabbable with keyboard after fade out transition has finished
        pointerEvents: 'none', // element can't be interacted with mouse
        transform: `translate3d(-50%, calc(var(${cssVarBottom},var(${cssVarPositionBottom},${topBottomFallback})) + 100%),0)`,
        ...(isOpen && {
          visibility: 'inherit',
          pointerEvents: 'inherit',
          transform: 'translate3d(-50%,0,0)',
        }),
        transition,
        // during transition the element will be removed from top-layer immediately, resulting in other elements laying over (as of Mai 2024 only Chrome is fixed by this)
        '@supports (transition-behavior: allow-discrete)': {
          transition: `${transition}, ${getTransition('overlay', duration, easing)} allow-discrete`,
        },
        [getMediaQueryMin('s')]: {
          inset: `var(${cssVarTop},var(${cssVarPositionTop},${topBottomFallback})) auto auto 50vw`,
          ...(!isOpen && {
            transform: `translate3d(-50%,calc(-100% - var(${cssVarTop},var(${cssVarPositionTop},${topBottomFallback}))),0)`,
          }),
        },
      },
    },
    banner: {
      display: 'grid',
      gridTemplateColumns: `auto minmax(0, 1fr)${hasDismissButton ? ' auto' : ''}`,
      gap: `${spacingStaticXs} ${spacingStaticSm}`,
      padding: spacingStaticMd,
      borderRadius: `var(${legacyRadiusMedium}, ${radius2Xl})`,
      background: backgroundMap[state],
      WebkitBackdropFilter: blurFrosted,
      backdropFilter: blurFrosted,
      boxShadow: shadowLg,
      opacity: isOpen ? 1 : 0, // it's necessary to spit up opacity transition from [popover], otherwise frosted effect won't render
      transition: getTransition('opacity', duration, easing),
      ...forcedColorsMediaQuery({
        outline: '2px solid CanvasText',
        outlineOffset: '-2px',
      }),
      '&::before': {
        gridArea: '1/1',
        placeSelf: 'center',
        content: '""',
        width: '1.5rem',
        height: '1.5rem',
        background: colorMap[state],
        WebkitMask: `${iconMap[state]} center/contain no-repeat`, // necessary for Sogou browser support :-)
        mask: `${iconMap[state]} center/contain no-repeat`,
      },
    },
    dismiss: {
      gridArea: '1/3/3',
    },
  });
};
