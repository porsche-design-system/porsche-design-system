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
import { getFocusJssStyle } from '../../styles';
import { getLinkButtonPureStyles } from '../../styles/link-button-pure-styles';

const slottedAnchorStyles: JssStyle = {
  display: 'block',
  position: 'static',
  textDecoration: 'none',
  font: 'inherit',
  color: 'inherit',
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
            // TODO:V3 <p> styles should be removed, we shouldn't support this although some CMS are rendering an <a> with a wrapped <p>. Instead CMS output shall be post processed because it's necessary to use the PDS component anyway.
            '&(p)': {
              margin: 0,
            },
            '&(a)': slottedAnchorStyles,
          },
        },
      }
    )
  );
};

// TODO:V3 ::slotted(a) should be used instead
export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildSlottedStyles(host, {
      // this hack is only needed for Safari which does not support pseudo elements in slotted context (https://bugs.webkit.org/show_bug.cgi?id=178237) :-(
      '& a': getFocusJssStyle({ pseudo: '::before', offset: 1 }),
      // TODO:V3 should be removed, we shouldn't support this although some CMS are rendering an <a> with a wrapped <p>. Instead CMS output shall be post processed because it's necessary to use the PDS component anyway
      '& * a': slottedAnchorStyles,
    })
  );
};
