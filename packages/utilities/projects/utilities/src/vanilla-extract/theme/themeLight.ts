import type { ThemeColorSet } from './themeShared';
import { themeLightPrimary } from './themeLightPrimary';
import { themeLightBackgroundBase } from './themeLightBackgroundBase';
import { themeLightBackgroundSurface } from './themeLightBackgroundSurface';
import { themeLightBackgroundShading } from './themeLightBackgroundShading';
import { themeLightBackgroundFrosted } from './themeLightBackgroundFrosted';
import { themeLightContrastLow } from './themeLightContrastLow';
import { themeLightContrastMedium } from './themeLightContrastMedium';
import { themeLightContrastHigh } from './themeLightContrastHigh';
import { themeLightNotificationSuccess } from './themeLightNotificationSuccess';
import { themeLightNotificationSuccessSoft } from './themeLightNotificationSuccessSoft';
import { themeLightNotificationWarning } from './themeLightNotificationWarning';
import { themeLightNotificationWarningSoft } from './themeLightNotificationWarningSoft';
import { themeLightNotificationError } from './themeLightNotificationError';
import { themeLightNotificationErrorSoft } from './themeLightNotificationErrorSoft';
import { themeLightNotificationInfo } from './themeLightNotificationInfo';
import { themeLightNotificationInfoSoft } from './themeLightNotificationInfoSoft';
import { themeLightStateHover } from './themeLightStateHover';
import { themeLightStateActive } from './themeLightStateActive';
import { themeLightStateFocus } from './themeLightStateFocus';
import { themeLightStateDisabled } from './themeLightStateDisabled';

export const themeLight: ThemeColorSet = {
  primary: themeLightPrimary,
  background: {
    base: themeLightBackgroundBase,
    surface: themeLightBackgroundSurface,
    shading: themeLightBackgroundShading,
    frosted: themeLightBackgroundFrosted,
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
