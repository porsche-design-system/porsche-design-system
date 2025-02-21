import { borderRadiusSmall, borderWidthBase, fontLineHeight, textSmallStyle } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import type { Theme } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getHasCSSAnchorPositioningSupport } from '../../utils/supportsNativeCSSAnchorPositioning';
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
  hasSlottedImage: boolean,
  anchorName: string,
  cssVarScaling: string,
  theme: Theme
): JssStyle => {
  const cssVarBackgroundColor = `--p-${componentName}-background-color`;
  const cssVarTextColor = `--p-${componentName}-text-color`;
  const cssVarBorderColor = `--p-${componentName}-border-color`;

  const { backgroundColor, primaryColor, disabledColor, contrastMediumColor } = getThemedColors(theme);
  const {
    backgroundColor: backgroundColorDark,
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    contrastMediumColor: contrastMediumColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );

  return {
    all: 'unset',
    ...(getHasCSSAnchorPositioningSupport() && {
      anchorName,
    }),
    display: 'grid',
    gridTemplateColumns: `${hasSlottedImage ? 'auto ' : ''}minmax(0, 1fr) auto`,
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
    background: `var(${cssVarBackgroundColor}, ${backgroundColor})`,
    border: `${borderWidthBase} solid var(${cssVarBorderColor}, ${isOpen ? primaryColor : formStateColor || contrastMediumColor})`,
    borderRadius: borderRadiusSmall,
    ...(isDisabled && {
      cursor: 'not-allowed',
      color: disabledColor,
      borderColor: disabledColor,
    }),
    ...prefersColorSchemeDarkMediaQuery(theme, {
      color: `var(${cssVarTextColor}, ${primaryColorDark})`,
      background: `var(${cssVarBackgroundColor}, ${backgroundColorDark})`,
      border: `${borderWidthBase} solid var(${cssVarBorderColor}, ${isOpen ? primaryColorDark : formStateColorDark || contrastMediumColorDark})`,
      ...(isDisabled && {
        color: disabledColorDark,
        borderColor: disabledColorDark,
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
