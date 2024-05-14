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
  getModalDialogBackdropResetJssStyle,
  getModalDialogBackdropTransitionJssStyle,
  getModalDialogDismissButtonJssStyle,
  getModalDialogGridJssStyle,
  getModalDialogHostJssStyle,
  getModalDialogScrollerJssStyle,
  getModalDialogStickyAreaJssStyle,
  getModalDialogStretchToFullModalWidthJssStyle,
  getModalDialogTransitionJssStyle,
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
        ...getModalDialogHostJssStyle,
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      }),
      '::slotted': getModalDialogStretchToFullModalWidthJssStyle(hasHeader, hasFooter, fullscreen),
      // TODO: maybe we should scope this selector to heading slot only or even reset any element for any slot to margin:0?
      [`::slotted(:is(${headingTags}))`]: {
        margin: 0, // ua-style (relevant for e.g. <h3 slot="header"/>)
      },
      slot: {
        display: 'block',
      },
      'slot:not([name])': {
        gridArea: '4/3',
        zIndex: 0, // ensures content isn't above sticky footer or dismiss button
        marginBlockStart: hasHeader ? spacingFluidMedium : null,
        marginBlockEnd: hasFooter ? spacingFluidMedium : null,
      },
      ...(hasHeader && {
        'slot[name=header],slot[name=heading],h1,h2,h3,h4,h5,h6': {
          gridArea: '3/3',
          zIndex: 0, // ensures header isn't above sticky footer or dismiss button
        },
        'slot[name=heading],h1,h2,h3,h4,h5,h6': {
          ...headingLargeStyle,
          margin: 0,
        },
      }),
      ...(hasFooter && {
        'slot[name=footer]': {
          ...getModalDialogStickyAreaJssStyle('footer', theme),
          gridArea: '5/1/auto/-1',
          zIndex: 1, // ensures footer is above header and content but below sticky dismiss button
        },
      }),
      dialog: {
        ...getModalDialogBackdropResetJssStyle,
        ...getModalDialogBackdropTransitionJssStyle(isOpen, theme, backdrop),
      },
    },
    scroller: {
      ...getModalDialogScrollerJssStyle('fullscreen', theme),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    modal: {
      ...getModalDialogGridJssStyle,
      ...getDialogColorJssStyle(theme),
      ...getModalDialogTransitionJssStyle(isOpen),
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
        ...getModalDialogDismissButtonJssStyle(theme, isOpen),
        gridArea: '2/-3',
        zIndex: 2, // ensures dismiss button is above sticky footer, header and content
        position: 'sticky',
        top: spacingFluidSmall,
        justifySelf: 'flex-end',
      },
    }),
  });
};
