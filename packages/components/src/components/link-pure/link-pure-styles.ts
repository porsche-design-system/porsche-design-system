import { addImportantToEachRule, getFocusBaseStyles } from '../../styles';
import { legacyRadiusSmall, radiusSm } from '../../styles/css-variables';
import { getLinkButtonPureStyles, offsetHorizontal, offsetVertical } from '../../styles/link-button-pure-styles';
import type { AlignLabel, BreakpointCustomizable, LinkButtonIconName, TextSize } from '../../types';
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
  hasSlottedAnchor: boolean
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
        hasSlottedAnchor
      ),
      hasSlottedAnchor && {
        '@global': addImportantToEachRule({
          '::slotted': {
            '&(a)': {
              all: 'unset',
            },
            '&(a)::before': {
              content: '""',
              position: 'fixed',
              insetBlock: offsetVertical,
              borderRadius: `var(${legacyRadiusSmall}, ${radiusSm})`,
              ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
                insetInline: hideLabelValue ? offsetVertical : offsetHorizontal,
              })),
            },
            '&(a:focus-visible)::before': getFocusBaseStyles(),
          },
        }),
      }
    )
  );
};
