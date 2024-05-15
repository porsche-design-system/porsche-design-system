import { getCss, type Theme } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import { spacingFluidMedium, spacingFluidSmall } from '@porsche-design-system/utilities-v2';
import { type FlyoutPosition } from './flyout-utils';
import {
  getDialogColorJssStyle,
  dialogBackdropResetJssStyle,
  getDialogBackdropTransitionJssStyle,
  getDismissButtonJssStyle,
  dialogGridJssStyle,
  dialogHostJssStyle,
  getScrollerJssStyle,
  getDialogStickyAreaJssStyle,
  getDialogTransitionJssStyle,
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
          ...dialogHostJssStyle,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
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
            ...getDialogStickyAreaJssStyle('header', theme),
            gridColumn: '1/-1',
            zIndex: 3,
          },
        }),
        ...(hasFooter && {
          '&[name=footer]': {
            ...getDialogStickyAreaJssStyle('footer', theme),
            gridColumn: '1/-1',
            zIndex: 2,
          },
        }),
        ...(hasSubFooter && {
          '&[name=sub-footer]': {
            gridColumn: '2/3',
            zIndex: 1,
          },
        }),
      },
      dialog: {
        ...dialogBackdropResetJssStyle,
        ...getDialogBackdropTransitionJssStyle(isOpen, theme),
      },
    },
    scroller: {
      ...getScrollerJssStyle(isPositionStart ? 'start' : 'end', theme),
      ...getDialogTransitionJssStyle(isOpen, isPositionStart ? '>' : '<'),
    },
    flyout: {
      ...dialogGridJssStyle,
      ...getDialogColorJssStyle(theme),
      width: `var(${cssVariableWidth}, fit-content)`,
      minWidth: '320px',
      maxWidth: `var(${cssVariableMaxWidth}, 1180px)`,
    },
    dismiss: {
      ...getDismissButtonJssStyle(theme, isOpen, !isPositionStart),
      gridArea: '1/3',
      zIndex: 4, // ensures dismiss button is above everything
      position: 'sticky',
      insetBlockStart: spacingFluidSmall,
      insetInlineEnd: spacingFluidSmall,
      marginBlockStart: `calc(${spacingFluidMedium} * -1)`,
      justifySelf: 'flex-end',
    },
  });
};
