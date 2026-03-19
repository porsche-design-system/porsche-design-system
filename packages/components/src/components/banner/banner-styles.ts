import {
  dropShadowHighStyle,
  getMediaQueryMin,
  gridExtendedOffsetBase,
  gridExtendedOffsetS,
  gridExtendedOffsetXXL,
  motionDurationLong,
  motionDurationModerate,
  motionEasingOut,
} from '@porsche-design-system/emotion';
import { BANNER_Z_INDEX } from '../../constants';
import {
  addImportantToEachRule,
  cssVariableTransitionDuration,
  getTransition,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getBannerPopoverResetStyles } from '../../styles/banner-popover-reset-styles';
import { legacyRadiusMedium, radiusXl } from '../../styles/css-variables';
import { getCss } from '../../utils';

/**
 * @css-variable {"name": "--p-banner-position-top", "description": "Position top of banner", "defaultValue": "56px"}
 * @css-variable {"name": "--p-banner-position-bottom", "description": "Position bottom of banner. Only has an effect below breakpoint 's'.", "defaultValue": "56px"}
 */
const cssVariableTop = '--p-banner-position-top';
const cssVariableBottom = '--p-banner-position-bottom';
const cssVariableZIndex = '--p-internal-banner-z-index';

const topBottomFallback = '56px';

export const getComponentCss = (isOpen: boolean): string => {
  const easing = isOpen ? 'in' : 'out';
  const transition = `visibility 0s linear var(${cssVariableTransitionDuration}, ${isOpen ? '0s' : motionDurationLong}), ${getTransition('transform', 'moderate', easing)}`;
  const transitionChild = `${getTransition('opacity', 'moderate', easing)}`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          all: 'unset',
          ...getBannerPopoverResetStyles(),
          inset: `auto ${gridExtendedOffsetBase} var(${cssVariableBottom},${topBottomFallback})`,
          zIndex: `var(${cssVariableZIndex},${BANNER_Z_INDEX})`,
          borderRadius: `var(${legacyRadiusMedium}, ${radiusXl})`, // needed for rounded box-shadow
          '&::backdrop': {
            display: 'none',
          },
          '& > :first-child': {
            opacity: 0,
            ...dropShadowHighStyle,
            ...(isOpen
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                }),
            transition: transitionChild,
            // // during transition the element will be removed from top-layer immediately, resulting in other elements laying over (as of Mai 2024 only Chrome is fixed by this)
            '@supports (transition-behavior: allow-discrete)': {
              transition: `${transitionChild}, overlay var(${cssVariableTransitionDuration}, ${motionDurationModerate}) ${motionEasingOut} allow-discrete`,
            },
          },
          ...(isOpen
            ? {
                visibility: 'inherit',
                pointerEvents: 'inherit',
                transform: 'translate3d(0,0,0)',
              }
            : {
                visibility: 'hidden',
                pointerEvents: 'none',
                transform: `translate3d(0,calc(var(${cssVariableBottom},${topBottomFallback}) + 100%),0)`,
              }),
          transition,
          // during transition the element will be removed from top-layer immediately, resulting in other elements laying over (as of Mai 2024 only Chrome is fixed by this)
          '@supports (transition-behavior: allow-discrete)': {
            transition: `${transition}, overlay var(${cssVariableTransitionDuration}, ${motionDurationModerate}) ${motionEasingOut} allow-discrete`,
          },
          [getMediaQueryMin('s')]: {
            inset: `var(${cssVariableTop},${topBottomFallback}) ${gridExtendedOffsetS} auto`,
            ...(!isOpen && { transform: `translate3d(0,calc(-100% - var(${cssVariableTop},${topBottomFallback})),0)` }),
          },
          [getMediaQueryMin('xxl')]: {
            insetInline: gridExtendedOffsetXXL,
          },
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
  });
};
