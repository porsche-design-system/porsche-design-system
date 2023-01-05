import type { ThemeColorSet } from './themeShared';

export const themeDarkPrimary = '#FBFCFF';
export const themeDarkBackgroundBase = '#0E0E12';
export const themeDarkBackgroundSurface = '#212225';
export const themeDarkContrastLow = '#535457';
export const themeDarkContrastMedium = '#7E7F82';
export const themeDarkContrastHigh = '#404044';
export const themeDarkNotificationSuccess = '#00C77E';
export const themeDarkNotificationSuccessSoft = '#003320';
export const themeDarkNotificationWarning = '#DDB84B';
export const themeDarkNotificationWarningSoft = '#2B2208';
export const themeDarkNotificationError = '#CB3333';
export const themeDarkNotificationErrorSoft = '#290A0A';
export const themeDarkNotificationInfo = '#027FFC';
export const themeDarkNotificationInfoSoft = '#001A33';
export const themeDarkStateHover = '#404044';
export const themeDarkStateActive = '#404044';
export const themeDarkStateFocus = '#0A0AFF';
export const themeDarkStateDisabled = '#404044';

export const themeDark: ThemeColorSet = {
  primary: themeDarkPrimary,
  background: {
    base: themeDarkBackgroundBase,
    surface: themeDarkBackgroundSurface,
  },
  contrast: {
    low: themeDarkContrastLow,
    medium: themeDarkContrastMedium,
    high: themeDarkContrastHigh,
  },
  notification: {
    success: themeDarkNotificationSuccess,
    successSoft: themeDarkNotificationSuccessSoft,
    warning: themeDarkNotificationWarning,
    warningSoft: themeDarkNotificationWarningSoft,
    error: themeDarkNotificationError,
    errorSoft: themeDarkNotificationErrorSoft,
    info: themeDarkNotificationInfo,
    infoSoft: themeDarkNotificationInfoSoft,
  },
  state: {
    hover: themeDarkStateHover,
    active: themeDarkStateActive,
    focus: themeDarkStateFocus,
    disabled: themeDarkStateDisabled,
  },
};
