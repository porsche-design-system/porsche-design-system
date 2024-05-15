import {
  borderRadiusMedium,
  gridExtendedOffsetBase,
  headingLargeStyle,
  spacingFluidMedium,
  spacingFluidSmall,
} from '@porsche-design-system/utilities-v2';
import { type BreakpointCustomizable, type Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import { type ModalBackdrop } from './modal-utils';
import {
  getDialogColorJssStyle,
  dialogBackdropResetJssStyle,
  getDialogBackdropTransitionJssStyle,
  getDismissButtonJssStyle,
  dialogGridJssStyle,
  dialogHostJssStyle,
  getScrollerJssStyle,
  getDialogStickyAreaJssStyle,
  getModalDialogStretchToFullModalWidthJssStyle,
  getDialogTransitionJssStyle,
  headingTags,
} from '../../styles/dialog-styles';

const cssVariableSpacingTop = '--p-modal-spacing-top';
const cssVariableSpacingBottom = '--p-modal-spacing-bottom';

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
      ':host': addImportantToEachRule({
        ...dialogHostJssStyle,
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      }),
      '::slotted': getModalDialogStretchToFullModalWidthJssStyle(hasHeader, hasFooter, fullscreen),
      slot: {
        display: 'block',
        '&:first-of-type': {
          gridRowStart: 1,
        },
        '&:not([name])': {
          gridColumn: '2/3',
          zIndex: 0,
        },
        ...(hasHeader && {
          '&[name=header]': {
            gridColumn: '2/3',
            zIndex: 0,
          },
        }),
        ...(hasFooter && {
          '&[name=footer]': {
            ...getDialogStickyAreaJssStyle('footer', theme),
            gridColumn: '1/-1',
            zIndex: 1,
          },
        }),
      },
      ...(hasHeader && {
        // TODO: we should either deprecate heading slot + pre-styled headings or implement it in flyout too
        [`slot[name=heading],${headingTags}`]: {
          gridColumnStart: 2,
          zIndex: 0, // ensures header isn't above sticky footer or dismiss button
          ...headingLargeStyle,
          margin: 0,
        },
        [`::slotted([slot="heading"]:is(${headingTags}))`]: {
          margin: 0, // ua-style (relevant for e.g. <h3 slot="header"/>)
        },
      }),
      dialog: {
        ...dialogBackdropResetJssStyle,
        ...getDialogBackdropTransitionJssStyle(isOpen, theme, backdrop),
      },
    },
    scroller: {
      ...getScrollerJssStyle('fullscreen', theme),
    },
    modal: {
      ...dialogGridJssStyle,
      ...getDialogColorJssStyle(theme),
      ...getDialogTransitionJssStyle(isOpen),
      // TODO: maybe we should deprecate the fullscreen property and force the modal to be fullscreen on mobile only
      ...buildResponsiveStyles(fullscreen, (fullscreenValue: boolean) =>
        fullscreenValue
          ? {
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '100%',
              margin: 0,
              borderRadius: 0,
            }
          : {
              minWidth: 'clamp(276px, 22.75vw + 203px, 640px)', // 'auto', // '276px', on viewport 320px: calc(${gridColumnWidthBase} * 6 + ${gridGap} * 5)
              maxWidth: '1535.5px', // to be in sync with "Porsche Grid" on viewport >= 1920px: `calc(${gridColumnWidthXXL} * 14 + ${gridGap} * 13)`
              minHeight: 'auto',
              margin: `var(${cssVariableSpacingTop},clamp(16px, 10vh, 192px)) ${gridExtendedOffsetBase} var(${cssVariableSpacingBottom},clamp(16px, 10vh, 192px))`,
              borderRadius: borderRadiusMedium,
            }
      ),
    },
    ...(hasDismissButton && {
      dismiss: {
        ...getDismissButtonJssStyle(theme, isOpen),
        gridArea: '1/3',
        zIndex: 2, // ensures dismiss button is above sticky footer, header and content
        position: 'sticky',
        insetBlockStart: spacingFluidSmall,
        marginBlockStart: `calc(${spacingFluidMedium} * -1)`,
        marginInlineEnd: spacingFluidSmall,
        justifySelf: 'flex-end',
      },
    }),
  });
};
