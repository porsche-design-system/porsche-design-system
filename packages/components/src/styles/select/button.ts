import { borderRadiusSmall, borderWidthThin, fontLineHeight, textSmallStyle } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import type { FormState } from '../../utils/form/form-state';
import { colors } from '../colors';
import { getFocusBaseStyles, getTransition } from '../common-styles';
import { getThemedFormStateColors } from '../form-state-color-styles';
import { formElementPaddingHorizontal, formElementPaddingVertical } from '../form-styles';
import { hoverMediaQuery } from '../media-query/hover-media-query';

const { primaryColor } = colors;

export const getButtonJssStyle = (
  componentName: 'select' | 'multi-select',
  isOpen: boolean,
  isDisabled: boolean,
  state: FormState,
  cssVarScaling: string
): JssStyle => {
  const cssVarBackgroundColor = `--p-${componentName}-background-color`;
  const cssVarTextColor = `--p-${componentName}-text-color`;
  const cssVarBorderColor = `--p-${componentName}-border-color`;

  const { formStateBorderColor, formStateBorderHoverColor, formStateBackgroundColor } = getThemedFormStateColors(state);

  return {
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    gap: `max(4px, ${cssVarScaling} * 12px)`,
    padding: `max(2px, ${cssVarScaling} * ${formElementPaddingVertical}) max(4px, ${cssVarScaling} * ${formElementPaddingHorizontal})`,
    minWidth: 0,
    height: `max(${fontLineHeight}, ${cssVarScaling} * (${fontLineHeight} + 10px))`,
    boxSizing: 'content-box', // ensures height calculation is based on content, not including padding
    font: textSmallStyle.font,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
    color: `var(${cssVarTextColor}, ${primaryColor})`,
    backgroundColor: `var(${cssVarBackgroundColor}, ${formStateBackgroundColor})`,
    border: `${borderWidthThin} solid var(${cssVarBorderColor}, ${isOpen ? primaryColor : formStateBorderColor})`,
    borderRadius: borderRadiusSmall,
    ...(!isDisabled && {
      ...hoverMediaQuery({
        '&:hover,label:hover~&': {
          borderColor: `var(${cssVarBorderColor}, ${isOpen ? primaryColor : formStateBorderHoverColor})`,
        },
      }),
      '&:focus-visible': getFocusBaseStyles(),
    }),
  };
};
