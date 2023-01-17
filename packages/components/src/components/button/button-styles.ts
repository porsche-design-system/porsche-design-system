import type { BreakpointCustomizable, ButtonVariant, Theme, LinkButtonIconName, LinkButtonVariant } from '../../types';
import { getCss, mergeDeep } from '../../utils';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import {
  fontLineHeight
} from '@porsche-design-system/utilities-v2';
import { getTransition, getThemedColors } from '../../styles';

type Colors = {
  textColor: string;
  borderColor: string;
  backgroundColor: string;
};
const getDisabledColors = (
  variant: LinkButtonVariant,
  theme: Theme,
): Colors => {
  const { contrastHighColor, disabledColor } =
    getThemedColors(theme);

  const colors: {
    [v in Exclude<LinkButtonVariant, 'tertiary'>]: Colors;
  } = {
    primary: {
      textColor: contrastHighColor,
      borderColor: disabledColor,
      backgroundColor: disabledColor,
    },
    secondary: {
      textColor: disabledColor,
      borderColor: disabledColor,
      backgroundColor: 'transparent',
    },
  };

  return colors[variant === 'tertiary' ? 'secondary' : variant];
};

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: ButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  disabled: boolean,
  isDisabledOrLoading: boolean,
  loading: boolean,
  theme: Theme
): string => {

  const { textColor, borderColor, backgroundColor } = getDisabledColors(variant, theme);

  return getCss(
    mergeDeep(
      getLinkButtonStyles(icon, iconSource, variant, hideLabel, isDisabledOrLoading,false, theme),
      {
        root: {
          cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
          ...(disabled && {
            backgroundColor,
            borderColor,
            color: textColor,
          })
        },
        spinner: {
          width: fontLineHeight,
          height: fontLineHeight,
          pointerEvents: 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        label: {
          transition: getTransition('opacity'),
          ...(loading && {
            opacity: 0,
          }),
        },
        icon: {
          transition: getTransition('opacity'),
          ...(loading && {
            opacity: 0,
          }),
        }
      }
    )
  );
};
