import { getMediaQueryMax, getMediaQueryMin } from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  dismissButtonJssStyle,
  forcedColorsMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import {
  blurFrosted,
  colorErrorFrosted,
  colorInfoFrosted,
  colorPrimary,
  colorSuccessFrosted,
  colorWarningFrosted,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  legacyRadiusMedium,
  radiusXl,
  shadowLg,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXs,
  typescaleSm,
} from '../../../styles/css-variables';
import { getCss } from '../../../utils';
import type { ToastState } from '../toast/toast-utils';

const mediaQueryMinS = getMediaQueryMin('s');
const mediaQueryMaxS = getMediaQueryMax('s');

const getBackgroundColor = (state: ToastState): string => {
  const colorMap: Record<ToastState, string> = {
    info: colorInfoFrosted,
    warning: colorWarningFrosted,
    success: colorSuccessFrosted,
    error: colorErrorFrosted,
  };
  return colorMap[state];
};

const getNotificationRootJssStyle = (state: ToastState, hasAction: boolean, hasClose: boolean): JssStyle => {
  return {
    // display: 'grid', // NOTE: display property is moved into component styled to not apply !important keyword
    // 2 columns for content and optional close button
    gridTemplateColumns: `minmax(auto, 1fr)${hasClose ? ' auto' : ''}`,
    gap: spacingStaticMd,
    placeItems: 'start',
    padding: spacingStaticMd,
    WebkitBackdropFilter: blurFrosted,
    backdropFilter: blurFrosted,
    background: getBackgroundColor(state),
    borderRadius: `var(${legacyRadiusMedium}, ${radiusXl})`,
    [mediaQueryMinS]: {
      // 4 columns are for icon, content, optional action button and optional close button
      gridTemplateColumns: `auto minmax(auto, 1fr)${hasAction ? ' auto' : ''}${hasClose ? ' auto' : ''}`,
    },
    ...forcedColorsMediaQuery({
      outline: '2px solid CanvasText',
      outlineOffset: '-2px',
    }),
  };
};

const getNotificationIconJssStyle = (): JssStyle => ({
  marginTop: '2px', // To be center aligned with close button
  [mediaQueryMaxS]: {
    display: 'none',
  },
});

const getNotificationContentJssStyle = (): JssStyle => ({
  display: 'grid',
  gap: spacingStaticXs,
  marginTop: '2px', // To be center aligned with close button
  [mediaQueryMinS]: {
    marginLeft: `calc(-1 * ${spacingStaticSm})`,
  },
});

export const getComponentCss = (state: ToastState): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        opacity: 0, // needed to prevent flickering on initial render
        ...addImportantToEachRule({
          maxWidth: 'inherit',
          boxSizing: 'border-box',
          margin: 0, // ua popover reset
          inset: 'inherit', // ua popover reset
          border: '0', // ua popover reset
          outline: '0', // ua popover reset
          overflow: 'visible', // ua popover reset
          width: 'auto', // ua popover reset
          height: 'auto', // ua popover reset
        }),
        ...getNotificationRootJssStyle(state, false, true),
        boxShadow: shadowLg,
        '&::backdrop': {
          display: 'none',
        },
      },
      ...preventFoucOfNestedElementsStyles,
      p: {
        font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
        margin: 0,
        color: colorPrimary,
        ...getNotificationContentJssStyle(),
      },
    },
    icon: getNotificationIconJssStyle(),
    close: dismissButtonJssStyle,
  });
};
