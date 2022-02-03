import { pxToRemWithUnit } from '../../../styles';
import { getMinifiedStyles } from '../../../../../shared/src/styles/getMinifiedStyles';
import { getBaseSkeletonStyles } from '../../../../src/styles/skeleton-base-styles';

export const getButtonSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-button:not(.hydrated)': {
        width: pxToRemWithUnit(134),
        height: pxToRemWithUnit(48),
        ...getBaseSkeletonStyles(),
      },
    },
  });
};
