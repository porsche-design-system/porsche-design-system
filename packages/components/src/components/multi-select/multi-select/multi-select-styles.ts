import { borderWidthBase, spacingStaticXSmall } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getDisabledBaseStyles,
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
  getSelectedSlotJssStyle,
} from '../../../styles/select';
import type { BreakpointCustomizable } from '../../../types';
import { getCss } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentNoResultsOptionStyles } from '../../common/no-results-option/no-results-option-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { cssVarInternalOptgroupScaling } from '../../optgroup/optgroup-styles';
import { cssVarInternalMultiSelectOptionScaling } from '../multi-select-option/multi-select-option-styles';

export const cssVarInternalMultiSelectScaling = '--p-internal-multi-select-scaling';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  isOpen: boolean,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isCompact: boolean
): string => {
  return getCss({
    '@global': {
      // @keyframes fade-in
      ...getPopoverKeyframesStyles,
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          [`${cssVarInternalMultiSelectScaling}`]: isCompact ? 0.64285714 : 1,
          [`${cssVarInternalMultiSelectOptionScaling}`]: isCompact ? 0.64285714 : 1,
          [`${cssVarInternalOptgroupScaling}`]: isCompact ? 0.64285714 : 1,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...(isDisabled && getDisabledBaseStyles()),
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      button: {
        ...getButtonJssStyle('multi-select', isOpen, isDisabled, state, isCompact, cssVarInternalMultiSelectScaling),
        '& span': getButtonLabelJssStyle,
      },
      '[popover]': getPopoverJssStyle(isOpen, cssVarInternalMultiSelectScaling, 44),
      '::slotted([slot="filter"])': addImportantToEachRule(getFilterJssStyle(cssVarInternalMultiSelectScaling)),
      'slot[name="selected"]': getSelectedSlotJssStyle,
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
      // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(1rem + ${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(2)})`,
    },
    filter: getFilterJssStyle(cssVarInternalMultiSelectScaling),
    options: getOptionsJssStyle(cssVarInternalMultiSelectScaling),
    icon: getIconJssStyle(isOpen),
    // .no-results / .sr-only
    ...getFunctionalComponentNoResultsOptionStyles('multi-select-option', cssVarInternalMultiSelectScaling),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
  });
};
