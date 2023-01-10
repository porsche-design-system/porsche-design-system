import type { Theme } from '@porsche-design-system/utilities-v2';
import { isThemeDark } from '../utils';

type ThemedColor =
  | 'primaryColor'
  | 'primaryColorDarken'
  | 'backgroundColor'
  | 'backgroundSurfaceColor'
  | 'contrastLowColor'
  | 'contrastMediumColor'
  | 'contrastHighColor'
  | 'contrastHighColorDarken'
  | 'hoverColor'
  | 'hoverColorDarken'
  | 'activeColor'
  | 'focusColor'
  | 'disabledColor'
  | 'errorColor'
  | 'errorColorDarken'
  | 'errorSoftColor'
  | 'successColor'
  | 'successColorDarken'
  | 'successSoftColor'
  | 'warningColor'
  | 'warningSoftColor'
  | 'infoColor'
  | 'infoSoftColor';

export type ThemedColors = { [key in ThemedColor]: string };

/* Auto Generated Start */
const themeLight = {
  primaryColor: '#010205',
  primaryColorDarken: '#000000',
  backgroundColor: '#FFF',
  backgroundSurfaceColor: '#EEEFF2',
  contrastLowColor: '#D8D8DB',
  contrastMediumColor: '#949598',
  contrastHighColor: '#535457',
  contrastHighColorDarken: '#353638',
  hoverColor: '#D8D8DB',
  hoverColorDarken: '#b8b8be',
  activeColor: '#D8D8DB',
  focusColor: '#0A0AFF',
  disabledColor: '#D8D8DB',
  errorColor: '#E7323B',
  errorColorDarken: '#c51720',
  errorSoftColor: '#FCE8E9',
  successColor: '#32B85B',
  successColorDarken: '#258843',
  successSoftColor: '#EBFAF0',
  warningColor: '#FECC1B',
  warningSoftColor: '#FFF9E6',
  infoColor: '#1E5BEB',
  infoSoftColor: '#E8EEFD'
};

const themeDark = {
  primaryColor: '#FBFCFF',
  primaryColorDarken: '#beceff',
  backgroundColor: '#0E0E12',
  backgroundSurfaceColor: '#212225',
  contrastLowColor: '#404044',
  contrastMediumColor: '#7E7F82',
  contrastHighColor: '#AFB0B3',
  contrastHighColorDarken: '#909195',
  hoverColor: '#404044',
  hoverColorDarken: '#222224',
  activeColor: '#404044',
  focusColor: '#0A0AFF',
  disabledColor: '#404044',
  errorColor: '#CB3333',
  errorColorDarken: '#9a2727',
  errorSoftColor: '#290A0A',
  successColor: '#00C77E',
  successColorDarken: '#008a57',
  successSoftColor: '#003320',
  warningColor: '#DDB84B',
  warningSoftColor: '#2B2208',
  infoColor: '#027FFC',
  infoSoftColor: '#001A33'
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
