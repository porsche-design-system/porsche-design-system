import { spacingFluidLarge } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  dialogBorderRadius,
  dialogGridJssStyle,
  dialogHostJssStyle,
  dialogPaddingBottom,
  dialogPaddingInline,
  dialogPaddingTop,
  getDialogColorJssStyle,
  getDialogDismissButtonJssStyle,
  getDialogJssStyle,
  getDialogTransitionJssStyle,
  getScrollerJssStyle,
  getSlotJssStyle,
  getSlotMainJssStyle,
} from '../../styles/dialog-styles';
import { getCss } from '../../utils';
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

export const getComponentCss = (isOpen: boolean, background: SheetBackground, hasDismissButton: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'contents',
        ...addImportantToEachRule({
          [`${cssVarRefPaddingTop}`]: dialogPaddingTop,
          [`${cssVarRefPaddingBottom}`]: dialogPaddingBottom,
          [`${cssVarRefPaddingInline}`]: dialogPaddingInline,
          ...dialogHostJssStyle(background),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      slot: {
        ...getSlotJssStyle(),
        '&:not([name])': getSlotMainJssStyle(),
        '&[name=header]': {
          gridColumn: '2/3',
          zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
        },
      },
      dialog: getDialogJssStyle(isOpen, 'shading'),
    },
    scroller: getScrollerJssStyle('fullscreen'),
    sheet: {
      ...dialogGridJssStyle(),
      ...getDialogColorJssStyle(),
      ...getDialogTransitionJssStyle(isOpen, '^'),
      width: '100%',
      alignSelf: 'flex-end',
      marginBlockStart: spacingFluidLarge, // ensures minimal space at the top to visualize paper sheet like border top radius in case sheet becomes scrollable
      borderTopLeftRadius: dialogBorderRadius,
      borderTopRightRadius: dialogBorderRadius,
    },
    ...(hasDismissButton && {
      dismiss: getDialogDismissButtonJssStyle(),
    }),
  });
};
