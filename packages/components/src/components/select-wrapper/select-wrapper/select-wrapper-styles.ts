import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, colorSchemeStyles, getTransition, hostHiddenStyles } from '../../../styles';
import { getBaseChildStyles, getLabelStyles } from '../../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../../common/required/required-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import type { FormState } from '../../../utils/form/form-state';
import { borderWidthBase, spacingStaticMedium, spacingStaticSmall } from '@porsche-design-system/utilities-v2';

const controlBarWidth = '54px';

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
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      },
      ...getBaseChildStyles('select', state, theme, {
        position: 'static',
        zIndex: 0, // TODO: overrides global style.css in e2e and vrts
        cursor: 'pointer',
        paddingBlock: spacingStaticSmall,
        paddingInline: `${spacingStaticMedium} ${controlBarWidth}`,
        ...(hasCustomDropdown && !isDisabled && { borderColor: 'transparent' }),
      }),
    }),
    root: {
      position: 'relative',
    },
    ...getLabelStyles(
      'select',
      isDisabled,
      hideLabel,
      state,
      theme,
      {
        icon: {
          gridArea: '3 / 2',
          placeSelf: 'center',
          transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
          transition: getTransition('transform'),
          '&--open': {
            transform: 'rotate3d(0,0,1,180deg)',
          },
        },
      },
      {
        gridTemplateColumns: `minmax(0, 1fr) calc(${controlBarWidth} + ${borderWidthBase})`,
      }
    ),
    ...getFunctionalComponentRequiredStyles(),
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
