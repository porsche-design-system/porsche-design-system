import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getTransition, pxToRemWithUnit } from '../../../styles';
import { getBaseChildStyles, getLabelStyles } from '../../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import type { FormState } from '../../../utils/form/form-state';
import { hostHiddenStyles } from '../../../styles/host-hidden-styles';
import { spacingStaticMedium } from '../../../../../utilities/projects/utilities';

export const OPTION_HEIGHT = 40; // optgroups are higher and ignored

export const getComponentCss = (
  isDisabled: boolean,
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
        padding: `8px ${pxToRemWithUnit(47)} 8px ${spacingStaticMedium}`,
        '&@-moz-document url-prefix()': {
          // fix for 3px text-indention in FF
          paddingLeft: pxToRemWithUnit(8),
        },
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
