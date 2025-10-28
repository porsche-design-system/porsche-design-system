import { fontLineHeight, frostedGlassStyle } from '@porsche-design-system/styles';
import { getHighContrastColors, getThemedColors, getTransition, prefersColorSchemeDarkMediaQuery } from '../../styles';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, ButtonVariant, LinkButtonIconName, LinkButtonVariant, Theme } from '../../types';
import { getCss, isDisabledOrLoading, isHighContrastMode, mergeDeep } from '../../utils';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';

export const cssVariableInternalButtonScaling = '--p-internal-button-scaling';

type Colors = {
  textColor: string;
  borderColor: string;
  backgroundColor: string;
};
const getDisabledColors = (variant: LinkButtonVariant, loading: boolean, theme: Theme): Colors => {
  const { contrast50Color, contrast80Color, contrast40Color, frostedColor } = getThemedColors(theme);
  const { canvasColor } = getHighContrastColors();

  const colors: {
    [v in LinkButtonVariant]: Colors;
  } = {
    primary: {
      textColor: isHighContrastMode ? contrast40Color : contrast80Color,
      borderColor: isHighContrastMode ? contrast40Color : loading ? contrast80Color : contrast40Color,
      backgroundColor: isHighContrastMode ? canvasColor : loading ? contrast80Color : contrast40Color,
    },
    secondary: {
      textColor: contrast40Color,
      borderColor: isHighContrastMode ? contrast40Color : loading ? contrast50Color : contrast40Color,
      backgroundColor: isHighContrastMode ? canvasColor : loading ? frostedColor : 'transparent',
    },
    ghost: {
      textColor: contrast40Color,
      borderColor: isHighContrastMode ? contrast40Color : loading ? frostedColor : frostedColor,
      backgroundColor: isHighContrastMode ? canvasColor : loading ? frostedColor : frostedColor,
    },
  };

  return colors[variant];
};

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: ButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  disabled: boolean,
  loading: boolean,
  compact: BreakpointCustomizable<boolean>,
  theme: Theme
): string => {
  const disabledOrLoading = isDisabledOrLoading(disabled, loading);
  const { textColor, borderColor, backgroundColor } = getDisabledColors(variant, loading, theme);
  const {
    textColor: textColorDark,
    borderColor: borderColorDark,
    backgroundColor: backgroundColorDark,
  } = getDisabledColors(variant, loading, 'dark');
  const isPrimary = variant === 'primary';

  return getCss(
    mergeDeep(
      getLinkButtonStyles(
        icon,
        iconSource,
        variant,
        hideLabel,
        disabledOrLoading,
        false,
        compact,
        cssVariableInternalButtonScaling,
        theme
      ),
      {
        root: {
          cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
          ...(disabledOrLoading && {
            backgroundColor,
            borderColor,
            color: textColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundColor: backgroundColorDark,
              borderColor: borderColorDark,
              color: textColorDark,
            }),
          }),
          ...(loading && !isPrimary && frostedGlassStyle),
          margin: 0, // Removes default button margin on safari 15
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
            ...(isPrimary && !isHighContrastMode && { filter: 'invert(1)' }),
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
          ...(!disabled &&
            isPrimary &&
            !isHighContrastMode && {
              filter: 'invert(1)',
            }),
          ...(loading && {
            opacity: 0, // use opacity for smooth transition between states
          }),
        },
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
      }
    )
  );
};
