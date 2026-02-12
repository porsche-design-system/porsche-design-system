import { type Theme, themeQuartz } from 'ag-grid-community';
import { checkboxStyle, inputStyles, pdsSvgIcons, toggleButtonStyle } from '../parts';
import {
  colorCanvas,
  colorContrastLow,
  colorContrastLower,
  colorErrorLow,
  colorFocus,
  colorFrosted,
  colorInfo,
  colorInfoLow,
  colorPrimary,
  colorSurface,
  fontPorscheNext,
  fontWeightSemibold,
  radiusMd,
  radiusSm,
  typescaleSm,
  typescaleXs,
} from '../styles';

/**
 * Porsche Design System theme for AG Grid v35
 *
 * This theme extends the Quartz theme with Porsche Design System styling.
 * It supports both light and dark modes via CSS `color-scheme`.
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
 * For dark mode, set `color-scheme` on a parent element:
 * ```html
 * <body style="color-scheme: dark;">
 *   <!-- Grid will render in dark mode -->
 * </body>
 * ```
 *
 * For light dark mode, set `color-scheme` on a parent element:
 * ```html
 * <body style="color-scheme: light dark;">
 *   <!-- Grid will render in light or dark mode depending on OS settings -->
 * </body>
 * ```
 */
export const pdsTheme: Theme = themeQuartz
  // Light mode parameters (default)
  .withParams({
    // Component sizing
    checkboxBorderWidth: 2,
    checkboxBorderRadius: radiusSm,
    spacing: 10,
    toggleButtonHeight: 28,
    toggleButtonWidth: 48,
    toggleButtonSwitchInset: 3,
    iconSize: 24,
    borderRadius: radiusSm,
    wrapperBorderRadius: radiusMd,

    // Grid structure
    headerHeight: 'calc(var(--ag-font-size) + var(--ag-spacing) * 2.9)',
    rowHeight: 'calc(var(--ag-font-size) + var(--ag-spacing) * 4)',

    // Typography
    fontFamily: fontPorscheNext,
    fontSize: typescaleSm,
    headerFontWeight: fontWeightSemibold,
    headerFontSize: typescaleXs,

    // Focus and shadows
    focusShadow: 'none',
    inputFocusShadow: 'none',

    // Color scheme
    browserColorScheme: 'inherit',

    // Core Colors
    accentColor: colorInfo,
    backgroundColor: colorCanvas,
    foregroundColor: colorPrimary,
    borderColor: colorContrastLow,
    invalidColor: colorErrorLow,

    // Grid colors
    headerBackgroundColor: colorContrastLower,
    selectedRowBackgroundColor: colorInfoLow,
    oddRowBackgroundColor: colorSurface,
    modalOverlayBackgroundColor: colorFrosted,
    rowHoverColor: colorFrosted,
    columnHoverColor: colorFrosted,
    rangeSelectionBorderColor: colorFocus,
  })
  // Apply custom parts
  .withPart(pdsSvgIcons)
  .withPart(toggleButtonStyle)
  .withPart(checkboxStyle)
  .withPart(inputStyles);
