import { addImportantToEachRule, addImportantToRule, getFocusBaseStyles } from '../../styles';
import { legacyRadiusSmall, radiusFull, radiusLg, radiusXl } from '../../styles/css-variables';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, LinkButtonIconName, LinkVariant } from '../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';

const cssVariableInternalLinkScaling = '--_p-link-a';

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasSlottedAnchor: boolean,
  isCompact: BreakpointCustomizable<boolean>
): string => {
  return getCss(
    mergeDeep(
      getLinkButtonStyles(
        icon,
        iconSource,
        variant,
        hideLabel,
        false,
        hasSlottedAnchor,
        isCompact,
        cssVariableInternalLinkScaling
      ),
      {
        label: {
          clip: addImportantToRule('unset'), // to overrule breakpoint customizable hide-label style
        },
      },
      hasSlottedAnchor && {
        '@global': addImportantToEachRule({
          '::slotted': {
            '&(a)': {
              all: 'unset',
            },
            '&(a)::before': {
              content: '""',
              position: 'fixed',
              inset: 0,
              ...mergeDeep(
                buildResponsiveStyles(isCompact, (compactValue: boolean) => ({
                  borderRadius: `var(${legacyRadiusSmall}, ${compactValue ? radiusLg : radiusXl})`,
                })),
                buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
                  ...(hideLabelValue && {
                    borderRadius: `var(${legacyRadiusSmall}, ${radiusFull})`,
                  }),
                }))
              ),
            },
            '&(a:focus-visible)::before': getFocusBaseStyles(),
          },
        }),
      }
    )
  );
};
