import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentInputBaseStyles, getScalingVar } from '../common/input-base/input-base-styles';
import { formButtonOrIconPadding, getUnitCounterJssStyle } from '../../styles/form-styles';
import type { InputNumberUnitPosition } from './input-number-utils';

export const getComponentCss = (
  disabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  readOnly: boolean,
  theme: Theme,
  unitPosition: InputNumberUnitPosition,
  controls: boolean
): string => {
  const scalingVar = getScalingVar(compact);
  const paddingButton = compact ? '0px' : `calc(${formButtonOrIconPadding} * ${scalingVar})`;

  return getCss({
    ...getFunctionalComponentInputBaseStyles(disabled, hideLabel, state, controls, compact, readOnly, theme, {
      textOverflow: 'ellipsis',
      MozAppearance: 'textfield',
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
      },
    }),
    'unit-counter': {
      ...getUnitCounterJssStyle(disabled, readOnly, theme),
      gridArea: `1/${unitPosition === 'suffix' ? 5 : 1}/1/${unitPosition === 'suffix' ? 7 : 3}`,
      placeSelf: 'center',
    },
    ...(controls && {
      button: {
        placeSelf: 'center',
        padding: paddingButton, // TODO resolve inconsistency in Figma
      },
    }),
  });
};
