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
  errorSoftColor: '#FCE8E9',
  errorSoftColorDarken: '#EED7D9',
  errorSoftColorLighten: '#FFFFFF',
  successColor: '#32B85B',
  successColorDarken: '#258843',
  successSoftColor: '#EBFAF0',
  successSoftColorDarken: '#DDEAE1',
  successSoftColorLighten: '#FFFFFF',
  warningColor: '#FECC1B',
  warningSoftColor: '#FFF9E6',
  warningSoftColorDarken: '#F5ECD2',
  warningSoftColorLighten: '#FFFFFF',
  infoColor: '#1E5BEB',
  infoSoftColor: '#E8EEFD',
  infoSoftColorDarken: '#D6DEF0',
  infoSoftColorLighten: '#FFFFFF'
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
  focusColor: '#0A0AFF',
  disabledColor: '#7E7F82',
  errorColor: '#CB3333',
  errorColorDarken: '#9A2727',
  errorSoftColor: '#290A0A',
  errorSoftColorDarken: '#0D0808',
  errorSoftColorLighten: '#331F1F',
  successColor: '#00C77E',
  successColorDarken: '#008A57',
  successSoftColor: '#003320',
  successSoftColorDarken: '#04110C',
  successSoftColorLighten: '#0F432F',
  warningColor: '#DDB84B',
  warningSoftColor: '#2B2208',
  warningSoftColorDarken: '#0D0C07',
  warningSoftColorLighten: '#362F1C',
  infoColor: '#027FFC',
  infoSoftColor: '#001A33',
  infoSoftColorDarken: '#040A11',
  infoSoftColorLighten: '#0F2943'
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
