import { fontLineHeight } from '@porsche-design-system/emotion';
import { getDisabledBaseStyles, getTransition } from '../../styles';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, ButtonVariant, LinkButtonIconName } from '../../types';
import { getCss, isDisabledOrLoading, mergeDeep } from '../../utils';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';

export const cssVariableInternalButtonScaling = '--p-internal-button-scaling';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: ButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabled: boolean,
  isLoading: boolean,
  isCompact: BreakpointCustomizable<boolean>
): string => {
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  return getCss(
    mergeDeep(
      getLinkButtonStyles(
        icon,
        iconSource,
        variant,
        hideLabel,
        disabledOrLoading,
        false,
        isCompact,
        cssVariableInternalButtonScaling
      ),
      {
        root: {
          ...(disabledOrLoading && {
            cursor: 'not-allowed',
          }),
          ...(isDisabled && {
            ...getDisabledBaseStyles(),
          }),
        },
        ...(isLoading && {
          spinner: {
            width: fontLineHeight,
            height: fontLineHeight,
            pointerEvents: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'inherit',
          },
        }),
        label: {
          transition: getTransition('opacity'),
          ...(isLoading && {
            opacity: 0, // use opacity for smooth transition between states
          }),
          ...(isDisabled && {
            ...getDisabledBaseStyles(),
          }),
        },
        icon: {
          transition: getTransition('opacity'),
          ...(isLoading && {
            opacity: 0, // use opacity for smooth transition between states
          }),
          ...(isDisabled && {
            ...getDisabledBaseStyles(),
          }),
        },
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
      }
    )
  );
};
