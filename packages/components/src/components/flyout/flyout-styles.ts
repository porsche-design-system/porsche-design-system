import { getCss, type Theme } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import { spacingFluidMedium, spacingFluidSmall } from '@porsche-design-system/utilities-v2';
import { type FlyoutPosition } from './flyout-utils';
import {
  getDialogColorJssStyle,
  getModalDialogBackdropResetJssStyle,
  getModalDialogBackdropTransitionJssStyle,
  getModalDialogDismissButtonJssStyle,
  getModalDialogGridJssStyle,
  getModalDialogHostJssStyle,
  getModalDialogScrollerJssStyle,
  getModalDialogStickyAreaJssStyle,
  getModalDialogTransitionJssStyle,
  headingTags,
} from '../../styles/dialog-styles';

const cssVariableWidth = '--p-flyout-width';
const cssVariableMaxWidth = '--p-flyout-max-width';

export const getComponentCss = (
  isOpen: boolean,
  position: FlyoutPosition,
  hasHeader: boolean,
  hasFooter: boolean,
  hasSubFooter: boolean,
  theme: Theme
): string => {
  const isPositionStart = position === 'start' || position === 'left';

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...getModalDialogHostJssStyle,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
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
        'slot[name=header]': {
          ...getModalDialogStickyAreaJssStyle('header', theme),
          gridArea: '2/1/4/-1',
          zIndex: 1, // ensures header is above content but below sticky dismiss button
        },
      }),
      ...(hasFooter && {
        'slot[name=footer]': {
          ...getModalDialogStickyAreaJssStyle('footer', theme),
          gridArea: '5/1/auto/-1',
          zIndex: 2, // ensures footer is above header and content but below sticky dismiss button
        },
      }),
      ...(hasSubFooter && {
        'slot[name=sub-footer]': {
          marginTop: hasFooter ? spacingFluidMedium : null,
          gridArea: '6/3',
          zIndex: 2, // ensures footer is above header and content but below sticky dismiss button
        },
      }),
      dialog: {
        ...getModalDialogBackdropResetJssStyle,
        ...getModalDialogBackdropTransitionJssStyle(isOpen, theme),
      },
    },
    scroller: {
      ...getModalDialogScrollerJssStyle(theme),
      display: 'flex',
      justifyContent: isPositionStart ? 'flex-start' : 'flex-end',
      alignItems: 'stretch',
      flexWrap: 'wrap',
    },
    flyout: {
      ...getModalDialogGridJssStyle,
      ...getDialogColorJssStyle(theme),
      ...getModalDialogTransitionJssStyle(isOpen, isPositionStart ? '>' : '<'),
      width: `var(${cssVariableWidth}, fit-content)`,
      minWidth: '320px',
      maxWidth: `var(${cssVariableMaxWidth}, 1180px)`,
    },
    dismiss: {
      ...getModalDialogDismissButtonJssStyle(theme, isOpen, !isPositionStart),
      gridArea: '2/4',
      zIndex: 2, // ensures dismiss button is above sticky footer, header and content
      position: 'sticky',
      top: spacingFluidSmall,
      justifySelf: 'flex-end',
    },
  });
};
