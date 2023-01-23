import type { BreakpointCustomizable, ButtonVariant, Theme, LinkButtonIconName, LinkButtonVariant } from '../../types';
import {getCss, isDisabledOrLoading, mergeDeep} from '../../utils';
import { getLinkButtonStyles, getFocusOffset } from '../../styles/link-button-styles';
import {
  fontLineHeight, frostedGlassStyle
} from '@porsche-design-system/utilities-v2';
import { getTransition, getThemedColors } from '../../styles';

type Colors = {
  textColor: string;
  borderColor: string;
  backgroundColor: string;
};
const getDisabledColors = (
  variant: LinkButtonVariant,
  loading: boolean,
  disabled: boolean,
  theme: Theme,
): Colors => {
  const { contrastMediumColor, contrastHighColor, disabledColor, hoverColor } =
    getThemedColors(theme);

  const colors: {
    [v in Exclude<LinkButtonVariant, 'tertiary'>]: Colors;
  } = {
    primary: {
      textColor: contrastHighColor,
      borderColor:  loading ? contrastHighColor : disabled && disabledColor,
      backgroundColor: loading ? contrastHighColor : disabled && disabledColor,
    },
    secondary: {
      textColor: disabledColor,
      borderColor: loading ? contrastMediumColor : disabled && disabledColor,
      backgroundColor: loading ? hoverColor : disabled && 'transparent',
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
  loading: boolean,
  theme: Theme
): string => {

  const disabledOrLoading = isDisabledOrLoading(disabled, loading);
  const { textColor, borderColor, backgroundColor } = getDisabledColors(variant, loading, disabled, theme);
  const isTertiary = variant === 'tertiary';
  const isSecondary = variant === 'secondary';

  return getCss(
    mergeDeep(
      getLinkButtonStyles(icon, iconSource, variant, hideLabel, disabledOrLoading,false, theme),
      {
        root: {
          cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
          ...(disabledOrLoading && {
            backgroundColor,
            borderColor,
            color: textColor,
          }),
          ...((loading && (isSecondary || isTertiary)) && {
            ...frostedGlassStyle,
            '&:focus::before': {
              ...getFocusOffset(true),
            },
          }),
        },
        ...(loading && {
          spinner: {
            width: fontLineHeight,
            height: fontLineHeight,
            pointerEvents: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }),
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
