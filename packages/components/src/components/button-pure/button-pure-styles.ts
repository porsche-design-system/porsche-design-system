import type { AlignLabel, BreakpointCustomizable, LinkButtonIconName, TextSize, Theme } from '../../types';
import { getCss, hasVisibleIcon, mergeDeep } from '../../utils';
import { getLinkButtonPureStyles } from '../../styles/link-button-pure-styles';
import { fontLineHeight } from '@porsche-design-system/utilities-v2';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  active: boolean,
  isLoading: boolean,
  isDisabledOrLoading: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: BreakpointCustomizable<AlignLabel>,
  theme: Theme
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
        hideLabel,
        alignLabel,
        false,
        theme
      ),
      {
        root: {
          WebkitAppearance: 'none', // iOS safari
          appearance: 'none',
          background: 'transparent',
          textAlign: 'start',
          border: 0,
          cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
        },
        ...(!hasIcon &&
          isLoading && {
            label: {
              opacity: 0, // use opacity for smooth transition between states and to keep accessible name available
            },
            icon: {
              position: 'absolute',
              top: 0,
              left: `calc(50% - ${fontLineHeight} / 2)`,
              width: fontLineHeight,
              height: fontLineHeight,
            },
          }),
        ...getFunctionalComponentLoadingMessageStyles(),
      }
    )
  );
};
