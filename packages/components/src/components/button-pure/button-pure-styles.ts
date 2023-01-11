import type {
  AlignLabel,
  BreakpointCustomizable,
  LinkButtonPureIconName,
  TextSize,
  TextWeight,
  Theme,
} from '../../types';
import { getCss, mergeDeep } from '../../utils';
import { getLinkButtonPureStyles } from '../../styles/link-button-pure-styles';

export const getComponentCss = (
  icon: LinkButtonPureIconName,
  active: boolean,
  isDisabledOrLoading: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: BreakpointCustomizable<AlignLabel>,
  theme: Theme
): string => {
  return getCss(
    mergeDeep(
      getLinkButtonPureStyles(
        icon,
        active,
        isDisabledOrLoading,
        stretch,
        size,
        weight,
        hideLabel,
        alignLabel,
        false,
        theme
      ),
      {
        root: {
          appearance: 'none',
          textAlign: 'left',
          border: 'none',
          cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
        },
      }
    )
  );
};
