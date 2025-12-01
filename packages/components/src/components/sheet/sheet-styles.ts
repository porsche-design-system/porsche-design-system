import {
  borderRadiusLarge,
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
  getDialogTransitionJssStyle,
  getScrollerJssStyle,
} from '../../styles/dialog-styles';
import { getCss } from '../../utils';

export const getComponentCss = (isOpen: boolean, hasDismissButton: boolean): string => {
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
      slot: {
        display: 'block',
        gridColumn: '2/3',
        zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
      },
      dialog: getDialogJssStyle(isOpen, 'shading'),
    },
    scroller: getScrollerJssStyle('fullscreen'),
    sheet: {
      ...dialogGridJssStyle,
      ...getDialogColorJssStyle(),
      ...getDialogTransitionJssStyle(isOpen, '^'),
      width: '100%',
      alignSelf: 'flex-end',
      marginBlockStart: spacingFluidLarge, // ensures minimal space at the top to visualize paper sheet like border top radius in case sheet becomes scrollable
      borderTopLeftRadius: borderRadiusLarge,
      borderTopRightRadius: borderRadiusLarge,
    },
    ...(hasDismissButton && {
      dismiss: {
        ...dismissButtonJssStyle,
        gridArea: '1/3',
        zIndex: 2, // ensures dismiss button is above header and content
        position: 'sticky',
        insetBlockStart: spacingFluidSmall,
        marginBlockStart: `calc(${spacingFluidMedium} * -1)`,
        marginInlineEnd: spacingFluidSmall,
        placeSelf: 'flex-start flex-end',
      },
    }),
  });
};
