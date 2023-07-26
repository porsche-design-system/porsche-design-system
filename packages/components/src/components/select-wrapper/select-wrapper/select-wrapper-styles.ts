import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getTransition, hostHiddenStyles } from '../../../styles';
import { getBaseChildStyles, getLabelStyles } from '../../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import type { FormState } from '../../../utils/form/form-state';
import {
  borderWidthBase,
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
} from '../../../../../utilities/projects/utilities';
export const ICON_SPACE = `${24 + 13 * 2 + 2}px`; // 24px = icon width, 13px * 2 = padding, 2px = border

export const getComponentCss = (
  isDisabled: boolean,
  hasCustomDropdown: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme
): string => {
  return getCss({
    '@global': addImportantToEachRule({
      ':host': {
        display: 'block',
        ...hostHiddenStyles,
      },
      ...getBaseChildStyles('select', state, theme, {
        position: 'static',
        zIndex: 0, // TODO: overrides global style.css in e2e and vrts
        cursor: 'pointer',
        padding: `8px calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2) 8px ${spacingStaticMedium}`,
        ...(hasCustomDropdown && !isDisabled && { borderColor: 'transparent' }),
      }),
    }),
    root: {
      display: 'block',
      position: 'relative',
    },
    ...getLabelStyles('select', isDisabled, hideLabel, state, theme, {
      icon: {
        position: 'absolute',
        bottom: '13px',
        right: '15px',
        transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
        transition: getTransition('transform'),
        '&--open': {
          transform: 'rotate3d(0,0,1,180deg)',
        },
      },
    }),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
