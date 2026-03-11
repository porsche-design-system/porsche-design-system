import type { JssStyle } from 'jss';
import type { FormState } from '../../utils/form/form-state';
import { getDisabledBaseStyles, getFocusBaseStyles, getTransition } from '../common-styles';
import {
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  legacyRadiusSmall,
  radiusLg,
  radiusXl,
  typescaleSm,
} from '../css-variables';
import { getThemedFormStateColors } from '../form-state-color-styles';
import { hoverMediaQuery } from '../media-query/hover-media-query';

export const getButtonJssStyle = (
  componentName: 'select' | 'multi-select',
  isOpen: boolean,
  isDisabled: boolean,
  state: FormState,
  isCompact: boolean,
  cssVarScalingName: string
): JssStyle => {
  const cssVarBackgroundColor = `--p-${componentName}-background-color`;
  const cssVarTextColor = `--p-${componentName}-text-color`;
  const cssVarBorderColor = `--p-${componentName}-border-color`;

  const { formStateBorderColor, formStateBorderHoverColor, formStateBackgroundColor } = getThemedFormStateColors(state);

  const borderWidth = '1px';
  const height = `calc(var(${cssVarScalingName}) * 3.5rem)`;
  const paddingInline = `calc(22.4px * (var(${cssVarScalingName}) - 0.64285714) + 8px)`;
  const gap = `calc(22.4px * (var(${cssVarScalingName}) - 0.64285714) + 4px)`;

  return {
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    gap,
    height,
    boxSizing: 'border-box',
    minWidth: 0,
    paddingInline,
    border: `${borderWidth} solid var(${cssVarBorderColor}, ${isOpen ? formStateBorderHoverColor : formStateBorderColor})`,
    borderRadius: `var(${legacyRadiusSmall}, ${isCompact ? radiusLg : radiusXl})`,
    background: `var(${cssVarBackgroundColor}, ${formStateBackgroundColor})`,
    font: `${fontWeightNormal} ${typescaleSm}/${leadingNormal} ${fontPorscheNext}`,
    color: `var(${cssVarTextColor}, ${colorPrimary})`,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    ...(isDisabled && getDisabledBaseStyles()),
    transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
    ...(!isDisabled && {
      ...hoverMediaQuery({
        '&:hover,label:hover~&': {
          borderColor: `var(${cssVarBorderColor}, ${formStateBorderHoverColor})`,
        },
      }),
      '&:focus-visible': getFocusBaseStyles(),
    }),
  };
};
