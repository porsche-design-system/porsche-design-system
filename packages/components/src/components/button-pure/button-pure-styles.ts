import type { AlignLabel, BreakpointCustomizable, LinkButtonPureIconName, TextSize, Theme } from '../../types';
import { getCss, mergeDeep } from '../../utils';
import { getLinkButtonPureStyles } from '../../styles/link-button-pure-styles';

export const getComponentCss = (
  icon: LinkButtonPureIconName,
  active: boolean,
  isDisabledOrLoading: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: BreakpointCustomizable<AlignLabel>,
  theme: Theme
): string => {
  return getCss(
    mergeDeep(
      getLinkButtonPureStyles(icon, active, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, false, theme),
      {
        root: {
          appearance: 'none',
          background: 'transparent',
          textAlign: 'left',
          border: 0,
          cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
        },
      }
    )
  );
};
