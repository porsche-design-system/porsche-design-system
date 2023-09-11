import {
  borderRadiusSmall,
  dropShadowHighStyle,
  getMediaQueryMin,
  gridExtendedOffsetBase,
  gridExtendedOffsetS,
  gridExtendedOffsetXXL,
} from '@porsche-design-system/utilities-v2';
import { getCss } from '../../utils';
import { BANNER_Z_INDEX } from '../../constants';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';

const cssVariableTop = '--p-banner-position-top';
const cssVariableBottom = '--p-banner-position-bottom';
const cssVariableAnimationDuration = '--p-animation-duration';
const cssVariableZIndex = '--p-internal-banner-z-index';

export const ANIMATION_DURATION = 600;

const duration = `var(${cssVariableAnimationDuration},${ANIMATION_DURATION}ms)`;

const easeInQuad = 'cubic-bezier(0.45,0,0.55,1)';
const easeOutQuad = 'cubic-bezier(0.5,1,0.89,1)';
const topBottomFallback = '56px';

export const getComponentCss = (isOpen: boolean): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        position: 'fixed',
        bottom: `var(${cssVariableBottom},${topBottomFallback})`,
        left: gridExtendedOffsetBase,
        right: gridExtendedOffsetBase,
        margin: 0,
        padding: 0,
        width: 'auto',
        maxWidth: '100%', // If component is wrapped in container with maxWidth
        zIndex: `var(${cssVariableZIndex},${BANNER_Z_INDEX})`,
        ...dropShadowHighStyle,
        borderRadius: borderRadiusSmall, // needed for rounded box-shadow
        ...(isOpen
          ? {
              opacity: 1,
              visibility: 'inherit',
              transform: 'translate3d(0,0,0)',
              transition: `opacity ${duration} ${easeInQuad},transform ${duration} ${easeInQuad}`,
            }
          : {
              opacity: 0,
              visibility: 'hidden',
              transform: `translate3d(0,calc(var(${cssVariableBottom},${topBottomFallback}) + 100%),0)`,
              '&(.hydrated),&(.ssr)': {
                transition: `visibility 0s linear ${duration},opacity ${duration} ${easeOutQuad},transform ${duration} ${easeOutQuad}`,
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
  });
};
