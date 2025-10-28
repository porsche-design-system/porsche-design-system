import { borderRadiusSmall, borderWidthBase, fontLineHeight, textSmallStyle } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import type { Theme } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getThemedColors } from '../colors';
import { getFocusJssStyle, getTransition } from '../common-styles';
import { getThemedFormStateColors } from '../form-state-color-styles';
import { formElementPaddingHorizontal, formElementPaddingVertical } from '../form-styles';
import { hoverMediaQuery } from '../hover-media-query';
import { prefersColorSchemeDarkMediaQuery } from '../prefers-color-scheme-dark-media-query';

export const getButtonJssStyle = (
  componentName: 'select' | 'multi-select',
  isOpen: boolean,
  isDisabled: boolean,
  state: FormState,
  cssVarScaling: string,
  theme: Theme
): JssStyle => {
  const cssVarBackgroundColor = `--p-${componentName}-background-color`;
  const cssVarTextColor = `--p-${componentName}-text-color`;
  const cssVarBorderColor = `--p-${componentName}-border-color`;

  const { primaryColor, contrast40Color, contrast50Color } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrast40Color: contrast40ColorDark,
    contrast50Color: contrast50ColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );

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
    border: `${borderWidthBase} solid var(${cssVarBorderColor}, ${isOpen ? primaryColor : formStateColor || contrast50Color})`,
    borderRadius: borderRadiusSmall,
    ...(isDisabled && {
      cursor: 'not-allowed',
      color: contrast40Color,
      borderColor: contrast40Color,
    }),
    ...prefersColorSchemeDarkMediaQuery(theme, {
      color: `var(${cssVarTextColor}, ${primaryColorDark})`,
      backgroundColor: `var(${cssVarBackgroundColor}, transparent)`,
      border: `${borderWidthBase} solid var(${cssVarBorderColor}, ${isOpen ? primaryColorDark : formStateColorDark || contrast50ColorDark})`,
      ...(isDisabled && {
        color: contrast40ColorDark,
        borderColor: contrast40ColorDark,
      }),
    }),
    ...(!isDisabled && {
      ...hoverMediaQuery({
        '&:hover,label:hover~&': {
          borderColor: `var(${cssVarBorderColor}, ${isOpen ? primaryColor : formStateHoverColor || primaryColor})`,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: `var(${cssVarBorderColor}, ${isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark})`,
          }),
        },
      }),
      ...getFocusJssStyle(theme),
    }),
  };
};
