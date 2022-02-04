import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import { getBaseSkeletonStyles, getButtonLinkPureSkeletonStyles } from './';

export const getButtonPureSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-button-pure:not(.hydrated)': {
        ...getButtonLinkPureSkeletonStyles(),
        ...getBaseSkeletonStyles(),
      },
    },
  });
};
