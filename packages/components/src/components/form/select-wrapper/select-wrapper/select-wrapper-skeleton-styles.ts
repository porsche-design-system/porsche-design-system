import { getMinifiedStyles } from '../../../../../../shared/src/styles/getMinifiedStyles';
import { pxToRemWithUnit } from '../../../../styles';
import { getBaseSkeletonStyles } from '../../../action/button/button-skeleton-styles';

export const getSelectWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-select-wrapper:not(.hydrated)': {
        maxWidth: pxToRemWithUnit(450),
        height: pxToRemWithUnit(48),

        ...getBaseSkeletonStyles(),
      },
    },
  });
};
