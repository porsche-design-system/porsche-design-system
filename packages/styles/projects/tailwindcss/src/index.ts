import { cssVariableDefinitionDark, cssVariableDefinitionLight } from '@porsche-design-system/shared-styles';
import {
  blurFrosted,
  borderRadius2Xl,
  borderRadius3Xl,
  borderRadius4Xl,
  borderRadiusFull,
  borderRadiusLg,
  borderRadiusMd,
  borderRadiusSm,
  borderRadiusXl,
  borderRadiusXs,
  borderWidthRegular,
  borderWidthThin,
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
  fontFamilyPorscheNext,
  fontLineHeightNormal,
  fontSize2Xl,
  fontSize2Xs,
  fontSizeLg,
  fontSizeMd,
  fontSizeSm,
  fontSizeXl,
  fontSizeXs,
  fontWeightBold,
  fontWeightNormal,
  fontWeightSemiBold,
  gradientFadeDark,
  motionDurationLong,
  motionDurationModerate,
  motionDurationShort,
  motionDurationVeryLong,
  motionEaseIn,
  motionEaseInOut,
  motionEaseOut,
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
} from '@porsche-design-system/tokens';

export const getTailwindcssTheme = () => {
  return `@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Reset */
  --color-*: initial;
  --text-*: initial;
  --breakpoint-*: initial;
  --radius-*: initial;
  --shadow-*: initial;

  /* Color */
  --color-black: #000;
  --color-white: #fff;

  ${cssVariableDefinitionLight}

  /* Typography */
  --font-porsche-next: ${fontFamilyPorscheNext};
  --font-sans: var(--font-porsche-next);

  --font-weight-normal: ${fontWeightNormal};
  --font-weight-semibold: ${fontWeightSemiBold};
  --font-weight-bold: ${fontWeightBold};

  --leading-normal: ${fontLineHeightNormal};

  --text-2xs: ${fontSize2Xs};
  --text-2xs--line-height: ${fontLineHeightNormal};
  --text-xs: ${fontSizeXs};
  --text-xs--line-height: ${fontLineHeightNormal};
  --text-base: ${fontSizeSm};
  --text-base--line-height: ${fontLineHeightNormal};
  --text-sm: ${fontSizeSm};
  --text-sm--line-height: ${fontLineHeightNormal};
  --text-md: ${fontSizeMd};
  --text-md--line-height: ${fontLineHeightNormal};
  --text-lg: ${fontSizeLg};
  --text-lg--line-height: ${fontLineHeightNormal};
  --text-xl: ${fontSizeXl};
  --text-xl--line-height: ${fontLineHeightNormal};
  --text-2xl: ${fontSize2Xl};
  --text-2xl--line-height: ${fontLineHeightNormal};

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
  --radius-xs: ${borderRadiusXs};
  --radius-sm: ${borderRadiusSm};
  --radius-md: ${borderRadiusMd};
  --radius-lg: ${borderRadiusLg};
  --radius-xl: ${borderRadiusXl};
  --radius-2xl: ${borderRadius2Xl};
  --radius-3xl: ${borderRadius3Xl};
  --radius-4xl: ${borderRadius4Xl};
  --radius-full: ${borderRadiusFull};

  --default-border-width: ${borderWidthThin};
  --border-width-1: ${borderWidthThin};
  --border-width-regular: var(--border-width-1); /* alias (deprecated) */
  --border-width-thin: var(--border-width-1); /* alias (deprecated) */
  --border-width-2: ${borderWidthRegular};

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
  --default-outline-width: ${borderWidthRegular};

  /* Motion */
  --default-transition-timing-function: ${motionEaseInOut};
  --ease-in-out: ${motionEaseInOut};
  --ease-in: ${motionEaseIn};
  --ease-out: ${motionEaseOut};

  --default-transition-duration: ${motionDurationShort};
  --transition-duration-sm: ${motionDurationShort};
  --transition-duration-short: var(--transition-duration-sm); /* alias (deprecated) */
  --transition-duration-md: ${motionDurationModerate};
  --transition-duration-moderate: var(--transition-duration-md); /* alias (deprecated) */
  --transition-duration-lg: ${motionDurationLong};
  --transition-duration-long: var(--transition-duration-lg); /* alias (deprecated) */
  --transition-duration-xl: ${motionDurationVeryLong};
  --transition-duration-very-long: var(--transition-duration-xl); /* alias (deprecated) */

  /* Animation */
  --animate-skeleton: skeleton var(--transition-duration-long) var(--ease-in-out) infinite;

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
  .light {
    ${cssVariableDefinitionLight}
  }

  .dark {
    ${cssVariableDefinitionDark}
  }

  .auto {
    @media (prefers-color-scheme: dark) {
      ${cssVariableDefinitionDark}
    }
  }
}

/* Gradient */
@utility bg-fade-to-t {
  @apply bg-linear-[to_top,${gradientFadeDark.replaceAll(' ', '_')}];
}

@utility bg-fade-to-r {
  @apply bg-linear-[to_right,${gradientFadeDark.replaceAll(' ', '_')}];
}

@utility bg-fade-to-b {
  @apply bg-linear-[to_bottom,${gradientFadeDark.replaceAll(' ', '_')}];
}

@utility bg-fade-to-l {
  @apply bg-linear-[to_left,${gradientFadeDark.replaceAll(' ', '_')}];
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
  @apply animate-skeleton;
  @apply block rounded-sm;
  @apply bg-surface bg-[linear-gradient(to_right,transparent_0%,var(--color-skeleton)_20%,transparent_50%)] bg-position-[0_0] bg-size-[200%_100%];
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
