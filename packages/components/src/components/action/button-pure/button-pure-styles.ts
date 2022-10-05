import type {
  AlignLabel,
  BreakpointCustomizable,
  LinkButtonPureIconName,
  TextSize,
  TextWeight,
  ThemeExtendedElectricDark,
} from '../../../types';
import { getCss, mergeDeep } from '../../../utils';
import { getLinkButtonPureStyles } from '../../../styles/link-button-pure-styles';

export const getComponentCss = (
  icon: LinkButtonPureIconName,
  active: boolean,
  isDisabledOrLoading: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: AlignLabel,
  hasSubline: boolean,
  theme: ThemeExtendedElectricDark
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
        hasSubline,
        false,
        theme
      ),
      {
        '@global': {
          '::slotted(p)': {
            margin: 0,
          },
        },
      }
    )
  );
};
