import { borderRadiusSmall } from '@porsche-design-system/styles';
import { addImportantToEachRule, addImportantToRule, getFocusBaseStyles } from '../../styles';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, LinkButtonIconName, LinkVariant } from '../../types';
import { getCss, mergeDeep } from '../../utils';

const cssVariableInternalLinkScaling = '--p-internal-link-scaling';

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasSlottedAnchor: boolean,
  compact: BreakpointCustomizable<boolean>
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
        compact,
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
              borderRadius: borderRadiusSmall,
            },
            '&(a:focus-visible)::before': getFocusBaseStyles(),
          },
        }),
      }
    )
  );
};
