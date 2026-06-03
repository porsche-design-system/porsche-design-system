import { addImportantToEachRule, addImportantToRule, getFocusBaseStyles } from '../../styles';
import { radiusFull, radiusLg, radiusXl, ref } from '@porsche-design-system/stylesheets';
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
                  borderRadius: compactValue ? ref(radiusLg) : ref(radiusXl),
                })),
                buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
                  ...(hideLabelValue && {
                    borderRadius: ref(radiusFull),
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
