import {
  borderRadiusSmall,
  dropShadowHighStyle,
  getMediaQueryMin,
  gridExtendedOffsetBase,
  gridExtendedOffsetS,
  gridExtendedOffsetXXL,
  motionDurationLong,
  motionDurationModerate,
  motionEasingIn,
  motionEasingOut,
} from '@porsche-design-system/utilities-v2';
import { getCss } from '../../utils';
import { colorSchemeStyles, cssVariableAnimationDuration, hostHiddenStyles } from '../../styles';

const cssVariableTop = '--p-banner-position-top';
const cssVariableBottom = '--p-banner-position-bottom';

const topBottomFallback = '56px';

export const getComponentCss = (isOpen: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        position: 'fixed',
        margin: '0',
        padding: '0',
        border: '0',
        outline: '0',
        bottom: `var(${cssVariableBottom},${topBottomFallback})`,
        left: gridExtendedOffsetBase,
        right: gridExtendedOffsetBase,
        width: 'auto',
        maxWidth: '100%', // If component is wrapped in container with maxWidth
        ...dropShadowHighStyle,
        borderRadius: borderRadiusSmall, // needed for rounded box-shadow
        ...(isOpen
          ? {
              opacity: 1,
              visibility: 'inherit',
              transform: 'translate3d(0,0,0)',
              transition: `transform var(${cssVariableAnimationDuration}, ${motionDurationModerate}) ${motionEasingIn}, opacity var(${cssVariableAnimationDuration}, ${motionDurationModerate}) ${motionEasingIn}`,
            }
          : {
              opacity: 0,
              visibility: 'hidden',
              transform: `translate3d(0,calc(var(${cssVariableBottom},${topBottomFallback}) + 100%),0)`,
              '&(.hydrated),&(.ssr)': {
                transition: `visibility 0s linear var(${cssVariableAnimationDuration}, ${motionDurationLong}), transform var(${cssVariableAnimationDuration}, ${motionDurationModerate}) ${motionEasingOut}, opacity var(${cssVariableAnimationDuration}, ${motionDurationModerate}) ${motionEasingOut}`,
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
      },
    },
  });
};
