import { fontLineHeight } from '@porsche-design-system/styles';
import { colors, getTransition } from '../../styles';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, ButtonVariant, LinkButtonIconName } from '../../types';
import { getCss, isDisabledOrLoading, mergeDeep } from '../../utils';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';

export const cssVariableInternalButtonScaling = '--p-internal-button-scaling';

const { frostedSoftColor, contrastLowColor } = colors;

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
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
          ...(disabledOrLoading && {
            cursor: 'not-allowed',
            backgroundColor: frostedSoftColor,
            borderColor: frostedSoftColor,
            color: contrastLowColor,
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
            opacity: 0, // use opacity for smooth transition between states
          }),
        },
        icon: {
          transition: getTransition('opacity'),
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
