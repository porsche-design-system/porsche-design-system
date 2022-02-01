import { getMinifiedStyles } from '../../../../../../shared/src/styles/getMinifiedStyles';
import { pxToRemWithUnit } from '../../../../styles';

export const getSelectWrapperSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-select-wrapper:not(.hydrated)': {
        display: 'block',
        height: pxToRemWithUnit(150),
        background: 'PDS_REPLACE_WITH_THEME_COLOR',
        visibility: 'visible',
      },
    },
  });
};
