import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToRule, getInsetJssStyle } from '../../styles';
import { getThemedTypographyColor } from '../../styles/text-icon-styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import {
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  textLargeStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getGroupDirectionJssStyles } from '../../styles/group-direction-styles';
import { getTileBaseStyles } from '../../styles/tile-base-styles';
import type { BreakpointCustomizable } from '../../types';
import type {
  LinkTileModelSignatureAspectRatio,
  LinkTileModelSignatureWeight,
  LinkTileModelSignatureLinkDirection,
} from './link-tile-model-signature-utils';
import { LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS } from './link-tile-model-signature-utils';

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkTileModelSignatureAspectRatio>,
  weight: BreakpointCustomizable<LinkTileModelSignatureWeight>,
  direction: BreakpointCustomizable<LinkTileModelSignatureLinkDirection>,
  hasDescription: boolean
): string => {
  return getCss({
    ...getTileBaseStyles({
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
      top: spacingFluidMedium,
      left: spacingFluidMedium,
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
