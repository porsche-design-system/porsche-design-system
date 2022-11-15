import type { JssStyle } from 'jss';
import type {
  AlignLabel,
  BreakpointCustomizable,
  LinkButtonPureIconName,
  TextSize,
  TextWeight,
  ThemeExtendedElectricDark,
} from '../../types';
import { buildSlottedStyles, getCss, mergeDeep } from '../../utils';
import { getFocusJssStyle, getInsetJssStyle } from '../../styles';
import { getLinkButtonPureStyles } from '../../styles/link-button-pure-styles';

const slottedAnchorStyles: JssStyle = {
  display: 'block',
  position: 'static',
  textDecoration: 'none',
  font: 'inherit',
  color: 'inherit',
  outline: 0,
};

export const getComponentCss = (
  icon: LinkButtonPureIconName,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: AlignLabel,
  hasSubline: boolean,
  hasSlottedAnchor: boolean,
  theme: ThemeExtendedElectricDark
): string => {
  return getCss(
    mergeDeep(
      getLinkButtonPureStyles(
        icon,
        active,
        false,
        stretch,
        size,
        weight,
        hideLabel,
        alignLabel,
        hasSubline,
        hasSlottedAnchor,
        theme
      ),
      {
        '@global': {
          '::slotted': {
            '&(a)': slottedAnchorStyles,
            '&(a)::before': {
              content: '""',
              position: 'absolute',
              ...getInsetJssStyle(),
              outline: '1px solid transparent',
              outlineOffset: '1px',
            },
            '&(a:focus)::before': {
              outlineColor: 'currentColor',
            },
            '&(a:focus:not(:focus-visible))::before': {
              outlineColor: 'transparent',
            },
          },
        },
      }
    )
  );
};

// TODO:V3 should be removed completely, we shouldn't support this although some CMS are rendering an <a> with a wrapped <p>. Instead CMS output shall be post processed because it's necessary to use the PDS component anyway
export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      '& > p': {
        margin: 0,
      },
      '& * a': {
        ...slottedAnchorStyles,
        ...getFocusJssStyle({ pseudo: '::before', offset: 1 }),
      },
    })
  );
};
