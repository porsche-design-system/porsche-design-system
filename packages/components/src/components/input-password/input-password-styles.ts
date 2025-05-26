import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import {
  cssVarButtonPureMargin,
  cssVarButtonPurePadding,
  getFunctionalComponentInputBaseStyles,
} from '../common/input-base/input-base-styles';

export const getComponentCss = (
  disabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  toggle: boolean,
  compact: boolean,
  readOnly: boolean,
  theme: Theme
): string => {
  return getCss({
    ...getFunctionalComponentInputBaseStyles(disabled, hideLabel, state, compact, readOnly, theme, {
      '&[type="text"]': {
        textOverflow: 'ellipsis',
      },
    }),
    ...(toggle && {
      button: {
        placeSelf: 'center',
        padding: `var(${cssVarButtonPurePadding})`, // TODO resolve inconsistency in Figma
        marginInline: `var(${cssVarButtonPureMargin})`,
      },
    }),
  });
};
