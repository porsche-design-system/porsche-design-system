import {
  addImportantToEachRule,
  cssVariableAnimationDuration,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  blurFrosted,
  colorCanvas,
  colorFrosted,
  colorFrostedSoft,
  colorPrimary,
  durationSm,
  easeInOut,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  radiusXl,
  ref,
  spacingStaticMd,
  spacingStaticSm,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import { getCss } from '../../utils';
import { POPOVER_SAFE_ZONE } from './popover-utils';

export const getComponentCss = (): string => {
  const shadowColor = 'rgba(0,0,0,0.3)';

  return getCss({
    '@global': {
      '@keyframes fade-in': {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
      ':host': {
        position: 'relative', // ensures correct reference for floating ui fallback positioning in older browsers
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      'slot[name="button"]': {
        display: 'block',
      },
      ...preventFoucOfNestedElementsStyles,
      p: {
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        margin: 0,
      },
      button: {
        all: 'unset',
        display: 'block',
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
      },
      '[popover]': {
        all: 'unset',
        position: 'absolute',
        pointerEvents: 'none',
        filter: `drop-shadow(0 0 16px ${shadowColor})`,
        backdropFilter: 'drop-shadow(0 0 transparent)', // workaround for Firefox bug not rendering PDS frosted glass correctly when nested inside CSS filter: https://bugzilla.mozilla.org/show_bug.cgi?id=1797051
        animation: `${ref(cssVariableAnimationDuration, ref(durationSm))} fade-in ${ref(easeInOut)} forwards`,
        '&:not(:popover-open)': {
          display: 'none', // ensures popover is not flickering when closed in some situations
        },
      },
    },
    label: getHiddenTextJssStyle(),
    icon: {
      transform: 'translate3d(0,0,0)', // Fixes movement on hover in Safari
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
    content: {
      maxWidth: `min(calc(100dvw - ${POPOVER_SAFE_ZONE * 2}px), 48ch)`,
      width: 'max-content', // ensures in older browsers correct width
      boxSizing: 'border-box',
      padding: `${ref(spacingStaticSm)} ${ref(spacingStaticMd)}`,
      pointerEvents: 'auto',
      borderRadius: ref(radiusXl),
      background: ref(colorCanvas),
      font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
      color: ref(colorPrimary),
      ...forcedColorsMediaQuery({
        outline: '2px solid CanvasText',
        outlineOffset: '-2px',
      }),
    },
  });
};
