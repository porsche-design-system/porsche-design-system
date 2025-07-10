import type { JssStyle } from 'jss';
import {
  frostedGlassStyle,
  gridGap,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
} from '@porsche-design-system/styles';
import {
  cssVariableTransitionDuration,
  getThemedColors,
  getTransition,
  motionDurationMap,
  prefersColorSchemeDarkMediaQuery,
} from './';
import { isThemeDark, type Theme } from '../utils';

export const BACKDROPS = ['blur', 'shading'] as const;
export type Backdrop = (typeof BACKDROPS)[number];

export const headingTags = 'h1,h2,h3,h4,h5,h6';

export const dialogHostJssStyle: JssStyle = {
  '--pds-internal-grid-outer-column': `calc(${spacingFluidLarge} - ${gridGap})`,
  '--pds-internal-grid-margin': `calc(${spacingFluidLarge} * -1)`,
  '--pds-internal-grid-width-min': 'auto',
  '--pds-internal-grid-width-max': 'none',
};

export const getDialogJssStyle = (isVisible: boolean, theme: Theme, backdrop: Backdrop = 'blur'): JssStyle => {
  return {
    ...dialogBackdropResetJssStyle,
    ...getDialogBackdropTransitionJssStyle(isVisible, theme, backdrop),
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

const getDialogBackdropTransitionJssStyle = (
  isVisible: boolean,
  theme: Theme,
  backdrop: Backdrop = 'blur'
): JssStyle => {
  const isBackdropBlur = backdrop === 'blur';
  const { backgroundShadingColor } = getThemedColors(theme);
  const { backgroundShadingColor: backgroundShadingColorDark } = getThemedColors('dark');

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
        }),
    transition,
    // `allow-discrete` transition for ua-style `overlay` (supported browsers only) ensures dialog is rendered on
    // #top-layer as long as fade-in or fade-out transition/animation is running
    '@supports (transition-behavior: allow-discrete)': {
      transition: `${transition}, ${getTransition('overlay', duration, easing)} allow-discrete`,
    },
  };
};

export const getScrollerJssStyle = (position: 'fullscreen' | 'start' | 'end', theme: Theme): JssStyle => {
  // ensures scrollbar color is set correctly (e.g. when scrollbar is shown on backdrop, on flyout/modal surface or with Auto Dark Mode)
  const backgroundLight = 'rgba(255,255,255,.01)';
  const backgroundDark = 'rgba(0,0,0,.01)';
  const background: { [K in Theme]: string } = {
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
    background: background[theme],
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: background.dark,
    }),
  };
};

export const dialogPaddingBlock = `calc(${spacingFluidSmall} + ${spacingFluidMedium})`;

export const dialogGridJssStyle: JssStyle = {
  display: 'grid',
  gridTemplate: `auto/${spacingFluidSmall} minmax(0,1fr) ${spacingFluidSmall}`,
  gap: `${spacingFluidMedium} calc(${spacingFluidLarge} - ${spacingFluidSmall})`,
  paddingBlock: dialogPaddingBlock,
  alignContent: 'flex-start',
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

export const getDialogStickyAreaJssStyle = (area: 'header' | 'footer', theme: Theme): JssStyle => {
  const { backgroundColor } = getThemedColors(theme);
  const { backgroundColor: backgroundColorDark } = getThemedColors('dark');
  const scrollShadowColor = 'rgba(204, 204, 204, 0.35)';
  const scrollShadowColorDark = 'rgba(0, 0, 0, 0.6)';
  const isAreaHeader = area === 'header';
  const boxShadowDimension = `0 ${isAreaHeader ? 5 : -5}px 10px`;

  return {
    position: 'sticky',
    [isAreaHeader ? 'top' : 'bottom']: '-.1px', // necessary for `IntersectionObserver` to detect if sticky element is stuck or not. Float value is used, so that sticky area isn't moved out visually by e.g. 1px when container gets scrolled.
    transform: 'translateZ(0)', // prevents slightly squeezed elements within sticky area for some browsers (e.g. Firefox) caused by float value of sticky top position
    padding: `${spacingStaticMedium} ${spacingFluidLarge}`,
    marginBlock: `${
      isAreaHeader ? `calc((${spacingFluidSmall} + ${spacingFluidMedium}) * -1)` : `-${spacingStaticMedium}`
    } -${spacingStaticMedium}`,
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
