import { borderRadiusSmall } from '@porsche-design-system/styles';
import { addImportantToEachRule, getFocusJssStyle, getResetInitialStylesForSlottedAnchor } from '../../styles';
import { getLinkButtonPureStyles, offsetHorizontal, offsetVertical } from '../../styles/link-button-pure-styles';
import type { AlignLabel, BreakpointCustomizable, LinkButtonIconName, TextSize, Theme } from '../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: BreakpointCustomizable<AlignLabel>,
  underline: boolean,
  hasSlottedAnchor: boolean,
  theme: Theme
): string => {
  return getCss(
    mergeDeep(
      getLinkButtonPureStyles(
        icon,
        iconSource,
        active,
        false,
        stretch,
        size,
        hideLabel,
        alignLabel,
        underline,
        hasSlottedAnchor,
        theme
      ),
      hasSlottedAnchor && {
        '@global': addImportantToEachRule({
          '::slotted': {
            '&(a)': {
              ...getResetInitialStylesForSlottedAnchor,
              textDecoration: underline ? 'underline' : 'none',
              font: 'inherit',
              color: 'inherit',
            },
            // The clickable area for Safari < ~15 (<= release date: 2021-10-28) is reduced to the slotted anchor itself,
            // since Safari prior to this major release does not support pseudo-elements in the slotted context
            // (https://bugs.webkit.org/show_bug.cgi?id=178237)
            '&(a)::before': {
              content: '""',
              position: 'fixed',
              insetBlock: offsetVertical,
              borderRadius: borderRadiusSmall,
              ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
                insetInline: hideLabelValue ? offsetVertical : offsetHorizontal,
              })),
            },
            ...getFocusJssStyle(theme, { slotted: 'a', pseudo: true, offset: '-2px' }),
          },
        }),
      }
    )
  );
};
