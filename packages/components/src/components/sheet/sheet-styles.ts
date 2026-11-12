import {
  colorContrastMedium,
  colorPrimary,
  radiusFull,
  radiusSm,
  ref,
  spacingFluidLg,
  spacingStaticLg,
  spacingStaticXs,
} from '@porsche-design-system/stylesheets';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../styles';
import { getCss } from '../../utils';
import {
  dialogBorderRadius,
  dialogGridJssStyle,
  dialogHostJssStyle,
  dialogPaddingBottom,
  dialogPaddingInline,
  dialogPaddingTop,
  getDialogColorJssStyle,
  getDialogDismissButtonJssStyle,
  getDialogTransitionJssStyle,
  getFunctionalComponentDialogBaseStyles,
  getScrollerJssStyle,
  getSlotJssStyle,
  getSlotMainJssStyle,
} from '../common/dialog-base/dialog-base-styles';
import type { SheetBackground } from './sheet-utils';

/**
 * @css-variable {"name": "--ref-p-sheet-pt", "description": "Exposes the internally used padding-top of the Sheet as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the top of the Sheet."}
 */
export const cssVarRefPaddingTop = '--ref-p-sheet-pt';
/**
 * @css-variable {"name": "--ref-p-sheet-pb", "description": "Exposes the internally used padding-bottom of the Sheet as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the bottom of the Sheet."}
 */
export const cssVarRefPaddingBottom = '--ref-p-sheet-pb';
/**
 * @css-variable {"name": "--ref-p-sheet-px", "description": "Exposes the internally used padding-inline of the Sheet as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the full horizontal size of the Sheet."}
 */
export const cssVarRefPaddingInline = '--ref-p-sheet-px';

export const getComponentCss = (
  isOpen: boolean,
  background: SheetBackground,
  hasDismissButton: boolean,
  hasSwipeHandle = false
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'contents',
        ...addImportantToEachRule({
          [`${cssVarRefPaddingTop}`]: dialogPaddingTop,
          [`${cssVarRefPaddingBottom}`]: dialogPaddingBottom,
          [`${cssVarRefPaddingInline}`]: dialogPaddingInline,
          ...dialogHostJssStyle(background),
          ...hostHiddenStyles,
        }),
      },
      slot: {
        ...getSlotJssStyle(),
        '&:not([name])': getSlotMainJssStyle(),
        '&[name=header]': {
          gridColumn: '2/3',
          zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
        },
      },
      dialog: getFunctionalComponentDialogBaseStyles(isOpen, 'shading'),
    },
    scroller: getScrollerJssStyle('fullscreen'),
    sheet: {
      ...dialogGridJssStyle(),
      ...getDialogColorJssStyle(),
      ...getDialogTransitionJssStyle(isOpen, '^'),
      width: '100%',
      alignSelf: 'flex-end',
      marginBlockStart: ref(spacingFluidLg), // ensures minimal space at the top to visualize paper sheet like border top radius in case sheet becomes scrollable
      borderTopLeftRadius: dialogBorderRadius,
      borderTopRightRadius: dialogBorderRadius,
      clipPath: `inset(0 round ${dialogBorderRadius} ${dialogBorderRadius} 0 0)`, // round top corners only
      ...forcedColorsMediaQuery({
        borderTop: '2px solid CanvasText',
      }),
    },
    ...(hasDismissButton && {
      dismiss: getDialogDismissButtonJssStyle(background),
    }),
    ...(hasSwipeHandle && {
      'swipe-handle': {
        all: 'unset',
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        insetInline: 0,
        marginInline: 'auto',
        width: '48px',
        height: '24px',
        display: 'grid',
        placeItems: 'center',
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing',
        },
        zIndex: 5,
        borderRadius: ref(radiusSm),
        '&::before': {
          content: '""',
          width: ref(spacingStaticLg),
          height: ref(spacingStaticXs),
          borderRadius: ref(radiusFull),
          background: ref(colorContrastMedium),
          transition: getTransition('background-color'),
        },
        ...hoverMediaQuery({
          '&:hover::before': {
            background: ref(colorPrimary),
          },
        }),
        '&:focus-visible': getFocusBaseStyles(-2),
        ...forcedColorsMediaQuery({
          forcedColorAdjust: 'none',
          '&::before': {
            background: 'ButtonText',
            outline: '1px solid ButtonBorder',
          },
        }),
        '& span': getHiddenTextJssStyle(),
      },
    }),
  });
};
