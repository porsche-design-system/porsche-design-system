import { borderRadiusSmall, borderWidthBase, fontLineHeight, textSmallStyle } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import type { FormState } from '../../utils/form/form-state';
import { colors } from '../colors';
import { getFocusJssStyle, getTransition } from '../common-styles';
import { getThemedFormStateColors } from '../form-state-color-styles';
import { formElementPaddingHorizontal, formElementPaddingVertical } from '../form-styles';
import { hoverMediaQuery } from '../media-query/hover-media-query';

const { primaryColor, contrastDisabledColor, contrastMediumColor } = colors;

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

  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(state);

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
    cursor: 'pointer',
    transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
    color: `var(${cssVarTextColor}, ${primaryColor})`,
    backgroundColor: `var(${cssVarBackgroundColor}, transparent)`,
    border: `${borderWidthBase} solid var(${cssVarBorderColor}, ${isOpen ? primaryColor : formStateColor || contrastMediumColor})`,
    borderRadius: borderRadiusSmall,
    ...(isDisabled && {
      cursor: 'not-allowed',
      color: contrastDisabledColor,
      borderColor: contrastDisabledColor,
    }),
    ...(!isDisabled && {
      ...hoverMediaQuery({
        '&:hover,label:hover~&': {
          borderColor: `var(${cssVarBorderColor}, ${isOpen ? primaryColor : formStateHoverColor || primaryColor})`,
        },
      }),
      ...getFocusJssStyle(),
    }),
  };
};
