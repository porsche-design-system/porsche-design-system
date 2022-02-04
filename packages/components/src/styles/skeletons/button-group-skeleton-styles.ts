import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';
import {
  addImportantToRule,
  getButtonGroupColumnJssStyle,
  getButtonGroupRowJssStyle,
  getButtonGroupSlottedColumnJssStyle,
  getButtonGroupSlottedRowJssStyle,
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
        ...getButtonGroupColumnJssStyle(),
        [mediaQuery('xs')]: {
          ...getButtonGroupRowJssStyle(),
          marginRight: 0,
        },
        '& > *': {
          marginTop: spacing[16],
          ...getButtonGroupSlottedColumnJssStyle(),
          width: addImportantToRule('100%'),
          [mediaQuery('xs')]: {
            ...getButtonGroupSlottedRowJssStyle(),
            width: addImportantToRule(pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH)),
          },
        },
      },
    },
  });
};
