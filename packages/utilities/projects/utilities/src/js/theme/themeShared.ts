export type Theme = 'light' | 'dark';
export type ThemeColorSet = {
  main: string;
  background: {
    base: string;
    surface: string;
  };
  contrast: {
    high: string;
    medium: string;
    low: string;
  };
  notification: {
    success: string;
    successSoft: string;
    warning: string;
    warningSoft: string;
    error: string;
    errorSoft: string;
    info: string;
    infoSoft: string;
  };
  state: {
    hover: string;
    active: string;
    focus: string;
    disabled: string;
  };
};
