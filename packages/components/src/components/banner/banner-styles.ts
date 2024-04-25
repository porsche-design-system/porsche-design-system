import {
  borderRadiusSmall,
  dropShadowHighStyle,
  getMediaQueryMin,
  gridExtendedOffsetBase,
  gridExtendedOffsetS,
  gridExtendedOffsetXXL,
  motionDurationModerate,
  motionEasingIn,
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
        animation: `$slideIn var(${cssVariableAnimationDuration}, ${motionDurationModerate}) ${motionEasingIn} forwards`,
        [getMediaQueryMin('s')]: {
          top: `var(${cssVariableTop},${topBottomFallback})`,
          bottom: 'auto',
          left: gridExtendedOffsetS,
          right: gridExtendedOffsetS,
        },
        [getMediaQueryMin('xxl')]: {
          left: gridExtendedOffsetXXL,
          right: gridExtendedOffsetXXL,
        },
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      },
      '@keyframes slideIn': {
        from: {
          opacity: 0,
          transform: `translate3d(0, calc(-100% - var(${cssVariableTop},${topBottomFallback})), 0)`,
        },
        to: {
          opacity: 1,
          transform: 'translate3d(0,0,0)',
        },
      },
    },
  });
};
