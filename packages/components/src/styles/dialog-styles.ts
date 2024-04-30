import { type JssStyle } from 'jss';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  frostedGlassStyle,
  gridGap,
  headingLargeStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
} from '@porsche-design-system/utilities-v2';
import {
  getThemedColors,
  prefersColorSchemeDarkMediaQuery,
  cssVariableTransitionDuration,
  motionDurationMap,
  getTransition,
} from './';
import {
  buildResponsiveStyles,
  isThemeDark,
  mergeDeep,
  scrollShadowColor,
  scrollShadowColorDark,
  type Theme,
} from '../utils';
import { type BreakpointCustomizable } from '../utils/breakpoint-customizable';

export const BACKDROPS = ['blur', 'shading'] as const;
export type Backdrop = (typeof BACKDROPS)[number];

export const headingTags = 'h1,h2,h3,h4,h5,h6';

export const getModalDialogHostJssStyle = (): JssStyle => {
  return {
    '--pds-internal-grid-outer-column': `calc(${spacingFluidLarge} - ${gridGap})`,
    '--pds-internal-grid-margin': `calc(${spacingFluidLarge} * -1)`,
  };
};

export const getModalDialogBackdropResetJssStyle = (): JssStyle => {
  return {
    position: 'fixed', // ua-style
    inset: 0, // ua-style
    margin: 0, // ua-style
    padding: 0, // ua-style
    border: 0, // ua-style
    width: '100dvw', // ua-style
    height: '100dvh', // ua-style
    maxWidth: '100dvw', // ua-style
    maxHeight: '100dvh', // ua-style
    overflow: 'hidden', // ua-style
    display: 'block', // ua-style
    outline: 0, // ua-style (we always expect a focusable element to be within the dialog)
    '&::backdrop': {
      display: 'none', // ua-style (we can't use it atm because it's not animatable in all browsers)
    },
  };
};

export const getModalDialogBackdropTransitionJssStyle = (
  isVisible: boolean,
  theme: Theme,
  backdrop: Backdrop = 'blur'
): JssStyle => {
  const isBackdropBlur = backdrop === 'blur';
  const { backgroundShadingColor } = getThemedColors(theme);
  const { backgroundShadingColor: backgroundShadingColorDark } = getThemedColors('dark');

  const duration = isVisible ? 'long' : 'moderate';
  const easing = isVisible ? 'in' : 'out';
  const transition = `visibility 0s linear var(${cssVariableTransitionDuration}, ${isVisible ? '0s' : motionDurationMap[duration]}), ${getTransition('background-color', duration, easing)}, ${getTransition(
    '-webkit-backdrop-filter',
    duration,
    easing
  )}, ${getTransition('backdrop-filter', duration, easing)}`;

  return {
    zIndex: 9999999, // fallback for fade out stacking until `overlay` + `allow-discrete` is supported in all browsers. It tries to mimic #top-layer positioning hierarchy.
    ...(isVisible
      ? {
          visibility: 'inherit',
          pointerEvents: 'auto',
          background: backgroundShadingColor,
          ...(isBackdropBlur && frostedGlassStyle),
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: backgroundShadingColorDark,
          }),
        }
      : {
          visibility: 'hidden', // element shall not be tabbable with keyboard after fade out transition has finished
          pointerEvents: 'none', // element can't be interacted with mouse
          background: 'transparent',
          ...(isBackdropBlur && {
            WebkitBackdropFilter: 'blur(0px)',
            backdropFilter: 'blur(0px)',
          }),
        }),
    transition,
    // `allow-discrete` transition for ua-style `overlay` (supported browsers only) ensures dialog is rendered on
    // #top-layer as long as fade-in or fade-out transition/animation is running
    '@supports (transition-behavior: allow-discrete)': {
      transition: `${transition}, ${getTransition('overlay', duration, easing)} allow-discrete`,
    },
  };
};

export const getModalDialogScrollerJssStyle = (theme: Theme): JssStyle => {
  // ensures scrollbar color is set correctly (e.g. when scrollbar is shown on backdrop, on flyout/modal or with Auto Dark Mode)
  const backgroundLight = 'rgba(255,255,255,.01)';
  const backgroundDark = 'rgba(0,0,0,.01)';
  const background: { [K in Theme]: string } = {
    light: backgroundLight,
    dark: backgroundDark,
    auto: backgroundLight,
  };

  return {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden auto',
    overscrollBehaviorY: 'none',
    background: background[theme],
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: background.dark,
    }),
  };
};

export const getModalDialogGridJssStyle = (): JssStyle => {
  const safeZoneInlineStart = `${spacingFluidSmall} calc(${spacingFluidMedium} - ${spacingFluidSmall})`;
  const safeZoneInlineEnd = `calc(${spacingFluidMedium} - ${spacingFluidSmall}) ${spacingFluidSmall}`;
  const safeZoneBlockStart = `${spacingFluidSmall} calc(${spacingFluidLarge} - ${spacingFluidSmall})`;
  const safeZoneBlockEnd = `calc(${spacingFluidLarge} - ${spacingFluidSmall}) ${spacingFluidSmall}`;

  return {
    display: 'grid',
    gridTemplate: `${safeZoneInlineStart} auto minmax(0, 1fr) auto auto ${safeZoneInlineEnd}/${safeZoneBlockStart} auto ${safeZoneBlockEnd}`,
  };
};

export const getDialogColorJssStyle = (theme: Theme): JssStyle => {
  const { primaryColor, backgroundColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark } = getThemedColors('dark');

  return {
    color: primaryColor, // enables color inheritance for slots
    background: backgroundColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      color: primaryColorDark,
      background: backgroundColorDark,
    }),
  };
};

export const getModalDialogTransitionJssStyle = (isVisible: boolean, slideIn: '^' | '<' | '>' = '^'): JssStyle => {
  const duration = isVisible ? 'moderate' : 'short';
  const easing = isVisible ? 'in' : 'out';

  return {
    opacity: 0,
    // transition offset relies vertically on viewport (vh) because the dialog height can be infinite, while horizontally
    // it relies on the dialog width (%) which has a max-width
    ...(isVisible
      ? {
          opacity: 1,
          transform: 'initial',
        }
      : {
          transform: slideIn === '^' ? 'translateY(25vh)' : `translateX(${slideIn === '>' ? '-' : ''}100%)`,
          '&:dir(rtl)': {
            transform: slideIn === '^' ? 'translateY(25vh)' : `translateX(${slideIn === '>' ? '' : '-'}100%)`,
          },
        }),
    transition: `${getTransition('opacity', duration, easing)}, ${getTransition('transform', duration, easing)}`,
  };
};

export const getModalDialogDismissButtonJssStyle = (
  theme: Theme,
  isOpen: boolean,
  applyAutoFocusHack: boolean = false
): JssStyle => {
  const { backgroundSurfaceColor } = getThemedColors(theme);
  const { backgroundSurfaceColor: backgroundSurfaceColorDark } = getThemedColors('dark');

  return {
    width: 'fit-content',
    height: 'fit-content',
    border: `2px solid ${backgroundSurfaceColor}`, // needed to enlarge button slightly without affecting the hover area (are equal now).
    borderRadius: borderRadiusSmall,
    background: backgroundSurfaceColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: backgroundSurfaceColorDark,
      borderColor: backgroundSurfaceColorDark,
    }),
    ...(applyAutoFocusHack && {
      marginInlineEnd: isOpen ? 0 : '200vw',
      transition: `margin-inline 0s linear var(${cssVariableTransitionDuration}, ${isOpen ? '1ms' : '0s'})`,
    }),
  };
};

export const getModalDialogHeadingJssStyle = (): JssStyle => {
  return {
    ...headingLargeStyle,
    margin: 0,
  };
};

export const getModalDialogStickyAreaJssStyle = (area: 'header' | 'footer', theme: Theme): JssStyle => {
  const { backgroundColor } = getThemedColors(theme);
  const { backgroundColor: backgroundColorDark } = getThemedColors('dark');
  const isAreaHeader = area === 'header';
  const boxShadowDimension = `0 ${isAreaHeader ? 5 : -5}px 10px`;

  return {
    position: 'sticky',
    ...(isAreaHeader
      ? {
          top: '-1px', // necessary for `IntersectionObserver` to detect if sticky element is stuck or not
        }
      : {
          bottom: '-1px', // necessary for `IntersectionObserver` to detect if sticky element is stuck or not
        }),
    marginBlock: `-${spacingStaticMedium}`, // compensate padding-block
    padding: `${spacingStaticMedium} ${spacingFluidLarge}`, // with CSS subgrid the spacingFluidLarge definition wouldn't be necessary
    background: backgroundColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: backgroundColorDark,
    }),
    clipPath: `inset(${isAreaHeader ? '0 0 -20px 0' : '-20px 0 0 0'})`, // crop leaking box-shadow on left and right side
    transition: `${getTransition('box-shadow')}`,
    '&[data-stuck]': {
      boxShadow: `${isThemeDark(theme) ? scrollShadowColorDark : scrollShadowColor} ${boxShadowDimension}`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        boxShadow: `${scrollShadowColorDark} ${boxShadowDimension}`,
      }),
    },
  };
};

export const getModalDialogStretchToFullModalWidthJssStyle = (
  hasHeader: boolean,
  hasFooter: boolean,
  fullscreen: BreakpointCustomizable<boolean>
): JssStyle => {
  const safeZone = `calc(${spacingFluidLarge} * -1)`;
  const cssClassNameStretchToFullModalWidth = 'stretch-to-full-modal-width';

  return mergeDeep(
    {
      [`&(.${cssClassNameStretchToFullModalWidth})`]: {
        display: 'block',
        margin: `0 ${safeZone}`,
        width: `calc(100% + calc(${spacingFluidLarge} * 2))`,
      },
      ...(!hasHeader && {
        [`&(.${cssClassNameStretchToFullModalWidth}:first-child)`]: {
          marginBlockStart: safeZone,
        },
      }),
      ...(!hasFooter && {
        [`&(.${cssClassNameStretchToFullModalWidth}:last-child)`]: {
          marginBlockEnd: safeZone,
        },
      }),
    },
    buildResponsiveStyles(fullscreen, (fullscreenValue: boolean) => ({
      ...(!hasHeader && {
        [`&(.${cssClassNameStretchToFullModalWidth}:first-child)`]: {
          borderRadius: fullscreenValue ? 0 : `${borderRadiusMedium} ${borderRadiusMedium} 0 0`,
        },
      }),
      ...(!hasFooter && {
        [`&(.${cssClassNameStretchToFullModalWidth}:last-child)`]: {
          borderRadius: fullscreenValue ? 0 : `0 0 ${borderRadiusMedium} ${borderRadiusMedium}`,
        },
      }),
    }))
  );
};
