import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getScalingVar, getFunctionalComponentInputBaseStyles } from '../common/input-base/input-base-styles';
import { formButtonOrIconPadding } from '../../styles/form-styles';

export const getComponentCss = (
  disabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  toggle: boolean,
  compact: boolean,
  readOnly: boolean,
  theme: Theme
): string => {
  const scalingVar = getScalingVar(compact);
  const paddingButton = compact ? '0px' : `calc(${formButtonOrIconPadding} * ${scalingVar})`;
  return getCss({
    ...getFunctionalComponentInputBaseStyles(disabled, hideLabel, state, toggle, compact, readOnly, theme, {
      '&[type="text"]': {
        textOverflow: 'ellipsis',
      },
    }),
    ...(toggle && {
      button: {
        placeSelf: 'center',
        padding: paddingButton, // TODO resolve inconsistency in Figma
      },
    }),
  });
};
