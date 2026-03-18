import { colorContrastLow, leadingNormal } from '../../styles/css-variables';
import { getLinkButtonPureStyles } from '../../styles/link-button-pure-styles';
import type { AlignLabel, BreakpointCustomizable, LinkButtonIconName, TextSize } from '../../types';
import { getCss, hasVisibleIcon, mergeDeep } from '../../utils';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import type { ButtonPureColor } from './button-pure-utils';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  active: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  isDisabledOrLoading: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  color: ButtonPureColor,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: BreakpointCustomizable<AlignLabel>,
  underline: boolean
): string => {
  const hasIcon = hasVisibleIcon(icon, iconSource);

  return getCss(
    mergeDeep(
      getLinkButtonPureStyles(
        icon,
        iconSource,
        active,
        isDisabledOrLoading,
        stretch,
        size,
        color,
        hideLabel,
        alignLabel,
        underline,
        false
      ),
      {
        root: {
          ...(isDisabled && {
            color: colorContrastLow,
          }),
          ...(isDisabledOrLoading && {
            cursor: 'not-allowed',
          }),
        },
        ...(!hasIcon &&
          isLoading && {
            label: {
              opacity: 0, // use opacity for smooth transition between states and to keep accessible name available
            },
            icon: {
              position: 'absolute',
              top: 0,
              left: `calc(50% - ${leadingNormal} / 2)`,
            },
          }),
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
      }
    )
  );
};
