import {
  blurFrosted,
  colorCanvas,
  colorFrosted,
  colorFrostedSoft,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  radiusLg,
  radiusXl,
  ref,
  spacingStatic2Xs,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  motionDurationMap,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getCss, overlayTransitionSupportsQuery } from '../../utils';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { POPOVER_SAFE_ZONE } from './popover-utils';

/**
 * @css-variable {"name": "--p-popover-px", "description": "Horizontal padding of the popover.", "defaultValue": "16px"}
 */
const cssVarPaddingInline = '--p-popover-px';

/**
 * @css-variable {"name": "--p-popover-py", "description": "Vertical padding of the popover.", "defaultValue": "12px"}
 */
const cssVarPaddingBlock = '--p-popover-py';

/**
 * @css-variable {"name": "--p-popover-radius", "description": "Border radius of the popover.", "defaultValue": "12px"}
 */
const cssVarRadius = '--p-popover-radius';

const iconInfo = getInlineSVGBackgroundImage(
  `<path d="M12.5 10v6h-1v-6zm0-2v1h-1V8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16m0-1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9"/>`
);

export const getComponentCss = (isCompact: boolean, isOpen: boolean): string => {
  // fade-in on open, fade-out on close; `visibility` is delayed by the duration on close so the panel stays
  // in the accessibility tree / tabbable until the fade-out finishes, then becomes inert.
  const transition = `${getTransition('opacity', 'short', isOpen ? 'in' : 'out')},visibility 0s linear ${isOpen ? '0s' : motionDurationMap.short}`;

  return getCss({
    '@global': {
      ':host': {
        position: 'relative', // ensures correct reference for floating ui fallback positioning in older browsers
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      'slot:not([name]), p': {
        display: 'block',
        pointerEvents: 'auto',
        padding: `${ref(cssVarPaddingBlock, isCompact ? ref(spacingStaticXs) : `calc(12 * ${ref(spacingStatic2Xs)})`)} ${ref(cssVarPaddingInline, isCompact ? ref(spacingStaticSm) : ref(spacingStaticMd))}`,
      },
      'slot[name="button"]': {
        display: 'inline-block',
      },
      ...preventFoucOfNestedElementsStyles,
      p: {
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        margin: 0,
      },
      button: {
        all: 'unset',
        display: 'grid',
        font: `${ref(typescaleSm)} ${ref(fontPorscheNext)}`, // needed for correct width/height definition based on ex-unit
        width: ref(leadingNormal), // width needed to improve ssr support
        height: ref(leadingNormal), // height needed to improve ssr support
        borderRadius: ref(radiusFull),
        cursor: 'pointer',
        backgroundColor: ref(colorFrosted),
        transition: getTransition('background-color'),
        WebkitBackdropFilter: ref(blurFrosted),
        backdropFilter: ref(blurFrosted),
        ...hoverMediaQuery({
          '&:hover': {
            backgroundColor: ref(colorFrostedSoft),
          },
        }),
        '&:focus-visible': getFocusBaseStyles(),
        '&::after': {
          content: '""',
          WebkitMask: `${iconInfo} center/contain no-repeat`, // necessary for Sogou browser support :-)
          mask: `${iconInfo} center/contain no-repeat`,
          background: ref(colorPrimary),
        },
      },
      span: getHiddenTextJssStyle(),
      '[popover]': {
        all: 'unset',
        position: 'absolute',
        filter: 'drop-shadow(0 0 16px rgba(0,0,0,.3))',
        backdropFilter: 'drop-shadow(0 0 transparent)', // workaround for Firefox bug not rendering PDS frosted glass correctly when nested inside CSS filter: https://bugzilla.mozilla.org/show_bug.cgi?id=1797051
        pointerEvents: 'none', // prevents auto close
        borderRadius: ref(cssVarRadius, isCompact ? ref(radiusLg) : ref(radiusXl)),
        background: ref(colorCanvas),
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        color: ref(colorPrimary),
        maxWidth: `min(calc(100dvw - ${POPOVER_SAFE_ZONE * 2}px), 48ch)`,
        width: 'max-content', // ensures in older browsers correct width
        boxSizing: 'border-box',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'inherit' : 'hidden', // panel shall not be tabbable/announced after the fade-out has finished
        transition,
        // keep the popover on the #top-layer while the fade-out runs (Chromium only; see `overlayTransitionSupportsQuery`)
        ...overlayTransitionSupportsQuery({
          transition: `${transition},${getTransition('overlay', 'short', isOpen ? 'in' : 'out')} allow-discrete`,
        }),
        overlay: 'none',
        '&:popover-open': {
          overlay: 'auto',
        },
        ...forcedColorsMediaQuery({
          outline: '2px solid CanvasText',
          outlineOffset: '-2px',
        }),
        '&::backdrop': {
          display: 'none', // ua-style
        },
      },
    },
    arrow: {
      position: 'absolute',
      width: '24px',
      height: '12px',
      clipPath: 'polygon(50% 0, 100% 110%, 0 110%)',
      background: ref(colorCanvas),
      ...forcedColorsMediaQuery({
        background: 'CanvasText',
      }),
    },
  });
};
