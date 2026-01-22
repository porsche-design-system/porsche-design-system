import type { ThemeColorSet } from './themeShared';
import { themeDarkPrimary } from './themeDarkPrimary';
import { themeDarkBackgroundBase } from './themeDarkBackgroundBase';
import { themeDarkBackgroundSurface } from './themeDarkBackgroundSurface';
import { themeDarkBackgroundShading } from './themeDarkBackgroundShading';
import { themeDarkBackgroundFrosted } from './themeDarkBackgroundFrosted';
import { themeDarkContrastLow } from './themeDarkContrastLow';
import { themeDarkContrastMedium } from './themeDarkContrastMedium';
import { themeDarkContrastHigh } from './themeDarkContrastHigh';
import { themeDarkNotificationSuccess } from './themeDarkNotificationSuccess';
import { themeDarkNotificationSuccessSoft } from './themeDarkNotificationSuccessSoft';
import { themeDarkNotificationWarning } from './themeDarkNotificationWarning';
import { themeDarkNotificationWarningSoft } from './themeDarkNotificationWarningSoft';
import { themeDarkNotificationError } from './themeDarkNotificationError';
import { themeDarkNotificationErrorSoft } from './themeDarkNotificationErrorSoft';
import { themeDarkNotificationInfo } from './themeDarkNotificationInfo';
import { themeDarkNotificationInfoSoft } from './themeDarkNotificationInfoSoft';
import { themeDarkStateHover } from './themeDarkStateHover';
import { themeDarkStateActive } from './themeDarkStateActive';
import { themeDarkStateFocus } from './themeDarkStateFocus';
import { themeDarkStateDisabled } from './themeDarkStateDisabled';

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
