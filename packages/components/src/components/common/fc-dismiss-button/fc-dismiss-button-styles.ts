import {
  blurFrosted,
  colorCanvas,
  colorFrosted,
  colorFrostedStrong,
  colorPrimary,
  colorSurface,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  ref,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle } from 'jss';
import {
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hoverMediaQuery,
} from '../../../styles';
import { getInlineSVGBackgroundImage } from '../../../utils/svg/getInlineSVGBackgroundImage';

export type FCDismissButtonVariant = 'canvas' | 'surface' | 'frosted';

// Inlined `close` icon (mirrors packages/assets/projects/icons/src/close.svg) rendered as a CSS mask, so the dismiss
// button needs neither a nested `p-button` nor a `p-icon` (which would fetch the SVG from the CDN asynchronously).
const iconClose = getInlineSVGBackgroundImage(
  '<path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/>'
);

type Colors = {
  textColor: string;
  backgroundColor: string;
  backgroundColorHover: string;
};

const getVariantColors = (variant: FCDismissButtonVariant): Colors => {
  const colors: { [v in FCDismissButtonVariant]: Colors } = {
    canvas: {
      textColor: ref(colorPrimary),
      backgroundColor: ref(colorCanvas),
      backgroundColorHover: ref(colorSurface),
    },
    surface: {
      textColor: ref(colorPrimary),
      backgroundColor: ref(colorSurface),
      backgroundColorHover: ref(colorCanvas),
    },
    frosted: {
      textColor: ref(colorPrimary),
      backgroundColor: ref(colorFrostedStrong),
      backgroundColorHover: ref(colorFrosted),
    },
  };

  return colors[variant];
};

/**
 * Visual styles for the shared native `<button class="dismiss">` dismiss button. Returns the button rule (reset,
 * variant colors, focus ring, High Contrast Mode, hover, inlined close-icon mask and the visually-hidden label). Each
 * consumer merges this with its own positioning styles for the `dismiss` key (e.g. grid placement in
 * `notification-base-styles` / `dialog-base-styles`).
 *
 * Reduced to the dismiss button's fixed configuration (always `compact` + `hideLabel`): padding `6px`, full border
 * radius and no gap — the responsive `compact`/`hideLabel` branches from `getLinkButtonStyles` are therefore collapsed.
 */
export const getFCDismissButtonStyles = (variant: FCDismissButtonVariant): JssStyle => {
  const { textColor, backgroundColor, backgroundColorHover } = getVariantColors(variant);

  return {
    all: 'unset',
    boxSizing: 'border-box',
    display: 'grid',
    placeItems: 'center',
    padding: '6px',
    borderRadius: ref(radiusFull),
    font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
    backgroundColor,
    color: textColor,
    cursor: 'pointer',
    // The frosted backdrop-filter is only meaningful for the translucent `secondary` (frosted) background. For the
    // opaque `primary` background it is invisible AND — because the dialog consumer additionally applies
    // `filter: invert(1)` on the same element (see `getDialogDismissButtonJssStyle`) — the blurred backdrop bleeds past
    // the circular edge and the invert amplifies it into a visible glow/halo. So it is applied for `secondary` only.
    ...(variant === 'frosted' && {
      WebkitBackdropFilter: ref(blurFrosted),
      backdropFilter: ref(blurFrosted),
    }),
    transition: `${getTransition('background-color')}, ${getTransition('color')}`,
    ...forcedColorsMediaQuery({
      forcedColorAdjust: 'none',
      background: 'Canvas',
      boxShadow: 'inset 0 0 0 2px ButtonBorder',
      color: 'ButtonText',
    }),
    '&:focus-visible': getFocusBaseStyles(),
    ...hoverMediaQuery({
      '&:hover': {
        backgroundColor: backgroundColorHover,
        ...forcedColorsMediaQuery({
          background: 'Canvas',
        }),
      },
    }),
    '&::before': {
      content: '""',
      width: ref(leadingNormal),
      height: ref(leadingNormal),
      WebkitMask: `${iconClose} center/contain no-repeat`, // necessary for Sogou browser support :-)
      mask: `${iconClose} center/contain no-repeat`,
      background: 'currentColor', // follows the button's text color (variant + HCM `ButtonText`)
    },
    // visually-hidden accessible name (mirrors `hideLabel` on the former `p-button`)
    '& span': getHiddenTextJssStyle(),
  };
};
