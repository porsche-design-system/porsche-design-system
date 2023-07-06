import type { BreakpointCustomizable, ButtonVariant, LinkButtonIconName, LinkButtonVariant, Theme } from '../../types';
import { getCss, isHighContrastMode, isDisabledOrLoading, mergeDeep } from '../../utils';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import { fontLineHeight, frostedGlassStyle } from '@porsche-design-system/utilities-v2';
import { getHighContrastColors, getThemedColors, getTransition } from '../../styles';

type Colors = {
  textColor: string;
  borderColor: string;
  backgroundColor: string;
};
const getDisabledColors = (variant: LinkButtonVariant, loading: boolean, theme: Theme): Colors => {
  const { contrastMediumColor, contrastHighColor, disabledColor, hoverColor } = getThemedColors(theme);
  const { canvasColor } = getHighContrastColors();

  const colors: {
    [v in Exclude<LinkButtonVariant, 'tertiary'>]: Colors;
  } = {
    primary: {
      textColor: isHighContrastMode ? disabledColor : contrastHighColor,
      borderColor: isHighContrastMode ? disabledColor : loading ? contrastHighColor : disabledColor,
      backgroundColor: isHighContrastMode ? canvasColor : loading ? contrastHighColor : disabledColor,
    },
    secondary: {
      textColor: disabledColor,
      borderColor: isHighContrastMode ? disabledColor : loading ? contrastMediumColor : disabledColor,
      backgroundColor: isHighContrastMode ? canvasColor : loading ? hoverColor : 'transparent',
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
  const { textColor, borderColor, backgroundColor } = getDisabledColors(variant, loading, theme);
  const isPrimary = variant === 'primary';

  return getCss(
    mergeDeep(getLinkButtonStyles(icon, iconSource, variant, hideLabel, disabledOrLoading, false, theme), {
      root: {
        cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
        ...(disabledOrLoading && {
          backgroundColor,
          borderColor,
          color: textColor,
        }),
        ...(loading && !isPrimary && frostedGlassStyle),
      },
      ...(loading && {
        spinner: {
          width: fontLineHeight,
          height: fontLineHeight,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      }),
      label: {
        transition: getTransition('opacity'),
        ...(loading && {
          opacity: 0, // use opacity for smooth transition between states
        }),
      },
      icon: {
        transition: getTransition('opacity'),
        ...(loading && {
          opacity: 0, // use opacity for smooth transition between states
        }),
      },
    })
  );
};
