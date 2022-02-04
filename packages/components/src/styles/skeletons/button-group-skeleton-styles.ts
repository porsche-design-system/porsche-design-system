import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import {
  getButtonGroupColumnStyles,
  getButtonGroupRowStyles,
  getButtonGroupSlottedColumnStyles,
  getButtonGroupSlottedRowStyles,
  mediaQuery,
  pxToRemWithUnit,
} from '../common-styles';
import { spacing } from '@porsche-design-system/utilities-v2';
import { BUTTON_LINK_SKELETON_WIDTH } from './';

export const getButtonGroupSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-button-group:not(.hydrated)': {
        display: 'flex',
        marginTop: `-${spacing[16]}`,
        ...getButtonGroupColumnStyles(),
        [mediaQuery('xs')]: getButtonGroupRowStyles(),
        '& > *': {
          marginTop: spacing[16],
          ...getButtonGroupSlottedColumnStyles(),
          width: '100%',
          [mediaQuery('xs')]: {
            ...getButtonGroupSlottedRowStyles(),
            width: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          },
        },
      },
    },
  });
};
