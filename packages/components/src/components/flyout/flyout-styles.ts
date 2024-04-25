import { getCss, type Theme } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getDialogColorJssStyle,
  getModalDialogBackdropResetJssStyle,
  getModalDialogBackdropTransitionJssStyle,
  getModalDialogDismissButtonJssStyle,
  getModalDialogGridJssStyle,
  getModalDialogHeadingJssStyle,
  getModalDialogScrollerJssStyle,
  getModalDialogStickyAreaJssStyle,
  getModalDialogTransitionJssStyle,
  hostHiddenStyles,
} from '../../styles';
import { gridGap, spacingFluidLarge, spacingFluidMedium, spacingFluidSmall } from '@porsche-design-system/utilities-v2';
import type { FlyoutPosition } from './flyout-utils';

const cssVariableWidth = '--p-flyout-width';
const cssVariableMaxWidth = '--p-flyout-max-width';

export const headerShadowClass = 'header--shadow';
export const footerShadowClass = 'footer--shadow';

const headingTags = 'h1,h2,h3,h4,h5,h6';

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
          // TODO: align with Modal
          // needed for correct alignment of the Porsche Grid within the Flyout
          '--pds-internal-grid-outer-column': `calc(${spacingFluidLarge} - ${gridGap})`,
          '--pds-internal-grid-margin': `calc(${spacingFluidLarge} * -1)`,
          // ...getBackdropJssStyle(isOpen, FLYOUT_Z_INDEX, theme),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      [`::slotted(:is(${headingTags}))`]: {
        margin: 0,
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
          gridArea: '3/1/auto/-1',
          // gridArea: '2/1/4/-1',
          zIndex: 1, // ensures header is above content but below sticky dismiss button
        },
        'slot[name=heading],h1,h2,h3,h4,h5,h6,.foo': {
          gridArea: '3/3',
          zIndex: 0, // ensures header isn't above sticky footer or dismiss button
        },
        'slot[name=heading],h1,h2,h3,h4,h5,h6': getModalDialogHeadingJssStyle(),
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
          // ...getModalDialogStickyAreaJssStyle('footer', theme),
          marginTop: spacingFluidMedium,
          gridArea: '6/3',
          zIndex: 2, // ensures footer is above header and content but below sticky dismiss button
        },
      }),
      dialog: {
        ...getModalDialogBackdropResetJssStyle(),
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
      ...getDialogColorJssStyle(theme),
      ...getModalDialogGridJssStyle(),
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
