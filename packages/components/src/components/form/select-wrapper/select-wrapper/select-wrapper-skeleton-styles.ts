import { getMinifiedStyles } from '../../../../../../shared/src/styles/getMinifiedStyles';
import { pxToRemWithUnit } from '../../../../styles';
import { getBaseSkeletonStyles } from '../../../../styles/skeleton-base-styles';

export const getSelectWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-select-wrapper:not(.hydrated)': {
        maxWidth: pxToRemWithUnit(450),
        height: pxToRemWithUnit(48),
        margin: `${pxToRemWithUnit(28)} 0 0 0`,
        ...getBaseSkeletonStyles(),
      },
    },
  });
};
