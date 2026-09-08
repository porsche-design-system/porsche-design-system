import {
  colorBackdrop,
  colorBackdropDark,
  colorBackdropLight,
  colorCanvas,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastHigh,
  colorContrastHighDark,
  colorContrastHigher,
  colorContrastHigherDark,
  colorContrastHigherLight,
  colorContrastHighLight,
  colorContrastLow,
  colorContrastLowDark,
  colorContrastLower,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorContrastMedium,
  colorContrastMediumDark,
  colorContrastMediumLight,
  colorError,
  colorErrorDark,
  colorErrorFrosted,
  colorErrorFrostedDark,
  colorErrorFrostedLight,
  colorErrorFrostedSoft,
  colorErrorFrostedSoftDark,
  colorErrorFrostedSoftLight,
  colorErrorLight,
  colorErrorLow,
  colorErrorLowDark,
  colorErrorLowLight,
  colorErrorMedium,
  colorErrorMediumDark,
  colorErrorMediumLight,
  colorFocus,
  colorFocusDark,
  colorFocusLight,
  colorFrosted,
  colorFrostedDark,
  colorFrostedLight,
  colorFrostedSoft,
  colorFrostedSoftDark,
  colorFrostedSoftLight,
  colorFrostedStrong,
  colorFrostedStrongDark,
  colorFrostedStrongLight,
  colorInfo,
  colorInfoDark,
  colorInfoFrosted,
  colorInfoFrostedDark,
  colorInfoFrostedLight,
  colorInfoFrostedSoft,
  colorInfoFrostedSoftDark,
  colorInfoFrostedSoftLight,
  colorInfoLight,
  colorInfoLow,
  colorInfoLowDark,
  colorInfoLowLight,
  colorInfoMedium,
  colorInfoMediumDark,
  colorInfoMediumLight,
  colorPrimary,
  colorPrimaryDark,
  colorPrimaryLight,
  colorSuccess,
  colorSuccessDark,
  colorSuccessFrosted,
  colorSuccessFrostedDark,
  colorSuccessFrostedLight,
  colorSuccessFrostedSoft,
  colorSuccessFrostedSoftDark,
  colorSuccessFrostedSoftLight,
  colorSuccessLight,
  colorSuccessLow,
  colorSuccessLowDark,
  colorSuccessLowLight,
  colorSuccessMedium,
  colorSuccessMediumDark,
  colorSuccessMediumLight,
  colorSurface,
  colorSurfaceDark,
  colorSurfaceLight,
  colorWarning,
  colorWarningDark,
  colorWarningFrosted,
  colorWarningFrostedDark,
  colorWarningFrostedLight,
  colorWarningFrostedSoft,
  colorWarningFrostedSoftDark,
  colorWarningFrostedSoftLight,
  colorWarningLight,
  colorWarningLow,
  colorWarningLowDark,
  colorWarningLowLight,
  colorWarningMedium,
  colorWarningMediumDark,
  colorWarningMediumLight,
} from '@porsche-design-system/tokens';
import type { CssNode } from '../types';

/**
 * Full description of a single color — the single source of truth for the `@theme`
 * color variable, the storefront docs (via {@link color} / `tailwindMeta.color`) and
 * the per-scheme fallback assignments ({@link colorLightVars} / {@link colorDarkVars}).
 * The `group` is intentionally omitted: it is encoded by the nesting key inside
 * {@link color}, mirroring the structure of the storefront `cssVariablesMeta`.
 */
type ColorConfig = {
  /** The public `@theme` custom property, e.g. `--color-focus`. */
  property: string;
  /**
   * The private dynamic custom property the `scheme-*` utilities assign to and
   * the `@theme` variable reads from, e.g. `--_color-focus-dynamic`.
   */
  dynamicProperty: string;
  /**
   * The documented value, rendered verbatim in both the `@theme` block and the docs:
   * the dynamic property the `scheme-*` utilities assign to, falling back to the token,
   * e.g. `var(--_color-canvas-dynamic, light-dark(#fff, …))`.
   */
  value: string;
  /** Token assigned to `dynamicProperty` in the light scheme. */
  light: string;
  /** Token assigned to `dynamicProperty` in the dark scheme. */
  dark: string;
  /** The Tailwind utility classes generated from this variable, e.g. `.bg-canvas`. */
  classes: string[];
  /** Human readable description rendered in the docs and LLM context. */
  description: string;
};

/** The color groups that exist in {@link color} (mirrors the storefront API tables). */
type ColorGroup = 'background' | 'foreground' | 'semantic' | 'a11y';

/**
 * Nested single source of truth for every color, grouped exactly like the
 * storefront API tables / `cssVariablesMeta` (a11y / background / foreground /
 * semantic). Access a single color via its path, e.g. `color.background.frosted`,
 * to read e.g. `color.background.frosted.property`. The generated `@theme` block
 * (flattened in `index.ts`) and the per-scheme fallbacks ({@link colorLightVars} /
 * {@link colorDarkVars}) are produced from these groups, so there is exactly one
 * place to add, remove or reorder a color. The group/key order is preserved in the
 * generated `@theme` block; the docs render each group as its own section.
 */
export const color = {
  a11y: {
    focus: {
      property: '--color-focus',
      dynamicProperty: '--_color-focus-dynamic',
      value: `var(--_color-focus-dynamic, ${colorFocus})`,
      light: colorFocusLight,
      dark: colorFocusDark,
      classes: ['.outline-focus'],
      description: 'Applies the focus color, typically used as the outline for `:focus-visible` states.',
    },
  },
  background: {
    canvas: {
      property: '--color-canvas',
      dynamicProperty: '--_color-canvas-dynamic',
      value: `var(--_color-canvas-dynamic, ${colorCanvas})`,
      light: colorCanvasLight,
      dark: colorCanvasDark,
      classes: ['.bg-canvas'],
      description: 'Applies the canvas color, typically used for surfaces.',
    },
    surface: {
      property: '--color-surface',
      dynamicProperty: '--_color-surface-dynamic',
      value: `var(--_color-surface-dynamic, ${colorSurface})`,
      light: colorSurfaceLight,
      dark: colorSurfaceDark,
      classes: ['.bg-surface'],
      description: 'Applies the surface color, typically used for surfaces.',
    },
    frosted: {
      property: '--color-frosted',
      dynamicProperty: '--_color-frosted-dynamic',
      value: `var(--_color-frosted-dynamic, ${colorFrosted})`,
      light: colorFrostedLight,
      dark: colorFrostedDark,
      classes: ['.bg-frosted'],
      description:
        'Applies the frosted color, typically used as a background in combination with a blur effect `.backdrop-blur-frosted`.',
    },
    frostedSoft: {
      property: '--color-frosted-soft',
      dynamicProperty: '--_color-frosted-soft-dynamic',
      value: `var(--_color-frosted-soft-dynamic, ${colorFrostedSoft})`,
      light: colorFrostedSoftLight,
      dark: colorFrostedSoftDark,
      classes: ['.bg-frosted-soft'],
      description: 'Applies the frosted color, typically used as a background `:hover`.',
    },
    frostedStrong: {
      property: '--color-frosted-strong',
      dynamicProperty: '--_color-frosted-strong-dynamic',
      value: `var(--_color-frosted-strong-dynamic, ${colorFrostedStrong})`,
      light: colorFrostedStrongLight,
      dark: colorFrostedStrongDark,
      classes: ['.bg-frosted-strong'],
      description:
        'Applies the frosted color, typically used as a background in combination with a blur effect `.backdrop-blur-frosted`.',
    },
    backdrop: {
      property: '--color-backdrop',
      dynamicProperty: '--_color-backdrop-dynamic',
      value: `var(--_color-backdrop-dynamic, ${colorBackdrop})`,
      light: colorBackdropLight,
      dark: colorBackdropDark,
      classes: ['.bg-backdrop'],
      description: 'Applies the backdrop color, typically used for backdrops.',
    },
  },
  foreground: {
    contrastLower: {
      property: '--color-contrast-lower',
      dynamicProperty: '--_color-contrast-lower-dynamic',
      value: `var(--_color-contrast-lower-dynamic, ${colorContrastLower})`,
      light: colorContrastLowerLight,
      dark: colorContrastLowerDark,
      classes: ['.border-contrast-lower'],
      description:
        'Applies the contrast-lower color, intended only for decorative elements, as it is not accessibility-compliant.',
    },
    contrastLow: {
      property: '--color-contrast-low',
      dynamicProperty: '--_color-contrast-low-dynamic',
      value: `var(--_color-contrast-low-dynamic, ${colorContrastLow})`,
      light: colorContrastLowLight,
      dark: colorContrastLowDark,
      classes: ['.border-contrast-low'],
      description:
        'Applies the contrast-low color, intended only for decorative elements, as it is not accessibility-compliant.',
    },
    contrastMedium: {
      property: '--color-contrast-medium',
      dynamicProperty: '--_color-contrast-medium-dynamic',
      value: `var(--_color-contrast-medium-dynamic, ${colorContrastMedium})`,
      light: colorContrastMediumLight,
      dark: colorContrastMediumDark,
      classes: ['.text-contrast-medium'],
      description: 'Applies the contrast-medium color, typically used for text.',
    },
    contrastHigh: {
      property: '--color-contrast-high',
      dynamicProperty: '--_color-contrast-high-dynamic',
      value: `var(--_color-contrast-high-dynamic, ${colorContrastHigh})`,
      light: colorContrastHighLight,
      dark: colorContrastHighDark,
      classes: ['.text-contrast-high'],
      description: 'Applies the contrast-high color, typically used for text.',
    },
    contrastHigher: {
      property: '--color-contrast-higher',
      dynamicProperty: '--_color-contrast-higher-dynamic',
      value: `var(--_color-contrast-higher-dynamic, ${colorContrastHigher})`,
      light: colorContrastHigherLight,
      dark: colorContrastHigherDark,
      classes: ['.text-contrast-higher'],
      description: 'Applies the contrast-higher color, typically used for text.',
    },
    primary: {
      property: '--color-primary',
      dynamicProperty: '--_color-primary-dynamic',
      value: `var(--_color-primary-dynamic, ${colorPrimary})`,
      light: colorPrimaryLight,
      dark: colorPrimaryDark,
      classes: ['.text-primary'],
      description: 'Applies the primary color, typically used for text.',
    },
  },
  semantic: {
    success: {
      property: '--color-success',
      dynamicProperty: '--_color-success-dynamic',
      value: `var(--_color-success-dynamic, ${colorSuccess})`,
      light: colorSuccessLight,
      dark: colorSuccessDark,
      classes: ['.text-success'],
      description: 'Applies the success color, typically used for text.',
    },
    successLow: {
      property: '--color-success-low',
      dynamicProperty: '--_color-success-low-dynamic',
      value: `var(--_color-success-low-dynamic, ${colorSuccessLow})`,
      light: colorSuccessLowLight,
      dark: colorSuccessLowDark,
      classes: ['.text-success', '.border-success'],
      description: 'Applies the success color, typically used for text or border.',
    },
    successMedium: {
      property: '--color-success-medium',
      dynamicProperty: '--_color-success-medium-dynamic',
      value: `var(--_color-success-medium-dynamic, ${colorSuccessMedium})`,
      light: colorSuccessMediumLight,
      dark: colorSuccessMediumDark,
      classes: ['.text-success', '.border-success'],
      description: 'Applies the success color, typically used for text or border.',
    },
    successFrosted: {
      property: '--color-success-frosted',
      dynamicProperty: '--_color-success-frosted-dynamic',
      value: `var(--_color-success-frosted-dynamic, ${colorSuccessFrosted})`,
      light: colorSuccessFrostedLight,
      dark: colorSuccessFrostedDark,
      classes: ['.bg-success-frosted'],
      description:
        'Applies the success-frosted color, typically used as background in combination with a blur effect `.backdrop-blur-frosted`.',
    },
    successFrostedSoft: {
      property: '--color-success-frosted-soft',
      dynamicProperty: '--_color-success-frosted-soft-dynamic',
      value: `var(--_color-success-frosted-soft-dynamic, ${colorSuccessFrostedSoft})`,
      light: colorSuccessFrostedSoftLight,
      dark: colorSuccessFrostedSoftDark,
      classes: ['.bg-success-frosted-soft'],
      description: 'Applies the success-frosted-soft color, typically used as background `:hover`.',
    },
    warning: {
      property: '--color-warning',
      dynamicProperty: '--_color-warning-dynamic',
      value: `var(--_color-warning-dynamic, ${colorWarning})`,
      light: colorWarningLight,
      dark: colorWarningDark,
      classes: ['.text-warning'],
      description: 'Applies the warning color, typically used for text.',
    },
    warningLow: {
      property: '--color-warning-low',
      dynamicProperty: '--_color-warning-low-dynamic',
      value: `var(--_color-warning-low-dynamic, ${colorWarningLow})`,
      light: colorWarningLowLight,
      dark: colorWarningLowDark,
      classes: ['.text-warning', '.border-warning'],
      description: 'Applies the warning color, typically used for text or border.',
    },
    warningMedium: {
      property: '--color-warning-medium',
      dynamicProperty: '--_color-warning-medium-dynamic',
      value: `var(--_color-warning-medium-dynamic, ${colorWarningMedium})`,
      light: colorWarningMediumLight,
      dark: colorWarningMediumDark,
      classes: ['.text-warning', '.border-warning'],
      description: 'Applies the warning color, typically used for text or border.',
    },
    warningFrosted: {
      property: '--color-warning-frosted',
      dynamicProperty: '--_color-warning-frosted-dynamic',
      value: `var(--_color-warning-frosted-dynamic, ${colorWarningFrosted})`,
      light: colorWarningFrostedLight,
      dark: colorWarningFrostedDark,
      classes: ['.bg-warning-frosted'],
      description:
        'Applies the warning-frosted color, typically used as background in combination with a blur effect `.backdrop-blur-frosted`.',
    },
    warningFrostedSoft: {
      property: '--color-warning-frosted-soft',
      dynamicProperty: '--_color-warning-frosted-soft-dynamic',
      value: `var(--_color-warning-frosted-soft-dynamic, ${colorWarningFrostedSoft})`,
      light: colorWarningFrostedSoftLight,
      dark: colorWarningFrostedSoftDark,
      classes: ['.bg-warning-frosted-soft'],
      description: 'Applies the warning-frosted-soft color, typically used as background `:hover`.',
    },
    error: {
      property: '--color-error',
      dynamicProperty: '--_color-error-dynamic',
      value: `var(--_color-error-dynamic, ${colorError})`,
      light: colorErrorLight,
      dark: colorErrorDark,
      classes: ['.text-error'],
      description: 'Applies the error color, typically used for text.',
    },
    errorLow: {
      property: '--color-error-low',
      dynamicProperty: '--_color-error-low-dynamic',
      value: `var(--_color-error-low-dynamic, ${colorErrorLow})`,
      light: colorErrorLowLight,
      dark: colorErrorLowDark,
      classes: ['.text-error', '.border-error'],
      description: 'Applies the error color, typically used for text or border.',
    },
    errorMedium: {
      property: '--color-error-medium',
      dynamicProperty: '--_color-error-medium-dynamic',
      value: `var(--_color-error-medium-dynamic, ${colorErrorMedium})`,
      light: colorErrorMediumLight,
      dark: colorErrorMediumDark,
      classes: ['.text-error', '.border-error'],
      description: 'Applies the error color, typically used for text or border.',
    },
    errorFrosted: {
      property: '--color-error-frosted',
      dynamicProperty: '--_color-error-frosted-dynamic',
      value: `var(--_color-error-frosted-dynamic, ${colorErrorFrosted})`,
      light: colorErrorFrostedLight,
      dark: colorErrorFrostedDark,
      classes: ['.bg-error-frosted'],
      description:
        'Applies the error-frosted color, typically used as background in combination with a blur effect `.backdrop-blur-frosted`.',
    },
    errorFrostedSoft: {
      property: '--color-error-frosted-soft',
      dynamicProperty: '--_color-error-frosted-soft-dynamic',
      value: `var(--_color-error-frosted-soft-dynamic, ${colorErrorFrostedSoft})`,
      light: colorErrorFrostedSoftLight,
      dark: colorErrorFrostedSoftDark,
      classes: ['.bg-error-frosted-soft'],
      description: 'Applies the error-frosted-soft color, typically used as background `:hover`.',
    },
    info: {
      property: '--color-info',
      dynamicProperty: '--_color-info-dynamic',
      value: `var(--_color-info-dynamic, ${colorInfo})`,
      light: colorInfoLight,
      dark: colorInfoDark,
      classes: ['.text-info'],
      description: 'Applies the info color, typically used for text.',
    },
    infoLow: {
      property: '--color-info-low',
      dynamicProperty: '--_color-info-low-dynamic',
      value: `var(--_color-info-low-dynamic, ${colorInfoLow})`,
      light: colorInfoLowLight,
      dark: colorInfoLowDark,
      classes: ['.text-info', '.border-info'],
      description: 'Applies the info color, typically used for text or border.',
    },
    infoMedium: {
      property: '--color-info-medium',
      dynamicProperty: '--_color-info-medium-dynamic',
      value: `var(--_color-info-medium-dynamic, ${colorInfoMedium})`,
      light: colorInfoMediumLight,
      dark: colorInfoMediumDark,
      classes: ['.text-info', '.border-info'],
      description: 'Applies the info color, typically used for text or border.',
    },
    infoFrosted: {
      property: '--color-info-frosted',
      dynamicProperty: '--_color-info-frosted-dynamic',
      value: `var(--_color-info-frosted-dynamic, ${colorInfoFrosted})`,
      light: colorInfoFrostedLight,
      dark: colorInfoFrostedDark,
      classes: ['.bg-info-frosted'],
      description:
        'Applies the info-frosted color, typically used as background in combination with a blur effect `.backdrop-blur-frosted`.',
    },
    infoFrostedSoft: {
      property: '--color-info-frosted-soft',
      dynamicProperty: '--_color-info-frosted-soft-dynamic',
      value: `var(--_color-info-frosted-soft-dynamic, ${colorInfoFrostedSoft})`,
      light: colorInfoFrostedSoftLight,
      dark: colorInfoFrostedSoftDark,
      classes: ['.bg-info-frosted-soft'],
      description: 'Applies the info-frosted-soft color, typically used as background `:hover`.',
    },
  },
} satisfies Record<ColorGroup, Record<string, ColorConfig>>;

// Flat list of every color config in document order — the shared basis for the
// per-scheme fallback assignments below.
const colorConfigs: ColorConfig[] = Object.values(color).flatMap((group) => Object.values(group));

// Fallback variable assignments for browsers without `light-dark()` support.
// Used both for the `:root` default and inside `@utility scheme-*` blocks so
// that Tailwind applies its configured prefix (e.g. `tw:scheme-dark`). They
// assign the same dynamic properties read by the `@theme` color variables.
export const colorLightVars: CssNode[] = colorConfigs.map(({ dynamicProperty, light }) => ({
  property: dynamicProperty,
  value: light,
}));

export const colorDarkVars: CssNode[] = colorConfigs.map(({ dynamicProperty, dark }) => ({
  property: dynamicProperty,
  value: dark,
}));
