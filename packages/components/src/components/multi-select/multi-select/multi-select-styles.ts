import { borderWidthBase, spacingStaticSmall, spacingStaticXSmall } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { formElementPaddingHorizontal, getCalculatedFormElementPaddingHorizontal } from '../../../styles/form-styles';
import { getNoResultsOptionJssStyle } from '../../../styles/option-styles';
import {
  getButtonJssStyle,
  getButtonLabelJssStyle,
  getIconJssStyle,
  getPopoverJssStyle,
  getPopoverKeyframesStyles,
} from '../../../styles/select';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss, isThemeDark } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';

// TODO: Implement compact scaling & compact mode
export const cssVarInternalMultiSelectScaling = '--p-internal-select-scaling';

export const getComponentCss = (
  isOpen: boolean,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme
): string => {
  // TODO: Implement compact scaling & compact mode
  const scalingVar = `var(${cssVarInternalMultiSelectScaling}, ${1})`;
  const { contrastHighColor, backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);
  const { contrastHighColor: contrastHighColorDark, backgroundSurfaceColor: backgroundSurfaceColorDark } =
    getThemedColors('dark');

  return getCss({
    '@global': {
      // @keyframes fade-in
      ...getPopoverKeyframesStyles,
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      button: {
        ...getButtonJssStyle('multi-select', isOpen, isDisabled, state, false, scalingVar, theme),
        '& span': getButtonLabelJssStyle,
        '& > *': { gridRow: 1 },
      },
      '[popover]': getPopoverJssStyle(isOpen, 1, 44, theme),
    },
    root: {
      display: 'grid',
      gap: `max(2px, ${scalingVar} * ${spacingStaticXSmall})`,
      // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(1rem + ${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(2)})`,
    },
    filter: {
      position: 'sticky',
      top: `calc(max(2px, ${scalingVar} * 6px) * -1)`,
      padding: `max(2px, ${scalingVar} * 6px)`,
      margin: `calc(max(2px, ${scalingVar} * 6px) * -1)`,
      background: isThemeDark(theme) ? backgroundSurfaceColor : backgroundColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        background: backgroundSurfaceColorDark,
      }),
      zIndex: 1,
    },
    options: {
      display: 'flex',
      flexDirection: 'column',
      gap: `max(2px, ${scalingVar} * ${spacingStaticSmall})`,
    },
    // TODO: extract (maybe even as functional component) and re-use in multi-select and select-wrapper
    // TODO: Align with select
    'no-results': {
      padding: `${spacingStaticSmall} 12px`,
      boxSizing: 'border-box',
      color: contrastHighColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrastHighColorDark,
      }),
      ...getNoResultsOptionJssStyle(),
    },
    icon: getIconJssStyle('select', isOpen),
    // TODO: maybe we should extract it as functional component too
    'sr-only': getHiddenTextJssStyle(),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
