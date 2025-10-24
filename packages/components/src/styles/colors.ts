import { isHighContrastMode, type Theme } from '../utils';
import {
  colorCanvasDark,
  colorCanvasInvertedDark,
  colorCanvasInvertedLight,
  colorCanvasLight,
  colorContrast10Dark,
  colorContrast10Light,
  colorContrast20Dark,
  colorContrast20Light,
  colorContrast30Dark,
  colorContrast30Light,
  colorContrast40Dark,
  colorContrast40Light,
  colorContrast50Dark,
  colorContrast50Light,
  colorContrast60Dark,
  colorContrast60Light,
  colorContrast70Dark,
  colorContrast70Light,
  colorContrast80Dark,
  colorContrast80Light,
  colorContrast90Dark,
  colorContrast90Light,
  colorErrorDark,
  colorErrorLight,
  colorErrorSoftDark,
  colorErrorSoftLight,
  colorFocusDark,
  colorFocusLight,
  colorFrostedDark,
  colorFrostedLight,
  colorInfoDark,
  colorInfoLight,
  colorInfoSoftDark,
  colorInfoSoftLight,
  colorPrimaryDark,
  colorPrimaryLight,
  colorScrimDark,
  colorScrimLight,
  colorPrimaryInvertedLight,
  colorPrimaryInvertedDark,
  colorSuccessDark,
  colorSuccessLight,
  colorSuccessSoftDark,
  colorSuccessSoftLight,
  colorSurfaceDark,
  colorSurfaceLight,
  colorWarningDark,
  colorWarningLight,
  colorWarningSoftDark,
  colorWarningSoftLight,
} from '@porsche-design-system/tokens';

type ThemedColor =
  // a11y
  | 'focusColor'
  // background
  | 'canvasColor'
  | 'canvasInvertedColor'
  | 'surfaceColor'
  | 'frostedColor'
  | 'scrimColor'
  // contrast
  | 'contrast10Color'
  | 'contrast20Color'
  | 'contrast30Color'
  | 'contrast40Color'
  | 'contrast50Color'
  | 'contrast60Color'
  | 'contrast70Color'
  | 'contrast80Color'
  | 'contrast90Color'
  | 'primaryColor'
  | 'primaryInvertedColor'
  // semantic
  | 'errorColor'
  | 'errorSoftColor'
  | 'successColor'
  | 'successSoftColor'
  | 'warningColor'
  | 'warningSoftColor'
  | 'infoColor'
  | 'infoSoftColor';

export type ThemedColors = { [key in ThemedColor]: string };

const themeLight: ThemedColors = {
  // a11y
  'focusColor': colorFocusLight,
  // background
  'canvasColor': colorCanvasLight,
  'canvasInvertedColor': colorCanvasInvertedLight,
  'surfaceColor': colorSurfaceLight,
  'frostedColor': colorFrostedLight,
  'scrimColor': colorScrimLight,
  // contrast
  'contrast10Color': colorContrast10Light,
  'contrast20Color': colorContrast20Light,
  'contrast30Color': colorContrast30Light,
  'contrast40Color': colorContrast40Light,
  'contrast50Color': colorContrast50Light,
  'contrast60Color': colorContrast60Light,
  'contrast70Color': colorContrast70Light,
  'contrast80Color': colorContrast80Light,
  'contrast90Color': colorContrast90Light,
  'primaryColor': colorPrimaryLight,
  'primaryInvertedColor': colorPrimaryInvertedLight,
  // semantic
  'errorColor': colorErrorLight,
  'errorSoftColor': colorErrorSoftLight,
  'successColor': colorSuccessLight,
  'successSoftColor': colorSuccessSoftLight,
  'warningColor': colorWarningLight,
  'warningSoftColor': colorWarningSoftLight,
  'infoColor': colorInfoLight,
  'infoSoftColor': colorInfoSoftLight,
};

const themeDark: ThemedColors = {
  // a11y
  'focusColor': colorFocusDark,
  // background
  'canvasColor': colorCanvasDark,
  'canvasInvertedColor': colorCanvasInvertedDark,
  'surfaceColor': colorSurfaceDark,
  'frostedColor': colorFrostedDark,
  'scrimColor': colorScrimDark,
  // contrast
  'contrast10Color': colorContrast10Dark,
  'contrast20Color': colorContrast20Dark,
  'contrast30Color': colorContrast30Dark,
  'contrast40Color': colorContrast40Dark,
  'contrast50Color': colorContrast50Dark,
  'contrast60Color': colorContrast60Dark,
  'contrast70Color': colorContrast70Dark,
  'contrast80Color': colorContrast80Dark,
  'contrast90Color': colorContrast90Dark,
  'primaryColor': colorPrimaryDark,
  'primaryInvertedColor': colorPrimaryInvertedDark,
  // semantic
  'errorColor': colorErrorDark,
  'errorSoftColor': colorErrorSoftDark,
  'successColor': colorSuccessDark,
  'successSoftColor': colorSuccessSoftDark,
  'warningColor': colorWarningDark,
  'warningSoftColor': colorWarningSoftDark,
  'infoColor': colorInfoDark,
  'infoSoftColor': colorInfoSoftDark,
};

const themes = {
  'light': themeLight,
  'dark': themeDark,
  'auto': themeLight
};

const schemeHighContrastMerged: Partial<ThemedColors> = {
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
