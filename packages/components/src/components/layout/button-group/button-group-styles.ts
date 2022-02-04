import type { JssStyle } from 'jss';
import type { GetStylesFunction } from '../../../utils';
import type { ButtonGroupDirectionType, ButtonGroupDirection } from './button-group-utils';
import { buildResponsiveStyles, getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getButtonGroupColumnJssStyle,
  getButtonGroupRowJssStyle,
  getButtonGroupSlottedColumnJssStyle,
  getButtonGroupSlottedRowJssStyle,
} from '../../../styles';
import { spacing } from '@porsche-design-system/utilities-v2';

const getDirectionStyles: GetStylesFunction = (direction: ButtonGroupDirectionType): JssStyle => {
  const styles: { [key in ButtonGroupDirectionType]: JssStyle } = {
    column: getButtonGroupColumnJssStyle(),
    row: getButtonGroupRowJssStyle(),
  };
  return styles[direction];
};

const getDirectionSlottedStyles: GetStylesFunction = (direction: ButtonGroupDirectionType): JssStyle => {
  const styles: { [key in ButtonGroupDirectionType]: JssStyle } = {
    column: getButtonGroupSlottedColumnJssStyle(),
    row: getButtonGroupSlottedRowJssStyle(),
  };
  return styles[direction];
};

export const getComponentCss = (direction: ButtonGroupDirection): string => {
  return getCss({
    ':host': {
      display: 'block',
    },
    '@global': {
      div: {
        display: 'flex',
        marginTop: `-${spacing[16]}`,
        ...buildResponsiveStyles(direction, getDirectionStyles),
      },
      '::slotted(*)': addImportantToEachRule({
        marginTop: spacing[16],
        ...buildResponsiveStyles(direction, getDirectionSlottedStyles),
      }),
    },
  });
};
