import type { ThemeColorSet } from './themeShared';

export const themeLightPrimary = '#010205';
export const themeLightBackgroundBase = '#FFF';
export const themeLightBackgroundSurface = '#EEEFF2';
export const themeLightContrastLow = '#D8D8DB';
export const themeLightContrastMedium = '#949598';
export const themeLightContrastHigh = '#535457';
export const themeLightNotificationSuccess = '#32B85B';
export const themeLightNotificationSuccessSoft = '#EBFAF0';
export const themeLightNotificationWarning = '#FECC1B';
export const themeLightNotificationWarningSoft = '#FFF9E6';
export const themeLightNotificationError = '#E7323B';
export const themeLightNotificationErrorSoft = '#FCE8E9';
export const themeLightNotificationInfo = '#1E5BEB';
export const themeLightNotificationInfoSoft = '#E8EEFD';
export const themeLightStateHover = '#D8D8DB';
export const themeLightStateActive = '#D8D8DB';
export const themeLightStateFocus = '#0A0AFF';
export const themeLightStateDisabled = '#D8D8DB';

export const themeLight: ThemeColorSet = {
  primary: themeLightPrimary,
  background: {
    base: themeLightBackgroundBase,
    surface: themeLightBackgroundSurface,
  },
  contrast: {
    low: themeLightContrastLow,
    medium: themeLightContrastMedium,
    high: themeLightContrastHigh,
  },
  notification: {
    success: themeLightNotificationSuccess,
    successSoft: themeLightNotificationSuccessSoft,
    warning: themeLightNotificationWarning,
    warningSoft: themeLightNotificationWarningSoft,
    error: themeLightNotificationError,
    errorSoft: themeLightNotificationErrorSoft,
    info: themeLightNotificationInfo,
    infoSoft: themeLightNotificationInfoSoft,
  },
  state: {
    hover: themeLightStateHover,
    active: themeLightStateActive,
    focus: themeLightStateFocus,
    disabled: themeLightStateDisabled,
  },
};
