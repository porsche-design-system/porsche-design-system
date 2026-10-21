import { radiusFull, radiusLg, ref } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, getFocusBaseStyles } from '../../styles';
import { getLinkButtonPureStyles, offsetHorizontal, offsetVertical } from '../../styles/link-button-pure-styles';
import type { AlignLabel, BreakpointCustomizable, LinkButtonIconName } from '../../types';
import { buildResponsiveBooleanStyles, getCss, mergeDeep } from '../../utils';
import type { LinkPureColor, LinkPureSize } from './link-pure-utils';

/**
 * @css-variable {"name": "--p-link-pure-px", "description": "Horizontal padding of the link. Enlarges the clickable and focusable area.", "defaultValue": "0px"}
 */
const cssVarPaddingInline = '--p-link-pure-px';

/**
 * @css-variable {"name": "--p-link-pure-py", "description": "Vertical padding of the link. Enlarges the clickable and focusable area.", "defaultValue": "0px"}
 */
const cssVarPaddingBlock = '--p-link-pure-py';

/**
 * @css-variable {"name": "--p-link-pure-hover-inset-x", "description": "Horizontal inset of the hover, active and focus indicator.", "defaultValue": "-4px"}
 */
const cssVarHoverInsetInline = '--p-link-pure-hover-inset-x';

/**
 * @css-variable {"name": "--p-link-pure-hover-inset-y", "description": "Vertical inset of the hover, active and focus indicator.", "defaultValue": "-2px"}
 */
const cssVarHoverInsetBlock = '--p-link-pure-hover-inset-y';

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
        hasSlottedAnchor,
        cssVarPaddingInline,
        cssVarPaddingBlock,
        cssVarHoverInsetInline,
        cssVarHoverInsetBlock
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
              insetBlock: ref(cssVarHoverInsetBlock, offsetVertical),
              ...buildResponsiveBooleanStyles(hideLabel, (hideLabelValue: boolean) => ({
                insetInline: hideLabelValue
                  ? ref(cssVarHoverInsetBlock, offsetVertical)
                  : ref(cssVarHoverInsetInline, offsetHorizontal),
                borderRadius: hideLabelValue ? ref(radiusFull) : ref(radiusLg),
              })),
            },
            '&(a:focus-visible)::before': getFocusBaseStyles(),
          },
        }),
      }
    )
  );
};
