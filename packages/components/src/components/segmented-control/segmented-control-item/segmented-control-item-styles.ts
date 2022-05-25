import { getCss } from '../../../utils';
import {
  addImportantToRule,
  getFocusJssStyle,
  getHoverJssStyle,
  getThemedColors,
  pxToRemWithUnit,
} from '../../../styles';
import { textSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (isDisabled: boolean): string => {
  const { disabledColor } = getThemedColors('light');

  return getCss({
    '@global': {
      ':host': {
        display: addImportantToRule('block'),
      },
      button: {
        display: 'block',
        minHeight: pxToRemWithUnit(48),
        height: '100%',
        width: '100%',
        padding: `0 ${pxToRemWithUnit(40)}`,
        margin: 0,
        border: 0,
        background: 'inherit',
        ...textSmall,
        color: isDisabled ? disabledColor : 'inherit',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ...(!isDisabled && {
          ...getHoverJssStyle(),
          ...getFocusJssStyle(),
        }),
      },
    },
    icon: {},
  });
};
