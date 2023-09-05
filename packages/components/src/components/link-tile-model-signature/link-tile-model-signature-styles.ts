import type { JssStyle } from 'jss';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToRule, getInsetJssStyle } from '../../styles';
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
import { getTileBaseStyles } from '../../styles/tile/tile-base-styles';
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
  const tileBaseStyles = getTileBaseStyles(aspectRatio);

  return getCss({
    ...tileBaseStyles,
    '@global': {
      ...(tileBaseStyles['@global'] as JssStyle),
      [LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS.join(',')]: {
        margin: addImportantToRule(0),
      },
    },
    content: {
      ...(tileBaseStyles.content as JssStyle),
      flexDirection: 'column',
      bottom: 0,
      padding: `${spacingFluidLarge} ${spacingFluidMedium} ${spacingFluidMedium}`,
      ...gradientToTopStyle,
    },
    model: {
      position: 'absolute',
      top: spacingFluidMedium,
      left: spacingFluidMedium,
    },
    heading: {
      margin: 0,
      font: textLargeStyle.font,
      overflowWrap: 'break-word',
      ...buildResponsiveStyles(weight, (w: LinkTileModelSignatureWeight) => ({ fontWeight: getFontWeight(w) })),
    },
    ...(hasDescription && {
      description: {
        margin: '-12px 0 0 ', // TODO: perhaps gap should be overridden instead
        font: textSmallStyle.font,
        overflowWrap: 'break-word',
      },
    }),
    'link-group': {
      display: 'flex',
      width: '100%',
      gap: spacingFluidSmall,
      ...buildResponsiveStyles(direction, getGroupDirectionJssStyles),
    },
    'link-overlay': {
      // covers entire tile, used for expanded click-area only
      position: 'fixed',
      ...getInsetJssStyle(),
    },
  });
};
