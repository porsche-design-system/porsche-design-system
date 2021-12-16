import {
  addImportantToEachRule,
  BreakpointCustomizable,
  buildGlobalStyles,
  buildHostStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getRequiredStyles,
  getStateMessageStyles,
  getThemedColors,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../utils';
import type { Styles } from '../../../utils';
import type { FormState, Theme } from '../../../types';
import { getBaseChildStyles, getLabelStyles, isVisibleState } from '../form-styles';

export const getComponentCss = (hideLabel: BreakpointCustomizable<boolean>, state: FormState): string => {
  const theme: Theme = 'light';
  const hasVisibleState = isVisibleState(state);
  const { contrastMediumColor } = getThemedColors(theme);

  return getCss({
    ...buildHostStyles({
      display: 'block',
    }),
    ...buildGlobalStyles(
      mergeDeep(
        addImportantToEachRule(
          getBaseChildStyles('textarea', state, theme, {
            padding: pxToRemWithUnit(hasVisibleState ? 10 : 11),
            resize: 'vertical',
          })
        ),
        {
          '::slotted(textarea)': {
            minHeight: pxToRemWithUnit(192), // min-height should be overridable
          },
        } as Styles
      )
    ),
    ...getLabelStyles('textarea', hideLabel, state, theme),
    ...getRequiredStyles(theme),
    ...getStateMessageStyles(theme, state),
    counter: {
      position: 'absolute',
      bottom: pxToRemWithUnit(6),
      right: pxToRemWithUnit(12),
      pointerEvents: 'none',
      color: contrastMediumColor,
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
