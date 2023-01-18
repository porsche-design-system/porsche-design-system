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
  backgroundColorDarken: '#e0e0e0',
  backgroundColorLighten: '#ffffff',
  backgroundSurfaceColor: '#EEEFF2',
  backgroundSurfaceColorDarken: '#cbced7',
  backgroundSurfaceColorLighten: '#ffffff',
  contrastLowColor: '#D8D8DB',
  contrastMediumColor: '#949598',
  contrastHighColor: '#535457',
  contrastHighColorDarken: '#353638',
  contrastHighColorLighten: '#717276',
  hoverColor: 'rgba(83, 83, 83, 0.25)',
  hoverColorDarken: '#343434',
  activeColor: '#949598',
  focusColor: '#0A0AFF',
  disabledColor: '#949598',
  errorColor: '#E7323B',
  errorColorDarken: '#c51720',
  errorSoftColor: '#FCE8E9',
  errorSoftColorDarken: '#eed7d9',
  errorSoftColorLighten: '#ffffff',
  successColor: '#32B85B',
  successColorDarken: '#258843',
  successSoftColor: '#EBFAF0',
  successSoftColorDarken: '#ddeae1',
  successSoftColorLighten: '#ffffff',
  warningColor: '#FECC1B',
  warningSoftColor: '#FFF9E6',
  warningSoftColorDarken: '#f5ecd2',
  warningSoftColorLighten: '#ffffff',
  infoColor: '#1E5BEB',
  infoSoftColor: '#E8EEFD',
  infoSoftColorDarken: '#d6def0',
  infoSoftColorLighten: '#ffffff'
};

const themeDark = {
  primaryColor: '#FBFCFF',
  primaryColorDarken: '#beceff',
  backgroundColor: '#0E0E12',
  backgroundColorDarken: '#000000',
  backgroundColorLighten: '#292934',
  backgroundSurfaceColor: '#212225',
  backgroundSurfaceColorDarken: '#040405',
  backgroundSurfaceColorLighten: '#3e4045',
  contrastLowColor: '#404044',
  contrastMediumColor: '#7E7F82',
  contrastHighColor: '#AFB0B3',
  contrastHighColorDarken: '#909195',
  contrastHighColorLighten: '#cecfd1',
  hoverColor: 'rgba(144, 144, 153, 0.25)',
  hoverColorDarken: '#71717b',
  activeColor: '#7E7F82',
  focusColor: '#0A0AFF',
  disabledColor: '#7E7F82',
  errorColor: '#CB3333',
  errorColorDarken: '#9a2727',
  errorSoftColor: '#290A0A',
  errorSoftColorDarken: '#0d0808',
  errorSoftColorLighten: '#331f1f',
  successColor: '#00C77E',
  successColorDarken: '#008a57',
  successSoftColor: '#003320',
  successSoftColorDarken: '#04110c',
  successSoftColorLighten: '#0f432f',
  warningColor: '#DDB84B',
  warningSoftColor: '#2B2208',
  warningSoftColorDarken: '#0d0c07',
  warningSoftColorLighten: '#362f1c',
  infoColor: '#027FFC',
  infoSoftColor: '#001A33',
  infoSoftColorDarken: '#040a11',
  infoSoftColorLighten: '#0f2943'
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
