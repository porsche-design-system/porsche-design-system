import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { getBaseSkeletonStyles, getButtonLinkPureSkeletonStyles } from './';

export const getLinkPureSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-link-pure:not(.hydrated)': {
        ...getButtonLinkPureSkeletonStyles(),
        ...getBaseSkeletonStyles(),
      },
    },
  });
};
