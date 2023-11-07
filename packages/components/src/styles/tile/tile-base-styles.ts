import type { Styles } from 'jss';
import type { BreakpointCustomizable } from '../../types';
import type { TileAspectRatio } from '../../utils';
import { buildResponsiveStyles } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getInsetJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../';
import { borderRadiusLarge, spacingStaticMedium } from '@porsche-design-system/utilities-v2';
import { getThemedTypographyColor } from '../text-icon-styles';

const aspectRatioPaddingMap: Record<TileAspectRatio, string> = {
  '1:1': '100%',
  '4:3': '75%',
  '3:4': '133.33%',
  '16:9': '56.25%',
  '9:16': '177.75%',
};

export const getTileBaseStyles = (
  aspectRatio: BreakpointCustomizable<TileAspectRatio>,
  isDisabled?: boolean
): Styles => {
  return {
    '@global': {
      ':host': {
        display: 'block',
        hyphens: 'auto',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...addImportantToEachRule({
        '::slotted': {
          '&(picture)': {
            position: 'absolute',
            ...getInsetJssStyle(),
          },
          '&(img)': {
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          },
        },
      }),
    },
    root: {
      position: 'relative',
      overflow: 'hidden',
      transform: 'translate3d(0,0,0)', // change stacking context for position fixed
      borderRadius: borderRadiusLarge,
      color: getThemedTypographyColor('dark', 'primary'),
      ...buildResponsiveStyles(aspectRatio, (ratio: TileAspectRatio) => ({
        paddingTop: aspectRatioPaddingMap[ratio],
      })),
      ...(!isDisabled &&
        hoverMediaQuery({
          '&:hover .image-container': {
            transform: 'scale3d(1.05,1.05,1.05)',
          },
        })),
    },
    'image-container': {
      position: 'absolute',
      transition: getTransition('transform', 'motionDurationModerate'),
      ...getInsetJssStyle(),
    },
    content: {
      position: 'absolute',
      left: 0,
      right: 0,
      display: 'flex',
      justifyItems: 'start',
      gap: spacingStaticMedium,
      borderRadius: borderRadiusLarge, // for gradient
      '@media (forced-colors: active)': {
        background: 'rgba(0,0,0,0.7)',
      },
    },
  };
};
