import type { BreakpointCustomizable, Theme } from '../../types';
import type { AccordionSize } from './accordion-utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import { getTransition, transitionDuration, getThemedColors, getInsetJssStyle } from '../../styles';
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
        ...hostHiddenStyles,
      },
      button: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        margin: '2px 0',
        width: '100%',
        textDecoration: 'none',
        border: 0,
        outline: 0,
        background: 'transparent',
        cursor: 'pointer',
        transition: getTransition('background-color'),
        textAlign: 'left',
        color: primaryColor,
        ...textSmallStyle,
        fontWeight: fontWeight.semiBold,
        ...buildResponsiveStyles(size, (s: AccordionSize) => ({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fontSize: fontSizeText[s],
          padding: compact ? '4px 0' : `${s === 'medium' ? '20px' : '12px'} 0`,
        })),
        '&::before': {
          content: '""',
          position: 'absolute',
          borderRadius: borderRadiusSmall,
          transition: getTransition('background-color'),
          ...getInsetJssStyle(-4),
        },
        ...hoverMediaQuery({
          '&:hover::before': {
            backgroundColor: hoverColor,
          },
        }),
        '&:focus::before': {
          border: `${borderWidthBase} solid ${focusColor}`,
        },
        '&:not(:focus-visible)::before': {
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
      marginLeft: '24px',
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
            paddingBottom: compact ? spacingStaticSmall : '24px',
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
