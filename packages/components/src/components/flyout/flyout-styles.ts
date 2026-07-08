import { ref } from '@porsche-design-system/stylesheets';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import {
  dialogBorderRadius,
  dialogGridCssStyle,
  dialogHostCssStyle,
  dialogPaddingBottom,
  dialogPaddingInline,
  dialogPaddingTop,
  getDialogColorCssStyle,
  getDialogDismissButtonCssStyle,
  getDialogTransitionCssStyle,
  getFunctionalComponentDialogBaseStyles,
  getScrollerCssStyle,
  getSlotFooterCssStyle,
  getSlotHeaderCssStyle,
  getSlotCssStyle,
  getSlotMainCssStyle,
  getSlotSubFooterCssStyle,
} from '../common/dialog-base/dialog-base-styles';
import type { FlyoutBackdrop, FlyoutBackground, FlyoutFooterBehavior, FlyoutPosition } from './flyout-utils';

/**
 * @css-variable {"name": "--p-flyout-width", "description": "Width of the flyout.", "defaultValue": "auto"}
 */
const cssVariableWidth = '--p-flyout-width';

/**
 * @css-variable {"name": "--p-flyout-sticky-top", "description": "@experimental Exposes the header's height as a read-only CSS variable, set automatically by the component. Slotted sticky content can use this value to offset their top position correctly."}
 */
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
  footerBehavior: FlyoutFooterBehavior,
  fullscreen: BreakpointCustomizable<boolean>
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
          ...dialogHostCssStyle(background),
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      slot: {
        ...getSlotCssStyle(),
        '&:not([name])': getSlotMainCssStyle(),
        ...(hasHeader && {
          '&[name=header]': {
            ...getSlotHeaderCssStyle(),
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
          '&[name=footer]': getSlotFooterCssStyle(),
        }),
        ...(hasSubFooter && {
          '&[name=sub-footer]': getSlotSubFooterCssStyle(),
        }),
      },
      ...getFunctionalComponentDialogBaseStyles(isOpen, backdrop),
    },
    scroller: {
      ...getScrollerCssStyle(isPositionStart ? 'start' : 'end'),
      // compared to Modal, the transition is handled on the scroller to have correct stucked behaviour (visibility of drop shadow)
      // for sticky header area while transitioned
      ...getDialogTransitionCssStyle(isOpen, isPositionStart ? '>' : '<'),
      // Though this might be an accessibility issue, we don't want an outline to be rendered until we have a proper design solution
      '&:focus-visible': {
        outline: 'none',
      },
    },
    flyout: {
      ...dialogGridCssStyle(),
      ...getDialogColorCssStyle(),
      ...buildResponsiveStyles(fullscreen, (fullscreenValue: boolean) =>
        fullscreenValue
          ? {
              // fullscreen spans the whole viewport width, so corners are squared and corner clipping is disabled
              width: '100dvw',
              minWidth: 'auto',
              maxWidth: 'none',
              borderRadius: 0,
              clipPath: 'none',
              // the flyout touches both inline edges, so the inner-side HCM border is no longer needed
              '&:dir(rtl)': {
                clipPath: 'none',
              },
            }
          : {
              width: ref(cssVariableWidth, 'auto'),
              minWidth: '320px',
              maxWidth: '100vw',
              clipPath: isPositionStart
                ? `inset(0 round 0 ${dialogBorderRadius} ${dialogBorderRadius} 0)` // position 'start': round inline-end (right in LTR) corners only
                : `inset(0 round ${dialogBorderRadius} 0 0 ${dialogBorderRadius})`, // position 'end': round inline-start (left in LTR) corners only
              // `clip-path` uses physical corners, so mirror for RTL to keep parity with the logical border*Radius below
              '&:dir(rtl)': {
                clipPath: isPositionStart
                  ? `inset(0 round ${dialogBorderRadius} 0 0 ${dialogBorderRadius})`
                  : `inset(0 round 0 ${dialogBorderRadius} ${dialogBorderRadius} 0)`,
              },
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
                    ...forcedColorsMediaQuery({
                      borderInlineStart: '2px solid CanvasText',
                    }),
                  }),
            }
      ),
      ...(isFooterFixed && {
        gridTemplateRows: hasHeader ? 'auto 1fr auto' : '1fr',
      }),
    },
    dismiss: getDialogDismissButtonCssStyle(),
  });
};
