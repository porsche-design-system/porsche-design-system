/** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
export type Theme = 'light' | 'dark' | 'auto';
/** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
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
