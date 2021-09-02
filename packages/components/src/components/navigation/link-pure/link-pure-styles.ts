import {
  addImportantToRule,
  attachCss,
  buildHostStyles,
  buildResponsiveHostStyles,
  buildResponsiveStyles,
  buildSlottedStyles,
  getCss,
  getFocusPseudoStyles,
  hasSlottedSubline,
  insertSlottedStyles,
  mergeDeep,
  transitionDuration,
  transitionTimingFunction,
} from '../../../utils';
import type { BreakpointCustomizable, GetStylesFunction, JssStyle } from '../../../utils';
import { calculateLineHeight, color, font, FontSize, generateTypeScale } from '@porsche-design-system/utilities';
import { Theme } from '../../../types';

const getPseudoAndSublineSize = (size: string) => {
  const pseudoElement = {
    '&::before': {
      fontSize: size,
      marginLeft: `${calculateLineHeight(size)}em`,
    },
  };
  switch (size) {
    case 'xSmall':
      return {
        ...generateTypeScale(size),
        ...pseudoElement,
      };
    case 'small':
      return {
        ...generateTypeScale(size),
        ...pseudoElement,
      };
    case 'medium':
      return {
        ...font.size['20'],
        ...pseudoElement,
      };
    case 'large':
      return {
        ...font.size['30'],
        ...pseudoElement,
      };
    case 'xLarge':
      return {
        ...font.size.large,
        ...pseudoElement,
      };
  }
};

export const adjustToFontSize = (size: FontSize) => {
  if (size === 'inherit') {
    return {
      fontSize: 'inherit',
      lineHeight: 'inherit',
      '& .icon': {
        width: '1.5em',
        height: '1.5em',
      },
    };
  } else {
    const sizeWithUnit = `${font.size[size].fontSize}px`;
    return {
      ...generateTypeScale(sizeWithUnit),
      '& .icon': {
        width: `${calculateLineHeight(sizeWithUnit)}em`,
        height: `${calculateLineHeight(sizeWithUnit)}em`,
      },
      '& + .subline': {
        ...getPseudoAndSublineSize(sizeWithUnit),
      },
    };
  }
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getFocusPseudoStyles({ offset: 1 })));
};

export const addSlottedCss = (host: HTMLElement): void => {
  insertSlottedStyles(host, getSlottedCss(host));
};

const getHostStyles: GetStylesFunction = (stretch: BreakpointCustomizable<boolean>): JssStyle => ({
  display: stretch ? 'block' : 'inline-block',
});

const getStretchStyles: GetStylesFunction = (stretch: BreakpointCustomizable<boolean>): JssStyle => ({
  justifyContent: stretch ? 'space-between' : 'flex-start',
});

const getColor = (theme: Theme) => {
  if (theme === 'dark') {
    return {
      baseColor: color.darkTheme.default,
      activeColor: color.darkTheme.state.active,
      activeColor2: color.darkTheme.brand,
      hoverColor: color.darkTheme.state.hover,
    };
  }
  return {
    baseColor: color.default,
    activeColor: color.state.active,
    activeColor2: color.brand,
    hoverColor: color.state.hover,
  };
};

export const getComponentCss = (
  host: HTMLElement,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  theme: Theme
): string => {
  const hasSubline = hasSlottedSubline(host);
  const { baseColor, activeColor, activeColor2, hoverColor } = getColor(theme);
  return getCss(
    mergeDeep({
      ...buildHostStyles({
        verticalAlign: 'top',
        position: addImportantToRule('relative'),
        cursor: 'pointer',
      }),
      ...buildResponsiveHostStyles(hasSubline ? false : stretch, getHostStyles),
      root: {
        display: 'flex',
        alignItems: 'flexStart',
        width: '100%',
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
        outline: 'transparent none',
        appearance: 'none',
        border: 'none',
        textDecoration: 'none',
        textAlign: 'left',
        background: 'transparent',
        color: active ? activeColor2 : baseColor,
        ...(hasSubline && {
          '& + .subline': {
            color: activeColor2,
          },
        }),
        transition: `color ${transitionDuration} ${transitionTimingFunction}, font-size 1ms linear`, // used for transitionend event listener
        ...getFocusPseudoStyles({ offset: 1 }),
        '&:active': {
          color: activeColor,
          '& + .subline': {
            color: activeColor,
          },
        },
        '&:hover': {
          color: hoverColor,
          '& + .subline': {
            color: hoverColor,
          },
        },
        ...buildResponsiveStyles(stretch, getStretchStyles),
      },
    })
  );
};

export const addComponentCss = (
  host: HTMLElement,
  active: boolean,
  stretch: BreakpointCustomizable<boolean>,
  theme: Theme
): void => {
  // Subline does not support stretch, therefore it needs to be called with false if with subline
  attachCss(host, getComponentCss(host, active, stretch, theme));
};
