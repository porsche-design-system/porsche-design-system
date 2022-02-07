import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { getContentWrapperJssStyle } from '@porsche-design-system/utilities-v2';

export const getContentWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-content-wrapper': {
        '&:not(.hydrated)': {
          display: 'block',
          ...getContentWrapperJssStyle('basic'),
        },
      },
    },
  });
};
