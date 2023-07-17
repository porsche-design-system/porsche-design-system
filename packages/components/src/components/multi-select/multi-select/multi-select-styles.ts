import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  spacingStaticMedium,
  textSmallStyle,
} from '../../../../../utilities/projects/utilities';
import { Styles } from 'jss';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { FormState } from '../../../utils/form/form-state';
import { getLabelStyles } from '../../../styles/form-styles';
import { SelectDropdownDirectionInternal } from '../../../utils/select/dropdown';

export const getComponentCss = (
  direction: SelectDropdownDirectionInternal,
  isOpen: boolean,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor, backgroundColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const isDirectionDown = direction === 'down';

  return getCss({
    '@global': addImportantToEachRule({
      ':host': {
        display: 'block',
        position: 'relative',
        ...hostHiddenStyles,
      },
      ...getInputJSSStyles(),
    }),
    'input-container': {
      display: 'flex',
      color: primaryColor,
      background: backgroundColor,
      transition: ['color', 'border-color', 'background-color'].map(getTransition).join(), // for smooth transitions between e.g. disabled states
      cursor: isDisabled ? 'not-allowed' : 'text',
      ...hoverMediaQuery({
        '&:not(:disabled):hover': {
          borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
        },
      }),
      border: `${borderWidthBase} solid ${isOpen ? primaryColor : formStateColor || contrastMediumColor}`,
      borderRadius: borderRadiusSmall,
      ...(isOpen && {
        [isDirectionDown ? 'borderBottom' : 'borderTop']: addImportantToRule(`1px solid ${contrastMediumColor}`),
        [isDirectionDown ? 'borderBottomLeftRadius' : 'borderTopLeftRadius']: 0,
        [isDirectionDown ? 'borderBottomRightRadius' : 'borderTopRightRadius']: 0,
      }),
    },
    ...getLabelStyles('select', isDisabled, hideLabel, state, theme),
    icon: {
      padding: '13px 15px',
      transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
      transition: getTransition('transform'),
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      '&--open': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
    },
  });
};

const getInputJSSStyles = (): Styles => {
  return {
    input: {
      flex: 1,
      padding: `13px ${spacingStaticMedium}`,
      boxSizing: 'border-box',
      border: '0', // done via container
      outline: '0',
      appearance: 'none',
      background: 'transparent',
      ...textSmallStyle,
    },
  };
};
