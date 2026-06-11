import { gridGap } from '@porsche-design-system/emotion';
import {
  blurFrosted,
  colorBackdrop,
  colorCanvas,
  colorFrosted,
  colorPrimary,
  colorSurface,
  radius2Xl,
  radius3Xl,
  ref,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingStatic2Xs,
  spacingStaticMd,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import { cssVariableTransitionDuration, getTransition, motionDurationMap } from '../../../styles';
import { overlayTransitionSupportsQuery } from '../../../utils';

export const BACKDROPS = ['blur', 'shading'] as const;
export type Backdrop = (typeof BACKDROPS)[number];

const cssVarBackgroundColor = '--_p-dialog-a';

export const dialogHostJssStyle = (background: 'canvas' | 'surface'): JssStyle => {
  return {
    '--pds-internal-grid-outer-column': `calc(${ref(spacingFluidLg)} - ${gridGap})`,
    '--pds-internal-grid-margin': `calc(${ref(spacingFluidLg)} * -1)`,
    '--pds-internal-grid-width-min': 'auto',
    '--pds-internal-grid-width-max': 'none',
    [cssVarBackgroundColor]: background === 'surface' ? ref(colorSurface) : ref(colorCanvas),
  };
};

export const getFunctionalComponentDialogBaseStyles = (isVisible: boolean, backdrop: Backdrop = 'blur'): Styles => {
  return {
    dialog: {
      ...dialogBackdropResetJssStyle,
      ...getDialogBackdropTransitionJssStyle(isVisible, backdrop),
    },
  };
};

const dialogBackdropResetJssStyle: JssStyle = {
  all: 'unset',
  position: 'fixed',
  inset: 0,
  maxWidth: '100dvw',
  maxHeight: '100dvh',
  overflow: 'hidden',
  display: 'block',
  outline: 0, // we always expect a focusable element to be within the dialog
  '&::backdrop': {
    display: 'none', // ua-style (we can't use it atm because it's not animatable in all browsers)
  },
};

const getDialogBackdropTransitionJssStyle = (isVisible: boolean, backdrop: Backdrop = 'blur'): JssStyle => {
  const isBackdropBlur = backdrop === 'blur';

  const duration = isVisible ? 'long' : 'moderate';
  const easing = isVisible ? 'in' : 'out';
  const delay = ref(cssVariableTransitionDuration, isVisible ? '0s' : motionDurationMap[duration]);
  // as soon as all browsers are supporting `allow-discrete`, visibility transition shouldn't be necessary anymore
  const transition = `visibility 0s linear ${delay}, width 0s linear ${delay}, height 0s linear ${delay}, ${getTransition('background-color', duration, easing)}, ${getTransition(
    '-webkit-backdrop-filter',
    duration,
    easing
  )}, ${getTransition('backdrop-filter', duration, easing)}`;

  return {
    zIndex: 9999999, // fallback for fade out stacking until `overlay` + `allow-discrete` is supported in all browsers. It tries to mimic #top-layer positioning hierarchy.
    ...(isVisible
      ? {
          width: '100dvw',
          height: '100dvh',
          visibility: 'inherit',
          pointerEvents: 'auto',
          overlay: 'auto',
          background: ref(colorBackdrop),
          ...(isBackdropBlur && {
            WebkitBackdropFilter: ref(blurFrosted),
            backdropFilter: ref(blurFrosted),
          }),
        }
      : {
          // When the dialog lives inside a new stacking context, it is no longer promoted to the #top-layer while closed.
          // In that case it can reserve additional space and break the surrounding layout, so width and height are collapsed to zero.
          // A future improvement could use `transition-behavior: allow-discrete` to toggle between `display: none` and `block`,
          // but browser support is still insufficient and behaves inconsistently in Safari and Firefox.
          width: '0px',
          height: '0px',
          visibility: 'hidden', // element shall not be tabbable with keyboard after fade out transition has finished
          pointerEvents: 'none', // element can't be interacted with mouse
          overlay: 'none',
          background: 'transparent',
        }),
    transition,
    // keep the dialog on the #top-layer while the fade-out runs (Chromium only; see `overlayTransitionSupportsQuery`)
    ...overlayTransitionSupportsQuery({
      transition: `${transition}, ${getTransition('overlay', duration, easing)} allow-discrete`,
    }),
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

export const dialogBorderRadius = ref(radius3Xl);
export const dialogPaddingTop = ref(spacingFluidMd);
export const dialogPaddingBottom = `calc(${dialogBorderRadius} + ${ref(spacingFluidMd)})`;
export const dialogPaddingInline = ref(spacingFluidLg);

export const dialogGridJssStyle = (clipPath: string = 'none'): JssStyle => {
  return {
    position: 'relative',
    display: 'grid',
    gridTemplate: `auto/${ref(spacingFluidSm)} minmax(0,1fr) ${ref(spacingFluidSm)}`,
    gap: `${ref(spacingFluidMd)} calc(${ref(spacingFluidLg)} - ${ref(spacingFluidSm)})`,
    paddingTop: dialogPaddingTop,
    paddingBottom: dialogPaddingBottom,
    alignContent: 'flex-start',
    // `overflow: clip` can't be used due to a Chromium bug that drops descendant backdrop-filter tiles (e.g. frosted p-tag); `clip-path` clips slotted content to the rounded corners without the faulty paint-containment box while keeping the scroll behavior intact
    clipPath,
    // Chromium paint bug: when a dialog element is nested inside another (e.g. `p-modal` within `p-flyout`),
    // the inner dialog's grid content fails to render. Forcing a new compositing layer via `translate3d`
    // triggers a repaint and fixes it. Re-check periodically; remove once the upstream Chromium bug is resolved.
    transform: 'translate3d(0,0,0)',
  };
};

export const getDialogColorJssStyle = (): JssStyle => {
  return {
    color: ref(colorPrimary), // enables color inheritance for slots
    background: ref(cssVarBackgroundColor),
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
    top: ref(spacingFluidSm),
    marginTop: `calc(-1 * ${dialogPaddingTop} + ${ref(spacingFluidSm)})`,
    marginInlineEnd: ref(spacingFluidSm),
    placeSelf: 'flex-start flex-end',
    filter: 'invert(1) brightness(1.02)',
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
  const paddingBottom = ref(spacingStaticMd);

  return {
    gridColumn: '1/-1',
    zIndex: 1, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
    position: 'sticky',
    top: 0, // necessary for `IntersectionObserver` to detect if sticky element is stuck or not. Float value is used, so that sticky area isn't moved out visually by e.g. 1px when container gets scrolled.
    marginBlock: `calc(-1 * ${paddingTop}) calc(-1 * ${paddingBottom})`,
    padding: `${paddingTop} ${dialogPaddingInline} ${paddingBottom}`,
    background: `linear-gradient(180deg,${ref(cssVarBackgroundColor)} 0%,${ref(cssVarBackgroundColor)} 80%,transparent 100%)`,
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
  const offset = `12 * ${ref(spacingStatic2Xs)}`;

  return {
    gridColumn: '1/-1',
    zIndex: 2, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
    position: 'sticky',
    bottom: '-.1px', // necessary for `IntersectionObserver` to detect if sticky element is stuck or not. Float value is used, so that sticky area isn't moved out visually by e.g. 1px when container gets scrolled.
    marginBlock: `calc(-1 * ${paddingBlock})`,
    padding: `${paddingBlock} ${dialogPaddingInline}`,
    background: `linear-gradient(0deg,${ref(cssVarBackgroundColor)} 0%,${ref(cssVarBackgroundColor)} 20%,transparent 80%)`,
    '&[data-stuck]::after': {
      content: '""',
      zIndex: -1,
      position: 'absolute',
      inset: `calc(${paddingBlock} - ${offset}) calc(${dialogPaddingInline} - ${offset})`,
      background: ref(colorFrosted),
      borderRadius: ref(radius2Xl),
      WebkitBackdropFilter: ref(blurFrosted),
      backdropFilter: ref(blurFrosted),
    },
  };
};

export const getSlotSubFooterJssStyle = (): JssStyle => {
  return {
    gridColumn: '1/-1',
    zIndex: 3, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
    paddingInline: dialogPaddingInline,
    backgroundColor: ref(cssVarBackgroundColor),
  };
};
