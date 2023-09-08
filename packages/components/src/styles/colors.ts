import type { Theme } from '@porsche-design-system/utilities-v2';
import { isThemeDark, isHighContrastMode } from '../utils';

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
  contrastMediumColor: '#6B6D70',
  contrastHighColor: '#535457',
  contrastHighColorDarken: '#353638',
  contrastHighColorLighten: '#717276',
  hoverColor: 'rgba(148, 149, 152, .18)',
  hoverColorDarken: '#75767A',
  activeColor: 'rgba(148, 149, 152, 0.20)',
  focusColor: '#1A44EA',
  disabledColor: '#949598',
  errorColor: '#CC1922',
  errorColorDarken: '#951219',
  errorSoftColor: '#FFE2E4',
  errorSoftColorDarken: '#F4CED1',
  errorSoftColorLighten: '#FFFFFF',
  successColor: '#197E10',
  successColorDarken: '#0E4809',
  successSoftColor: '#E4FFEC',
  successSoftColorDarken: '#D0F4DB',
  successSoftColorLighten: '#FFFFFF',
  warningColor: '#F3BE00',
  warningSoftColor: '#FFF4D2',
  warningSoftColorDarken: '#F1E5C1',
  warningSoftColorLighten: '#FCFAF3',
  infoColor: '#2762EC',
  infoSoftColor: '#D3E1FF',
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
  contrastMediumColor: '#88898C',
  contrastHighColor: '#AFB0B3',
  contrastHighColorDarken: '#909195',
  contrastHighColorLighten: '#CECFD1',
  hoverColor: 'rgba(148, 149, 152, .18)',
  hoverColorDarken: '#75767A',
  activeColor: 'rgba(126, 127, 130, 0.20)',
  focusColor: '#1A44EA',
  disabledColor: '#7E7F82',
  errorColor: '#FC4040',
  errorColorDarken: '#FB0404',
  errorSoftColor: '#3A0F0F',
  errorSoftColorDarken: '#1A1111',
  errorSoftColorLighten: '#3F2828',
  successColor: '#09D087',
  successColorDarken: '#069561',
  successSoftColor: '#003320',
  successSoftColorDarken: '#04110C',
  successSoftColorLighten: '#0F432F',
  warningColor: '#F7CB47',
  warningSoftColor: '#362B0A',
  warningSoftColorDarken: '#16130B',
  warningSoftColorLighten: '#3E3720',
  infoColor: '#178BFF',
  infoSoftColor: '#04294E',
  infoSoftColorDarken: '#0C1A27',
  infoSoftColorLighten: '#1A3856'
};

const themeAuto = {
  ...themeLight,};

const themes = {
  'light': themeLight,
  'dark': themeDark,
  'auto': themeAuto
};
/* Auto Generated End */

const schemeHighContrastMerged: Partial<ThemedColors> = {
  disabledColor: 'GrayText',
  focusColor: 'Highlight',
};

type HighContrastColor = 'canvasColor' | 'canvasTextColor' | 'highlightColor' | 'linkColor';

export type HighContrastColors = { [key in HighContrastColor]: string };

const schemeHighContrast: HighContrastColors = {
  canvasColor: 'Canvas',
  canvasTextColor: 'CanvasText',
  highlightColor: 'Highlight',
  linkColor: 'LinkText',
};

export const getThemedColors = (theme: Theme): ThemedColors => {
  return isHighContrastMode ? { ...themes[theme], ...schemeHighContrastMerged } : themes[theme];
};

export const getHighContrastColors = (): HighContrastColors => {
  return schemeHighContrast;
};

export const getInvertedThemedColors = (theme: Theme): ThemedColors => {
  return getThemedColors(isThemeDark(theme) ? 'light' : 'dark');
};
