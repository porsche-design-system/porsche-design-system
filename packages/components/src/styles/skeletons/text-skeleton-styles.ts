import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { pxToRemWithUnit } from '../common-styles';

export const getTextSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-text': {
        '&:not(.hydrated)': {
          display: 'block',
          position: 'relative',
          minHeight: pxToRemWithUnit(96),
          '&::before': {
            position: 'absolute',
            content: '""',
            height: '100%',
            width: '100%',
            visibility: 'visible',
            left: '0',
            top: '0',
            background: 'repeating-linear-gradient(180deg, #626669, #626669 16px, transparent 16px, transparent 24px)',
            animation: 'pulse 2s linear infinite',
          },
        },
      },
    },
  });
};
