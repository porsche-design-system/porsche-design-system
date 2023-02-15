import type { Theme } from '@porsche-design-system/utilities-v2';
import { isThemeDark } from '../utils';

type ThemedColor =
  | 'primaryColor'
  | 'primaryColorDarken'
  | 'backgroundColor'
  | 'backgroundColorDarken'
  | 'backgroundColorLighten'
  | 'backgroundSurfaceColor'
  | 'backgroundSurfaceColorDarken'
  | 'backgroundSurfaceColorLighten'
  | 'contrastLowColor'
  | 'contrastMediumColor'
  | 'contrastHighColor'
  | 'contrastHighColorDarken'
  | 'contrastHighColorLighten'
  | 'hoverColor'
  | 'hoverColorDarken'
  | 'activeColor'
  | 'focusColor'
  | 'disabledColor'
  | 'errorColor'
  | 'errorColorDarken'
  | 'errorSoftColor'
  | 'errorSoftColorDarken'
  | 'errorSoftColorLighten'
  | 'successColor'
  | 'successColorDarken'
  | 'successSoftColor'
  | 'successSoftColorDarken'
  | 'successSoftColorLighten'
  | 'warningColor'
  | 'warningSoftColor'
  | 'warningSoftColorDarken'
  | 'warningSoftColorLighten'
  | 'infoColor'
  | 'infoSoftColor'
  | 'infoSoftColorDarken'
  | 'infoSoftColorLighten';

export type ThemedColors = { [key in ThemedColor]: string };

/* Auto Generated Start */
const themeLight = {
  primaryColor: '#010205',
  primaryColorDarken: '#000000',
  backgroundColor: '#FFF',
  backgroundColorDarken: '#E0E0E0',
  backgroundColorLighten: '#FFFFFF',
  backgroundSurfaceColor: '#EEEFF2',
  backgroundSurfaceColorDarken: '#CBCED7',
  backgroundSurfaceColorLighten: '#FFFFFF',
  contrastLowColor: '#D8D8DB',
  contrastMediumColor: '#949598',
  contrastHighColor: '#535457',
  contrastHighColorDarken: '#353638',
  contrastHighColorLighten: '#717276',
  hoverColor: 'rgba(148, 149, 152, 0.20)',
  hoverColorDarken: '#75767A',
  activeColor: 'rgba(148, 149, 152, 0.20)',
  focusColor: '#0A0AFF',
  disabledColor: '#949598',
  errorColor: '#E7323B',
  errorColorDarken: '#C51720',
  errorSoftColor: 'rgba(255, 226, 228, 0.7)',
  errorSoftColorDarken: '#F4CED1',
  errorSoftColorLighten: '#FFFFFF',
  successColor: '#32B85B',
  successColorDarken: '#258843',
  successSoftColor: 'rgba(228, 255, 236, 0.7)',
  successSoftColorDarken: '#D0F4DB',
  successSoftColorLighten: '#FFFFFF',
  warningColor: '#FECC1B',
  warningSoftColor: 'rgba(255, 244, 210, 0.7)',
  warningSoftColorDarken: '#F1E5C1',
  warningSoftColorLighten: '#FCFAF3',
  infoColor: '#1E5BEB',
  infoSoftColor: 'rgba(211, 225, 255, 0.7)',
  infoSoftColorDarken: '#C2D1F1',
  infoSoftColorLighten: '#F4F7FD'
};

const themeDark = {
  primaryColor: '#FBFCFF',
  primaryColorDarken: '#BECEFF',
  backgroundColor: '#0E0E12',
  backgroundColorDarken: '#000000',
  backgroundColorLighten: '#292934',
  backgroundSurfaceColor: '#212225',
  backgroundSurfaceColorDarken: '#040405',
  backgroundSurfaceColorLighten: '#3E4045',
  contrastLowColor: '#404044',
  contrastMediumColor: '#7E7F82',
  contrastHighColor: '#AFB0B3',
  contrastHighColorDarken: '#909195',
  contrastHighColorLighten: '#CECFD1',
  hoverColor: 'rgba(126, 127, 130, 0.20)',
  hoverColorDarken: '#606163',
  activeColor: 'rgba(126, 127, 130, 0.20)',
  focusColor: '#1E5BEB',
  disabledColor: '#7E7F82',
  errorColor: '#CB3333',
  errorColorDarken: '#9A2727',
  errorSoftColor: 'rgba(58, 15, 15, 0.7)',
  errorSoftColorDarken: '#1A1111',
  errorSoftColorLighten: '#3F2828',
  successColor: '#00C77E',
  successColorDarken: '#008A57',
  successSoftColor: 'rgba(0, 51, 32, 0.7)',
  successSoftColorDarken: '#04110C',
  successSoftColorLighten: '#0F432F',
  warningColor: '#DDB84B',
  warningSoftColor: 'rgba(54, 43, 10, 0.7)',
  warningSoftColorDarken: '#16130B',
  warningSoftColorLighten: '#3E3720',
  infoColor: '#027FFC',
  infoSoftColor: 'rgba(4, 41, 78, 0.7)',
  infoSoftColorDarken: '#0C1A27',
  infoSoftColorLighten: '#1A3856'
};

const themes = {
  'light': themeLight,
  'dark': themeDark
};
/* Auto Generated End */

export const getThemedColors = (theme: Theme): ThemedColors => {
  return themes[theme];
};

export const getInvertedThemedColors = (theme: Theme): ThemedColors => {
  return getThemedColors(isThemeDark(theme) ? 'light' : 'dark');
};
