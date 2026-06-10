import { ref, spacingStaticXs } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../../styles';
import { formElementPaddingHorizontal, getCalculatedFormElementPaddingHorizontal } from '../../../styles/form-styles';
import {
  getButtonImageJssStyle,
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
import {
  getFunctionalComponentLabelAfterStyles,
  getFunctionalComponentLabelStyles,
} from '../../common/label/label-styles';
import { getFunctionalComponentNoResultsOptionStyles } from '../../common/no-results-option/no-results-option-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { cssVarInternalOptgroupScaling } from '../../optgroup/optgroup-styles';
import { cssVarInternalSelectOptionScaling } from '../select-option/select-option-styles';

export const cssVarInternalSelectScaling = '--_p-select-a';

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
          [`${cssVarInternalSelectScaling}`]: isCompact ? 0.64285714 : 1,
          [`${cssVarInternalSelectOptionScaling}`]: isCompact ? 0.64285714 : 1,
          [`${cssVarInternalOptgroupScaling}`]: isCompact ? 0.64285714 : 1,
          ...hostHiddenStyles,
        }),
      },
      ...getFunctionalComponentLabelAfterStyles(),
      ...preventFoucOfNestedElementsStyles,
      button: {
        ...getButtonJssStyle('select', isOpen, isDisabled, state, isCompact, cssVarInternalSelectScaling),
        '& img': getButtonImageJssStyle,
        '& span': getButtonLabelJssStyle,
      },
      '[popover]': getPopoverJssStyle(isOpen, cssVarInternalSelectScaling, 40),
      '::slotted([slot="filter"])': addImportantToEachRule(getFilterJssStyle(cssVarInternalSelectScaling)),
      'slot[name="selected"]': getSelectedSlotJssStyle,
    },
    root: {
      display: 'grid',
      gap: ref(spacingStaticXs),
      // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(1rem + ${formElementPaddingHorizontal} + 1px * 2 + ${getCalculatedFormElementPaddingHorizontal(1)})`,
    },
    filter: getFilterJssStyle(cssVarInternalSelectScaling),
    options: getOptionsJssStyle(cssVarInternalSelectScaling),
    icon: getIconJssStyle(isOpen),
    // .no-results / .sr-only
    ...getFunctionalComponentNoResultsOptionStyles('select-option', cssVarInternalSelectScaling),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, false, hideLabel),
    // .message
    ...getFunctionalComponentStateMessageStyles(state),
  });
};
