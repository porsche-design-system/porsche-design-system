import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToRule, getInsetJssStyle } from '../../styles';
import { getThemedTypographyColor } from '../../styles/text-icon-styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import {
  borderRadiusMedium,
  gradientToBottomStyle,
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  textLargeStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { GroupDirection } from '../../styles/group-direction-styles';
import { getGroupDirectionJssStyles } from '../../styles/group-direction-styles';
import { getTileStyles } from '../../styles/tile-styles';
import type { BreakpointCustomizable } from '../../types';
import type {
  LinkTileModelSignatureAspectRatio,
  LinkTileModelSignatureWeight,
} from './link-tile-model-signature-utils';
import { LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS } from './link-tile-model-signature-utils';

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkTileModelSignatureAspectRatio>,
  weight: BreakpointCustomizable<LinkTileModelSignatureWeight>,
  direction: BreakpointCustomizable<GroupDirection>,
  hasDescription: boolean
): string => {
  return getCss({
    ...getTileStyles({
      aspectRatio,
      additionalGlobalStyles: {
        [LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS.join(',')]: {
          margin: addImportantToRule(0),
        },
      },
      additionalContentStyles: {
        display: 'flex',
        flexDirection: 'column',
        bottom: 0,
        padding: `${spacingFluidLarge} ${spacingFluidMedium} ${spacingFluidMedium}`,
        ...gradientToTopStyle,
      },
    }),
    model: {
      position: 'absolute',
      padding: spacingFluidMedium,
      borderRadius: borderRadiusMedium,
      top: 0,
      left: 0,
      right: 0,
      ...gradientToBottomStyle,
    },
    heading: {
      color: getThemedTypographyColor('dark', 'primary'),
      margin: 0,
      ...textLargeStyle,
      ...buildResponsiveStyles(weight, (w: LinkTileModelSignatureWeight) => ({ fontWeight: getFontWeight(w) })),
    },
    ...(hasDescription && {
      description: {
        color: getThemedTypographyColor('dark', 'primary'),
        margin: '-12px 0 0 ',
        ...textSmallStyle,
      },
    }),
    'link-group': {
      display: 'flex',
      width: '100%',
      gap: spacingFluidSmall,
      ...buildResponsiveStyles(direction, getGroupDirectionJssStyles),
    },
    // is used for expanded click-area only
    'link-overlay': {
      position: 'fixed',
      ...getInsetJssStyle(0),
      outline: 0,
    },
  });
};
