import { radiusFull, radiusLg, radiusXl, ref } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, addImportantToRule, getFocusBaseStyles } from '../../styles';
import { getCoverStyles, getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, LinkButtonIconName } from '../../types';
import { buildResponsiveBooleanStyles, getCss, mergeDeep } from '../../utils';
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

/**
 * @css-variable {"name": "--p-link-px", "description": "Horizontal padding of the link.", "defaultValue": ""}
 */
const cssVarPaddingInline = '--p-link-px';

/**
 * @css-variable {"name": "--p-link-py", "description": "Vertical padding of the link.", "defaultValue": ""}
 */
const cssVarPaddingBlock = '--p-link-py';

/**
 * @css-variable {"name": "--p-link-gap", "description": "Gap between the link's content (label and icon).", "defaultValue": ""}
 */
const cssVarGap = '--p-link-gap';

/**
 * @css-variable {"name": "--p-link-radius", "description": "Radius of the link", "defaultValue": ""}
 */
const cssVarRadius = '--p-link-radius';

/**
 * @css-variable {"name": "--p-link-cover-radius", "description": "Corner radius of the clickable area and its focus ring when `cover` is set, e.g. the radius of the card the link covers. Within a `p-tile`, it follows the radius of the Tile.", "defaultValue": "radius of a surrounding p-tile, otherwise 0"}
 */
const cssVarCoverRadius = '--p-link-cover-radius';

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasSlottedAnchor: boolean,
  isCompact: BreakpointCustomizable<boolean>,
  isCover = false
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
        cssVarForeground,
        cssVarPaddingInline,
        cssVarPaddingBlock,
        cssVarGap,
        cssVarRadius,
        isCover,
        cssVarCoverRadius
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
            '&(a)::before': isCover
              ? getCoverStyles(cssVarCoverRadius)
              : {
                  content: '""',
                  position: 'fixed',
                  inset: 0,
                  ...mergeDeep(
                    buildResponsiveBooleanStyles(isCompact, (compactValue: boolean) => ({
                      borderRadius: ref(cssVarRadius, compactValue ? ref(radiusLg) : ref(radiusXl)),
                    })),
                    buildResponsiveBooleanStyles(hideLabel, (hideLabelValue: boolean) => ({
                      ...(hideLabelValue && {
                        borderRadius: ref(cssVarRadius, ref(radiusFull)),
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
