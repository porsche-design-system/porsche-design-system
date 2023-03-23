import type { JssStyle, Styles } from 'jss';
import type { BreakpointCustomizable } from '../types';
import { buildResponsiveStyles } from '../utils';
import {
  addImportantToEachRule,
  getBackfaceVisibilityJssStyle,
  getInsetJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from './';
import { borderRadiusMedium, spacingStaticMedium } from '@porsche-design-system/utilities-v2';
import type { TileAspectRatio } from '../utils';

const aspectRatioPaddingMap: Record<TileAspectRatio, string> = {
  '1:1': '100%',
  '4:3': '75%',
  '3:4': '133.33%',
  '16:9': '56.25%',
  '9:16': '177.75%',
};

export const getTileBaseStyles = (opts: {
  aspectRatio: BreakpointCustomizable<TileAspectRatio>;
  isDisabled?: boolean;
  additionalHostStyles?: JssStyle;
  additionalGlobalStyles?: Styles;
  additionalContentStyles?: JssStyle;
}): Styles => {
  const { aspectRatio, isDisabled, additionalHostStyles, additionalGlobalStyles, additionalContentStyles } = opts;

  return {
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
          ...additionalHostStyles,
        }),
      },
      ...addImportantToEachRule({
        '::slotted(picture),::slotted(img)': {
          transition: getTransition('transform'),
          ...getBackfaceVisibilityJssStyle(),
        },
        '::slotted(picture)': {
          position: 'absolute',
          ...getInsetJssStyle(0),
        },
        '::slotted(img)': {
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        },
      }),
      ...additionalGlobalStyles,
    },
    root: {
      height: 0,
      position: 'relative',
      transform: 'translate3d(0,0,0)', // Change stacking context for position fixed
      ...(!isDisabled &&
        hoverMediaQuery({
          '&:hover': {
            '& ::slotted(picture),::slotted(img)': addImportantToEachRule({
              transform: 'scale3d(1.05, 1.05, 1.05)',
            }),
          },
        })),
      ...buildResponsiveStyles(aspectRatio, (ratio: TileAspectRatio) => ({
        paddingTop: aspectRatioPaddingMap[ratio],
      })),
    },
    'image-container': {
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: borderRadiusMedium,
      transform: 'translateZ(0)', // Fixes Safari rounded corners on hover
      ...getInsetJssStyle(0),
    },
    content: {
      position: 'absolute',
      left: 0,
      right: 0,
      justifyItems: 'start',
      borderRadius: borderRadiusMedium,
      gap: spacingStaticMedium,
      '@media (forced-colors: active)': {
        background: 'rgba(0,0,0,0.7)',
      },
      ...additionalContentStyles,
    },
  };
};
