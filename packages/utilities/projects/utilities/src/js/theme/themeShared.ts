export type Theme = 'light' | 'dark' | 'auto';
export type ThemeColorSet = {
  primary: string;
  background: {
    base: string;
    surface: string;
    shading: string;
    frosted: string;
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
