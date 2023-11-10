import { type JssStyle, type Styles } from 'jss';
import { type BreakpointCustomizable } from '../../../utils/breakpoint-customizable';
import { buildResponsiveStyles, type Theme } from '../../../utils';
import {
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import { fontSizeTextXSmall, spacingStaticXSmall, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentRequiredStyles } from '../required/required-styles';

// TODO: when duplication of label-styles.ts is removed, build of components-js fails
export const getFunctionalComponentLabelStyles = (
  isDisabledOrLoading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  theme: Theme,
  additionalDefaultJssStyle?: JssStyle,
  additionalIsShownJssStyle?: JssStyle
): Styles => {
  const { primaryColor, disabledColor, contrastHighColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    contrastHighColor: contrastHighColorDark,
  } = getThemedColors('dark');

  return {
    label: {
      ...textSmallStyle,
      cursor: 'pointer',
      justifySelf: 'flex-start', // ensures label is not getting stretched by flex or grid context of its parent
      color: isDisabledOrLoading ? disabledColor : primaryColor,
      transition: getTransition('color'), // for smooth transitions between e.g. disabled state
      ...buildResponsiveStyles(hideLabel, (isHidden: boolean) =>
        getHiddenTextJssStyle(isHidden, additionalIsShownJssStyle)
      ),
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: isDisabledOrLoading ? disabledColorDark : primaryColorDark,
      }),
      '&+&': {
        cursor: 'unset',
        marginTop: `-${spacingStaticXSmall}`,
        fontSize: fontSizeTextXSmall,
        ...(!isDisabledOrLoading && {
          color: contrastHighColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrastHighColorDark,
          }),
        }),
      },
      ...additionalDefaultJssStyle,
    },
    // .required
    ...getFunctionalComponentRequiredStyles(),
  } as const;
};
