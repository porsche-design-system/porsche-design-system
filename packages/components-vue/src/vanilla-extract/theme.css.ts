import {
  borderRadiusSmall,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  themeDarkBackgroundBase,
  themeDarkBackgroundFrosted,
  themeDarkBackgroundShading,
  themeDarkBackgroundSurface,
  themeDarkContrastHigh,
  themeDarkContrastLow,
  themeDarkContrastMedium,
  themeDarkNotificationError,
  themeDarkNotificationErrorSoft,
  themeDarkNotificationInfo,
  themeDarkNotificationInfoSoft,
  themeDarkNotificationSuccess,
  themeDarkNotificationSuccessSoft,
  themeDarkNotificationWarning,
  themeDarkNotificationWarningSoft,
  themeDarkPrimary,
  themeDarkStateActive,
  themeDarkStateDisabled,
  themeDarkStateFocus,
  themeDarkStateHover,
  themeLightBackgroundBase,
  themeLightBackgroundFrosted,
  themeLightBackgroundShading,
  themeLightBackgroundSurface,
  themeLightContrastHigh,
  themeLightContrastLow,
  themeLightContrastMedium,
  themeLightNotificationError,
  themeLightNotificationErrorSoft,
  themeLightNotificationInfo,
  themeLightNotificationInfoSoft,
  themeLightNotificationSuccess,
  themeLightNotificationSuccessSoft,
  themeLightNotificationWarning,
  themeLightNotificationWarningSoft,
  themeLightPrimary,
  themeLightStateActive,
  themeLightStateDisabled,
  themeLightStateFocus,
  themeLightStateHover,
} from '@porsche-design-system/components-vue/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: gridGap,
  padding: spacingFluidMedium,
} as const;

export const WrapperLight = style({
  ...wrapperStyle,
  background: themeLightBackgroundBase,
});

export const WrapperDark = style({
  ...wrapperStyle,
  background: themeDarkBackgroundBase,
});

// Typography
export const headingStyle = {
  ...headingMediumStyle,
  textAlign: 'center',
  width: '100%',
  margin: 0,
} as const;

export const HeadingLight = style({
  ...headingStyle,
  color: themeLightPrimary,
});

export const HeadingDark = style({
  ...headingStyle,
  color: themeDarkPrimary,
});

// Tile
export const getTileStyle = {
  borderRadius: borderRadiusSmall,
  padding: spacingFluidMedium,
  border: '1px solid grey',
} as const;

// Theme Light
export const ThemeLightPrimary = style({
  ...getTileStyle,
  background: themeLightPrimary,
});

export const ThemeLightBackgroundBase = style({
  ...getTileStyle,
  background: themeLightBackgroundBase,
});

export const ThemeLightBackgroundSurface = style({
  ...getTileStyle,
  background: themeLightBackgroundSurface,
});

export const ThemeLightBackgroundShading = style({
  ...getTileStyle,
  background: themeLightBackgroundShading,
});

export const ThemeLightBackgroundFrosted = style({
  ...getTileStyle,
  background: themeLightBackgroundFrosted,
});

export const ThemeLightContrastLow = style({
  ...getTileStyle,
  background: themeLightContrastLow,
});

export const ThemeLightContrastMedium = style({
  ...getTileStyle,
  background: themeLightContrastMedium,
});

export const ThemeLightContrastHigh = style({
  ...getTileStyle,
  background: themeLightContrastHigh,
});

export const ThemeLightNotificationSuccess = style({
  ...getTileStyle,
  background: themeLightNotificationSuccess,
});

export const ThemeLightNotificationSuccessSoft = style({
  ...getTileStyle,
  background: themeLightNotificationSuccessSoft,
});

export const ThemeLightNotificationWarning = style({
  ...getTileStyle,
  background: themeLightNotificationWarning,
});

export const ThemeLightNotificationWarningSoft = style({
  ...getTileStyle,
  background: themeLightNotificationWarningSoft,
});

export const ThemeLightNotificationError = style({
  ...getTileStyle,
  background: themeLightNotificationError,
});

export const ThemeLightNotificationErrorSoft = style({
  ...getTileStyle,
  background: themeLightNotificationErrorSoft,
});

export const ThemeLightNotificationInfo = style({
  ...getTileStyle,
  background: themeLightNotificationInfo,
});

export const ThemeLightNotificationInfoSoft = style({
  ...getTileStyle,
  background: themeLightNotificationInfoSoft,
});

export const ThemeLightStateHover = style({
  ...getTileStyle,
  background: themeLightStateHover,
});

export const ThemeLightStateActive = style({
  ...getTileStyle,
  background: themeLightStateActive,
});

export const ThemeLightStateFocus = style({
  ...getTileStyle,
  background: themeLightStateFocus,
});

export const ThemeLightStateDisabled = style({
  ...getTileStyle,
  background: themeLightStateDisabled,
});

// Theme Dark
export const ThemeDarkPrimary = style({
  ...getTileStyle,
  background: themeDarkPrimary,
});

export const ThemeDarkBackgroundBase = style({
  ...getTileStyle,
  background: themeDarkBackgroundBase,
});

export const ThemeDarkBackgroundSurface = style({
  ...getTileStyle,
  background: themeDarkBackgroundSurface,
});

export const ThemeDarkBackgroundShading = style({
  ...getTileStyle,
  background: themeDarkBackgroundShading,
});

export const ThemeDarkBackgroundFrosted = style({
  ...getTileStyle,
  background: themeDarkBackgroundFrosted,
});

export const ThemeDarkContrastLow = style({
  ...getTileStyle,
  background: themeDarkContrastLow,
});

export const ThemeDarkContrastMedium = style({
  ...getTileStyle,
  background: themeDarkContrastMedium,
});

export const ThemeDarkContrastHigh = style({
  ...getTileStyle,
  background: themeDarkContrastHigh,
});

export const ThemeDarkNotificationSuccess = style({
  ...getTileStyle,
  background: themeDarkNotificationSuccess,
});

export const ThemeDarkNotificationSuccessSoft = style({
  ...getTileStyle,
  background: themeDarkNotificationSuccessSoft,
});

export const ThemeDarkNotificationWarning = style({
  ...getTileStyle,
  background: themeDarkNotificationWarning,
});

export const ThemeDarkNotificationWarningSoft = style({
  ...getTileStyle,
  background: themeDarkNotificationWarningSoft,
});

export const ThemeDarkNotificationError = style({
  ...getTileStyle,
  background: themeDarkNotificationError,
});

export const ThemeDarkNotificationErrorSoft = style({
  ...getTileStyle,
  background: themeDarkNotificationErrorSoft,
});

export const ThemeDarkNotificationInfo = style({
  ...getTileStyle,
  background: themeDarkNotificationInfo,
});

export const ThemeDarkNotificationInfoSoft = style({
  ...getTileStyle,
  background: themeDarkNotificationInfoSoft,
});

export const ThemeDarkStateHover = style({
  ...getTileStyle,
  background: themeDarkStateHover,
});

export const ThemeDarkStateActive = style({
  ...getTileStyle,
  background: themeDarkStateActive,
});

export const ThemeDarkStateFocus = style({
  ...getTileStyle,
  background: themeDarkStateFocus,
});

export const ThemeDarkStateDisabled = style({
  ...getTileStyle,
  background: themeDarkStateDisabled,
});
