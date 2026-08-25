import { radiusFull, radiusLg, radiusXl, ref } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, addImportantToRule, getFocusBaseStyles } from '../../styles';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, LinkButtonIconName } from '../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../utils';
import type { LinkVariant } from './link-utils';

const cssVariableInternalLinkScaling = '--_p-link-a';

/**
 * @css-variable {"name": "--p-link-bg", "description": "Overrides the background color of the link in every state, including hover. You are responsible for ensuring sufficient contrast and brand compliance.", "defaultValue": ""}
 */
const cssVarBackground = '--p-link-bg';

/**
 *  @css-variable {"name": "--p-link-fg", "description": "Overrides the foreground color (label and icon) of the link in every state, including hover. You are responsible for ensuring sufficient contrast and brand compliance.", "defaultValue": ""}
 */
const cssVarForeground = '--p-link-fg';

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
        cssVariableInternalLinkScaling,
        cssVarBackground,
        cssVarForeground
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
