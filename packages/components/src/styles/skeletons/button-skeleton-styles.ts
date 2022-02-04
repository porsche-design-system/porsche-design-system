import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { getBaseSkeletonStyles, getButtonLinkPureSkeletonStyles } from './';

export const getButtonSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-button:not(.hydrated)': {
        ...getButtonLinkPureSkeletonStyles(),
        ...getBaseSkeletonStyles(),
      },
    },
  });
};
