import {
  borderRadiusSmall,
  dropShadowHighStyle,
  getMediaQueryMin,
  gridExtendedOffsetBase,
  gridExtendedOffsetS,
  gridExtendedOffsetXXL,
  motionDurationLong,
  motionDurationModerate,
  motionEasingOut,
} from '@porsche-design-system/styles';
import { BANNER_Z_INDEX } from '../../constants';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  getTransition,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getBannerPopoverResetStyles } from '../../styles/banner-popover-reset-styles';
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
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...getBannerPopoverResetStyles(),
          bottom: `var(${cssVariableBottom},${topBottomFallback})`,
          left: gridExtendedOffsetBase,
          right: gridExtendedOffsetBase,
          zIndex: `var(${cssVariableZIndex},${BANNER_Z_INDEX})`,
          ...dropShadowHighStyle,
          borderRadius: borderRadiusSmall, // needed for rounded box-shadow
          '&::backdrop': {
            display: 'none',
          },
          ...(isOpen
            ? {
                opacity: 1,
                visibility: 'inherit',
                pointerEvents: 'inherit',
                transform: 'translate3d(0,0,0)',
                transition: `${getTransition('transform', 'moderate', 'in')}, ${getTransition('opacity', 'moderate', 'in')}`,
              }
            : {
                opacity: 0,
                visibility: 'hidden',
                pointerEvents: 'none',
                transform: `translate3d(0,calc(var(${cssVariableBottom},${topBottomFallback}) + 100%),0)`,
                '&(.hydrated),&(.ssr)': {
                  transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationLong}), ${getTransition('transform', 'moderate', 'out')}, ${getTransition('opacity', 'moderate', 'out')}`,
                  // during transition the element will be removed from top-layer immediately, resulting in other elements laying over (as of Mai 2024 only Chrome is fixed by this)
                  '@supports (transition-behavior: allow-discrete)': {
                    transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationLong}), ${getTransition('transform', 'moderate', 'out')}, ${getTransition('opacity', 'moderate', 'out')}, overlay var(${cssVariableTransitionDuration}, ${motionDurationModerate}) ${motionEasingOut} allow-discrete`,
                  },
                },
              }),
          [getMediaQueryMin('s')]: {
            top: `var(${cssVariableTop},${topBottomFallback})`,
            bottom: 'auto',
            left: gridExtendedOffsetS,
            right: gridExtendedOffsetS,
            // space before and after "-" is crucial)
            ...(!isOpen && { transform: `translate3d(0,calc(-100% - var(${cssVariableTop},${topBottomFallback})),0)` }),
          },
          [getMediaQueryMin('xxl')]: {
            left: gridExtendedOffsetXXL,
            right: gridExtendedOffsetXXL,
          },
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
  });
};
