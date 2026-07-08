import { ref, spacingStaticXs } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../../styles';
import { formElementPaddingHorizontal, getCalculatedFormElementPaddingHorizontal } from '../../../styles/form-styles';
import {
  getButtonCssStyle,
  getButtonLabelCssStyle,
  getFilterCssStyle,
  getIconCssStyle,
  getOptionsCssStyle,
  getPopoverCssStyle,
  getPopoverKeyframesStyles,
  getSelectedSlotCssStyle,
} from '../../../styles/select';
import type { BreakpointCustomizable } from '../../../types';
import { getCss } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import {
  getFunctionalComponentLabelAfterStyles,
  getFunctionalComponentLabelStyles,
} from '../../common/label/label-styles';
import { getFunctionalComponentNoResultsOptionStyles } from '../../common/no-results-option/no-results-option-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { cssVarInternalOptgroupScaling } from '../../optgroup/optgroup-styles';
import { cssVarInternalMultiSelectOptionScaling } from '../multi-select-option/multi-select-option-styles';

export const cssVarInternalMultiSelectScaling = '--_p-multi-select-a';

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
          ...hostHiddenStyles,
        }),
      },
      ...getFunctionalComponentLabelAfterStyles(),
      ...preventFoucOfNestedElementsStyles,
      button: {
        ...getButtonCssStyle('multi-select', isOpen, isDisabled, state, isCompact, cssVarInternalMultiSelectScaling),
        '& span': getButtonLabelCssStyle,
      },
      '[popover]': getPopoverCssStyle(isOpen, cssVarInternalMultiSelectScaling, 44),
      '::slotted([slot="filter"])': addImportantToEachRule(getFilterCssStyle(cssVarInternalMultiSelectScaling)),
      'slot[name="selected"]': getSelectedSlotCssStyle,
    },
    root: {
      display: 'grid',
      gap: ref(spacingStaticXs),
      // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(1rem + ${formElementPaddingHorizontal} + 1px * 2 + ${getCalculatedFormElementPaddingHorizontal(2)})`,
    },
    filter: getFilterCssStyle(cssVarInternalMultiSelectScaling),
    options: getOptionsCssStyle(cssVarInternalMultiSelectScaling),
    icon: getIconCssStyle(isOpen),
    // .no-results / .sr-only
    ...getFunctionalComponentNoResultsOptionStyles('multi-select-option', cssVarInternalMultiSelectScaling),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, false, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
  });
};
