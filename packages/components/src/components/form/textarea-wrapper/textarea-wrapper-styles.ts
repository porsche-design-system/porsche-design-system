import {
  addImportantToEachRule,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getFunctionalComponentStateMessageStyles,
  getThemedColors,
  mergeDeep,
  pxToRemWithUnit,
  getFunctionalComponentRequiredStyles,
} from '../../../utils';
import type { Styles, BreakpointCustomizable } from '../../../utils';
import type { FormState, Theme } from '../../../types';
import { getBaseChildStyles, getLabelStyles, isVisibleState } from '../form-styles';

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasCounter: boolean
): string => {
  const theme: Theme = 'light';
  const hasVisibleState = isVisibleState(state);
  const { contrastMediumColor } = getThemedColors(theme);
  const defaultPadding = pxToRemWithUnit(hasVisibleState ? 10 : 11);

  return getCss({
    ':host': {
      display: 'block',
    },
    '@global': mergeDeep(
      addImportantToEachRule(
        getBaseChildStyles('textarea', state, theme, {
          // 36 = 2 * 6 + 24 where 6 is the bottom distance and 24 the height of the text
          padding: hasCounter ? [defaultPadding, defaultPadding, pxToRemWithUnit(36)].join(' ') : defaultPadding,
          resize: 'vertical',
        })
      ),
      {
        '::slotted(textarea)': {
          minHeight: pxToRemWithUnit(192), // min-height should be overridable
        },
      } as Styles
    ),
    ...getLabelStyles('textarea', hideLabel, state, theme, hasCounter ? '$counter' : ''),
    ...getFunctionalComponentRequiredStyles(theme),
    ...getFunctionalComponentStateMessageStyles(theme, state),
    ...(hasCounter && {
      counter: {
        position: 'absolute',
        bottom: pxToRemWithUnit(6),
        right: pxToRemWithUnit(12),
        zIndex: 1,
        color: contrastMediumColor,
      },
    }),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
