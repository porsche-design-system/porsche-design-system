export type ColorTheme = {
  brand: string;
  base: string;
  background: {
    base: string;
    surface: string;
    shading: string;
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
    neutral: string;
    neutralSoft: string;
  };
  state: {
    hover: string;
    active: string;
    focus: string;
    disabled: string;
  };
};
