import { getCss, mergeDeep } from '../../utils';
import { getLinkButtonStyles } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, LinkVariant, Theme, LinkButtonIconName } from '../../types';
import { addImportantToEachRule, getThemedColors } from '../../styles';
import { borderRadiusMedium, borderWidthBase } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  icon: LinkButtonIconName,
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasSlottedAnchor: boolean,
  theme: Theme
): string => {
  const { focusColor } = getThemedColors(theme);

  return getCss(
    mergeDeep(
      getLinkButtonStyles(icon, variant, hideLabel, false, hasSlottedAnchor, theme),
      {
        ...(hasSlottedAnchor && {
          '@global': addImportantToEachRule({
            '::slotted': {
              '&(a)': {
                outline: 0,
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                lineHeight: 'inherit',
              },
              '&(a)::before': {
                content: '""',
                position: 'fixed',
                top: '-4px',
                right: '-4px',
                bottom: '-4px',
                left: '-4px',
                borderRadius: borderRadiusMedium,
              },
              // TODO: combine link-social-styles with link-button-styles and tabs-bar-styles
              '&(a::-moz-focus-inner)': {
                border: 0,
              },
              '&(a:focus)::before': {
                border: `${borderWidthBase} solid ${focusColor}`,
              },
              '&(a:focus:not(:focus-visible))::before': {
                border: 0,
              },
            },
          })
        })
      }
    )
  );
};
