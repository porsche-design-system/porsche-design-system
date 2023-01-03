import type { ThemeColorSet } from './themeShared';

export const themeLight: ThemeColorSet = {
  main: '#010205',
  background: {
    base: '#FFF',
    surface: '#EEEFF2',
  },
  contrast: {
    low: '#D8D8DB',
    medium: '#949598',
    high: '#535457',
  },
  notification: {
    success: '#32B85B',
    successSoft: '#EBFAF0',
    warning: '#FECC1B',
    warningSoft: '#FFF9E6',
    error: '#E7323B',
    errorSoft: '#FCE8E9',
    info: '#1E5BEB',
    infoSoft: '#E8EEFD',
  },
  state: {
    hover: '#D8D8DB',
    active: '#D8D8DB',
    focus: '#0A0AFF',
    disabled: '#D8D8DB',
  },
};
