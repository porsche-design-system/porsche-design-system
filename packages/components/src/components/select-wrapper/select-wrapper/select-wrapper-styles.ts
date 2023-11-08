import { type BreakpointCustomizable, type Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, colorSchemeStyles, getTransition, hostHiddenStyles } from '../../../styles';
import { getBaseChildStyles } from '../../../styles/form-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { type FormState } from '../../../utils/form/form-state';
import {
  borderWidthBase,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles2';

const controlBarWidth = '54px';

const inputSafeZone = '9px'; // to have same distance vertically and horizontally for button/icon in combination with input
const inputSafeZoneWithBorder = `calc(${inputSafeZone} + ${borderWidthBase})`;

export const getComponentCss = (
  isDisabled: boolean,
  hasCustomDropdown: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      // ::slotted(select)
      ...addImportantToEachRule(
        getBaseChildStyles('select', state, theme, {
          gridArea: '1/1/1/7',
          position: 'static',
          zIndex: 0, // TODO: overrides global style.css in e2e and vrts
          cursor: 'pointer',
          paddingBlock: spacingStaticSmall,
          paddingInline: `${spacingStaticMedium} ${controlBarWidth}`,
          ...(hasCustomDropdown && !isDisabled && { borderColor: 'transparent' }),
        })
      ),
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: `${inputSafeZoneWithBorder} auto minmax(0, 1fr) auto auto ${inputSafeZoneWithBorder}`,
    },
    icon: {
      position: 'relative',
      zIndex: 2, // ensures icon is above input or button of select dropdown
      pointerEvents: 'none',
      gridArea: '1/5',
      placeSelf: 'center',
      padding: spacingStaticXSmall,
      transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
      transition: getTransition('transform'),
      '&--open': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
    },
    dropdown: {
      gridArea: '1/1/1/7',
    },
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
