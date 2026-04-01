import { getMediaQueryMin } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  blurFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  legacyRadiusMedium,
  radiusXl,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXs,
  typescaleSm,
} from '../../styles/css-variables';
import { notificationBackgroundMap, notificationColorMap, notificationIconMap } from '../../styles/maps';
import { getCss } from '../../utils';
import type { InlineNotificationState } from './inline-notification-utils';

export const getComponentCss = (
  state: InlineNotificationState,
  hasAction: boolean,
  hasDismissButton: boolean
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      'slot[name="heading"],h1,h2,h3,h4,h5,h6': {
        all: 'unset',
        display: 'block',
        gridArea: '1/2',
        font: `${fontWeightSemibold} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
        color: colorPrimary,
      },
      'slot:not([name]),p': {
        all: 'unset',
        display: 'block',
        gridArea: '2/2',
        marginTop: spacingStaticXs,
        font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
        color: colorPrimary,
      },
    },
    notification: {
      display: 'grid',
      gridTemplateColumns: `auto minmax(0, 1fr) auto auto`,
      padding: spacingStaticMd,
      borderRadius: `var(${legacyRadiusMedium}, ${radiusXl})`,
      background: notificationBackgroundMap[state],
      WebkitBackdropFilter: blurFrosted,
      backdropFilter: blurFrosted,
      ...forcedColorsMediaQuery({
        outline: '2px solid CanvasText',
        outlineOffset: '-2px',
      }),
      '&::before': {
        [getMediaQueryMin('s')]: {
          gridArea: '1/1',
          placeSelf: 'center',
          content: '""',
          width: '1.5rem',
          height: '1.5rem',
          marginInlineEnd: spacingStaticSm,
          background: notificationColorMap[state],
          WebkitMask: `${notificationIconMap[state]} center/contain no-repeat`, // necessary for Sogou browser support :-)
          mask: `${notificationIconMap[state]} center/contain no-repeat`,
        },
      },
    },
    ...(hasDismissButton && {
      dismiss: {
        gridArea: `1/4/3`,
        marginTop: `calc(-1 * ${spacingStaticXs})`,
        marginInlineEnd: `calc(-1 * ${spacingStaticXs})`,
        marginInlineStart: spacingStaticMd,
      },
    }),
    ...(hasAction && {
      action: {
        gridArea: '3/1/auto/-1',
        marginTop: spacingStaticMd,
        [getMediaQueryMin('s')]: {
          gridArea: '1/3',
          marginTop: 0,
          marginInlineStart: spacingStaticMd,
        },
      },
    }),
  });
};
