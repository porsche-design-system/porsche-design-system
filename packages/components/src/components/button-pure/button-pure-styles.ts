import type { AlignLabel, BreakpointCustomizable, LinkButtonPureIconName, TextSize, Theme } from '../../types';
import { getCss, hasVisibleIcon, mergeDeep } from '../../utils';
import { getLinkButtonPureStyles } from '../../styles/link-button-pure-styles';
import { fontLineHeight } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  icon: LinkButtonPureIconName,
  active: boolean,
  isLoading: boolean,
  isDisabledOrLoading: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: BreakpointCustomizable<AlignLabel>,
  theme: Theme
): string => {
  const hasIcon = hasVisibleIcon(icon);

  return getCss(
    mergeDeep(
      getLinkButtonPureStyles(icon, active, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, false, theme),
      {
        root: {
          appearance: 'none',
          background: 'transparent',
          textAlign: 'left',
          border: 0,
          padding: 0,
          cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
        },
        ...(!hasIcon &&
          isLoading && {
            label: {
              visibility: 'hidden',
            },
            icon: {
              position: 'absolute',
              top: 0,
              left: `calc(50% - ${fontLineHeight} / 2)`,
              width: fontLineHeight,
              height: fontLineHeight,
            },
          }),
      }
    )
  );
};
