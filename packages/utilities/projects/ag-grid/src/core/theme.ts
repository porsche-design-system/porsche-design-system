import { type Theme, themeQuartz } from 'ag-grid-community';
import { checkboxStyle, inputStyles, pdsSvgIcons, toggleButtonStyle } from '../parts';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  fontFamily,
  fontSizeTextSmall,
  fontSizeTextXSmall,
  fontWeightSemiBold,
  themeDarkBackgroundBase,
  themeDarkBackgroundFrosted,
  themeDarkBackgroundShading,
  themeDarkBackgroundSurface,
  // @ts-ignore
  themeDarkBackgroundSurfaceDarken,
  themeDarkContrastLow,
  // @ts-ignore
  themeDarkContrastMedium,
  themeDarkNotificationError,
  themeDarkNotificationInfo,
  themeDarkNotificationInfoSoft,
  themeDarkPrimary,
  // @ts-ignore
  themeDarkStateDisabled,
  themeDarkStateFocus,
  themeDarkStateHover,
  themeLightBackgroundBase,
  themeLightBackgroundFrosted,
  themeLightBackgroundShading,
  themeLightBackgroundSurface,
  // @ts-ignore
  themeLightBackgroundSurfaceDarken,
  themeLightContrastLow,
  // @ts-ignore
  themeLightContrastMedium,
  themeLightNotificationError,
  themeLightNotificationInfo,
  themeLightNotificationInfoSoft,
  themeLightPrimary,
  // @ts-ignore
  themeLightStateDisabled,
  themeLightStateFocus,
  themeLightStateHover,
} from '../styles';
import { pdsThemeModeDark } from '../types/theme-mode';

export const pdsTheme: Theme = themeQuartz
  .withParams({
    checkboxBorderWidth: 2,
    checkboxBorderRadius: borderRadiusSmall,
    focusShadow: 'none',
    inputFocusShadow: 'none',
    spacing: 10,
    toggleButtonHeight: 28,
    toggleButtonWidth: 48,
    iconSize: 24,
    borderRadius: borderRadiusSmall,
    wrapperBorderRadius: borderRadiusMedium,
    fontFamily: fontFamily,
    fontSize: fontSizeTextSmall,
    headerFontWeight: fontWeightSemiBold,
    headerFontSize: fontSizeTextXSmall,
    headerHeight: 'calc(var(--ag-font-size) + var(--ag-spacing) * 2.9)',
    rowHeight: 'calc(var(--ag-font-size) + var(--ag-spacing) * 4)',
    toggleButtonSwitchInset: 3,
    browserColorScheme: 'light',
    accentColor: themeLightNotificationInfo,
    backgroundColor: themeLightBackgroundBase,
    foregroundColor: themeLightPrimary,
    headerBackgroundColor: themeLightBackgroundShading, // maybe?
    selectedRowBackgroundColor: themeLightNotificationInfoSoft,
    oddRowBackgroundColor: themeLightBackgroundSurface,
    modalOverlayBackgroundColor: themeLightBackgroundFrosted,
    rowHoverColor: themeLightStateHover,
    columnHoverColor: themeLightStateHover,
    rangeSelectionBorderColor: themeLightStateFocus,
    borderColor: themeLightContrastLow,
    invalidColor: themeLightNotificationError,
  })
  .withParams(
    {
      browserColorScheme: 'dark',
      accentColor: themeDarkNotificationInfo,
      backgroundColor: themeDarkBackgroundBase,
      foregroundColor: themeDarkPrimary,
      headerBackgroundColor: themeDarkBackgroundShading, // maybe?
      selectedRowBackgroundColor: themeDarkNotificationInfoSoft,
      oddRowBackgroundColor: themeDarkBackgroundSurface,
      modalOverlayBackgroundColor: themeDarkBackgroundFrosted,
      rowHoverColor: themeDarkStateHover,
      columnHoverColor: themeDarkStateHover,
      rangeSelectionBorderColor: themeDarkStateFocus,
      borderColor: themeDarkContrastLow,
      invalidColor: themeDarkNotificationError,
    },
    pdsThemeModeDark
  )
  .withPart(pdsSvgIcons)
  .withPart(toggleButtonStyle)
  .withPart(checkboxStyle)
  .withPart(inputStyles);
