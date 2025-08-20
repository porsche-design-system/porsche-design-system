import { borderWidthBase, spacingStaticXSmall } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { formElementPaddingHorizontal, getCalculatedFormElementPaddingHorizontal } from '../../../styles/form-styles';
import {
  getButtonJssStyle,
  getButtonLabelJssStyle,
  getFilterJssStyle,
  getIconJssStyle,
  getOptionsJssStyle,
  getPopoverJssStyle,
  getPopoverKeyframesStyles,
} from '../../../styles/select';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentNoResultsOptionStyles } from '../../common/no-results-option/no-results-option-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { cssVarInternalOptgroupScaling } from '../../optgroup/optgroup-styles';
import { cssVarInternalMultiSelectOptionScaling } from '../multi-select-option/multi-select-option-styles';

export const cssVarInternalMultiSelectScaling = '--p-internal-multi-select-scaling';

export const getComponentCss = (
  isOpen: boolean,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  theme: Theme
): string => {
  const scalingVar = `var(${cssVarInternalMultiSelectScaling}, ${compact ? 0.5 : 1})`;

  return getCss({
    '@global': {
      // @keyframes fade-in
      ...getPopoverKeyframesStyles,
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          [`${cssVarInternalMultiSelectOptionScaling}`]: scalingVar,
          [`${cssVarInternalOptgroupScaling}`]: scalingVar,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      button: {
        ...getButtonJssStyle('multi-select', isOpen, isDisabled, state, scalingVar, theme),
        '& span': getButtonLabelJssStyle,
      },
      '[popover]': getPopoverJssStyle(isOpen, scalingVar, 44, theme),
    },
    root: {
      display: 'grid',
      gap: `max(2px, ${scalingVar} * ${spacingStaticXSmall})`,
      // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(1rem + ${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(2)})`,
    },
    filter: getFilterJssStyle(scalingVar, theme),
    options: getOptionsJssStyle(scalingVar),
    icon: getIconJssStyle('multi-select', isOpen),
    // .no-results / .sr-only
    ...getFunctionalComponentNoResultsOptionStyles('multi-select-option', scalingVar, theme),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
