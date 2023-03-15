import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToRule, pxToRemWithUnit } from '../../styles';
import { getThemedTypographyColor } from '../../styles/text-icon-styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import {
  borderRadiusMedium,
  gradientToBottomStyle,
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticXSmall,
  textLargeStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { JssDirections } from '../../styles/jss-direction-styles';
import { getJssDirectionStyle } from '../../styles/jss-direction-styles';
import { getBaseLinkButtonTileStyles } from '../../styles/link-button-tile-styles';
import type { BreakpointCustomizable } from '../../types';
import type {
  LinkTileModelSignatureAspectRatio,
  LinkTileModelSignatureWeight,
} from './link-tile-model-signature-utils';
import { LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS } from './link-tile-model-signature-utils';

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkTileModelSignatureAspectRatio>,
  weight: BreakpointCustomizable<LinkTileModelSignatureWeight>,
  direction: BreakpointCustomizable<JssDirections>,
  hasDescription: boolean
): string => {
  return getCss({
    ...getBaseLinkButtonTileStyles({
      aspectRatio,
      additionalGlobalStyles: {
        [LINK_TILE_MODEL_SIGNATURE_HEADING_TAGS.join(',')]: {
          margin: addImportantToRule(0),
        },
      },
      additionalContentStyles: {
        bottom: 0,
        padding: `${spacingFluidLarge} ${spacingFluidMedium} ${spacingFluidMedium}`,
        gridTemplateRows: 'auto auto',
        gridTemplateColumns: 'auto',
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
      ...(!hasDescription && { color: getThemedTypographyColor('dark', 'primary') }),
      margin: 0,
      ...textLargeStyle,
      ...buildResponsiveStyles(weight, (w: LinkTileModelSignatureWeight) => ({ fontWeight: getFontWeight(w) })),
    },
    ...(hasDescription && {
      'description-group': {
        color: getThemedTypographyColor('dark', 'primary'),
        maxWidth: pxToRemWithUnit(550), // in this case rem unit makes sense to scale up available space
        gap: spacingStaticXSmall,
      },
      description: {
        margin: 0,
        ...textSmallStyle,
      },
    }),
    'link-group': {
      display: 'flex',
      width: '100%',
      gap: spacingFluidSmall,
      ...buildResponsiveStyles(direction, getJssDirectionStyle),
    },
  });
};
