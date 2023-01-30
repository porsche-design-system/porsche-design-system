import type { BreakpointCustomizable, Theme } from '../../types';
import type { AccordionSize } from './accordion-utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import { getTransition, pxToRemWithUnit, transitionDuration, getThemedColors, getInsetJssStyle } from '../../styles';
import {
  fontWeight,
  fontSizeText,
  spacingStaticSmall,
  textSmallStyle,
  fontLineHeight,
  borderRadiusSmall,
  borderWidthBase,
} from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

export const getComponentCss = (
  size: BreakpointCustomizable<AccordionSize>,
  compact: boolean,
  open: boolean,
  theme: Theme
): string => {
  const { primaryColor, hoverColor, focusColor, contrastLowColor } = getThemedColors(theme);
  const border = `1px solid ${contrastLowColor}`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...(!compact && {
          '&(:first-of-type) .root': {
            borderTop: border,
          },
        }),
        ...hostHiddenStyles,
      },
      button: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        margin: `${pxToRemWithUnit(4)} 0`,
        width: '100%',
        textDecoration: 'none',
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        transition: getTransition('background-color'),
        //   overflow: 'hidden', // fixes rotating icon to increase bounding box of focus outline in firefox
        textAlign: 'left',
        color: primaryColor,
        ...textSmallStyle,
        fontWeight: fontWeight.semiBold,
        ...(compact
          ? { padding: `${pxToRemWithUnit(4)} 0` }
          : buildResponsiveStyles(size, (s: AccordionSize) => ({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ...fontSizeText[s],
              padding: `${pxToRemWithUnit(s === 'medium' ? 20 : 12)} 0`,
            }))),
        '&::before': {
          content: '""',
          position: 'absolute',
          borderRadius: borderRadiusSmall,
          transition: getTransition('background-color'),
          ...getInsetJssStyle(-5),
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          borderRadius: borderRadiusSmall,
          ...getInsetJssStyle(-10),
        },
        ...hoverMediaQuery({
          '&:hover::before': {
            backgroundColor: hoverColor,
          },
        }),
        '&:focus::after': {
          border: `${borderWidthBase} solid ${focusColor}`,
        },
        '&:not(:focus-visible)::after': {
          border: 0,
        },
      },
    },
    ...(!compact && {
      root: {
        borderBottom: border,
      },
    }),
    heading: {
      margin: 0,
      padding: 0,
    },
    icon: {
      width: fontLineHeight,
      height: fontLineHeight,
      marginLeft: '1.5rem',
      transformOrigin: '50% 50%',
      transform: open ? 'rotate3d(0,0,1,0.0001deg)' : 'rotate3d(0,0,1,90deg)', // needs to be a little bit more than 0 for correct direction in safari
      transition: getTransition('transform'),
    },
    collapsible: {
      padding: 0,
      overflow: 'hidden',
      ...(open
        ? {
            height: 'auto',
            paddingBottom: compact ? spacingStaticSmall : '2.5rem',
            visibility: 'visible',
            transition: getTransition('height') + `,visibility ${transitionDuration}`,
            animation: `$open ${transitionDuration} ease forwards`,
          }
        : {
            height: 0,
            visibility: 'hidden',
            transition: getTransition('height') + `,visibility ${transitionDuration} linear ${transitionDuration}`,
          }),
    },
    // TODO: this doesn't get shortened and results in `keyframes-open` for some unknown reason
    '@keyframes open': {
      '0%,99%': {
        overflow: 'hidden',
      },
      '100%': {
        overflow: 'visible',
      },
    },
  });
};
