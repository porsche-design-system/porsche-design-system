import { buildResponsiveStyles, getCss } from '../../utils';
import { pxToRemWithUnit } from '../../styles';
import { getThemedTypographyColor } from '../../styles/text-icon-styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import {
  gradientToTopStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticXSmall,
  textLargeStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getJssDirectionStyle } from '../../styles/jss-direction-styles';
import { getBaseLinkButtonTileStyles } from '../../styles/link-button-tile-styles';
import type { JssDirections } from '../../styles/jss-direction-styles';
import type { BreakpointCustomizable } from '../../types';
import type { LinkTileModelAspectRatio } from './link-tile-model-utils';
import type { LinkButtonTileWeight } from '../../styles/link-button-tile-styles';

export const getComponentCss = (
  aspectRatio: BreakpointCustomizable<LinkTileModelAspectRatio>,
  weight: BreakpointCustomizable<LinkButtonTileWeight>,
  direction: BreakpointCustomizable<JssDirections>,
  hasSubDescription: boolean
): string => {
  return getCss({
    ...getBaseLinkButtonTileStyles({
      aspectRatio,
      additionalContentStyles: {
        bottom: 0,
        padding: `${spacingFluidLarge} ${spacingFluidMedium} ${spacingFluidMedium}`,
        gridTemplateRows: 'auto auto',
        gridTemplateColumns: 'auto',
        ...gradientToTopStyle,
      },
    }),
    signature: {
      position: 'absolute',
      top: spacingFluidMedium,
      left: spacingFluidMedium,
    },
    description: {
      margin: 0,
      ...textLargeStyle,
      ...buildResponsiveStyles(weight, (w: LinkButtonTileWeight) => ({ fontWeight: getFontWeight(w) })),
    },
    ...(hasSubDescription && {
      'description-group': {
        color: getThemedTypographyColor('dark', 'primary'),
        maxWidth: pxToRemWithUnit(550), // in this case rem unit makes sense to scale up available space
        gap: spacingStaticXSmall,
      },
      'sub-description': {
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
