import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentInputBaseStyles, getScalingVar } from '../common/input-base/input-base-styles';
import { formButtonOrIconPadding } from '../../styles/form-styles';

export const getComponentCss = (
  disabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  readOnly: boolean,
  theme: Theme,
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
    ...(controls && {
      button: {
        placeSelf: 'center',
        padding: paddingButton, // TODO resolve inconsistency in Figma
      },
    }),
  });
};
