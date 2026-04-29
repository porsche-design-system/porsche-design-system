import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
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
  getSlotFooterJssStyle,
  getSlotHeaderJssStyle,
  getSlotJssStyle,
  getSlotMainJssStyle,
  getSlotSubFooterJssStyle,
} from '../../styles/dialog-styles';
import { getCss } from '../../utils';
import type { FlyoutBackdrop, FlyoutBackground, FlyoutFooterBehavior, FlyoutPosition } from './flyout-utils';

/**
 * @css-variable {"name": "--p-flyout-width", "description": "Width of the flyout.", "defaultValue": "auto"}
 */
const cssVariableWidth = '--p-flyout-width';
/**
 * @css-variable {"name": "--ref-p-flyout-pt", "description": "Exposes the internally used padding-top of the Flyout as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the top of the Flyout."}
 */
export const cssVarRefPaddingTop = '--ref-p-flyout-pt';
/**
 * @css-variable {"name": "--ref-p-flyout-pb", "description": "Exposes the internally used padding-bottom of the Flyout as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the bottom of the Flyout."}
 */
export const cssVarRefPaddingBottom = '--ref-p-flyout-pb';
/**
 * @css-variable {"name": "--ref-p-flyout-px", "description": "Exposes the internally used padding-inline of the Flyout as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the full horizontal size of the Flyout."}
 */
export const cssVarRefPaddingInline = '--ref-p-flyout-px';

export const getComponentCss = (
  isOpen: boolean,
  background: FlyoutBackground,
  backdrop: FlyoutBackdrop,
  position: FlyoutPosition,
  hasHeader: boolean,
  hasFooter: boolean,
  hasSubFooter: boolean,
  footerBehavior: FlyoutFooterBehavior
): string => {
  const isPositionStart = position === 'start';
  const isFooterFixed = footerBehavior === 'fixed';

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
      ...preventFoucOfNestedElementsStyles,
      slot: {
        ...getSlotJssStyle(),
        '&:not([name])': getSlotMainJssStyle(),
        ...(hasHeader && {
          '&[name=header]': {
            ...getSlotHeaderJssStyle(),
            ...(isPositionStart
              ? {
                  borderStartEndRadius: dialogBorderRadius,
                }
              : {
                  borderStartStartRadius: dialogBorderRadius,
                }),
          },
        }),
        ...(hasFooter && {
          '&[name=footer]': getSlotFooterJssStyle(),
        }),
        ...(hasSubFooter && {
          '&[name=sub-footer]': getSlotSubFooterJssStyle(),
        }),
      },
      dialog: getDialogJssStyle(isOpen, backdrop),
    },
    scroller: {
      ...getScrollerJssStyle(isPositionStart ? 'start' : 'end'),
      // compared to Modal, the transition is handled on the scroller to have correct stucked behaviour (visibility of drop shadow)
      // for sticky header area while transitioned
      ...getDialogTransitionJssStyle(isOpen, isPositionStart ? '>' : '<'),
      // Though this might be an accessibility issue, we don't want an outline to be rendered until we have a proper design solution
      '&:focus-visible': {
        outline: 'none',
      },
    },
    flyout: {
      ...dialogGridJssStyle(),
      ...getDialogColorJssStyle(),
      width: `var(${cssVariableWidth},auto)`,
      minWidth: '320px',
      maxWidth: '100vw',
      ...(isPositionStart
        ? {
            borderStartEndRadius: dialogBorderRadius,
            borderEndEndRadius: dialogBorderRadius,
            ...forcedColorsMediaQuery({
              borderInlineEnd: '2px solid CanvasText',
            }),
          }
        : {
            borderStartStartRadius: dialogBorderRadius,
            borderEndStartRadius: dialogBorderRadius,
            // TODO: Fix needs to be implemented for Fullscreen (which is not available as prop for Flyout yet)
            ...forcedColorsMediaQuery({
              borderInlineStart: '2px solid CanvasText',
            }),
          }),
      ...(isFooterFixed && {
        gridTemplateRows: hasHeader ? 'auto 1fr auto' : '1fr',
      }),
    },
    dismiss: getDialogDismissButtonJssStyle(),
  });
};
