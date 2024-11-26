import {
  getMediaQueryMin,
  motionDurationLong,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  spacingStaticSmall,
} from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import { FLYOUT_Z_INDEX } from '../../../constants';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  getBackdropJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getFlyoutDialogResetJssStyle } from '../../../styles/flyout-dialog-reset-styles';
import { type Theme, getCss, isThemeDark } from '../../../utils';

export const cssVariableVisibility = '--p-internal-flyout-multilevel-visibility';
export const cssVariableVisibilityTransitionDuration = '--p-internal-flyout-multilevel-visibility-transition-duration';

export const frostedGlassHeaderHeight = '4rem';

export const scrollerWidthEnhancedView = 'clamp(338px, 10.52vw + 258px, 460px)';
export const mediaQueryEnhancedView = getMediaQueryMin('s');

export const getComponentCss = (
  isDialogOpen: boolean,
  isPrimary: boolean,
  isSecondaryScrollerVisible: boolean,
  activeIdentifier: string,
  theme: Theme
): string => {
  const { backgroundColor } = getThemedColors(theme);
  const { backgroundColor: backgroundColorDark } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...(!isDialogOpen && {
            [cssVariableVisibility]: 'hidden',
          }),
          ...getBackdropJssStyle(isDialogOpen, FLYOUT_Z_INDEX, theme),
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      slot: {
        ...(isPrimary && {
          '--_p-flyout-multilevel-button': 'block',
        }),
        overflow: 'hidden auto',
        visibility: `var(${cssVariableVisibility},${isSecondaryScrollerVisible ? 'hidden' : 'inherit'})`,
        backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          backgroundColor: backgroundColorDark,
        }),
        ...(isPrimary
          ? {
              display: 'grid',
              gap: spacingFluidXSmall,
              gridArea: '1/1',
            }
          : {
              display: 'grid',
              gridTemplateColumns: 'subgrid',
              gridArea: '1/1/1/3',
            }),

        [mediaQueryEnhancedView]: {
          visibility: 'inherit',
        },
      },
      ...preventFoucOfNestedElementsStyles,
      dialog: {
        ...getFlyoutDialogResetJssStyle(),
        inset: '0',
        display: 'grid',
        overflow: 'hidden',
        width: 'auto',
        maxWidth: '100vw',
        background: 'none',
        [mediaQueryEnhancedView]: {
          gridTemplateColumns: `repeat(${isSecondaryScrollerVisible ? 2 : 1}, ${scrollerWidthEnhancedView}) auto`,
          gridTemplateRows: '100vh',
          insetInlineEnd: 'auto', // to have correct dialog dimensions for ideal transitions
        },
        '&::backdrop': {
          opacity: 0, // to support backdrop click for modern browsers supporting ::backdrop
        },
      },
    },
    dismiss: {
      padding: spacingFluidSmall,
      [mediaQueryEnhancedView]: {
        '--p-internal-icon-filter': 'invert(1)',
        margin: spacingFluidSmall,
        padding: spacingStaticSmall,
      },
    },
  });
};
