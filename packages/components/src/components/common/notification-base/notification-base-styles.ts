import { getMediaQueryMin } from '@porsche-design-system/emotion';
import type { Styles } from 'jss';
import { forcedColorsMediaQuery } from '../../../styles';
import {
  blurFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  radius2Xl,
  spacingFluidSm,
  spacingStatic2Xs,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXs,
  typescaleSm,
} from '../../../styles/css-variables';
import { notificationBackgroundMap, notificationColorMap, notificationIconMap } from '../../../styles/maps';

export const getFunctionalComponentNotificationBaseStyles = (
  state: 'info' | 'success' | 'warning' | 'error',
  hasAction: boolean,
  hasDismissButton: boolean,
  hasHeadingOrHeadingSlot: boolean
): Styles => {
  return {
    '@global': {
      ...(hasHeadingOrHeadingSlot && {
        'slot[name="heading"],h1,h2,h3,h4,h5,h6': {
          all: 'unset',
          gridArea: '1/2',
          font: `${fontWeightSemibold} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
          color: colorPrimary,
        },
      }),
      'slot:not([name]),slot[name="description"],p': {
        all: 'unset',
        gridArea: hasHeadingOrHeadingSlot ? '2/2' : '1/2',
        marginTop: hasHeadingOrHeadingSlot ? spacingStaticXs : '0px',
        font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
        color: colorPrimary,
      },
    },
    notification: {
      display: 'grid',
      gridTemplate: `repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto)`,
      padding: `calc(${spacingStaticSm} + ${spacingFluidSm})`,
      borderRadius: radius2Xl,
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
          placeSelf: hasHeadingOrHeadingSlot ? 'center' : 'flex-start',
          content: '""',
          width: '1.5rem',
          height: '1.5rem',
          marginInlineEnd: spacingStaticSm,
          background: notificationColorMap[state],
          WebkitMask: `${notificationIconMap[state]} center/contain no-repeat`, // necessary for Sogou browser support :-)
          mask: `${notificationIconMap[state]} center/contain no-repeat`,
          ...forcedColorsMediaQuery({
            background: 'CanvasText',
          }),
        },
      },
    },
    ...(hasDismissButton && {
      dismiss: {
        gridArea: `1/4/-1`,
        alignSelf: 'flex-start',
        marginBlock: `calc(-6 * ${spacingStatic2Xs})`,
        marginInline: `${spacingStaticMd} calc(-6 * ${spacingStatic2Xs})`,
      },
    }),
    ...(hasAction && {
      action: {
        gridArea: '3/1/auto/-1',
        marginTop: spacingStaticMd,
        alignSelf: 'flex-start', // ensures button is not getting stretched in case heading or content section becomes multiline
        [getMediaQueryMin('s')]: {
          gridArea: '1/3',
          marginTop: '0px',
          marginInlineStart: spacingStaticMd,
        },
      },
    }),
  };
};
