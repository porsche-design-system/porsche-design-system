import { type Styles } from 'jss';
import { type BreakpointCustomizable } from '../../../utils/breakpoint-customizable';
import { type FormState } from '../../../utils/form/form-state';
import { buildResponsiveStyles, type Theme } from '../../../utils';
import {
  addImportantToRule,
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { fontSizeTextXSmall, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { type ChildSelector } from '../../../styles/form-styles';
import { getFunctionalComponentRequiredStyles } from '../required/required-styles';

export const getFunctionalComponentLabelStyles = (
  child: ChildSelector,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  theme: Theme
): Styles => {
  const { primaryColor, disabledColor, contrastHighColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    contrastHighColor: contrastHighColorDark,
  } = getThemedColors('dark');
  const { formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors('dark', state);

  return {
    ...getFunctionalComponentRequiredStyles(),
    label: {
      ...buildResponsiveStyles(hideLabel, (isHidden: boolean) => getHiddenTextJssStyle(isHidden)),
      ...textSmallStyle,
      color: isDisabled ? disabledColor : primaryColor,
      transition: getTransition('color'), // for smooth transitions between e.g. disabled states
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: isDisabled ? disabledColorDark : primaryColorDark,
      }),
      ...hoverMediaQuery({
        '&:hover': {
          [`& ~ .wrapper ::slotted(${child}:not(:disabled):not(:focus):not([readonly]))`]: {
            borderColor: addImportantToRule(formStateHoverColor || primaryColor),
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: addImportantToRule(formStateHoverColorDark || primaryColorDark),
            }),
          },
        },
      }),
      '&+&': {
        marginTop: `-${spacingStaticXSmall}`,
        fontSize: fontSizeTextXSmall,
        ...(!isDisabled && {
          color: contrastHighColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrastHighColorDark,
          }),
        }),
      },
    },
  } as const;
};
