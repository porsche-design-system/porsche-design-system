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
  spacingStaticLg,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXl,
  spacingStaticXs,
  typescale2Xl,
  typescale2Xs,
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
  --color-warning-frosted-soft: ${colorWarningFrostedSoftDark};
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
  --font-sans: var(--font-porsche-next);

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
  --shadow-low: var(--shadow-sm); /* alias (deprecated) */
  --shadow-md: ${shadowMd};
  --shadow-medium: var(--shadow-md); /* alias (deprecated) */
  --shadow-lg: ${shadowLg};
  --shadow-high: var(--shadow-lg); /* alias (deprecated) */

  /* Outline */
  --default-outline-width: 2px;

  /* Motion */
  --default-transition-timing-function: ${easeInOut};
  --ease-in-out: ${easeInOut};
  --ease-in: ${easeIn};
  --ease-out: ${easeOut};

  --default-transition-duration: ${durationSm};
  --transition-duration-sm: ${durationSm};
  --transition-duration-short: var(--transition-duration-sm); /* alias (deprecated) */
  --transition-duration-md: ${durationMd};
  --transition-duration-moderate: var(--transition-duration-md); /* alias (deprecated) */
  --transition-duration-lg: ${durationLg};
  --transition-duration-long: var(--transition-duration-lg); /* alias (deprecated) */
  --transition-duration-xl: ${durationXl};
  --transition-duration-very-long: var(--transition-duration-xl); /* alias (deprecated) */

  /* Animation */
  --animate-skeleton: skeleton var(--transition-duration-xl) var(--ease-in-out) infinite;

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

/* Gradient */
@utility bg-fade-to-t {
  @apply bg-linear-[to_top,${gradientStopsFadeDark.replaceAll(' ', '_')}];
}

@utility bg-fade-to-r {
  @apply bg-linear-[to_right,${gradientStopsFadeDark.replaceAll(' ', '_')}];
}

@utility bg-fade-to-b {
  @apply bg-linear-[to_bottom,${gradientStopsFadeDark.replaceAll(' ', '_')}];
}

@utility bg-fade-to-l {
  @apply bg-linear-[to_left,${gradientStopsFadeDark.replaceAll(' ', '_')}];
}

/* Grid */
@utility grid-template {
  @apply
    [--pds-internal-grid-safe-zone:max(22px,10.625vw-12px)]
    [--_pds-grid-col:minmax(0,var(--pds-internal-grid-outer-column,calc(var(--pds-internal-grid-safe-zone)-var(--spacing-fluid-md))))]
    grid
    grid-cols-[[full-start]_var(--_pds-grid-col)_[wide-start_extended-start_basic-start_narrow-start]_repeat(6,minmax(0,1fr))_[narrow-end_basic-end_extended-end_wide-end]_var(--_pds-grid-col)_[full-end]]
    gap-(--spacing-fluid-md)
    min-w-[var(--pds-internal-grid-width-min,320px)]
    max-w-[var(--pds-internal-grid-width-max,2560px)]
    box-content
    mx-(--pds-internal-grid-margin,0)
    px-[calc(50%-var(--pds-internal-grid-margin,0px)-2560px/2)]
    sm:[--pds-internal-grid-safe-zone:calc(5vw-16px)]
    sm:grid-cols-[[full-start]_var(--_pds-grid-col)_[wide-start]_minmax(0,1fr)_[extended-start]_minmax(0,1fr)_[basic-start]_repeat(2,minmax(0,1fr))_[narrow-start]_repeat(8,minmax(0,1fr))_[narrow-end]_repeat(2,minmax(0,1fr))_[basic-end]_minmax(0,1fr)_[extended-end]_minmax(0,1fr)_[wide-end]_var(--_pds-grid-col)[full-end]]
    2xl:[--pds-internal-grid-safe-zone:min(50vw-880px,400px)];
}

/* Grid: Area Narrow */
@utility col-narrow {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:4] col-[narrow];
}

@utility col-start-narrow {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:4] col-start-[narrow-start];
}

@utility col-end-narrow {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:4] col-end-[narrow-end];
}

/* Grid: Area Basic */
@utility col-basic {
  @apply [--_pds-grid-one-half:3] [--_pds-grid-one-third:2] [--_pds-grid-two-thirds:4] sm:[--_pds-grid-one-half:6] sm:[--_pds-grid-one-third:4] sm:[--_pds-grid-two-thirds:8] col-[basic];
}

@utility col-start-basic {
  @apply [--_pds-grid-one-half:3] [--_pds-grid-one-third:2] [--_pds-grid-two-thirds:4] sm:[--_pds-grid-one-half:6] sm:[--_pds-grid-one-third:4] sm:[--_pds-grid-two-thirds:8] col-start-[basic-start];
}

@utility col-end-basic {
  @apply [--_pds-grid-one-half:3] [--_pds-grid-one-third:2] [--_pds-grid-two-thirds:4] sm:[--_pds-grid-one-half:6] sm:[--_pds-grid-one-third:4] sm:[--_pds-grid-two-thirds:8] col-end-[basic-end];
}

/* Grid: Area Extended */
@utility col-extended {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:7] col-[extended];
}

@utility col-start-extended {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:7] col-start-[extended-start];
}

@utility col-end-extended {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:7] col-end-[extended-end];
}

/* Grid: Area Wide */
@utility col-wide {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:8] col-[wide];
}

@utility col-start-wide {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:8] col-start-[wide-start];
}

@utility col-end-wide {
  @apply [--_pds-grid-one-half:3] sm:[--_pds-grid-one-half:8] col-end-[wide-end];
}

/* Grid: Area Full */
@utility col-full {
  @apply col-[full];
}

@utility col-start-full {
  @apply col-start-[full-start];
}

@utility col-end-full {
  @apply col-end-[full-end];
}

/* Grid: Division */
@utility col-span-one-half {
  @apply col-span-(--_pds-grid-one-half,1);
}

@utility col-span-one-third {
  @apply col-span-(--_pds-grid-one-third,1);
}

@utility col-span-two-thirds {
  @apply col-span-(--_pds-grid-two-thirds,1);
}

/* Skeleton */
@utility skeleton {
  @apply animate-skeleton block rounded-sm bg-transparent bg-[linear-gradient(to_right,var(--color-frosted)_0%,var(--color-frosted-strong)_50%,var(--color-frosted)_100%)] bg-position-[0_0] bg-size-[200%_100%];
}

/* Typography: Text */
@utility prose-text-2xs {
  @apply font-porsche-next not-italic font-normal text-2xs text-primary;
}
@utility prose-text-xs {
  @apply font-porsche-next not-italic font-normal text-xs text-primary;
}
@utility prose-text-sm {
  @apply font-porsche-next not-italic font-normal text-sm text-primary;
}
@utility prose-text-md {
  @apply font-porsche-next not-italic font-normal text-md text-primary;
}
@utility prose-text-lg {
  @apply font-porsche-next not-italic font-normal text-lg text-primary;
}
@utility prose-text-xl {
  @apply font-porsche-next not-italic font-normal text-xl text-primary;
}

/* Typography: Heading */
@utility prose-heading-sm {
  @apply font-porsche-next not-italic font-normal text-sm text-primary;
}
@utility prose-heading-md {
  @apply font-porsche-next not-italic font-normal text-md text-primary;
}
@utility prose-heading-lg {
  @apply font-porsche-next not-italic font-normal text-lg text-primary;
}
@utility prose-heading-xl {
  @apply font-porsche-next not-italic font-normal text-xl text-primary;
}
@utility prose-heading-2xl {
  @apply font-porsche-next not-italic font-normal text-2xl text-primary;
}

/* Typography: Display */
@utility prose-display-sm {
  @apply font-porsche-next not-italic font-normal leading-normal text-primary text-[clamp(1.8rem,2.41vw+1.32rem,4.21rem)];
}
@utility prose-display-md {
  @apply font-porsche-next not-italic font-normal leading-normal text-primary text-[clamp(2.03rem,3.58vw+1.31rem,5.61rem)];
}
@utility prose-display-lg {
  @apply font-porsche-next not-italic font-normal leading-normal text-primary text-[clamp(2.28rem,5.2vw+1.24rem,7.48rem)];
}`;
};
