import type { BreakpointCustomizable } from '../../../../utils';
import type { FormState, Theme } from '../../../../types';
import { buildSlottedStyles, getCss, isThemeDark, mergeDeep } from '../../../../utils';
import {
  addImportantToEachRule,
  getBaseSlottedStyles,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
} from '../../../../styles';
import { getBaseChildStyles, getLabelStyles } from '../../../../styles/form-styles';
import { isVisibleFormState } from '../../../../utils/form-state';
import { getFunctionalComponentRequiredStyles } from '../../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../../common/state-message/state-message-styles';

const { baseColor: themeLightBaseColor } = getThemedColors('light');

export const OPTION_HEIGHT = 32; // optgroups are higher and ignored

export const getComponentCss = (
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme
): string => {
  const isDarkTheme = isThemeDark(theme);
  const { baseColor, backgroundColor } = getThemedColors(theme);
  const defaultPadding = pxToRemWithUnit(isVisibleFormState(state) ? 10 : 11);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      ...addImportantToEachRule(
        mergeDeep(
          getBaseChildStyles('select', state, theme, {
            position: 'static',
            cursor: 'pointer',
            padding: [defaultPadding, pxToRemWithUnit(47), defaultPadding, defaultPadding].join(' '),
            '&@-moz-document url-prefix()': {
              // fix for 3px text-indention in FF
              paddingLeft: pxToRemWithUnit(8),
            },
          }),
          {
            '::slotted(select:disabled)': {
              background: isDarkTheme ? themeLightBaseColor : backgroundColor, // 🤷
            },
          }
        )
      ),
    },
    root: {
      display: 'block',
      position: 'relative',
    },
    ...getLabelStyles('select', isDisabled, hideLabel, state, theme, {
      icon: {
        position: 'absolute',
        bottom: pxToRemWithUnit(12),
        right: pxToRemWithUnit(12),
        color: baseColor,
        pointerEvents: 'none', // let events through to select which is visually underneath
        transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little bit more than 0 for correct direction in safari
        transition: getTransition('transform'),
        '&--open': {
          transform: 'rotate3d(0,0,1,180deg)',
        },
      },
    }),
    ...getFunctionalComponentRequiredStyles(theme),
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
