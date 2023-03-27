import type { Styles } from 'jss';
import type { BreakpointCustomizable } from '../../types';
import type { TileAspectRatio } from '../../utils';
import { buildResponsiveStyles } from '../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  getBackfaceVisibilityJssStyle,
  getInsetJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../';
import { borderRadiusMedium, spacingStaticMedium } from '@porsche-design-system/utilities-v2';

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
        ...addImportantToEachRule(hostHiddenStyles),
      },
      ...addImportantToEachRule({
        '::slotted(picture),::slotted(img)': {
          transition: getTransition('transform'), // TODO: why not scale the .image-container?
          ...getBackfaceVisibilityJssStyle(),
        },
        '::slotted(picture)': {
          position: 'absolute',
          ...getInsetJssStyle(),
        },
        '::slotted(img)': {
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        },
      }),
    },
    root: {
      height: 0,
      position: 'relative',
      transform: 'translate3d(0,0,0)', // Change stacking context for position fixed
      ...buildResponsiveStyles(aspectRatio, (ratio: TileAspectRatio) => ({
        paddingTop: aspectRatioPaddingMap[ratio],
      })),
      ...(!isDisabled &&
        hoverMediaQuery({
          '&:hover': {
            '& ::slotted(picture),::slotted(img)': {
              transform: addImportantToRule('scale3d(1.05, 1.05, 1.05)'),
            },
          },
        })),
    },
    'image-container': {
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: borderRadiusMedium,
      transform: 'translateZ(0)', // Fixes Safari rounded corners on hover
      ...getInsetJssStyle(),
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
    },
  };
};
