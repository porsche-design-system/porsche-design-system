import { getCss, mergeDeep } from '../../utils';
import { getLinkButtonStyles, getFocusOffset } from '../../styles/link-button-styles';
import type { BreakpointCustomizable, LinkVariant, Theme, LinkButtonIconName } from '../../types';
import { addImportantToEachRule, getThemedColors } from '../../styles';
import { borderRadiusMedium, borderWidthBase } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasSlottedAnchor: boolean,
  theme: Theme
): string => {
  const { focusColor } = getThemedColors(theme);

  return getCss(
    mergeDeep(
      getLinkButtonStyles(icon, iconSource, variant, hideLabel, false, hasSlottedAnchor, theme),
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
                borderRadius: borderRadiusMedium,
                ...getFocusOffset(false),
              },
              '&(a:hover)::before': { // needed due to new stacking context because of `backdrop-filter` css property
                ...getFocusOffset(true),
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
