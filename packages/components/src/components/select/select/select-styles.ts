import { borderWidthBase, spacingStaticXSmall } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { formElementPaddingHorizontal, getCalculatedFormElementPaddingHorizontal } from '../../../styles/form-styles';
import {
  getButtonImageJssStyle,
  getButtonJssStyle,
  getButtonLabelJssStyle,
  getIconJssStyle,
  getOptionJssStyle,
  getOptionListJssStyle,
  getSelectDropdownJssStyle,
  getSelectDropdownKeyframesStyles,
} from '../../../styles/select';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';

export const cssVarInternalSelectScaling = '--p-internal-select-scaling';

export const getComponentCss = (
  isOpen: boolean,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  hasFilter: boolean,
  theme: Theme,
  hasSlottedImage: boolean
): string => {
  const scalingVar = `var(${cssVarInternalSelectScaling}, ${compact ? 0.5 : 1})`;

  return getCss({
    '@global': {
      // @keyframes fade-in
      ...getSelectDropdownKeyframesStyles,
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      '::slotted(*)': addImportantToEachRule({
        '--p-internal-select-option-scaling': scalingVar,
        '--p-internal-optgroup-scaling': scalingVar,
      }),
      ...preventFoucOfNestedElementsStyles,
      button: {
        ...getButtonJssStyle('select', isOpen, isDisabled, state, hasSlottedImage, scalingVar, theme),
        '& img': getButtonImageJssStyle,
        '& span': getButtonLabelJssStyle,
      },
      '[popover]': getSelectDropdownJssStyle(isOpen, scalingVar, 40, hasFilter, theme),
    },
    root: {
      display: 'grid',
      gap: `max(2px, ${scalingVar} * ${spacingStaticXSmall})`,
      // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(1rem + ${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(1)})`,
    },
    options: getOptionListJssStyle(scalingVar),
    'no-results': getOptionJssStyle('select-option', scalingVar, theme),
    icon: getIconJssStyle('select', isOpen),
    'sr-only': getHiddenTextJssStyle(),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
