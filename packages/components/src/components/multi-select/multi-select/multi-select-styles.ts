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
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '../../../../../utilities/projects/utilities';
import { Styles } from 'jss';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { FormState } from '../../../utils/form/form-state';
import { getLabelStyles } from '../../../styles/form-styles';
import { SelectDropdownDirectionInternal } from '../../../utils/select/select-dropdown';
import { getPlaceholderStyles } from '../../../styles/placeholder';
import { getNoResultsOptionJSSStyles } from '../../../styles/select/option-styles';

const inputYPadding = '13px';

export const getComponentCss = (
  hasSelection: boolean,
  direction: SelectDropdownDirectionInternal,
  isOpen: boolean,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme
): string => {
  const { primaryColor, contrastMediumColor, contrastHighColor, backgroundColor } = getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const isDirectionDown = direction === 'down';

  return getCss({
    '@global': addImportantToEachRule({
      ':host': {
        display: 'block',
        position: 'relative',
        ...hostHiddenStyles,
      },
      ...getInputJSSStyles(isDisabled, theme),
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
    ...getLabelStyles('select', isDisabled, hideLabel, state, theme, undefined, { marginBottom: spacingStaticXSmall }),
    icon: {
      padding: `${inputYPadding} 15px`, // Horizontal padding spacingStaticMedium - 1px for visual balance
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    },
    ['reset-icon']: {
      display: hasSelection ? 'block' : 'none',
    },
    ['toggle-icon']: {
      transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
      transition: getTransition('transform'),
      '&--open': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
    },
    ['no-results']: {
      padding: `${spacingStaticSmall} 12px`,
      color: contrastHighColor,
      boxSizing: 'border-box',
      ...getNoResultsOptionJSSStyles(),
    },
  });
};

const getInputJSSStyles = (isDisabled: boolean, theme: Theme): Styles => {
  const { primaryColor, disabledColor } = getThemedColors(theme);

  return {
    input: {
      flex: 1,
      padding: `${inputYPadding} ${spacingStaticMedium}`,
      boxSizing: 'border-box',
      border: '0', // done via container
      outline: '0',
      appearance: 'none',
      background: 'transparent',
      ...textSmallStyle,
      textOverflow: 'ellipsis',
      '&:not(:focus)': {
        ...getPlaceholderStyles({ color: primaryColor }),
      },
      ...(isDisabled && getPlaceholderStyles({ color: disabledColor })),
    },
  };
};
