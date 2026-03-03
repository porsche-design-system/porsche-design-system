import { gridExtendedOffsetBase } from '@porsche-design-system/emotion';
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
  getSlotJssStyle,
  getSlotMainJssStyle,
} from '../../styles/dialog-styles';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { ModalBackdrop, ModalBackground } from './modal-utils';

/**
 * @css-variable {"name": "--p-modal-width", "description": "Width of the modal.", "defaultValue": "auto"}
 * @css-variable {"name": "--p-modal-spacing-top", "description": "Spacing of the modal to the top.", "defaultValue": "clamp(16px, 10vh, 192px)"}
 * @css-variable {"name": "--p-modal-spacing-bottom", "description": "Spacing of the modal to the bottom.", "defaultValue": "clamp(16px, 10vh, 192px)"}
 */
const cssVariableWidth = '--p-modal-width';
const cssVariableSpacingTop = '--p-modal-spacing-top'; // TODO: maybe --p-modal-spacing-block-start would be more precise?
const cssVariableSpacingBottom = '--p-modal-spacing-bottom'; // TODO: maybe --p-modal-spacing-block-end would be more precise?

/**
 * @css-variable {"name": "--ref-p-modal-pt", "description": "Exposes the internally used padding-top of the Modal as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the top of the Modal."}
 */
export const cssVarRefPaddingTop = '--ref-p-modal-pt';
/**
 * @css-variable {"name": "--ref-p-modal-pb", "description": "Exposes the internally used padding-bottom of the Modal as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the bottom of the Modal."}
 */
export const cssVarRefPaddingBottom = '--ref-p-modal-pb';
/**
 * @css-variable {"name": "--ref-p-modal-px", "description": "Exposes the internally used padding-inline of the Modal as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the full horizontal size of the Modal."}
 */
export const cssVarRefPaddingInline = '--ref-p-modal-px';

export const getComponentCss = (
  isOpen: boolean,
  background: ModalBackground,
  backdrop: ModalBackdrop,
  fullscreen: BreakpointCustomizable<boolean>,
  hasDismissButton: boolean,
  hasHeader: boolean,
  hasFooter: boolean
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
      ...preventFoucOfNestedElementsStyles,
      slot: {
        ...getSlotJssStyle(),
        '&:not([name])': getSlotMainJssStyle(),
        ...(hasHeader && {
          '&[name=header]': {
            gridColumn: '2/3',
            zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
          },
        }),
        ...(hasFooter && {
          '&[name=footer]': getSlotFooterJssStyle(),
        }),
      },
      dialog: getDialogJssStyle(isOpen, backdrop),
    },
    scroller: getScrollerJssStyle('fullscreen'),
    modal: {
      ...dialogGridJssStyle(),
      ...getDialogColorJssStyle(),
      ...getDialogTransitionJssStyle(isOpen, '^'),
      ...buildResponsiveStyles(fullscreen, (fullscreenValue: boolean) =>
        fullscreenValue
          ? {
              width: 'auto',
              minWidth: 'auto',
              maxWidth: 'none',
              placeSelf: 'stretch',
              margin: 0,
              borderRadius: 0,
            }
          : {
              width: `var(${cssVariableWidth},auto)`,
              minWidth: '276px', // to be in sync with "Porsche Grid" on viewport = 320px: calc(${gridColumnWidthBase} * 6 + ${gridGap} * 5)
              maxWidth: '1535.5px', // to be in sync with "Porsche Grid" on viewport >= 1920px: `calc(${gridColumnWidthXXL} * 14 + ${gridGap} * 13)`
              placeSelf: 'center',
              margin: `var(${cssVariableSpacingTop},clamp(16px, 10vh, 192px)) ${gridExtendedOffsetBase} var(${cssVariableSpacingBottom},clamp(16px, 10vh, 192px))`, // horizontal margin is needed to ensure modal is placed on "Porsche Grid" when slotted content is wider than the viewport width
              borderRadius: dialogBorderRadius,
              ...forcedColorsMediaQuery({
                outline: '2px solid CanvasText',
                outlineOffset: '-2px',
              }),
            }
      ),
    },
    ...(hasDismissButton && {
      dismiss: getDialogDismissButtonJssStyle(),
    }),
  });
};
