import {
  addImportantToEachRule,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getFunctionalComponentStateMessageStyles,
  getThemedColors,
  getTransition,
  isDark,
  mergeDeep,
  pxToRemWithUnit,
  getFunctionalComponentRequiredStyles,
} from '../../../../utils';
import type { BreakpointCustomizable } from '../../../../utils';
import type { FormState, Theme } from '../../../../types';
import { color } from '@porsche-design-system/utilities';
import { getBaseChildStyles, getLabelStyles, isVisibleState } from '../../form-styles';

export const OPTION_HEIGHT = 32; // optgroups are higher and ignored

export const getComponentCss = (hideLabel: BreakpointCustomizable<boolean>, state: FormState, theme: Theme): string => {
  const isDarkTheme = isDark(theme);
  const { baseColor, backgroundColor } = getThemedColors(theme);
  const defaultPadding = pxToRemWithUnit(isVisibleState(state) ? 10 : 11);

  return getCss({
    ':host': {
      display: 'block',
    },
    '@global': addImportantToEachRule(
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
            background: isDarkTheme ? color.default : backgroundColor, // 🤷
          },
        }
      )
    ),
    root: {
      display: 'block',
      position: 'relative',
      color: baseColor, // for dark theme on .label__text
    },
    ...getLabelStyles('select', hideLabel, state, theme, '$icon'),
    ...getFunctionalComponentRequiredStyles(theme),
    ...getFunctionalComponentStateMessageStyles(theme, state),
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
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
