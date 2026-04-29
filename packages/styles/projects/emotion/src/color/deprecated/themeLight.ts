import { themeLightBackgroundBase } from './themeLightBackgroundBase';
import { themeLightBackgroundFrosted } from './themeLightBackgroundFrosted';
import { themeLightBackgroundShading } from './themeLightBackgroundShading';
import { themeLightBackgroundSurface } from './themeLightBackgroundSurface';
import { themeLightContrastHigh } from './themeLightContrastHigh';
import { themeLightContrastLow } from './themeLightContrastLow';
import { themeLightContrastMedium } from './themeLightContrastMedium';
import { themeLightNotificationError } from './themeLightNotificationError';
import { themeLightNotificationErrorSoft } from './themeLightNotificationErrorSoft';
import { themeLightNotificationInfo } from './themeLightNotificationInfo';
import { themeLightNotificationInfoSoft } from './themeLightNotificationInfoSoft';
import { themeLightNotificationSuccess } from './themeLightNotificationSuccess';
import { themeLightNotificationSuccessSoft } from './themeLightNotificationSuccessSoft';
import { themeLightNotificationWarning } from './themeLightNotificationWarning';
import { themeLightNotificationWarningSoft } from './themeLightNotificationWarningSoft';
import { themeLightPrimary } from './themeLightPrimary';
import { themeLightStateActive } from './themeLightStateActive';
import { themeLightStateDisabled } from './themeLightStateDisabled';
import { themeLightStateFocus } from './themeLightStateFocus';
import { themeLightStateHover } from './themeLightStateHover';
import type { ThemeColorSet } from './themeShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
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
