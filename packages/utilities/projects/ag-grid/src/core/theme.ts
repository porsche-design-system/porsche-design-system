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

/**
 * Porsche Design System theme for AG Grid v35
 *
 * This theme extends the Quartz theme with Porsche Design System styling.
 * It supports both light and dark modes via the data-ag-theme-mode attribute.
 *
 * Features:
 * - Custom Porsche Design System colors
 * - PorscheNext font family
 * - Custom checkbox, toggle, and input styling
 * - Optimized spacing and sizing
 * - Full dark mode support
 *
 * Usage:
 * ```typescript
 * import { pdsTheme } from '@porsche-design-system/utilities/ag-grid';
 *
 * const gridOptions = {
 *   theme: pdsTheme,
 *   // ... other options
 * };
 * ```
 *
 * For dark mode, set the data-ag-theme-mode attribute on a parent element:
 * ```html
 * <body data-ag-theme-mode="dark">
 *   <!-- Grid will render in dark mode -->
 * </body>
 * ```
 */
export const pdsTheme: Theme = themeQuartz
  // Light mode parameters (default)
  .withParams({
    // Component sizing
    checkboxBorderWidth: 2,
    checkboxBorderRadius: borderRadiusSm,
    spacing: 10,
    toggleButtonHeight: 28,
    toggleButtonWidth: 48,
    toggleButtonSwitchInset: 3,
    iconSize: 24,
    borderRadius: borderRadiusSm,
    wrapperBorderRadius: borderRadiusMd,

    // Grid structure
    headerHeight: 'calc(var(--ag-font-size) + var(--ag-spacing) * 2.9)',
    rowHeight: 'calc(var(--ag-font-size) + var(--ag-spacing) * 4)',

    // Typography
    fontFamily: fontFamilyPorscheNext,
    fontSize: fontSizeSm,
    headerFontWeight: fontWeightSemiBold,
    headerFontSize: fontSizeXs,

    // Focus and shadows
    focusShadow: 'none',
    inputFocusShadow: 'none',

    // Color scheme
    browserColorScheme: 'light',
    accentColor: colorInfoLight,
    backgroundColor: colorCanvasLight,
    foregroundColor: colorPrimaryLight,
    borderColor: colorContrastLowLight,
    invalidColor: colorErrorLowLight,

    // Grid colors
    headerBackgroundColor: colorContrastLowerLight,
    selectedRowBackgroundColor: colorInfoLowLight,
    oddRowBackgroundColor: colorSurfaceLight,
    modalOverlayBackgroundColor: colorFrostedLight,
    rowHoverColor: colorFrostedLight,
    columnHoverColor: colorFrostedLight,
    rangeSelectionBorderColor: colorFocusLight,
  })
  // Dark mode parameters
  .withParams(
    {
      browserColorScheme: 'dark',

      // Color scheme
      accentColor: colorInfoDark,
      backgroundColor: colorCanvasDark,
      foregroundColor: colorPrimaryDark,
      borderColor: colorContrastLowDark,
      invalidColor: colorErrorLowDark,

      // Grid colors
      headerBackgroundColor: colorContrastLowerDark,
      selectedRowBackgroundColor: colorInfoLowDark,
      oddRowBackgroundColor: colorSurfaceDark,
      modalOverlayBackgroundColor: colorFrostedDark,
      rowHoverColor: colorFrostedDark,
      columnHoverColor: colorFrostedDark,
      rangeSelectionBorderColor: colorFocusDark,
    },
    pdsThemeModeDark
  )
  // Apply custom parts
  .withPart(pdsSvgIcons)
  .withPart(toggleButtonStyle)
  .withPart(checkboxStyle)
  .withPart(inputStyles);
