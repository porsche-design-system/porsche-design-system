import { pxToRemWithUnit } from '../../../styles';
import { getMinifiedStyles } from '../../../../../shared/src/styles/getMinifiedStyles';

export const getButtonSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-button:not(hydrated)': {
        display: 'block',
        width: pxToRemWithUnit(300),
        background: 'PDS_REPLACE_WITH_THEME_COLOR',
      },
    },
  });
};
