import {
  borderRadiusMedium,
  gridExtendedOffsetBase,
  headingLargeStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  dismissButtonJssStyle,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  dialogGridJssStyle,
  dialogHostJssStyle,
  getDialogColorJssStyle,
  getDialogJssStyle,
  getDialogStickyAreaJssStyle,
  getDialogTransitionJssStyle,
  getScrollerJssStyle,
  headingTags,
} from '../../styles/dialog-styles';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
import type { ModalBackdrop } from './modal-utils';

/**
 * @css-variable {"name": "--p-modal-width", "description": "Width of the modal.", "defaultValue": "auto"}
 * @css-variable {"name": "--p-modal-spacing-top", "description": "Spacing of the modal to the top.", "defaultValue": "clamp(16px, 10vh, 192px)"}
 * @css-variable {"name": "--p-modal-spacing-bottom", "description": "Spacing of the modal to the bottom.", "defaultValue": "clamp(16px, 10vh, 192px)"}
 */
const cssVariableWidth = '--p-modal-width';
const cssVariableSpacingTop = '--p-modal-spacing-top'; // TODO: maybe --p-modal-spacing-block-start would be more precise?
const cssVariableSpacingBottom = '--p-modal-spacing-bottom'; // TODO: maybe --p-modal-spacing-block-end would be more precise?

const safeZoneVertical = `calc(${spacingFluidSmall} + ${spacingFluidMedium})`;
const safeZoneHorizontal = `${spacingFluidLarge}`;
export const cssClassNameStretchToFullModalWidth = 'stretch-to-full-modal-width';

export const getComponentCss = (
  isOpen: boolean,
  backdrop: ModalBackdrop,
  fullscreen: BreakpointCustomizable<boolean>,
  hasDismissButton: boolean,
  hasHeader: boolean,
  hasFooter: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...dialogHostJssStyle,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      // TODO: why not available to Flyout too?
      // TODO: discussable if so many styles are a good thing, since we could also expose one or two CSS variables with which a stretch to full width is possible too
      '::slotted': addImportantToEachRule(
        mergeDeep(
          {
            [`&(.${cssClassNameStretchToFullModalWidth})`]: {
              display: 'block',
              margin: `0 calc(${safeZoneHorizontal} * -1)`,
              width: `calc(100% + calc(${safeZoneHorizontal} * 2))`,
            },
            ...(!hasHeader && {
              [`&(.${cssClassNameStretchToFullModalWidth}:first-child)`]: {
                marginBlockStart: `calc(${safeZoneVertical} * -1)`,
              },
            }),
            ...(!hasFooter && {
              [`&(.${cssClassNameStretchToFullModalWidth}:last-child)`]: {
                marginBlockEnd: `calc(${safeZoneVertical} * -1)`,
              },
            }),
          },
          buildResponsiveStyles(fullscreen, (fullscreenValue: boolean) => ({
            [`&(.${cssClassNameStretchToFullModalWidth}:first-child)`]: {
              borderTopLeftRadius: fullscreenValue ? 0 : borderRadiusMedium,
              borderTopRightRadius: fullscreenValue ? 0 : borderRadiusMedium,
            },
            [`&(.${cssClassNameStretchToFullModalWidth}:last-child)`]: {
              borderBottomLeftRadius: fullscreenValue ? 0 : borderRadiusMedium,
              borderBottomRightRadius: fullscreenValue ? 0 : borderRadiusMedium,
            },
          }))
        )
      ),
      slot: {
        display: 'block',
        '&:first-of-type': {
          gridRowStart: 1,
        },
        '&:not([name])': {
          gridColumn: '2/3',
          zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
        },
        ...(hasHeader && {
          '&[name=header]': {
            gridColumn: '2/3',
            zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
          },
        }),
        ...(hasFooter && {
          '&[name=footer]': {
            ...getDialogStickyAreaJssStyle('footer', theme),
            gridColumn: '1/-1',
            zIndex: 1, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
          },
        }),
      },
      ...(hasHeader && {
        // TODO: we should either deprecate heading slot + pre-styled headings or implement it in flyout too
        [`slot[name=heading],${headingTags}`]: {
          gridRowStart: 1,
          gridColumn: '2/3',
          zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
          ...headingLargeStyle,
          margin: 0, // relevant for shadowed h1,h2,h3,…
        },
        [`:is(${headingTags}) ~ slot:first-of-type`]: {
          gridRowStart: 'auto',
        },
        [`::slotted([slot="heading"]:is(${headingTags}))`]: {
          margin: 0, // ua-style (relevant for e.g. <h3 slot="heading"/>)
        },
      }),
      dialog: getDialogJssStyle(isOpen, theme, backdrop),
    },
    scroller: getScrollerJssStyle('fullscreen', theme),
    modal: {
      ...dialogGridJssStyle,
      ...getDialogColorJssStyle(theme),
      ...getDialogTransitionJssStyle(isOpen, '^'),
      // TODO: maybe we should deprecate the fullscreen property and force the modal to be fullscreen on mobile only
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
              borderRadius: borderRadiusMedium,
            }
      ),
    },
    ...(hasDismissButton && {
      dismiss: {
        ...dismissButtonJssStyle,
        gridArea: '1/3',
        zIndex: 2, // ensures dismiss button is above sticky footer, header and content
        position: 'sticky',
        insetBlockStart: spacingFluidSmall,
        marginBlockStart: `calc(${spacingFluidMedium} * -1)`,
        marginInlineEnd: spacingFluidSmall,
        placeSelf: 'flex-start flex-end',
      },
    }),
  });
};
