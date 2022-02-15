import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';
import { getPseudoElementStyles } from './skeleton-base-styles';
import { pxToRemWithUnit } from '../common-styles';

export const getFieldsetWrapperSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-fieldset-wrapper': {
        '&:not(.hydrated)': {
          visibility: 'visible',
          display: 'block',
          position: 'relative',
          '&::before': {
            content: '""',
            display: 'inline-block',
            border: '2px solid red',
            visibility: 'visible',
            width: '100%',
            height: pxToRemWithUnit(52),
          },
          '&::after': {
            ...getPseudoElementStyles(),
            height: pxToRemWithUnit(36),
            width: pxToRemWithUnit(128),
            top: '0',
          },
        },
      },
    },
  });
};
