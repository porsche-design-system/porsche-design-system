import {
  frostedGlassStyle,
  gridGap,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
} from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import { cssVariableTransitionDuration, getTransition, motionDurationMap } from './';
import {
  colorBackdrop,
  colorCanvas,
  colorFrosted,
  colorPrimary,
  colorSurface,
  legacyRadiusLarge,
  radius3Xl,
  radiusXl,
} from './css-variables';

export const BACKDROPS = ['blur', 'shading'] as const;
export type Backdrop = (typeof BACKDROPS)[number];

const cssVarBackgroundColor = '--_a';

export const dialogHostJssStyle = (background: 'canvas' | 'surface'): JssStyle => {
  return {
    '--pds-internal-grid-outer-column': `calc(${spacingFluidLarge} - ${gridGap})`,
    '--pds-internal-grid-margin': `calc(${spacingFluidLarge} * -1)`,
    '--pds-internal-grid-width-min': 'auto',
    '--pds-internal-grid-width-max': 'none',
    [cssVarBackgroundColor]: background === 'surface' ? colorSurface : colorCanvas,
  };
};

export const getDialogJssStyle = (isVisible: boolean, backdrop: Backdrop = 'blur'): JssStyle => {
  return {
    ...dialogBackdropResetJssStyle,
    ...getDialogBackdropTransitionJssStyle(isVisible, backdrop),
  };
};

const dialogBackdropResetJssStyle: JssStyle = {
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

const getDialogBackdropTransitionJssStyle = (isVisible: boolean, backdrop: Backdrop = 'blur'): JssStyle => {
  const isBackdropBlur = backdrop === 'blur';

  const duration = isVisible ? 'long' : 'moderate';
  const easing = isVisible ? 'in' : 'out';
  // as soon as all browsers are supporting `allow-discrete`, visibility transition shouldn't be necessary anymore
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
          background: colorBackdrop,
          ...(isBackdropBlur && frostedGlassStyle),
        }
      : {
          visibility: 'hidden', // element shall not be tabbable with keyboard after fade out transition has finished
          pointerEvents: 'none', // element can't be interacted with mouse
          background: 'transparent',
        }),
    transition,
    // `allow-discrete` transition for ua-style `overlay` (supported browsers only) ensures dialog is rendered on
    // #top-layer as long as fade-in or fade-out transition/animation is running
    '@supports (transition-behavior: allow-discrete)': {
      transition: `${transition}, ${getTransition('overlay', duration, easing)} allow-discrete`,
    },
  };
};

export const getScrollerJssStyle = (position: 'fullscreen' | 'start' | 'end'): JssStyle => {
  // ensures scrollbar color is set correctly (e.g. when scrollbar is shown on backdrop, on flyout/modal surface or with Auto Dark Mode)
  const backgroundLight = 'rgba(255,255,255,.01)';
  const backgroundDark = 'rgba(0,0,0,.01)';
  const background = {
    light: backgroundLight,
    dark: backgroundDark,
    auto: backgroundLight,
  };

  return {
    position: 'absolute',
    isolation: 'isolate', // creates new stacking context to show scrollbars on top of header/footer areas (on iOS/iPadOS)
    display: 'grid',
    ...(position === 'fullscreen'
      ? {
          inset: 0,
        }
      : {
          insetBlock: 0,
          [position === 'start' ? 'insetInlineStart' : 'insetInlineEnd']: 0,
        }),
    overflow: 'hidden auto',
    overscrollBehaviorY: 'none',
    // TODO: check if smooth scrolling on iOS is given?
    background: background.light,
  };
};

export const dialogBorderRadius = `var(${legacyRadiusLarge}, ${radiusXl})`;
export const dialogPaddingTop = spacingFluidMedium;
export const dialogPaddingBottom = `calc(${spacingFluidSmall} + ${spacingFluidMedium})`;
export const dialogPaddingInline = spacingFluidLarge;

export const dialogGridJssStyle = (): JssStyle => {
  return {
    position: 'relative',
    display: 'grid',
    gridTemplate: `auto/${spacingFluidSmall} minmax(0,1fr) ${spacingFluidSmall}`,
    gap: `${spacingFluidMedium} calc(${spacingFluidLarge} - ${spacingFluidSmall})`,
    paddingTop: dialogPaddingTop,
    paddingBottom: dialogPaddingBottom,
    alignContent: 'flex-start',
  };
};

export const getDialogColorJssStyle = (): JssStyle => {
  return {
    color: colorPrimary, // enables color inheritance for slots
    background: `var(${cssVarBackgroundColor})`,
  };
};

export const getDialogTransitionJssStyle = (isVisible: boolean, slideIn: '^' | '<' | '>'): JssStyle => {
  const duration = isVisible ? 'moderate' : 'short';
  const easing = isVisible ? 'in' : 'out';

  return {
    // transition offset relies vertically on viewport (vh) because the dialog height can be infinite, while horizontally
    // it relies on the dialog width (%) which has a max-width
    ...(isVisible
      ? {
          opacity: 1,
          transform: 'initial',
        }
      : {
          opacity: 0,
          transform: slideIn === '^' ? 'translateY(25vh)' : `translateX(${slideIn === '>' ? '-' : ''}100%)`,
          '&:dir(rtl)': {
            transform: slideIn === '^' ? 'translateY(25vh)' : `translateX(${slideIn === '>' ? '' : '-'}100%)`,
          },
        }),
    transition: `${getTransition('opacity', duration, easing)}, ${getTransition('transform', duration, easing)}`,
  };
};

export const getDialogDismissButtonJssStyle = (): JssStyle => {
  return {
    gridArea: '1/3',
    zIndex: 5, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
    position: 'sticky',
    top: spacingFluidSmall,
    marginTop: `calc(-1 * ${dialogPaddingTop} + ${spacingFluidSmall})`,
    marginInlineEnd: spacingFluidSmall,
    placeSelf: 'flex-start flex-end',
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      inset: `calc(-1 * ${spacingFluidSmall}) calc(-1 * ${spacingFluidSmall}) -50px -50px`,
      pointerEvents: 'none',
      zIndex: -1,
      borderRadius: dialogBorderRadius,
      background: `radial-gradient(circle at top right, hsla(from var(${cssVarBackgroundColor}) h s l / 0.35) 0%, transparent 70%)`,
    },
  };
};

export const getSlotJssStyle = (): JssStyle => {
  return {
    display: 'block',
    '&:first-of-type': {
      gridRowStart: 1,
    },
  };
};

export const getSlotHeaderJssStyle = (): JssStyle => {
  const paddingTop = dialogPaddingTop;
  const paddingBottom = spacingStaticMedium;

  return {
    gridColumn: '1/-1',
    zIndex: 1, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
    position: 'sticky',
    top: 0, // necessary for `IntersectionObserver` to detect if sticky element is stuck or not. Float value is used, so that sticky area isn't moved out visually by e.g. 1px when container gets scrolled.
    marginBlock: `calc(-1 * ${paddingTop}) calc(-1 * ${paddingBottom})`,
    padding: `${paddingTop} ${dialogPaddingInline} ${paddingBottom}`,
    background: `linear-gradient(180deg,var(${cssVarBackgroundColor}) 0%,var(${cssVarBackgroundColor}) 80%,transparent 100%)`,
  };
};

export const getSlotMainJssStyle = (): JssStyle => {
  return {
    gridColumn: '2/3',
    zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
  };
};

export const getSlotFooterJssStyle = (): JssStyle => {
  const paddingBlock = `calc(${dialogPaddingBottom} - ${dialogBorderRadius})`;
  const offset = `calc(${paddingBlock} / 2)`;

  return {
    gridColumn: '1/-1',
    zIndex: 2, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
    position: 'sticky',
    bottom: '-.1px', // necessary for `IntersectionObserver` to detect if sticky element is stuck or not. Float value is used, so that sticky area isn't moved out visually by e.g. 1px when container gets scrolled.
    marginBlock: `calc(-1 * ${paddingBlock})`,
    padding: `${paddingBlock} ${dialogPaddingInline}`,
    background: `linear-gradient(0deg,var(${cssVarBackgroundColor}) 0%,var(${cssVarBackgroundColor}) 20%,transparent 80%)`,
    '&[data-stuck]::after': {
      content: '""',
      zIndex: -1,
      position: 'absolute',
      inset: `calc(${paddingBlock} - ${offset}) calc(${dialogPaddingInline} - ${offset})`,
      background: colorFrosted,
      borderRadius: radius3Xl,
      ...frostedGlassStyle,
    },
  };
};

export const getSlotSubFooterJssStyle = (): JssStyle => {
  return {
    gridColumn: '1/-1',
    zIndex: 3, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
    paddingInline: dialogPaddingInline,
    backgroundColor: `var(${cssVarBackgroundColor})`,
  };
};
