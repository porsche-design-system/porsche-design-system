// TODO: unit test this
import type { JssStyle, Styles } from 'jss';
import type { BreakpointCustomizable } from '../utils/breakpoint-customizable';
import {
  addImportantToEachRule,
  getBackfaceVisibilityJssStyle,
  getInsetJssStyle,
  getTransition,
} from './common-styles';
import { buildResponsiveStyles } from '../utils';
import { borderRadiusMedium, spacingStaticMedium } from '@porsche-design-system/utilities-v2';
import { hostHiddenStyles } from './host-hidden-styles';
import { hoverMediaQuery } from './hover-media-query';
import type { LinkTileAspectRatio } from '../components/link-tile/link-tile-utils';

const aspectRatioPaddingTop: Record<LinkTileAspectRatio, string> = {
  '1:1': '100%',
  '4:3': '75%',
  '3:4': '133.33%',
  '16:9': '56.25%',
  '9:16': '177.75%',
};

export const getBaseLinkButtonTileStyles = (opts: {
  aspectRatio: BreakpointCustomizable<LinkTileAspectRatio>;
  additionalGlobalStyles?: JssStyle;
  additionalContentStyles?: JssStyle;
}): Styles => {
  const { aspectRatio, additionalGlobalStyles, additionalContentStyles } = opts;

  return {
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
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
      ...hoverMediaQuery({
        '&:hover': {
          '& ::slotted(picture),::slotted(img)': addImportantToEachRule({
            transform: 'scale3d(1.05, 1.05, 1.05)',
          }),
        },
      }),
      ...buildResponsiveStyles(aspectRatio, (ratio: LinkTileAspectRatio) => ({
        paddingTop: aspectRatioPaddingTop[ratio],
      })),
    },
    content: {
      display: 'grid',
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
    'image-container': {
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: borderRadiusMedium,
      ...getInsetJssStyle(0),
    },
    // is used for expanded click-area only
    'link-overlay': {
      position: 'fixed',
      ...getInsetJssStyle(0),
      outline: 0,
    },
  };
};
