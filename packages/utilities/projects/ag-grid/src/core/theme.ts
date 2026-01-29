import { type Theme, themeQuartz } from 'ag-grid-community';
import { checkboxStyle, inputStyles, pdsSvgIcons, toggleButtonStyle } from '../parts';
import {
  borderRadiusMd,
  borderRadiusSm,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastLowDark,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorErrorLowDark,
  colorErrorLowLight,
  colorFocusDark,
  colorFocusLight,
  colorFrostedDark,
  colorFrostedLight,
  colorInfoDark,
  colorInfoLight,
  colorInfoLowDark,
  colorInfoLowLight,
  colorPrimaryDark,
  colorPrimaryLight,
  colorSurfaceDark,
  colorSurfaceLight,
  fontFamilyPorscheNext,
  fontSizeSm,
  fontSizeXs,
  fontWeightSemiBold,
} from '../styles';
import { pdsThemeModeDark } from '../types/theme-mode';

export const pdsTheme: Theme = themeQuartz
  .withParams({
    checkboxBorderWidth: 2,
    checkboxBorderRadius: borderRadiusSm,
    focusShadow: 'none',
    inputFocusShadow: 'none',
    spacing: 10,
    toggleButtonHeight: 28,
    toggleButtonWidth: 48,
    iconSize: 24,
    borderRadius: borderRadiusSm,
    wrapperBorderRadius: borderRadiusMd,
    fontFamily: fontFamilyPorscheNext,
    fontSize: fontSizeSm,
    headerFontWeight: fontWeightSemiBold,
    headerFontSize: fontSizeXs,
    headerHeight: 'calc(var(--ag-font-size) + var(--ag-spacing) * 2.9)',
    rowHeight: 'calc(var(--ag-font-size) + var(--ag-spacing) * 4)',
    toggleButtonSwitchInset: 3,
    browserColorScheme: 'light',
    accentColor: colorInfoLight,
    backgroundColor: colorCanvasLight,
    foregroundColor: colorPrimaryLight,
    headerBackgroundColor: colorContrastLowerLight, // maybe?
    selectedRowBackgroundColor: colorInfoLowLight,
    oddRowBackgroundColor: colorSurfaceLight,
    modalOverlayBackgroundColor: colorFrostedLight,
    rowHoverColor: colorFrostedLight,
    columnHoverColor: colorFrostedLight,
    rangeSelectionBorderColor: colorFocusLight,
    borderColor: colorContrastLowLight,
    invalidColor: colorErrorLowLight,
  })
  .withParams(
    {
      browserColorScheme: 'dark',
      accentColor: colorInfoDark,
      backgroundColor: colorCanvasDark,
      foregroundColor: colorPrimaryDark,
      headerBackgroundColor: colorContrastLowerDark, // maybe?
      selectedRowBackgroundColor: colorInfoLowDark,
      oddRowBackgroundColor: colorSurfaceDark,
      modalOverlayBackgroundColor: colorFrostedDark,
      rowHoverColor: colorFrostedDark,
      columnHoverColor: colorFrostedDark,
      rangeSelectionBorderColor: colorFocusDark,
      borderColor: colorContrastLowDark,
      invalidColor: colorErrorLowDark,
    },
    pdsThemeModeDark
  )
  .withPart(pdsSvgIcons)
  .withPart(toggleButtonStyle)
  .withPart(checkboxStyle)
  .withPart(inputStyles);
