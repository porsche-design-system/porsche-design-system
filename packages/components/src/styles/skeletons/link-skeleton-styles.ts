import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { getBaseSkeletonStyles, getButtonLinkSkeletonStyles } from './';

export const getLinkSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-link:not(.hydrated)': {
        ...getButtonLinkSkeletonStyles(),
        ...getBaseSkeletonStyles(),
      },
    },
  });
};
