import {
  blurFrosted,
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
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
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
  fontPorscheNext,
  fontPorscheNextJa,
  fontPorscheNextKo,
  fontPorscheNextZhHans,
  fontPorscheNextZhHant,
  fontWeightBold,
  fontWeightNormal,
  fontWeightSemibold,
  gradientStopsFadeDark,
  leadingNormal,
  radius2Xl,
  radius3Xl,
  radius4Xl,
  radiusFull,
  radiusLg,
  radiusMd,
  radiusSm,
  radiusXl,
  radiusXs,
  shadowLg,
  shadowMd,
  shadowSm,
  spacingFluid2Xl,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingFluidXl,
  spacingFluidXs,
  spacingStatic2Xl,
  spacingStatic2Xs,
  spacingStaticLg,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXl,
  spacingStaticXs,
  typescale2Xl,
  typescale2Xs,
  typescale3Xl,
  typescale4Xl,
  typescale5Xl,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
  typescaleXs,
} from '@porsche-design-system/tokens';

export const getTailwindcssTheme = () => {
  return `@theme {
  /* Reset */
  --breakpoint-*: initial;
  --color-*: initial;
  --radius-*: initial;
  --shadow-*: initial;
  --text-*: initial;

  /* Color */
  --color-black: #000;
  --color-white: #fff;

  --color-focus: ${colorFocus};
  --color-canvas: ${colorCanvas};
  --color-surface: ${colorSurface};
  --color-frosted: ${colorFrosted};
  --color-frosted-soft: ${colorFrostedSoft};
  --color-frosted-strong: ${colorFrostedStrong};
  --color-backdrop: ${colorBackdrop};
  --color-contrast-lower: ${colorContrastLower};
  --color-contrast-low: ${colorContrastLow};
  --color-contrast-medium: ${colorContrastMedium};
  --color-contrast-high: ${colorContrastHigh};
  --color-contrast-higher: ${colorContrastHigher};
  --color-primary: ${colorPrimary};
  --color-success: ${colorSuccess};
  --color-success-low: ${colorSuccessLow};
  --color-success-medium: ${colorSuccessMedium};
  --color-success-frosted: ${colorSuccessFrosted};
  --color-success-frosted-soft: ${colorSuccessFrostedSoft};
  --color-warning: ${colorWarning};
  --color-warning-low: ${colorWarningLow};
  --color-warning-medium: ${colorWarningMedium};
  --color-warning-frosted: ${colorWarningFrosted};
  --color-warning-frosted-soft: ${colorWarningFrostedSoft};
  --color-error: ${colorError};
  --color-error-low: ${colorErrorLow};
  --color-error-medium: ${colorErrorMedium};
  --color-error-frosted: ${colorErrorFrosted};
  --color-error-frosted-soft: ${colorErrorFrostedSoft};
  --color-info: ${colorInfo};
  --color-info-low: ${colorInfoLow};
  --color-info-medium: ${colorInfoMedium};
  --color-info-frosted: ${colorInfoFrosted};
  --color-info-frosted-soft: ${colorInfoFrostedSoft};

  /* Typography */
  --font-porsche-next: ${fontPorscheNext};
  --font-sans: --theme(--font-porsche-next);

  --font-weight-normal: ${fontWeightNormal};
  --font-weight-semibold: ${fontWeightSemibold};
  --font-weight-bold: ${fontWeightBold};

  --leading-normal: ${leadingNormal};

  --text-2xs: ${typescale2Xs};
  --text-2xs--line-height: ${leadingNormal};
  --text-xs: ${typescaleXs};
  --text-xs--line-height: ${leadingNormal};
  --text-base: ${typescaleSm};
  --text-base--line-height: ${leadingNormal};
  --text-sm: ${typescaleSm};
  --text-sm--line-height: ${leadingNormal};
  --text-md: ${typescaleMd};
  --text-md--line-height: ${leadingNormal};
  --text-lg: ${typescaleLg};
  --text-lg--line-height: ${leadingNormal};
  --text-xl: ${typescaleXl};
  --text-xl--line-height: ${leadingNormal};
  --text-2xl: ${typescale2Xl};
  --text-2xl--line-height: ${leadingNormal};
  --text-3xl: ${typescale3Xl};
  --text-3xl--line-height: ${leadingNormal};
  --text-4xl: ${typescale4Xl};
  --text-4xl--line-height: ${leadingNormal};
  --text-5xl: ${typescale5Xl};
  --text-5xl--line-height: ${leadingNormal};

  /* Breakpoint */
  --breakpoint-xs: ${breakpointXs}px;
  --breakpoint-sm: ${breakpointSm}px;
  --breakpoint-md: ${breakpointMd}px;
  --breakpoint-lg: ${breakpointLg}px;
  --breakpoint-xl: ${breakpointXl}px;
  --breakpoint-2xl: ${breakpoint2Xl}px;

  /* Spacing */
  --spacing-fluid-xs: ${spacingFluidXs};
  --spacing-fluid-sm: ${spacingFluidSm};
  --spacing-fluid-md: ${spacingFluidMd};
  --spacing-fluid-lg: ${spacingFluidLg};
  --spacing-fluid-xl: ${spacingFluidXl};
  --spacing-fluid-2xl: ${spacingFluid2Xl};

  --spacing-static-2xs: ${spacingStatic2Xs};
  --spacing-static-xs: ${spacingStaticXs};
  --spacing-static-sm: ${spacingStaticSm};
  --spacing-static-md: ${spacingStaticMd};
  --spacing-static-lg: ${spacingStaticLg};
  --spacing-static-xl: ${spacingStaticXl};
  --spacing-static-2xl: ${spacingStatic2Xl};

  /* Border */
  --radius-xs: ${radiusXs};
  --radius-sm: ${radiusSm};
  --radius-md: ${radiusMd};
  --radius-lg: ${radiusLg};
  --radius-xl: ${radiusXl};
  --radius-2xl: ${radius2Xl};
  --radius-3xl: ${radius3Xl};
  --radius-4xl: ${radius4Xl};
  --radius-full: ${radiusFull};

  --default-border-width: 1px;
  --border-width-regular: 2px; /* alias (deprecated) */
  --border-width-thin: 1px; /* alias (deprecated) */

  /* Blur */
  --blur-frosted: ${blurFrosted.replace(/blur\((.*)\)/, '$1')};

  /* Shadow */
  --shadow-sm: ${shadowSm};
  --shadow-low: --theme(--shadow-sm); /* alias (deprecated) */
  --shadow-md: ${shadowMd};
  --shadow-medium: --theme(--shadow-md); /* alias (deprecated) */
  --shadow-lg: ${shadowLg};
  --shadow-high: --theme(--shadow-lg); /* alias (deprecated) */

  /* Outline */
  --default-outline-width: 2px;

  /* Motion */
  --default-transition-timing-function: ${easeInOut};
  --ease-in-out: ${easeInOut};
  --ease-in: ${easeIn};
  --ease-out: ${easeOut};

  --default-transition-duration: ${durationSm};
  --transition-duration-sm: ${durationSm};
  --transition-duration-short: --theme(--transition-duration-sm); /* alias (deprecated) */
  --transition-duration-md: ${durationMd};
  --transition-duration-moderate: --theme(--transition-duration-md); /* alias (deprecated) */
  --transition-duration-lg: ${durationLg};
  --transition-duration-long: --theme(--transition-duration-lg); /* alias (deprecated) */
  --transition-duration-xl: ${durationXl};
  --transition-duration-very-long: --theme(--transition-duration-xl); /* alias (deprecated) */

  /* Animation */
  --animate-skeleton: skeleton --theme(--transition-duration-xl) --theme(--ease-in-out) infinite;

  @keyframes skeleton {
    from {
      background-position-x: 100%;
    }
    to {
      background-position-x: -100%;
    }
  }
}

@layer theme {
  @supports not (color: light-dark(white, black)) {
    :root, .scheme-light, .scheme-only-light, .scheme-normal, .scheme-light-dark {
      --color-focus: ${colorFocusLight};
      --color-canvas: ${colorCanvasLight};
      --color-surface: ${colorSurfaceLight};
      --color-frosted: ${colorFrostedLight};
      --color-frosted-soft: ${colorFrostedSoftLight};
      --color-frosted-strong: ${colorFrostedStrongLight};
      --color-backdrop: ${colorBackdropLight};
      --color-contrast-lower: ${colorContrastLowerLight};
      --color-contrast-low: ${colorContrastLowLight};
      --color-contrast-medium: ${colorContrastMediumLight};
      --color-contrast-high: ${colorContrastHighLight};
      --color-contrast-higher: ${colorContrastHigherLight};
      --color-primary: ${colorPrimaryLight};
      --color-success: ${colorSuccessLight};
      --color-success-low: ${colorSuccessLowLight};
      --color-success-medium: ${colorSuccessMediumLight};
      --color-success-frosted: ${colorSuccessFrostedLight};
      --color-success-frosted-soft: ${colorSuccessFrostedSoftLight};
      --color-warning: ${colorWarningLight};
      --color-warning-low: ${colorWarningLowLight};
      --color-warning-medium: ${colorWarningMediumLight};
      --color-warning-frosted: ${colorWarningFrostedLight};
      --color-warning-frosted-soft: ${colorWarningFrostedSoftLight};
      --color-error: ${colorErrorLight};
      --color-error-low: ${colorErrorLowLight};
      --color-error-medium: ${colorErrorMediumLight};
      --color-error-frosted: ${colorErrorFrostedLight};
      --color-error-frosted-soft: ${colorErrorFrostedSoftLight};
      --color-info: ${colorInfoLight};
      --color-info-low: ${colorInfoLowLight};
      --color-info-medium: ${colorInfoMediumLight};
      --color-info-frosted: ${colorInfoFrostedLight};
      --color-info-frosted-soft: ${colorInfoFrostedSoftLight};
    }

    .scheme-dark, .scheme-only-dark {
      --color-focus: ${colorFocusDark};
      --color-canvas: ${colorCanvasDark};
      --color-surface: ${colorSurfaceDark};
      --color-frosted: ${colorFrostedDark};
      --color-frosted-soft: ${colorFrostedSoftDark};
      --color-frosted-strong: ${colorFrostedStrongDark};
      --color-backdrop: ${colorBackdropDark};
      --color-contrast-lower: ${colorContrastLowerDark};
      --color-contrast-low: ${colorContrastLowDark};
      --color-contrast-medium: ${colorContrastMediumDark};
      --color-contrast-high: ${colorContrastHighDark};
      --color-contrast-higher: ${colorContrastHigherDark};
      --color-primary: ${colorPrimaryDark};
      --color-success: ${colorSuccessDark};
      --color-success-low: ${colorSuccessLowDark};
      --color-success-medium: ${colorSuccessMediumDark};
      --color-success-frosted: ${colorSuccessFrostedDark};
      --color-success-frosted-soft: ${colorSuccessFrostedSoftDark};
      --color-warning: ${colorWarningDark};
      --color-warning-low: ${colorWarningLowDark};
      --color-warning-medium: ${colorWarningMediumDark};
      --color-warning-frosted: ${colorWarningFrostedDark};
      --color-warning-frosted-soft: ${colorWarningFrostedSoftDark};
      --color-error: ${colorErrorDark};
      --color-error-low: ${colorErrorLowDark};
      --color-error-medium: ${colorErrorMediumDark};
      --color-error-frosted: ${colorErrorFrostedDark};
      --color-error-frosted-soft: ${colorErrorFrostedSoftDark};
      --color-info: ${colorInfoDark};
      --color-info-low: ${colorInfoLowDark};
      --color-info-medium: ${colorInfoMediumDark};
      --color-info-frosted: ${colorInfoFrostedDark};
      --color-info-frosted-soft: ${colorInfoFrostedSoftDark};
    }

    @media (prefers-color-scheme: dark) {
      .scheme-light-dark {
        --color-focus: ${colorFocusDark};
        --color-canvas: ${colorCanvasDark};
        --color-surface: ${colorSurfaceDark};
        --color-frosted: ${colorFrostedDark};
        --color-frosted-soft: ${colorFrostedSoftDark};
        --color-frosted-strong: ${colorFrostedStrongDark};
        --color-backdrop: ${colorBackdropDark};
        --color-contrast-lower: ${colorContrastLowerDark};
        --color-contrast-low: ${colorContrastLowDark};
        --color-contrast-medium: ${colorContrastMediumDark};
        --color-contrast-high: ${colorContrastHighDark};
        --color-contrast-higher: ${colorContrastHigherDark};
        --color-primary: ${colorPrimaryDark};
        --color-success: ${colorSuccessDark};
        --color-success-low: ${colorSuccessLowDark};
        --color-success-medium: ${colorSuccessMediumDark};
        --color-success-frosted: ${colorSuccessFrostedDark};
        --color-success-frosted-soft: ${colorSuccessFrostedSoftDark};
        --color-warning: ${colorWarningDark};
        --color-warning-low: ${colorWarningLowDark};
        --color-warning-medium: ${colorWarningMediumDark};
        --color-warning-frosted: ${colorWarningFrostedDark};
        --color-warning-frosted-soft: ${colorWarningFrostedSoftDark};
        --color-error: ${colorErrorDark};
        --color-error-low: ${colorErrorLowDark};
        --color-error-medium: ${colorErrorMediumDark};
        --color-error-frosted: ${colorErrorFrostedDark};
        --color-error-frosted-soft: ${colorErrorFrostedSoftDark};
        --color-info: ${colorInfoDark};
        --color-info-low: ${colorInfoLowDark};
        --color-info-medium: ${colorInfoMediumDark};
        --color-info-frosted: ${colorInfoFrostedDark};
        --color-info-frosted-soft: ${colorInfoFrostedSoftDark};
      }
    }
  }
}

@layer theme {
  :root:lang(zh-Hans), :root:lang(zh-CN), :root:lang(zh-SG) {
    --font-porsche-next: ${fontPorscheNextZhHans};
  }

  :root:lang(zh-Hant), :root:lang(zh-TW), :root:lang(zh-HK), :root:lang(zh-MO) {
    --font-porsche-next: ${fontPorscheNextZhHant};
  }

  :root:lang(ja) {
    --font-porsche-next: ${fontPorscheNextJa};
  }

  :root:lang(ko) {
    --font-porsche-next: ${fontPorscheNextKo};
  }
}

/* Gradient */
@utility bg-fade-to-t {
  background-image: linear-gradient(to top, ${gradientStopsFadeDark});
}

@utility bg-fade-to-r {
  background-image: linear-gradient(to right, ${gradientStopsFadeDark});
}

@utility bg-fade-to-b {
  background-image: linear-gradient(to bottom, ${gradientStopsFadeDark});
}

@utility bg-fade-to-l {
  background-image: linear-gradient(to left, ${gradientStopsFadeDark});
}

/* Grid */
@utility grid-template {
  --pds-internal-grid-safe-zone: max(22px, 10.625vw - 12px);
  --_pds-grid-col: minmax(0, var(--pds-internal-grid-outer-column, calc(var(--pds-internal-grid-safe-zone) - --theme(--spacing-fluid-md))));
  display: grid;
  grid-template-columns: [full-start] var(--_pds-grid-col) [wide-start extended-start basic-start narrow-start] repeat(6, minmax(0, 1fr)) [narrow-end basic-end extended-end wide-end] var(--_pds-grid-col) [full-end];
  gap: --theme(--spacing-fluid-md);
  min-width: var(--pds-internal-grid-width-min, 320px);
  max-width: var(--pds-internal-grid-width-max, 2560px);
  box-sizing: content-box;
  margin-inline: var(--pds-internal-grid-margin, 0);
  padding-inline: calc(50% - var(--pds-internal-grid-margin, 0px) - 2560px / 2);

  @media (width >= ${breakpointSm}px) {
    --pds-internal-grid-safe-zone: calc(5vw - 16px);
    grid-template-columns: [full-start] var(--_pds-grid-col) [wide-start] minmax(0, 1fr) [extended-start] minmax(0, 1fr) [basic-start] repeat(2, minmax(0, 1fr)) [narrow-start] repeat(8, minmax(0, 1fr)) [narrow-end] repeat(2, minmax(0, 1fr)) [basic-end] minmax(0, 1fr) [extended-end] minmax(0, 1fr) [wide-end] var(--_pds-grid-col) [full-end];
  }

  @media (width >= ${breakpoint2Xl}px) {
    --pds-internal-grid-safe-zone: min(50vw - 880px, 400px);
  }
}

/* Grid: Area Narrow */
@utility col-narrow {
  --_pds-grid-one-half: 3;
  grid-column: narrow;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 4;
  }
}

@utility col-start-narrow {
  --_pds-grid-one-half: 3;
  grid-column-start: narrow-start;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 4;
  }
}

@utility col-end-narrow {
  --_pds-grid-one-half: 3;
  grid-column-end: narrow-end;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 4;
  }
}

/* Grid: Area Basic */
@utility col-basic {
  --_pds-grid-one-half: 3;
  --_pds-grid-one-third: 2;
  --_pds-grid-two-thirds: 4;
  grid-column: basic;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 6;
    --_pds-grid-one-third: 4;
    --_pds-grid-two-thirds: 8;
  }
}

@utility col-start-basic {
  --_pds-grid-one-half: 3;
  --_pds-grid-one-third: 2;
  --_pds-grid-two-thirds: 4;
  grid-column-start: basic-start;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 6;
    --_pds-grid-one-third: 4;
    --_pds-grid-two-thirds: 8;
  }
}

@utility col-end-basic {
  --_pds-grid-one-half: 3;
  --_pds-grid-one-third: 2;
  --_pds-grid-two-thirds: 4;
  grid-column-end: basic-end;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 6;
    --_pds-grid-one-third: 4;
    --_pds-grid-two-thirds: 8;
  }
}

/* Grid: Area Extended */
@utility col-extended {
  --_pds-grid-one-half: 3;
  grid-column: extended;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 7;
  }
}

@utility col-start-extended {
  --_pds-grid-one-half: 3;
  grid-column-start: extended-start;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 7;
  }
}

@utility col-end-extended {
  --_pds-grid-one-half: 3;
  grid-column-end: extended-end;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 7;
  }
}

/* Grid: Area Wide */
@utility col-wide {
  --_pds-grid-one-half: 3;
  grid-column: wide;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 8;
  }
}

@utility col-start-wide {
  --_pds-grid-one-half: 3;
  grid-column-start: wide-start;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 8;
  }
}

@utility col-end-wide {
  --_pds-grid-one-half: 3;
  grid-column-end: wide-end;

  @media (width >= ${breakpointSm}px) {
    --_pds-grid-one-half: 8;
  }
}

/* Grid: Area Full */
@utility col-full {
  grid-column: full;
}

@utility col-start-full {
  grid-column-start: full-start;
}

@utility col-end-full {
  grid-column-end: full-end;
}

/* Grid: Division */
@utility col-span-one-half {
  grid-column: span var(--_pds-grid-one-half, 1) / span var(--_pds-grid-one-half, 1);
}

@utility col-span-one-third {
  grid-column: span var(--_pds-grid-one-third, 1) / span var(--_pds-grid-one-third, 1);
}

@utility col-span-two-thirds {
  grid-column: span var(--_pds-grid-two-thirds, 1) / span var(--_pds-grid-two-thirds, 1);
}

/* Skeleton */
@utility skeleton {
  animation: --theme(--animate-skeleton);
  display: block;
  border-radius: --theme(--radius-sm);
  background-color: transparent;
  background-image: linear-gradient(to right, --theme(--color-frosted) 0%, --theme(--color-frosted-strong) 50%, --theme(--color-frosted) 100%);
  background-position: 0 0;
  background-size: 200% 100%;
}

/* Typography: Text */
@utility prose-text-2xs {
  font: --theme(--font-weight-normal) --theme(--text-2xs) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-text-xs {
  font: --theme(--font-weight-normal) --theme(--text-xs) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-text-sm {
  font: --theme(--font-weight-normal) --theme(--text-sm) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-text-md {
  font: --theme(--font-weight-normal) --theme(--text-md) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-text-lg {
  font: --theme(--font-weight-normal) --theme(--text-lg) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-text-xl {
  font: --theme(--font-weight-normal) --theme(--text-xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-text-2xl {
  font: --theme(--font-weight-normal) --theme(--text-2xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-text-3xl {
  font: --theme(--font-weight-normal) --theme(--text-3xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-text-4xl {
  font: --theme(--font-weight-normal) --theme(--text-4xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-text-5xl {
  font: --theme(--font-weight-normal) --theme(--text-5xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}

/* Typography: Heading */
@utility prose-heading-2xs {
  font: --theme(--font-weight-semibold) --theme(--text-2xs) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-heading-xs {
  font: --theme(--font-weight-semibold) --theme(--text-xs) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-heading-sm {
  font: --theme(--font-weight-semibold) --theme(--text-sm) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-heading-md {
  font: --theme(--font-weight-normal) --theme(--text-md) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-heading-lg {
  font: --theme(--font-weight-normal) --theme(--text-lg) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-heading-xl {
  font: --theme(--font-weight-normal) --theme(--text-xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-heading-2xl {
  font: --theme(--font-weight-normal) --theme(--text-2xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-heading-3xl {
  font: --theme(--font-weight-normal) --theme(--text-3xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-heading-4xl {
  font: --theme(--font-weight-normal) --theme(--text-4xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-heading-5xl {
  font: --theme(--font-weight-normal) --theme(--text-5xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}

/* Typography: Display */
@utility prose-display-sm {
  font: --theme(--font-weight-normal) --theme(--text-3xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-display-md {
  font: --theme(--font-weight-normal) --theme(--text-4xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}
@utility prose-display-lg {
  font: --theme(--font-weight-normal) --theme(--text-5xl) / --theme(--leading-normal) --theme(--font-porsche-next);
  color: --theme(--color-primary);
}`;
};
