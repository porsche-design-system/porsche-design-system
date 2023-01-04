import type { ThemeColorSet } from './themeShared';

export const themeDark: ThemeColorSet = {
  primary: '#FBFCFF',
  background: {
    base: '#0E0E12',
    surface: '#212225',
  },
  contrast: {
    high: '#535457',
    medium: '#7E7F82',
    low: '#404044',
  },
  notification: {
    success: '#00C77E',
    successSoft: '#003320',
    warning: '#DDB84B',
    warningSoft: '#2B2208',
    error: '#CB3333',
    errorSoft: '#290A0A',
    info: '#027FFC',
    infoSoft: '#001A33',
  },
  state: {
    hover: '#404044',
    active: '#404044',
    focus: '#0A0AFF',
    disabled: '#404044',
  },
};
