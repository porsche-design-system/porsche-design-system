import { addImportantToEachRule, getFocusBaseStyles } from '../../styles';
import { legacyRadiusSmall, radiusSm } from '../../styles/css-variables';
import { getLinkButtonPureStyles, offsetHorizontal, offsetVertical } from '../../styles/link-button-pure-styles';
import type { AlignLabel, BreakpointCustomizable, LinkButtonIconName } from '../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
import type { LinkPureColor, LinkPureSize } from './link-pure-utils';

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<LinkPureSize>,
  color: LinkPureColor,
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
        color,
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
