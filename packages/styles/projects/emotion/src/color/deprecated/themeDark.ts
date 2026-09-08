import { themeDarkBackgroundBase } from './themeDarkBackgroundBase';
import { themeDarkBackgroundFrosted } from './themeDarkBackgroundFrosted';
import { themeDarkBackgroundShading } from './themeDarkBackgroundShading';
import { themeDarkBackgroundSurface } from './themeDarkBackgroundSurface';
import { themeDarkContrastHigh } from './themeDarkContrastHigh';
import { themeDarkContrastLow } from './themeDarkContrastLow';
import { themeDarkContrastMedium } from './themeDarkContrastMedium';
import { themeDarkNotificationError } from './themeDarkNotificationError';
import { themeDarkNotificationErrorSoft } from './themeDarkNotificationErrorSoft';
import { themeDarkNotificationInfo } from './themeDarkNotificationInfo';
import { themeDarkNotificationInfoSoft } from './themeDarkNotificationInfoSoft';
import { themeDarkNotificationSuccess } from './themeDarkNotificationSuccess';
import { themeDarkNotificationSuccessSoft } from './themeDarkNotificationSuccessSoft';
import { themeDarkNotificationWarning } from './themeDarkNotificationWarning';
import { themeDarkNotificationWarningSoft } from './themeDarkNotificationWarningSoft';
import { themeDarkPrimary } from './themeDarkPrimary';
import { themeDarkStateActive } from './themeDarkStateActive';
import { themeDarkStateDisabled } from './themeDarkStateDisabled';
import { themeDarkStateFocus } from './themeDarkStateFocus';
import { themeDarkStateHover } from './themeDarkStateHover';
import type { ThemeColorSet } from './themeShared';

/** @deprecated since v4.0.0, will be removed with next major release. Use individual variables instead. */
export const themeDark: ThemeColorSet = {
  primary: themeDarkPrimary,
  background: {
    base: themeDarkBackgroundBase,
    surface: themeDarkBackgroundSurface,
    shading: themeDarkBackgroundShading,
    frosted: themeDarkBackgroundFrosted,
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
