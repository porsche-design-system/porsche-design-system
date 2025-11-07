import { fontLineHeight, frostedGlassStyle } from '@porsche-design-system/styles';
import { colors, getTransition } from '../../styles';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, ButtonVariant, LinkButtonIconName, LinkButtonVariant } from '../../types';
import { getCss, isDisabledOrLoading, isHighContrastMode, mergeDeep } from '../../utils';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';

export const cssVariableInternalButtonScaling = '--p-internal-button-scaling';

type Colors = {
  textColor: string;
  borderColor: string;
  backgroundColor: string;
};
const { frostedColor, disabledColor, contrastHighColor } = colors;
const getDisabledColors = (variant: LinkButtonVariant, loading: boolean): Colors => {
  const colors: {
    [v in LinkButtonVariant]: Colors;
  } = {
    primary: {
      textColor: contrastHighColor,
      borderColor: loading ? contrastHighColor : disabledColor,
      backgroundColor: loading ? contrastHighColor : disabledColor,
    },
    secondary: {
      textColor: disabledColor,
      borderColor: frostedColor,
      backgroundColor: frostedColor,
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
  compact: BreakpointCustomizable<boolean>
): string => {
  const disabledOrLoading = isDisabledOrLoading(disabled, loading);
  const { textColor, borderColor, backgroundColor } = getDisabledColors(variant, loading);
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
        cssVariableInternalButtonScaling
      ),
      {
        root: {
          cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
          ...(disabledOrLoading && {
            backgroundColor,
            borderColor,
            color: textColor,
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
